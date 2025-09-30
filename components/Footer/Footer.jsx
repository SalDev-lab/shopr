import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className="footer-content">

        {/* LEFT SECTION */}
        <div className="footer-section footer-left">
          <img src={assets.logo} alt="Logo" className="footer-logo"/>
          <p>
            Golden Princess Cakes & Event creates exquisite cakes, pastries, and treats for every occasion.
            We are dedicated to making your celebrations memorable with quality, creativity, and a touch of sweetness.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=100079941982571"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="https://www.instagram.com/invites/contact/?igsh=1rhvynkn5djph&utm_content=tmxt1ph"><img src={assets.twitter_icon} alt="Twitter" /></a>
            <a href="https://wa.me/2347088154697"><img src={assets.linkedin_icon} alt="WhatsApp"/></a>
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-section footer-center">
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-section footer-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>+234 708 815 4697</li>
            <li>goldenprincesscakes@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-bottom">
        Copyright 2025 © Golden Princess Cakes_n_Event - All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
