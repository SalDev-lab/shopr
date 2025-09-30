import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-overlay">
        <div className="header-container">
          <div className="header-text">
            <h1>Order Your Favorite Cakes & Pastries Today!</h1>
            <p>
              Indulge in a delightful selection of cakes, pastries, and 
              gourmet treats crafted with love and precision. At Golden Princess Cakes & Event,
               our mission is to make every celebration unforgettable and satisfy your sweetest 
               cravings with elegance and care.
            </p>
            <button>Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
