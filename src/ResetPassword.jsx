import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  
  const emailFromURL = searchParams.get("email");

  const handleUpdate = async (e) => {
    e.preventDefault();

  
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    
    if (!emailFromURL) {
      alert("Invalid Link! Please try the forgot password process again.");
      return;
    }

    setLoading(true);

    try {
      
      const res = await axios.post("http://192.168.1.9:3800/reset-password-direct", {
        email: emailFromURL,
        newPassword: password
      });

      alert(res.data.message);
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#e9b7ce] to-[#d3f3f1] flex justify-center items-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#ccf7f4] p-8 rounded-xl shadow-lg w-full max-w-md relative"
      >
        <h2 className="text-xl font-bold mb-2 text-center">Set New Password</h2>
        
      
        <p className="text-center text-xs text-gray-500 mb-6">
          Resetting for: <span className="font-semibold text-blue-600">{emailFromURL}</span>
        </p>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="text-sm font-medium">New Password</label>
            <input 
              type="password" 
              required 
              className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-300 transition-all" 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-6">
            <label className="text-sm font-medium">Confirm New Password</label>
            <input 
              type="password" 
              required 
              className="w-full border p-2 rounded mt-1 outline-none focus:ring-2 focus:ring-blue-300 transition-all" 
              onChange={(e) => setConfirm(e.target.value)} 
              placeholder="Repeat new password"
            />
          </div>
          <button 
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white p-2 rounded font-bold transition-all shadow-md`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ResetPassword;