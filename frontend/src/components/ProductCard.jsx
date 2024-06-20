import React, { useContext } from 'react';
import Categories from './Categories';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import axios from '../helpers/axios';
import plusIcon from '../assets/addCircle.svg';
import minusIcon from '../assets/minus.svg';
import { CartContext } from '../contexts/CartContext';


export default function ProductCard({ product, onDeleted }) {

  const {cartItems, addToCart, removeFromCart} = useContext(CartContext);

  let navigate = useNavigate();

  let deleteProduct = async (e) => {
    e.preventDefault();
    let res = await axios.delete('/api/products/' + product._id);
    onDeleted(product._id);
  };

  let { isDark } = useTheme();

  

  return (
    <div className={`border h-full rounded-lg shadow-xl ${isDark ? 'bg-gray-800 text-white' : 'bg-white border-gray-200'}`}>
      <Link to={`/products/${product._id}`} className="block">
        <div className="text-center">
          <img className='w-full h-60 object-cover' src={"http://localhost:4000/products" + product.photo} alt="" />
        </div>
      </Link>
      <div className='p-3 space-y-1'>
      <div className='flex justify-between'>
        <div className='w-[80%]'>
          <h1 className="font-bold text-xl">{product.name}</h1>
        </div>
        <div className='flex flex-col items-center space-y-1'>
          <button onClick={e => {
            e.preventDefault();
            navigate(`/products/edit/${product._id}`)
          }} 
          className='bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700'>
            Edit
          </button>

          <button onClick={e => deleteProduct(e)} className='bg-red-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-red-600'>Delete</button>
        </div>
      </div>
      <p>Price - <span className='font-bold text-orange-600'>${product.price}</span></p>
      <Categories categories={product.categories} />
      <div className='flex justify-between items-center'>
        {/* <p className='text-gray-500'>Created by - {product.user.name}</p> */}
        <p className='text-gray-500 text-sm'>Published at - {new Date(product.createdAt).toLocaleString()}</p>
        {!cartItems[product._id] ? 
          <img 
            onClick={() => addToCart(product._id)} 
            src={plusIcon} 
            alt="" 
            className="cursor-pointer w-6 h-6"
          /> 
          : 
          <div className='flex items-center'>
            <img 
              onClick={() => removeFromCart(product._id)} 
              src={minusIcon} 
              alt="" 
              className="cursor-pointer w-6 h-6"
            />
            <p className='mx-2'>{cartItems[product._id]}</p>
            <img 
              onClick={() => addToCart(product._id)} 
              src={plusIcon} 
              alt="" 
              className="cursor-pointer w-6 h-6"
            />
          </div>
        }
      </div> 
      </div> 
    </div>
  );
}
