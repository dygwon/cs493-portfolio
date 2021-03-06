// ../controllers/investors.controllers.js


/**
 * TODO
 * - immplement authentication
 * - remove portfolio id - only time ids/names show is when authenticated user is accessing
 *   portfolio
 * - make validation for incorrect id specific to ids for getInvestor
 */


const {
    INVESTOR,
    PORTFOLIO,
    STOCK,
    PAGELIMIT
} = require('../helpers/constants.helpers');
const Investor = require('../models/investors.models');
const Portfolio = require('../models/portfolios.models');
const Stock = require('../models/stocks.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createInvestor: async (req, res) => {
        const investor = Investor.fromReqBody(req.body);

        // generate key and save new investor
        let investorKey = await DatastoreHelpers.getEntityKey(INVESTOR);
        await DatastoreHelpers.createEntity(investorKey, investor);

        // generate reponse with DTO
        let URL = ControllerHelpers.getURL(req, investorKey);
        res.set("Content-Location", URL);
        res.status(201).json({
            id: investorKey.id,
            firstName: investor.firstName,
            lastName: investor.lastName,
            location: investor.location,
            bullish: investor.bullish,
            portfolio: investor.portfolio,
            self: URL
        }).end();
    },

    getInvestor: async (req, res) => {
        try {

            // generate key and get investor info
            let investorId = parseInt(req.params.investorId, 10);
            const investorKey = await DatastoreHelpers.getKey(INVESTOR, investorId);
            const investorData = await DatastoreHelpers.getEntity(investorKey);
            const investor = Investor.fromDatastore(investorData);

            // generate response with DTO
            let URL = ControllerHelpers.getURL(req, investorKey);
            res.status(200).json({
                id: investorKey.id,
                firstName: investor.firstName,
                lastName: investor.lastName,
                location: investor.location,
                bullish: investor.bullish,
                portfolio: investor.portfolio,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No investor with this id exists"
            }).end();
        }
    },

    listInvestors: async (req, res) => {

        // create the query
        let query = DatastoreHelpers.createQuery(INVESTOR, PAGELIMIT);

        // check if this request is from a previous page
        if (Object.keys(req.query).includes("cursor")) {
            query = query.start(req.query.cursor);
        }

        // get data from datastore
        let queryResults = await DatastoreHelpers.runQuery(query);
        let investors = queryResults.data;
        let info = queryResults.info;
        let response = {};

        // build the reponse
        investors.forEach((investor) => {
            investor.id = DatastoreHelpers.getEntityId(investor);
            delete investor.portfolio;
            investor.self = ControllerHelpers.getURLWithId(req, investor.id);
        });
        response.investors = investors;

        // check if there are additional pages
        if (!DatastoreHelpers.noMoreResults(info)) {
            response.next = req.protocol + '://' + req.get('host') + req.baseUrl + '?cursor=' + info.endCursor;
        }

        res.status(200).json(response).end();
    },

    updateInvestor: async (req, res) => {
        try {

            // generate key and get investor info
            let investorId = parseInt(req.params.investorId, 10);
            const investorKey = await DatastoreHelpers.getKey(INVESTOR, investorId);
            const investorData = await DatastoreHelpers.getEntity(investorKey);
            const investor = Investor.fromDatastore(investorData);

            // update investor data and save in datastore
            investor.firstName = req.body.firstName || investor.firstName;
            investor.lastName = req.body.lastName || investor.lastName;
            investor.location = req.body.location || investor.location;
            await DatastoreHelpers.updateEntity(investorKey, investor);

            // generate status and header based on HTTP method
            let URL = ControllerHelpers.getURL(req, investorKey);
            if (req.method == 'PUT') {
                res.set('Content-Location', URL);
                res.status(303);
            } else {
                res.status(200);
            }

            // send the reponse
            res.json({
                id: investorKey.id,
                firstName: investor.firstName,
                lastName: investor.lastName,
                location: investor.location,
                self: URL
            }).end();

        } catch (err) {
            res.status(404).json({
                Error: "No investor with this id exists"
            }).end();
        }
    },

    deleteInvestor: async (req, res) => {
        try {

            // get the investor's portfolio id
            let investorId = parseInt(req.params.investorId, 10);
            const investorKey = await DatastoreHelpers.getKey(INVESTOR, investorId);
            const investorData = await DatastoreHelpers.getEntity(investorKey);
            const investor = Investor.fromDatastore(investorData);

            // remove from stock
            if (investor.bullish !== null) {
                let stockId = investor.bullish;
                const stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
                const stockData = await DatastoreHelpers.getEntity(stockKey);
                const stock = Stock.fromDatastore(stockData);
                const investorIndex = stock.bulls.indexOf(investorId);
                if (investorIndex > -1) {
                    stock.bulls.splice(investorIndex, 1);
                }
                await DatastoreHelpers.updateEntity(stockKey, stock);
            }

            // TODO - add portfolios to investors
            // const portfolioId = investor.portfolio;

            // // remove the investor's information from the portfolio
            // const portfolioKey = DatastoreHelpers.getKey(PORTFOLIO, portfolioId);
            // const portfolioData = await DatastoreHelpers.getEntity(portfolioKey);
            // const portfolio = Portfolio.fromDatastore(portfolioData);
            // portfolio.owner = null;
            // await DatastoreHelpers.updateEntity(PORTFOLIO, portfolio);

            // delete the investor's account
            await DatastoreHelpers.removeEntity(investorKey);

            res.status(204).send().end();

        } catch (err) {
            res.status(404).json({
                Error: "No investor with this id exists"
            });
        }
    },

    addStockToInvestor: async (req, res) => {
        try {
            let investorId = parseInt(req.params.investorId, 10);
            let stockId = parseInt(req.params.stockId, 10);

            // get investor bullish stock
            const investorKey = await DatastoreHelpers.getKey(INVESTOR, investorId);
            const investorData = await DatastoreHelpers.getEntity(investorKey);
            const investor = Investor.fromDatastore(investorData);
            if (investor.bullish !== null) {
                throw "AlreadyHavePosition";
            }

            // verify stock exists and doesn't already have this bullish investor
            let stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
            const stockData = await DatastoreHelpers.getEntity(stockKey);
            const stock = Stock.fromDatastore(stockData);
            stock.bulls.forEach((bull) => {
                if (bull === investorId) {
                    throw "AlreadyHavePosition";
                }
            });

            // update the investor and stock
            investor.bullish = stockId;
            stock.bulls.push(investorId);
            await DatastoreHelpers.updateEntity(investorKey, investor);
            await DatastoreHelpers.updateEntity(stockKey, stock);

            res.status(204).send().end();

        } catch (err) {
            res.status(404).json({
                Error: "Investor/stock doesn't exist or Investor already has a bullish position"
            }).end();
        }
    },

    removeStockFromInvestor: async (req, res) => {
        try {
            let investorId = parseInt(req.params.investorId, 10);
            let stockId = parseInt(req.params.stockId, 10);

            // get investor bullish stock
            const investorKey = await DatastoreHelpers.getKey(INVESTOR, investorId);
            const investorData = await DatastoreHelpers.getEntity(investorKey);
            const investor = Investor.fromDatastore(investorData);
            if (investor.bullish !== stockId) {
                throw "InvalidId";
            }

            // verify stock exists and doesn't already have this bullish investor
            let stockKey = await DatastoreHelpers.getKey(STOCK, stockId);
            const stockData = await DatastoreHelpers.getEntity(stockKey);
            const stock = Stock.fromDatastore(stockData);
            const investorIndex = stock.bulls.indexOf(investorId);
            if (investorIndex > -1) {
                stock.bulls.splice(investorIndex, 1);
            }

            // update the investor and stock
            investor.bullish = null;
            await DatastoreHelpers.updateEntity(investorKey, investor);
            await DatastoreHelpers.updateEntity(stockKey, stock);

            res.status(204).send().end();

        } catch (err) {
            res.status(404).json({
                Error: "Invalid Relationship"
            }).end();
        }
    }
};