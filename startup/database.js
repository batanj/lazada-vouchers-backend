const config = require('./config');
const mongoose = require('mongoose');

module.exports = function () {
    const uri = config.getDatabaseURL;
    return mongoose.connect(
        uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    )
        .then(() => console.log("Connected to MongoDB..."))
        .catch(error => console.error("Error:", error));
}