const _ = require('lodash');
const { Product, validateProduct } = require('../models/product');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.get('/id/:productId', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.productId });
        res.status(200).json(product);
    }
    catch (e) {
        res.status(400).json({ error: "An error occured." });
    }
});

router.get('/categoryId/:categoryId', async (req, res) => {
    try {
        const products = await Product.find({ categoryId: req.params.categoryId });
        res.status(200).json(products);
    }
    catch (e) {
        res.status(400).json({ error: "An error occured." });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).limit(parseInt(req.query.limit));
        res.status(200).json(products);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "An error occured." });
    }
});

router.post('/', [admin, validate(validateProduct)], async (req, res) => {
    try {
        const productExists = await Product.findOne(req.body);

        if (productExists)
            res.status(400).json({ error: "Product already exists in the database." });
        else {
            const product = new Product(_.pick(
                req.body,
                [
                    'parentCategoryId',
                    'categoryId',
                    'images',
                    'name',
                    'rating',
                    'discount',
                    'price',
                    'affiliateLink',
                    'details'
                ]
            ));
            await product.save();

            res.status(200).json(product);
        }
    } catch (e) {
        res.status(400).json({ error: "An error occured." });
    }

});

module.exports = router;