const Joi = require('joi');
const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    affiliateLink: {
        type: String,
        required: true
    }
});

const Banner = mongoose.model('Banner', bannerSchema);

function validateBanner(banner) {
    const schema = Joi.object({
        location: Joi.string().required().label('Location'),
        image: Joi.string().required().label('Image'),
        title: Joi.string().required().label('Title'),
        description: Joi.string().label('Description'),
        affiliateLink: Joi.string().required().label('Affiliate Link')
    });

    return schema.validate(banner);
}

exports.Banner = Banner;
exports.validateBanner = validateBanner;