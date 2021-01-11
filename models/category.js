const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    parentId: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = Joi.object({
        parentId: Joi.objectId().label('Parent ID'),
        name: Joi.string().required().label('Name'),
        slug: Joi.string().required().label('Slug')
    });

    return schema.validate(category);
}

exports.Category = Category;
exports.validateCategory = validateCategory;