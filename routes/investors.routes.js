// ../routes/investors.routes.js


const router = require('express-promise-router')();
const { body, validationResult } = require('express-validator');


router.route('/')
    .post(
        body('firstName').isAlpha("en-US", { ignore: " -" }),
        body('lastName').isAlpha("en-US", { ignore: " -" }),
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