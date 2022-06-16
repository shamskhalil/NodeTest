const { fork } = require('child_process');

let ports = [3000, 3001, 3002, 3003];
ports.forEach(p => {
    fork('./http-scale', [p]);
})