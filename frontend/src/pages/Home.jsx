import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import useTheme from '../hooks/useTheme';
import axios from '../helpers/axios';
import { toast } from 'react-toastify';

export default function Home() {

    const [products, setProducts] = useState([]);
    let [links, setLinks] = useState(null);

    let location = useLocation();
    let searchQuery = new URLSearchParams(location.search);
    let page = searchQuery.get('page'); // string
    page = parseInt(page) ?  parseInt(page) : 1; // int

    
    let navigate = useNavigate();

    useEffect(() => {
        let fetchProducts = async () => {
            let response = await axios('/api/products?page='+ page);
            if(response.status == 200) {
                let data = response.data;
                setLinks(data.links)
                setProducts(data.data);

                window.scroll({ top : 0, left : 0, behavior : 'smooth'});
            }
        }
        fetchProducts();
    }, [page]);

  let { isDark } = useTheme();
    
  let onDeleted = (_id) => {
      if(products.length == 1 && page > 1) {
        navigate('?page='+ (page -1));
      }
      else {
        setProducts(prev => prev.filter(p => p._id !== _id));
        toast.success('Deleted Successfully');
      }
    }
  
    

  return (
    <div>
      <HeroSection />
      <div>
        <h1 className={`text-2xl text-center font-bold ${isDark ? 'text-white' : ''}`}>{products.length > 0 ? "All" : "No"} Products</h1>
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:p-5 p-3 flex-wrap">
          {products.length > 0 && products.map(product => (
            <ProductCard product={product} onDeleted={onDeleted} key={product._id} />
          ))}
        </div>

        <div className="mt-5 mb-5 flex justify-center">
          {links && <Pagination links={links} page={page || 1} />}
        </div>
      </div>
    </div>
    
  )
}
