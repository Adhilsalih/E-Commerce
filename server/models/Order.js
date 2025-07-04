// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   cartItems: Array,
//   shippingInfo: Object,
//   totalPrice: Number,
//   deliveryOption: String,
//   grandTotal: Number,
//   paymentMethod: String,
//   status: { type: String, default: 'Pending' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', OrderSchema);




const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model, if applicable
        required: false // Make true if every order must be linked to a user
    },
    cartItems: [
        {
            _id: { type: String, required: true }, // Or ObjectId if coming from actual product IDs
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String } // Optional
        }
    ],
    shippingInfo: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    deliveryOption: {
        type: String,
        enum: ['standard', 'express'],
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'COD'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    razorpayPaymentId: {
        type: String,
        required: function() { return this.paymentMethod === 'Card'; } // Required only for card payments
    },
    razorpayOrderId: {
        type: String,
        required: function() { return this.paymentMethod === 'Card'; }
    },
    razorpaySignature: {
        type: String,
        required: function() { return this.paymentMethod === 'Card'; }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);