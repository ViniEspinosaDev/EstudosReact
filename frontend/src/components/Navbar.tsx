import { Link } from "react-router-dom";

export default function Navbar() {
   return (
      <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
         <h1 className="text-2xl font-bold">Geiger</h1>
         <div className="flex gap-4">
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200">
               Entrar / Registrar
            </Link>
         </div>
      </nav>
   );
}
