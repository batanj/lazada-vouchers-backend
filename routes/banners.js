const _ = require('lodash');
const { Banner, validateBanner } = require('../models/banner');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

router.get('/location/:location', async (req, res) => {
    try {
        const banners = await Banner.find({ location: req.params.location });
        if (!banners)
            return res.status(404).json({ error: "Banners not found!" });

        return res.status(200).json(banners);
    }
    catch (e) {
        return res.status(400).json({ error: "An error occured." });
    }

});

router.post('/', [admin, validate(validateBanner)], async (req, res) => {
    try {
        const bannerExists = await Banner.findOne(req.body);
        if (bannerExists)
            res.status(400).json({ error: "Banner already exists in the database." });
        else {
            const banner = new Banner(_.pick(
                req.body,
                [
                    'location',
                    'image',
                    'title',
                    'description',
                    'affiliateLink'
                ]
            ));
            await banner.save();

            res.status(200).json(banner);
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ error: "An error occured." });
    }
});

module.exports = router;