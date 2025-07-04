
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Books() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [booksPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";

//   useEffect(() => {
//     fetch("http://localhost:3001/books")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setBooks(data);
//         setFilteredBooks(data); // Initialize filteredBooks with all data
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Effect to filter books based on search term
//   useEffect(() => {
//     const filtered = books.filter((book) =>
//       (book.title || "").toLowerCase().includes(search.toLowerCase()) ||
//       (book.author || "").toLowerCase().includes(search.toLowerCase()) // Allow searching by author too
//     );
//     setFilteredBooks(filtered);
//     setCurrentPage(1); // Reset to first page on new search
//   }, [search, books]);

//   // Pagination Logic
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-600">Loading...</p>;
//   }

//   if (error) {
//     return (
//       <p className="text-center mt-10 text-red-500 font-semibold">
//         Error: {error}
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
//         Book Collection
//       </h1>

//       {/* Search Input */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search by title or author..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
//         />
//       </div>

//       {/* Books Grid */}
//       {currentBooks.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No books found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentBooks.map((book) => (
//             <Link to={`/books/${book._id || book.id}`} key={book._id || book.id}>
//               <div className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out">
//                 <img
//                   src={
//                     book.image?.startsWith("http")
//                       ? book.image
//                       : baseImageUrl + book.image
//                   }
//                   alt={book.title || "Book Cover"}
//                   className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://via.placeholder.com/400x300?text=No+Image";
//                   }}
//                 />
//                 <div className="text-center">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                     {book.title || "Unnamed Book"}
//                   </h2>
//                   <p className="text-gray-700 mb-2 italic">
//                     {book.author || "Unknown Author"}
//                   </p>
//                   <p className="text-teal-600 font-bold text-xl mb-2">
//                     ₹{book.price ?? "N/A"}
//                   </p>
                  
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
//                 : "bg-teal-600 text-white hover:bg-teal-700 transition"
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
//                   ? "bg-teal-500 text-white shadow-md"
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
//                 : "bg-teal-600 text-white hover:bg-teal-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Books;
// src/components/Books.jsx






// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from '../../Context/WishlistContext'; // Import useWishlist
// import { useCart } from '../../Context/CartContext';
// function Books() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [booksPerPage] = useState(6); // You can adjust this number

//   const baseImageUrl = "http://localhost:3001/images/";
//    const { addToCart } = useCart();
//   const { addToWishlist } = useWishlist(); // Destructure addToWishlist

//   useEffect(() => {
//     fetch("http://localhost:3001/books")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setBooks(data);
//         setFilteredBooks(data); // Initialize filteredBooks with all data
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Effect to filter books based on search term
//   useEffect(() => {
//     const filtered = books.filter((book) =>
//       (book.title || "").toLowerCase().includes(search.toLowerCase()) ||
//       (book.author || "").toLowerCase().includes(search.toLowerCase()) // Allow searching by author too
//     );
//     setFilteredBooks(filtered);
//     setCurrentPage(1); // Reset to first page on new search
//   }, [search, books]);

//   // Pagination Logic
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-600">Loading...</p>;
//   }

//   if (error) {
//     return (
//       <p className="text-center mt-10 text-red-500 font-semibold">
//         Error: {error}
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
//         Book Collection
//       </h1>

//       {/* Search Input */}
//       <div className="mb-8 flex justify-center">
//         <input
//           type="text"
//           placeholder="Search by title or author..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
//         />
//       </div>

//       {/* Books Grid */}
//       {currentBooks.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-10">
//           No books found matching your search.
//         </p>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//           {currentBooks.map((book) => (
//             <div
//               key={book._id || book.id}
//               className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
//             >
//               <Link to={`/books/${book._id || book.id}`}>
//                 <img
//                   src={
//                     book.image?.startsWith("http")
//                       ? book.image
//                       : baseImageUrl + book.image
//                   }
//                   alt={book.title || "Book Cover"}
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
//                   {book.title || "Unnamed Book"}
//                 </h2>
//                 <p className="text-gray-700 mb-2 italic">
//                   {book.author || "Unknown Author"}
//                 </p>
//                 <p className="text-teal-600 font-bold text-xl mb-2">
//                   ₹{book.price ?? "N/A"}
//                 </p>
//                 <div className="flex justify-center gap-2 mt-3">
//                   <button
//                     className="mt-3 inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition"
//                     onClick={(e) => {
//                       e.preventDefault(); // Prevent navigating to detail page when button is clicked
//                       alert(`Added ${book.title} to cart!`);
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
//                     className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       addToWishlist(book);
//                       alert(`Added ${book.title} to wishlist!`);
//                     }}
//                   >
//                     Wishlist
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
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
//         <div className="flex justify-center items-center space-x-2 mt-10">
//           <button
//             onClick={prevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-lg font-semibold ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-teal-600 text-white hover:bg-teal-700 transition"
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
//                   ? "bg-teal-500 text-white shadow-md"
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
//                 : "bg-teal-600 text-white hover:bg-teal-700 transition"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Books;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from '../../Context/WishlistContext'; // Import useWishlist
import { useCart } from '../../Context/CartContext'; // Import useCart

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6); // You can adjust this number

  const baseImageUrl = "http://localhost:3001/images/";
  const { addToCart } = useCart(); // Destructure addToCart
  const { addToWishlist } = useWishlist(); // Destructure addToWishlist

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => {
        if (!res.ok) throw new Error(`Network response was not ok, status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data); // Initialize filteredBooks with all data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Effect to filter books based on search term
  useEffect(() => {
    const filtered = books.filter((book) =>
      (book.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (book.author || "").toLowerCase().includes(search.toLowerCase()) // Allow searching by author too
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [search, books]);

  // Pagination Logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading books...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Error loading books: {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Book Collection
      </h1>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        />
      </div>

      {/* Books Grid */}
      {currentBooks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No books found matching your search.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {currentBooks.map((book) => (
            <div
              key={book._id || book.id} // Use book.id as fallback for key if _id is not present
              className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200 hover:shadow-lg transition transform duration-300 ease-in-out"
            >
              {/* This Link wraps the image and title, so clicking them navigates to the detail page */}
              <Link to={`/books/${book._id || book.id}`}>
                <img
                  src={
                    book.image?.startsWith("http")
                      ? book.image
                      : baseImageUrl + book.image
                  }
                  alt={book.title || "Book Cover"}
                  className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100 hover:opacity-90 transition"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {book.title || "Unnamed Book"}
                  </h2>
                  <p className="text-gray-700 mb-2 italic">
                    {book.author || "Unknown Author"}
                  </p>
                  <p className="text-teal-600 font-bold text-xl mb-2">
                    ₹{book.price ?? "N/A"}
                  </p>
                </div>
              </Link>
              <div className="flex justify-center gap-2 mt-3">
                <button
                  className="mt-3 inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition"
                  onClick={() => { // Removed e.preventDefault() as button is outside Link
                    addToCart(book); // THIS IS THE KEY FIX: Call addToCart
                    alert(`Added ${book.title || 'book'} to cart!`);
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
                  onClick={() => { // Removed e.preventDefault() as button is outside Link
                    addToWishlist(book); // Call addToWishlist
                    alert(`Added ${book.title || 'book'} to wishlist!`);
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
                : "bg-teal-600 text-white hover:bg-teal-700 transition"
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
                  ? "bg-teal-500 text-white shadow-md"
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
                : "bg-teal-600 text-white hover:bg-teal-700 transition"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Books;