// src/components/WishlistPage.jsx
import React from 'react';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext'; // To move items to cart
import { Link } from 'react-router-dom';

function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const baseImageUrl = "http://localhost:3001/images/";

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    alert(`${item.item || item.product || item.title} moved to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Your wishlist is empty. Start adding some items!
        </p>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={clearWishlist}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
            >
              Clear Wishlist
            </button>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item._id || item.id}
                className="relative rounded-lg p-4 shadow-md bg-white border border-gray-200"
              >
                <Link to={`/${item.category ? item.category.toLowerCase() : 'products'}/${item._id || item.id}`}>
                    <img
                    src={
                        item.image?.startsWith("http")
                        ? item.image
                        : baseImageUrl + item.image
                    }
                    alt={item.item || item.product || item.title || "Wishlist item"}
                    className="w-full h-64 object-cover rounded-md mb-4 border border-gray-100"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                    />
                </Link>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {item.item || item.product || item.title || "Unnamed Item"}
                  </h2>
                  {item.author && ( // For books
                    <p className="text-gray-700 mb-2 italic">
                      {item.author}
                    </p>
                  )}
                  {item.description && ( // For groceries
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {item.description}
                    </p>
                  )}
                  <p className="text-gray-700 font-bold text-xl mb-2">
                    ₹{item.price ?? "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    Added on: {new Date(item.wishlistDate).toLocaleDateString()}
                  </p>
                  <div className="flex justify-center gap-2 mt-3">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WishlistPage;