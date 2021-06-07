// server.js


/**
 * TODO
 * - two non-user entities need to have a relationship and exhibit adding and removing
 * - GET /user to show all registered users
 */


/**
 * Required External Modules
 */
let dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
var axios = require("axios").default;

const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// routers and middleware
const userInViews = require('./lib/middleware/userInViews');
const authRouter = require('./routes/authentication/auth');
const usersRouter = require('./routes/authentication/users');
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
    saveUninitialized: true
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
app.set('view engine', 'pug');

app.use(session(sess));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// serialize to minimize the payload
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


/**
 * Custom Middleware
 */
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});


/**
 * Router Mounting
 */
app.use(userInViews());
app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/investors', investorsRouter);
app.use('/portfolios', portfoliosRouter);
app.use('/stocks', stocksRouter);
app.use('/cryptos', cryptoRouter);

// GET users
app.get('/users', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://cs493-gwon.us.auth0.com/api/v2/users',
        params: {
            search_engine: 'v3'
        },
        headers: {
            authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`
        }
    };

    axios.request(options).then(function (response) {
        let users = response.data;
        let bunch = [];
        let currentUser, currentUserData;
        for (let i = 0; i < users.length; i++) {
            currentUser = users[i];
            currentUserData = {
                user_id: currentUser.user_id,
                email: currentUser.email,
                nickname: currentUser.nickname,
                created_at: currentUser.created_at
            };
            bunch.push(currentUserData);
        }
        res.send(bunch);
    }).catch(function (error) {
        console.error(error);
    });
});

// GET Homepage
app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Auth0 Webapp sample Nodejs'
    });
});

// handle bad JWT errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            Error: "invalid token"
        }).end();
    }
    console.error(err);
});


// Listen on App Engine-specified port of 8080
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});