const Readline = require('readline');


let rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

getInput();

function getInput() {
    rl.question("Type message: ", (msg) => {
        console.log(`sending to server ${msg}`);
        getInput();
    })
}







