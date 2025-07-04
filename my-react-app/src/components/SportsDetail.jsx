
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// // Assuming you have a CartContext from a previous step, if not, this won't work for cart functionality
// // import { useCart } from '../context/CartContext'; 

// const SportsDetail = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [error, setError] = useState('');
//   const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message
//   const baseImageUrl = "http://localhost:3001/images/";

//   // If you are using CartContext, uncomment the line below and the usage in handleAddToCart
//   // const { addToCart } = useCart();

//   useEffect(() => {
//     fetch(`http://localhost:3001/sports/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch item');
//         return res.json();
//       })
//       .then((data) => setItem(data))
//       .catch((err) => setError(err.message));
//   }, [id]);

//   const handleAddToCart = () => {
//     if (item) {
//       // In a real MERN stack app, you'd use a context or Redux action here
//       // For example, if you have CartContext: addToCart(item);

//       setShowCartMessage(true);
//       setTimeout(() => {
//         setShowCartMessage(false);
//       }, 2000); // Hide message after 2 seconds
//     }
//   };

//   if (error)
//     return (
//       <div className="text-red-600 text-center py-10 font-semibold text-lg">
//         Error: {error}
//       </div>
//     );

//   if (!item)
//     return (
//       <div className="text-center text-gray-600 py-10 animate-pulse text-lg">
//         Loading sports item details...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
//         {/* Image */}
//         <div className="relative rounded-lg overflow-hidden border border-gray-200 md:w-1/2 flex-shrink-0">
//           <img
//             src={
//               item.image?.startsWith("http")
//                 ? item.image
//                 : baseImageUrl + item.image
//             }
//             alt={item.item}
//             className="w-full h-80 object-cover rounded-lg"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src =
//                 "https://via.placeholder.com/400x300?text=No+Image";
//             }}
//           />
//           <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-md text-sm font-semibold text-white">
//             Sports Gear
//           </div>
//         </div>

//         {/* Details */}
//         <div className="flex flex-col justify-center md:w-1/2 space-y-6">
//           {/* Back to Sports Link */}
//           <Link
//             to="/sports"
//             className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
//           >
//             ← Back to Sports
//           </Link>

//           <h2 className="text-4xl font-bold text-gray-800">
//             {item.item}
//           </h2>
//           <p className="text-3xl font-semibold text-purple-600">
//             ₹{item.price} {/* Assuming price is in Rupees, consistent with other pages */}
//           </p>

//           {/* Rating (Optional, simplified) */}
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-500 text-2xl select-none">★ ★ ★ ★ ☆</span>
//             <span className="text-gray-600 text-sm">(4.0 / 5)</span>
//           </div>

//           <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
//             {item.description || "No description provided for this item."}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-105"
//           >
//             Add to Cart
//           </button>
//           {showCartMessage && (
//             <div className="text-center text-green-600 font-semibold mt-2">
//               Added "{item.item}" to cart!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SportsDetail;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../src/Context/CartContext'; // Import the useCart hook

const SportsDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message
  const baseImageUrl = "http://localhost:3001/images/";

  const { addToCart } = useCart(); // Destructure addToCart from useCart()

  useEffect(() => {
    fetch(`http://localhost:3001/sports/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch item');
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      // Call addToCart from the CartContext, passing the current item
      addToCart(item);

      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000); // Hide message after 2 seconds
    }
  };

  if (error)
    return (
      <div className="text-red-600 text-center py-10 font-semibold text-lg">
        Error: {error}
      </div>
    );

  if (!item)
    return (
      <div className="text-center text-gray-600 py-10 animate-pulse text-lg">
        Loading sports item details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 md:w-1/2 flex-shrink-0">
          <img
            src={
              item.image?.startsWith("http")
                ? item.image
                : baseImageUrl + item.image
            }
            alt={item.item}
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-md text-sm font-semibold text-white">
            Sports Gear
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center md:w-1/2 space-y-6">
          {/* Back to Sports Link */}
          <Link
            to="/sports"
            className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            ← Back to Sports
          </Link>

          <h2 className="text-4xl font-bold text-gray-800">
            {item.item}
          </h2>
          <p className="text-3xl font-semibold text-purple-600">
            ₹{item.price} {/* Assuming price is in Rupees, consistent with other pages */}
          </p>

          {/* Rating (Optional, simplified) */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-2xl select-none">★ ★ ★ ★ ☆</span>
            <span className="text-gray-600 text-sm">(4.0 / 5)</span>
          </div>

          <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
            {item.description || "No description provided for this item."}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{item.item}" to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportsDetail;