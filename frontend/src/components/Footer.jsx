import React from 'react';
import { Link } from 'react-router-dom';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import instagramIcon from '../assets/instagram.png';
import linkedinIcon from '../assets/linkedin.png';
import useTheme from '../hooks/useTheme';

export default function Footer() {

    let { isDark } = useTheme();

  return (
    <div className={`text-white mt-auto ${isDark ? 'bg-dcard' : 'bg-black'}`}>
        <div className='grid grid-cols-1 md:grid md:grid-cols-3 w-[70%] mx-auto gap-5 pt-5'>
            <div>
                <h1 className='text-2xl font-bold'>Contact Us</h1>   
                <h3>Phone : +121 56565 56565</h3>
                <p>Address : Yangon, Myanmar</p>             
            </div>
            <div>
                <h1 className='text-2xl font-bold'>Quick Links</h1>
                <ul>
                    <li><Link to="/" className='hover:text-orange-600 duration-200'>Home</Link></li>
                    <li><Link to="/about" className='hover:text-orange-600 duration-200'>About</Link></li>
                    <li><Link className='hover:text-orange-600 duration-200'>Products</Link></li>
                    <li><Link className='hover:text-orange-600 duration-200'>Services</Link></li>
                    <li><Link to="/contact" className='hover:text-orange-600 duration-200'>Contact</Link></li>
                </ul>
            </div>
            <div>
                <h1 className='text-2xl font-bold'>Follow Us</h1>
                <div className='w-6 flex gap-3 cursor-pointer'>
                    <img src={facebookIcon} alt=""/>
                    <img src={twitterIcon} alt="" />
                    <img src={instagramIcon} alt="" />
                    <img src={linkedinIcon} alt="" />
                </div>
            </div>
        </div>
        <div className={`text-sm text-center mt-10 p-4 ${isDark ? 'bg-dcard' : 'bg-orange-600'}`}>
            &copy; 2023 SwiftMart . All rights reserved.
        </div>
    </div>
  )
}
