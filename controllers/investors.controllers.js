// ../controllers/investors.controllers.js


/**
 * TODO
 * immplement authentication
 */


const { INVESTOR } = require('../helpers/constants.helpers');
const Investor = require('../models/investors.models');
const DatastoreHelpers = require('../helpers/datastore.helpers');
const ControllerHelpers = require('../helpers/controllers.helpers');


module.exports = {
    createInvestor: async (req, res) => {
        const investor = Investor.fromReqBody(req.body);

        // generate key and save new investor
        let investorKey = await DatastoreHelpers.getKey(INVESTOR);
        await DatastoreHelpers.createEntity(investorKey, investor);

        // generate reponse with DTO
        let URL = ControllerHelpers.getURL(req, investorKey);
        res.set("Content-Location", URL);
        res.status(201).json({
            id: investorKey.id,
            firstName: investor.firstName,
            lastName: investor.lastName,
            portfolio: investor.portfolio,
            self: URL
        }).end();
    },

    getInvestor: async (req, res) => {
        res.status(200).send("getting specified investor").end();
    },

    listInvestors: async (req, res) => {
        res.status(200).send("list investors").end();
    },

    // TODO: put, patch, and delete investor should be done by authenticated user?
    putInvestor: async (req, res) => {
        res.status(200).send("update an investor (put)").end();
    },

    patchInvestor: async (req, res) => {
        res.status(200).send("update an investor (patch)").end();
    },

    deleteInvestor: async (req, res) => {
        res.status(200).send("delete an investor").end();
    }
};
