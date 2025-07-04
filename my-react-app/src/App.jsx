// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './Context/CartContext'; // Adjust path as needed

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";

// import Electronics from "./components/Electronics/Electronics";

// import Books from "./components/Book/Books";
// import Groceries from "./components/Grocery/Groceries";
// import Fashion from "./components/Fashion/Fashions";
// import Sports from "./components/Sports";
// import Mobiles from "./components/Mobile/Mobiles";
// import SportsDetail from "./components/SportsDetail";
// import BookDetail from "./components/Book/BookDetail";
// import MobileDetail from "./components/Mobile/MobileDetail";
// import ElectronicsDetail from "./components/Electronics/ElectronicDetail";
// import FashionDetail from "./components/Fashion/FashionDetail";
// import GroceryDetail from "./components/Grocery/GroceryDetail";
// import AllProductsPage from "./components/AllProducts/AllProducts";

// import CartPage from './components/CartPage'; // We will create this

// function App() {
//   return (
//     <Router>
//       <CartProvider> {/* Wrap your entire application with CartProvider */}
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Home />}></Route>

//          <Route path="/electronics" element={<Electronics />} />
//         <Route path="/fashion" element={<Fashion />} />
//         <Route path="/books" element={<Books />} />
//          <Route path="/groceries" element={<Groceries />} />
//          <Route path="/sports" element={<Sports />} />
//          <Route path="/mobiles" element={<Mobiles />} />
//          <Route path="/sports/:id" element={<SportsDetail />} />
//          <Route path="/books/:id" element={<BookDetail />} />
//          <Route path="/mobiles/:id" element={<MobileDetail />} />
//          <Route path="/electronics/:id" element={<ElectronicsDetail />} />
//          <Route path="/fashion/:id" element={<FashionDetail />} />
//          <Route path="/groceries/:id" element={<GroceryDetail />} />
//     <Route path="/products" element={<AllProductsPage />} />

//           <Route path="/cart" element={<CartPage />} /> {/* Your new cart page */}
//           {/* Add other routes as needed */}
//         </Routes>
//         <Footer/>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;

// src/App.js (or index.js)
















// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./Context/CartContext";
// import { WishlistProvider } from "./../src/Context/WishlistContext"; // Import WishlistProvider

// // Import your components
// import Electronics from "./components/Electronics/Electronics";
// import Footer from "./components/Footer"
// import Books from "./components/Book/Books";
// import Groceries from "./components/Grocery/Groceries";
// import Fashion from "./components/Fashion/Fashions";
// import Sports from "./components/Sports";
// import Mobiles from "./components/Mobile/Mobiles";
// import SportsDetail from "./components/SportsDetail";
// import BookDetail from "./components/Book/BookDetail";
// import MobileDetail from "./components/Mobile/MobileDetail";
// import ElectronicsDetail from "./components/Electronics/ElectronicDetail";
// import FashionDetail from "./components/Fashion/FashionDetail";
// import GroceryDetail from "./components/Grocery/GroceryDetail";
// import AllProductsPage from "./components/AllProducts/AllProducts";

// import Home from "./../src/pages/Home";
// import CartPage from "./components/CartPage"; // We will create this
// import WishlistPage from "./components/WishlistPage";
// import Navbar from "./components/Navbar";
// import CheckoutPage from "./pages/CheckoutPage";
// import OrderConfirmationPage from "./components/OrderConfirmationPage";
// import OrderSuccessPage from "./pages/OrderSuccessPage";
// import SignUp from "./components/User_Authentication/SignUp";
// import Login from "./components/User_Authentication/Login";


// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <WishlistProvider>
//           {" "}
          
//           <Navbar /> 
//           <Routes>
//             <Route path="/" element={<Home />}></Route>
//             <Route path="/electronics" element={<Electronics />} />
//             <Route path="/fashion" element={<Fashion />} />{" "}
//             <Route path="/books" element={<Books />} />{" "}
//             <Route path="/groceries" element={<Groceries />} />
//             <Route path="/sports" element={<Sports />} />
//             <Route path="/mobiles" element={<Mobiles />} />
//             <Route path="/sports/:id" element={<SportsDetail />} />
//             <Route path="/books/:id" element={<BookDetail />} />
//             <Route path="/mobiles/:id" element={<MobileDetail />} />{" "}
//             <Route path="/electronics/:id" element={<ElectronicsDetail />} />
//             <Route path="/fashion/:id" element={<FashionDetail />} />{" "}
//             <Route path="/groceries/:id" element={<GroceryDetail />} />
//             <Route path="/products" element={<AllProductsPage />} />
//             <Route path="/cart" element={<CartPage />} />{" "}
//              <Route path="/wishlist" element={<WishlistPage />} />
//              <Route path="/checkout" element={<CheckoutPage />} /> 
//              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
//         <Route path="/order-success" element={<OrderSuccessPage />} />
//       <Route path="/register" element={<SignUp />} />
//       <Route path="/login" element={<Login />} />
//           </Routes>
//         </WishlistProvider>
//         <Footer/>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext"; // Corrected import path based on typical project structure

// Import your components
import Electronics from "./components/Electronics/Electronics";
import Footer from "./components/Footer";
import Books from "./components/Book/Books";
import Groceries from "./components/Grocery/Groceries";
import Fashion from "./components/Fashion/Fashions";
import Sports from "./components/Sports";
import Mobiles from "./components/Mobile/Mobiles";
import SportsDetail from "./components/SportsDetail";
import BookDetail from "./components/Book/BookDetail";
import MobileDetail from "./components/Mobile/MobileDetail";
import ElectronicsDetail from "./components/Electronics/ElectronicDetail";
import FashionDetail from "./components/Fashion/FashionDetail";
import GroceryDetail from "./components/Grocery/GroceryDetail";
import AllProductsPage from "./components/AllProducts/AllProducts";

import Home from "./pages/Home"; // Assuming pages is in src
import CartPage from "./components/CartPage";
import WishlistPage from "./components/WishlistPage";
import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import SignUp from "./components/User_Authentication/SignUp";
import Login from "./components/User_Authentication/Login";
import PaymentPage from "./pages/PaymentPage";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";


function App() {
  return (
    <Router>
      {/* Providers should wrap the entire application or at least the parts that need their context */}
      <CartProvider>
        <WishlistProvider>
          {/* Navbar should be inside providers if it uses context (like cart/wishlist counts) */}
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/books" element={<Books />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/mobiles" element={<Mobiles />} />
            <Route path="/sports/:id" element={<SportsDetail />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/mobiles/:id" element={<MobileDetail />} />
            <Route path="/electronics/:id" element={<ElectronicsDetail />} />
            <Route path="/fashion/:id" element={<FashionDetail />} />
            <Route path="/groceries/:id" element={<GroceryDetail />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> 
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} /> 
         <Route path="/contact" element={<Contact />} /> 
         <Route path="/about" element={<About />} /> 
          </Routes>
          {/* Footer also typically needs to be inside the providers if it ever accesses context */}
          <Footer/>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;


