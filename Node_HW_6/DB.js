const mongoose = require('mongoose');

const createDB = () => {
  mongoose.connect('mongodb://localhost:27017/lesson4', {
      useNewUrlParser: true
    });
  const schema = new mongoose.Schema({username: String, pwd: String, jwt: String});
  const Visitor = mongoose.model('Visitor', schema);
  return Visitor;
}

const Visitor = createDB();

const updateUser = (name, token, done) => {
  return Visitor.updateOne({username: name}, {jwt: token}, (err, updatedUser) => {
    console.log('result updated: ', updatedUser);
    return done(null, updatedUser);
  })
}

const getUser = (query, done) => {
  return Visitor.findOne(query).exec()
  .then((foundVisitor) => {
    if(!foundVisitor) {
      console.log('not found');
      return done(null, false);
    } else {
      console.log('success found', foundVisitor);
      console.log('foundVisitor: ', foundVisitor);
      return done(null, foundVisitor);
    }
  })
}

const getAllUsers = (Visitor) => {
  return Visitor.find({}, (err, visitors) =>{ 
    console.log(
      "List of users in db: ",
      visitors.map((item) => {
        return  item;
      })
    )
  })
};

module.exports = {
  Visitor,
  updateUser,
  getUser,
  getAllUsers
}
