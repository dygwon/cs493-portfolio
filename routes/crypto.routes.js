// ../routes/crypto.routes.js


const router = require('express').Router();


router.route('/')
    .get((err, req, res, next) => {
        res.send("get cryptocurrencies");
    });


module.exports = router;
