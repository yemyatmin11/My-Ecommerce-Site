import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useTheme from '../hooks/useTheme';
import closeIcon from '../assets/close.svg';


export default function SearchNav() {

    let [searchTerm, setSearchTerm] = useState('');
    let [searchData, setSearchData] = useState([]);
    let [searchBox, setSearchBox] = useState(false);
    let { isDark } = useTheme();

    let navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (searchTerm) {
                    const res = await axios.get(`/api/products/search?n=${searchTerm}`);        
                    if (res.status === 200) {
                        setSearchData(res.data);
                    }
                } 
                else {
                    setSearchData([]);
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchProducts();
    }, [searchTerm]);

    const handleSearch = () => {    
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
            setSearchBox(false);
        }
    };

    const handleSuggestion = (productId) => {
        navigate(`/products/${productId}`);
        setSearchTerm('');
        setSearchData([]);
        setSearchBox(false);
    };


    return (
        <div className="relative w-full md:w-auto">
            <div className='flex gap-3 bg-white rounded-sm'>
                <img src={searchIcon} 
                    alt="Search Icon" 
                    className=' cursor-pointer'
                    onClick={() => setSearchBox(!searchBox)}/>
                {searchBox && (
                    <div className={`absolute top-16 left-0 w-[450px] flex gap-3 z-10 ${isDark ? 'bg-dbg': 'bg-primary'} p-3`}>
                        <input 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            type="text" 
                            placeholder='Search Products...' 
                            className='outline-none rounded-lg p-1 text-black w-full md:w-auto'
                        />
                        <button onClick={handleSearch} className='bg-white text-black p-1 rounded-lg'>Search</button>
                        {searchData.length > 0 && (
                            <div className={`${isDark ? 'bg-dbg': 'bg-primary'} absolute top-full left-0 w-full select-none shadow-lg rounded-lg mt-2 z-10`}>
                                {searchData.map(product => (
                                    <div key={product._id} onClick={() => handleSuggestion(product._id)} className='block p-2 text-white hover:bg-gray-200 hover:text-black'>
                                        {product.name}
                                    </div>
                                ))}
                            </div>
                        )}
                        <img src={closeIcon} 
                            alt="Close Icon"
                            className='cursor-pointer w-24 h-8'
                            onClick={() => setSearchBox(!searchBox)} 
                        />
                    </div>
                )}
            </div>  
        </div>
    )
}
