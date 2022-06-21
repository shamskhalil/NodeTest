const http = require('http');

// /add/2/3
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application\json' });
    let url = req.url;
    console.log('REQUESTING >>> ', url);
    url = url.toLowerCase();
    let params = url.split('/');
    if (params.length != 4) {
        let r = {};
        r.error = "Inavlid request parameters !";
        res.end(JSON.stringify(r));
    } else {
        if (params[1] === 'add') {
            let a = parseInt(params[2]);
            let b = parseInt(params[3]);
            let r = {};
            r.a = a;
            r.b = b;
            r.sum = a + b;
            r.msg = `The sum of ${a} and ${b} is ${a + b}`
            res.end(JSON.stringify(r));
        } else {
            let r = {};
            r.error = "Inavlid request operation only add is accepted !";
            res.end(JSON.stringify(r));
        }
    }
});
server.listen(async () => {
    try {
        const { port, address } = server.address();
        console.log(`Add microservice is listening on port ${port}`);
        //register service with registry!
        let result = await makeRequest('register', 'add', 'localhost', port);
        console.log(`ADD Microservice Registration Result >> ${result}`);
        setInterval(async () => {
            let result = await makeRequest('update', 'add', 'localhost', port);
            console.log(`ADD Microservice regitry update >> ${result}`);
        }, 10 * 1000);
    } catch (err) {
        console.log(err);
    }

});


function makeRequest(command, operation, host, port) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            hostname: host,
            port: 3000,
            path: `/${command}/${operation}/${host}/${port}`,
        }
        const req = http.request(options, (res) => {
            let responseData = [];
            res
                .on('data', chunk => {
                    responseData.push(chunk);
                })
                .on('error', err => {
                    reject(err);
                })
                .on('end', () => {
                    let data = Buffer.concat(responseData);
                    data = data.toString();
                    resolve(data);
                })
        });
        req.end();
    });
}