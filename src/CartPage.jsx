import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../src/Navbar";
import { 
  IoTrashOutline, 
  IoArrowBack, 
  IoBagCheckOutline, 
  IoAdd, 
  IoRemove 
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { toast, Toaster } from "react-hot-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { updateCartCount } = useCart();
  
  const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath;
    return `${BACKEND_URL}${imagePath}`;
  };
  
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const res = await axios.get(`${BACKEND_URL}/api/users/get-cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Cart Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantity = async (productId, action) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/users/update-quantity`,
        { productId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setCartItems(res.data);
        updateCartCount();
      }
    } catch (err) {
      toast.error("Could not update quantity");
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/users/remove-from-cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        toast.success("Item removed");
        setCartItems(cartItems.filter(item => item.productId !== productId));
        updateCartCount();
      }
    } catch (err) {
      toast.error("Could not remove item");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] pb-10">
      <Toaster position="top-center"/>
      <Navbar/>
      
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        {/* Optimized Header Section */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-all"
          >
            <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md">
                <IoArrowBack size={20}/> 
            </div>
            <span className="hidden sm:inline">BACK</span>
          </button>

          <div className="text-center">
             <h1 className="text-3xl md:text-4xl font-[1000] italic uppercase tracking-tighter text-gray-900">My Bag</h1>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{cartItems.length} Items Selected</p>
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-tighter">
             ₹{totalPrice}
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.productId} 
                  className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-4 md:gap-6"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-2 flex-shrink-0">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black text-gray-800 leading-tight">{item.name}</h3>
                    <p className="text-blue-600 font-black text-lg mt-1">₹{item.price}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center bg-gray-100 rounded-xl p-1 px-2 border border-gray-200">
                        <button 
                          onClick={() => handleQuantity(item.productId, 'dec')}
                          className="p-1 hover:bg-white rounded-md transition text-gray-700"
                        >
                          <IoRemove size={18}/>
                        </button>
                        <span className="font-black text-sm px-4 text-gray-800">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => handleQuantity(item.productId, 'inc')}
                          className="p-1 hover:bg-white rounded-md transition text-gray-700"
                        >
                          <IoAdd size={18}/>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(item.productId)}
                    className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <IoTrashOutline size={22}/>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 sticky top-28">
                <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-500 font-bold">
                        <span>Subtotal</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold">
                        <span>Delivery</span>
                        <span className="text-green-500 uppercase text-sm font-black">Free</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                        <span className="text-gray-900 font-black text-xl uppercase italic">Total</span>
                        <span className="text-3xl font-[1000] text-gray-900 tracking-tighter">₹{totalPrice}</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate("/checkout", { state: { cartItems, totalAmount: totalPrice } })}
                    className="w-full bg-yellow-400 text-black py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all shadow-lg active:scale-95"
                >
                  Checkout <IoBagCheckOutline size={24}/>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] shadow-sm border-2 border-dashed border-gray-200 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-gray-200 uppercase italic mb-8">Your bag is empty</h2>
            <button 
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white px-12 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
            >
              EXPLORE PRODUCTS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;