const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String,
    category: String,
    sold: Boolean,
    dateOfSale: Date
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;