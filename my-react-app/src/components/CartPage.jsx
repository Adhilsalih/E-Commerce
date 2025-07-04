
// import React from 'react';
// import { useCart } from '../../src/Context/CartContext'; // Verify this path: It should be relative to where CartContext.jsx is
// import { Link } from 'react-router-dom';

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
//         <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
//         <Link
//           to="/electronics" // Changed to /electronics for consistency with your electronics section
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
//         >
//           Start Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h2>

//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-4"
//             >
//               <div className="flex items-center gap-4 w-full md:w-auto">
//                 <img
//                   src={
//                     item.image?.startsWith("http")
//                       ? item.image
//                       : `http://localhost:3001/images/${item.image}`
//                   }
//                   alt={item.title || item.product || item.item || item.name}
//                   className="w-20 h-20 object-cover rounded-lg border border-gray-200"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
//                   }}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {item.title || item.product || item.item || item.name}
//                   </h3>
//                   <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 mt-4 md:mt-0">
//                 <div className="flex items-center border border-gray-300 rounded-md">
//                   <button
//                     onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                     className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-md"
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                     className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-md"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition duration-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-300">
//           <h3 className="text-2xl font-bold text-gray-800">Total:</h3>
//           <p className="text-3xl font-bold text-indigo-600">₹{getTotalPrice()}</p>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
//           <button
//             onClick={clearCart}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
//           >
//             Clear Cart
//           </button>
//           <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 w-full sm:w-auto">
//             Proceed to Checkout
//           </button>
//         </div>

//         <Link
//           to="/"
//           className="mt-8 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
//         >
//           ← Continue Shopping
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
// CartPage.jsx














import React from 'react';
import { useCart } from '../../src/Context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate hook

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/electronics"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Navigate to the new checkout route
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h2>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-4"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:3001/images/${item.image}`
                  }
                  alt={item.title || item.product || item.item || item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Use currentTarget for better practice
                    e.currentTarget.src = "https://via.placeholder.com/80x80?text=No+Image";
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title || item.product || item.item || item.name}
                  </h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-md"
                    disabled={item.quantity <= 1} // Disable decrement if quantity is 1
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800">Total:</h3>
          <p className="text-3xl font-bold text-indigo-600">₹{getTotalPrice()}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            onClick={clearCart}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
          >
            Clear Cart
          </button>
          <button
            onClick={handleProceedToCheckout} // Call the navigation function
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
          >
            Proceed to Checkout
          </button>
        </div>

        <Link
          to="/"
          className="mt-8 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPage;




