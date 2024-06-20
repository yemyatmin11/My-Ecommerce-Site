import React from 'react';
import aboutImg from '../assets/aboutImg.jpg';
import aboutImg2 from '../assets/aboutImg2.jpg';
import useTheme from '../hooks/useTheme';

export default function About() {

  let { isDark } = useTheme();



  return (
    <div className={`container mx-auto px-4 py-8 text-justify ${isDark ? 'text-white' : ''}`}>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="lg:w-1/2">
          <img src={aboutImg} alt="About Us" className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">Who Are We?</h1>
          <p className="text-lg leading-relaxed indent-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eum ipsa tempore iusto laboriosam sint, maxime voluptates labore optio sequi recusandae. Quibusdam, incidunt pariatur consectetur velit ea maxime. Unde, explicabo officiis quos non quo incidunt beatae. Ullam adipisci molestiae deleniti reprehenderit dolore! Suscipit libero ipsum quo incidunt deserunt sint, provident quia! Illum voluptatum distinctio adipisci reprehenderit quas sapiente velit minima magnam molestiae illo ex ab atque quam minus repudiandae perferendis, excepturi repellendus nemo, consequuntur quod maiores autem laborum impedit? Culpa fuga quisquam nostrum ducimus, molestiae dolor quidem dolorem, deserunt ut, velit veniam perspiciatis delectus voluptates atque? Ab, iste facilis. Officiis.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-8">
        <div className="lg:w-1/2 order-1 lg:order-2">
          <img src={aboutImg2} alt="Our Mission" className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div className="lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Our Mission</h1>
          <p className="text-lg leading-relaxed indent-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eum ipsa tempore iusto laboriosam sint, maxime voluptates labore optio sequi recusandae. Quibusdam, incidunt pariatur consectetur velit ea maxime. Unde, explicabo officiis quos non quo incidunt beatae. Ullam adipisci molestiae deleniti reprehenderit dolore! Suscipit libero ipsum quo incidunt deserunt sint, provident quia! Illum voluptatum distinctio adipisci reprehenderit quas sapiente velit minima magnam molestiae illo ex ab atque quam minus repudiandae perferendis, excepturi repellendus nemo, consequuntur quod maiores autem laborum impedit? Culpa fuga quisquam nostrum ducimus, molestiae dolor quidem dolorem, deserunt ut, velit veniam perspiciatis delectus voluptates atque? Ab, iste facilis. Officiis.
          </p>
        </div>
      </div>
    </div>
  );
}
