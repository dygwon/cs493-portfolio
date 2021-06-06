// ../controllers/stocks.controllers.js


const {
    STOCK,
    PAGELIMIT
} = require('../helpers/constants.helpers');
const Stock = require('../models/stocks.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createStock: async (req, res) => {
        const stock = Stock.fromReqBody(req.body);

        // generate key and save new stock
        let stockKey = await DatastoreHelpers.getEntityKey(STOCK);
        await DatastoreHelpers.createEntity(stockKey, stock);

        // generate reponse with DTO
        let URL = ControllerHelpers.getURL(req, stockKey);
        res.set("Content-Location", URL);
        res.status(201).json({
            id: stockKey.id,
            portfolios: stock.portfolios,
            ticker: stock.ticker,
            company: stock.company,
            ceo: stock.ceo,
            self: URL
        }).end();
    },

    getStock: async (req, res) => {
        try {

            // generate key and get stock info
            let stockId = parseInt(req.params.stockId, 10);
            const stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
            const stockData = await DatastoreHelpers.getEntity(stockKey);
            const stock = Stock.fromDatastore(stockData);

            // generate response with DTO
            let URL = ControllerHelpers.getURL(req, stockKey);
            res.status(200).json({
                id: stockKey.id,
                ticker: stock.ticker,
                company: stock.company,
                ceo: stock.ceo,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No stock with this id exists"
            }).end();
        }
    },

    listStocks: async (req, res) => {

        // create the query
        let query = DatastoreHelpers.createQuery(STOCK, PAGELIMIT);

        // check if this request is from a previous page
        if (Object.keys(req.query).includes("cursor")) {
            query = query.start(req.query.cursor);
        }

        // get data from datastore
        let queryResults = await DatastoreHelpers.runQuery(query);
        let stocks = queryResults.data;
        let info = queryResults.info;
        let response = {};

        // build the reponse
        stocks.forEach((stock) => {
            stock.id = DatastoreHelpers.getEntityId(stock);
            delete stock.portfolios;
            stock.self = ControllerHelpers.getURLWithId(req, stock.id);
        });
        response.stocks = stocks;

        // check if there are additional pages
        if (!DatastoreHelpers.noMoreResults(info)) {
            response.next = req.protocol + '://' + req.get('host') + req.baseUrl + '?cursor=' + info.endCursor;
        }

        res.status(200).json(response).end();
    },

    updateStock: async (req, res) => {
        try {

            // generate key and get stock info
            let stockId = parseInt(req.params.stockId, 10);
            const stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
            const stockData = await DatastoreHelpers.getEntity(stockKey);
            const stock = Stock.fromDatastore(stockData);

            // update stock data and save in datastore
            stock.ticker = req.body.ticker || stock.ticker;
            stock.company = req.body.company || stock.company;
            stock.ceo = req.body.ceo || stock.ceo;
            await DatastoreHelpers.updateEntity(stockKey, stock);

            // generate status and header based on HTTP method
            let URL = ControllerHelpers.getURL(req, stockKey);
            if (req.method == 'PUT') {
                res.set('Content-Location', URL);
                res.status(303);
            } else {
                res.status(200);
            }

            // send the response
            res.json({
                id: stockKey.id,
                ticker: stock.ticker,
                company: stock.company,
                ceo: stock.ceo,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No stock with this id exists"
            }).end();
        }
    },

    deleteStock: async (req, res) => {
        res.status(200).send("delete a stock").end();
    }
};