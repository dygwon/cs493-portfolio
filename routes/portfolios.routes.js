// ../routes/portfolios.routes.js


/**
 * TODO
 * - authenticate and create protected and unprotected routes for list portfolios
 * - update and delete should be protected
 * - add/remove for portfolio:stock and portfolio:crypto relationships should be protected
 */


const router = require('express-promise-router')();
const {
    body,
    validationResult
} = require('express-validator');
const PortfolioControllers = require('../controllers/portfolios.controllers');


router.route('/')
    .post(
        body('owner').exists(),
        body('classification').exists(),
        body('yearStarted').isNumeric().exists(),
        body('industryFocus').exists(),
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

            PortfolioControllers.createPortfolio(req, res);
        })
    .get((req, res) => {

        // check for valid requested content type
        const requestAccepts = req.get('accept');
        if (requestAccepts !== 'application/json') {
            return res.status(406).json({
                Error: "Requested an unsupported MIME type"
            });
        }

        PortfolioControllers.listPortfolios(req, res);
    });

router.route('/:portfolioId')
    .get((req, res) => {

        // check for valid requested content type
        const requestAccepts = req.get('accept');
        if (requestAccepts !== 'application/json') {
            return res.status(406).json({
                Error: "Requested an unsupported MIME type"
            });
        }

        PortfolioControllers.getPortfolio(req, res);
    })
    .put(
        body('classification').exists(),
        body('yearStarted').isNumeric().exists(),
        body('industryFocus').exists(),
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

            PortfolioControllers.updatePortfolio(req, res);
        })
    .patch(
        body('classification').optional(),
        body('yearStarted').isNumeric().optional(),
        body('industryFocus').optional(),
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

            PortfolioControllers.updatePortfolio(req, res);
        })
    .delete((req, res) => {
        PortfolioControllers.deletePortfolio(req, res);
    });

router.route('/:portfolioId/stocks/:stockId')
    .patch((req, res) => {
        PortfolioControllers.addStockToPortfolio(req, res);
    })
    .delete((req, res) => {
        PortfolioControllers.removeStockFromPortfolio(req, res);
    });

router.route('/:portfolioId/cryptos/:cryptoId')
    .patch((req, res) => {
        PortfolioControllers.addCryptoToPortfolio(req, res);
    })
    .delete((req, res) => {
        PortfolioControllers.removeCryptoFromPortfolio(req, res);
    });


module.exports = router;