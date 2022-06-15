const http = require('http');
const { createReadStream } = require('fs');

const server = http.createServer((req, res) => {
    const str = createReadStream('./dre.mp4');
    str.on('error', err => console.log);
    
    res.writeHead(200, { 'Content-Type': 'video/mp4' });
    str.pipe(res);

});
server.listen(3000);
console.log('server listening on port 3000')