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
        if (params[1] === 'div') {
            let a = parseInt(params[2]);
            let b = parseInt(params[3]);
            if (b == 0) {
                let r = {};
                r.error = "Division by zero not allowed !";
                res.end(JSON.stringify(r));
                return;
            }
            let r = {};
            r.a = a;
            r.b = b;
            r.result = a / b;
            r.msg = `${a} divide by ${b} is ${a / b}`
            res.end(JSON.stringify(r));
        } else {
            let r = {};
            r.error = "Inavlid request operation only add is accepted !";
            res.end(JSON.stringify(r));
        }
    }
});
server.listen(4003);
//const { port, address } = server.address();
console.log(`Division microservice is listening on port 4003`);