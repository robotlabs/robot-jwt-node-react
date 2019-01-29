const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwtAuth = require('./jwt-auth');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//** standard REST api */
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hi, Ciao bella: ' + Math.floor(Math.random() * 100) });
});
// app.get('/hellotest', isAuthenticated, function(req, res) {
//     res.send({ express: 'look at me!'});

//     // setTimeout(() => {
//     //     res.redirect('/ciaobella');
//     // }, 3000);
// });

// app.post('/usercheck', isAuthenticated, function(req, res) {
//     res.send({ express: 'look at me!'});

//     // setTimeout(() => {
//     //     res.redirect('/ciaobella');
//     // }, 3000);
// });


function isAuthenticated(req, res, next) {
    // do any checks you want to in here
    console.log('A');
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.authenticated)
        return next();
    
    console.log('B');
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}

// var router = express.Router();
// // test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });

// app.use(express.static(path.join(__dirname, 'client/build')));
//route to handle user registration
// router.post('/register',login.register);
// router.post('/login',login.login)
// app.use('/api', router);

var port = process.env.PORT || 3000;


// app.post('/contact-form', (req, res) => {
//     console.log(req.body);
// })
// app.post('/login-creds', (req, res) => {
//     console.log('-a-', req.body);
//     // if (req.body.username === 'robot' && req.body.password === 'test') {
//     //     console.log('-1-');
//     //     return {
//     //         loggedIn: true,
//     //         token: {'caio': 'good old caio is back'}
//     //     }
//     // } else {
//     //     console.log('-2-');
//     //     return {
//     //         loggedIn: false,
//     //         token: {}
//     //     }
//     // }
// })
app.listen(port, () => console.log(`Listening on port ${port}`));