
import React from 'react';
import { Categories } from '../assets/mocData';
import { Link } from 'react-router-dom';
import image0 from '../assets/Images/image0.jpg';
import InfoSection from '../components/InfoSection';
import Carousel from '../components/Carousel';
import Carousel2 from '../components/Carousel2';

const Home = () => {
  return (
    <div className="bg-gray-50 pt-8 px-4 sm:px-6 lg:px-20 xl:px-32">
      {/* Hero Section with Sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4 w-full bg-white rounded-2xl shadow-md">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-bold px-5 py-4 rounded-t-2xl tracking-wide uppercase">
            Shop by Categories
          </div>
          <ul className="space-y-4 px-5 py-6">
            {Categories.map((category, index) => (
              <li key={index}>
                <Link
                  to={`/${category.toLowerCase()}`}
                  className="flex items-center text-gray-800 text-base font-medium hover:text-red-600 transition-colors"
                >
                  <span className="w-3 h-3 border-2 border-red-500 rounded-full mr-3"></span>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Banner */}
        <section className="md:w-3/4 w-full relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={image0}
            alt="Shop Banner"
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute top-14 left-8 md:left-12 text-white max-w-lg z-10">
            <p className="uppercase tracking-wider text-pink-300 text-sm mb-1 font-semibold">
              SHOPVERSE
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
              The Futuristic
            </h1>
            <p className="text-xl md:text-2xl font-medium text-pink-200 mb-6">
              Shopping Experience
            </p>
            <button className="bg-gradient-to-r from-red-500 to-pink-600 px-8 py-3 rounded-full font-semibold shadow-md hover:from-pink-600 hover:to-red-500 transition duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
        </section>
      </div>

      {/* Carousels and Info Section */}
      <div className="mt-12 space-y-12">
        <Carousel2 />
        <Carousel />
        <InfoSection />
      </div>
    </div>
  );
};

export default Home;
