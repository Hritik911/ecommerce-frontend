import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

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
           <li><Link to="/dashboard" className="cursor-pointer hover:text-yellow-300" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>
           <li><Link to="/about" className="cursor-pointer hover:text-yellow-300" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link></li>
           <li><Link to="/contact" className="cursor-pointer hover:text-yellow-300" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link></li>
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
        <div className="fixed inset-0 top-0 left-0 w-screen h-screen md:hidden z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
          
          <div className="relative w-[280px] h-full bg-white p-6 shadow-2xl flex flex-col gap-6 text-black font-semibold border-l border-gray-100">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-xl font-bold tracking-wide text-black">MENU</span>
              <RxCross2 size={24} className="cursor-pointer text-gray-600" onClick={() => setMenuOpen(false)} />
            </div>

            <p className="cursor-pointer text-lg hover:text-yellow-600 transition" onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Home</p>
            <p className="cursor-pointer text-lg hover:text-yellow-600 transition" onClick={() => { navigate("/about"); setMenuOpen(false); }}>About</p>
            <p className="cursor-pointer text-lg hover:text-yellow-600 transition" onClick={() => { navigate("/contact"); setMenuOpen(false); }}>Contact</p>
            
            <div className="flex flex-col gap-3 mt-auto mb-10">
              <button onClick={() => { navigate("/"); setMenuOpen(false); }} className="bg-yellow-400 py-3 rounded-xl font-bold hover:bg-yellow-500 transition shadow-md w-full text-black">Sign In</button>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="bg-yellow-400 py-3 rounded-xl font-bold hover:bg-yellow-500 transition shadow-md w-full text-black">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;