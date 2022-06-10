const net = require('net');
const { EventEmitter } = require('events')

class SockServer extends EventEmitter {
    constructor(host, port) {
        super();
        this.userSockets = [];
        this.usersOnline = 0;
        this.host = host;
        this.port = port;
        this.init();
    }

    init() {



        let server = net.createServer((clientSocket) => {
            let thisClass = this;

            clientSocket
                .on('data', function (data) {
                    data = data.toString();
                    let id = this.clientChatId;
                    let obj = { msg: data, clientId: id };
                    thisClass.emit('clientdata', obj);
                })

                .on('error', err => {
                    console.log("ClientSocket Error >> ", err);
                })

                .on('end', function () {
                    let ccid = this.clientChatId;
                    delete thisClass.userSockets[ccid];
                    thisClass.usersOnline--;
                    console.log("client disconnects ", ccid);
                    console.log(`We now have ${thisClass.usersOnline} user(s) online at the moment`)
                });

            clientSocket.clientChatId = this.usersOnline;
            this.userSockets[this.usersOnline] = clientSocket;
            this.usersOnline++;
            console.log(`User with ip address ${clientSocket.remoteAddress} connected to us!`);
            clientSocket.write(Buffer.from(`There are ${this.usersOnline} user(s) online now!\n`));
        });
        server.listen(this.port, this.host);
        console.log(`Server running at tcp://${this.host}:${this.port}`);
    }

    broadcast(msg, clientChatId) {
        msg = msg + "\n";
        msg = Buffer.from(msg);
        this.userSockets.forEach((cSocket) => {
            if (cSocket.clientChatId !== clientChatId) {
                cSocket.write(msg);
            }
        })
    }
}
module.exports = SockServer;