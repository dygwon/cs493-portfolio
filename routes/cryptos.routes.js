// ../routes/crypto.routes.js


const router = require('express').Router();


router.route('/')
    .post((req, res) => {
        res.status(200).send("creating a cryptocurrency").end();
    })
    .get((req, res) => {
        res.status(200).send("list cryptocurrencies").end();
    });

router.route('/:cryptoId')
    .get((req, res) => {
        res.status(200).send("getting specified cryptocurrency").end();
    })
    .put((req, res) => {
        res.status(200).send("update a cryptocurrency (put)").end();
    })
    .patch((req, res) => {
        res.status(200).send("update a cryptocurrency (patch)").end();
    })
    .delete((req, res) => {
        res.status(200).send("delete a cryptocurrency").end();
    });


module.exports = router;
