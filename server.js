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
 */


/**
 * Required External Modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// routers and middleware
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


/**
 * Passport Configuration
 */


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
