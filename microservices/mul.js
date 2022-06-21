const http = require('http');

// /add/2/3
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application\json' });
    let url = req.url;
    url = url.toLowerCase();
    let params = url.split('/');
    if (params.length != 4) {
        let r = {};
        r.error = "Inavlid request parameters !";
        res.end(JSON.stringify(r));
    } else {
        if (params[1] === 'mul') {
            let a = parseInt(params[2]);
            let b = parseInt(params[3]);
            let r = {};
            r.a = a;
            r.b = b;
            r.product = a * b;
            r.msg = `The product of ${a} and ${b} is ${a * b}`
            res.end(JSON.stringify(r));
        } else {
            let r = {};
            r.error = "Inavlid request operation only add is accepted !";
            res.end(JSON.stringify(r));
        }
    }
});
server.listen(4002);
//const { port, address } = server.address();
console.log(`Multiplication microservice is listening on port 4002`);