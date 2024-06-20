import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

export default function CartSummary({ type='checkout' }) {

    const { totalAmount, loading } = useContext(CartContext);
    let { isDark } = useTheme();

    if(loading) {
        return <div>loading...</div>
    }

    return (
        <div className="mt-10 space-y-5 flex flex-col">
            <h1 className={`font-bold text-2xl ${isDark ? 'text-white' : ''}`}>Cart Totals</h1>
            <div className="flex justify-between text-gray-500">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
            </div>
            <hr className="mt-3" />
            <div className="flex justify-between text-gray-500">
                <p>Delivery Fee</p>
                <p>${totalAmount === 0 ? 0 : 2}</p>
            </div>
            <hr className="mt-3" />
            <div className="flex justify-between font-bold">
                <p className={`${isDark ? 'text-white' : ''}`}>Total</p>
                <p className={`${isDark ? 'text-white' : ''}`}>${totalAmount === 0 ? 0 : totalAmount + 2}</p>
            </div>
            {type === 'checkout' && <Link to={'/order'} className="border-none text-white bg-orange-600 w-52 p-2 rounded-lg cursor-pointer">PROCEED TO CHECKOUT</Link>}
            {type === 'order' && <button type='submit' className="border-none text-white bg-orange-600 w-52 p-2 rounded-lg cursor-pointer">PROCEED TO PAYMENT</button>}
        </div>
        
    )
}
