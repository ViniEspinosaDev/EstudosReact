import { Elysia } from "elysia";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import cors from "@elysiajs/cors";

const app = new Elysia()
    .use(authRoutes) // rotas de autenticação
    .use(userRoutes)
    .use(cors())
    .listen(3000);

console.log(`🚀 Servidor rodando em http://localhost:3000`);
