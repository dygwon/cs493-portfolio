// ../helpers/jwt.helpers.js


const dotenv = require('dotenv').config();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


module.exports = {
    checkJwt: jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
        }),

        // validate the audience and issuer
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256']
    })
};
