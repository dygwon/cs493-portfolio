// ../controllers/stocks.controllers.js


const { STOCK } = require('../helpers/constants.helpers');
const Stock = require('../models/stocks.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createStock: async (req, res) => {
        res.status(200).send("creating a stock").end();
    },

    getStock: async (req, res) => {
        res.status(200).send("getting specified stock").end();
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
}
