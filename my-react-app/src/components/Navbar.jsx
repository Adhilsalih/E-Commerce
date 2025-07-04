// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
// // FIX: Correct the import path for useCart based on your file structure
// // If Navbar is in src/components/ and CartContext is in src/Context/
// import { useCart } from '../../src/Context/CartContext'

// // Dummy components for routes to make Links work without errors (no changes needed here)
// const HomePage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Home Page</h1><p>Welcome to Shopverse!</p></div>;
// const CartPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Shopping Cart</h1><p>Your cart is currently empty.</p></div>;
// const GroceriesPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Groceries</h1><p>Fresh groceries delivered to your door.</p></div>;
// const ElectronicsPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Electronics</h1><p>Latest gadgets and electronics.</p></div>;
// const SportsPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Sports</h1><p>Sporting goods and equipment.</p></div>;
// const BooksPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Books</h1><p>A wide variety of books.</p></div>;
// const MobilesPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Mobiles</h1><p>Smartphones and accessories.</p></div>;
// const FashionPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Fashion</h1><p>Trendy apparel and fashion.</p></div>;
// const ContactPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">Contact Us</h1><p>Get in touch with us.</p></div>;
// const AboutPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">About Us</h1><p>Learn more about Shopverse.</p></div>;
// const ProductsPage = () => <div className="p-8 text-center"><h1 className="text-3xl font-bold">All Products</h1><p>Explore our entire collection.</p></div>;

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { getCartItemCount } = useCart(); // This part is correct!

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
//         <div className="text-2xl font-extrabold tracking-wide">
//           <Link to="/" className="text-slate-800 hover:text-blue-600 transition">
//             Shopverse
//           </Link>
//         </div>

//         <div className="relative flex-1 mx-6 max-w-xl">
//           <form onSubmit={(e) => e.preventDefault()}>
//             <input
//               type="text"
//               placeholder="Search product"
//               className="w-full rounded-full py-2 px-5 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
//             />
//             <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
//           </form>
//         </div>

//         <div className="flex items-center space-x-6">
//           <Link
//             to="/cart"
//             className="relative text-slate-700 hover:text-blue-600 transition"
//           >
//             <FaShoppingCart className="text-2xl" />
//             {getCartItemCount() > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
//                 {getCartItemCount()}
//               </span>
//             )}
//           </Link>

//           <button className="hidden md:block text-slate-700 font-semibold hover:text-blue-600 transition">
//             Login | Register
//           </button>

//           <button className="block md:hidden text-slate-700 text-2xl hover:text-blue-600 transition">
//             <FaUser />
//           </button>
//         </div>
//       </div>

//       <div className="flex items-center justify-center space-x-12 py-4 text-sm font-semibold text-gray-700 bg-white border-t border-gray-200 select-none">
//         <Link to="/" className="hover:text-blue-600 transition">
//           Home
//         </Link>

//         <div
//           className="relative"
//           onMouseEnter={() => setIsDropdownOpen(true)}
//           onMouseLeave={() => setIsDropdownOpen(false)}
//         >
//           <button className="hover:text-blue-600 transition cursor-pointer">
//             Shop
//           </button>

//           <div
//             className={`absolute top-full mt-2 bg-white rounded-lg shadow-xl w-44 z-20 transition-all duration-300 ease-in-out ${
//               isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
//             }`}
//           >
//             <ul className="flex flex-col text-left text-gray-800 font-medium">
//               <li>
//                 <Link
//                   to="/groceries"
//                   className="block px-4 py-3 hover:bg-gray-100 rounded-t-md"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Groceries
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/electronics"
//                   className="block px-4 py-3 hover:bg-gray-100"
//                    onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Electronics
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/sports"
//                   className="block px-4 py-3 hover:bg-gray-100"
//                    onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Sports
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/books"
//                   className="block px-4 py-3 hover:bg-gray-100"
//                    onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Books
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/mobiles"
//                   className="block px-4 py-3 hover:bg-gray-100"
//                    onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Mobile
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/fashion"
//                   className="block px-4 py-3 hover:bg-gray-100 rounded-b-md"
//                    onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Fashion
//                 </Link>
//               </li>
//                 <li>
//                 <Link
//                   to="/products"
//                   className="block px-4 py-3 hover:bg-gray-100 rounded-b-md"
//                    onClick={() => setIsDropdownOpen(false)}
//                 >
//                   All Products
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <Link to="/contact" className="hover:text-blue-600 transition">
//           Contact
//         </Link>
//         <Link to="/about" className="hover:text-blue-600 transition">
//           About
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// //usemain last


















// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSearch, FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
// import { useCart } from "../../src/Context/CartContext";
// import { useWishlist } from '../../src/Context/WishlistContext'; // Correctly import useWishlist

// // Dummy components for routes (add WishlistPage)
// const HomePage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Home Page</h1>
//         <p>Welcome to Shopverse!</p>
//     </div>
// );
// const CartPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Shopping Cart</h1>
//         <p>Your cart is currently empty.</p>
//     </div>
// );
// const WishlistPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Your Wishlist</h1>
//         <p>Your wishlist is currently empty.</p>
//     </div>
// ); // New Wishlist Page
// const GroceriesPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Groceries</h1>
//         <p>Fresh groceries delivered to your door.</p>
//     </div>
// );
// const ElectronicsPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Electronics</h1>
//         <p>Latest gadgets and electronics.</p>
//     </div>
// );
// const SportsPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Sports</h1>
//         <p>Sporting goods and equipment.</p>
//     </div>
// );
// const BooksPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Books</h1>
//         <p>A wide variety of books.</p>
//     </div>
// );
// const MobilesPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Mobiles</h1>
//         <p>Smartphones and accessories.</p>
//     </div>
// );
// const FashionPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Fashion</h1>
//         <p>Trendy apparel and fashion.</p>
//     </div>
// );
// const ContactPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Contact Us</h1>
//         <p>Get in touch with us.</p>
//     </div>
// );
// const AboutPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">About Us</h1>
//         <p>Learn more about Shopverse.</p>
//     </div>
// );
// const ProductsPage = () => (
//     <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">All Products</h1>
//         <p>Explore our entire collection.</p>
//     </div>
// );

// const Navbar = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
//     const [username, setUsername] = useState(''); // New state for username

//     const { getCartItemCount } = useCart();
//     const { getWishlistItemCount } = useWishlist(); // NOW THIS WILL WORK!

//     const navigate = useNavigate(); // Initialize useNavigate

//     useEffect(() => {
//         // Check local storage for token on component mount
//         const token = localStorage.getItem('token');
//         const user = localStorage.getItem('user');
//         if (token && user) {
//             setIsLoggedIn(true);
//             try {
//                 const parsedUser = JSON.parse(user);
//                 setUsername(parsedUser.username);
//             } catch (e) {
//                 console.error("Failed to parse user data from localStorage", e);
//                 setIsLoggedIn(false);
//             }
//         } else {
//             setIsLoggedIn(false);
//             setUsername('');
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token'); // Remove token
//         localStorage.removeItem('user'); // Remove user info
//         setIsLoggedIn(false);
//         setUsername('');
//         navigate('/login'); // Redirect to login page after logout
//     };

//     return (
//         <nav className="bg-white shadow-lg">
//             <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
//                 <div className="text-2xl font-extrabold tracking-wide">
//                     <Link to="/" className="text-slate-800 hover:text-red-600 transition">
//                         Shopverse
//                     </Link>
//                 </div>

//                 <div className="relative flex-1 mx-6 max-w-xl">
//                     <form onSubmit={(e) => e.preventDefault()}>
//                         <input
//                             type="text"
//                             placeholder="Search product"
//                             className="w-full rounded-full py-2 px-5 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
//                         />
//                         <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
//                     </form>
//                 </div>

//                 <div className="flex items-center space-x-6">
//                     {/* Wishlist Icon */}
//                     <Link
//                         to="/wishlist"
//                         className="relative text-slate-700 hover:text-red-500 transition"
//                     >
//                         <FaHeart className="text-2xl" />
//                         {getWishlistItemCount() > 0 && ( // This now calls the function from your context
//                             <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
//                                 {getWishlistItemCount()}
//                             </span>
//                         )}
//                     </Link>

//                     {/* Shopping Cart Icon */}
//                     <Link
//                         to="/cart"
//                         className="relative text-slate-700 hover:text-blue-600 transition"
//                     >
//                         <FaShoppingCart className="text-2xl" />
//                         {getCartItemCount() > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
//                                 {getCartItemCount()}
//                             </span>
//                         )}
//                     </Link>

//                     {/* Conditional Login/Logout/Username */}
//                     {isLoggedIn ? (
//                         <div className="hidden md:flex items-center space-x-2">
//                             <span className="text-slate-700 font-semibold">Hello, {username}!</span>
//                             <button
//                                 onClick={handleLogout}
//                                 className="text-slate-700 font-semibold hover:text-blue-600 transition"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     ) : (
//                         <Link
//                             to="/login"
//                             className="hidden md:block text-slate-700 font-semibold hover:text-blue-600 transition"
//                         >
//                             Login
//                         </Link>
//                     )}

//                     <button className="block md:hidden text-slate-700 text-2xl hover:text-blue-600 transition">
//                         <FaUser />
//                     </button>
//                 </div>
//             </div>

//             <div className="flex items-center justify-center space-x-12 py-4 text-sm font-semibold text-gray-700 bg-white border-t border-gray-200 select-none">
//                 <Link to="/" className="hover:text-blue-600 transition">
//                     Home
//                 </Link>

//                 <div
//                     className="relative"
//                     onMouseEnter={() => setIsDropdownOpen(true)}
//                     onMouseLeave={() => setIsDropdownOpen(false)}
//                 >
//                     <button className="hover:text-blue-600 transition cursor-pointer">
//                         Shop
//                     </button>
//                     <div
//                         className={`absolute top-full mt-2 bg-white rounded-lg shadow-xl w-44 z-20 transition-all duration-300 ease-in-out ${
//                             isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
//                         }`}
//                     >
//                         <ul className="flex flex-col text-left text-gray-800 font-medium">
//                             <li>
//                                 <Link
//                                     to="/groceries"
//                                     className="block px-4 py-3 hover:bg-gray-100 rounded-t-md"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Groceries
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     to="/electronics"
//                                     className="block px-4 py-3 hover:bg-gray-100"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Electronics
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     to="/sports"
//                                     className="block px-4 py-3 hover:bg-gray-100"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Sports
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     to="/books"
//                                     className="block px-4 py-3 hover:bg-gray-100"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Books
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     to="/mobiles"
//                                     className="block px-4 py-3 hover:bg-gray-100"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Mobile
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     to="/fashion"
//                                     className="block px-4 py-3 hover:bg-gray-100 rounded-b-md"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Fashion
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link
//                                     to="/products"
//                                     className="block px-4 py-3 hover:bg-gray-100 rounded-b-md"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     All Products
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 <Link to="/contact" className="hover:text-blue-600 transition">
//                     Contact
//                 </Link>
//                 <Link to="/about" className="hover:text-blue-600 transition">
//                     About
//                 </Link>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { useCart } from "../../src/Context/CartContext";
import { useWishlist } from '../../src/Context/WishlistContext'; // Correctly import useWishlist

// Dummy components for routes (add WishlistPage)
const HomePage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <p>Welcome to Shopverse!</p>
    </div>
);
const CartPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p>Your cart is currently empty.</p>
    </div>
);
const WishlistPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <p>Your wishlist is currently empty.</p>
    </div>
); // New Wishlist Page
const GroceriesPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Groceries</h1>
        <p>Fresh groceries delivered to your door.</p>
    </div>
);
const ElectronicsPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Electronics</h1>
        <p>Latest gadgets and electronics.</p>
    </div>
);
const SportsPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Sports</h1>
        <p>Sporting goods and equipment.</p>
    </div>
);
const BooksPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Books</h1>
        <p>A wide variety of books.</p>
    </div>
);
const MobilesPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Mobiles</h1>
        <p>Smartphones and accessories.</p>
    </div>
);
const FashionPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Fashion</h1>
        <p>Trendy apparel and fashion.</p>
    </div>
);
const ContactPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p>Get in touch with us.</p>
    </div>
);
const AboutPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p>Learn more about Shopverse.</p>
    </div>
);
const ProductsPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p>Explore our entire collection.</p>
    </div>
);

// Dummy LoginPage component
const LoginPage = () => (
    <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Login Page</h1>
        <p>Please log in to continue.</p>
        {/* In a real app, this would have a login form */}
    </div>
);

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [username, setUsername] = useState(''); // State to store username

    const { getCartItemCount } = useCart();
    const { getWishlistItemCount } = useWishlist();

    const navigate = useNavigate(); // Initialize useNavigate hook

    // Effect to check login status on component mount and when localStorage changes
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (token && user) {
                try {
                    const parsedUser = JSON.parse(user);
                    setUsername(parsedUser.username);
                    setIsLoggedIn(true);
                } catch (e) {
                    console.error("Failed to parse user data from localStorage", e);
                    setIsLoggedIn(false);
                    setUsername('');
                }
            } else {
                setIsLoggedIn(false);
                setUsername('');
            }
        };

        checkLoginStatus(); // Initial check

        // Optional: Add event listener for storage changes if other tabs/windows can affect login state
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('user'); // Remove user data from localStorage
        setIsLoggedIn(false); // Update login state
        setUsername(''); // Clear username
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
                <div className="text-2xl font-extrabold tracking-wide">
                    <Link to="/" className="text-slate-800 hover:text-red-600 transition">
                        Shopverse
                    </Link>
                </div>

                <div className="relative flex-1 mx-6 max-w-xl">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search product"
                            className="w-full rounded-full py-2 px-5 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                        />
                        <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
                    </form>
                </div>

                <div className="flex items-center space-x-6">
                    {/* Wishlist Icon */}
                    <Link
                        to="/wishlist"
                        className="relative text-slate-700 hover:text-red-500 transition"
                    >
                        <FaHeart className="text-2xl" />
                        {getWishlistItemCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
                                {getWishlistItemCount()}
                            </span>
                        )}
                    </Link>

                    {/* Shopping Cart Icon */}
                    <Link
                        to="/cart"
                        className="relative text-slate-700 hover:text-blue-600 transition"
                    >
                        <FaShoppingCart className="text-2xl" />
                        {getCartItemCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
                                {getCartItemCount()}
                            </span>
                        )}
                    </Link>

                    {/* Conditional Login/Logout/Username */}
                    {isLoggedIn ? (
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-slate-700 font-semibold">Hello, {username}!</span>
                            <button
                                onClick={handleLogout}
                                className="text-slate-700 font-semibold hover:text-blue-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:block text-slate-700 font-semibold hover:text-blue-600 transition"
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile user icon (can be used for a mobile menu) */}
                    <button className="block md:hidden text-slate-700 text-2xl hover:text-blue-600 transition">
                        <FaUser />
                    </button>
                </div>
            </div>

            {/* Secondary Navigation (Shop, Contact, About) */}
            <div className="flex items-center justify-center space-x-12 py-4 text-sm font-semibold text-gray-700 bg-white border-t border-gray-200 select-none">
                <Link to="/" className="hover:text-blue-600 transition">
                    Home
                </Link>

                <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <button className="hover:text-blue-600 transition cursor-pointer">
                        Shop
                    </button>
                    <div
                        className={`absolute top-full mt-2 bg-white rounded-lg shadow-xl w-44 z-20 transition-all duration-300 ease-in-out ${
                            isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    >
                        <ul className="flex flex-col text-left text-gray-800 font-medium">
                            <li>
                                <Link
                                    to="/groceries"
                                    className="block px-4 py-3 hover:bg-gray-100 rounded-t-md"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Groceries
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/electronics"
                                    className="block px-4 py-3 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Electronics
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sports"
                                    className="block px-4 py-3 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/books"
                                    className="block px-4 py-3 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/mobiles"
                                    className="block px-4 py-3 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Mobiles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/fashion"
                                    className="block px-4 py-3 hover:bg-gray-100 rounded-b-md"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Fashion
                                </Link>
                            </li>
                            <li>
                                {/* <Link
                                    to="/products"
                                    className="block px-4 py-3 hover:bg-gray-100 rounded-b-md"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    All Products
                                </Link> */}
                            </li>
                        </ul>
                    </div>
                </div>

                <Link to="/contact" className="hover:text-blue-600 transition">
                    Contact
                </Link>
                <Link to="/about" className="hover:text-blue-600 transition">
                    About
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;