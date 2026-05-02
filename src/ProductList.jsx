import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    
    const BACKEND_URL = "https://ecommerce-backend-g2g1.onrender.com";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `${BACKEND_URL}/api/users/all-products`
                );

                setProducts(res.data);
                setLoading(false);

            } catch (err) {
                console.error("Error fetching products", err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // FILTER PRODUCTS
    const filteredProducts = products.filter((item) => {
        const cat = item.category || "Other";
        return (
            cat !== "Games" &&
            cat !== "Books" &&
            cat !== "Electronics"
        );
    });

    
    const customOrder = ["Mobiles", "Fashion", "Toys"];

    filteredProducts.sort((a, b) => {
        return (
            customOrder.indexOf(a.category) -
            customOrder.indexOf(b.category)
        );
    });

    
    const gradientColors = [
        "from-[#f7797d] via-[#FBD786] to-[#C6FFDD]",
        "from-[#74ebd5] via-[#ACB6E5] to-[#74ebd5]",
        "from-[#4568DC] via-[#B06AB3] to-[#4568DC]",
    ];

    if (loading) {
        return (
            <p className="p-4 text-center font-bold">
                Loading Store...
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

            {filteredProducts.map((item, index) => (

                <div
                    key={item._id}
                    onClick={() =>
                        navigate(`/category/${item.category || "Other"}`)
                    }
                    className={`flex items-center cursor-pointer bg-gradient-to-r ${
                        gradientColors[index % gradientColors.length]
                    } border border-white/20 rounded-lg shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all p-2 gap-4 h-24 overflow-hidden`}
                >
                    
                    <div className="w-20 h-20 flex-shrink-0 bg-white/40 backdrop-blur-sm rounded-md overflow-hidden shadow-inner">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                    </div>

                    
                    <div className="flex flex-col justify-center overflow-hidden flex-grow">
                        <h3 className="text-sm font-bold text-gray-800 uppercase truncate">
                            {item.name}
                        </h3>

                        <p className="text-[9px] text-gray-600 font-bold">
                            Category: {item.category || "Not Set"}
                        </p>

                        <p className="text-[10px] text-gray-700 font-bold mt-1 opacity-80">
                            In Stock
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;