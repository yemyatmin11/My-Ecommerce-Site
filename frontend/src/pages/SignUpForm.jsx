import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../helpers/axios';
import { toast } from 'react-toastify';

export default function SignUpForm() {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors] = useState(null)

    let navigate = useNavigate();

    let register = async (e) => {
        try {
            e.preventDefault();
            setErrors(null);
            let data = {
                name,
                email,
                password
            }
            let res = await axios.post("/api/users/register",data , {
                withCredentials : true
            });
            if(res.status === 200) {
                navigate('/');
                toast.success('Register Successfully')
            }
        } catch (e) {
            setErrors(e.response.data.errors);
            toast.error('Something went wrong');
        }
    }

  return (
    <div className="w-full max-w-md mx-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={register}>
            <h1 className='text-2xl font-bold text-center'>Register Form</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
                    Name
                </label>
                <input value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Name" type="text" placeholder="Name"/>
                {!!(errors && errors.name) && <p className="text-red-500 text-xs italic">{errors.name.msg}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                    Email
                </label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="text" placeholder="Email"/>
                {!!(errors && errors.email) && <p className="text-red-500 text-xs italic">{errors.email.msg}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                {!!(errors && errors.password) && <p className="text-red-500 text-xs italic">{errors.password.msg}</p>}
            </div>

            <div className="flex items-center justify-between">
                <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </button>
                <Link to='/sign-in' className="inline-block align-baseline font-bold text-sm text-orange-600 hover:text-orange-700">
                    Login
                </Link>
            </div>
        </form>
        
        <p className="text-center text-gray-500 text-xs">
            &copy;2024 Acme Corp. All rights reserved.
        </p>
    </div>
  )
}
