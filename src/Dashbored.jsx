import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgone from "./assets/img/HJ.png";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import ListProduct from "./ProductList";
import BannerSlider from "./Banner";
import Footer from "./Footer";
import { useCart } from "./CartContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { cartCount } = useCart();
  const navigate = useNavigate();


  const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        
        const userRes = await axios.get(
          `${BACKEND_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userRes.data);

        
        const bannerRes = await axios.get(
          `${BACKEND_URL}/api/users/all-banners`
        );
        setBanners(bannerRes.data);

        
        const productRes = await axios.get(
          `${BACKEND_URL}/api/users/all-products`
        );
        setProducts(productRes.data);

      } catch (err) {
        console.error("Fetch error:", err);

        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fetchData();
  }, [navigate]);

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  
  const games = products.filter((p) => p.category?.trim() === "Games");
  const books = products.filter((p) => p.category?.trim() === "Books");
  const electronics = products.filter((p) => p.category?.trim() === "Electronics");

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden pt-20 md:pt-24">

      
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#e9b7ce] to-[#d3f3f1] text-white p-4 flex justify-between items-center shadow-md z-[1000]">
        <img
          src={imgone}
          alt="Logo"
          className="w-12 md:w-15 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />

        <div className="flex items-center gap-4 md:gap-8 flex-1 mx-4">
          <ul className="hidden md:flex gap-6 text-white font-medium">
            <li className="cursor-pointer hover:text-yellow-300" onClick={() => navigate("/dashboard")}>Home</li>
            <li className="cursor-pointer hover:text-yellow-300">About</li>
            <li className="cursor-pointer hover:text-yellow-300">Contact</li>
          </ul>

          <form onSubmit={handleSearch} className="flex items-center bg-white rounded shadow-md overflow-hidden w-full md:w-[515px]">
            <input
              type="text"
              placeholder="Search products..."
              className="px-2 py-1 md:px-3 md:py-2 outline-none text-black w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 md:px-4 md:py-2 font-semibold text-black whitespace-nowrap transition-colors">
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-6 md:gap-4">
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <IoCart className="text-xl md:text-2xl text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>

          <button onClick={() => navigate("/")} className="hidden md:block bg-yellow-400 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-500 transition shadow-sm">
            Sign In
          </button>

          <button onClick={handleLogout} className="hidden md:block bg-yellow-400 px-4 py-2 rounded text-black font-semibold shadow-sm">
            Logout
          </button>

          <div className="md:hidden cursor-pointer text-black" onClick={() => setMenuOpen(true)}>
            <GiHamburgerMenu size={30} />
          </div>
        </div>
      </nav>

    
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[1010] transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMenuOpen(false)}></div>
      
      <div className={`fixed top-0 right-0 h-full w-[65%] max-w-[300px] bg-white z-[1020] shadow-2xl transform transition-transform duration-500 ease-in-out p-6 flex flex-col ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-black font-black text-xl uppercase tracking-widest">Menu</h2>
          <RxCross2 size={30} className="text-black cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>
        <ul className="flex flex-col gap-6 text-gray-800 font-bold text-lg">
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Home</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => setMenuOpen(false)}>About</li>
          <li className="hover:text-blue-600 cursor-pointer" onClick={() => setMenuOpen(false)}>Contact</li>
        </ul>
        <div className="mt-auto flex flex-col gap-4">
          <button onClick={() => { navigate("/"); setMenuOpen(false); }} className="w-full bg-yellow-400 p-4 rounded-2xl text-black font-black uppercase text-sm tracking-widest shadow-lg">Sign In</button>
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full bg-gray-900 p-4 rounded-2xl text-white font-black uppercase text-sm tracking-widest">Logout</button>
        </div>
      </div>

      
      <ListProduct />
      <BannerSlider banners={banners} />

      
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 mt-10 mb-20 flex flex-col md:flex-row justify-center items-start gap-6 lg:gap-10">
        {[
          { title: "Video Games", data: games, color: "border-purple-600" },
          { title: "Best Selling Books", data: books, color: "border-blue-600" },
          { title: "Latest Electronics", data: electronics, color: "border-yellow-500" },
        ].map((cat) =>
          cat.data.length > 0 && (
            <section key={cat.title} className="w-full md:flex-1 bg-white p-5 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-xl md:text-2xl font-black border-l-8 ${cat.color} pl-4 uppercase tracking-tighter text-gray-900`}>
                  {cat.title}
                </h2>
                <span className="text-[10px] bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-500 uppercase">Top 3</span>
              </div>

              <div className="flex md:flex-col gap-6 overflow-x-auto md:overflow-visible no-scrollbar pb-6 md:pb-0">
                {cat.data.slice(0, 3).map((item) => (
                  <div key={item._id} className="bg-gray-50 p-4 md:p-6 rounded-[2rem] border border-transparent hover:border-blue-200 min-w-[220px] md:min-w-0 w-full flex-shrink-0 md:flex flex flex-col items-center group cursor-pointer transition-all">
                    <div className="bg-white rounded-[1.5rem] w-full aspect-square flex items-center justify-center overflow-hidden shadow-sm mb-5">
                      <img src={item.image} className="h-40 md:h-56 w-full object-contain group-hover:scale-110 transition-transform duration-700 p-4" alt={item.name} />
                    </div>
                    <div className="text-center w-full">
                      <p className="text-sm md:text-lg font-extrabold text-gray-800 truncate px-2 group-hover:text-blue-600 transition-colors">{item.name}</p>
                      <button className="mt-4 w-full py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-xl text-xs font-black uppercase hover:bg-gray-900 hover:text-white transition-all">
                        View Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;