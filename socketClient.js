const net = require('net');

let args = process.argv;
let payload = [];
let PORT = 9000;
let HOST = "localhost";
if (args.length > 3) {
    PORT = parseInt(args[2]);
    HOST = args[3];
    for (let i = 4; i < args.length; i++) {
        payload.push(args[i].trim());
    }
}
let done = 0;
let serverSocket = net.createConnection(PORT, HOST);
serverSocket
    .on('ready', () => {
        console.log('Connected to server!');
        serverSocket.write(Buffer.from(payload[0]));
    })
    .on('data', (d) => {
        done++;
        console.log(d.toString());
        if (done <= args.length - 5) {
            serverSocket.write(Buffer.from(payload[done]));
        }
    })
    .on('error', (err) => {
        console.log("Erorr >>> ", err)
    })