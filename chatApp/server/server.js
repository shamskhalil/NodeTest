const SockServer = require('./sock-server');

let server = new SockServer('0.0.0.0', 9000);

server.on('clientdata', data => {
    let { msg, clientId } = data;
    server.broadcast(msg, clientId);
});