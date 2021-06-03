// ../routes/portfolios.routes.js


/**
 * TODO
 * authenticate and create protected and unprotected routes for list portfolios
 */


const router = require('express').Router();


router.route('/')
    .post((req, res) => {
        res.status(200).send("creating a portfolio").end();
    })
    .get((req, res) => {
        res.status(200).send("list portfolios").end();
    });

router.route('/:portfolioId')
    .get((req, res) => {
        res.status(200).send("getting specified portfolio").end();
    })
    .put((req, res) => {
        res.status(200).send("update a portfolio (put)").end();
    })
    .patch((req, res) => {
        res.status(200).send("update a portfolio (patch)").end();
    })
    .delete((req, res) => {
        res.status(200).send("delete a portfolio").end();
    });


module.exports = router;
