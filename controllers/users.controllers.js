// ../controllers/users.controllers.js


let dotenv = require('dotenv').config();


module.exports = {
    getUsers: (req, res) => {

    }
};



// => {

//     // get access token
//     let options = {
//         method: 'POST',
//         url: 'https://cs493-gwon.us.auth0.com/oauth/token',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//         data: {
//             grant_type: 'client_credentials',
//             client_id: process.env.AUTH0_CLIENT_ID,
//             client_secret: process.env.AUTH0_CLIENT_SECRET,
//             audience: 'https://cs493-gwon.us.auth0.com/api/v2/'
//         }
//     };

//     request(options, function (error, response, body) {
//         if (error) {
//             throw new Error(error);
//         }
//         console.log(JSON.parse(body));
//         let accessToken = JSON.parse(body).access_token;
//         console.log(accessToken);
//         let authHeader = 'Bearer ' + accessToken;

//         let options2 = {
//             method: 'GET',
//             url: 'https://cs493-gwon.us.auth0.com/api/v2/users',
//             params: {
//                 search_engine: 'v2'
//             },
//             headers: {
//                 authorization: authHeader
//             }
//         };

//         request(options2, function (error, response, body) {
//             if (error) {
//                 throw new Error(error);
//             }
//             console.log(body);
//             res.status(200).send(body).end();
//         });
//     });
// });