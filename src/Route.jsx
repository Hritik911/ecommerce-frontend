import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import img1 from "./assets/img/142290-OTJ3R5-100.jpg";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed! Check credentials."
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#e9b7ce] to-[#d3f3f1] flex justify-center items-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-center items-center bg-[#ccf7f4] w-full md:w-[80%] lg:w-[70%] shadow-lg rounded-xl overflow-hidden p-6 md:p-10"
      >
        <div className="flex justify-center w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={img1}
            alt="login"
            className="w-[200px] md:w-[300px] object-contain"
          />
        </div>

        <form
          className="w-full md:w-1/2 md:ml-10"
          onSubmit={handleLogin}
        >
          <h2 className="mb-6 text-center text-xl font-bold">
            Welcome To My Website
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full border p-2 pr-10 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </span>
            </div>
          </div>

          <div className="mb-4 text-right">
            <Link
              to="/forgetpassword"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
            type="submit"
          >
            Login
          </button>

          <Link
            to="/register"
            className="block text-center w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-[10px] transition-colors"
          >
            Register
          </Link>
        </form>
      </motion.div>
    </div>
  );
}

export default App;