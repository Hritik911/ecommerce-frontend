import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../src/Navbar"; // Ensure path is correct
import { toast, Toaster } from "react-hot-toast";
import { IoLocationOutline, IoBagCheckOutline } from "react-icons/io5";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    
    const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

    const [address, setAddress] = useState({
        phone: "",
        address: "",
        pincode: "",
        city: ""
    });

    
    const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

    const handleOrder = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to place an order");
            navigate("/");
            return;
        }

        try {
        
            const res = await axios.post(`${BACKEND_URL}/api/users/place-order`, {
                products: cartItems,
                totalAmount,
                shippingAddress: address
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 201) {
                toast.success("Order Placed Successfully!");
                
                setTimeout(() => navigate("/myOrders"), 2000);
            }
        } catch (err) {
            console.error("Order error:", err);
            toast.error(err.response?.data?.message || "Failed to place order");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <Toaster />
            <Navbar />
            <div className="max-w-[800px] mx-auto px-4 py-10">
                <h1 className="text-3xl font-[1000] uppercase italic tracking-tighter mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    
                    <form onSubmit={handleOrder} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-4">
                        <h2 className="font-black uppercase text-sm tracking-widest mb-2 flex items-center gap-2">
                            <IoLocationOutline size={20} className="text-blue-600" /> Shipping Details
                        </h2>
                        
                        <input 
                            required type="text" placeholder="Phone Number"
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition"
                            value={address.phone}
                            onChange={(e) => setAddress({...address, phone: e.target.value})}
                        />
                        <textarea 
                            required placeholder="Full Address" rows="3"
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition"
                            value={address.address}
                            onChange={(e) => setAddress({...address, address: e.target.value})}
                        />
                        <div className="flex gap-4">
                            <input 
                                required type="text" placeholder="Pincode"
                                className="w-1/2 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition"
                                value={address.pincode}
                                onChange={(e) => setAddress({...address, pincode: e.target.value})}
                            />
                            <input 
                                required type="text" placeholder="City"
                                className="w-1/2 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition"
                                value={address.city}
                                onChange={(e) => setAddress({...address, city: e.target.value})}
                            />
                        </div>
                        <button type="submit" className="mt-4 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition shadow-lg active:scale-95 flex items-center justify-center gap-3">
                            Confirm Order <IoBagCheckOutline size={20}/>
                        </button>
                    </form>

                   
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
                        <h2 className="font-black uppercase text-sm tracking-widest mb-6">Payment Method</h2>
                        <div className="p-4 border-2 border-blue-600 rounded-2xl bg-blue-50 flex items-center gap-4">
                            <div className="w-5 h-5 border-4 border-blue-600 rounded-full"></div>
                            <span className="font-bold text-gray-800">Cash on Delivery (COD)</span>
                        </div>
                        
                        <div className="mt-8 border-t pt-6">
                            <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                                <span>Total to Pay</span>
                            </div>
                            <div className="text-4xl font-[1000] text-gray-900 mt-2 tracking-tighter">
                                ₹{totalAmount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;