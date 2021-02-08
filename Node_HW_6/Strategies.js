const db = require('./DB.js');

const localStrategy = (username, password, done) => {
  db.getUser({username: username, pwd: password}, done)
};
  
const bearerStrategy = (token, done) => {
  console.log('token: ', token);
  done(null, 'lena');
}

module.exports = {
  localStrategy,
  bearerStrategy
}