import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const [searchQuery, setSearchQuery] = useState("");
  // Add state to control search input visibility
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // Search handler function
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false); // Optional: hide input after search
      setSearchQuery(""); // Optional: clear input after search
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt="logo" />
      </Link>

      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}> home</Link>
        </li>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
      </ul>

      <div className="navbar-right">
        {/* Toggle-able search input and search button */}
        <div className="navbar-search">
          {!showSearch ? (
            <img
              src={assets.search_icon}
              alt="search"
              style={{ cursor: "pointer" }}
              onClick={() => setShowSearch(true)}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                className="navbar-search-input"
                autoFocus
              />
              <img
                src={assets.search_icon}
                alt="search"
                style={{ cursor: "pointer", marginLeft: 4 }}
                onClick={handleSearch}
              />
            </div>
          )}
        </div>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
          {getTotalCartAmount() > 0 && <div className="dot" aria-label="Items in cart"></div>}
          <div className="dot"></div>
        </div>

        {!token
          ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={() => setToken(null)} style={{ cursor: 'pointer' }}></li>
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar
