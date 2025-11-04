import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from './pages/Verify/Verify'; // or wherever your file lives
import MyOrders from "./pages/MyOrders/MyOrders";
import SearchResults from "./components/SearchResult/SearchResult";
import FoodDetail from "./components/FoodDetail/FoodDetail";
import SearchBar from "./components/SearchResult/SearchBar";
import { food_list } from './assets/assets';
import { assets } from './assets/assets';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);



  return (
    <>
    

      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">

         <img src={assets.mxwezmql} alt="Menu" style={{ maxWidth: '300px', margin: '16px auto', display: 'block' }} />

        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} /> {/* ✅ Make sure this exists */}
        {/* other routes */}
           <Route path="/verify" element={<Verify />} />
           <Route path="/myorders" element={<MyOrders/>}/>
            <Route path="/search" element={<SearchResults food_list={food_list} />} />
              <Route path="/menu/:id" element={<FoodDetail food_list={food_list} />} />
            <Route path="/bar" element={<SearchBar/>}/>
        </Routes>
      </div>

      <Footer />


    </>
  );
};

export default App;
