// ../routes/crypto.routes.js


const router = require('express-promise-router')();
const { body, validationResult } = require('express-validator');
const CryptoControllers = require('../controllers/cryptos.controllers');


router.route('/')
    .post((req, res) => {
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
