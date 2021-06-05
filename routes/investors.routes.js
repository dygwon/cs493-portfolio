// ../routes/investors.routes.js


const router = require('express-promise-router')();
const { body, validationResult } = require('express-validator');
const InvestorControllers = require('../controllers/investors.controllers');


router.route('/')
    .post(
        body('firstName').isAlpha("en-US", { ignore: " -" }).exists(),
        body('lastName').isAlpha("en-US", { ignore: " -" }).exists(),
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

            InvestorControllers.createInvestor(req, res);
        })
    .get((req, res) => {
        InvestorControllers.listInvestors(req, res);
    });

router.route('/:investorId')
    .get((req, res) => {
        InvestorControllers.getInvestor(req, res);
    })
    .put((req, res) => {
        InvestorControllers.putInvestor(req, res);
    })
    .patch((req, res) => {
        InvestorControllers.patchInvestor(req, res);
    })
    .delete((req, res) => {
        InvestorControllers.deleteInvestor(req, res);
    });


module.exports = router;
