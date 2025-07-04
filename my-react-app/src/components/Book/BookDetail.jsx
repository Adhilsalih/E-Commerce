
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useCart } from '../../Context/CartContext'; // Import useCart

// const BookDetail = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [error, setError] = useState("");
//   const [showCartMessage, setShowCartMessage] = useState(false);
//   const baseImageUrl = "http://localhost:3001/images/";

//   const { addToCart } = useCart(); // Use the addToCart function from context

//   useEffect(() => {
//     fetch(`http://localhost:3001/books/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch book");
//         return res.json();
//       })
//       .then((data) => setBook(data))
//       .catch((err) => setError(err.message));
//   }, [id]);

//   const handleAddToCart = () => {
//     if (book) {
//       addToCart(book); // Add the book to cart using the context function

//       setShowCartMessage(true);
//       setTimeout(() => {
//         setShowCartMessage(false);
//       }, 2000);
//     }
//   };

//   if (error)
//     return <div className="text-red-600 text-center py-10 font-semibold text-lg">{error}</div>;
//   if (!book)
//     return (
//       <div className="text-center text-gray-600 animate-pulse py-10 text-lg">
//         Loading book details...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
//         {/* Book Image */}
//         <div className="relative rounded-lg overflow-hidden border border-gray-200 md:w-1/2 flex-shrink-0">
//           <img
//             src={
//               book.image?.startsWith("http")
//                 ? book.image
//                 : baseImageUrl + book.image
//             }
//             alt={book.title}
//             className="w-full h-80 object-cover rounded-lg"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src =
//                 "https://via.placeholder.com/400x300?text=No+Image";
//             }}
//           />
//           <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-md text-sm font-semibold text-white">
//             Book
//           </div>
//         </div>

//         {/* Book Details */}
//         <div className="flex flex-col justify-center md:w-1/2 space-y-6">
//           <h2 className="text-4xl font-bold text-gray-800">
//             {book.title}
//           </h2>
//           <p className="text-lg italic text-gray-600">
//             By {book.author}
//           </p>
//           <p className="text-3xl font-semibold text-indigo-600">
//             ₹{book.price}
//           </p>
//           <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
//             {book.description || "No description available for this book."}
//           </p>
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-105"
//           >
//             Add to Cart
//           </button>
//           {showCartMessage && (
//             <div className="text-center text-green-600 font-semibold mt-2">
//               Added "{book.title}" to cart!
//             </div>
//           )}
//           <Link
//             to="/books"
//             className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
//           >
//             ← Back to Books
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext'; // Corrected path to CartContext

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [showCartMessage, setShowCartMessage] = useState(false);
  const baseImageUrl = "http://localhost:3001/images/";

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch book");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book); // Add the book to cart
      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000);
    }
  };

  if (error)
    return <div className="text-red-600 text-center py-10 font-semibold text-lg">{error}</div>;
  if (!book)
    return (
      <div className="text-center text-gray-600 animate-pulse py-10 text-lg">
        Loading book details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 md:w-1/2 flex-shrink-0">
          <img
            src={
              book.image?.startsWith("http")
                ? book.image
                : baseImageUrl + book.image
            }
            alt={book.title}
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-md text-sm font-semibold text-white">
            Book
          </div>
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-center md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            {book.title}
          </h2>
          <p className="text-lg italic text-gray-600">
            By {book.author}
          </p>
          <p className="text-3xl font-semibold text-indigo-600">
            ₹{book.price}
          </p>
          <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
            {book.description || "No description available for this book."}
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{book.title}" to cart!
            </div>
          )}
          <Link
            to="/books"
            className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;