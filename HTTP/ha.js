const cluster = require('cluster');
const numCpus = require('os').cpus().length;


if (cluster.isMaster) {
    console.log('Master is running on process id: ', process.pid);
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        console.log('a Worker dies just now');
        cluster.fork();
    })
} else {
    console.log('Worker is running on process id: ', process.pid);
    require('./http-scale');

}