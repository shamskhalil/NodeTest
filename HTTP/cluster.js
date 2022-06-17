const cluster = require('cluster');
const numCpus = require('os').cpus().length;


if (cluster.isMaster) {
    console.log('Master is running on process id: ', process.pid);
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }
} else {
    console.log('Slave is running on process id: ', process.pid);
    require('./http-scale');

}