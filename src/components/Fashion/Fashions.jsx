












//         import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Fashion() {
//   const [fashions, setFashions] = useState([]);
//   const [filteredFashions, setFilteredFashions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Search and Pagination states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";

//   useEffect(() => {
//     fetch("http://localhost:3001/fashions")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setFashions(data);
//         setFilteredFashions(data); // Initialize filteredFashions with all data
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Effect to filter fashion items based on search term
//   useEffect(() => {
//     const results = fashions.filter((item) =>
//       (item.item || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredFashions(results);
//     setCurrentPage(1); // Reset to first page on new search
//   }, [searchTerm, fashions]);

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredFashions.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredFashions.length / itemsPerPage);

//   // Change page function
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle next and previous page
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-gray-600">Loading...</p>;
//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-500 font-semibold">
//         Error: {error}
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
//         Trending Fashion Picks
//       </h1>

//       {/* Search Bar */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search fashion items..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
//         />
//       </div>

//       {/* Fashion Items Grid */}
//       {currentItems.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No fashion items found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentItems.map((item) => (
//             <Link to={`/fashion/${item._id || item.id}`} key={item._id || item.id}>
//               <div className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out">
//                 <img
//                   src={
//                     item.image?.startsWith("http")
//                       ? item.image
//                       : baseImageUrl + item.image
//                   }
//                   alt={item.item || "Fashion Item"}
//                   className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//                 <div className="text-center">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                     {item.item || "Unnamed Item"}
//                   </h2>
//                   <p className="text-pink-600 font-bold text-xl mb-2">
//                     ₹{item.price ?? "N/A"}
//                   </p>
//                   <button
//                     className="mt-3 inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition"
//                     onClick={(e) => {
//                       e.preventDefault(); // Prevent navigating to detail page when button is clicked
//                       alert(`Added ${item.item} to cart!`);
//                     }}
//                   >
//                     Add to Cart
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
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
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center space-x-2 mt-10">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg font-semibold ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-pink-600 text-white hover:bg-pink-700 transition"
//             }`}
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 currentPage === i + 1
//                   ? "bg-pink-500 text-white shadow-md"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-lg font-semibold ${
//               currentPage === totalPages
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-pink-600 text-white hover:bg-pink-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Fashion;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../../Context/WishlistContext"; // Import the context hook
// import { useCart } from '../../Context/CartContext';
// function Fashion() {
//   const [fashions, setFashions] = useState([]);
//   const [filteredFashions, setFilteredFashions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Search and Pagination states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";
//     const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist(); // Use the context hook

//   useEffect(() => {
//     fetch("http://localhost:3001/fashions")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setFashions(data);
//         setFilteredFashions(data); // Initialize filteredFashions with all data
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Effect to filter fashion items based on search term
//   useEffect(() => {
//     const results = fashions.filter((item) =>
//       (item.item || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredFashions(results);
//     setCurrentPage(1); // Reset to first page on new search
//   }, [searchTerm, fashions]);

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredFashions.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredFashions.length / itemsPerPage);

//   // Change page function
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle next and previous page
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-gray-600">Loading...</p>;
//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-500 font-semibold">
//         Error: {error}
//       </p>
//     );

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
//         Trending Fashion Picks
//       </h1>

//       {/* Search Bar */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search fashion items..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
//         />
//       </div>

//       {/* Fashion Items Grid */}
//       {currentItems.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No fashion items found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentItems.map((item) => (
//             <div
//               key={item._id || item.id}
//               className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
//             >
//               <Link to={`/fashion/${item._id || item.id}`} key={item._id || item.id}>
//                 <img
//                   src={
//                     item.image?.startsWith("http")
//                       ? item.image
//                       : baseImageUrl + item.image
//                   }
//                   alt={item.item || "Fashion Item"}
//                   className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//               </Link>
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                   {item.item || "Unnamed Item"}
//                 </h2>
//                 <p className="text-pink-600 font-bold text-xl mb-2">
//                   ₹{item.price ?? "N/A"}
//                 </p>
//                 <div className="flex justify-center space-x-4 mt-3">
//                   <button
//                     className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition"
//                     onClick={(e) => {
//                       e.preventDefault(); // Prevent navigating to detail page when button is clicked
//                       alert(`Added ${item.item} to cart!`);
//                     }}
//                   >
//                     Add to Cart
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
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
//                     className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition"
//                     onClick={(e) => {
//                       e.preventDefault(); // Prevent navigating to detail page when button is clicked
//                       addToWishlist(item); // Use the context function
//                     }}
//                   >
//                     Add to Wishlist
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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
//         <div className="flex justify-center items-center space-x-2 mt-10">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg font-semibold ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-pink-600 text-white hover:bg-pink-700 transition"
//             }`}
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 currentPage === i + 1
//                   ? "bg-pink-500 text-white shadow-md"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-lg font-semibold ${
//               currentPage === totalPages
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-pink-600 text-white hover:bg-pink-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Fashion;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext"; // Import the context hook
import { useCart } from '../../Context/CartContext'; // Import useCart

function Fashion() {
  const [fashions, setFashions] = useState([]);
  const [filteredFashions, setFilteredFashions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // You can adjust this number

  const baseImageUrl = "http://localhost:3001/images/";
  const { addToCart } = useCart(); // Destructure addToCart
  const { addToWishlist } = useWishlist(); // Destructure addToWishlist

  useEffect(() => {
    fetch("http://localhost:3001/fashions")
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was not ok, status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFashions(data);
        setFilteredFashions(data); // Initialize filteredFashions with all data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Effect to filter fashion items based on search term
  useEffect(() => {
    const results = fashions.filter((item) =>
      (item.item || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFashions(results);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, fashions]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFashions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFashions.length / itemsPerPage);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle next and previous page
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

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading fashion items...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Error loading fashion items: {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Trending Fashion Picks
      </h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search fashion items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
        />
      </div>

      {/* Fashion Items Grid */}
      {currentItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No fashion items found matching your search.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {currentItems.map((item) => (
            <div
              key={item._id || item.id}
              className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
            >
              {/* This Link wraps the image and title, so clicking them navigates to the detail page */}
              <Link to={`/fashion/${item._id || item.id}`}>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : baseImageUrl + item.image
                  }
                  alt={item.item || "Fashion Item"}
                  className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {item.item || "Unnamed Item"}
                  </h2>
                  <p className="text-pink-600 font-bold text-xl mb-2">
                    ₹{item.price ?? "N/A"}
                  </p>
                </div>
              </Link>
              <div className="flex justify-center space-x-4 mt-3">
                <button
                  className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition"
                  onClick={() => { // Removed e.preventDefault() as button is outside Link
                    addToCart(item); // THIS IS THE KEY FIX: Call addToCart
                    alert(`Added ${item.item || 'item'} to cart!`);
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
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition"
                  onClick={() => { // Removed e.preventDefault() as button is outside Link
                    addToWishlist(item); // Use the context function
                    alert(`Added ${item.item || 'item'} to wishlist!`);
                  }}
                >
                  Add to Wishlist
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
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
                : "bg-pink-600 text-white hover:bg-pink-700 transition"
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
                  ? "bg-pink-500 text-white shadow-md"
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
                : "bg-pink-600 text-white hover:bg-pink-700 transition"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Fashion;