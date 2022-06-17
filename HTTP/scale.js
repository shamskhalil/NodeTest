const { fork } = require('child_process');

let serverPorts = [];
http = require('http')
    .createServer((req, res) => {
        let port = req.url.split('/')[1];
        if (port != '') {
            port = parseInt(port) || 3000;
            if (!checkPortAvailable(serverPorts, port)) {
                fork('./http-scale', [port]);
                res.end(`A server on port ${port} is now live and waiting to serve requests!!`);
                serverPorts.push(port);
            } else {
                res.write(`Sorry you already have server running on port ${port}, please choose a different port!`);
                res.end(` Here is a list of server ports your server instances are running on: ${serverPorts}`);
            }
        } else {
            res.end('Please admin, enter a port number in your request.')
        }
    })
    .listen(9000)
console.log('Server scaler running on port 9000');



function checkPortAvailable(arr, port) {
    let ret = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === port) {
            ret = true;
            return ret;
        }
    }
    return ret;
}