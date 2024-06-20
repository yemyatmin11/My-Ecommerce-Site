import axios from 'axios';
import React, { useEffect, useState } from 'react';
import deleteIcon from '../assets/deleteIcon.svg';
import { useNavigate } from 'react-router-dom';
import editIcon from '../assets/editIcon.svg';
import { toast } from 'react-toastify';

export default function User() {

    let [users, setUsers] = useState([]);
    let [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await axios.get('http://localhost:4000/api/users');
            if (res.status === 200) {
              setUsers(res.data);
            } else {
              throw new Error('Failed to fetch users');
            }
          } catch (error) {
            setError('An error occurred while fetching users');
            toast.error('An error occurred while fetching users');
          }
        };
        fetchUsers();
      }, []);

    const deleteUser = async(userId) => {
        setUsers(prev => prev.filter(u => u._id !== userId));
        let res = await axios.delete(`http://localhost:4000/api/users/${userId}`);
        if(res.status === 200) {
            toast.success('Deleted User successfully')
            navigate('/users');
        }
    }


    return (
        <div className='m-5'>
            <h1 className='text-xl font-bold'>All Users List</h1>
            <div className='border border-gray-400 mt-5 shadow-md rounded-sm'>
                <div className='grid grid-cols-[2fr_0.5fr_2.5fr_2fr_2fr_2fr] gap-3 bg-orange-600 text-white p-3 font-medium'>
                    <p>Photo</p>
                    <p>No.</p>
                    <p>ID</p>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Actions</p>
                </div>
                <div>
                    {users.length > 0 && users.map((user, index) => {
                        return (
                            <div key={index} className='grid grid-cols-[2fr_0.5fr_2.5fr_2fr_2fr_2fr] items-center gap-3 border-b border-b-gray-400 p-3'>
                                <img src={"http://localhost:4000/users" + user.photo} alt="User Photo" className='w-20 h-14 rounded-lg'/>
                                <p>{index + 1}</p>
                                <p>{user._id}</p>     
                                <p>{user.name}</p>    
                                <p>{user.email}</p>   
                                <div className='flex items-center space-x-5'>
                                    <img onClick={e => {
                                        e.preventDefault();
                                        navigate(`/users/edit/${user._id}`)
                                    }} src={editIcon} alt="" className='w-6 cursor-pointer'/>
                                    <img onClick={e => deleteUser(user._id)} src={deleteIcon} alt="" className='w-6 cursor-pointer'/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
  )
}
