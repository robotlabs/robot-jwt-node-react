const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'client/build')));


var port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

//** standard REST api */
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hi, Ciao bella: ' + Math.floor(Math.random() * 100) });
});
app.post('/api/courses', (request, response) => {
    console.log('**** req body user', request.body.user);
    console.log('**** req body passw', request.body.password);
    return response.json(request.body);
});
app.post('/api/post', (req, res) => {
    console.log('**** req body ', req.body.user);

    var post = req.body;
    if (post.user === 'john' && post.password === 'johnspassword') {
        console.log('>>>>>>> USER IS LOGGED');
        // req.session.user_id = johns_user_id_here;
        res.redirect('/test');
    } else {
        console.log('<<<<<<<<');
        res.send('Bad user/pass');
    }
    //res.send({ express: 'Hi, Ciao bella: ' + Math.floor(Math.random() * 100) });
});
app.get('/test', (req, res) => {
    res.send({ express: 'Hi, Ciao test:' });
});