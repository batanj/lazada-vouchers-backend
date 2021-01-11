const Joi = require('joi');
require('joi-objectid');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: Number,
    discount: {
        type: Number,
        default: 10
    },
    price: {
        type: Number,
        required: true
    },
    affiliateLink: {
        type: String,
        required: true
    },
    details: String
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        categoryId: Joi.objectId().required().label('Category ID'),
        images: Joi.string().required().label('Images'),
        name: Joi.string().required().label('Name'),
        rating: Joi.number().label('Rating'),
        discount: Joi.number().label('Discount'),
        price: Joi.number().required().label('Price'),
        affiliateLink: Joi.string().required().label('Affiliate Link'),
        details: Joi.string().label('Details')
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;