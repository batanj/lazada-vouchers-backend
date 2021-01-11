const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const index = require('../routes/index');
const categories = require('../routes/categories');
const products = require('../routes/products');
const banners = require('../routes/banners');
const admin = require('../routes/admin');

module.exports = function (app, express) {
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.use('/', index);
    app.use('/categories', categories);
    app.use('/products', products);
    app.use('/banners', banners);
    app.use('/admin', admin);
};