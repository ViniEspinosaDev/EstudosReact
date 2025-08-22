import { useState } from "react";
import api from "../services/api";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleLogin(e: React.FormEvent) {
      e.preventDefault();

      try {
         const response = await api.post("/auth/login", {
            email,
            password,
         });

         console.log("✅ Login feito:", response.data);

         // exemplo: guardar token no localStorage
         if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            console.log("token", response.data.token);
         }

         alert("Login realizado com sucesso!");
      } catch (error) {
         console.error("❌ Erro no login:", (error as Error).message);
         alert("Email ou senha incorretos!");
      }
   }

   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" />
            <button type="submit" className="p-2 bg-green-600 text-white rounded">
               Entrar
            </button>
         </form>
      </div>
   );
}
