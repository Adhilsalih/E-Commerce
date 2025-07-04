// src/pages/AllProductsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const [
          fashionsRes,
          booksRes,
          productsRes, // This might be a generic products endpoint, adjust if needed
          groceriesRes,
          mobilesRes,
          sportsRes
        ] = await Promise.all([
          axios.get('http://localhost:3001/fashions'),
          axios.get('http://localhost:3001/books'),
          axios.get('http://localhost:3001/products'),
          axios.get('http://localhost:3001/groceries'),
          axios.get('http://localhost:3001/mobiles'),
          axios.get('http://localhost:3001/sports')
        ]);

        const allFetchedProducts = [
          ...fashionsRes.data,
          ...booksRes.data,
          ...productsRes.data,
          ...groceriesRes.data,
          ...mobilesRes.data,
          ...sportsRes.data
        ];

        setProducts(allFetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">All Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id} // Assuming each product has a unique 'id'
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name || 'Untitled Product'}</h2>
              {product.price && (
                <p className="text-lg text-indigo-600 font-bold mb-4">₹{product.price.toFixed(2)}</p>
              )}
              {product.description && (
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{product.description}</p>
              )}
              <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;