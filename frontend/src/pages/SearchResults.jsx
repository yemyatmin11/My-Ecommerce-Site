import axios from '../helpers/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useTheme from '../hooks/useTheme';


export default function SearchResults() {

    let { term } = useParams();
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(false);
    let { isDark } = useTheme();

    useEffect(() => {    
        let fetchProducts = async () => {
            setLoading(true)
            try {
                let res = await axios.get(`/api/products/search?n=${term}`);
                if(res.status === 200) {
                    setProducts(res.data);
                }
            } catch (e) {
                console.error(e)
            };
            setLoading(false);
        }
        fetchProducts();
    }, [term])

    if(loading) {
        return <p>Loading...</p>
    }

    let onDeleted = () => {

    }
  return (
    <div className='p-5'>
        <h2 className={`text-2xl text-center font-bold ${isDark ? 'text-white' : ''}`}>Search Results for "{term}"</h2>
        {!!products.length > 0 && <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:p-5 p-3 flex-wrap">
            {products.map(product => (
                <ProductCard product={product} onDeleted={onDeleted} key={product._id} />
            ))}
        </div>}
        {!products.length && (<p className='text-xl text-center font-bold text-red-600'>No Products found.</p>)}
    </div>
  )
}
