import axios from '../helpers/axios';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext';
import closeIcon from '../assets/close.svg';
import CartSummary from '../components/CartSummary';
import useTheme from '../hooks/useTheme';

export default function CartPage() {

  const { cartItems, removeFromCart, totalAmount } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  let { isDark } = useTheme();

  useEffect(() => {
    let fetchProducts = async () => {
      let res = await axios.get('/api/products');
      if(res.status === 200) {
        setProducts(res.data.data);
      }
    }
    fetchProducts()
  }, [])


  return (
    <div className="w-[80%] mx-auto m-10">
      <div className="mt-24 bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-6 text-center font-bold md:text-sm lg:text-lg bg-orange-600 text-white py-3 rounded-t-lg">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className="my-4 border-gray-300" />
        <div>
          {products.map((product) => {
            if (cartItems[product._id] > 0) {
              return (
                <div className="grid md:grid-cols-6 space-y-2 items-center text-center text-xl text-gray-800 py-4 border-b border-gray-200" key={product._id}>
                  <img src={"http://localhost:4000/products" + product.photo} alt={product.name} className="w-20 h-20 object-cover rounded-lg mx-auto" />
                  <h1 className="font-bold text-lg">{product.name}</h1>
                  <p className="text-lg">${product.price}</p>
                  <p className="text-lg">{cartItems[product._id]}</p>
                  <p className="text-lg">${(cartItems[product._id] * product.price)}</p>
                  <img
                    onClick={() => removeFromCart(product._id)}
                    src={closeIcon}
                    alt="Remove"
                    className="w-8 h-8 mx-auto bg-red-500 rounded-full cursor-pointer p-1"
                  />
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-20 mt-20'>
        <CartSummary totalAmount={totalAmount}/>
    
        <div>
          <p className={`${isDark ? 'text-white' : ''}`}>If you have a promo code, enter it here</p>
          <div className="mt-3 flex justify-between items-center bg-gray-200 rounded-lg p-2">
            <input type="text" placeholder="Promo code" className="border-none outline-none pl-3 w-full bg-gray-100 rounded-l-lg py-2" />
            <button className="bg-orange-600 text-white p-2 rounded-r-lg">Submit</button>
          </div>
        </div>
    
      </div>
    </div>

  )
  
}
