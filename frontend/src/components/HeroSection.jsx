import React from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import heroSectionImage from '../assets/hero.png'; 

export default function HeroSection() {
  let { isDark } = useTheme();

  return (
    <div className={`relative py-20 h-screen mb-10 bg-cover bg-center`} style={{ backgroundImage: `url(${heroSectionImage})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better readability */}
      <div className="relative z-1 flex items-center justify-center min-h-[80vh]">
        <div className='w-[80%] mx-auto text-center'>
          <div className="space-y-5 px-5 md:px-0">
            <h1 className={`text-4xl font-extrabold md:text-6xl text-white`}>Welcome to SwiftMart!</h1>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-100'}`}>
              Discover endless possibilities with our curated selection of premium products. Browse through our meticulously curated collections, handpicked to cater to your individual style and preferences.
            </p>
            <div>
              <Link
                to="/about"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-orange-600 hover:shadow-2xl duration-300 transition ease-in-out transform hover:-translate-y-1"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
