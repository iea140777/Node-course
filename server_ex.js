
const express = require('express');
const fs = require('fs');
const db = 'visits.json';
const app = express();

const port = 8080;

const users = ['Lena', 'Pike', 'Croco'];

let visits = [];

if(fs.existsSync(db)){
    fs.stat(db, function(err, stats) {
      if (stats.size) {
        visits = JSON.parse(fs.readFileSync(db, "utf8"));
        visits.map(visit => console.log(`Visitor name: ${visit.name}, ip address: ${visit.ip}, visit time: ${visit.time}`));
      }
      else {
        console.log('no authorized visits sofar...')
      }
    });
}

app.use((req, res, next) => {
  if (req.headers.password ==='HobbitBilbo!') {
    console.log("You know right password!");
    next();
  } else   {
    res.end(`You are not authorized, ${req.headers.name}`);
  }
});

app.use((req, res, next) => {
  if (users.includes(req.headers.name)) {
        visits.push({ip: req.ip, time: Date(), name: req.headers.name});
        fs.writeFile(db, JSON.stringify(visits), (err) => {
            if (err) {
                throw err;
            }
          });
    console.log(`Welcome, ${req.headers.name}!`);
    next();
  } else   {
    res.end(`Password is not enough, ${req.headers.name}!`);
  }
});

app.use('/', (req, res, next) => {
  if (req.path !== '/private') {
    res.send('You can get your ip on /private page!');
  } else {
    res.send(`${req.headers.name}, your ip is: ${req.ip}`);
  }  
});

app.listen(port, console.log('server is running at port', port));
