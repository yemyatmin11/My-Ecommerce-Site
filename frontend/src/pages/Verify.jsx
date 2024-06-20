import axios from '../helpers/axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate();

    let verifyPayment = async () => {
        try {
            const res = await axios.post('/api/orders/verify', { success, orderId });
            if(res.status === 200) {
                navigate('/myorders');
            }
            else {
                navigate('/');
            }
        } catch (e) {
            console.error('Error verifying payment:', e);
            navigate('/');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-orange-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-600">Verifying your order...</p>
    </div>
  )
}
