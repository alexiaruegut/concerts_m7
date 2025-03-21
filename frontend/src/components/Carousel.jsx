import { useState, useEffect } from "react"
import axios from "axios"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"

const Carousel = () => {
  const [concerts, setConcerts] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/concerts/list.php")
      .then((response) => {
        const threeConcerts = response.data.slice(0, 3)
        setConcerts(threeConcerts)
      })
      .catch((error) => console.error("Error al cargar conciertos:", error))
  }, [])

  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-purple-500",
        }}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
      >
        {concerts.map((concert) => (
          <SwiperSlide key={concert.id} className="w-full h-full">
            <div className="relative w-full h-full">
              {concert.imagen ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${concert.imagen})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black"></div>
              )}

              <div className="relative h-full w-full flex flex-col justify-end">
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-16 md:pb-24">
                  <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{concert.nombre}</h3>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/30 backdrop-blur-sm border border-purple-500/40">
                          <span className="inline-block w-4 h-4 mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-300"
                            >
                              <path d="M9 18V5l12-2v13"></path>
                              <circle cx="6" cy="18" r="3"></circle>
                              <circle cx="18" cy="16" r="3"></circle>
                            </svg>
                          </span>
                          <span className="text-purple-200 font-medium">{concert.artista}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                          <span className="inline-block w-5 h-5 mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-300"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </span>
                          <span className="text-white text-lg">
                            {concert.fecha} - {concert.hora}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-5 h-5 mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-300"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </span>
                          <span className="text-white text-lg">{concert.ubicacion}</span>
                        </div>
                      </div>

                      {concert.descripcion && (
                        <p className="text-gray-200 text-lg mb-8 max-w-3xl">{concert.descripcion}</p>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="text-2xl font-bold text-white">Desde 49,99€</div>
                        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-700/30">
                          Comprar Entradas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        body, html {
          overflow-x: hidden;
          height: 100%;
        }
        
        .swiper, .swiper-wrapper, .swiper-slide {
          height: 100vh;
        }
        
        .swiper-pagination {
          bottom: 20px !important;
          z-index: 20;
        }
        
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: linear-gradient(to right, #9333ea, #ec4899);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}

export default Carousel

