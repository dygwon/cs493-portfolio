// ../routes/investors.routes.js


const router = require('express-promise-router')();
const {
    body,
    validationResult
} = require('express-validator');
const { addStockToInvestor } = require('../controllers/investors.controllers');
const InvestorControllers = require('../controllers/investors.controllers');
const {
    checkJwt
} = require('../helpers/jwt.helpers');


router.route('/')
    .post(
        body('firstName').isAlpha("en-US", {
            ignore: " -"
        }).exists(),
        body('lastName').isAlpha("en-US", {
            ignore: " -"
        }).exists(),
        body('location').isAscii().exists(),
        (req, res) => {

            // check for valid request content type
            if (!req.is('application/json')) {
                return res.status(415).json({
                    Error: "Requested with an unsupported MIME type"
                });
            }

            // check for valid requested content type
            const requestAccepts = req.get('accept');
            if (requestAccepts !== 'application/json') {
                return res.status(406).json({
                    Error: "Requested an unsupported MIME type"
                });
            }

            // send error if required parameter(s) missing
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    Error: "The request object is missing at least one of the required attributes"
                });
            }

            InvestorControllers.createInvestor(req, res);
        })
    .get(
        (req, res) => {

            // check for valid requested content type
            const requestAccepts = req.get('accept');
            if (requestAccepts !== 'application/json') {
                return res.status(406).json({
                    Error: "Requested an unsupported MIME type"
                });
            }

            InvestorControllers.listInvestors(req, res);
        });

router.route('/:investorId')
    .get(
        (req, res) => {

            // check for valid requested content type
            const requestAccepts = req.get('accept');
            if (requestAccepts !== 'application/json') {
                return res.status(406).json({
                    Error: "Requested an unsupported MIME type"
                });
            }

            InvestorControllers.getInvestor(req, res);
        })
    .put(
        body('firstName').isAlpha("en-US", {
            ignore: " -"
        }).exists(),
        body('lastName').isAlpha("en-US", {
            ignore: " -"
        }).exists(),
        body('location').isAscii().exists(),
        (req, res) => {

            // check for valid request content type
            if (!req.is('application/json')) {
                return res.status(415).json({
                    Error: "Requested with an unsupported MIME type"
                });
            }

            // check for valid requested content type
            const requestAccepts = req.get('accept');
            if (requestAccepts !== 'application/json') {
                return res.status(406).json({
                    Error: "Requested an unsupported MIME type"
                });
            }

            // send error if required parameter(s) missing
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    Error: "The request object is missing at least one of the required attributes"
                });
            }

            InvestorControllers.updateInvestor(req, res);
        })
    .patch(
        body('firstName').isAlpha("en-US", {
            ignore: " -"
        }).optional(),
        body('lastName').isAlpha("en-US", {
            ignore: " -"
        }).optional(),
        body('location').isAscii().optional(),
        (req, res) => {

            // check for valid request content type
            if (!req.is('application/json') && req.header('Content-Type')) {
                return res.status(415).json({
                    Error: "Requested with an unsupported MIME type"
                });
            }

            // check for valid requested content type
            const requestAccepts = req.get('accept');
            if (requestAccepts !== 'application/json') {
                return res.status(406).json({
                    Error: "Requested an unsupported MIME type"
                });
            }

            // send error if required parameter(s) missing
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    Error: "The request object is missing at least one of the required attributes"
                });
            }

            InvestorControllers.updateInvestor(req, res);
        })
    .delete(
        (req, res) => {
            InvestorControllers.deleteInvestor(req, res);
        });

router.route('/:investorId/stocks/:stockId')
    .patch((req, res) => {
        InvestorControllers.addStockToInvestor(req, res);
    })
    .delete((req, res) => {
        InvestorControllers.removeStockFromInvestor(req, res);
    });

module.exports = router;