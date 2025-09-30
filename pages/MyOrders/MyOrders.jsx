import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <section className='my-orders'>
      <h2>My Orders</h2>
      <div className="my-orders-container">
        {data.length === 0 && <p className="no-orders">You have no orders yet.</p>}
        {data.map((order, index) => (
          <div key={index} className='my-orders-card'>
            <div className="my-orders-card-header">
              <img src={assets.parcel_icon} alt="Order" />
              <p className="my-orders-items">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}{idx !== order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
            <div className="my-orders-card-info">
              <p><b>Total:</b> {currency}{order.amount}.00</p>
              <p><b>Items:</b> {order.items.length}</p>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
