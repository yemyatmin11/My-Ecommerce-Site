import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import HTMLReactParser from 'html-react-parser/lib/index';

export default function ProductDetails() {

  let { id } = useParams();

  let [product, setProduct] = useState(null);

  useEffect(() => {
    let fetchProducts = async () => {
      try {
        let res = await axios.get('/api/products/'+id)
        if(res.status == 200) {
          setProduct(res.data);
        }
      } catch (e) {
        console.error('Error fetching product : ' + e)
      }
    }
    fetchProducts();
  }, [id])
  
  let { isDark } = useTheme();


  return (
    <div className='w-[70%] mx-auto m-5'>
      {!!product && (
        <>
          <div className={`md:flex md:w-full rounded-lg shadow-md border p-6 gap-5 space-y-5 ${isDark ? 'bg-dcard text-white' : ''}`}>
            <div className='w-full md:w-1/3'>
              <img src={"http://localhost:4000/products"+product.photo} alt="" className='w-full'/>
            </div>
            <div className='text-justify md:w-2/3'>
              <h1 className='text-orange-600 text-3xl font-bold mb-2'>{product.name}</h1>
              <h3 className='font-bold text-xl mb-3'>Description</h3>
              <p className='indent-10 text-sm text-justify leading-6'>{HTMLReactParser(product.description)}</p>
              <p className='font-bold mt-2'>Price - <span className='text-orange-600 font-bold '>${product.price}</span></p>
              <span className='font-bold'>Categories - <span className='text-orange-600 font-bold'>{product.categories.join(', ')}</span></span>
              <p className='text-gray-500 text-sm mt-2'>Published at - {new Date(product.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h3 className={`${isDark ? 'text-white' : ''} font-bold text-2xl text-center mt-3`}>Comments</h3>
            <CommentForm />
            <CommentList />
          </div>
        </>
      )}
    </div>
  )
}
