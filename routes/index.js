const express = require('express');

const index = express();

index.get('/', (req, res) => {
    res.status(200).send('.:?');
});

module.exports = index;