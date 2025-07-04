










































































































// //CURRENTLY USING CORREXCT
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from '../../src/Context/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PaymentPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { clearCart } = useCart();

//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
//     const [loading, setLoading] = useState(false);

//     const { orderDetails } = location.state || {};

//     useEffect(() => {
//         if (!orderDetails) {
//             navigate('/cart');
//             toast.error('No order details found for payment. Please start again from cart.');
//             return;
//         }

//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, [orderDetails, navigate]);

//     if (!orderDetails) return null;

//     const handlePaymentSubmission = async () => {
//         setLoading(true);
//         try {
//             if (selectedPaymentMethod === 'cod') {
//                 const response = await fetch('http://localhost:3001/api/orders', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         ...orderDetails,
//                         paymentMethod: 'COD',
//                         status: 'Pending',
//                         createdAt: new Date().toISOString()
//                     }),
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to send order to external backend');
//                 }

//                 const data = await response.json();
//                 clearCart();
//                 toast.success("Order placed successfully with Cash on Delivery!");
//                 navigate('/order-success', {
//                     state: {
//                         orderDetails,
//                         isCOD: true,
//                         paymentMethod: 'COD'
//                     }
//                 });

//             } else if (selectedPaymentMethod === 'card') {
//                 const response = await fetch('http://localhost:3001/api/create-razorpay-order', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         amount: orderDetails.grandTotal,
//                         currency: 'INR',
//                         receipt: `order_rcptid_${Date.now()}`,
//                     }),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(`Failed to create Razorpay order: ${errorData.message}`);
//                 }

//                 const { id: order_id, currency, amount } = await response.json();

//                 const options = {
//                     key: 'rzp_test_kvAeeBYeWLFKHN',
//                     amount,
//                     currency,
//                     name: 'E-commerce Store',
//                     description: 'Order Payment',
//                     order_id,
//                     handler: async function (response) {
//                         const orderSaveResponse = await fetch('http://localhost:3001/api/orders', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({
//                                 ...orderDetails,
//                                 paymentMethod: 'Card',
//                                 status: 'Paid',
//                                 razorpayPaymentId: response.razorpay_payment_id,
//                                 razorpayOrderId: response.razorpay_order_id,
//                                 razorpaySignature: response.razorpay_signature,
//                                 createdAt: new Date().toISOString()
//                             }),
//                         });

//                         if (!orderSaveResponse.ok) {
//                             throw new Error('Failed to save order after Razorpay payment');
//                         }

//                         clearCart();
//                         toast.success("Payment successful! Your order has been placed.");
//                         navigate('/order-success', {
//                             state: {
//                                 orderDetails,
//                                 paymentMethod: 'Card',
//                                 isCOD: false
//                             }
//                         });
//                     },
//                     prefill: {
//                         name: orderDetails.shippingInfo.fullName || 'Customer Name',
//                         email: orderDetails.shippingInfo.email || 'customer@example.com',
//                         contact: orderDetails.shippingInfo.phone || '9999999999',
//                     },
//                     notes: {
//                         address: orderDetails.shippingInfo.address,
//                     },
//                     theme: {
//                         color: '#3399cc',
//                     },
//                 };

//                 const rzp = new window.Razorpay(options);
//                 rzp.open();
//             } else {
//                 toast.warn(`Selected payment method (${selectedPaymentMethod}) is not implemented yet.`);
//             }
//         } catch (error) {
//             console.error("Payment Error:", error);
//             toast.error(`Payment failed: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <ToastContainer />
//             <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
//                 <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Payment Details</h2>

//                 <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//                     <h3 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h3>
//                     {orderDetails.cartItems.map(item => (
//                         <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4">
//                             <div className="flex items-center space-x-4">
//                                 <img
//                                     src={
//                                         item.image?.startsWith('http')
//                                             ? item.image
//                                             : `http://localhost:3001/images/${item.image}`
//                                     }
//                                     alt={item.title || item.name}
//                                     className="w-16 h-16 object-cover rounded"
//                                 />
//                                 <div>
//                                     <p className="font-medium text-gray-700">{item.title || item.name}</p>
//                                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                                 </div>
//                             </div>
//                             <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
//                         </div>
//                     ))}
//                     <div className="flex justify-between pt-4 border-t">
//                         <span className="text-xl font-bold">Delivery Charges:</span>
//                         <span className="text-xl font-bold text-indigo-600">
//                             {orderDetails.deliveryOption === 'express' ? '₹100.00' : 'Free'}
//                         </span>
//                     </div>
//                     <div className="flex justify-between pt-4 border-t">
//                         <span className="text-2xl font-bold">Total Payable:</span>
//                         <span className="text-3xl font-bold text-green-600">₹{orderDetails.grandTotal.toFixed(2)}</span>
//                     </div>
//                 </div>

//                 {/* Payment Method */}
//                 <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//                     <h3 className="text-2xl font-semibold text-gray-700 mb-4">Choose Payment Method</h3>
//                     <div className="space-y-4">
//                         <label className="flex items-center text-gray-700 cursor-pointer">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="card"
//                                 className="form-radio h-4 w-4 text-indigo-600"
//                                 checked={selectedPaymentMethod === 'card'}
//                                 onChange={() => setSelectedPaymentMethod('card')}
//                             />
//                             <span className="ml-2">Credit/Debit Card (Razorpay)</span>
//                         </label>
//                         <label className="flex items-center text-gray-700 cursor-pointer">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="cod"
//                                 className="form-radio h-4 w-4 text-indigo-600"
//                                 checked={selectedPaymentMethod === 'cod'}
//                                 onChange={() => setSelectedPaymentMethod('cod')}
//                             />
//                             <span className="ml-2">Cash on Delivery (COD)</span>
//                         </label>
//                     </div>

//                     {selectedPaymentMethod === 'card' && (
//                         <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
//                             <p className="text-gray-600">
//                                 You will be redirected to the Razorpay payment gateway to complete your payment.
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 <button
//                     onClick={handlePaymentSubmission}
//                     disabled={loading}
//                     className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
//                         } text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300`}
//                 >
//                     {loading ? 'Processing...' : `Pay Now ₹${orderDetails.grandTotal.toFixed(2)}`}
//                 </button>

//                 <Link
//                     to="/order-confirmation"
//                     state={{
//                         shippingInfo: orderDetails.shippingInfo,
//                         cartItems: orderDetails.cartItems,
//                         totalPrice: orderDetails.totalPrice,
//                     }}
//                     className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
//                 >
//                     ← Back to Order Confirmation
//                 </Link>
//             </div>
//         </div>
//     );
// };





















































// // export default PaymentPage RAZORPAY WORKING;
// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from '../../src/Context/CartContext'; // Adjust path if necessary
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const PaymentPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { clearCart } = useCart(); // Assuming useCart provides clearCart

//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
//     const [loading, setLoading] = useState(false);

//     // orderDetails will be passed via navigation state from the previous page (e.g., checkout)
//     const { orderDetails } = location.state || {};

//     useEffect(() => {
//         // Redirect if no order details are found
//         if (!orderDetails) {
//             toast.error('No order details found for payment. Please start again from cart.');
//             navigate('/cart'); // Or navigate to your checkout/summary page
//             return;
//         }

//         // Dynamically load the Razorpay checkout script
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         document.body.appendChild(script);

//         // Cleanup function to remove the script when the component unmounts
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, [orderDetails, navigate]); // Depend on orderDetails and navigate

//     // Render nothing if orderDetails are missing, as we're redirecting
//     if (!orderDetails) return null;

//     const handlePaymentSubmission = async () => {
//         setLoading(true);
//         try {
//             if (selectedPaymentMethod === 'cod') {
//                 // Logic for Cash on Delivery
//                 const response = await fetch('http://localhost:3001/api/orders', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         ...orderDetails,
//                         paymentMethod: 'COD',
//                         status: 'Pending', // COD orders usually start as pending
//                         createdAt: new Date().toISOString()
//                     }),
//                 });

//                 if (!response.ok) {
//                     // If the backend call to save the COD order fails
//                     const errorData = await response.json();
//                     throw new Error(`Failed to place COD order: ${errorData.message || response.statusText}`);
//                 }

//                 // If COD order is successfully sent to backend
//                 const data = await response.json();
//                 clearCart(); // Clear cart ONLY AFTER successful order placement
//                 toast.success("Order placed successfully with Cash on Delivery!");
//                 navigate('/order-success', {
//                     state: {
//                         orderDetails,
//                         isCOD: true,
//                         paymentMethod: 'COD',
//                         // You might want to pass the backend's order ID here: orderId: data.order._id
//                     }
//                 });

//             } else if (selectedPaymentMethod === 'card') {
//                 // Logic for Card Payment (Razorpay)

//                 // 1. Create Razorpay Order on your backend
//                 const response = await fetch('http://localhost:3001/api/create-razorpay-order', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         // Razorpay expects amount in smallest currency unit (paise for INR)
//                         // Backend will convert grandTotal to paise
//                         amount: orderDetails.grandTotal,
//                         currency: 'INR',
//                         receipt: `order_rcptid_${Date.now()}`, // Unique receipt ID
//                     }),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(`Failed to create Razorpay order: ${errorData.message || response.statusText}`);
//                 }

//                 const { id: order_id, currency, amount } = await response.json(); // Order ID from Razorpay

//                 // 2. Open Razorpay Checkout
//                 const options = {
//                     // CRITICAL FIX: Ensure this key matches your Razorpay Key ID from the dashboard
//                     // It MUST be the same as 'key_id' used in your backend's Razorpay instance.
//                     key: 'rzp_test_GVYWevshkRSggl', // <-- THIS IS THE CORRECTED LINE
//                     amount, // Amount received from backend (already in paise)
//                     currency, // Currency received from backend
//                     name: 'E-commerce Store',
//                     description: 'Order Payment',
//                     order_id, // Order ID received from backend/Razorpay
//                     handler: async function (razorpayResponse) {
//                         // This function is called on successful payment by Razorpay
//                         console.log("Razorpay payment successful:", razorpayResponse);

//                         // 3. Save the order details to your backend after successful payment
//                         const orderSaveResponse = await fetch('http://localhost:3001/api/orders', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({
//                                 ...orderDetails,
//                                 paymentMethod: 'Card',
//                                 status: 'Paid', // Mark as paid
//                                 razorpayPaymentId: razorpayResponse.razorpay_payment_id,
//                                 razorpayOrderId: razorpayResponse.razorpay_order_id,
//                                 razorpaySignature: razorpayResponse.razorpay_signature,
//                                 createdAt: new Date().toISOString()
//                             }),
//                         });

//                         if (!orderSaveResponse.ok) {
//                             const errorSaveData = await orderSaveResponse.json();
//                             throw new Error(`Failed to save order after Razorpay payment: ${errorSaveData.message || orderSaveResponse.statusText}`);
//                         }

//                         // Clear cart and navigate to success page
//                         clearCart();
//                         toast.success("Payment successful! Your order has been placed.");
//                         navigate('/order-success', {
//                             state: {
//                                 orderDetails,
//                                 paymentMethod: 'Card',
//                                 isCOD: false,
//                                 // You can pass Razorpay details if needed:
//                                 // razorpayPaymentId: razorpayResponse.razorpay_payment_id
//                             }
//                         });
//                     },
//                     // Optional: Handle payment failure (user closes, network issue etc.)
//                     modal: {
//                         ondismiss: function() {
//                             toast.info("Payment was cancelled or failed. Please try again.");
//                             setLoading(false); // Reset loading state if payment modal is dismissed
//                         }
//                     },
//                     prefill: {
//                         // Pre-fill details from your shipping info or user data
//                         name: orderDetails.shippingInfo.fullName || 'Customer Name',
//                         email: orderDetails.shippingInfo.email || 'customer@example.com',
//                         contact: orderDetails.shippingInfo.phone || '9999999999',
//                     },
//                     notes: {
//                         address: orderDetails.shippingInfo.address,
//                         // Add any other relevant notes
//                     },
//                     theme: {
//                         color: '#3399cc', // Customize theme color
//                     },
//                 };

//                 const rzp = new window.Razorpay(options);
//                 rzp.open(); // Open the Razorpay payment modal
//             } else {
//                 // Fallback for other payment methods (if any)
//                 toast.warn(`Selected payment method (${selectedPaymentMethod}) is not implemented yet.`);
//             }
//         } catch (error) {
//             console.error("Payment Process Error:", error);
//             // More user-friendly message based on the error
//             let errorMessage = "An unexpected error occurred during payment. Please try again.";
//             if (error.message.includes("Razorpay order")) {
//                 errorMessage = "Failed to initiate card payment. Please try again.";
//             } else if (error.message.includes("COD order")) {
//                 errorMessage = "Failed to place Cash on Delivery order. Please try again.";
//             } else if (error.message.includes("save order")) {
//                 errorMessage = "Payment was successful but there was an issue saving your order. Please contact support with your payment ID.";
//             }
//             toast.error(`Payment failed: ${errorMessage}`);
//         } finally {
//             setLoading(false); // Always reset loading state
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-10 px-4">
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//             <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
//                 <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Payment Details</h2>

//                 {/* Order Summary Section */}
//                 <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//                     <h3 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h3>
//                     {orderDetails.cartItems.map(item => (
//                         <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
//                             <div className="flex items-center space-x-4">
//                                 <img
//                                     src={
//                                         item.image?.startsWith('http')
//                                             ? item.image
//                                             : `http://localhost:3001/images/${item.image}` // Assuming your backend serves images
//                                     }
//                                     alt={item.title || item.name || 'Product Image'}
//                                     className="w-16 h-16 object-cover rounded"
//                                 />
//                                 <div>
//                                     <p className="font-medium text-gray-700">{item.title || item.name}</p>
//                                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
//                                 </div>
//                             </div>
//                             <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
//                         </div>
//                     ))}
//                     <div className="flex justify-between pt-4 border-t mt-4">
//                         <span className="text-xl font-bold">Delivery Charges:</span>
//                         <span className="text-xl font-bold text-indigo-600">
//                             {orderDetails.deliveryOption === 'express' ? '₹100.00' : 'Free'}
//                         </span>
//                     </div>
//                     <div className="flex justify-between pt-4">
//                         <span className="text-2xl font-bold">Total Payable:</span>
//                         <span className="text-3xl font-bold text-green-600">₹{orderDetails.grandTotal.toFixed(2)}</span>
//                     </div>
//                 </div>

//                 {/* Payment Method Section */}
//                 <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//                     <h3 className="text-2xl font-semibold text-gray-700 mb-4">Choose Payment Method</h3>
//                     <div className="space-y-4">
//                         <label className="flex items-center text-gray-700 cursor-pointer">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="card"
//                                 className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
//                                 checked={selectedPaymentMethod === 'card'}
//                                 onChange={() => setSelectedPaymentMethod('card')}
//                             />
//                             <span className="ml-2 font-medium">Credit/Debit Card (Razorpay)</span>
//                         </label>
//                         <label className="flex items-center text-gray-700 cursor-pointer">
//                             <input
//                                 type="radio"
//                                 name="paymentMethod"
//                                 value="cod"
//                                 className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
//                                 checked={selectedPaymentMethod === 'cod'}
//                                 onChange={() => setSelectedPaymentMethod('cod')}
//                             />
//                             <span className="ml-2 font-medium">Cash on Delivery (COD)</span>
//                         </label>
//                     </div>

//                     {selectedPaymentMethod === 'card' && (
//                         <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white text-sm text-gray-600">
//                             <p>
//                                 You will be redirected to the Razorpay secure payment gateway to complete your transaction.
//                             </p>
//                         </div>
//                     )}
//                     {selectedPaymentMethod === 'cod' && (
//                         <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white text-sm text-gray-600">
//                             <p>
//                                 You have chosen Cash on Delivery. Please keep the exact amount ready at the time of delivery.
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Pay Button */}
//                 <button
//                     onClick={handlePaymentSubmission}
//                     disabled={loading}
//                     className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
//                         } text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
//                 >
//                     {loading ? 'Processing...' : `Pay Now ₹${orderDetails.grandTotal.toFixed(2)}`}
//                 </button>

//                 {/* Back Link */}
//                 <Link
//                     to="/order-confirmation" // Navigate back to the order confirmation page
//                     state={{
//                         shippingInfo: orderDetails.shippingInfo,
//                         cartItems: orderDetails.cartItems,
//                         totalPrice: orderDetails.totalPrice,
//                         // Pass any other necessary data back
//                         deliveryOption: orderDetails.deliveryOption,
//                         grandTotal: orderDetails.grandTotal
//                     }}
//                     className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
//                 >
//                     ← Back to Order Confirmation
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;










//WORKING GOOD TICHK
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../src/Context/CartContext'; // Adjust path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const { orderDetails } = location.state || {};

    useEffect(() => {
        if (!orderDetails) {
            toast.error('No order details found for payment. Please start again from cart.');
            navigate('/cart');
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [orderDetails, navigate]);

    if (!orderDetails) return null;

    const handlePaymentSubmission = async () => {
        setLoading(true);
        try {
            if (selectedPaymentMethod === 'cod') {
                // --- FIX STARTS HERE FOR COD ---
                console.log("Attempting to place COD order...");
                const response = await fetch('http://localhost:3001/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...orderDetails,
                        paymentMethod: 'COD',
                        status: 'Pending', // COD orders start as Pending
                        createdAt: new Date().toISOString()
                    }),
                });

                if (response.ok) { // Check if the response was successful (status 2xx)
                    const data = await response.json();
                    console.log("COD order successfully placed:", data);
                    clearCart(); // Clear cart ONLY after the order is successfully placed on the backend
                    toast.success("Order placed successfully with Cash on Delivery!");
                    navigate('/order-success', {
                        state: {
                            orderDetails,
                            isCOD: true,
                            paymentMethod: 'COD',
                            orderId: data.order._id // Pass the order ID from the backend response
                        }
                    });
                } else {
                    // If the backend call to save the COD order fails
                    const errorData = await response.json();
                    console.error("Failed to place COD order:", errorData);
                    throw new Error(`Failed to place Cash on Delivery order: ${errorData.message || response.statusText}`);
                }
                // --- FIX ENDS HERE FOR COD ---

            } else if (selectedPaymentMethod === 'card') {
                // Logic for Card Payment (Razorpay) - This part was largely correct,
                // assuming the Razorpay key mismatch was fixed.
                console.log("Attempting to initiate card payment...");
                const response = await fetch('http://localhost:3001/api/create-razorpay-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: orderDetails.grandTotal, // Backend converts to paise
                        currency: 'INR',
                        receipt: `order_rcptid_${Date.now()}`,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to create Razorpay order: ${errorData.message || response.statusText}`);
                }

                const { id: order_id, currency, amount } = await response.json();
                console.log("Razorpay Order ID received:", order_id);

                const options = {
                    key: 'rzp_test_GVYWevshkRSggl', // Ensure this matches your backend's key_id
                    amount,
                    currency,
                    name: 'E-commerce Store',
                    description: 'Order Payment',
                    order_id,
                    handler: async function (razorpayResponse) {
                        console.log("Razorpay payment successful, saving order...", razorpayResponse);
                        try {
                            const orderSaveResponse = await fetch('http://localhost:3001/api/orders', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    ...orderDetails,
                                    paymentMethod: 'Card',
                                    status: 'Paid',
                                    razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                                    razorpayOrderId: razorpayResponse.razorpay_order_id,
                                    razorpaySignature: razorpayResponse.razorpay_signature,
                                    createdAt: new Date().toISOString()
                                }),
                            });

                            if (!orderSaveResponse.ok) {
                                const errorSaveData = await orderSaveResponse.json();
                                console.error("Failed to save order after Razorpay payment:", errorSaveData);
                                throw new Error(`Failed to save order after Razorpay payment: ${errorSaveData.message || orderSaveResponse.statusText}. Please contact support with Payment ID: ${razorpayResponse.razorpay_payment_id}`);
                            }

                            const savedOrder = await orderSaveResponse.json();
                            clearCart();
                            toast.success("Payment successful! Your order has been placed.");
                            navigate('/order-success', {
                                state: {
                                    orderDetails,
                                    paymentMethod: 'Card',
                                    isCOD: false,
                                    orderId: savedOrder.order._id // Pass the order ID from the backend response
                                }
                            });
                        } catch (saveError) {
                            console.error("Error in Razorpay handler saving order:", saveError);
                            toast.error(`Order saving failed: ${saveError.message}`);
                            // Consider a manual follow-up for the user in case payment went through but saving failed
                        }
                    },
                    modal: {
                        ondismiss: function() {
                            console.log("Razorpay payment modal dismissed.");
                            toast.info("Payment cancelled or closed. Please try again.");
                            // Importantly, reset loading state when modal is dismissed without success
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: orderDetails.shippingInfo.fullName || 'Customer Name',
                        email: orderDetails.shippingInfo.email || 'customer@example.com',
                        contact: orderDetails.shippingInfo.phone || '9999999999',
                    },
                    notes: {
                        address: orderDetails.shippingInfo.address,
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                toast.warn(`Selected payment method (${selectedPaymentMethod}) is not implemented yet.`);
            }
        } catch (error) {
            console.error("Payment Process Catch Block Error:", error);
            let errorMessage = "An unexpected error occurred during payment. Please try again.";
            if (error.message) {
                errorMessage = error.message; // Use the specific error message if available
            }
            toast.error(`Payment failed: ${errorMessage}`);
        } finally {
            // Note: For card payments, setLoading(false) is handled in the modal dismiss
            // or within the handler's catch block. For COD, it's here.
            // Ensure it's not set to false too early for card payments.
            if (selectedPaymentMethod === 'cod') {
                 setLoading(false);
            }
            // For card, the handler or modal.ondismiss will set loading to false.
            // If an error happens *before* rzp.open(), then this finally block catches it.
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Payment Details</h2>

                {/* Order Summary Section (No changes needed here) */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Order Summary</h3>
                    {orderDetails.cartItems.map(item => (
                        <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        item.image?.startsWith('http')
                                            ? item.image
                                            : `http://localhost:3001/images/${item.image}`
                                    }
                                    alt={item.title || item.name || 'Product Image'}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium text-gray-700">{item.title || item.name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between pt-4 border-t mt-4">
                        <span className="text-xl font-bold">Delivery Charges:</span>
                        <span className="text-xl font-bold text-indigo-600">
                            {orderDetails.deliveryOption === 'express' ? '₹100.00' : 'Free'}
                        </span>
                    </div>
                    <div className="flex justify-between pt-4">
                        <span className="text-2xl font-bold">Total Payable:</span>
                        <span className="text-3xl font-bold text-green-600">₹{orderDetails.grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Method Section (No changes needed here) */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Choose Payment Method</h3>
                    <div className="space-y-4">
                        <label className="flex items-center text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                checked={selectedPaymentMethod === 'card'}
                                onChange={() => setSelectedPaymentMethod('card')}
                            />
                            <span className="ml-2 font-medium">Credit/Debit Card (Razorpay)</span>
                        </label>
                        <label className="flex items-center text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                checked={selectedPaymentMethod === 'cod'}
                                onChange={() => setSelectedPaymentMethod('cod')}
                            />
                            <span className="ml-2 font-medium">Cash on Delivery (COD)</span>
                        </label>
                    </div>

                    {selectedPaymentMethod === 'card' && (
                        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white text-sm text-gray-600">
                            <p>
                                You will be redirected to the Razorpay secure payment gateway to complete your transaction.
                            </p>
                        </div>
                    )}
                    {selectedPaymentMethod === 'cod' && (
                        <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white text-sm text-gray-600">
                            <p>
                                You have chosen Cash on Delivery. Please keep the exact amount ready at the time of delivery.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePaymentSubmission}
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        } text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                    {loading ? 'Processing...' : `Pay Now ₹${orderDetails.grandTotal.toFixed(2)}`}
                </button>

                {/* Back Link */}
                <Link
                    to="/order-confirmation"
                    state={{
                        shippingInfo: orderDetails.shippingInfo,
                        cartItems: orderDetails.cartItems,
                        totalPrice: orderDetails.totalPrice,
                        deliveryOption: orderDetails.deliveryOption,
                        grandTotal: orderDetails.grandTotal
                    }}
                    className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
                >
                    ← Back to Order Confirmation
                </Link>
            </div>
        </div>
    );
};

export default PaymentPage;