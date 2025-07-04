
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Fashions',
    'Books',
    'Products',
    'Groceries',
    'Mobiles',
    'Sports',
  ];

  const categoryEndpoints = {
    Fashions: 'http://localhost:3001/fashions',
    Books: 'http://localhost:3001/books',
    Products: 'http://localhost:3001/products',
    Groceries: 'http://localhost:3001/groceries',
    Mobiles: 'http://localhost:3001/mobiles',
    Sports: 'http://localhost:3001/sports', // fixed typo
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          Object.values(categoryEndpoints).map(url => axios.get(url))
        );

        let combinedProducts = [];
        Object.keys(categoryEndpoints).forEach((key, index) => {
          combinedProducts = [
            ...combinedProducts,
            ...responses[index].data.map(product => ({
              ...product,
              sourceCategory: key,
            })),
          ];
        });

        setAllProducts(combinedProducts);
        setFilteredProducts(combinedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please check the server connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    let currentFiltered = allProducts;

    if (selectedCategory !== 'All') {
      currentFiltered = currentFiltered.filter(
        product => product.sourceCategory === selectedCategory
      );
    }

    if (searchTerm) {
      currentFiltered = currentFiltered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(currentFiltered);
  }, [selectedCategory, searchTerm, allProducts]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Loading all products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Explore All Our Products
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Main layout: sidebar + product grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-1/4 w-full">
          <div className="bg-gray-100 rounded-lg p-4 shadow-md sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-left px-4 py-2 rounded-md transition
                    ${selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-blue-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:w-3/4 w-full">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
