// src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from 'lucide-react';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login.php`,
        { email, password }
      );
      
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg(error.response?.data?.error || "Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Iniciar Sesión
        </h2>

        <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-500/30 text-red-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-400" />
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-400" />
                Contraseña
              </label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-700/30"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="text-white mt-6 text-center">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;