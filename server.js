const http = require ('http');
const url = require('url');
const fs = require('fs');
const db = 'friends.json';
const port = 8080;

let friends = [];
if(fs.existsSync(db)){
    friends = JSON.parse(fs.readFileSync(db, "utf8"));
    friends.map(friend => console.log(`friend name is ${friend.name}, ip is ${friend.ip}`));
}

const server = http.createServer ((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    if (
        request.method === 'POST' &&
        request.headers.iknowyoursecret ==='TheOwlsAreNotWhatTheySeem' &&
        request.headers.name
        ) {
            const ip = request.connection.remoteAddress;
            friends.push({name: request.headers.name, ip: ip});
            fs.writeFile(db, JSON.stringify(friends), (err) => {
                if (err) {
                    throw err;
                }
            });
        response.end(`Hello, ${request.headers.name}`);
    }
    else {
    response.end(`I don't know you Stranger...`);
    }
});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is running at port', port);
})

