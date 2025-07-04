// import React, { useState } from 'react';

// // Main App component
// const Contact = () => {
//   // State to manage form data
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });

//   // State for form submission message
//   const [submissionMessage, setSubmissionMessage] = useState('');
//   // State for message type (success/error)
//   const [messageType, setMessageType] = useState('');

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     // Simple validation
//     if (!formData.name || !formData.email || !formData.subject || !formData.message) {
//       setSubmissionMessage('Please fill in all fields.');
//       setMessageType('error');
//       return;
//     }

//     // Simulate form submission (e.g., sending data to an API)
//     console.log('Form data submitted:', formData);

//     // Clear form fields
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: '',
//     });

//     // Set success message
//     setSubmissionMessage('Your message has been sent successfully!');
//     setMessageType('success');

//     // Clear message after a few seconds
//     setTimeout(() => {
//       setSubmissionMessage('');
//       setMessageType('');
//     }, 5000);
//   };

//   return (
//     // Main container for the contact form
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
//       <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 w-full max-w-md md:max-w-lg lg:max-w-2xl">
//         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
//         <p className="text-gray-600 mb-8 text-center text-base sm:text-lg">
//           We'd love to hear from you! Please fill out the form below.
//         </p>

//         {/* Submission message display */}
//         {submissionMessage && (
//           <div
//             className={`p-3 mb-6 rounded-lg text-center font-medium ${
//               messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//             }`}
//           >
//             {submissionMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name input field */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Your Name"
//               aria-label="Your Name"
//             />
//           </div>

//           {/* Email input field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="you@example.com"
//               aria-label="Your Email"
//             />
//           </div>

//           {/* Subject input field */}
//           <div>
//             <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
//               Subject
//             </label>
//             <input
//               type="text"
//               id="subject"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Subject of your message"
//               aria-label="Subject"
//             />
//           </div>

//           {/* Message textarea */}
//           <div>
//             <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows="5"
//               value={formData.message}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Your message..."
//               aria-label="Your Message"
//             ></textarea>
//           </div>

//           {/* Submit button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
//               aria-label="Send Message"
//             >
//               Send Message
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;




import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage(''); // Clear previous messages
    setMessageType('');

    try {
      const response = await axios.post('http://localhost:3001/api/contact', formData);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setSubmissionMessage(response.data.message);
      setMessageType('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      const message = error.response?.data?.message || 'Failed to submit form. Please try again later.';
      setSubmissionMessage(message);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
      // Clear the message after 5 seconds
      setTimeout(() => {
        setSubmissionMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-center text-base sm:text-lg">
          We'd love to hear from you! Please fill out the form below.
        </p>

        {submissionMessage && (
          <div
            className={`p-3 mb-6 rounded-lg text-center font-medium ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
            role="alert" // Added for accessibility
          >
            {submissionMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Subject of your message"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;