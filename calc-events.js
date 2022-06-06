let events = require('events');

class EventCalculator extends events.EventEmitter {
    constructor() {
        super()
        setInterval(() => {
            this.emit('random', Math.ceil(Math.random() * 10000))
        }, 1000)
    }

    calculate(command, a, b) {
        switch (command) {
            case 'add':
                this.emit('result', { op: 'add', value: a + b })
                break;
            case 'sub':
                this.emit('result', { op: 'sub', value: a - b })
                break;
            case 'mul':
                this.emit('result', { op: 'mul', value: a * b })
                break;
            case 'div':
                if (b == 0) {
                    this.emit('error', `${b} is zero and division tends to infinty!!!`)
                } else {
                    this.emit('result', { op: 'div', value: a / b })
                }
                break;
        }
    }
}
module.exports = EventCalculator;