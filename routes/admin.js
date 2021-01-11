const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.post('/', admin, async (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;