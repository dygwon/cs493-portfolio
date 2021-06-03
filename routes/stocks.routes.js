// ../routes/stocks.routes.js


const router = require('express').Router();


router.route('/')
    .post((req, res) => {
        res.status(200).send("creating a stock").end();
    })
    .get((req, res) => {
        res.status(200).send("list stocks").end();
    });

router.route('/:stockId')
    .get((req, res) => {
        res.status(200).send("getting specified stock").end();
    })
    .put((req, res) => {
        res.status(200).send("update a stock (put)").end();
    })
    .patch((req, res) => {
        res.status(200).send("update a stock (patch)").end();
    })
    .delete((req, res) => {
        res.status(200).send("delete a stock").end();
    });


module.exports = router;
