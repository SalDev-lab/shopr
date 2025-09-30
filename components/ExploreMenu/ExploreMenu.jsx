import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <section className='explore-menu' id='explore-menu'>
      <div className="explore-menu-container">
        <h2>Explore Our Menu</h2>
        <p className='explore-menu-text'>
          Choose from a diverse menu featuring a delectable array of dishes. 
          Our mission is to satisfy your cravings and elevate your dining experience.
        </p>

        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div 
              key={index} 
              className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </section>
  );
};

export default ExploreMenu;
