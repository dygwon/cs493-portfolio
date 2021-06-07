// ../helpers/controllers.helpers.js


module.exports = {
    getURL: (req, key) => {
        return req.protocol + '://' + req.get('host') + req.baseUrl + '/' + key.id;
    },

    getURLWithId: (req, id) => {
        return req.protocol + '://' + req.get('host') + req.baseUrl + '/' + id;
    },
};
