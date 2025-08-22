import { useState } from "react";
import api from "../services/api";

export default function Register() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   async function handleRegister(e: React.FormEvent) {
      e.preventDefault();
      
      try {
         const response = await api.post("/auth/register", {
            name,
            email,
            password,
         });

         console.log("✅ Usuário registrado:", response.data);
         alert("Conta criada com sucesso!");
      } catch (error) {
         console.error("❌ Erro ao registrar:", (error as Error).message);
         alert("Erro ao criar conta!");
      }
   }

   return (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded" />
            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded">
               Registrar
            </button>
         </form>
      </div>
   );
}
