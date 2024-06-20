import React, { useContext, useEffect, useRef, useState } from 'react';
import addIcon from '../assets/addCircle.svg';
import Categories from '../components/Categories';
import axios from '../helpers/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';

export default function ProductForm() {

    const editor = useRef(null);
    let { id }= useParams();
    let [file, setFile] = useState(null);
    let [preview, setPreview] = useState(null);
    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [price, setPrice] = useState('');
    let [categories, setCategories] = useState([]);
    let [newCategories, setNewCategories] = useState('');
    let [errors, setErrors] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        let fetchProducts = async () => {
            let res = await axios.get('/api/products/'+id);
            if(res.status == 200) {
                setName(res.data.name);
                setDescription(res.data.description);
                setPrice(res.data.price);
                setCategories(res.data.categories);    
                setPreview("http://localhost:4000/products" + res.data.photo)            
            } 
        }
        fetchProducts();
    }, [id])

    let addCategory = () => {
        setCategories(prev => [newCategories, ...prev]);
        setNewCategories('');
    }

    let submit = async (e) => {
        try {
            e.preventDefault();
            let product = {
                name,
                description,
                price,
                categories
            };
            let res;
            if(id) {
                res = await axios.patch('/api/products/'+id, product);
            }
            else {
                res = await axios.post('/api/products',product)
            }
            
            let formData = new FormData;
            formData.set('photo', file)

            let uploadRes = await axios.post(`/api/products/${res.data._id}/upload`,
                formData, {
                    headers : {
                        Accept : 'multipart/form-data'
                    }
                }
            )

            console.log(uploadRes)

            if(res.status == 200) {
                let message = id ? "Updated Products Successfully" : "Created Products Successfully";
                navigate('/');
                toast.success(message);
            }
        } catch (e) {
            setErrors(Object.keys(e.response.data.errors));
            toast.error('Something went wrong');
        }
    }

    let upload = (e) => {
        let file = e.target.files[0];
        setFile(file);

        let fileReader = new FileReader;

        fileReader.onload = (e) => {
            setPreview(e.target.result);
        }

        fileReader.readAsDataURL(file);
    }

  return (
    <div className='mx-auto max-w-md border-4 p-3 m-5 rounded-lg space-y-3 bg-white'>
        <h1 className='text-center text-2xl font-bold'>Product {`${id ? 'Edit' : 'Create'}`} Form</h1>
        <form action="" className='flex flex-col space-y-5' onSubmit={submit}>   
            <ul className='list-disc pl-5'>
                {!!errors.length && errors.map((error,i) => (
                    <li key={i} className='text-red-900'>{error} is invalid value</li>
                ))}
            </ul>
            <div>
                <input type="file" id='uploadBtn' onChange={upload} className='hidden'/>
                <label htmlFor="uploadBtn" className='bg-orange-600 text-white cursor-pointer font-bold text-sm p-2 rounded-sm uppercase select-none tracking-wide'>
                <i className="fa-solid fa-upload mr-2"></i>Upload file</label>
            </div>
            {preview && <img src={preview}/>}
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Product Name' className='p-1 rounded-lg w-full border border-gray-300 focus:outline-none focus:shadow-outline'/>
            {/* <textarea value={description} onChange={e => setDescription(e.target.value)} name="" id="" cols="30" rows="5" placeholder='Product Desription' className='p-1 rounded-lg w-full border border-gray-300 focus:outline-none focus:shadow-outline'></textarea> */}
            <JoditEditor
                ref={editor}
                value={description}
                onChange={setDescription}
		    />
            <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder='Product Price' className='p-1 rounded-lg w-full border border-gray-300 focus:outline-none focus:shadow-outline'/>
            <div className='flex items-center space-x-2'>
                <input value={newCategories} onChange={e => setNewCategories(e.target.value)} type="text" placeholder='Categories' className='p-1 rounded-lg w-full border border-gray-300 focus:outline-none focus:shadow-outline'/>
                {!!newCategories && <img src={addIcon} alt="" className='cursor-pointer' onClick={addCategory}/>}
            </div>
            <div>
                <Categories categories={categories}/>
            </div>
            <button type='submit' className='w-full bg-orange-600 text-white p-1 rounded-lg hover:bg-orange-700'>{`${id ? 'Edit' : 'Create'}`}</button>
        </form>
    </div>
  )
}
