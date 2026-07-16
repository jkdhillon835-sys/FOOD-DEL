import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer'id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
             <img src={ assets.logo} alt="" />
             <p>  Bringing your favorite meals right to your door — fresh, fast, and full of flavor. 
            Because good food makes every day better.</p>
             <div className="footer-social-icons">
                <img src={ assets.facebook_icon} alt="" />
                <img src={ assets.twitter_icon} alt="" />
                <img src={ assets.linkedin_icon} alt="" />
             </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-542-8974</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr/> 
      <p className="footer-copyright">
        © 2025 Food Del — Serving smiles and fresh flavors. All rights reserved by Jasleen kaur and Harleen Kaur.
        This is a student project, not a real food delivery service.
      </p>
      <small>Available on <a href="https://www.codester.com/items/67791/food-delivery-website-full-stack-code?ref=WebSolutions" target="_blank">Codester</a></small>

    </div>
  )
}

export default Footer