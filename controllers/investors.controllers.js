// ../controllers/investors.controllers.js


/**
 * TODO
 * - immplement authentication
 * - remove portfolio id - only time ids/names show is when authenticated user is accessing
 *   portfolio
 * - make validation for incorrect id specific to ids for getInvestor
 */


const { INVESTOR, PAGELIMIT } = require('../helpers/constants.helpers');
const Investor = require('../models/investors.models');
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

    // TODO: put, patch, and delete investor should be done by authenticated user?
    putInvestor: async (req, res) => {
        try {

            // generate key and get investor info
            let investorId = parseInt(req.params.investorId, 10);
            const investorKey = await DatastoreHelpers.getKey(INVESTOR, investorId);
            const investorData = await DatastoreHelpers.getEntity(investorKey);
            const investor = Investor.fromDatastore(investorData);

            // update investor data and save in datastore
            investor.firstName = req.body.firstName;
            investor.lastName = req.body.lastName;
            investor.location = req.body.location;
            await DatastoreHelpers.updateEntity(investorKey, investor);

            // generate response with DTO
            let URL = ControllerHelpers.getURL(req, investorKey);
            res.set('Content-Location', URL);
            res.status(303).json({
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

    patchInvestor: async (req, res) => {
        res.status(200).send("update an investor (patch)").end();
    },

    deleteInvestor: async (req, res) => {
        res.status(200).send("delete an investor").end();
    }
};
