import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [statusCount, setStatusCount] = useState({
    "Food Processing": 0,
    "Out for delivery": 0,
    "Delivered": 0
  });

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const reversedOrders = response.data.data.reverse();
        setOrders(reversedOrders);

        // Count status numbers
        const count = { "Food Processing": 0, "Out for delivery": 0, "Delivered": 0 };
        reversedOrders.forEach(order => {
          count[order.status] = (count[order.status] || 0) + 1;
        });
        setStatusCount(count);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Server error");
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='orders-container'>
      <h2>Orders Dashboard</h2>

      <div className='orders-status-summary'>
        <div className='status-box processing'>
          <p>Food Processing</p>
          <h3>{statusCount["Food Processing"]}</h3>
        </div>
        <div className='status-box out-delivery'>
          <p>Out for Delivery</p>
          <h3>{statusCount["Out for delivery"]}</h3>
        </div>
        <div className='status-box delivered'>
          <p>Delivered</p>
          <h3>{statusCount["Delivered"]}</h3>
        </div>
      </div>

      <div className="orders-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div className='order-info'>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  idx === order.items.length - 1
                    ? item.name + " x " + item.quantity
                    : item.name + " x " + item.quantity + ", "
                ))}
              </p>
              <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
              <p className='order-item-address'>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p className='order-items-count'>Items: {order.items.length}</p>
            <p className='order-amount'>{currency}{order.amount}</p>
            <select className='order-status-select' onChange={(e) => statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
