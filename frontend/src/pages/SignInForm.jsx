import axios from '../helpers/axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function SignInForm() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(null);
    let { dispatch } = useContext(AuthContext);

    let navigate = useNavigate();

    let login = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            let data = {
                email,
                password
            }

            let res = await axios.post('/api/users/login', data , {
                withCredentials : true
            })
            if(res.status == 200) {
                dispatch( {type : "LOGIN", payload : res.data.user})
                navigate('/');
                toast.success('Logined Successfully')
            }
        } catch (e) {
            setError(e.response.data.errors);
            toast.error('Something went wrong');
        }
        
    }


  return (
    <div className="w-full max-w-md mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
            <h1 className='text-2xl font-bold text-center'>Login Form</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                    Email
                </label>
                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="Email" 
                    type="text" 
                    placeholder="Email"/>
                    {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    type="password" 
                    placeholder="******************"/>
            </div>

            <div className="flex items-center justify-between">
                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Login
                </button>
                <Link to="/sign-up" className="inline-block align-baseline font-bold text-sm text-orange-600 hover:text-orange-700">
                    Create an account
                </Link>
            </div>
        </form>
        
        <p className="text-center text-gray-500 text-xs">
            &copy;2024 Acme Corp. All rights reserved.
        </p>
    </div>
  )
}
