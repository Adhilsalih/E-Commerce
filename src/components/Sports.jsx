
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from '../../src/Context/WishlistContext'; // Import useWishlist
// import { useCart } from '../../src/Context/CartContext';
// function Sports() {
//   const [sports, setSports] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";
//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist(); // Destructure addToWishlist

//   useEffect(() => {
//     fetch("http://localhost:3001/sports")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setSports(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const filteredSports = sports.filter((item) =>
//     (item.item || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Get current posts for pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredSports.slice(indexOfFirstItem, indexOfLastItem);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredSports.length / itemsPerPage);

//   // Change page
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
//         Sports Collection
//       </h1>

//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search for sports items..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1); // Reset to first page on new search
//           }}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
//         />
//       </div>

//       {currentItems.length === 0 && (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No sports items found matching your search.
//         </p>
//       )}

//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//         {currentItems.map((item) => (
//           <div
//             key={item._id || item.id}
//             className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
//           >
//             <Link to={`/sports/${item._id || item.id}`}>
//               <img
//                 src={
//                   item.image?.startsWith("http")
//                     ? item.image
//                     : baseImageUrl + item.image
//                 }
//                 alt={item.item || "Sport Item"}
//                 className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src =
//                     "https://via.placeholder.com/400x300?text=No+Image";
//                 }}
//               />
//             </Link>
//             <div className="text-center">
//               <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                 {item.item || "Unnamed Item"}
//               </h2>
//               <p className="text-purple-600 font-bold text-xl mb-2">
//                 ₹{item.price ?? "N/A"}
//               </p>
//               <div className="flex justify-center gap-2 mt-3">
//                 <button
//                   className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition"
//                   onClick={() => alert(`Added ${item.item} to cart!`)}
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
//                   className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addToWishlist(item);
//                     alert(`Added ${item.item} to wishlist!`);
//                   }}
//                 >
//                   Wishlist
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center space-x-2 mt-10">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg font-semibold ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700 transition"
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
//                   ? "bg-indigo-500 text-white shadow-md"
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
//                 : "bg-indigo-600 text-white hover:bg-indigo-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Sports;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from '../../src/Context/WishlistContext';
import { useCart } from '../../src/Context/CartContext'; // Ensure this path is correct

function Sports() {
  const [sports, setSports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // You can adjust this number

  const baseImageUrl = "http://localhost:3001/images/";
  const { addToCart } = useCart(); // Destructure addToCart from useCart()
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetch("http://localhost:3001/sports")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setSports(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredSports = sports.filter((item) =>
    (item.item || "").toLowerCase().includes(search.toLowerCase())
  );

  // Get current posts for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSports.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredSports.length / itemsPerPage);

  // Change page
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
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Error: {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Sports Collection
      </h1>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for sports items..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
      </div>

      {currentItems.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No sports items found matching your search.
        </p>
      )}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {currentItems.map((item) => (
          <div
            key={item._id || item.id}
            className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
          >
            <Link to={`/sports/${item._id || item.id}`}>
              <img
                src={
                  item.image?.startsWith("http")
                    ? item.image
                    : baseImageUrl + item.image
                }
                alt={item.item || "Sport Item"}
                className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </Link>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {item.item || "Unnamed Item"}
              </h2>
              <p className="text-purple-600 font-bold text-xl mb-2">
                ₹{item.price ?? "N/A"}
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <button
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigating to detail page when button is clicked
                    addToCart(item); // Call addToCart from context
                    alert(`Added ${item.item} to cart!`); // You can keep the alert or remove it
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
                    addToWishlist(item);
                    alert(`Added ${item.item} to wishlist!`);
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

export default Sports;