const http = require('http');

let port = parseInt(process.argv[2]) || 3000;

const server = http.createServer((req, res) => {
    res.end("Hello there!");
});
server.listen(port);
console.log(`server listening on port ${port}`);


