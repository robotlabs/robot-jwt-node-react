const express = require('express');
const bodyParser = require('body-parser');

const jwt   = require('jsonwebtoken');
const fs   = require('fs');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');  

const login = require('./login');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//** setup login */
login.init(app, users);

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
// app.post('/api/courses', (request, response) => {
//     return response.json(request.body);
// });
