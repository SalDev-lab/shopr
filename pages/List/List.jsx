import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Server error");
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Server error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list-container'>
      <h2>All Foods List</h2>
      <div className='list-table'>
        <div className="list-row header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-row'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <span>{item.name}</span>
            <span>{item.category}</span>
            <span>{currency}{item.price}</span>
            <span className='remove-btn' onClick={() => removeFood(item._id)}>x</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
