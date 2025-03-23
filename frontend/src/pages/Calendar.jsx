import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarIcon, Music, MapPin } from 'lucide-react';

function CalendarPage() {
  const [concertsByMonth, setConcertsByMonth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/concerts/list.php`);
        const grouped = {};

        res.data.forEach(concert => {
          const date = new Date(concert.fecha);
          const month = date.getMonth(); 
          if (!grouped[month]) grouped[month] = [];
          grouped[month].push({
            ...concert,
            fecha_obj: date,
          });
        });

        setConcertsByMonth(grouped);
      } catch (err) {
        console.error("Error al cargar conciertos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Calendario de Conciertos 2025
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthNames.map((monthName, index) => (
              <div 
                key={index} 
                className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">{monthName}</h2>
                </div>
                
                {concertsByMonth[index]?.length > 0 ? (
                  <ul className="space-y-3">
                    {concertsByMonth[index].map((concert) => (
                      <li 
                        key={concert.id} 
                        className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/10 hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 text-sm font-medium">
                            {concert.fecha_obj.toLocaleDateString("es-ES", {
                              day: "2-digit", month: "short"
                            })}
                          </span>
                        </div>
                        
                        <p className="font-medium text-white mb-1">{concert.nombre}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Music className="h-3 w-3 text-purple-400" />
                          <span>{concert.artista}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <MapPin className="h-3 w-3 text-purple-400" />
                          <span>{concert.ubicacion}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 rounded-lg bg-purple-900/10 border border-purple-500/10 text-gray-400 text-center">
                    Sin conciertos este mes
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;