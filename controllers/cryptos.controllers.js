// ../controllers/crypto.controllers.js


const { CRYPTO } = require('../helpers/constants.helpers');
const Crypto = require('../models/cryptos.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createCrypto: async (req, res) => {
        const crypto = Crypto.fromReqBody(req.body);

        // generate key and save new investor
        let cryptoKey = await DatastoreHelpers.getEntityKey(CRYPTO);
        await DatastoreHelpers.createEntity(cryptoKey, crypto);

        // generate reponse with DTO
        let URL = ControllerHelpers.getURL(req, cryptoKey);
        res.set("Content-Location", URL);
        res.status(201).json({
            id: cryptoKey.id,
            portfolios: crypto.portfolios,
            ticker: crypto.ticker,
            name: crypto.name,
            self: URL
        }).end();
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
