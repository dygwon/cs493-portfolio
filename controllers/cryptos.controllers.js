// ../controllers/crypto.controllers.js


const { CRYPTO } = require('../helpers/constants.helpers');
const Crypto = require('../models/cryptos.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createCrypto: async (req, res) => {
        res.status(200).send("creating a cryptocurrency").end();
    },

    getCrypto: async (req, res) => {
        res.status(200).send("getting specified cryptocurrency").end();
    },

    listCryptos: async (req, res) => {
        res.status(200).send("list cryptocurrencies").end();
    },

    putCrypto: async (req, res) => {
        res.status(200).send("update a cryptocurrency (put)").end();
    },

    patchCrypto: async (req, res) => {
        res.status(200).send("update a cryptocurrency (patch)").end();
    },

    deleteCrypto: async (req, res) => {
        res.status(200).send("delete a cryptocurrency").end();
    }
};
