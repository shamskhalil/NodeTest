
const http = require('http');

let port = parseInt(process.argv[2]) || 3000;
let serverId = getId();
const server = http.createServer((req, res) => {
    if (req.url === '/killme') {
        res.end(`server with id ${serverId} is now dead!`);
        process.exit();
    } else {
        res.end(`Hello there from server with id ${serverId}`);
    }

});
server.listen(port);
console.log(`server listening on port ${port}`);

function getId() {
    const alpa = ['A', 'C', 'D', 'E', 'F', 'G', 'K', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let id = '';
    for (let i = 0; i < 6; i++) {
        id = id + alpa[Math.ceil(Math.random() * 16)];
    }
    return id;
}
