import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
   return (
      <Router>
         <Navbar />
         <Routes>
            {/* Página inicial */}
            <Route
               path="/"
               element={
                  <>
                     <Hero />
                     <Footer />
                  </>
               }
            />
            {/* Login e Registro */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </Router>
   );
}

export default App;
