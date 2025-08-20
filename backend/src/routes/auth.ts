import { Elysia, t } from 'elysia';
import { db } from '../infra/db';
import { UserServiceFactory } from '../main/factories/userServiceFactory';
import { created, internalError } from '../domain/dtos/responseDto';

export const authRoutes = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            // Registro
            .post('/register', async ({ body, status }) => {

                const userService = UserServiceFactory.make();

                try {
                    const result = await userService.registerUser(body);
                    const response = created(result, "Usuário criado com sucesso.");

                    return status(response.status, response.payload);
                }
                catch (error) {
                    const response = internalError(error);

                    return status(response.status, response.payload);
                }
            }, {
                body: t.Object({
                    name: t.String(),
                    email: t.String({ format: 'email' }),
                    password: t.String()
                })
            })

            // Login
            .post('/login', async ({ body }) => {

                const userService = UserServiceFactory.make();

                const { email, password } = body as { email: string; password: string };

                userService.login(email, password);


                const user = await db
                    .selectFrom('users')
                    .select(['id', 'name', 'email'])
                    .where('email', '=', email)
                    .where('password', '=', password)
                    .executeTakeFirst();

                if (!user) return { success: false, message: 'Credenciais inválidas' };

                return { success: true, user };
            })
    );
