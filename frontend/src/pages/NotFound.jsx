import React from 'react';
import NotFoundGif from '../assets/NotFound.gif';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-center bg-contain bg-no-repeat relative' style={{ backgroundImage: `url(${NotFoundGif})` }}>
        <p className=' absolute top-12 text-8xl text-red-600 font-bold'>404</p>
        <h2 className='absolute bottom-40 text-3xl font-bold'>Look like your're lost</h2>
        <h5 className='absolute bottom-32 text-gray-600'>The page you are looking for is not available!  </h5>
        <Link to='/sign-in' className='absolute bottom-20 bg-orange-600 p-2 rounded-lg text-white'>Go to Home Page</Link>
    </div>
  )
}
