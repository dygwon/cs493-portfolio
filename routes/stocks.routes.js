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
        StockControllers.listStocks(req, res);
    });

router.route('/:stockId')
    .get((req, res) => {
        StockControllers.getStock(req, res);
    })
    .put((req, res) => {
        StockControllers.putStock(req, res);
    })
    .patch((req, res) => {
        StockControllers.patchStock(req, res);
    })
    .delete((req, res) => {
        StockControllers.deleteStock(req, res);
    });


module.exports = router;