const { Readable } = require('stream');

class BoyStream extends Readable {
    constructor(arr) {
        super({ encoding: 'utf-8' });
        this.arr = arr;
        this.idx = 0;
    }

    _read(chunk, encoding, callback) {
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

const boys = ['Aminu', 'Sani', 'James', 'John', 'Doe'];
const str = new BoyStream(boys);
str
    .on('data', chunk => console.log(chunk))
    .on('error', err => console.log(err))
    .on('end', () => console.log('done!!!'));


