import React, { useState } from "react";
import axios from "axios";

const AddMobile = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "" 
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select a category!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("category", formData.category);
    data.append("image", image); 

    try {
      const response = await axios.post("http://192.168.1.9:3800/api/users/add-mobile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`Success: ${formData.category} item added!`);
      console.log(response.data);
    } catch (err) {
      console.error("Error sending data:", err);
      alert("Failed to send data");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-black mb-6 text-gray-800 text-center uppercase tracking-tight">Add Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase mb-1">Category</label>
          <select 
            className="w-full p-3 border rounded-xl bg-gray-50 font-bold outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
          </select>
        </div>

        <input 
          type="text" 
          placeholder="Product Name" 
          className="w-full p-3 border rounded-xl outline-none focus:border-blue-500"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          required 
        />

        <textarea 
          placeholder="Description" 
          className="w-full p-3 border rounded-xl h-24 outline-none focus:border-blue-500"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          required 
        />

        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Price" 
            className="w-1/2 p-3 border rounded-xl outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
            required 
          />
          <input 
            type="number" 
            step="0.1" 
            placeholder="Rating (1-5)" 
            className="w-1/2 p-3 border rounded-xl outline-none focus:border-blue-500"
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })} 
            required 
          />
        </div>

        <div className="border-2 border-dashed p-4 rounded-xl bg-blue-50/30">
          <p className="text-[10px] text-gray-500 mb-2 font-bold uppercase">Upload Image:</p>
          <input 
            type="file" 
            className="text-sm"
            onChange={(e) => setImage(e.target.files[0])} 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white font-black p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl tracking-widest uppercase"
        >
          Add to Store
        </button>

      </form>
    </div>
  );
};

export default AddMobile;