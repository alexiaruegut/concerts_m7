// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/home";
import Navbar from "./components/Navbar";
import BuyTicket from "./components/BuyTickets";
import Login from "./components/Login"; // Import
import Register from "./components/Register"; // Import
import Profile from "./pages/Profile"; // Import
import Concerts from "./pages/Concerts";
import Calendar from "./pages/Calendar";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/concerts" element={<Concerts />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="/buytickets" element={<BuyTicket />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </Router>
  );
}

export default App;
