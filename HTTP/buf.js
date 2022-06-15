const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    fs.readFile('./dre.mp4', (err, content) => {
        if (err != null) {
            console.log('Error>>', err);
        } else {
            res.writeHead(200, { 'Content-Type': 'video/mp4' });
            res.end(content);
        }
    });
});
server.listen(3000);
console.log('server listening on port 3000')