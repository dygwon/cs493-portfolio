// ../controllers/stocks.controllers.js


const { STOCK, PAGELIMIT } = require('../helpers/constants.helpers');
const Stock = require('../models/stocks.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createStock: async (req, res) => {
        const stock = Stock.fromReqBody(req.body);

        // generate key and save new investor
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
            self: URL
        }).end();
    },

    getStock: async (req, res) => {
        try {

            // generate key and get investor info
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
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No stock with this id exists"
            }).end();
        }
    },

    listStocks: async (req, res) => {
        res.status(200).send("list stocks").end();
    },

    putStock: async (req, res) => {
        res.status(200).send("update a stock (put)").end();
    },

    patchStock: async (req, res) => {
        res.status(200).send("update a stock (patch)").end();
    },

    deleteStock: async (req, res) => {
        res.status(200).send("delete a stock").end();
    }
};
