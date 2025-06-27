
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// // In a real application, you might have a CartContext or Redux for cart management.
// // If you implement a CartContext, you'd uncomment the following line:
// // import { useCart } from '../context/CartContext'; 

// function ElectronicsDetail() {
//   // useParams hook to get the 'id' from the URL
//   const { id } = useParams();

//   // State variables for product data, error handling, and cart message
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);
//   const [showCartMessage, setShowCartMessage] = useState(false); // State to control cart confirmation message

//   // Base URL for images, assuming your backend serves them from this path
//   const baseImageUrl = "http://localhost:3001/images/";

//   // If you are using a CartContext, you'd initialize it here:
//   // const { addToCart } = useCart(); 

//   // useEffect hook to fetch product details when the component mounts or 'id' changes
//   useEffect(() => {
//     fetch(`http://localhost:3001/products/${id}`)
//       .then((res) => {
//         // Check if the network response was successful
//         if (!res.ok) {
//           throw new Error("Failed to fetch product details");
//         }
//         return res.json(); // Parse the JSON response
//       })
//       .then((data) => setProduct(data)) // Set the fetched product data to state
//       .catch((err) => setError(err.message)); // Catch and set any errors
//   }, [id]); // Dependency array: re-run effect if 'id' changes

//   // Function to handle adding the product to the cart
//   const handleAddToCart = () => {
//     if (product) {
//       // In a real MERN stack app, you would typically dispatch an action
//       // to add the product to a global cart state (e.g., using Context API or Redux).
//       // For this example, we're just showing a temporary confirmation message.

//       // If you're using CartContext, uncomment the line below:
//       // addToCart(product); 
      
//       setShowCartMessage(true); // Show the cart confirmation message
//       // Hide the message after 2 seconds
//       setTimeout(() => {
//         setShowCartMessage(false);
//       }, 2000);
//     }
//   };

//   // --- Conditional Rendering for Loading and Error States ---

//   // Display an error message if there was a problem fetching data
//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-500 font-semibold">
//         Error: {error}
//       </p>
//     );

//   // Display a loading message while data is being fetched
//   if (!product)
//     return <p className="text-center mt-10 text-gray-600 animate-pulse">Loading product details...</p>;

//   // --- Main Component Structure ---
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
//       {/* Product Detail Card */}
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        
//         {/* Product Image Section */}
//         {/* The image container is set to md:w-1/3 to make it smaller */}
//         <div className="relative rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 md:w-1/3">
//           <img
//             src={
//               // Check if the image URL is an external link or a local path
//               product.image?.startsWith("http")
//                 ? product.image
//                 : baseImageUrl + product.image
//             }
//             alt={product.product}
//             // Image itself has adjusted height (h-64) and object-contain to fit within the smaller container
//             className="w-full h-64 object-contain rounded-lg" 
//             onError={(e) => {
//               // Fallback for broken image links
//               e.currentTarget.onerror = null; // Prevents infinite loop if fallback image also fails
//               e.currentTarget.src =
//                 "https://via.placeholder.com/400x300?text=No+Image";
//             }}
//           />
//           {/* Category Tag Overlay */}
//           <div className="absolute top-3 right-3 bg-indigo-500 px-3 py-1 rounded-md text-sm font-semibold text-white">
//             Electronics
//           </div>
//         </div>

//         {/* Product Details Section */}
//         {/* This section now takes up md:w-2/3 of the space */}
//         <div className="flex flex-col justify-center md:w-2/3 space-y-6">
//           {/* Product Title */}
//           <h1 className="text-4xl font-bold text-gray-800">
//             {product.product}
//           </h1>
//           {/* Product Price */}
//           <p className="text-3xl font-semibold text-indigo-600">
//             ₹{product.price}
//           </p>
//           {/* Product Description */}
//           <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
//             {product.description || "No description available for this product."}
//           </p>
//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
//           >
//             Add to Cart
//           </button>
//           {/* Cart Confirmation Message */}
//           {showCartMessage && (
//             <div className="text-center text-green-600 font-semibold mt-2">
//               Added "{product.product}" to cart!
//             </div>
//           )}
//           {/* Back to Electronics Link */}
//           <Link
//             to="/electronics"
//             className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
//           >
//             ← Back to Electronics
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ElectronicsDetail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext'; // Verify this path: It should be relative to where CartContext.jsx is

function ElectronicsDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const baseImageUrl = "http://localhost:3001/images/";

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowCartMessage(true);
      setTimeout(() => {
        setShowCartMessage(false);
      }, 2000);
    }
  };

  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Error: {error}
      </p>
    );

  if (!product)
    return <p className="text-center mt-10 text-gray-600 animate-pulse">Loading product details...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="relative rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 md:w-1/3">
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : baseImageUrl + product.image
            }
            alt={product.product}
            className="w-full h-64 object-contain rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-3 right-3 bg-indigo-500 px-3 py-1 rounded-md text-sm font-semibold text-white">
            Electronics
          </div>
        </div>

        <div className="flex flex-col justify-center md:w-2/3 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            {product.product}
          </h1>
          <p className="text-3xl font-semibold text-indigo-600">
            ₹{product.price}
          </p>
          <p className="text-gray-700 text-base leading-relaxed min-h-[100px]">
            {product.description || "No description available for this product."}
          </p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Add to Cart
          </button>
          {showCartMessage && (
            <div className="text-center text-green-600 font-semibold mt-2">
              Added "{product.product}" to cart!
            </div>
          )}
          <Link
            to="/electronics"
            className="mt-4 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back to Electronics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ElectronicsDetail;