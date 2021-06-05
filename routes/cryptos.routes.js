// ../routes/crypto.routes.js


const router = require('express-promise-router')();
const {
    body,
    validationResult
} = require('express-validator');
const CryptoControllers = require('../controllers/cryptos.controllers');


router.route('/')
    .post(
        body('ticker').exists(),
        body('name').exists(),
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

            CryptoControllers.createCrypto(req, res);
        })
    .get((req, res) => {
        CryptoControllers.listCryptos(req, res);
    });

router.route('/:cryptoId')
    .get((req, res) => {
        CryptoControllers.getCrypto(req, res);
    })
    .put((req, res) => {
        CryptoControllers.putCrypto(req, res);
    })
    .patch((req, res) => {
        CryptoControllers.patchCrypto(req, res);
    })
    .delete((req, res) => {
        CryptoControllers.deleteCrypto(req, res);
    });


module.exports = router;