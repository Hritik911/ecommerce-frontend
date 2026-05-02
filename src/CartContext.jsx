import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    
    
    const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

    const updateCartCount = async () => {
        const token = localStorage.getItem("token");
        
        if (token) {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/users/get-cart`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (res.data && Array.isArray(res.data)) {
                    const totalQuantity = res.data.reduce((total, item) => {
                        return total + (item.quantity || 1);
                    }, 0);

                    setCartCount(totalQuantity); 
                }
            } catch (err) {
                console.log("Context API Error:", err.response?.data || err.message);
                
        
                if (err.response?.status === 401) {
                    setCartCount(0);
                }
            }
        } else {
            setCartCount(0);
        }
    };

    
    useEffect(() => {
        updateCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);