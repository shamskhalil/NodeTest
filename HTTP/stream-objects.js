const { Readable } = require('stream');

class BoyStream extends Readable {
    constructor(arr) {
        super({ objectMode: true });
        this.arr = arr;
        this.idx = 0;
    }

    _read() {
        if (this.idx < this.arr.length) {
            setTimeout(() => {
                this.push(this.arr[this.idx]);
                this.idx++;
            }, 2000);
        } else {
            this.push(null);
        }
    }
}

const boys = [
    { name: 'Aminu', sex: 'Male' },
    { name: 'Sani', sex: 'Male' },
    { name: 'James', sex: 'Male' },
    { name: 'John', sex: 'Male' },
    { name: 'Doe', sex: 'Male' }
];
const str = new BoyStream(boys);
str
    .on('data', chunk => console.log(chunk))
    .on('error', err => console.log(err))
    .on('end', () => console.log('done!!!'));


