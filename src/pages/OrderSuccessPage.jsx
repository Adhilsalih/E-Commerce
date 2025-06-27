// import React from 'react';
// import { Link } from 'react-router-dom';

// const OrderSuccessPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
//         <h2 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
//         <p className="text-gray-700 text-lg mb-6">Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
//         <p className="text-gray-600 mb-8">You will receive an email confirmation with your order details.</p>
//         <Link
//           to="/"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccessPage;









// //****************************************************** */
// // src/Components/OrderSuccessPage.jsx
// import React, { useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const OrderSuccessPage = () => {
//   const location = useLocation();
//   const { orderDetails } = location.state || {}; // Get order details if passed

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
//       <svg className="h-24 w-24 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//       <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Order Placed Successfully!</h2>
//       <p className="text-gray-600 mb-6 text-lg text-center">Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>

//       {orderDetails && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h3>
//           <p className="text-gray-600">Grand Total: <strong className="text-green-600">₹{orderDetails.grandTotal.toFixed(2)}</strong></p>
//           {/* You might display an order ID here from your backend */}
//           <p className="text-gray-600 mt-2">A confirmation email with your order details has been sent.</p>
//         </div>
//       )}

//       <Link
//         to="/"
//         className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
//       >
//         Continue Shopping
//       </Link>
//     </div>
//   );
// };

// export default OrderSuccessPage;



















// src/Components/OrderSuccessPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { orderDetails, isCOD } = location.state || {}; // Get order details and COD flag

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <svg className="h-24 w-24 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6 text-lg text-center">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
      </p>

      {isCOD && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Cash on Delivery (COD)</h3>
          <p className="text-gray-600">
            You have chosen Cash on Delivery. Please pay ₹{orderDetails.grandTotal.toFixed(2)} when your order arrives.
          </p>
        </div>
      )}

      {orderDetails && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h3>
          <p className="text-gray-600">Grand Total: <strong className="text-green-600">₹{orderDetails.grandTotal.toFixed(2)}</strong></p>
          {/* You might display an order ID here from your backend */}
          <p className="text-gray-600 mt-2">A confirmation email with your order details has been sent.</p>
        </div>
      )}

      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
