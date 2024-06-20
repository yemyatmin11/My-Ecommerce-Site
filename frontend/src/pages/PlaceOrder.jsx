import React, { useContext, useEffect, useState } from 'react';
import CartSummary from '../components/CartSummary';
import { CartContext } from '../contexts/CartContext';
import axios from '../helpers/axios';
import { AuthContext } from '../contexts/AuthContext';
import useTheme from '../hooks/useTheme';

export default function PlaceOrder() {

  const { totalAmount, cartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  let [products, setProducts] = useState([]);
  let { isDark } = useTheme();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  useEffect(() => {
    let fetchProducts = async() => {
      try {
        let res = await axios.get('/api/products');
        if(res.status === 200) {  
          setProducts(res.data.data);
        } else {
          console.error('Failed to fetch products:', res);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    }
    fetchProducts()
  }, [])

  let onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name] : value}))
  }


  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    products.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
    
    let orderData = {
      userId : user._id,  
      address : data,
      items : orderItems,
      amount : totalAmount + 2
    }

    let res = await axios.post('/api/orders/place', orderData);
    if(res.status === 200) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    }
    else {
      alert('Error');
    }
  }

  return (
    <form onSubmit={placeOrder} className='w-[70%] mx-auto grid md:grid-cols-[3fr_1fr] gap-3 mt-32 md:space-y-0 mb-32'>
      <div className='w-full md:w-1/2'>
        <h1 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : ''}`}>Delivery Information</h1>
        <div className='space-y-3'>
          <div className='flex gap-3'>
            <input
              value={data.firstName}
              onChange={onChangeHandler}
              type="text" 
              name='firstName'
              placeholder='First Name' 
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
              required/>
            <input
              value={data.lastName}
              onChange={onChangeHandler}
              type="text" 
              name='lastName'
              placeholder='Last Name' 
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
              required/>
          </div>
          <input
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            name='email'
            placeholder='Email address' 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
            required/>
          <input
            value={data.street}
            onChange={onChangeHandler}
            type="text" 
            name='street'
            placeholder='Street' 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
            required/>
          <div className='flex gap-3'>
            <input
              value={data.city}
              onChange={onChangeHandler}
              type="text" 
              name='city'
              placeholder='City' 
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
              required/>
            <input
              value={data.state}
              onChange={onChangeHandler}
              type="text" 
              name='state'
              placeholder='State' 
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
              required/>
          </div>
          <div className='flex gap-3'>
            <input
              value={data.zipCode}
              onChange={onChangeHandler}
              type="text" 
              name='zipCode'
              placeholder='Zip code' 
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
              required/>
            <input
              value={data.country}
              onChange={onChangeHandler}
              type="text" 
              name='country'
              placeholder='Country' 
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
              required/>
          </div>
          <input
            value={data.phone}
            onChange={onChangeHandler}
            type="text" 
            name='phone'
            placeholder='Phone' 
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 mb-3'
            required/>
        </div>
      </div>

      <CartSummary type='order'/>
    </form>
  );
}
