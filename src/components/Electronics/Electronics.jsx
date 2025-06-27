




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';

function Electronics() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const baseImageUrl = "http://localhost:3001/images/";
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      (product.product || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [search, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Latest Electronics Collection
      </h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
      </div>

      {/* Product Grid */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No electronics found matching your search.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
            >
              <Link to={`/electronics/${product._id}`}>
                <img
                  src={
                    product.image?.startsWith("http")
                      ? product.image
                      : baseImageUrl + product.image
                  }
                  alt={product.product || "Electronics Item"}
                  className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </Link>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {product.product || "Unnamed Item"}
                </h2>
                <p className="text-indigo-600 font-bold text-xl mb-2">
                  ₹{product.price ?? "N/A"}
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product); // ✅ Fix: Actually add to cart
                      alert(`Added ${product.product} to cart!`);
                    }}
                  >
                    Add to Cart
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v6m4-6v6m-7 0h10"
                      />
                    </svg>
                  </button>

                  <button
                    className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      addToWishlist(product);
                      alert(`Added ${product.product} to wishlist!`);
                    }}
                  >
                    Wishlist
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 transition"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 transition"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Electronics;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from '../../Context/WishlistContext';
// import { useCart } from '../../Context/CartContext';

// function Electronics() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(6);

//   const baseImageUrl = "http://localhost:3001/images/";
//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     fetch("http://localhost:3001/products")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setFilteredProducts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     const filtered = products.filter((product) =>
//       (product.product || "").toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//     setCurrentPage(1);
//   }, [search, products]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

//   if (loading) return <p className="text-center mt-10 text-sm text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-sm text-red-500 font-medium">Error: {error}</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-700">
//         Latest Electronics Collection
//       </h1>

//       {/* Search Bar */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
//         />
//       </div>

//       {/* Product Grid */}
//       {currentProducts.length === 0 ? (
//         <p className="text-center text-sm text-gray-500 mt-10">
//           No electronics found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//           {currentProducts.map((product) => (
//             <div
//               key={product._id}
//               className="relative rounded-lg p-4 shadow-sm bg-white border border-gray-200 hover:shadow-md transition-transform duration-300 ease-in-out"
//             >
//               <Link to={`/electronics/${product._id}`}>
//                 <img
//                   src={
//                     product.image?.startsWith("http")
//                       ? product.image
//                       : baseImageUrl + product.image
//                   }
//                   alt={product.product || "Electronics Item"}
//                   className="w-full h-56 object-cover rounded-md mb-3 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//               </Link>
//               <div className="text-center">
//                 <h2 className="text-sm font-medium text-gray-700 mb-1">
//                   {product.product || "Unnamed Item"}
//                 </h2>
//                 <p className="text-gray-600 font-medium text-base mb-2">
//                   ₹{product.price ?? "N/A"}
//                 </p>
//                 <div className="flex justify-center gap-2 mt-3">
//                   <button
//                     className="inline-flex items-center gap-2 bg-indigo-500 text-white text-sm px-3 py-1.5 rounded-md font-medium shadow-sm hover:bg-indigo-600 transition"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToCart(product);
//                       alert(`Added ${product.product} to cart!`);
//                     }}
//                   >
//                     Add to Cart
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v6m4-6v6m-7 0h10"
//                       />
//                     </svg>
//                   </button>

//                   <button
//                     className="inline-flex items-center gap-2 bg-yellow-400 text-white text-sm px-3 py-1.5 rounded-md font-medium shadow-sm hover:bg-yellow-500 transition"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToWishlist(product);
//                       alert(`Added ${product.product} to wishlist!`);
//                     }}
//                   >
//                     Wishlist
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center space-x-2 mt-10 text-sm">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-3 py-1.5 rounded-md font-medium ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-indigo-500 text-white hover:bg-indigo-600 transition"
//             }`}
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1.5 rounded-md font-medium ${
//                 currentPage === i + 1
//                   ? "bg-indigo-600 text-white shadow"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className={`px-3 py-1.5 rounded-md font-medium ${
//               currentPage === totalPages
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-indigo-500 text-white hover:bg-indigo-600 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Electronics;
