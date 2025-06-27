
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// function GroceryDetail() {

//   const { id } = useParams();
//   const [grocery, setGrocery] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message

//   const baseImageUrl = "http://localhost:3001/images/";

//   // If you are using CartContext, uncomment the line below and the usage in handleAddToCart
//   // const { addToCart } = useCart();

//   useEffect(() => {
//     fetch(`http://localhost:3001/groceries/${id}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setGrocery(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAddToCart = () => {
//     if (grocery) {
//       // In a real MERN stack app, you'd use a context or Redux action here
//       // For example, if you have CartContext: addToCart(grocery);

//       setShowCartMessage(true);
//       setTimeout(() => {
//         setShowCartMessage(false);
//       }, 2000); // Hide message after 2 seconds
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center mt-10 text-gray-600 animate-pulse font-medium text-lg">
//         Loading grocery item...
//       </p>
//     );
//   }

//   if (error) {
//     return (
//       <p className="text-center mt-10 text-red-600 font-semibold text-lg">
//         Error: {error}
//       </p>
//     );
//   }

//   if (!grocery) {
//     return (
//       <p className="text-center mt-10 text-gray-500 font-medium text-lg">
//         Grocery item not found.
//       </p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
//         {/* Image */}
//         <div className="relative md:w-1/2 rounded-lg overflow-hidden border border-gray-200">
//           <img
//             src={
//               grocery.image?.startsWith("http")
//                 ? grocery.image
//                 : baseImageUrl + grocery.image
//             }
//             alt={grocery.item || "Grocery item"}
//             className="w-full h-80 object-cover rounded-lg"
//             onError={(e) => {
//               e.currentTarget.onerror = null;
//               e.currentTarget.src =
//                 "https://via.placeholder.com/400x300?text=No+Image";
//             }}
//           />
//           <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-green-600 text-sm font-semibold text-white">
//             Grocery Item
//           </div>
//         </div>

//         {/* Details */}
//         <div className="flex-1 flex flex-col justify-center space-y-6">
//           <Link
//             to="/groceries"
//             className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
//           >
//             ← Back to Groceries
//           </Link>

//           <h1 className="text-4xl font-bold text-gray-800">
//             {grocery.item || "Unnamed Item"}
//           </h1>

//           <p className="text-3xl font-semibold text-green-600">
//             ₹{grocery.price}
//           </p>

//           <p className="text-gray-700 text-base leading-relaxed min-h-[120px]">
//             {grocery.description || "No description available for this item."}
//           </p>

//           <button
//             onClick={handleAddToCart}
//             className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:scale-105"
//           >
//             Add to Cart
//           </button>
//           {showCartMessage && (
//             <div className="text-center text-green-600 font-semibold mt-2">
//               Added "{grocery.item}" to cart!
//             </div>
//           )}
         
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GroceryDetail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext'; // FIX: Import useCart

function GroceryDetail() {
  const { id } = useParams();
  const [grocery, setGrocery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartMessage, setShowCartMessage] = useState(false); // State for cart message

  const baseImageUrl = "http://localhost:3001/images/";

  // FIX: Uncomment the line below
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/groceries/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setGrocery(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (grocery) {
      // FIX: Call addToCart here
      addToCart(grocery);

      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000); // Hide message after 2 seconds
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600 animate-pulse font-medium text-lg">
        Loading grocery item...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        Error: {error}
      </p>
    );
  }

  if (!grocery) {
    return (
      <p className="text-center mt-10 text-gray-500 font-medium text-lg">
        Grocery item not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="relative md:w-1/2 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={
              grocery.image?.startsWith("http")
                ? grocery.image
                : baseImageUrl + grocery.image
            }
            alt={grocery.item || "Grocery item"}
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-green-600 text-sm font-semibold text-white">
            Grocery Item
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <Link
            to="/groceries"
            className="self-start text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            ← Back to Groceries
          </Link>

          <h1 className="text-4xl font-bold text-gray-800">
            {grocery.item || "Unnamed Item"}
          </h1>

          <p className="text-3xl font-semibold text-green-600">
            ₹{grocery.price}
          </p>

          <p className="text-gray-700 text-base leading-relaxed min-h-[120px]">
            {grocery.description || "No description available for this item."}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-lg font-semibold shadow-md transition duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{grocery.item}" to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroceryDetail;