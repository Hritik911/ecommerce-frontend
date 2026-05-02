import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

function Form() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errormsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  
  const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newErrors = {};
    if (!formdata.name) newErrors.name = "Name is Required";
    if (!formdata.email) newErrors.email = "Email is Required";
    if (!formdata.password) newErrors.password = "Password is Required";
    if (formdata.password !== formdata.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not Match";
    }
    if (!formdata.phone) newErrors.phone = "Phone is Required";
    if (!formdata.gender) newErrors.gender = "Gender is Required";
    if (!formdata.dob) newErrors.dob = "Date of Birth is Required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMsg("Please fix the errors");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/register`, {
        fullname: formdata.name,        
        email: formdata.email,
        password: formdata.password,
        phonenumber: formdata.phone,    
        dateofbirth: formdata.dob,    
        gender: formdata.gender.charAt(0).toUpperCase() + formdata.gender.slice(1)
      });

      setSuccess(response.data.message || "Registration Successful!");
      setErrorMsg("");
      setFormdata({ name: "", email: "", password: "", confirmPassword: "", phone: "", dob: "", gender: "" });
      
      setTimeout(() => setSuccess(""), 3000);

    } catch (error) {
      const message = error.response?.data?.message || "Registration Failed";
      setErrorMsg(message);
      setSuccess("");
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex justify-center items-center min-h-[400px] w-full max-w-2xl shadow-lg rounded-xl bg-gradient-to-r from-[#e9b7ce] to-[#d3f3f1] p-6"
      >
        
        {loading && (
          <div className="absolute inset-0 z-20 flex justify-center items-center bg-black/30 backdrop-blur-sm rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <ScaleLoader color="#36d7b7" height={35} />
              <p className="text-white">Submitting...</p>
            </div>
          </div>
        )}

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="mb-6 text-center text-xl font-bold">Register Form</h2>

          {success && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50">
              {success}
            </div>
          )}

          {errormsg && (
            <div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded shadow-lg mt-16 z-50">
              {errormsg}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
            <input id="name" type="text" value={formdata.name} onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input id="email" type="email" value={formdata.email} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={formdata.password} onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirm">Confirm Password</label>
              <input id="confirm" type="password" value={formdata.confirmPassword} onChange={(e) => setFormdata({ ...formdata, confirmPassword: e.target.value })} className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={formdata.phone} onChange={(e) => setFormdata({ ...formdata, phone: e.target.value })} className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label>Date of Birth</label>
            <input type="date" value={formdata.dob} onChange={(e) => setFormdata({ ...formdata, dob: e.target.value })} className="w-full border p-2 rounded bg-[#ebf4f5] outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <div className="mb-4">
            <label>Gender</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-1"><input type="radio" name="gender" value="male" checked={formdata.gender === "male"} onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })} /> Male</label>
              <label className="flex items-center gap-1"><input type="radio" name="gender" value="female" checked={formdata.gender === "female"} onChange={(e) => setFormdata({ ...formdata, gender: e.target.value })} /> Female</label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded mt-2 transition-colors font-bold" type="submit">
            Register
          </button>
        
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 font-bold hover:underline transition-all">
                  Login here
                </Link>
              </p>
          </div>
          
        </form>
      </motion.div>
    </div>
  );
}

export default Form;