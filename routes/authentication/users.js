// ../../routes/authentication/users.js


const express = require('express');
const secured = require('../../lib/middleware/secured');
const router = express.Router();


// GET user profile
router.get('/user', secured(), (req, res, next) => {
    res.render('user');
});


module.exports = router;