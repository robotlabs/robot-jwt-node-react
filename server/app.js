const express = require('express');
const bodyParser = require('body-parser');
const login = require('./login');
const jwtMiddleware = require('./jwtMiddleware');

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
//** public API */
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hi, Ciao bella: ' + Math.floor(Math.random() * 100) });
});
//** JWT protected API */
app.use(jwtMiddleware);
app.get('/api/hello2', (req, res) => {
  return res.json({
    success: true,
    message: 'Here your protected data',
    auth: res.a
  });
});
