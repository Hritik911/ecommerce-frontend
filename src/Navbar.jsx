import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useCart } from "./CartContext";

import imgone from "../src/assets/img/HJ.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50"> 
      <nav className="bg-gradient-to-r from-[#e9b7ce] to-[#d3f3f1] text-white p-4 flex justify-between items-center shadow-md">
        
        <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src={imgone} alt="Logo" className="w-12 md:w-15 object-contain" />
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 flex-1 mx-4">
          <ul className="hidden md:flex gap-6 text-white font-medium whitespace-nowrap">
            <li className="cursor-pointer hover:text-yellow-300" onClick={() => navigate("/dashboard")}>Home</li>
            <li className="cursor-pointer hover:text-yellow-300">About</li>
            <li className="cursor-pointer hover:text-yellow-300">Contact</li>
            <li className="cursor-pointer hover:text-yellow-300">Services</li>
          </ul>

          <div className="flex items-center bg-white rounded shadow-md overflow-hidden w-full md:w-[515px] min-w-0">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="px-2 py-1 md:px-3 md:py-2 outline-none text-black w-full min-w-0" 
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 md:px-4 md:py-2 font-semibold text-black whitespace-nowrap flex-shrink-0">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <div 
            className="relative cursor-pointer flex items-center justify-center p-2"
            onClick={() => navigate("/cart")}
          >
            <IoCart className="text-xl md:text-2xl text-black" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center border border-white">
                {cartCount}
              </span>
            )}
          </div>

          <button 
            onClick={() => navigate("/")}
            className="hidden md:flex items-center justify-center bg-yellow-400 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-500 transition whitespace-nowrap"
          >
            Sign In
          </button>

          <button 
            onClick={handleLogout} 
            className="hidden md:flex items-center justify-center bg-yellow-400 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-500 transition whitespace-nowrap"
          >
            Logout
          </button>

          <div className="md:hidden cursor-pointer text-black flex items-center" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <RxCross2 size={24} /> : <GiHamburgerMenu size={24} />}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg flex flex-col gap-4 text-black font-medium border-t">
            <p className="cursor-pointer" onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Home</p>
            <p className="cursor-pointer">About</p>
            <p className="cursor-pointer">Contact</p>
            <div className="flex gap-2">
              <button onClick={() => navigate("/")} className="bg-yellow-400 p-2 rounded flex-1 font-bold">Sign In</button>
              <button onClick={handleLogout} className="bg-yellow-400 p-2 rounded flex-1 font-bold">Logout</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;