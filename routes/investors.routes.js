// ../routes/investors.routes.js


const router = require('express').Router();


router.route('/')
    .get((err, req, res, next) => {
        res.send("get investors");
    });


module.exports = router;
