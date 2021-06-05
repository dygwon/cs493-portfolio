// ../controllers/portfolios.controllers.js


/**
 * TODO
 * use 'cryptos' in model and documentation
 */


const { PORTFOLIO, STOCK, CRYPTO } = require('../helpers/constants.helpers');
const Portfolio = require('../models/portfolios.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createPortfolio: async (req, res) => {
        const portfolio = Portfolio.fromReqBody(req.body);

        // generate key and save new portfolio
        let portfolioKey = await DatastoreHelpers.getEntityKey(PORTFOLIO);
        await DatastoreHelpers.createEntity(portfolioKey, portfolio);

        // generate response with DTO
        let URL = ControllerHelpers.getURL(req, portfolioKey);
        res.set("Content-Location", URL);
        res.status(201).json({
            id: portfolioKey.id,
            owner: portfolio.owner,
            stocks: portfolio.stocks,
            cryptos: portfolio.cryptos,
            self: URL
        }).end();
    },

    getPortfolio: async (req, res) => {
        try {

            // generate key and get portfolio info
            let portfolioId = parseInt(req.params.portfolioId, 10);
            const portfolioKey = await DatastoreHelpers.getKey(PORTFOLIO, portfolioId);
            const portfolioData = await DatastoreHelpers.getEntity(portfolioKey);
            const portfolio = Portfolio.fromDatastore(portfolioData);

            // get stock names
            let stockIds = portfolio.stocks;
            let companies = [];
            for (let i = 0; i < stockIds.length; i++) {
                let stockKey = await DatastoreHelpers.getKey(STOCK, stockIds[i]);
                let stockData = await DatastoreHelpers.getEntity(stockKey);
                companies.push(stockData.company);
            }

            // get crypto names
            let cryptoIds = portfolio.cryptos;
            let cryptoNames = [];
            for (i = 0; i < cryptoIds.length; i++) {
                let cryptoKey = await DatastoreHelpers.getKey(CRYPTO, cryptoIds[i]);
                let cryptoData = await DatastoreHelpers.getEntity(cryptoKey);
                cryptoNames.push(cryptoData.name);
            }

            // generate response with DTO
            let URL = ControllerHelpers.getURL(req, portfolioKey);
            res.status(200).json({
                id: portfolioKey.id,
                owner: portfolio.owner,
                stocks: companies,
                cryptos: cryptoNames,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No portfolio with this id exists"
            }).end();
        }
    },

    listPortfolios: async (req, res) => {
        res.status(200).send("list portfolios").end();
    },

    putPortfolio: async (req, res) => {
        res.status(200).send("update a portfolio (put)").end();
    },

    patchPortfolio: async (req, res) => {
        res.status(200).send("update a portfolio (patch)").end();
    },

    deletePortfolio: async (req, res) => {
        res.status(200).send("delete a portfolio").end();
    },

    addStockToPortfolio: async (req, res) => {
        res.status(200).send("add stock to portfolio").end();
    },

    removeStockFromPortfolio: async (req, res) => {
        res.status(200).send("remove stock from portfolio").end();
    },

    addCryptoToPortfolio: async (req, res) => {
        res.status(200).send("add cryptocurrency to portfolio").end();
    },

    removeCryptoFromPortfolio: async (req, res) => {
        res.status(200).send("remove cryptocurrency from portfolio").end();
    }
};
