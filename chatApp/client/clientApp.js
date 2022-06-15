const Inputer = require('./inputer');
const ClientSock = require('./client-sock');

let myUsername = '';

const serverSock = new ClientSock('192.168.1.2', 9000);
serverSock.on('serverdata', data => {
    processServerData(data);
});

const inp = new Inputer();
inp
    .on('username', name => {
        myUsername = name;
    })
    .on('message', msg => {
        processInputData(msg);
    });









function processInputData(data) {
    data = data.toUpperCase();
    //check for or [ or :
    if (data.startsWith('[')) {
        //[shams]hello how are you doing
        const arr = data.split('[');
        const arr2 = arr[1].split(']');
        const recipient = arr2[0];
        const msg = arr2[1];
        const payl = `PMSG|${recipient}|${myUsername}|${msg}`;
        serverSock.sSock.write(Buffer.from(payl));
    } else if (data.startsWith(':')) {
        let command = data.split(':')[1];
        switch (command) {
            case 'LOGIN':
                const payload = `LOGIN ${myUsername}`;
                serverSock.sSock.write(Buffer.from(payload));
                break;
            case 'LOGOUT':

                break;
            case 'GETUSERS':
                const payload1 = `GETUSERS`;
                serverSock.sSock.write(Buffer.from(payload1));
                break;
            default:
                console.log('Invalid command, please try again!!');
        }
    } else {
        let payload = `msg|[${myUsername}] >> ${data}`;
        serverSock.sSock.write(Buffer.from(payload));
    }
}

function processServerData(data) {
    console.log(data);
}