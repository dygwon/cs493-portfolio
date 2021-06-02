// ../routes/stocks.routes.js


const router = require('express').Router();


router.route('/')
    .get((err, req, res, next) => {
        res.send("get stocks");
    });


module.exports = router;
