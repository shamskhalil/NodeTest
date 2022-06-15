const { createWriteStream } = require('fs');
const { PassThrough } = require('stream');

const writer = createWriteStream('myIO.txt');
const meter = new PassThrough();
let counter = 0;
meter.on('data', d => {
    counter = counter + d.length;
    console.log("Bytes read : ", counter);
})

writer.on('error', err => {
    console.log('Error writing to writer stream >>', err);
})

process.stdin.pipe(meter).pipe(writer)
