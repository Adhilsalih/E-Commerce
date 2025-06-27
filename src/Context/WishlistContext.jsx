// // src/Context/WishlistContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const WishlistContext = createContext();

// export const useWishlist = () => {
//   return useContext(WishlistContext);
// };

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState(() => {
//     // Load wishlist from local storage on initial load
//     const savedWishlist = localStorage.getItem('wishlist');
//     return savedWishlist ? JSON.parse(savedWishlist) : [];
//   });

//   // Save wishlist to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (item) => {
//     setWishlist((prevWishlist) => {
//       // Check if item already exists in wishlist
//       const isItemInWishlist = prevWishlist.some((wishlistItem) => wishlistItem._id === item._id);
//       if (isItemInWishlist) {
//         return prevWishlist; // Don't add if it's already there
//       }
//       return [...prevWishlist, { ...item, wishlistDate: new Date().toISOString() }];
//     });
//   };

//   const removeFromWishlist = (itemId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.filter((item) => item._id !== itemId)
//     );
//   };

//   const clearWishlist = () => {
//     setWishlist([]);
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };




















// import React, { createContext, useContext, useState, useEffect } from 'react';

// const WishlistContext = createContext();

// export const useWishlist = () => {
//   return useContext(WishlistContext);
// };

// export const WishlistProvider = ({ children }) => {
//   const [wishlistItems, setWishlistItems] = useState(() => {
//     // Initialize from localStorage if available
//     try {
//       const storedItems = localStorage.getItem('wishlistItems');
//       return storedItems ? JSON.parse(storedItems) : [];
//     } catch (error) {
//       console.error("Failed to parse wishlist from localStorage", error);
//       return [];
//     }
//   });

//   // Save wishlist items to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
//   }, [wishlistItems]);

//   const addToWishlist = (item) => {
//     setWishlistItems((prevItems) => {
//       // Check if the item is already in the wishlist
//       const isItemInWishlist = prevItems.find((wishlistItem) => wishlistItem.id === item.id);

//       if (isItemInWishlist) {
//         return prevItems; // If already exists, don't add again
//       } else {
//         return [...prevItems, { ...item }]; // Add new item
//       }
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const clearWishlist = () => {
//     setWishlistItems([]);
//   };

//   const getWishlistItemCount = () => {
//     return wishlistItems.length;
//   };

//   const isItemInWishlist = (id) => {
//     return wishlistItems.some(item => item.id === id);
//   };

//   const value = {
//     wishlistItems,
//     addToWishlist,
//     removeFromWishlist,
//     clearWishlist,
//     getWishlistItemCount,
//     isItemInWishlist,
//   };

//   return (
//     <WishlistContext.Provider value={value}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };



// src/Context/WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Wishlist Context
const WishlistContext = createContext();

// Custom hook to use the Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  // Throw an error if useWishlist is used outside of a WishlistProvider.
  // This helps debug if the provider is missing.
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// Wishlist Provider component
export const WishlistProvider = ({ children }) => {
  // Initialize wishlist state from localStorage.
  // This function runs only once on initial render.
  // IMPORTANT: It ensures 'wishlist' is always an array, even if localStorage is empty or parsing fails.
  const [wishlist, setWishlist] = useState(() => {
    try {
      const localWishlist = localStorage.getItem('wishlist');
      // If localWishlist exists, parse it; otherwise, return an empty array.
      return localWishlist ? JSON.parse(localWishlist) : [];
    } catch (error) {
      // Log any parsing errors and return an empty array to prevent 'undefined.length' errors.
      console.error("Failed to parse wishlist from localStorage:", error);
      return []; // **THIS IS CRUCIAL FOR PREVENTING 'undefined.length'**
    }
  });

  // Effect to save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]); // Dependency array: this effect runs when 'wishlist' state changes

  // Function to add an item to the wishlist
  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      // Check if the item already exists in the wishlist by its _id to avoid duplicates
      if (!prevWishlist.some((wishlistItem) => wishlistItem._id === item._id)) {
        // Add the item with a new 'wishlistDate' property (current ISO string date)
        return [...prevWishlist, { ...item, wishlistDate: new Date().toISOString() }];
      }
      return prevWishlist; // If item already exists, return previous state unchanged
    });
  };

  // Function to remove an item from the wishlist by its _id
  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
  };

  // Function to clear all items from the wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Function to get the current count of items in the wishlist
  const getWishlistItemCount = () => {
    return wishlist.length;
  };

  // The value object that will be provided to all consumers of this context
  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    getWishlistItemCount,
  };

  // Render the provider with the value and its children
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
