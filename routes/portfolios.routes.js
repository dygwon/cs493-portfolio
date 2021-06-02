// ../routes/portfolios.routes.js


const router = require('express').Router();


router.route('/')
    .get((err, req, res, next) => {
        res.send("get portfolios");
    });


module.exports = router;
