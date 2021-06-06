// ../controllers/portfolios.controllers.js


/**
 * TODO
 * use 'cryptos' in model and documentation
 */


const {
    PORTFOLIO,
    STOCK,
    CRYPTO,
    PAGELIMIT
} = require('../helpers/constants.helpers');
const Portfolio = require('../models/portfolios.models');
const Stock = require('../models/stocks.models');
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
            classification: portfolio.classification,
            yearStarted: portfolio.yearStarted,
            industryFocus: portfolio.industryFocus,
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

            // TODO verify portfolio with stocks and crypto responds correctly
            console.log(companies);
            console.log(cryptoNames);

            // generate response with DTO
            let URL = ControllerHelpers.getURL(req, portfolioKey);
            res.status(200).json({
                id: portfolioKey.id,
                owner: portfolio.owner,
                classification: portfolio.classification,
                yearStarted: portfolio.yearStarted,
                industryFocus: portfolio.industryFocus,
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

        // create the query
        let query = DatastoreHelpers.createQuery(PORTFOLIO, PAGELIMIT);

        // check if this request is from a previous page
        if (Object.keys(req.query).includes("cursor")) {
            query = query.start(req.query.cursor);
        }

        // get data from datastore
        let queryResults = await DatastoreHelpers.runQuery(query);
        let portfolios = queryResults.data;
        let info = queryResults.info;
        let response = {};

        // build the response
        portfolios.forEach((portfolio) => {
            portfolio.id = DatastoreHelpers.getEntityId(portfolio);

            // share only number of stocks and cryptos
            portfolio.numStocks = portfolio.stocks.length;
            portfolio.numCryptos = portfolio.cryptos.length;
            delete portfolio.stocks;
            delete portfolio.cryptos;

            // do not share owners
            delete portfolio.owner;

            portfolio.self = ControllerHelpers.getURLWithId(req, portfolio.id);
        });
        response.portfolios = portfolios;

        // check for additional pages
        if (!DatastoreHelpers.noMoreResults(info)) {
            response.next = req.protocol + '://' + req.get('host') + req.baseUrl + '?cursor=' + info.endCursor;
        }

        res.status(200).json(response).end();
    },

    updatePortfolio: async (req, res) => {
        try {

            // generate key and get portfolio info
            let portfolioId = parseInt(req.params.portfolioId, 10);
            const portfolioKey = await DatastoreHelpers.getKey(PORTFOLIO, portfolioId);
            const portfolioData = await DatastoreHelpers.getEntity(portfolioKey);
            const portfolio = Portfolio.fromDatastore(portfolioData);

            // update portfolio data and save in datastore
            portfolio.classification = req.body.classification || portfolio.classification;
            portfolio.yearStarted = req.body.yearStarted || portfolio.yearStarted;
            portfolio.industryFocus = req.body.industryFocus || portfolio.industryFocus;
            await DatastoreHelpers.updateEntity(portfolioKey, portfolio);

            // generate status and header based on HTTP method
            let URL = ControllerHelpers.getURL(req, portfolioKey);
            if (req.method == 'PUT') {
                res.set('Content-Location', URL);
                res.status(303);
            } else {
                res.status(200);
            }

            // send the response
            res.json({
                id: portfolioKey.id,
                classification: portfolio.classification,
                yearStarted: portfolio.yearStarted,
                industryFocus: portfolio.industryFocus,
                stocks: portfolio.stocks,
                cryptos: portfolio.cryptos,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No portfolio with this id exists"
            }).end();
        }
    },

    deletePortfolio: async (req, res) => {
        res.status(200).send("delete a portfolio").end();
    },

    addStockToPortfolio: async (req, res) => {
        try {
            let portfolioId = req.params.portfolioId;
            let stockId = req.params.stockId;
            portfolioId = parseInt(portfolioId, 10);
            stockId = parseInt(stockId, 10);

            // get portfolio data
            const portfolioKey = await DatastoreHelpers.getKey(PORTFOLIO, portfolioId);
            const portfolioData = await DatastoreHelpers.getEntity(portfolioKey);
            const portfolio = Portfolio.fromDatastore(portfolioData);

            // get stock data
            const stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
            const stockData = await DatastoreHelpers.getEntity(stockKey);
            const stock = Stock.fromDatastore(stockData);

            // check if the portfolio contains the stock
            if (portfolio.stocks.includes(stockId)) {
                throw "StockAlreadyInPortfolio";
            }

            // add the stock to the portfolio
            portfolio.stocks.push(stockId);
            await DatastoreHelpers.updateEntity(portfolioKey, portfolio);

            // add the portfolio to the stock
            stock.portfolios.push(portfolioId);
            await DatastoreHelpers.updateEntity(stockKey, stock);

            res.status(204).send().end();

        } catch (err) {
            if (err === "StockAlreadyInPortfolio") {
                res.status(403).json({
                    Error: "Not authenticated or stock already in portfolio"
                }).end();
            } else {
                res.status(404).json({
                    Error: "The specified portfolio and/or stock does not exist"
                }).end();
            }
        }
    },

    removeStockFromPortfolio: async (req, res) => {
        try {
            let portfolioId = req.params.portfolioId;
            let stockId = req.params.stockId;
            portfolioId = parseInt(portfolioId, 10);
            stockId = parseInt(stockId, 10);

            // get portfolio data
            const portfolioKey = await DatastoreHelpers.getKey(PORTFOLIO, portfolioId);
            const portfolioData = await DatastoreHelpers.getEntity(portfolioKey);
            const portfolio = Portfolio.fromDatastore(portfolioData);

            // get stock data
            const stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
            const stockData = await DatastoreHelpers.getEntity(stockKey);
            const stock = Stock.fromDatastore(stockData);

            // check if the portfolio contains the stock
            if (!portfolio.stocks.includes(stockId)) {
                throw "StockNotInPortfolio";
            }

            // remove the stock from the portfolio
            const stockIndex = portfolio.stocks.indexOf(stockId);
            if (stockIndex > -1) {
                portfolio.stocks.splice(stockIndex, 1);
            }
            await DatastoreHelpers.updateEntity(portfolioKey, portfolio);

            // remove the portfolio from the stock
            const portfolioIndex = stock.portfolios.indexOf(portfolioId);
            if (portfolioIndex > -1) {
                stock.portfolios.splice(portfolioIndex, 1);
            }
            await DatastoreHelpers.updateEntity(stockKey, stock);

            res.status(204).send().end();

        } catch (err) {
            if (err === "StockNotInPortfolio") {
                res.status(403).json({
                    Error: "Not authenticated or stock not in portfolio"
                }).end();
            } else {
                res.status(404).json({
                    Error: "The specified portfolio and/or stock does not exist"
                }).end();
            }
        }
    },

    addCryptoToPortfolio: async (req, res) => {
        res.status(200).send("add cryptocurrency to portfolio").end();
    },

    removeCryptoFromPortfolio: async (req, res) => {
        res.status(200).send("remove cryptocurrency from portfolio").end();
    }
};