import { useState } from "react";
import axios from "axios";

const AddBanner = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Bhai, image toh select karo!");

        const formData = new FormData();
        formData.append("image", image);

        try {
            setLoading(true);
            const res = await axios.post("http://192.168.1.9:3800/api/users/add-banner", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Banner Database Added!");
            setImage(null); // Form clear
        } catch (err) {
            console.error(err);
            alert("Error aa gaya!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-center">Add Slider Banner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center hover:border-blue-400 transition cursor-pointer">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="w-full"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-full py-2 rounded-lg text-white font-bold transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? "Uploading..." : "Upload Banner"}
                </button>
            </form>
        </div>
    );
};

export default AddBanner;