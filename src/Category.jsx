import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  IoArrowBack, 
  IoStar, 
  IoCartOutline, 
  IoArrowForward, 
  IoCheckmarkCircle, 
  IoWarning 
} from "react-icons/io5";
import Navbar from "../src/Navbar"; 
import { toast, Toaster } from "react-hot-toast";
import { useCart } from "./CartContext"; 

const CategoryPage = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { updateCartCount } = useCart();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");

  // Aapka Live Backend URL
  const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

  // Helper function to handle image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300"; 
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${BACKEND_URL}${imagePath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        let url = `${BACKEND_URL}/api/users/all-mobiles`;
        const res = await axios.get(url);
        
        let filtered = [];
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = res.data.filter((item) => 
            item.name?.toLowerCase().includes(query) || 
            item.description?.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query)
          );
        } else if (categoryName) {
          const currentUrlCat = categoryName.trim().toLowerCase();
          filtered = res.data.filter((item) => {
            const dbCategory = item.category ? item.category.toString().trim().toLowerCase() : "";
            return dbCategory === currentUrlCat;
          });
        }
        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName, searchQuery]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login to add items", {
        icon: <IoWarning className="text-yellow-400" size={24} />,
        style: { borderRadius: '15px', background: '#333', color: '#fff', fontWeight: 'bold' }
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/add-to-cart`,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`${product.name} Added!`, {
          icon: <IoCheckmarkCircle className="text-white" size={24} />,
          style: { borderRadius: '15px', background: '#10b981', color: '#fff', fontWeight: 'bold' }
        });
        updateCartCount(); 
      }
    } catch (err) {
      toast.error("Failed to add item", {
        icon: <IoWarning className="text-red-400" size={24} />
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-4 py-6 md:py-10">
        
        
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all text-gray-700 active:scale-95"
          >
            <IoArrowBack size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-4xl font-[1000] uppercase tracking-tighter text-gray-900 leading-none">
              {searchQuery ? `"${searchQuery}"` : categoryName}
            </h1>
            <p className="text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-2 bg-blue-50 w-fit px-2 py-0.5 rounded">
              {products.length} Products Available
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
            <p className="font-black text-gray-400 tracking-widest text-[10px] uppercase">Loading Catalog</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-white group rounded-[2rem] overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center p-3 md:p-2"
                >
                  
                  <div className="w-full md:w-[350px] aspect-square md:aspect-auto md:h-[280px] bg-[#f9fafb] rounded-[1.8rem] flex items-center justify-center overflow-hidden relative">
                    <img 
                      src={getImageUrl(item.image)}
                      className="h-full w-full object-contain p-6 md:p-8 group-hover:scale-110 transition-transform duration-700" 
                      alt={item.name} 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                       <IoStar className="text-yellow-500 text-xs md:text-sm" />
                       <span className="text-[10px] md:text-xs font-black text-gray-800">{item.rating || "4.5"}</span>
                    </div>
                  </div>

                  
                  <div className="flex-1 p-5 md:p-10 flex flex-col justify-between h-full w-full">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{item.category || 'Premium'}</span>
                      <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                        {item.description || "Experience the next level of innovation with our latest flagship features."}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-50 pt-5 gap-4">
                      
                      <div className="flex flex-col items-center sm:items-start">
                         <span className="text-[10px] md:text-xs text-gray-400 font-bold line-through">₹{Math.floor(item.price * 1.2)}</span>
                         <span className="text-2xl md:text-3xl font-[1000] text-gray-900 tracking-tighter leading-none">₹{item.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="flex items-center justify-center min-w-[50px] h-[50px] md:w-14 md:h-14 rounded-xl md:rounded-2xl border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all active:scale-90 flex-shrink-0"
                        >
                            <IoCartOutline size={22} className="md:w-7 md:h-7" />
                        </button>
                        
                        <button className="flex-1 sm:flex-none bg-gray-900 text-white px-5 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn whitespace-nowrap">
                          View Details
                          <IoArrowForward className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-32 px-4">
                <h2 className="text-3xl md:text-5xl font-black text-gray-200 uppercase italic">No Results Found</h2>
                <button onClick={() => navigate('/')} className="mt-6 text-blue-600 font-bold underline">Go back home</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;