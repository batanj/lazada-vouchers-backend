const config = require('../startup/config');

module.exports = function (res, req, next) {
    const adminKey = req.header('x-admin-key');
    if (!adminKey) return res.status(401).json({ error: 'Access denied.' });

    if (adminKey === config.getAdminKey) {
        req.isAdmin = true;
    }

    next();
}