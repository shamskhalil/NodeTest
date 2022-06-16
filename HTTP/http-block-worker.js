const { parentPort } = require('worker_threads');



parentPort.on('message', d => {
    let { a, b } = d;
    for (let i = 0; i < 10000000000; i++) { }
    parentPort.postMessage({ a, b, sum: a + b });
});


