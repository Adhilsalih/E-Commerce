
//correct------------------------------------------
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const BookModel = require('./models/Books');
// const SportModel = require('./models/Sports');
// const GroceryModel = require('./models/Groceries');
// const MobileModel = require('./models/Mobiles');
// const ProductModel = require('./models/Products');
// const FashionModel = require('./models/Fashions');
// const UserModel = require('./models/User');
// const Order = require('./models/Order');
// const Enquiry = require('./models/Enquiry');
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect("mongodb+srv://praveenmt700:9747942714pmt%23@cluster0.wubuta2.mongodb.net/")
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // JWT Secret - Replace with a strong, complex secret in a .env file for production
// const JWT_SECRET = 'your_jwt_secret_key'; // **IMPORTANT: Use environment variables for this in production!**

// // --- User Authentication Routes ---

// // Register User
// app.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Check if user already exists with email
//         let user = await UserModel.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists with this email' });
//         }

//         // Check if username already taken
//         user = await UserModel.findOne({ username });
//         if (user) {
//             return res.status(400).json({ message: 'Username already taken' });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         user = await UserModel.create({
//             username,
//             email,
//             password: hashedPassword
//         });

//         // Generate JWT
//         const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
//             expiresIn: '1h' // Token expires in 1 hour
//         });

//         res.status(201).json({ message: 'Registration successful', token, user: { id: user._id, username: user.username, email: user.email } });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Login User
// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Validate password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT
//         const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
//             expiresIn: '1h' // Token expires in 1 hour
//         });

//         res.json({ message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email } });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // --- Middleware for protecting routes ---
// const auth = (req, res, next) => {
//     // Get token from header
//     const token = req.header('x-auth-token');

//     // Check if not token
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     // Verify token
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded; // Add user payload to request
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// // Example of a protected route (e.g., getting user profile)
// app.get('/api/auth/user', auth, async (req, res) => {
//     try {
//         // req.user is available from the 'auth' middleware
//         const user = await UserModel.findById(req.user.id).select('-password'); // Exclude password
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // --- Product/Category Routes ---

// // Books
// app.get('/books', (req, res) => {
//     BookModel.find({})
//         .then(books => res.json(books))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single book by ID (consolidated from /books/getBook/:id)
// app.get('/books/:id', (req, res) => {
//     const id = req.params.id;
//     BookModel.findById(id)
//         .then(book => {
//             if (!book) return res.status(404).json({ message: "Book not found" });
//             res.json(book);
//         })
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.put('/books/updateBook/:id', (req, res) => {
//     const id = req.params.id;
//     BookModel.findByIdAndUpdate(id, {
//         book: req.body.book,
//         price: req.body.price,
//         author: req.body.author,
//         image: req.body.image,
//     }, { new: true })
//         .then(updatedBook => res.json(updatedBook))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/books/deleteBook/:id', (req, res) => {
//     const id = req.params.id;
//     BookModel.findByIdAndDelete(id)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.post('/books/createBook', (req, res) => {
//     BookModel.create({
//         book: req.body.book,
//         price: req.body.price,
//         author: req.body.author,
//         image: req.body.image,
//     })
//         .then(newBook => res.status(201).json(newBook))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Products
// app.get('/products', (req, res) => {
//     ProductModel.find({})
//         .then(products => res.json(products))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single product by ID (consolidated from /products/getProduct/:id)
// app.get('/products/:id', async (req, res) => {
//     try {
//         const product = await ProductModel.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.json(product);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.post('/product/createProduct', (req, res) => {
//     ProductModel.create({
//         product: req.body.product,
//         price: req.body.price,
//         brand: req.body.brand,
//         image: req.body.image
//     })
//         .then(product => res.status(201).json(product))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.put('/products/updateProduct/:id', (req, res) => {
//     const id = req.params.id;
//     ProductModel.findByIdAndUpdate(
//         id,
//         {
//             product: req.body.product,
//             price: req.body.price,
//             brand: req.body.brand,
//             image: req.body.image
//         },
//         { new: true }
//     )
//         .then(product => res.json(product))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/products/deleteProduct/:id', (req, res) => {
//     const id = req.params.id;
//     ProductModel.findByIdAndDelete(id)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ message: err.message }));
// });



// // Get all mobiles
// app.get('/mobiles', (req, res) => {
//   MobileModel.find({})
//     .then(mobiles => res.json(mobiles))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get single mobile
// app.get('/mobiles/:id', (req, res) => {
//   MobileModel.findById(req.params.id)
//     .then(mobile => {
//       if (!mobile) return res.status(404).json({ message: 'Not found' });
//       res.json(mobile);
//     })
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Create a new mobile
// app.post('/mobiles/createMobile', (req, res) => {
//   const { model, price, brand, image } = req.body;
//   MobileModel.create({ model, price, brand, image })
//     .then(mobile => res.status(201).json(mobile))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Update a mobile
// app.put('/mobiles/UpdateMobile/:id', (req, res) => {
//   const { model, price, brand, image } = req.body;
//   MobileModel.findByIdAndUpdate(
//     req.params.id,
//     { model, price, brand, image },
//     { new: true }
//   )
//     .then(mobile => res.json(mobile))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Delete a mobile
// app.delete('/mobiles/DeleteMobile/:id', (req, res) => {
//   MobileModel.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ message: 'Mobile deleted' }))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Groceries
// app.get('/groceries', (req, res) => {
//     GroceryModel.find({})
//         .then(groceries => res.json(groceries))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single grocery by ID (consolidated from /groceries/getGrocery/:id)
// app.get('/groceries/:id', async (req, res) => {
//     try {
//         const grocery = await GroceryModel.findById(req.params.id);
//         if (!grocery) {
//             return res.status(404).json({ message: "Cannot find grocery item" });
//         }
//         res.json(grocery);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });

// app.post('/groceries/createGrocery', (req, res) => {
//     GroceryModel.create(req.body)
//         .then(grocery => res.status(201).json(grocery))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.put('/groceries/updateGrocery/:id', (req, res) => {
//     const id = req.params.id;
//     GroceryModel.findByIdAndUpdate(
//         id,
//         {
//             item: req.body.item,
//             price: req.body.price,
//             quantity: req.body.quantity,
//             image: req.body.image,
//         },
//         { new: true }
//     )
//         .then(grocery => res.json(grocery))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/groceries/deleteGrocery/:id', (req, res) => {
//     const id = req.params.id;
//     GroceryModel.findByIdAndDelete(id)
//         .then(result => res.json({ message: 'Deleted successfully', result }))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Sports
// app.get('/sports', (req, res) => {
//     SportModel.find({})
//         .then(sports => res.json(sports))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single sport by ID (consolidated from /sports/getSport/:id)
// app.get('/sports/:id', async (req, res) => {
//     try {
//         const sport = await SportModel.findById(req.params.id);
//         if (!sport) return res.status(404).json({ message: "Not found" });
//         res.json(sport);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.put('/sports/UpdateSport/:id', (req, res) => {
//     const id = req.params.id;
//     SportModel.findByIdAndUpdate(
//         id,
//         {
//             item: req.body.item,
//             price: req.body.price,
//             brand: req.body.brand,
//             image: req.body.image,
//         }, { new: true }
//     )
//         .then(sports => res.json(sports))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/sports/DeleteSport/:id', (req, res) => {
//     const id = req.params.id;
//     SportModel.findByIdAndDelete(id)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.post("/sports/createSport", (req, res) => {
//     SportModel.create(req.body)
//         .then(sports => res.status(201).json(sports))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Fashions
// app.get('/fashions', (req, res) => {
//     FashionModel.find({})
//         .then(fashions => res.json(fashions))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single fashion item by ID (consolidated from /fashions/getFashion/:id)
// app.get('/fashions/:id', async (req, res) => {
//     try {
//         const item = await FashionModel.findById(req.params.id);
//         if (!item) return res.status(404).json({ message: "Item not found" });
//         res.json(item);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.put('/fashions/UpdateFashion/:id', (req, res) => {
//     const id = req.params.id;
//     FashionModel.findByIdAndUpdate(id,
//         {
//             item: req.body.item,
//             price: req.body.price,
//             quantity: req.body.quantity,
//             image: req.body.image
//         }, { new: true }
//     )
//         .then(fashions => res.json(fashions))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/fashions/DeleteFashion/:id', (req, res) => {
//     const id = req.params.id;
//     FashionModel.findByIdAndDelete(id)
//         .then(result => res.json(result)) // Changed res to result
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.post("/fashions/createFashion", (req, res) => {
//     FashionModel.create(req.body)
//         .then(fashions => res.status(201).json(fashions))
//         .catch(err => res.status(500).json({ message: err.message }));
// });







// app.post('/api/orders', async (req, res) => {
//   try {
//     const newOrder = new Order(req.body); // assumes req.body has all order details
//     await newOrder.save();
//     res.status(201).json({ message: 'Order saved successfully', order: newOrder });
//   } catch (err) {
//     console.error('Error saving order:', err);
//     res.status(500).json({ message: 'Failed to save order' });
//   }
// });


// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await Order.find({});
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch orders' });
//   }
// });













// app.listen(3001, () => {
//     console.log("Server is Running on port 3001");
// });





















































































// //------CURRENTLY USING-------------------------------------------------------------------------------------------------
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Razorpay = require('razorpay');

// const BookModel = require('./models/Books');
// const SportModel = require('./models/Sports');
// const GroceryModel = require('./models/Groceries');
// const MobileModel = require('./models/Mobiles');
// const ProductModel = require('./models/Products');
// const FashionModel = require('./models/Fashions');
// const UserModel = require('./models/User');
// const Order = require('./models/Order');
// const ContactModel = require('./models/Contact');
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect("mongodb+srv://praveenmt700:9747942714pmt%23@cluster0.wubuta2.mongodb.net/")
//     .then(() => console.log('✅ MongoDB connected'))
//     .catch(err => console.error('❌ MongoDB connection error:', err));

// // JWT Secret (Use .env file in production)
// const JWT_SECRET = 'your_jwt_secret_key';

// // Razorpay instance
// const razorpay = new Razorpay({
//     key_id: 'rzp_test_GVYWevshkRSggl',
//     key_secret: '4rHSLxXHBOXDJfBXkfnzqJZv',
// });

// // ------------------------- AUTH ROUTES -------------------------

// app.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         if (await UserModel.findOne({ email })) {
//             return res.status(400).json({ message: 'User already exists with this email' });
//         }

//         if (await UserModel.findOne({ username })) {
//             return res.status(400).json({ message: 'Username already taken' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await UserModel.create({ username, email, password: hashedPassword });

//         const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({
//             message: 'Registration successful',
//             token,
//             user: { id: user._id, username, email }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

//         res.json({
//             message: 'Login successful',
//             token,
//             user: { id: user._id, username: user.username, email: user.email }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// const auth = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// app.get('/api/auth/user', auth, async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user.id).select('-password');
//         res.json(user);
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// });

// // ------------------------- RAZORPAY PAYMENT ROUTE -------------------------

// app.post('/api/create-razorpay-order', async (req, res) => {
//     try {
//         let { amount, currency, receipt } = req.body;

//         // Validate amount
//         if (!amount || isNaN(amount)) {
//             return res.status(400).json({ message: 'Invalid or missing amount' });
//         }

//         const options = {
//             amount: Math.round(amount * 100), // Convert to paise
//             currency: currency || 'INR',
//             receipt: receipt || `receipt_${Date.now()}`
//         };

//         console.log("🧾 Creating Razorpay Order with options:", options);

//         const order = await razorpay.orders.create(options);

//         res.status(200).json(order);
//     } catch (error) {
//         console.error('❌ Razorpay order error:', error);
//         res.status(500).json({ message: 'Failed to create Razorpay order' });
//     }
// });

// // ------------------------- ORDER ROUTES -------------------------

// app.post('/api/orders', async (req, res) => {
//     try {
//         const newOrder = new Order(req.body);
//         await newOrder.save();
//         res.status(201).json({ message: 'Order saved successfully', order: newOrder });
//     } catch (err) {
//         console.error('Error saving order:', err);
//         res.status(500).json({ message: 'Failed to save order' });
//     }
// });

// app.get('/api/orders', async (req, res) => {
//     try {
//         const orders = await Order.find({});
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch orders' });
//     }
// });

// // ------------------------- CATEGORY ROUTES (Books, Products, Mobiles, etc.) -------------------------



// // Books
// app.get('/books', (req, res) => {
//     BookModel.find({})
//         .then(books => res.json(books))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single book by ID (consolidated from /books/getBook/:id)
// app.get('/books/:id', (req, res) => {
//     const id = req.params.id;
//     BookModel.findById(id)
//         .then(book => {
//             if (!book) return res.status(404).json({ message: "Book not found" });
//             res.json(book);
//         })
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.put('/books/updateBook/:id', (req, res) => {
//     const id = req.params.id;
//     BookModel.findByIdAndUpdate(id, {
//         book: req.body.book,
//         price: req.body.price,
//         author: req.body.author,
//         image: req.body.image,
//     }, { new: true })
//         .then(updatedBook => res.json(updatedBook))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/books/deleteBook/:id', (req, res) => {
//     const id = req.params.id;
//     BookModel.findByIdAndDelete(id)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.post('/books/createBook', (req, res) => {
//     BookModel.create({
//         book: req.body.book,
//         price: req.body.price,
//         author: req.body.author,
//         image: req.body.image,
//     })
//         .then(newBook => res.status(201).json(newBook))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Products
// app.get('/products', (req, res) => {
//     ProductModel.find({})
//         .then(products => res.json(products))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single product by ID (consolidated from /products/getProduct/:id)
// app.get('/products/:id', async (req, res) => {
//     try {
//         const product = await ProductModel.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.json(product);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.post('/product/createProduct', (req, res) => {
//     ProductModel.create({
//         product: req.body.product,
//         price: req.body.price,
//         brand: req.body.brand,
//         image: req.body.image
//     })
//         .then(product => res.status(201).json(product))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.put('/products/updateProduct/:id', (req, res) => {
//     const id = req.params.id;
//     ProductModel.findByIdAndUpdate(
//         id,
//         {
//             product: req.body.product,
//             price: req.body.price,
//             brand: req.body.brand,
//             image: req.body.image
//         },
//         { new: true }
//     )
//         .then(product => res.json(product))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/products/deleteProduct/:id', (req, res) => {
//     const id = req.params.id;
//     ProductModel.findByIdAndDelete(id)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ message: err.message }));
// });



// // Get all mobiles
// app.get('/mobiles', (req, res) => {
//   MobileModel.find({})
//     .then(mobiles => res.json(mobiles))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get single mobile
// app.get('/mobiles/:id', (req, res) => {
//   MobileModel.findById(req.params.id)
//     .then(mobile => {
//       if (!mobile) return res.status(404).json({ message: 'Not found' });
//       res.json(mobile);
//     })
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Create a new mobile
// app.post('/mobiles/createMobile', (req, res) => {
//   const { model, price, brand, image } = req.body;
//   MobileModel.create({ model, price, brand, image })
//     .then(mobile => res.status(201).json(mobile))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Update a mobile
// app.put('/mobiles/UpdateMobile/:id', (req, res) => {
//   const { model, price, brand, image } = req.body;
//   MobileModel.findByIdAndUpdate(
//     req.params.id,
//     { model, price, brand, image },
//     { new: true }
//   )
//     .then(mobile => res.json(mobile))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Delete a mobile
// app.delete('/mobiles/DeleteMobile/:id', (req, res) => {
//   MobileModel.findByIdAndDelete(req.params.id)
//     .then(() => res.json({ message: 'Mobile deleted' }))
//     .catch(err => res.status(500).json({ message: err.message }));
// });

// // Groceries
// app.get('/groceries', (req, res) => {
//     GroceryModel.find({})
//         .then(groceries => res.json(groceries))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single grocery by ID (consolidated from /groceries/getGrocery/:id)
// app.get('/groceries/:id', async (req, res) => {
//     try {
//         const grocery = await GroceryModel.findById(req.params.id);
//         if (!grocery) {
//             return res.status(404).json({ message: "Cannot find grocery item" });
//         }
//         res.json(grocery);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });

// app.post('/groceries/createGrocery', (req, res) => {
//     GroceryModel.create(req.body)
//         .then(grocery => res.status(201).json(grocery))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.put('/groceries/updateGrocery/:id', (req, res) => {
//     const id = req.params.id;
//     GroceryModel.findByIdAndUpdate(
//         id,
//         {
//             item: req.body.item,
//             price: req.body.price,
//             quantity: req.body.quantity,
//             image: req.body.image,
//         },
//         { new: true }
//     )
//         .then(grocery => res.json(grocery))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/groceries/deleteGrocery/:id', (req, res) => {
//     const id = req.params.id;
//     GroceryModel.findByIdAndDelete(id)
//         .then(result => res.json({ message: 'Deleted successfully', result }))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Sports
// app.get('/sports', (req, res) => {
//     SportModel.find({})
//         .then(sports => res.json(sports))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single sport by ID (consolidated from /sports/getSport/:id)
// app.get('/sports/:id', async (req, res) => {
//     try {
//         const sport = await SportModel.findById(req.params.id);
//         if (!sport) return res.status(404).json({ message: "Not found" });
//         res.json(sport);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.put('/sports/UpdateSport/:id', (req, res) => {
//     const id = req.params.id;
//     SportModel.findByIdAndUpdate(
//         id,
//         {
//             item: req.body.item,
//             price: req.body.price,
//             brand: req.body.brand,
//             image: req.body.image,
//         }, { new: true }
//     )
//         .then(sports => res.json(sports))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/sports/DeleteSport/:id', (req, res) => {
//     const id = req.params.id;
//     SportModel.findByIdAndDelete(id)
//         .then(result => res.json(result))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.post("/sports/createSport", (req, res) => {
//     SportModel.create(req.body)
//         .then(sports => res.status(201).json(sports))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Fashions
// app.get('/fashions', (req, res) => {
//     FashionModel.find({})
//         .then(fashions => res.json(fashions))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Get a single fashion item by ID (consolidated from /fashions/getFashion/:id)
// app.get('/fashions/:id', async (req, res) => {
//     try {
//         const item = await FashionModel.findById(req.params.id);
//         if (!item) return res.status(404).json({ message: "Item not found" });
//         res.json(item);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.put('/fashions/UpdateFashion/:id', (req, res) => {
//     const id = req.params.id;
//     FashionModel.findByIdAndUpdate(id,
//         {
//             item: req.body.item,
//             price: req.body.price,
//             quantity: req.body.quantity,
//             image: req.body.image
//         }, { new: true }
//     )
//         .then(fashions => res.json(fashions))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.delete('/fashions/DeleteFashion/:id', (req, res) => {
//     const id = req.params.id;
//     FashionModel.findByIdAndDelete(id)
//         .then(result => res.json(result)) // Changed res to result
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// app.post("/fashions/createFashion", (req, res) => {
//     FashionModel.create(req.body)
//         .then(fashions => res.status(201).json(fashions))
//         .catch(err => res.status(500).json({ message: err.message }));
// });

// // Submit contact form 01
// app.post('/api/contact', async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;
    
//     // Basic validation
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newContact = new ContactModel({
//       name,
//       email,
//       subject,
//       message
//     });

//     await newContact.save();
//     res.status(201).json({ message: 'Thank you for contacting us! We will get back to you soon.' });
//   } catch (err) {
//     console.error('Error saving contact:', err);
//     res.status(500).json({ message: 'Failed to submit contact form' });
//   }
// });

// //02
// // POST: Receive new contact message
// app.post('/api/contact', (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   const newMessage = {
//     id: Date.now(),
//     name,
//     email,
//     subject,
//     message,
//     createdAt: new Date(),
//   };

//   contactMessages.push(newMessage);

//   res.status(200).json({ message: 'Your message has been sent successfully!' });
// });

// // GET: Return all contact messages
// app.get('/api/contact', (req, res) => {
//   res.status(200).json(contactMessages);
// });




// // ------------------------- START SERVER -------------------------

// app.listen(3001, () => {
//     console.log("🚀 Server is running on http://localhost:3001");
// });
















const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');

// Import your Mongoose Models
const BookModel = require('./models/Books');
const SportModel = require('./models/Sports');
const GroceryModel = require('./models/Groceries');
const MobileModel = require('./models/Mobiles');
const ProductModel = require('./models/Products');
const FashionModel = require('./models/Fashions');
const UserModel = require('./models/User');
const Order = require('./models/Order'); // Your Order schema model
const ContactModel = require('./models/Contact'); // Your Contact schema model

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

// Serve static images (if your images are in a folder like 'images' in your root)
// app.use('/images', express.static('images')); // Uncomment if you serve images this way

// MongoDB Connection
mongoose.connect("mongodb+srv://CRUD:adhil123@crud.egn0vmh.mongodb.net/") // Replace with your actual MongoDB URI
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// JWT Secret (IMPORTANT: Use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_please_change_this_in_production';

// Razorpay instance
// CRITICAL FIX: Ensure these keys are from your Razorpay Dashboard (Test Mode for development)
// The key_id here MUST match the 'key' used in the frontend's Razorpay options.
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_GVYWevshkRSggl', // Your Razorpay Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET || '4rHSLxXHBOXDJfBXkfnzqJZv', // Your Razorpay Key Secret
});

// ------------------------- AUTH ROUTES -------------------------

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (await UserModel.findOne({ email })) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        if (await UserModel.findOne({ username })) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: { id: user._id, username, email }
        });
    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Middleware for JWT authentication
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

app.get('/api/auth/user', auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error('Auth User Error:', err.message);
        res.status(500).send('Server Error');
    }
});

// ------------------------- RAZORPAY PAYMENT ROUTE -------------------------

app.post('/api/create-razorpay-order', async (req, res) => {
    try {
        let { amount, currency, receipt } = req.body;

        // Basic validation for amount
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            console.error('Invalid or missing amount for Razorpay order:', amount);
            return res.status(400).json({ message: 'Invalid or missing amount for payment' });
        }

        // Razorpay expects the amount in the smallest currency unit (e.g., paise for INR)
        // Convert the amount (e.g., from Rupees) to paise
        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const options = {
            amount: amountInPaise,
            currency: currency || 'INR', // Default to INR if not provided
            receipt: receipt || `receipt_${Date.now()}` // Generate a unique receipt ID
        };

        console.log("🧾 Attempting to create Razorpay Order with options:", options);

        const order = await razorpay.orders.create(options);
        console.log("✅ Razorpay Order created successfully:", order);
        res.status(200).json(order);
    } catch (error) {
        console.error('❌ Razorpay order creation failed:', error.message);
        // Log the full error object for more details in development
        console.error('❌ Razorpay order creation detailed error:', error);
        res.status(500).json({ message: 'Failed to create Razorpay order', error: error.message });
    }
});

// ------------------------- ORDER ROUTES -------------------------

app.post('/api/orders', async (req, res) => {
    try {
        // You might want to add validation for the order data here
        const newOrder = new Order(req.body);
        await newOrder.save();
        console.log('✅ Order saved successfully:', newOrder._id);
        res.status(201).json({ message: 'Order saved successfully', order: newOrder });
    } catch (err) {
        console.error('❌ Error saving order:', err);
        res.status(500).json({ message: 'Failed to save order', error: err.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({}); // Fetch all orders
        res.json(orders);
    } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
});

// ------------------------- CATEGORY ROUTES (Books, Products, Mobiles, etc.) -------------------------

// --- Books Routes ---
app.get('/books', (req, res) => {
    BookModel.find({})
        .then(books => res.json(books))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    BookModel.findById(id)
        .then(book => {
            if (!book) return res.status(404).json({ message: "Book not found" });
            res.json(book);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

app.put('/books/updateBook/:id', (req, res) => {
    const id = req.params.id;
    BookModel.findByIdAndUpdate(id, {
        book: req.body.book,
        price: req.body.price,
        author: req.body.author,
        image: req.body.image,
    }, { new: true })
        .then(updatedBook => res.json(updatedBook))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/books/deleteBook/:id', (req, res) => {
    const id = req.params.id;
    BookModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.post('/books/createBook', (req, res) => {
    BookModel.create({
        book: req.body.book,
        price: req.body.price,
        author: req.body.author,
        image: req.body.image,
    })
        .then(newBook => res.status(201).json(newBook))
        .catch(err => res.status(500).json({ message: err.message }));
});

// --- Products Routes ---
app.get('/products', (req, res) => {
    ProductModel.find({})
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/product/createProduct', (req, res) => {
    ProductModel.create({
        product: req.body.product,
        price: req.body.price,
        brand: req.body.brand,
        image: req.body.image
    })
        .then(product => res.status(201).json(product))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.put('/products/updateProduct/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndUpdate(
        id,
        {
            product: req.body.product,
            price: req.body.price,
            brand: req.body.brand,
            image: req.body.image
        },
        { new: true }
    )
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/products/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
});

// --- Mobiles Routes ---
app.get('/mobiles', (req, res) => {
    MobileModel.find({})
        .then(mobiles => res.json(mobiles))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/mobiles/:id', (req, res) => {
    MobileModel.findById(req.params.id)
        .then(mobile => {
            if (!mobile) return res.status(404).json({ message: 'Not found' });
            res.json(mobile);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

app.post('/mobiles/createMobile', (req, res) => {
    const { model, price, brand, image } = req.body;
    MobileModel.create({ model, price, brand, image })
        .then(mobile => res.status(201).json(mobile))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.put('/mobiles/UpdateMobile/:id', (req, res) => {
    const { model, price, brand, image } = req.body;
    MobileModel.findByIdAndUpdate(
        req.params.id,
        { model, price, brand, image },
        { new: true }
    )
        .then(mobile => res.json(mobile))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/mobiles/DeleteMobile/:id', (req, res) => {
    MobileModel.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Mobile deleted' }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// --- Groceries Routes ---
app.get('/groceries', (req, res) => {
    GroceryModel.find({})
        .then(groceries => res.json(groceries))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/groceries/:id', async (req, res) => {
    try {
        const grocery = await GroceryModel.findById(req.params.id);
        if (!grocery) {
            return res.status(404).json({ message: "Cannot find grocery item" });
        }
        res.json(grocery);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.post('/groceries/createGrocery', (req, res) => {
    GroceryModel.create(req.body)
        .then(grocery => res.status(201).json(grocery))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.put('/groceries/updateGrocery/:id', (req, res) => {
    const id = req.params.id;
    GroceryModel.findByIdAndUpdate(
        id,
        {
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.body.image,
        },
        { new: true }
    )
        .then(grocery => res.json(grocery))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/groceries/deleteGrocery/:id', (req, res) => {
    const id = req.params.id;
    GroceryModel.findByIdAndDelete(id)
        .then(result => res.json({ message: 'Deleted successfully', result }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// --- Sports Routes ---
app.get('/sports', (req, res) => {
    SportModel.find({})
        .then(sports => res.json(sports))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/sports/:id', async (req, res) => {
    try {
        const sport = await SportModel.findById(req.params.id);
        if (!sport) return res.status(404).json({ message: "Not found" });
        res.json(sport);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/sports/UpdateSport/:id', (req, res) => {
    const id = req.params.id;
    SportModel.findByIdAndUpdate(
        id,
        {
            item: req.body.item,
            price: req.body.price,
            brand: req.body.brand,
            image: req.body.image,
        }, { new: true }
    )
        .then(sports => res.json(sports))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/sports/DeleteSport/:id', (req, res) => {
    const id = req.params.id;
    SportModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.post("/sports/createSport", (req, res) => {
    SportModel.create(req.body)
        .then(sports => res.status(201).json(sports))
        .catch(err => res.status(500).json({ message: err.message }));
});

// --- Fashions Routes ---
app.get('/fashions', (req, res) => {
    FashionModel.find({})
        .then(fashions => res.json(fashions))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/fashions/:id', async (req, res) => {
    try {
        const item = await FashionModel.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/fashions/UpdateFashion/:id', (req, res) => {
    const id = req.params.id;
    FashionModel.findByIdAndUpdate(id,
        {
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.body.image
        }, { new: true }
    )
        .then(fashions => res.json(fashions))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.delete('/fashions/DeleteFashion/:id', (req, res) => {
    const id = req.params.id;
    FashionModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ message: err.message }));
});

app.post("/fashions/createFashion", (req, res) => {
    FashionModel.create(req.body)
        .then(fashions => res.status(201).json(fashions))
        .catch(err => res.status(500).json({ message: err.message }));
});

// --- Contact Form Routes ---
// Note: You had two /api/contact POST routes. I've consolidated and kept the Mongoose one.
// The second one was an in-memory array which won't persist data.
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newContact = new ContactModel({
            name,
            email,
            subject,
            message
        });

        await newContact.save();
        res.status(201).json({ message: 'Thank you for contacting us! We will get back to you soon.' });
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ message: 'Failed to submit contact form', error: err.message });
    }
});

// GET: Return all contact messages (if you have an admin panel to view them)
app.get('/api/contact', async (req, res) => {
    try {
        const messages = await ContactModel.find({});
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error fetching contact messages:', err);
        res.status(500).json({ message: 'Failed to fetch contact messages', error: err.message });
    }
});


// ------------------------- START SERVER -------------------------

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});














































































































