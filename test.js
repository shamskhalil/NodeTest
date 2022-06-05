const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('shams', data => {
    console.log(data)
})

emitter.emit('shams', 200)
