const Readline = require('readline');
const { EventEmitter } = require('events');

class Inputer extends EventEmitter {
    constructor() {
        super();
        const thisClass = this;
        this.rl = Readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.#init();
    }

    #init() {
        this.rl.question('What is you username?: ', username => {
            username = username.trim();
            this.emit('username', username);
            this.#getInput();
        });
    }

    #getInput() {
        this.rl.question('', msg => {
            msg = msg.trim();
            this.emit('message', msg);
            this.#getInput();
        });
    }
}

module.exports = Inputer;