// ../controllers/crypto.controllers.js


const {
    CRYPTO, PAGELIMIT
} = require('../helpers/constants.helpers');
const Crypto = require('../models/cryptos.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createCrypto: async (req, res) => {
        const crypto = Crypto.fromReqBody(req.body);

        // generate key and save new crypto
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
        try {

            // generate key and get crypto info
            let cryptoId = parseInt(req.params.cryptoId, 10);
            const cryptoKey = await DatastoreHelpers.getKey(CRYPTO, cryptoId);
            const cryptoData = await DatastoreHelpers.getEntity(cryptoKey);
            const crypto = Crypto.fromDatastore(cryptoData);

            // generate response with DTO
            let URL = ControllerHelpers.getURL(req, cryptoKey);
            res.status(200).json({
                id: cryptoKey.id,
                ticker: crypto.ticker,
                name: crypto.name,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No crypto with this id exists"
            }).end();
        }
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