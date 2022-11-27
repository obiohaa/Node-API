const mongoose = require('mongoose')

const apiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product must be required']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUES} is not supported'
        }
        
        // enum: ['ikea', 'liddy', 'caressa', 'marcos']
    }
})

module.exports = mongoose.model('product', apiSchema)