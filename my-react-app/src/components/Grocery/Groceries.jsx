
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishlistContext'; // Import useWishlist

function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [filteredGroceries, setFilteredGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // You can adjust this number

  const baseImageUrl = "http://localhost:3001/images/";

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist(); // Destructure addToWishlist

  useEffect(() => {
    fetch("http://localhost:3001/groceries")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setGroceries(data);
        setFilteredGroceries(data); // Initialize filteredGroceries with all data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Effect to filter groceries based on search term
  useEffect(() => {
    const filtered = groceries.filter((item) =>
      (item.item || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGroceries(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [search, groceries]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGroceries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredGroceries.length / itemsPerPage);

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
        Fresh Grocery Picks
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search groceries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
      </div>

      {/* Grocery Cards Grid */}
      {currentItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No groceries found matching your search.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {currentItems.map((item) => (
            <div
              key={item._id}
              className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
            >
              <Link to={`/groceries/${item._id}`}>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : baseImageUrl + item.image
                  }
                  alt={item.item || "Grocery item"}
                  className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              </Link>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {item.item || "Unnamed Item"}
                </h2>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {item.description}
                  </p>
                )}
                <p className="text-green-600 font-bold text-xl mb-2">₹{item.price ?? "N/A"}</p>
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigating to detail page when button is clicked
                      addToCart(item); // Call addToCart with the item
                      alert(`Added ${item.item} to cart!`); // You can replace this with a more subtle notification
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
                : "bg-green-600 text-white hover:bg-green-700 transition"
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
                  ? "bg-green-500 text-white shadow-md"
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
                : "bg-green-600 text-white hover:bg-green-700 transition"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Groceries;


















// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from '../../Context/CartContext';
// import { useWishlist } from '../../Context/WishlistContext';

// function Groceries() {
//   const [groceries, setGroceries] = useState([]);
//   const [filteredGroceries, setFilteredGroceries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);

//   const baseImageUrl = "http://localhost:3001/images/";

//   const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist();

//   useEffect(() => {
//     fetch("http://localhost:3001/groceries")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setGroceries(data);
//         setFilteredGroceries(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     const filtered = groceries.filter((item) =>
//       (item.item || "").toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredGroceries(filtered);
//     setCurrentPage(1);
//   }, [search, groceries]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredGroceries.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredGroceries.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
//   const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

//   if (loading) return <p className="text-center mt-10 text-gray-600 text-sm">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500 text-sm font-medium">Error: {error}</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-3 py-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-bold text-center mb-4 text-gray-800">Fresh Grocery Picks</h1>

//       <div className="mb-6 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search groceries..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-sm px-3 py-1.5 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>

//       {currentItems.length === 0 ? (
//         <p className="text-center text-gray-500 text-sm mt-6">
//           No groceries found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//           {currentItems.map((item) => (
//             <div
//               key={item._id}
//               className="relative rounded-md p-2 bg-white border border-gray-200 hover:shadow-md transition"
//             >
//               <Link to={`/groceries/${item._id}`}>
//                 <img
//                   src={item.image?.startsWith("http") ? item.image : baseImageUrl + item.image}
//                   alt={item.item || "Grocery item"}
//                   className="w-full h-36 object-contain mb-2 rounded border"
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//               </Link>
//               <div className="text-center space-y-1">
//                 <h2 className="text-sm font-semibold text-gray-800 truncate">
//                   {item.item || "Unnamed Item"}
//                 </h2>
//                 {item.description && (
//                   <p className="text-xs text-gray-500 truncate">{item.description}</p>
//                 )}
//                 <p className="text-sm font-bold text-green-700">₹{item.price ?? "N/A"}</p>
//                 <div className="flex justify-center gap-1 mt-1">
//                   <button
//                     className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToCart(item);
//                       alert(`Added ${item.item} to cart!`);
//                     }}
//                   >
//                     Add
//                   </button>
//                   <button
//                     className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToWishlist(item);
//                       alert(`Added ${item.item} to wishlist!`);
//                     }}
//                   >
//                     ♥
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-center items-center space-x-1 mt-6">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-3 py-1 rounded text-xs font-medium ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-green-600 text-white hover:bg-green-700"
//             }`}
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1 rounded text-xs font-medium ${
//                 currentPage === i + 1
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={nextPage}
//             disabled={currentPage === totalPages}
//             className={`px-3 py-1 rounded text-xs font-medium ${
//               currentPage === totalPages
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-green-600 text-white hover:bg-green-700"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Groceries;
