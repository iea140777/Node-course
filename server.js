const http = require ('http');
const url = require("url");
const port = 8080;
const server = http.createServer ((request, response) => {
    console.log('accepted request: ', request.method);
    console.log('request headers: ', request.headers);
    response.end('Hello, Bilbo!');
})

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('server is running at port', port);
})

