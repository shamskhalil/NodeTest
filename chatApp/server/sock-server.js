const net = require('net');
const { EventEmitter } = require('events')

class SockServer extends EventEmitter {
    constructor(host, port) {
        super();
        this.userSockets = [];
        this.usernames = [];

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
                    //data = data.toUpperCase();
                    //check if it is a command from the client
                    if (data.startsWith('LOGIN')) {
                        const username = data.split(' ')[1];
                        console.log(`${username} logged in`);
                        thisClass.usernames[this.clientIndex] = username;
                        this.username = username;
                        this.write(Buffer.from(`Welcome ${username}, we hope you will have a pleasant time here!!\n`));
                        thisClass.broadcast(Buffer.from(`${username} just logged in!\n`), this.clientIndex);
                    } else if (data.startsWith('LOGOUT')) {

                    } else if (data.startsWith('GETUSERS')) {
                        console.log(`fetching list users online ...: `, thisClass.usernames.join(','));
                        this.write(Buffer.from(thisClass.usernames.join(',')));
                    } else if (data.startsWith('MSG')) {
                        let id = this.clientIndex;
                        let msg = data.split('|')[1];
                        thisClass.broadcast(msg, id);
                    } else if (data.startsWith('PMSG')) {
                        //pmsg|recipient|sender|msg
                        const arr = data.split('|');
                        const recipient = arr[1];
                        const sender = arr[2];
                        const msg = arr[3]
                        const payload = `[${sender}]>>[${recipient}]: ${msg}`;
                        thisClass.privateChat(payload, recipient);
                    }
                })

                .on('error', err => {
                    console.log("ClientSocket Error >> ", err);
                })

                .on('end', function () {
                    let ccid = this.clientIndex;
                    delete thisClass.userSockets[ccid];
                    delete thisClass.usernames[ccid];
                    thisClass.usersOnline--;
                    if (this.username) {
                        console.log(`${this.username} disconnects from chat!`);
                    } else {
                        console.log('Client disconnets with index id: ', ccid)
                    }
                    console.log(`We now have ${thisClass.usersOnline} user(s) online at the moment`)
                });

            clientSocket.clientIndex = this.usersOnline;
            this.userSockets[this.usersOnline] = clientSocket;
            this.usersOnline++;
            console.log(`User with ip address ${clientSocket.remoteAddress} connected to us!`);
            clientSocket.write(Buffer.from(`There are ${this.usersOnline} user(s) online now!\n`));
        });
        server.listen(this.port, this.host);
        console.log(`Server running at tcp://${this.host}:${this.port}`);
    }

    broadcast(msg, clientIndex) {
        msg = msg + "\n";
        msg = Buffer.from(msg);
        this.userSockets.forEach((cSocket) => {
            if (cSocket.clientIndex !== clientIndex) {
                cSocket.write(msg);
            }
        })
    }
    privateChat(msg, username) {
        msg = msg + "\n";
        msg = Buffer.from(msg);
        this.userSockets.forEach((cSocket) => {
            if (cSocket.username === username) {
                cSocket.write(msg);
            }
        })
    }
}
module.exports = SockServer;