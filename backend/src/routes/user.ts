import { Elysia, status, t } from 'elysia';
import { UserServiceFactory } from '../main/factories/userServiceFactory';
import { internalError, ok } from '../domain/dtos/responses/responseEndpointDto';

export const userRoutes = (app: Elysia) =>
    app.group('/user', (app) =>
        app
            // Registro
            .get('/users', async () => {

                const userService = UserServiceFactory.make();

                try {
                    const result = await userService.getAllUsers();

                    if (!result.success)
                        throw new Error(result.message);

                    const response = ok(result.data);

                    return status(response.status, response.payload);
                }
                catch (error) {
                    const response = internalError(error, (error as Error).message);

                    return status(response.status, response.payload);
                }
            })

            .delete('', async ({ body }) => {

                const userService = UserServiceFactory.make();

                try {
                    const result = await userService.deleteUser(body.email, body.password);

                    if (!result.success)
                        throw new Error(result.message);

                    const response = ok(result.data, "Usuário deletado com sucesso.");

                    return status(response.status, response.payload);
                } catch (error) {
                    const response = internalError(error, (error as Error).message);

                    return status(response.status, response.payload);
                }

            }, {
                body: t.Object({
                    email: t.String({ format: 'email' }),
                    password: t.String()
                })
            })
    );