import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../helpers/axios';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import useTheme from '../hooks/useTheme';

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchUserCreatedProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${user._id}/products`);
        if (res.status === 200) {
          const userProducts = res.data.filter((product) => product.user === user._id);
          setProducts(userProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchUserCreatedProducts();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      {!!user && (
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 w-full max-w-screen-lg mx-auto border-2 p-3 shadow-lg rounded-lg">
          <Link to={`/users/edit/${user._id}`} className="flex-shrink-0">
            <img src={`http://localhost:4000/users${user.photo}`} alt="" className="w-12 h-12 md:w-24 md:h-24 rounded-full border-2 border-black" />
          </Link>
          <div className={`${isDark ? 'text-white' : ''} text-center md:text-left`}>
            <h3 className="font-bold">Name: {user.name}</h3>
            <p>Email: {user.email}</p>
            <Link to={`/users/edit/${user._id}`}>
              <button className="bg-orange-600 text-white px-3 py-1 mt-2 rounded-lg font-bold hover:bg-orange-700 duration-300">
                <i className="fa-solid fa-upload mr-2"></i>
                Upload
              </button>
            </Link>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div className="max-w-full md:max-w-screen-lg mx-auto mt-5">
          <h2 className="font-bold text-xl text-center md:text-left">My Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
            {products.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div className="border rounded-lg p-3 shadow-md bg-white">
                  <img src={`http://localhost:4000/products/${product.photo}`} alt={product.title} className="w-full h-40 object-cover rounded-t-lg" />
                  <div className="p-3">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm">{product.description.substring(0, 150)}...</p>
                    <p>Price - <span className="font-bold text-orange-600">${product.price}</span></p>
                    <Categories categories={product.categories} />
                    <p className="text-gray-500 text-sm mt-2">Published at - {new Date(product.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
