const net = require('net');
let args = process.argv;
let PORT = 9000;
if (args.length >= 2) {
    PORT = parseInt(args[2]) || 9000;
    console.log('parses port as :', PORT)
}
let server = net.createServer((clientSocket) => {
    console.log("Client connected to us!");
    console.log(clientSocket.remoteAddress);
    clientSocket
        .on('error', (err) => {
            console.log("Error >> ", err)
        })
        .on('data', (data) => {
            data = data.toString();
            processIncoming(clientSocket, data);
        })
        .on('ready', () => {
            console.log("Client ready to communicate!")
        })
});

function processIncoming(clientSocket, commandPayload) {
    commandPayload = commandPayload.toLowerCase();
    commandPayload.trim();
    let command;
    if (commandPayload.startsWith('quit')) {
        command = 'quit';
    } else {
        command = commandPayload.split('#')[0];
    }

    switch (command) {
        case 'add':
            let params = commandPayload.split('#')[1];//10,20
            let a = parseInt(params.split(',')[0]);
            let b = parseInt(params.split(',')[1]);
            let sum = a + b;
            let response = `The sum of ${a} and ${b} is ${sum}\n`;
            clientSocket.write(Buffer.from(response));
            break;

        case 'quit':
            clientSocket.write(Buffer.from("Bye, bye to you!\n"));
            setTimeout(() => {
                clientSocket.destroy();
            }, 1000)
            break;
        default:
            clientSocket.write(Buffer.from("Sorry, didn't understand that!\n"));

    }
}


server.listen(PORT, "0.0.0.0")
console.log(`TCP server Listening on port ${PORT}`);