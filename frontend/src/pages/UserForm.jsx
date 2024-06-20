import { useNavigate, useParams } from 'react-router-dom';
import axios from '../helpers/axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function UserForm() {

  let { id } = useParams();
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [preview, setPreview] = useState(null);
  let [file, setFile] = useState(null);
  let [error, setError] = useState(null);
  let { dispatch } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    let fetchUsers = async () => {
      let res = await axios.get('/api/users/'+id)
      if(res.status == 200) {
        setName(res.data.name);
        setEmail(res.data.email);
        setPreview("http://localhost:4000/users"+res.data.photo);
      }
    }
    fetchUsers();
  }, [id])
  
  let handleSubmit = async (e) => {
    e.preventDefault();

    if(!file) {
      setError('Photo is required');
      return;
    }

    let user = {
      name,
      email
    }

    try {
      let res = await axios.patch('/api/users/'+id, user)
      if(res.status === 200) {
        let formData = new FormData;
        formData.set('photo', file);
  
        let uploadRes = await axios.post(`/api/users/${id}/upload`, 
          formData , {
            headers : {
              Accept : 'multipart/form-data'
            }
          }
        )
        console.log(uploadRes)
        
        let updatedUser = await axios.get(`/api/users/`+ id);
        dispatch({ type : 'LOGIN', payload : updatedUser.data});
      
        navigate('/profile/' + id);
        toast.success('Updated Profile Successfully')
      }
      
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }

  let upload = (e) => {
    let file = e.target.files[0];
    if(file) {
      setFile(file);
      setError('');
      let fileReader = new FileReader;

      fileReader.onload = (e) => {
        setPreview(e.target.result);
      }

      fileReader.readAsDataURL(file);
    }
    else {
      setFile(null);
      setPreview(null);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/profile/' + id)
  }

  return (
    <div className='flex justify-center items-center m-5'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg border border-gray-300 shadow-md'>
        <h1 className='mb-6 text-2xl font-bold text-center'>Edit Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {!!error && <p className='text-red-500'>{error}</p>}

          <label className='text-orange-600'>Name</label>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className='w-full p-2 border border-gray-300 rounded-lg' 
            type="text" 
          />
          
          <label className='text-orange-600'>Email</label>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className='w-full p-2 border border-gray-300 rounded-lg' 
            type="email" 
          />

          <input type="file" id='uploadBtn' onChange={upload} className='hidden'/>
          <label htmlFor="uploadBtn" className='bg-orange-600 text-white cursor-pointer font-bold w-36 text-sm p-2 rounded-sm uppercase select-none tracking-wide'>
          <i className="fa-solid fa-upload mr-2"></i>Upload file</label>
          {preview && <img src={preview} alt="Preview" className='mt-3' />}

          <button type='submit' className='bg-orange-600 text-white p-2 rounded-full mt-3'>Save Profile</button>
          <button onClick={handleCancel} className='text-orange-600 border-2 border-orange-600 p-1 rounded-full'>Cancel</button>
        </form>
      </div>
    </div>
  )
}
