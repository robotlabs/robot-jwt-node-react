const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt   = require('jsonwebtoken');
const fs   = require('fs');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');  

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'client/build')));


var port = process.env.PORT || 3000;
var users = [{
    user: 'robot',
    password: '0000'
},{
    user: 'robot2',
    password: '0002'
},{
    user: 'robot3',
    password: '0004'
},{
    user: 'robot4',
    password: '0000'
}];
app.listen(port, () => console.log(`Listening on port ${port}`));

//** standard REST api */
app.get('/api/hello', (req, res) => {
    console.log('req ::', req.body);
    res.send({ express: 'Hi, Ciao bella: ' + Math.floor(Math.random() * 100) });
});
app.get('/api/hello2', (req, res) => {
    console.log('req HEADERS::', req.headers);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log('TOKEN :', token.x);
    console.log('TOKEN auth:', req.headers.authorization.x);
    console.log('TOKEN x access:', req.headers['x-access-token'].x);
    // res.send({ express: 'Hi, Ciao bella: ' + Math.floor(Math.random() * 100) });



    if (token) {
        jwt.verify(token, privateKEY, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {console.log('>>>>>>>>>>>>>>>>>>');

            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
});
app.post('/api/courses', (request, response) => {
    return response.json(request.body);
});
app.post('/api/log-user', (req, res) => {
    var post = req.body;
    for (let i = 0; i < users.length; i++) {
        const userObj = users[i];
        if (post.user === userObj.user && post.password === userObj.password) {
            res.send({
                logged: true,
                user: post.user
            });
        }
    }
    res.send({
        logged: false
    });
});
app.post('/api/register-user', (req, res) => {
    console.log('**** registering user body ', req.body.user);
    var post = req.body;
    users.push({user: post.user, password: post.password});
    res.send({
        registered: true,
        user: post.user
    });
});
app.get('/test', (req, res) => {
    res.send({ express: 'Hi, Ciao test:' });
});