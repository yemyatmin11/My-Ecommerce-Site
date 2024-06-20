import { AuthContext } from '../contexts/AuthContext';
import axios from '../helpers/axios';
import React, { useContext, useEffect, useState } from 'react';
import percelIcon from '../assets/percel.jpg';
import useTheme from '../hooks/useTheme';

export default function MyOrders() {

  const [data, setData] = useState([]);
  let { user } = useContext(AuthContext);
  let { isDark } = useTheme();

  let fetchUserOrders = async() => {
    let res = await axios.post('/api/orders/userorders', {
      userId : user._id
    })
    if(res.status === 200) {
      setData(res.data);
      console.log(res.data)
    }
  }
    
  
  useEffect(() => {
    fetchUserOrders ();
  }, [user]);

  return (
    <div className={`w-[90%] mx-auto mt-14 mb-10 ${isDark ? 'text-white' : ''}`}>
      <h1 className='text-2xl font-bold'>My Orders</h1>
      <div className='flex flex-col gap-5 mt-5'>
        {data.length > 0 ? (
          data.map((order,index) => {
            return (
              <div key={index} className='border border-orange-600 p-3 grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-8 text-sm rounded-lg'>
                <img src={percelIcon} alt="" className='w-12'/>
                <p>{order.items.map((item,index) => {
                  if(index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity
                  }
                  else {
                    return item.name + ' x ' + item.quantity + ', '
                  }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items : {order.items.length}</p>
                <p><span className='text-orange-600 mr-1'>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={fetchUserOrders} className='bg-orange-600 text-white font-bold p-3 border-none rounded'>Track Order</button>
              </div>
            )
          })
          
        ) : (
          <p className='text-center text-lg'>No orders found.</p>
        )}
      </div>
    </div>
  )
}
