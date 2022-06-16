const { createReadStream, createWriteStream } = require('fs');
const rd = createReadStream('./dre.mp4');
const wr = createWriteStream('./dre-copy.mp4');

rd.on('data', d => {
    console.log("Size of chunk : ", d.length);
    let pourMore = wr.write(d);
    if (!pourMore) {
        rd.pause();
        console.log('oops stop, funnel filed up!');
    }
});

rd.on('end', () => {
    console.log('Water source finished!');
    wr.end();
})

wr.on('drain', () => {
    console.log('Drained, pls pour more!');
    rd.resume();
})
