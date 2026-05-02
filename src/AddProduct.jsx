import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Games");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    formData.append("category", category);

    try {
      const res = await axios.post("http://192.168.1.9:3800/api/users/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product added successfully!");
      setName("");
      setFile(null);
      
    } catch (err) {
      console.error(err);
      setMessage("Failed to add product. Check backend terminal.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg outline-none focus:border-blue-500"
          required 
        />

       
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Select Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg outline-none bg-gray-50 focus:border-blue-500 cursor-pointer"
            required
          >
            <option value="Games">Games</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Mobile">Mobile</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>

        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Product Image:</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded-lg bg-gray-50"
            required 
          />
        </div>

        <button className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200 mt-2">
          Upload Product
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center font-semibold ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;