// ../../lib/middleware/secured.js


// saves the requested route of a user that isn't logged in
module.exports = function () {
    return function secured(req, res, next) {
        if (req.user) {
            return next();
        }

        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    };
};