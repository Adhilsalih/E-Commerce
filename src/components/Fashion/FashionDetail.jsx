
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// // Assuming you have a CartContext from a previous step, if not, this won't work for cart functionality
// // import { useCart } from '../context/CartContext';

// function FashionDetail() {
//   const { id } = useParams();
//   const [fashion, setFashion] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message
//   const baseImageUrl = "http://localhost:3001/images/";

//   // If you are using CartContext, uncomment the line below and the usage in handleAddToCart
//   // const { addToCart } = useCart();

//   useEffect(() => {
//     fetch(`http://localhost:3001/fashions/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch fashion item");
//         return res.json();
//       })
//       .then((data) => {
//         setFashion(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAddToCart = () => {
//     if (fashion) {
//       // In a real MERN stack app, you'd use a context or Redux action here
//       // For example, if you have CartContext: addToCart(fashion);

//       setShowCartMessage(true);
//       setTimeout(() => {
//         setShowCartMessage(false);
//       }, 2000); // Hide message after 2 seconds
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-gray-600 animate-pulse font-medium text-lg">
//         Loading fashion item...
//       </p>
//     );
//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-600 font-semibold text-lg">
//         Error: {error}
//       </p>
//     );
//   if (!fashion)
//     return (
//       <p className="text-center mt-10 text-gray-500 font-medium text-lg">
//         Fashion item not found.
//       </p>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
//         {/* Image */}
//         <div className="relative md:w-1/2 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
//           <img
//             src={
//               fashion.image?.startsWith("http")
//                 ? fashion.image
//                 : baseImageUrl + fashion.image
//             }
//             alt={fashion.item}
//             className="w-full h-80 object-cover rounded-lg"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src =
//                 "https://via.placeholder.com/400x300?text=No+Image";
//             }}
//           />
//           <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-pink-600 text-sm font-semibold text-white">
//             Fashion Item
//           </div>
//         </div>

//         {/* Details */}
//         <div className="flex-1 flex flex-col justify-center space-y-6">
//           <Link
//             to="/fashion"
//             className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
//           >
//             ← Back to Fashion
//           </Link>

//           <h1 className="text-4xl font-bold text-gray-800">
//             {fashion.item}
//           </h1>

//           <p className="text-3xl font-semibold text-pink-600">
//             ₹{fashion.price}
//           </p>

//           <p className="text-gray-700 text-base leading-relaxed min-h-[120px]">
//             {fashion.description || "No description available for this item."}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:scale-105"
//           >
//             Add to Cart
//           </button>
//           {showCartMessage && (
//             <div className="text-center text-green-600 font-semibold mt-2">
//               Added "{fashion.item}" to cart!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FashionDetail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// Assuming you have a CartContext from a previous step
import { useCart } from '../../Context/CartContext'; // Uncommented this line

function FashionDetail() {
  const { id } = useParams();
  const [fashion, setFashion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message
  const baseImageUrl = "http://localhost:3001/images/";

  // If you are using CartContext, uncomment the line below and the usage in handleAddToCart
  const { addToCart } = useCart(); // Uncommented this line

  useEffect(() => {
    fetch(`http://localhost:3001/fashions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch fashion item");
        return res.json();
      })
      .then((data) => {
        setFashion(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (fashion) {
      // Call addToCart from your CartContext
      addToCart(fashion); // Added this line to use the context function

      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000); // Hide message after 2 seconds
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse font-medium text-lg">
        Loading fashion item...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        Error: {error}
      </p>
    );
  if (!fashion)
    return (
      <p className="text-center mt-10 text-gray-500 font-medium text-lg">
        Fashion item not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="relative md:w-1/2 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
          <img
            src={
              fashion.image?.startsWith("http")
                ? fashion.image
                : baseImageUrl + fashion.image
            }
            alt={fashion.item} // Assuming 'fashion.item' is the name property
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-pink-600 text-sm font-semibold text-white">
            Fashion Item
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <Link
            to="/fashion" // Link back to the fashion listing page
            className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            ← Back to Fashion
          </Link>

          <h1 className="text-4xl font-bold text-gray-800">
            {fashion.item} {/* Displaying the item name */}
          </h1>

          <p className="text-3xl font-semibold text-pink-600">
            ₹{fashion.price}
          </p>

          <p className="text-gray-700 text-base leading-relaxed min-h-[120px]">
            {fashion.description || "No description available for this item."}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{fashion.item}" to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FashionDetail;