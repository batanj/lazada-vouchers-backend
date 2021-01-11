
const get = (key, error) => {
    if (!process.env[key])
        throw new Error(error);

    return process.env[key];
}

const configure = () => {
    get('LAZADAVOUCHERS_DB_URL', 'Database URL not set!');
    get('LAZADAVOUCHERS_ADMIN_KEY', 'Admin authorization key not set!');
}

exports.getDatabaseURL = get('LAZADAVOUCHERS_DB_URL', 'Database URL not set!');
exports.getAdminKey = get('LAZADAVOUCHERS_ADMIN_KEY', 'Admin authorization key not set!');
exports.configure = configure;