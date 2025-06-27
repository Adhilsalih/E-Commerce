




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; // Adjust path as necessary relative to CheckoutPage.jsx

const CheckoutPage = () => {
  const { cart, getTotalPrice } = useCart(); // Removed clearCart from here, it will be called on confirmation page
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    zip: '',
    city: '',
    state: '',
  });
  const [zipError, setZipError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  useEffect(() => {
    if (formData.zip.length === 6) {
      setZipError('');
      const fetchLocation = async () => {
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${formData.zip}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          if (data && data[0] && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setFormData((prevData) => ({
              ...prevData,
              city: postOffice.District,
              state: postOffice.State,
            }));
          } else {
            setZipError('Invalid Indian Pincode. Please try again.');
            setFormData((prevData) => ({
              ...prevData,
              city: '',
              state: '',
            }));
          }
        } catch (error) {
          console.error('Error fetching Pincode data:', error);
          setZipError('Could not fetch location for this Pincode. Please enter manually.');
          setFormData((prevData) => ({
            ...prevData,
            city: '',
            state: '',
          }));
        }
      };
      fetchLocation();
    } else if (formData.zip.length > 0 && formData.zip.length < 6) {
      setZipError('Pincode must be 6 digits.');
    } else {
      setZipError('');
      setFormData((prevData) => ({
        ...prevData,
        city: '',
        state: '',
      }));
    }
  }, [formData.zip]);

  const handleProceedToConfirmation = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.address || !formData.zip || !formData.city || !formData.state) {
      alert('Please fill in all shipping information fields.');
      return;
    }
    if (zipError) {
      alert('Please correct the Pincode error before proceeding.');
      return;
    }

    // Navigate to the order confirmation page, passing the form data and cart data
    navigate('/order-confirmation', { state: { shippingInfo: formData, cartItems: cart, totalPrice: getTotalPrice() } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/electronics"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Go to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Checkout</h2>

        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-semibold text-gray-700">Order Summary</h3>
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0">
              <span className="text-gray-700">
                {item.title || item.product || item.item || item.name} x {item.quantity}
              </span>
              <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t border-gray-300">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">₹{getTotalPrice()}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Information</h3>
          <form className="space-y-4" onSubmit={handleProceedToConfirmation}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                id="address"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                id="zip"
                maxLength="6"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.zip}
                onChange={handleChange}
                required
              />
              {zipError && <p className="text-red-500 text-sm mt-1">{zipError}</p>}
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 cursor-not-allowed"
                value={formData.city}
                readOnly
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50 cursor-not-allowed"
                value={formData.state}
                readOnly
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-4"
            >
              Proceed to Confirmation
            </button>
          </form>
        </div>

        <Link
          to="/cart"
          className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;




