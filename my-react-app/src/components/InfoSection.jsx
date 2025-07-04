
import React from 'react';
import { FaShippingFast, FaHeadset, FaMoneyBillWave, FaLock, FaTag } from 'react-icons/fa';

const InfoSection = () => {
  const infoItems = [
    {
      icon: <FaShippingFast className="text-4xl text-gray-700" />,
      title: 'Free Shipping',
      description: 'Get your orders delivered with no extra cost',
    },
    {
      icon: <FaHeadset className="text-4xl text-gray-700" />,
      title: 'Support 24/7',
      description: 'We are here to assist you anytime',
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-gray-700" />,
      title: '100% Money Back',
      description: 'Full refund if you are not satisfied',
    },
    {
      icon: <FaLock className="text-4xl text-gray-700" />,
      title: 'Payment Secure',
      description: 'Your payment information is safe with us',
    },
    {
      icon: <FaTag className="text-4xl text-gray-700" />,
      title: 'Discount',
      description: 'Enjoy the best prices on our products',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-200
                       transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            {item.icon}
            <h3 className="mt-5 text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;