// ../controllers/portfolios.controllers.js


const { PORTFOLIO } = require('../helpers/constants.helpers');
const Portfolio = require('../models/portfolios.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createPortfolio: async (req, res) => {
        res.status(200).send("creating a portfolio").end();
    },

    getPortfolio: async (req, res) => {
        res.status(200).send("getting specified portfolio").end();
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
