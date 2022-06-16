const http = require('http');
const { createReadStream, exists } = require('fs');
const fExists = require('util').promisify(exists);

const server = http.createServer((req, res) => {
    // / index.html
    // /about about.html
    let path = req.url;
    let pathArr = path.split('/');
    let filename = pathArr[1];
    getFileStream(filename, res);
});
server.listen(3000);
console.log('server listening on port 3000')

async function getFileStream(filename, res) {
    if (filename === '') {
        filename = 'index.html';
    } else {
        filename = filename + '.html';
    }

    if (await fileExists(filename)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        createReadStream(filename).pipe(res);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        createReadStream('404.html').pipe(res);
    }
}

function fileExists(filename,) {
    return fExists(filename);
}