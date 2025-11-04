import React, { useEffect, useState, useContext } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Move fetchOrders out of useEffect so it can be reused
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        url + '/api/order/userorders',
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, );

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.map((order, orderIndex) => (
          <div key={orderIndex} className='my-orders-order'>
            <img src={assets.parcel_icon} alt='Parcel Icon' />
            <p>
              {order.items.map((item, itemIndex) => {
                const suffix = itemIndex === order.items.length - 1 ? '' : ', ';
                return (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {suffix}
                  </span>
                );
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;



