const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const BearerStartegy = require("passport-http-bearer");
const jwtSign = require('jsonwebtoken');
// const { users } = require('./users');

const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/lesson4', {
      useNewUrlParser: true
    });
const schema = new mongoose.Schema({username: String, pwd: String, jwt: String});
const Visitor = mongoose.model('Visitor', schema);

// async function  writeAuthData (users) { 
//   await Visitor.deleteMany({});
//   users.map(item => {
//     user = new Visitor ({username:item.username, pwd:item.pwd, jwt:null});
//     user.save((error, savedUser) => {
//       if (error){
//         throw error;
//       };
//     })
//   })
// };

// writeAuthData(users);

// Visitor.deleteMany({});

const localStrategy = new LocalStrategy (
  (username, password, done) => {
    Visitor.findOne({username: username, pwd: password})
    .exec()
    .then((foundVisitor) => {
      console.log(foundVisitor);
      if(!foundVisitor) {
        console.log('not found');
        done(null, false);
      } else {
        done(null, foundVisitor);
        console.log('success found', foundVisitor);
      }
    })
  }
);

const bearerStrategy = new BearerStartegy((token, done) => {
  Visitor.findOne({ jwt: token }, function (err, visitor) {
    if (err) { return done(err); }
    if (!visitor) { return done(null, false); }
    console.log('bearer found: ', visitor);
    done( null, visitor);
  });
});

app.use(bodyParser.json());

passport.use('bearer', bearerStrategy);

app.get('/', (req, res, next) => {
  if (req.headers.authorization){
    passport.authenticate('bearer', { session: false });
    console.log('bearer: ', user);
    next();
  }
  console.log('Token is wrong');
  res.end()
});

passport.use('local', localStrategy);
app.use(passport.initialize());

app.post('/token',
  passport.authenticate('local'),
  function (req, res) {
    console.log('You have correct login and password, ', req.user);
    res.send(jwt);
  }); 

let jwt;

passport.serializeUser((user, done) => {
  console.log('Serializing: ', user.username);
   jwt = jwtSign.sign(
    { username: user.username },
   'jhfkjhwerwe',
    { expiresIn: '12h' },
  );
  Visitor.updateOne({username: user.username}, {jwt}, (err, updatedUser) => {
    console.log('result updated: ', updatedUser);
    done(null, jwt);
  })
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


app.listen(port,  () => {
  console.log('server is running at port', port);
  // Visitor.find({}, (err, visitors) =>{ 
  //   console.log(
  //     "List of users in db: ",
  //     visitors.map((item) => {
  //       return  item;
  //     })
  //   )
  //   }
  // )
})
