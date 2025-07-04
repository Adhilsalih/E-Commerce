// import React, { useState } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { useCart } from '../../src/Context/CartContext'; // Adjust path as necessary

// const OrderConfirmationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { clearCart } = useCart(); // Get clearCart from context

//   // Retrieve data passed from CheckoutPage
//   const { shippingInfo, cartItems, totalPrice } = location.state || {};

//   // State for delivery option
//   const [deliveryOption, setDeliveryOption] = useState('standard'); // Default to standard

//   // If no data is found (e.g., direct navigation to this page), redirect to cart
//   if (!shippingInfo || !cartItems || cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">No Order Details Found</h2>
//         <p className="text-gray-600 mb-6">Please go back to your cart and proceed to checkout.</p>
//         <Link
//           to="/cart"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
//         >
//           Go to Cart
//         </Link>
//       </div>
//     );
//   }

//   const handlePlaceOrder = () => {
//     // This is where you'd integrate with your backend for final order processing
//     console.log('Final Order Details:', {
//       cartItems: cartItems,
//       shippingInfo: shippingInfo,
//       totalPrice: totalPrice,
//       deliveryOption: deliveryOption,
//     });

//     // After successful order, clear the cart
//     clearCart();

//     alert("Order placed successfully! Your cart has been cleared.");
//     // Navigate to a final order success page or home
//     navigate('/order-success'); // A new page to show final success message
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Confirm Your Order</h2>

//         {/* Shipping Address */}
//         <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Address</h3>
//           <p className="text-gray-700"><strong>Full Name:</strong> {shippingInfo.fullName}</p>
//           <p className="text-gray-700"><strong>Address:</strong> {shippingInfo.address}</p>
//           <p className="text-gray-700"><strong>Pincode:</strong> {shippingInfo.zip}</p>
//           <p className="text-gray-700"><strong>City:</strong> {shippingInfo.city}</p>
//           <p className="text-gray-700"><strong>State:</strong> {shippingInfo.state}</p>
//         </div>

//         {/* Delivery Options */}
//         <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//           <h3 className="text-2xl font-semibold text-gray-700 mb-4">Select Delivery Option</h3>
//           <div className="space-y-3">
//             <label className="flex items-center text-gray-700 cursor-pointer">
//               <input
//                 type="radio"
//                 name="deliveryOption"
//                 value="standard"
//                 checked={deliveryOption === 'standard'}
//                 onChange={() => setDeliveryOption('standard')}
//                 className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
//               />
//               <span className="ml-2">Standard Delivery (3-5 business days) - Free</span>
//             </label>
//             <label className="flex items-center text-gray-700 cursor-pointer">
//               <input
//                 type="radio"
//                 name="deliveryOption"
//                 value="express"
//                 checked={deliveryOption === 'express'}
//                 onChange={() => setDeliveryOption('express')}
//                 className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
//               />
//               <span className="ml-2">Express Delivery (1-2 business days) - ₹100</span>
//             </label>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//           <h3 className="text-2xl font-semibold text-gray-700">Order Summary</h3>
//           {cartItems.map(item => (
//             <div key={item._id} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
//               <span className="text-gray-700">
//                 {item.title || item.product || item.item || item.name} x {item.quantity}
//               </span>
//               <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//           ))}
//           <div className="flex justify-between items-center pt-4 border-t border-gray-300">
//             <span className="text-xl font-bold text-gray-800">Subtotal:</span>
//             <span className="text-xl font-bold text-indigo-600">₹{totalPrice.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-semibold text-gray-800">Delivery Charges:</span>
//             <span className="text-lg font-semibold text-indigo-600">
//               {deliveryOption === 'express' ? '₹100.00' : 'Free'}
//             </span>
//           </div>
//           <div className="flex justify-between items-center pt-4 border-t border-gray-300">
//             <span className="text-2xl font-bold text-gray-800">Grand Total:</span>
//             <span className="text-3xl font-bold text-green-600">
//               ₹{(totalPrice + (deliveryOption === 'express' ? 100 : 0)).toFixed(2)}
//             </span>
//           </div>
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-4"
//         >
//           Place Order
//         </button>

//         <Link
//           to="/checkout"
//           className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
//         >
//           ← Back to Shipping Information
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;











// //------------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../src/Context/CartContext'; // Adjust path as necessary

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart(); // Get clearCart from context

  // Retrieve data passed from CheckoutPage
  const { shippingInfo, cartItems, totalPrice } = location.state || {};

  // State for delivery option
  const [deliveryOption, setDeliveryOption] = useState('standard'); // Default to standard

  // If no data is found (e.g., direct navigation to this page), redirect to cart
  if (!shippingInfo || !cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Order Details Found</h2>
        <p className="text-gray-600 mb-6">Please go back to your cart and proceed to checkout.</p>
        <Link
          to="/cart"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Go to Cart
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const finalOrderDetails = {
      cartItems: cartItems,
      shippingInfo: shippingInfo,
      totalPrice: totalPrice,
      deliveryOption: deliveryOption,
      grandTotal: totalPrice + (deliveryOption === 'express' ? 100 : 0),
    };

    console.log('Initiating Payment for Order:', finalOrderDetails);

    // Navigate to the payment page, passing the final order details
    navigate('/payment', { state: { orderDetails: finalOrderDetails } });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Confirm Your Order</h2>

        {/* Shipping Address */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Address</h3>
          <p className="text-gray-700"><strong>Full Name:</strong> {shippingInfo.fullName}</p>
          <p className="text-gray-700"><strong>Address:</strong> {shippingInfo.address}</p>
          <p className="text-gray-700"><strong>Pincode:</strong> {shippingInfo.zip}</p>
          <p className="text-gray-700"><strong>City:</strong> {shippingInfo.city}</p>
          <p className="text-gray-700"><strong>State:</strong> {shippingInfo.state}</p>
        </div>

        {/* Delivery Options */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Select Delivery Option</h3>
          <div className="space-y-3">
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="standard"
                checked={deliveryOption === 'standard'}
                onChange={() => setDeliveryOption('standard')}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2">Standard Delivery (3-5 business days) - Free</span>
            </label>
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="deliveryOption"
                value="express"
                checked={deliveryOption === 'express'}
                onChange={() => setDeliveryOption('express')}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2">Express Delivery (1-2 business days) - ₹100</span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700">Order Summary</h3>
          {cartItems.map(item => (
            <div key={item._id} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
              <span className="text-gray-700">
                {item.title || item.product || item.item || item.name} x {item.quantity}
              </span>
              <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-gray-300">
            <span className="text-xl font-bold text-gray-800">Subtotal:</span>
            <span className="text-xl font-bold text-indigo-600">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Delivery Charges:</span>
            <span className="text-lg font-semibold text-indigo-600">
              {deliveryOption === 'express' ? '₹100.00' : 'Free'}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-300">
            <span className="text-2xl font-bold text-gray-800">Grand Total:</span>
            <span className="text-3xl font-bold text-green-600">
              ₹{(totalPrice + (deliveryOption === 'express' ? 100 : 0)).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-4"
        >
          Proceed to Payment
        </button>

        <Link
          to="/checkout"
          className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Back to Shipping Information
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;






