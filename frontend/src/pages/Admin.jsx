import { useEffect, useState } from "react";
import axios from "axios";
import { Music, Calendar, MapPin, Image, Edit, Trash2, Plus, Save } from 'lucide-react';

function Admin() {
  const [concerts, setConcerts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    artista: "",
    fecha: "",
    ubicacion: "",
    imagen: ""
  });

  const fetchConcerts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/concerts/list.php`);
      setConcerts(res.data);
    } catch (err) {
      console.error("Error al cargar conciertos:", err);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const handleEdit = (concert) => {
    setEditingId(concert.id);
    setFormData({
      nombre: concert.nombre,
      artista: concert.artista,
      fecha: concert.fecha,
      ubicacion: concert.ubicacion,
      imagen: concert.imagen
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar este concierto?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/concerts/delete.php?id=${id}`);
      fetchConcerts();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/concerts/update.php?id=${editingId}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/concerts/create.php`, formData);
      }
      setFormData({ nombre: "", artista: "", fecha: "", ubicacion: "", imagen: "" });
      setEditingId(null);
      fetchConcerts();
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ nombre: "", artista: "", fecha: "", ubicacion: "", imagen: "" });
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Panel de Administración
        </h1>

        <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            {editingId ? <Edit className="h-5 w-5 text-purple-400" /> : <Plus className="h-5 w-5 text-purple-400" />}
            {editingId ? "Editar Concierto" : "Nuevo Concierto"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-white">Nombre del Concierto</label>
              <input 
                type="text" 
                placeholder="Nombre" 
                value={formData.nombre} 
                onChange={e => setFormData({ ...formData, nombre: e.target.value })} 
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Music className="h-4 w-4 text-purple-400" />
                Artista
              </label>
              <input 
                type="text" 
                placeholder="Artista" 
                value={formData.artista} 
                onChange={e => setFormData({ ...formData, artista: e.target.value })} 
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                Fecha
              </label>
              <input 
                type="date" 
                value={formData.fecha} 
                onChange={e => setFormData({ ...formData, fecha: e.target.value })} 
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-400" />
                Ubicación
              </label>
              <input 
                type="text" 
                placeholder="Ubicación" 
                value={formData.ubicacion} 
                onChange={e => setFormData({ ...formData, ubicacion: e.target.value })} 
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
                required 
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Image className="h-4 w-4 text-purple-400" />
                URL de Imagen
              </label>
              <input 
                type="text" 
                placeholder="URL de Imagen" 
                value={formData.imagen} 
                onChange={e => setFormData({ ...formData, imagen: e.target.value })} 
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="submit" 
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-700/30 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingId ? "Actualizar" : "Crear"}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-full bg-gray-700 text-white font-medium hover:bg-gray-600 transition-all"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Conciertos Existentes</h2>
          
          {concerts.length === 0 ? (
            <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-xl p-6 text-center text-gray-400">
              No hay conciertos disponibles
            </div>
          ) : (
            concerts.map((concert) => (
              <div 
                key={concert.id} 
                className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-xl overflow-hidden shadow-lg transition-all hover:border-purple-500/40"
              >
                <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                  {concert.imagen && (
                    <div className="w-full md:w-24 h-24 flex-shrink-0">
                      <img 
                        src={concert.imagen || "/placeholder.svg"} 
                        alt={concert.nombre} 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {e.target.src = '/placeholder.jpg'}}
                      />
                    </div>
                  )}
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white mb-2">{concert.nombre}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-gray-300">
                      <p className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-purple-400" />
                        {concert.artista}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        {concert.fecha}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        {concert.ubicacion}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 md:flex-col">
                    <button 
                      onClick={() => handleEdit(concert)} 
                      className="px-4 py-2 rounded-full bg-amber-500/80 hover:bg-amber-500 text-white text-sm font-medium transition-all flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(concert.id)} 
                      className="px-4 py-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium transition-all flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Borrar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;