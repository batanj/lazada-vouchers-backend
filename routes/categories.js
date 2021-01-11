const _ = require('lodash');
const { Category, validateCategory } = require('../models/category');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(404).json({ error: "No category found." });
    }
});

router.post('/', [admin, validate(validateCategory)], async (req, res) => {
    try {
        const categoryExists = await Category.findOne(req.body);

        if (categoryExists)
            res.status(400).json({ error: "Category already exists in the database." });
        else {
            const category = new Category(_.pick(
                req.body,
                [
                    'parentId',
                    'name',
                    'slug'
                ]
            ));
            await category.save();

            res.status(200).json(category);
        }
    }
    catch (e) {
        res.status(400).json({ error: "An error occured." });
    }
});

module.exports = router;