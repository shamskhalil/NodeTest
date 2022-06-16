const http = require('http');
const { Worker } = require('worker_threads');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end("Hello there!");
    } else {
        let work = new Worker('./http-block-worker.js');
        let a = 10;
        let b = 20;
        work.postMessage({ a, b });

        work.on('message', d => {
            console.log(d);

            res.end(JSON.stringify(d));
        });

    }

});
server.listen(3000);
console.log('server listening on port 3000')

