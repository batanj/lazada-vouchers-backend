
module.exports = (validator) => {
    return (res, req, next) => {
        const { error } = validator(req.body);

        if (error)
            return res.status(400).json({ error: error.details[0].message });

        next();
    }
}