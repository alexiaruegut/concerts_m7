import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Search, User, Music, Ticket, Calendar, MapPin } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-xl border-b border-purple-500/20" : "bg-transparent"
      }`}
    >
      <div className="bg-black/30">
        <div className="flex justify-between items-center h-16">
          <div className="ml-3 flex items-center">
            <Link href="/" className="flex items-center">
              <Music className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                ConcertHub
              </span>
            </Link>
          </div>

          <nav className="flex items-center space-x-8 font-bold">
            <Link href="/concerts" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              <Ticket className="h-4 w-4" />
              <span>Concerts</span>
            </Link>
            <Link href="/artists" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Artists</span>
            </Link>
            <Link href="/venues" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Venues</span>
            </Link>
            <Link href="/calendar" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar