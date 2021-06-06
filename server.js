// server.js


/**
 * TODO
 * - update status codes and documentation
 * - validation performs input validation and if parameter is present
 * - stocks and cryptocurrencies should be unique
 * - Accept = all headers should be considered valid
 * - update investor should be protected?
 * - properties modeling relationships are not considered valid, add more properties
 * - what do you do with a portfolio that has no owner?
 * - implement 405 status code
 */


/**
 * Required External Modules
 */
let dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// routers and middleware
const userInViews = require('./lib/middleware/userInViews');
const investorsRouter = require('./routes/investors.routes');
const portfoliosRouter = require('./routes/portfolios.routes');
const stocksRouter = require('./routes/stocks.routes');
const cryptoRouter = require('./routes/cryptos.routes');


/**
 * App Variables
 */
const app = express();
const PORT = process.env.PORT || 8080;


/**
 * Session Configuration
 */
let sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUnitialized: true
};

if (app.get('env') === 'production') {
    // use secure cookies in production
    sess.cookie.secure = true;
    sess.proxy = true;
    app.set('trust proxy', 1);
}


/**
 * Passport Configuration
 */
let strategy = new Auth0Strategy({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:8080/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // extraParams.id_token carries the JSON Web Token
        profile.id_token = extraParams.id_token;
        return done(null, profile);
    }
);


/**
 * App Configuration
 */
app.use(bodyParser.json());
app.use(logger('dev'));


/**
 * Custom Middleware
 */


/**
 * Router Mounting
 */
app.use('/investors', investorsRouter);
app.use('/portfolios', portfoliosRouter);
app.use('/stocks', stocksRouter);
app.use('/cryptos', cryptoRouter);


// GET Homepage
app.get('/', (req, res, next) => {
    res.status(200).send("app is working!").end();
});



// Listen on App Engine-specified port of 8080
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});