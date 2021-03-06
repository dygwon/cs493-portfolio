// ../routes/stocks.routes.js


const router = require('express-promise-router')();
const {
    body,
    validationResult
} = require('express-validator');
const StockControllers = require('../controllers/stocks.controllers');


router.route('/')
    .post(
        body('ticker').exists(),
        body('company').exists(),
        body('ceo').exists(),
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

            StockControllers.createStock(req, res);
        })
    .get((req, res) => {

        // check for valid requested content type
        const requestAccepts = req.get('accept');
        if (requestAccepts !== 'application/json') {
            return res.status(406).json({
                Error: "Requested an unsupported MIME type"
            });
        }

        StockControllers.listStocks(req, res);
    });

router.route('/:stockId')
    .get((req, res) => {

        // check for valid requested content type
        const requestAccepts = req.get('accept');
        if (requestAccepts !== 'application/json') {
            return res.status(406).json({
                Error: "Requested an unsupported MIME type"
            });
        }

        StockControllers.getStock(req, res);
    })
    .put(
        body('ticker').exists(),
        body('company').exists(),
        body('ceo').exists(),
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

            StockControllers.updateStock(req, res);
        })
    .patch(
        body('ticker').optional(),
        body('company').optional(),
        body('ceo').optional(),
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

            StockControllers.updateStock(req, res);
        })
    .delete((req, res) => {
        StockControllers.deleteStock(req, res);
    });


module.exports = router;