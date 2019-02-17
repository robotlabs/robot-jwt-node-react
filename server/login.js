
const auth = require('./jwt-auth');
const login = {
  init: function(app, users) {
    app.post('/api/log-user', (req, res) => {
      var post = req.body;
      for (let i = 0; i < users.length; i++) {
          const userObj = users[i];
          if (post.user === userObj.user && post.password === userObj.password) {
              //  post
               const payload = {
                data1: "Data 1",
                data2: "Data 2",
                data3: "Data 3",
                data4: "Data 4",
               };
              const token = auth.sign(payload, post.userOptions);
              
              // console.log(':: token ', token);
              // const isVerified = auth.verify(token, sOptions);

              res.send({
                  logged: true,
                  userOptions: post.userOptions,
                  token: token
              });
              return;
          }
      }
      res.send({
          logged: false
      });
    });
    app.post('/api/register-user', (req, res) => {
      var post = req.body;
      users.push({user: post.user, password: post.password});
      res.send({
          registered: true,
          user: post.user
      });
    });
  }
}
module.exports = login;