import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <section className='food-display' id='food-display'>
      <div className="food-display-container">
        <h2>Top Dishes Near You</h2>
        <div className='food-display-list'>
          {food_list.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={item._id}
                  image={item.image}
                  name={item.name}
                  desc={item.description}
                  price={item.price}
                  id={item._id}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default FoodDisplay;
