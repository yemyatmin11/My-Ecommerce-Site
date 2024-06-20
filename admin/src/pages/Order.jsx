import axios from 'axios';
import React, { useEffect, useState } from 'react';
import percelIcon from '../assets/percel.jpg';

export default function Order() {

  let [orders, setOrders] = useState([]);

  let fetchOrders = async() => {
    let res = await axios.get('http://localhost:4000/api/orders');
    console.log(res.data);
    if(res.status === 200) {
      setOrders(res.data)
    }
  }

  const statusHandler = async(e, orderId) => {
    let res = await axios.post('http://localhost:4000/api/orders/status', {
      orderId,
      status : e.target.value
    });
    if(res.status === 200) {
      await fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className='m-5'>
      <h1 className='text-3xl font-bold mb-5'>All Orders List</h1>
      <div className='flex flex-wrap gap-6'>
        {orders.length > 0 && orders.map((order, index) => (
          <div key={index} className=' w-[30%]  bg-white rounded-lg shadow-md overflow-hidden'>
            <img src={percelIcon} alt="Parcel Icon" className='w-full h-40 object-contain' />
            <div className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <div className='text-lg font-semibold'>Order #{index + 1}</div>
              </div>
              <div className='mb-2'>
                <p className='font-semibold'>Items:</p>
                <ul className='list-disc ml-6'>
                  {order.items.map((item, i) => (
                    <li key={i} className='text-sm text-gray-700'>{`${item.name} x ${item.quantity}`}</li>
                  ))}
                </ul>
              </div>
              <div className='mb-2'>
                <p className='font-semibold'>Customer:</p>
                <p className='text-sm text-gray-700'>{order.address.firstName} {order.address.lastName}</p>
              </div>
              <div className='mb-2'>
                <p className='font-semibold'>Address:</p>
                <p className='text-sm text-gray-700'>{`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
              </div>
              <div className='flex justify-between mb-2'>
                <div>
                  <p className='font-semibold'>Number of Items:</p>
                  <p className='text-sm text-gray-700'>{order.items.length}</p>
                </div>
                <div>
                  <p className='font-semibold'>Total Amount:</p>
                  <p className='text-sm text-gray-700'>${order.amount}</p>
                </div>
              </div>
              <div>
                <p className='font-semibold'>Status:</p>
                <select onChange={e => statusHandler(e,order._id)} value={order.status} className='block w-full rounded-sm bg-orange-500 text-white p-2 outline-none shadow-sm select-none cursor-pointer'>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
