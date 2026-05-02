import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1565C0] to-[#b92b27] text-white pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo/About */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 italic">HJ STORE</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Aapka apna bharosemand online market. Best quality Games, Books aur Electronics ke liye.
          </p>
        </div>

        {/* Categories Link */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2 mt-2">
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 inline-block">Contact</h4>
          <p className="text-gray-400 text-sm mt-2">Email: support@hjstore.com</p>
          <p className="text-gray-400 text-sm italic">Batala, Punjab, India</p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-xs">
        © 2026 HJ Store. All Rights Reserved. Created by Hritik.
      </div>
    </footer>
  );
};

// YEH LINE LIKHNA SABSE ZAROORI HAI:
export default Footer;