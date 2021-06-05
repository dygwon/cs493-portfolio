// ../routes/stocks.routes.js


const router = require('express-promise-router')();
const { body, validationResult } = require('express-validator');
const StockControllers = require('../controllers/stocks.controllers');


router.route('/')
    .post((req, res) => {
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
