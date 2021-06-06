// ../controllers/crypto.controllers.js


const {
    CRYPTO,
    PAGELIMIT
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
            supply: crypto.supply,
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
                supply: crypto.supply,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No crypto with this id exists"
            }).end();
        }
    },

    listCryptos: async (req, res) => {

        // create the query
        let query = DatastoreHelpers.createQuery(CRYPTO, PAGELIMIT);

        // check if this request is from a previous page
        if (Object.keys(req.query).includes("cursor")) {
            query = query.start(req.query.cursor);
        }

        // get data from datastore
        let queryResults = await DatastoreHelpers.runQuery(query);
        let cryptos = queryResults.data;
        let info = queryResults.info;
        let response = {};

        // build the reponse
        cryptos.forEach((crypto) => {
            crypto.id = DatastoreHelpers.getEntityId(crypto);
            delete crypto.portfolios;
            crypto.self = ControllerHelpers.getURLWithId(req, crypto.id);
        });
        response.cryptos = cryptos;

        // check if there are additional pages
        if (!DatastoreHelpers.noMoreResults(info)) {
            response.next = req.protocol + '://' + req.get('host') + req.baseUrl + '?cursor=' + info.endCursor;
        }

        res.status(200).json(response).end();
    },

    updateCrypto: async (req, res) => {
        try {

            // generate key and get crypto info
            let cryptoId = parseInt(req.params.cryptoId, 10);
            const cryptoKey = await DatastoreHelpers.getKey(CRYPTO, cryptoId);
            const cryptoData = await DatastoreHelpers.getEntity(cryptoKey);
            const crypto = Crypto.fromDatastore(cryptoData);

            // update crypto data and save in datastore
            crypto.ticker = req.body.ticker || crypto.ticker;
            crypto.name = req.body.name || crypto.name;
            crypto.supply = req.body.supply || crypto.supply;
            await DatastoreHelpers.updateEntity(cryptoKey, crypto);

            // generate status and header based on HTTP method
            let URL = ControllerHelpers.getURL(req, cryptoKey);
            if (req.method == 'PUT') {
                res.set('Content-Location', URL);
                res.status(303);
            } else {
                res.status(200);
            }

            // send the response
            res.json({
                id: cryptoKey.id,
                ticker: crypto.ticker,
                name: crypto.name,
                supply: crypto.supply,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No crypto with this id exists"
            }).end();
        }
    },

    deleteCrypto: async (req, res) => {
        res.status(200).send("delete a cryptocurrency").end();
    }
};