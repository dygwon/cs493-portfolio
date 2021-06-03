// ../routes/investors.routes.js


const router = require('express').Router();


router.route('/')
    .post((req, res) => {
        res.status(200).send("creating an investor").end();
    })
    .get((req, res) => {
        res.status(200).send("list investors").end();
    });

router.route('/:investorId')
    .get((req, res) => {
        res.status(200).send("getting specified investor").end();
    })
    .put((req, res) => {
        res.status(200).send("update an investor (put)").end();
    })
    .patch((req, res) => {
        res.status(200).send("update an investor (patch)").end();
    })
    .delete((req, res) => {
        res.status(200).send("delete an investor").end();
    });


module.exports = router;