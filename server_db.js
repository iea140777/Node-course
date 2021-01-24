
const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const {createDB, writeData, getData} = require('./DB_actions.js');

const port = 8080;

const users = ['Lena', 'Pike', 'Croco', 'User', 'Bilbo', 'Owl'];

app.use((req, res, next) => {
  if (req.headers.password ==='HobbitBilbo!') {
    console.log("You know right password!");
    next();
  } else   {
    res.end(`You are not authorized, ${req.headers.name}`);
  }
});

let Visit = createDB();

app.use((req, res, next) => {
  if (users.includes(req.headers.name)) {
    writeData(Visit, req.headers.name, req.ip)
    .then(() => next());
  } else  {
    res.end(`Password is not enough, ${req.headers.name}!`);
  }
});

app.use('/', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  if (req.path == '/private') {
    const name = { 'name': `${req.headers.name}` };
    getData(Visit, name)
    .then((result) => res.end(JSON.stringify(result)));
  } else {
    res.end('You can get data about your visits on /private page!');
  }  
});

app.listen(port,  () => {
  console.log('server is running at port', port);
  getData(Visit, {}).then((result) => 
    console.log(
      "List of all visits: ",
      result.map((item) => {
        return (`Id: ${item._id}, Name: ${item.name}, Ip: ${item.ip}, Time: ${item.time}; `);
      })
    )
  )
});
