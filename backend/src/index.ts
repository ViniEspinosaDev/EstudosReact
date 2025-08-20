import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";

const app = new Elysia()
    .use(authRoutes) // rotas de autenticação
    .listen(3000);

console.log(`🚀 Servidor rodando em http://localhost:3000`);
