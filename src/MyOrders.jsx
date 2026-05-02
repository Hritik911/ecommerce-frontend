import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../src/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Aapka Live Backend URL
    const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://via.placeholder.com/150";
        if (imagePath.startsWith("http")) {
            return imagePath;
        }
        return `${BACKEND_URL}${imagePath}`;
    };

    const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`${BACKEND_URL}/api/users/my-orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setLoading(false);
        }
    };

    const handleCancel = async (orderId) => {
        if (!window.confirm("Do you really want to cancel the order?")) return;
        
        const token = localStorage.getItem("token");
        try {
            await axios.put(`${BACKEND_URL}/api/users/cancel-order/${orderId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Order Cancelled");
            fetchOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error cancelling order");
        }
    };

    useEffect(() => { 
        fetchOrders(); 
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            <Navbar />
            <div className="max-w-[900px] mx-auto px-4 py-10">
                <h1 className="text-3xl font-[1000] uppercase italic tracking-tighter mb-8">My Orders</h1>
                
                {orders.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID: {order._id}</p>
                                        <h2 className="text-xl font-black mt-1">₹{order.totalAmount}</h2>
                                    </div>
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                        order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        {order.orderStatus}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 mb-6">
                                    {order.products.map((p, i) => (
                                        <div key={i} className="relative group">
                                            <img 
                                                src={getImageUrl(p.image)} 
                                                className="w-20 h-20 object-contain bg-gray-50 rounded-xl p-2 border" 
                                                alt={p.name}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {order.orderStatus === "Processing" && (
                                    <button 
                                        onClick={() => handleCancel(order._id)}
                                        className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-xl transition"
                                    >
                                        <IoCloseCircleOutline size={18} /> Cancel Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold uppercase tracking-widest">Koi orders nahi mile!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;