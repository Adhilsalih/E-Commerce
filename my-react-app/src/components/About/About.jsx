import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-6">
          About <span className="text-gray-800">Shopverse</span>
        </h1>

        <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-10">
          Welcome to <strong>Shopverse</strong> – your one-stop destination for everything from electronics and fashion to groceries and more. We are committed to delivering exceptional quality, unbeatable prices, and a seamless shopping experience.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              At Shopverse, we aim to revolutionize online shopping by combining technology, convenience, and top-tier customer service. We envision a future where shopping is not just easy, but delightful.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">What We Offer</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Latest electronics, mobiles, and accessories</li>
              <li>Trendy fashion for men and women</li>
              <li>Fresh groceries delivered to your door</li>
              <li>Secure payments with fast delivery</li>
              <li>Dedicated support team</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Shop With Us?</h3>
          <p className="text-gray-600">
            We believe in trust, transparency, and technology. From the moment you land on our site to the time your product arrives, we ensure excellence at every step. Join thousands of happy customers and shop with confidence at <span className="font-semibold text-blue-700">Shopverse</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
