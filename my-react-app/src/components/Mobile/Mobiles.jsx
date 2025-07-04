
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Mobiles() {
//   const [mobiles, setMobiles] = useState([]);
//   const [filteredMobiles, setFilteredMobiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [mobilesPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";

//   useEffect(() => {
//     fetch("http://localhost:3001/mobiles")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch mobiles");
//         return res.json();
//       })
//       .then((data) => {
//         setMobiles(data);
//         setFilteredMobiles(data); // Initialize filteredMobiles with all data
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Effect to filter mobiles based on search term
//   useEffect(() => {
//     const filtered = mobiles.filter(
//       (mobile) =>
//         (mobile.name || "").toLowerCase().includes(search.toLowerCase()) ||
//         (mobile.brand || "").toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredMobiles(filtered);
//     setCurrentPage(1); // Reset to first page on new search
//   }, [search, mobiles]);

//   // Pagination Logic
//   const indexOfLastMobile = currentPage * mobilesPerPage;
//   const indexOfFirstMobile = indexOfLastMobile - mobilesPerPage;
//   const currentMobiles = filteredMobiles.slice(
//     indexOfFirstMobile,
//     indexOfLastMobile
//   );

//   const totalPages = Math.ceil(filteredMobiles.length / mobilesPerPage);

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

//   // --- Wishlist Functionality ---
//   const handleAddToWishlist = (mobile) => {
//     const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const isAlreadyInWishlist = storedWishlist.some(
//       (item) => item._id === mobile._id
//     );

//     if (isAlreadyInWishlist) {
//       alert(`${mobile.name} is already in your wishlist!`);
//     } else {
//       const updatedWishlist = [...storedWishlist, mobile];
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       alert(`${mobile.name} added to wishlist!`);
//     }
//   };
//   // --- End Wishlist Functionality ---

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
//         Latest Mobile Phones
//       </h1>

//       {/* Search Input */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search mobiles by name or brand..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//         />
//       </div>

//       {/* Mobiles Grid */}
//       {currentMobiles.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No mobiles found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentMobiles.map((mobile) => (
//             <div
//               key={mobile._id}
//               className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
//             >
//               <Link to={`/mobiles/${mobile._id}`}>
//                 <img
//                   src={
//                     mobile.image?.startsWith("http")
//                       ? mobile.image
//                       : baseImageUrl + mobile.image
//                   }
//                   alt={mobile.name || "Mobile Phone"}
//                   className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//                 <div className="text-center">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                     {mobile.name || "Unnamed Mobile"}
//                   </h2>
//                   <p className="text-gray-700 mb-2">
//                     {mobile.brand || "Unknown Brand"}
//                   </p>
//                   <p className="text-blue-600 font-bold text-xl mb-2">
//                     ₹{mobile.price ?? "N/A"}
//                   </p>
//                 </div>
//               </Link>
//               <div className="flex justify-around items-center mt-3">
//                 <button
//                   className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevent navigating to detail page when button is clicked
//                     alert(`Added ${mobile.name} to cart!`);
//                   }}
//                 >
//                   Add to Cart
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v6m4-6v6m-7 0h10"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevent navigating to detail page when button is clicked
//                     handleAddToWishlist(mobile);
//                   }}
//                 >
//                   Add to Wishlist
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 </button>
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
//                 : "bg-blue-600 text-white hover:bg-blue-700 transition"
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
//                   ? "bg-blue-500 text-white shadow-md"
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
//                 : "bg-blue-600 text-white hover:bg-blue-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Mobiles;




// Mobiles.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../../Context/WishlistContext"; // Import the custom hook
// import { useCart } from '../../Context/CartContext';
// function Mobiles() {
//   const [mobiles, setMobiles] = useState([]);
//   const [filteredMobiles, setFilteredMobiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use the wishlist context
//   const { addToWishlist } = useWishlist();
// const { addToCart } = useCart();
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [mobilesPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";

//   useEffect(() => {
//     fetch("http://localhost:3001/mobiles")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch mobiles");
//         return res.json();
//       })
//       .then((data) => {
//         setMobiles(data);
//         setFilteredMobiles(data); // Initialize filteredMobiles with all data
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Effect to filter mobiles based on search term
//   useEffect(() => {
//     const filtered = mobiles.filter(
//       (mobile) =>
//         (mobile.name || "").toLowerCase().includes(search.toLowerCase()) ||
//         (mobile.brand || "").toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredMobiles(filtered);
//     setCurrentPage(1); // Reset to first page on new search
//   }, [search, mobiles]);

//   // Pagination Logic
//   const indexOfLastMobile = currentPage * mobilesPerPage;
//   const indexOfFirstMobile = indexOfLastMobile - mobilesPerPage;
//   const currentMobiles = filteredMobiles.slice(
//     indexOfFirstMobile,
//     indexOfLastMobile
//   );

//   const totalPages = Math.ceil(filteredMobiles.length / mobilesPerPage);

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
//         Latest Mobile Phones
//       </h1>

//       {/* Search Input */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search mobiles by name or brand..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//         />
//       </div>

//       {/* Mobiles Grid */}
//       {currentMobiles.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No mobiles found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentMobiles.map((mobile) => (
//             <div
//               key={mobile._id}
//               className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
//             >
//               <Link to={`/mobiles/${mobile._id}`}>
//                 <img
//                   src={
//                     mobile.image?.startsWith("http")
//                       ? mobile.image
//                       : baseImageUrl + mobile.image
//                   }
//                   alt={mobile.name || "Mobile Phone"}
//                   className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//                 <div className="text-center">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                     {mobile.name || "Unnamed Mobile"}
//                   </h2>
//                   <p className="text-gray-700 mb-2">
//                     {mobile.brand || "Unknown Brand"}
//                   </p>
//                   <p className="text-blue-600 font-bold text-xl mb-2">
//                     ₹{mobile.price ?? "N/A"}
//                   </p>
//                 </div>
//               </Link>
//               <div className="flex justify-around items-center mt-3">
//                 <button
//                   className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     alert(`Added ${mobile.name} to cart!`);
//                   }}
//                 >
//                   Add to Cart
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v6m4-6v6m-7 0h10"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addToWishlist(mobile); // Use the context function
//                   }}
//                 >
//                   Add to Wishlist
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 </button>
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
//                 : "bg-blue-600 text-white hover:bg-blue-700 transition"
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
//                   ? "bg-blue-500 text-white shadow-md"
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
//                 : "bg-blue-600 text-white hover:bg-blue-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Mobiles;



























// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../../Context/WishlistContext";
// import { useCart } from "../../Context/CartContext";

// function Mobiles() {
//   const [mobiles, setMobiles] = useState([]);
//   const [filteredMobiles, setFilteredMobiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { addToWishlist } = useWishlist();
//   const { addToCart } = useCart(); // ✅ Make sure this works from your context

//   const [currentPage, setCurrentPage] = useState(1);
//   const [mobilesPerPage] = useState(6);

//   const baseImageUrl = "http://localhost:3001/images/";

//   useEffect(() => {
//     fetch("http://localhost:3001/mobiles")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch mobiles");
//         return res.json();
//       })
//       .then((data) => {
//         setMobiles(data);
//         setFilteredMobiles(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     const filtered = mobiles.filter(
//       (mobile) =>
//         (mobile.name || "").toLowerCase().includes(search.toLowerCase()) ||
//         (mobile.brand || "").toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredMobiles(filtered);
//     setCurrentPage(1);
//   }, [search, mobiles]);

//   const indexOfLastMobile = currentPage * mobilesPerPage;
//   const indexOfFirstMobile = indexOfLastMobile - mobilesPerPage;
//   const currentMobiles = filteredMobiles.slice(indexOfFirstMobile, indexOfLastMobile);
//   const totalPages = Math.ceil(filteredMobiles.length / mobilesPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

//   if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500 font-semibold">Error: {error}</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Latest Mobile Phones</h1>

//       {/* Search Input */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search mobiles by name or brand..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//         />
//       </div>

//       {/* Mobiles Grid */}
//       {currentMobiles.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No mobiles found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentMobiles.map((mobile) => (
//             <div
//               key={mobile._id}
//               className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
//             >
//               <Link to={`/mobiles/${mobile._id}`}>
//                 <img
//                   src={
//                     mobile.image?.startsWith("http")
//                       ? mobile.image
//                       : baseImageUrl + mobile.image
//                   }
//                   alt={mobile.brand || "Mobile Phone"}
//                   className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//                 <div className="text-center">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                     {mobile.name || "Unnamed Mobile"}
//                   </h2>
//                   <p className="text-gray-700 mb-2">{mobile.brand || "Unknown Brand"}</p>
//                   <p className="text-blue-600 font-bold text-xl mb-2">
//                     ₹{mobile.price ?? "N/A"}
//                   </p>
//                 </div>
//               </Link>

//               <div className="flex justify-around items-center mt-3">
//                 {/* ✅ Add to Cart */}
//                 <button
//                   className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addToCart(mobile); // ✅ Add to cart
//                     alert(`Added ${mobile.name} to cart!`);
//                   }}
//                 >
//                   Add to Cart
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 5m5-5v6m4-6v6m-7 0h10"
//                     />
//                   </svg>
//                 </button>

//                 {/* ✅ Add to Wishlist */}
//                 <button
//                   className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-pink-700 transition"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addToWishlist(mobile);
//                   }}
//                 >
//                   Add to Wishlist
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 </button>
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
//                 : "bg-blue-600 text-white hover:bg-blue-700 transition"
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
//                   ? "bg-blue-500 text-white shadow-md"
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
//                 : "bg-blue-600 text-white hover:bg-blue-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Mobiles;

























import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from '../../Context/CartContext';

function Mobiles() {
  const [mobiles, setMobiles] = useState([]);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseImageUrl = "http://localhost:3001/images/";
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:3001/mobiles")
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setMobiles(data);
        setFilteredMobiles(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = mobiles.filter((item) =>
      item.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMobiles(results);
    setCurrentPage(1);
  }, [searchTerm, mobiles]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMobiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMobiles.length / itemsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const paginate = (page) => setCurrentPage(page);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading mobiles...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Explore Latest Mobiles</h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search mobile model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {currentItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">No mobiles found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {currentItems.map((item) => (
            <div key={item._id} className="relative rounded-lg p-4 shadow-md bg-white border hover:shadow-lg transition">
              <Link to={`/mobiles/${item._id}`}>
                <img
                  src={item.image?.startsWith("http") ? item.image : baseImageUrl + item.image}
                  alt={item.model}
                  className="w-full h-64 object-cover rounded-md mb-4 border"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image")}
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.model}</h2>
                  <p className="text-blue-600 font-bold text-xl mb-2">₹{item.price}</p>
                  <p className="text-gray-500 font-medium">{item.brand}</p>
                </div>
              </Link>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  onClick={() => {
                    addToCart(item);
                    alert(`Added ${item.model} to cart!`);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                  onClick={() => {
                    addToWishlist(item);
                    alert(`Added ${item.model} to wishlist!`);
                  }}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Mobiles;

