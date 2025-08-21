import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";

const app = new Elysia()
    .use(authRoutes) // rotas de autenticação
    .use(userRoutes)
    .listen(3000);

console.log(`🚀 Servidor rodando em http://localhost:3000`);
