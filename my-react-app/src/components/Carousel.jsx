import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/fashions')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    cssEase: 'ease-in-out',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10">Latest Fashion</h2>
      {products.length > 0 ? (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="p-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                  <p className="text-pink-600 font-bold text-lg mt-2">${product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 text-lg">Loading products...</p>
      )}
    </div>
  );
};

export default Carousel;
