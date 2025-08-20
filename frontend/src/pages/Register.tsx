import { Link } from "react-router-dom";

export default function Register() {
   return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
         <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>
            <form className="flex flex-col gap-4">
               <input type="text" placeholder="Nome completo" className="border p-2 rounded-lg" />
               <input type="email" placeholder="Email" className="border p-2 rounded-lg" />
               <input type="password" placeholder="Senha" className="border p-2 rounded-lg" />
               <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Criar Conta
               </button>
            </form>
            <p className="text-sm mt-4 text-center">
               Já tem conta?{" "}
               <Link to="/login" className="text-blue-600 underline">
                  Login
               </Link>
            </p>
         </div>
      </div>
   );
}
