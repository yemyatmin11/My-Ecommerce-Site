import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import darkIcon from '../assets/dark.svg';
import lightIcon from '../assets/light.svg';
import useTheme from '../hooks/useTheme';
import cartIcon from '../assets/cart.svg';
import axios from '../helpers/axios';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import SearchNav from './SearchNav';

export default function Navbar() {
  let location = useLocation();
  let [openMenu, setOpenMenu] = useState(false);
  let [openUserMenu, setOpenUserMenu] = useState(false);


  let { isDark, changeTheme } = useTheme();
  let { user, dispatch } = useContext(AuthContext);
  let { totalAmount } = useContext(CartContext);

  let navigate = useNavigate();

  const logout = async () => {
    let res = await axios.post('/api/users/logout');
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
      toast.success('Logout Successfully');
      setOpenMenu(false); // Close menu after logout
      navigate('/sign-in');
    }
  };

  return (
    <nav className={`md:flex md:items-center md:justify-between p-3 text-white ${isDark ? 'bg-dcard border-orange-600' : 'bg-orange-600'}`}>
      <div className='flex items-center justify-between'>
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="SwiftMart Logo" className='w-12'/>
          <h1 className="text-2xl font-bold">SwiftMart</h1>
        </Link>
        <div onClick={() => setOpenMenu(!openMenu)} className='text-3xl cursor-pointer md:hidden block mx-2'>
          <ion-icon name={openMenu ? 'close' : 'menu'}></ion-icon>
        </div>
      </div>

      <ul className={`flex flex-col items-center md:flex md:flex-row md:items-center md:space-x-10 md:relative left-0 md:w-auto md:py-0 py-3 md:pl-0 font-bold ${openMenu ? 'block' : 'hidden'}`}>
        
        <SearchNav/>

        <li className={`my-2 md:my-0 ${location.pathname === "/" ? `${isDark ? 'border-b-orange-600 border-b-2' : 'border-b-black border-b-2'}` : ''}`}>
          <Link to="/" className={`transition duration-300 ${isDark ? 'hover:border-b-orange-600 hover:border-b-4 hover:text-orange-600' : 'hover:border-b-black hover:border-b-4 hover:text-black'}`}>
            Home
          </Link>
        </li>
        <li className={`my-2 md:my-0 ${location.pathname === "/about" ? `${isDark ? 'border-b-orange-600 border-b-2' : 'border-b-black border-b-2'}` : ''}`}>
          <Link to="/about" className={`transition duration-300 ${isDark ? 'hover:border-b-orange-600 hover:border-b-4 hover:text-orange-600' : 'hover:border-b-black hover:border-b-4 hover:text-black'}`}>
            About
          </Link>
        </li>
        <li className={`my-2 md:my-0 ${location.pathname === "/contact" ? `${isDark ? 'border-b-orange-600 border-b-2' : 'border-b-black border-b-2'}` : ''}`}>
          <Link to="/contact" className={`transition duration-300 ${isDark ? 'hover:border-b-orange-600 hover:border-b-4 hover:text-orange-600' : 'hover:border-b-black hover:border-b-4 hover:text-black'}`}>
            Contact
          </Link>
        </li>
        <li className={`my-2 md:my-0 ${location.pathname === "/products/create" ? `${isDark ? 'border-b-orange-600 border-b-2' : 'border-b-black border-b-2'}` : ''}`}>
          <Link to="/products/create" className={`transition duration-300 ${isDark ? 'hover:border-b-orange-600 hover:border-b-4 hover:text-orange-600' : 'hover:border-b-black hover:border-b-4 hover:text-black'}`}>
            Create Product
          </Link>
        </li>
        <li className={`my-2 md:my-0 relative ${location.pathname === "/cart" ? `${isDark ? 'border-b-orange-600 border-b-2' : 'border-b-black border-b-2'}` : ''}`}>
          <Link to="/cart" className={`transition duration-300 relative ${isDark ? 'hover:border-b-orange-600 hover:border-b-4 hover:text-orange-600' : 'hover:border-b-black hover:border-b-4 hover:text-black'}`}>
            <img src={cartIcon} alt="Cart Icon" className='w-7'/>
            {totalAmount > 0 && <div className="bg-red-600 w-2 h-2 rounded-full absolute bottom-1 right-1"></div>}
          </Link>
        </li>

        {!user && (
          <li className='my-2 md:my-0'>
            <Link to="/sign-in" className={`px-4 py-2 rounded-full font-bold duration-500 ${isDark ? 'bg-orange-600 hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white'}`}>
              Login
            </Link>
          </li>
        )}

        {!!user && (
          <li className="relative z-10 my-2 md:my-0">
            <div onClick={() => setOpenUserMenu(!openUserMenu)} className={`cursor-pointer transition duration-300 ${isDark ? 'hover:text-orange-600' : 'hover:text-black'}`}>
              <img src={"http://localhost:4000/users"+user.photo} alt="User Profile" className='w-12 h-12 rounded-full border-2'/>
            </div>
            <ul className={`absolute left-[-100px] mt-2 w-32 bg-white text-black shadow-lg rounded-lg ${openUserMenu ? 'block' : 'hidden'}`}>
              <li className="py-2 px-4">
                <Link to={`/profile/${user._id}`} className="block w-full h-full" onClick={() => setOpenUserMenu(!openUserMenu)}>
                  My Profile
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link to={`/myorders`} className="block w-full h-full" onClick={() => setOpenUserMenu(!openUserMenu)}>
                  My Orders
                </Link>
              </li>
              <li className="py-2 px-4">
                <button onClick={logout} className="flex w-full h-full">
                  Logout
                </button>
              </li>
              <li className="py-2 px-4 cursor-pointer">
                {!isDark && <img src={darkIcon} alt="Dark Mode Icon" className='w-8' onClick={() => changeTheme('dark')}/>}
                {isDark && <img src={lightIcon} alt="Light Mode Icon" className='w-8' onClick={() => changeTheme('light')}/>}
              </li>
            </ul>
          </li>
        )}
      </ul>       
    </nav>
  )
}
