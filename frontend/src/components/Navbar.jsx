import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { Search, User, Music, Ticket, Calendar, MapPin, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile.php`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (res.data.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error al verificar el rol del usuario:", err);
      navigate("/profile"); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-purple-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-[200px] flex items-center">
              <Link to="/" className="flex items-center">
                <Music className="h-8 w-8 text-purple-500" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                  ConcertHub
                </span>
              </Link>
            </div>

            <div className="flex-1 flex justify-center">
              <nav className="flex items-center space-x-12 font-bold">
                <Link
                  to="/concerts"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Ticket className="h-4 w-4" />
                  <span>Conciertos</span>
                </Link>
                <Link
                  to="/calendar"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendario</span>
                </Link>
              </nav>
            </div>

            <div className="w-[200px] flex items-center justify-end space-x-4">
              <button
                onClick={handleUserClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <User className="h-5 w-5" />
              </button>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}

              <Link
                to="/buytickets"
                className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Entradas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;