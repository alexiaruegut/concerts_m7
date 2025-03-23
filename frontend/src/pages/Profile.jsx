import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, MapPin, Ticket } from 'lucide-react';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/profile.php`, config)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar el perfil:", err);
        setError("No se pudo cargar el perfil");
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/tickets/mypurchases.php`, config)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar entradas:", err);
      });
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-3xl mx-auto px-4">
          <div className="p-6 rounded-lg backdrop-blur-sm bg-red-500/20 border border-red-500/30 text-red-300 text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Perfil de Usuario
        </h1>

        <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 mb-8">
          {userData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-purple-200">Nombre</p>
                  <p>{userData.nombre}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-purple-200">Email</p>
                  <p>{userData.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-purple-200">Fecha Nacimiento</p>
                  <p>{userData.fecha_nacimiento}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-purple-200">Ubicación</p>
                  <p>{userData.ubicacion}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:col-span-2">
                <div className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300 border border-purple-500/30">
                  {userData.rol}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Mis Entradas
        </h2>
        
        {tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.compra_id}
                className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-xl overflow-hidden shadow-lg p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Ticket className="h-5 w-5 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">{ticket.concierto}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span>{ticket.fecha_concierto}</span>
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <span>{ticket.ubicacion}</span>
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <span className="text-purple-400 font-medium">Tipo:</span>
                    <span>{ticket.tipo}</span>
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <span className="text-purple-400 font-medium">Cantidad:</span>
                    <span>{ticket.cantidad}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 text-center text-white">
            No has comprado entradas todavía.
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;