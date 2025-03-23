import { useState, useEffect } from "react";
import axios from "axios";
import { Music, Ticket, User, Phone, CreditCard } from 'lucide-react';
import { Link } from "react-router-dom";

function BuyTicket() {
  const token = localStorage.getItem("token");

  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState("");
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const [loadingTypes, setLoadingTypes] = useState(false);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/concerts/list.php`);
        setConcerts(res.data);
      } catch (error) {
        console.error("Error al cargar conciertos:", error);
      }
    };
    fetchConcerts();
  }, []);

  useEffect(() => {
    const fetchTicketTypes = async (concertId) => {
      try {
        setLoadingTypes(true);
        setTicketTypes([]);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets/types.php?concert_id=${concertId}`);
        setTicketTypes(res.data);
      } catch (error) {
        console.error("Error al cargar tipos de entrada:", error);
      } finally {
        setLoadingTypes(false);
      }
    };

    if (selectedConcert) {
      fetchTicketTypes(selectedConcert);
      setSelectedType("");
      setMessage("");
    } else {
      setTicketTypes([]);
    }
  }, [selectedConcert]);

  const handlePurchase = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        tipo_entrada_id: selectedType,
        cantidad: quantity,
        nombre_comprador: name,
        email: email,
        telefono: phone,
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tickets/buy.php`, body, config);
      setMessage(`Compra realizada con éxito. Total: €${res.data.total}`);
    } catch (error) {
      console.error("Error en la compra:", error);
      setMessage(error.response?.data?.error || "Error en la compra");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-2xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Debes iniciar sesión para comprar entradas</h2>
          <p>
            <Link to="/login" className="text-purple-400 underline">Inicia sesión</Link> o{" "}
            <Link to="/register" className="text-purple-400 underline">Regístrate</Link> para continuar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Comprar Entradas
        </h2>

        <div className="backdrop-blur-md bg-black/30 border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium text-white flex items-center gap-2">
              <Music className="h-5 w-5 text-purple-400" />
              Concierto:
            </label>
            <select
              value={selectedConcert}
              onChange={(e) => setSelectedConcert(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white"
            >
              <option value="">Elige un concierto</option>
              {concerts.map((concert) => (
                <option key={concert.id} value={concert.id}>
                  {concert.nombre}
                </option>
              ))}
            </select>
          </div>

          {selectedConcert && (
            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Ticket className="h-5 w-5 text-purple-400" />
                Tipo de Entrada:
              </label>

              {loadingTypes && (
                <div className="text-purple-400">Cargando tipos de entrada...</div>
              )}

              {!loadingTypes && ticketTypes.length > 0 && (
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white"
                >
                  <option value="">Elige tipo de entrada</option>
                  {ticketTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.tipo} - €{type.precio}
                    </option>
                  ))}
                </select>
              )}

              {!loadingTypes && ticketTypes.length === 0 && (
                <div className="text-gray-300">
                  No hay tipos de entrada para este concierto.
                </div>
              )}
            </div>
          )}

          {selectedType && (
            <div className="mb-6">
              <label className="block mb-2 font-medium text-white flex items-center gap-2">
                <Ticket className="h-5 w-5 text-purple-400" />
                Cantidad:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white"
              />
            </div>
          )}

          {selectedType && (
            <>
              <div className="mb-6">
                <label className="block mb-2 font-medium text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-400" />
                  Nombre completo:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white"
                  placeholder="Introduce tu nombre completo"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-400" />
                  Email del comprador:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white"
                  placeholder="Introduce tu email"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium text-white flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-400" />
                  Teléfono:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-800/70 border border-purple-500/30 text-white"
                  placeholder="Introduce tu teléfono"
                />
              </div>
            </>
          )}

          {selectedType && (
            <button
              onClick={handlePurchase}
              className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-700/30"
            >
              Comprar Entradas
            </button>
          )}

          {message && (
            <div className="mt-6 p-4 rounded-lg backdrop-blur-sm bg-green-500/20 border border-green-500/30 text-green-300">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
