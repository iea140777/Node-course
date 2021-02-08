const express = require('express');
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const BearerStartegy = require("passport-http-bearer");
const jwtSign = require('jsonwebtoken');

const db = require('./DB.js');
const Visitor = db.Visitor;
const strategies = require('./Strategies');


const app = express();
const port = 8080;

const localStrategy = new LocalStrategy (strategies.localStrategy);

const bearerStrategy = new BearerStartegy(strategies.bearerStrategy);

passport.use('local', localStrategy);
passport.use('bearer', bearerStrategy);

passport.serializeUser((user, done) => {
  console.log('Serializing: ', user.username);
   let token = jwtSign.sign(
    { username: user.username },
   'jhfkjhwerwe',
    { expiresIn: '12h' },
  );
  db.updateUser(user.username, token, done);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/token',
  passport.authenticate('local'),
  function (req, res) {
    console.log('You have correct login and password, ', req.user.username)
  }); 

app.get('/', 
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    console.log(`${req.user.username} has provided correct token`)
  }
);

app.listen(port,  () => {
  console.log('server is running at port', port);
  db.getAllUsers(Visitor);
})
