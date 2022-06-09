const { promisify } = require('util');
let divPromisify = promisify(divCallback);


log("First line");
divp(10, 2)
    .then(d => {
        log(d)
    })
    .catch(e => {
        log(e)
    });
/*
div(10, 0, (err, suc) => {
    if (err != null) {
        log(err);
    } else {
        log(suc);
    }
})
*/
log("Third line");



function divCallback(a, b, cb) {
    setTimeout(() => {
        if (b == 0) {
            cb("Error division by zero not allowed!", null);
        } else {
            cb(null, a / b)
        }
    }, 2000)
}



function divp(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (b == 0) {
                reject("Error division by zero not allowed!");
            } else {
                resolve(a / b)
            }
        }, 2000);
    })
}


function log(str) {
    console.log(str);
}