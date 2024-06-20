import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HtmlReactParser from 'html-react-parser';
import deleteIcon from '../assets/deleteIcon.svg';
import editIcon from '../assets/editIcon.svg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function List() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let fetchProducts = async() => {
      try {
        let res = await axios.get('http://localhost:4000/api/products');
        if(res.status === 200) {
          setProducts(res.data.data);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        setError('An error occurred while fetching users');
        toast.error('An error occurred while fetching users');
      }
    }
    fetchProducts();
  }, []);

  const deleteProduct = async(productId) => {
    setProducts(prev => prev.filter(p => p._id !== productId));
    let res = await axios.delete('http://localhost:4000/api/products/'+ productId);
    if(res.status === 200) {
      navigate('/list');
      toast.success('Deleted Products Successfully');
    }
  }


  return (
    <div className='m-5'>
      <h1 className='text-xl font-bold'>All Products List</h1>
      <div className='border border-gray-400 mt-3 shadow-md rounded-sm'>
        <div className='grid grid-cols-[2fr_0.5fr_1fr_3fr_2fr_1fr_2fr] bg-orange-600 text-white p-3 w-full font-medium'>
          <p>Image</p>
          <p>No</p>
          <p>Name</p>
          <p>Description</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        <div>
          {products.length > 0 && products.map((product,index) => {
            return (
              <div key={index} className='grid grid-cols-[2fr_0.5fr_1fr_3fr_2fr_1fr_2fr] border-b border-b-gray-400 p-3 items-center'>
                <img src={"http://localhost:4000/products" + product.photo} alt="" className='w-20 h-14 rounded-lg'/>
                <p>{index + 1}</p> 
                <p>{product.name}</p>
                <p>{HtmlReactParser(product.description)}</p>
                <div className='flex flex-col gap-1'>
                  {product.categories.length > 0 && product.categories.map((category,index) => (
                    <span key={index}>{category}</span>
                  ))}
                </div>
                <p>${product.price}</p> 
                <div className='flex items-center space-x-5'>
                  <img onClick={e => {
                    e.preventDefault();
                    navigate(`products/edit/${product._id}`)
                  }} src={editIcon} alt="" className='cursor-pointer w-6'/>
                  <img onClick={e => deleteProduct(product._id)} src={deleteIcon} alt="" className=' cursor-pointer w-6'/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
