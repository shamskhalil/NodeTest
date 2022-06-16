const { Transform, Readable } = require('stream');


class ChangeStream extends Transform {
    constructor(repl, replBy) {
        super({ encoding: 'utf-8' });
        this.replaceChar = repl;
        this.replaceBy = replBy;
    }

    _transform(chunk, encoding, callback) {
        let re = new RegExp(this.replaceChar, 'g');

        let str = (chunk.toString()).replace(re, this.replaceBy);
        this.push(str);
        callback()
    }

}

class Reader extends Readable {
    constructor(txt) {
        super({ encoding: 'utf-8' });
        this.txt = txt;
        this.idx = 0;
    }
    _read() {
        if (this.idx <= this.txt.length) {
            this.push(this.txt[this.idx]);
            this.idx++;
        } else {
            this.push(null);
        }

    }
}





let tr = new ChangeStream('e', 'x');
tr.on('data', d => console.log(d));
process.stdin.pipe(tr);