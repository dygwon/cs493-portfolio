// ../../routes/authentication/auth.js


/**
 * Required External Modules
 */
const dotenv = require('dotenv').config();

const express = require('express');
const router = express.Router();

const passport = require('passport');
const querystring = require('querystring');
const util = require('util');
const url = require('url');


/**
 * Routes Definitions
 */

// performs login; Auth0 will redirect to callback upon completion
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), (req, res) => {
    res.redirect('/');
});

// performs the final stage of authentication and redirects to previously requested URL or '/user'
router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            // sends user to previously requested route, if there was one
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/user');
        });
    })(req, res, next);
});

// perform session logout and redirect to homepage
router.get('/logout', (req, res) => {

    // logout of the session
    req.logout();

    // determine logout URL
    let returnTo = req.protocol + '://' + req.hostname;
    let port = req.socket.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo =
            process.env.NODE_ENV === "production" ?
            `${returnTo}/` :
            `${returnTo}:${port}/`;
    }

    // logout of Auth0
    let logoutURL = new url.URL(
        util.format(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)
    );
    let searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
    });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
})


module.exports = router;
