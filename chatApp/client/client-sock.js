const net = require('net');
const { EventEmitter } = require('events');

class ClientSock extends EventEmitter {
    constructor(host, port) {
        super();
        this.sSock = net.createConnection(port, host);
        this.sSock
            .on('ready', () => {
                console.log('Connected to Server!');
            })
            .on('data', (data) => {
                data = data.toString();
                this.emit('serverdata', data);
            })
            .on('error', err => {
                console.log('Server Socket Error >> ', err);
            });
    }
}

module.exports = ClientSock;