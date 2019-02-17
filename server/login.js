
const auth = require('./jwt-auth');
const login = {
  init: function(app, users) {
    app.post('/api/log-user', (req, res) => {
      var post = req.body;
      for (let i = 0; i < users.length; i++) {
          const userObj = users[i];
          if (post.user === userObj.user && post.password === userObj.password) {
              //** temp adding  */
              const sOptions = {
                issuer: "Authorizaxtion/Resource/This server",
                subject: "iam@user.me", 
                audience: "Client_Identity" // this should be provided by client
               }
               const payload = {
                data1: "Data 1",
                data2: "Data 2",
                data3: "Data 3",
                data4: "Data 4",
               };
              const token = auth.sign(payload, sOptions);
              
              // console.log(':: token ', token);
              // const isVerified = auth.verify(token, sOptions);

              res.send({
                  logged: true,
                  user: post.user,
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
      console.log('**** registering user body ', req.body.user);
      var post = req.body;
      users.push({user: post.user, password: post.password});
      res.send({
          registered: true,
          user: post.user
      });
    });
    // app.post('/api/validate-user', (req, res) => {
    //   console.log('**** registering user body ', req.body.user);
    //   var post = req.body;
    //   users.push({user: post.user, password: post.password});
    //   res.send({
    //       registered: true,
    //       user: post.user
    //   });
    // });
  }
}
module.exports = login;