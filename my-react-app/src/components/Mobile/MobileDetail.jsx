
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// // Assuming you have a CartContext from a previous step, if not, this won't work for cart functionality
// // import { useCart } from '../context/CartContext'; 

// const MobileDetail = () => {
//   const { id } = useParams();
//   const [mobile, setMobile] = useState(null);
//   const [error, setError] = useState("");
//   const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message
//   const baseImageUrl = "http://localhost:3001/images/";

//   // If you are using CartContext, uncomment the line below and the usage in handleAddToCart
//   // const { addToCart } = useCart();

//   useEffect(() => {
//     fetch(`http://localhost:3001/mobiles/${id}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch mobile");
//         return res.json();
//       })
//       .then((data) => setMobile(data))
//       .catch((err) => setError(err.message));
//   }, [id]);

//   const handleAddToCart = () => {
//     if (mobile) {
//       // In a real MERN stack app, you'd use a context or Redux action here
//       // For example, if you have CartContext: addToCart(mobile);

//       setShowCartMessage(true);
//       setTimeout(() => {
//         setShowCartMessage(false);
//       }, 2000); // Hide message after 2 seconds
//     }
//   };

//   if (error)
//     return (
//       <div className="text-center text-red-600 py-10 font-semibold text-lg">
//         Error: {error}
//       </div>
//     );
//   if (!mobile)
//     return (
//       <div className="text-center text-gray-600 py-10 animate-pulse text-lg">
//         Loading mobile details...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
//         {/* Mobile Image */}
//         <div className="relative rounded-lg overflow-hidden border border-gray-200 md:w-1/2 flex-shrink-0">
//           <img
//             src={
//               mobile.image?.startsWith("http")
//                 ? mobile.image
//                 : baseImageUrl + mobile.image
//             }
//             alt={mobile.name}
//             className="w-full h-80 object-cover rounded-lg"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src =
//                 "https://via.placeholder.com/400x300?text=No+Image";
//             }}
//           />
//           <div className="absolute top-3 right-3 bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold text-white">
//             Mobile
//           </div>
//         </div>

//         {/* Mobile Details */}
//         <div className="flex flex-col justify-center md:w-1/2 space-y-6">
//           {/* Back to Mobiles Link */}
//           <Link
//             to="/mobiles"
//             className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
//           >
//             ← Back to Mobiles
//           </Link>

//           <h2 className="text-4xl font-bold text-gray-800">
//             {mobile.name}
//           </h2>
//           <p className="text-3xl font-semibold text-blue-600">
//             ₹{mobile.price} {/* Assuming price is in Rupees, consistent with other pages */}
//           </p>
//           <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
//             {mobile.description || "No description available for this mobile."}
//           </p>
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-105"
//           >
//             Add to Cart
//           </button>
//           {showCartMessage && (
//             <div className="text-center text-green-600 font-semibold mt-2">
//               Added "{mobile.name}" to cart!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileDetail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// Assuming you have a CartContext from a previous step
import { useCart } from '../../Context/CartContext'; // Uncommented this line

const MobileDetail = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);
  const [error, setError] = useState("");
  const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message
  const baseImageUrl = "http://localhost:3001/images/";

  // If you are using CartContext, uncomment the line below and the usage in handleAddToCart
  const { addToCart } = useCart(); // Uncommented this line

  useEffect(() => {
    fetch(`http://localhost:3001/mobiles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch mobile");
        return res.json();
      })
      .then((data) => setMobile(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToCart = () => {
    if (mobile) {
      // Call addToCart from your CartContext
      addToCart(mobile); // Added this line to use the context function

      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000); // Hide message after 2 seconds
    }
  };

  if (error)
    return (
      <div className="text-center text-red-600 py-10 font-semibold text-lg">
        Error: {error}
      </div>
    );
  if (!mobile)
    return (
      <div className="text-center text-gray-600 py-10 animate-pulse text-lg">
        Loading mobile details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Mobile Image */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 md:w-1/2 flex-shrink-0">
          <img
            src={
              mobile.image?.startsWith("http")
                ? mobile.image
                : baseImageUrl + mobile.image
            }
            alt={mobile.name}
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold text-white">
            Mobile
          </div>
        </div>

        {/* Mobile Details */}
        <div className="flex flex-col justify-center md:w-1/2 space-y-6">
          {/* Back to Mobiles Link */}
          <Link
            to="/mobiles"
            className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            ← Back to Mobiles
          </Link>

          <h2 className="text-4xl font-bold text-gray-800">
            {mobile.name}
          </h2>
          <p className="text-3xl font-semibold text-blue-600">
            ₹{mobile.price}{" "}
            {/* Assuming price is in Rupees, consistent with other pages */}
          </p>
          <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
            {mobile.description || "No description available for this mobile."}
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{mobile.name}" to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDetail;