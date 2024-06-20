import { useNavigate, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddUser() {

    let { id } = useParams();
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors ] = useState({});    

    const navigate = useNavigate();

    useEffect(() => {
        let fetchUsers = async () => {
            try {
                let res = await axios.get(`/api/users/${id}`);
                if (res.status === 200) {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPassword(res.data.password);
                } else {
                    throw new Error('Failed to fetch user');
                }
            } catch (e) {
                toast.error('An error occurred while fetching the user');
            }
        }
        if (id) {
            fetchUsers();
        }
    }, [id]);


    let submit = async(e) => {
        e.preventDefault();

        try {
            let user = {
                name,
                email,
                password
            };
            
            let res;
            if(id) {
                res = await axios.patch(`/api/users/${id}`, user);
            }
            else {
                res = await axios.post("/api/users/register",user , {
                    withCredentials : true
                });
            }
    
            if(res.status === 200) {
                let message = id ? 'Updated User successfully' : 'Created User successfully';
                toast.success(message);
                navigate('/users');
            }
        } catch (e) {
            setErrors(e.response.data.errors);
            toast.error('Something went wrong');
        }
    }



  return (

    <div className='flex justify-center items-center p-5'>
        <div className='w-[30%] bg-white border p-3 rounded-lg shadow-md border-gray-300'>
            <h1 className='text-2xl text-center font-bold mb-6'>{id ? 'User Edit' : 'User Create'} Form</h1>
            <form onSubmit={submit} className='flex flex-col gap-3'>
                <ul className='list-disc pl-5'>
                    {Object.keys(errors).map((error, i) => (
                        <li key={i} className='text-red-600'>{error} is {errors[error].msg}</li>
                    ))}
                </ul>

                <label htmlFor="name">Name</label>
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" 
                    id='name' 
                    className='w-full border border-gray-300 rounded-lg p-1 outline-none'/>

                <label htmlFor="email">Email</label>
                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text" 
                    id='email' 
                    className='w-full border border-gray-300 rounded-lg p-1 outline-none'/>

                <label htmlFor="password">Password</label>
                <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" 
                    id='password' 
                    className='w-full border border-gray-300 rounded-lg p-1 outline-none'/>


                <button type='submit' className='w-full bg-orange-600 text-white mt-3 p-1 rounded-lg hover:bg-orange-700'>{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    </div>

  )
}
