// ../helpers/controllers.helpers.js


module.exports = {
    getURL: (req, key) => {
        let baseUrl = req.user.sub ? '/portfolios' : req.baseUrl;
        return req.protocol + '://' + req.get('host') + baseUrl + '/' + key.id;
    },

    getURLWithId: (req, id) => {
        return req.protocol + '://' + req.get('host') + req.baseUrl + '/' + id;
    }
};
