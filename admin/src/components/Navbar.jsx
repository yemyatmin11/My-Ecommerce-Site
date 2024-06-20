import React, { useContext } from 'react';
import Logo from '../assets/logo.svg';
import Profile from '../assets/profile.png';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {

  

  return (
    <div className='bg-orange-600 p-3 flex items-center justify-between'>
      <img src={Logo} alt="" className='w-12'/>
      <img src={Profile} alt="" className='w-12 h-12 rounded-full'/>
    </div>
  )
}
