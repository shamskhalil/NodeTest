const http = require('http');
const registry = require('./registry');



const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application\json' });
    let url = req.url;
    if ((url.split('/')).length == 5) {
        doHouseKeep(url, res);
    } else {
        doCalculations(url, res);
    }
});
server.listen(3000);

console.log(`Calcultor App is listening on port 3000`);

async function doHouseKeep(url, res) {
    // /register/operation/host/port
    // /update/operation/host/port
    url = url.toLowerCase();
    const arr = url.split('/');

    const command = arr[1]
    const operation = arr[2];
    const host = arr[3];
    const port = parseInt(arr[4]);

    switch (command) {
        case 'register':
            registry.registerService(operation, host, port);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ registered: 'true' }));
            break;
        case 'update':
            registry.updateServiceInRegister(operation, host, port);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ registryRecord: 'updated' }));
            break;
        default:
            console.log('invalid/unknown registry operation');
    }


}

async function doCalculations(url, res) {
    // /add/1/2

    try {
        url = url.toLowerCase();
        const arr = url.split('/');
        if (arr.length == 4) {
            const operation = arr[1]
            const a = parseInt(arr[2]);
            const b = parseInt(arr[3]);

            let microserviceDetails = registry.getService(operation);
            //console.log('Microservice details >> ', microserviceDetails);
            if (microserviceDetails) {
                let result = await makeRequest(microserviceDetails.host, microserviceDetails.port, operation, a, b);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(result);
            } else {
                res.end(JSON.stringify({ error: operation + ' microservice not online at the moment!' }));
            }
        } else {
            res.end(JSON.stringify({ error: ' invalid calculator operation' }));
        }
    } catch (err) {
        console.log(err);
    }
}




function makeRequest(host, port, operation, a, b) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            hostname: host,
            port: port,
            path: `/${operation}/${a}/${b}`,
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