import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/send-reset-link`, {
        email: email 
      });

      setLoading(false);
      setMessage(res.data.message);
      setEmail("");
      
      setTimeout(() => setMessage(""), 5000);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to send email. Try again!");
      
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#ccf7f4] shadow-lg rounded-xl p-8"
      >
        
        {loading && (
          <div className="absolute inset-0 z-10 flex justify-center items-center bg-black/20 backdrop-blur-sm rounded-xl">
             <ScaleLoader color="#36d7b7" />
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password?</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          No worries! Enter your email and we will send you a reset link.
        </p>

       
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center text-sm">
            {message}
          </div>
        )}

        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full border p-3 rounded-lg bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors mb-4"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;