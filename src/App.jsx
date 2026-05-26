import { BrowserRouter, Routes , Route } from "react-router-dom";
import Start from "./Route"
import Register from "./RegisterForm"
import Forget from "./ForgetPassword"
import Reset from "./ResetPassword"
import Dashboard from "./Dashbored";
import ShowProduct from "./AddProduct"
import AddBanner from "./AddImages"
import CategoryPage from "./Category"
import AddMobile from "./AddMobile"
import { CartProvider } from "./CartContext";
import { Toaster } from "react-hot-toast";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import MyOrders from "./MyOrders";
import About from "./About";
import Contact from "./Contact";

function AppRoute(){
    return(
        <CartProvider> 
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Start />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/forgetpassword" element={<Forget />}></Route>
                    <Route path="/reset-password" element={<Reset />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/product" element={<ShowProduct />}></Route>
                    <Route path="/addimages" element={<AddBanner />}></Route>
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/search" element={<CategoryPage />} />
                    <Route path="/addmobile" element={<AddMobile />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/myOrders" element={<MyOrders />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    )
}

export default AppRoute;