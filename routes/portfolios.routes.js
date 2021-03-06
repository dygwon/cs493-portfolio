// ../routes/portfolios.routes.js


const router = require('express-promise-router')();
const {
    body,
    validationResult
} = require('express-validator');
const PortfolioControllers = require('../controllers/portfolios.controllers');
const {
    checkJwt,
    checkJwtUnregistered
} = require('../helpers/jwt.helpers');


router.route('/')
    .post(
        checkJwt,
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
    .get(
        checkJwtUnregistered,
        (req, res) => {

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
    .get(
        checkJwt,
        (req, res) => {

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
        checkJwt,
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
        checkJwt,
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
    .delete(
        checkJwt,
        (req, res) => {
            PortfolioControllers.deletePortfolio(req, res);
        });

router.route('/:portfolioId/stocks/:stockId')
    .patch(
        checkJwt,
        (req, res) => {
            PortfolioControllers.addStockToPortfolio(req, res);
        })
    .delete(
        checkJwt,
        (req, res) => {
            PortfolioControllers.removeStockFromPortfolio(req, res);
        })
    .post(
        (req, res) => {
            res.status(405).set("Allow", "PATCH, DELETE").json({
                Error: "Not Acceptable"
            }).end();
        }
    )
    .get(
        (req, res) => {
            res.status(405).set("Allow", "PATCH, DELETE").json({
                Error: "Not Acceptable"
            }).end();
        }
    );

router.route('/:portfolioId/cryptos/:cryptoId')
    .patch(
        checkJwt,
        (req, res) => {
            PortfolioControllers.addCryptoToPortfolio(req, res);
        })
    .delete(
        checkJwt,
        (req, res) => {
            PortfolioControllers.removeCryptoFromPortfolio(req, res);
        })
    .post(
        (req, res) => {
            res.status(405).set("Allow", "PATCH, DELETE").json({
                Error: "Not Acceptable"
            }).end();
        }
    )
    .get(
        (req, res) => {
            res.status(405).set("Allow", "PATCH, DELETE").json({
                Error: "Not Acceptable"
            }).end();
        }
    );


module.exports = router;