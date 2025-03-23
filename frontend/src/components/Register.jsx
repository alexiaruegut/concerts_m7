// src/pages/Register.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Calendar, MapPin } from 'lucide-react';

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register.php`, {
        nombre,
        email,
        password,
        fecha_nacimiento: fechaNac,
        ubicacion
      });

      setSuccessMsg("Usuario registrado. Ya puedes iniciar sesión.");
    } catch (error) {
      console.error("Error al registrarse:", error);
      setErrorMsg(error.response?.data?.error || "Error en el registro");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-1 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Registrarse
        </h2>

        <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-500/30 text-red-300">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-lg backdrop-blur-sm bg-green-500/20 border border-green-500/30 text-green-300">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <User className="h-5 w-5 text-purple-400" />
                Nombre
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

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

            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                value={fechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-400" />
                Ubicación
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                placeholder="Ciudad, País"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-700/30"
            >
              Registrarse
            </button>
          </form>

          <p className="text-white mt-6 text-center">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;