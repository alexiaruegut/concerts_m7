import { useEffect, useState } from "react";
import axios from "axios";
import { Music, Calendar, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";

function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/concerts/list.php`);
        setConcerts(res.data);
      } catch (err) {
        console.error("Error al cargar conciertos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  return (
    <div className="pt-24 px-4 sm:px-6 pb-16 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Todos los Conciertos
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts.map((c) => (
              <div 
                key={c.id} 
                className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl transition-all hover:shadow-purple-500/10 hover:border-purple-500/40 flex flex-col"
              >
                <div className="relative h-48">
                  <img 
                    src={c.imagen || '/placeholder.jpg'} 
                    alt={c.nombre} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">{c.nombre}</h2>
                  
                  <div className="space-y-2 mb-auto">
                    <div className="flex items-center gap-2 text-gray-300 h-6">
                      <Music className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <span className="text-purple-200 w-16 flex-shrink-0">Artista:</span> 
                      <span className="line-clamp-1">{c.artista}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300 h-6">
                      <Calendar className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <span className="text-purple-200 w-16 flex-shrink-0">Fecha:</span> 
                      <span>{c.fecha}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300 h-6">
                      <MapPin className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <span className="text-purple-200 w-16 flex-shrink-0 mr-7">Ubicación:</span> 
                      <span className="line-clamp-1">{c.ubicacion}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/buytickets" 
                    className="mt-4 block w-full px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-700/20 text-center"
                  >
                    Comprar Entradas
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Concerts;