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
  Visitor.findOne({ jwt: token }).exec().then((foundVisitor) => {
    if (!foundVisitor) { done(null, false); }
    console.log('bearer found: ', foundVisitor);
    done( null, foundVisitor);
  });
})

passport.use('local', localStrategy);
passport.use('bearer', bearerStrategy);

passport.serializeUser((user, done) => {
  console.log('Serializing: ', user.username);
   let token = jwtSign.sign(
    { username: user.username },
   'jhfkjhwerwe',
    { expiresIn: '12h' },
  );
  Visitor.updateOne({username: user.username}, {jwt: token}, (err, updatedUser) => {
    console.log('result updated: ', updatedUser);
    done(null, updatedUser);
  })
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/token',
  passport.authenticate('local'),
  function (req, res) {
    console.log('You have correct login and password, ', req.user)
  }); 

app.get('/', 
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    console.log(`${req.user.username} has provided correct token`)
  }
);

app.listen(port,  () => {
  console.log('server is running at port', port);
  Visitor.find({}, (err, visitors) =>{ 
    console.log(
      "List of users in db: ",
      visitors.map((item) => {
        return  item;
      })
    )
    }
  )
})
