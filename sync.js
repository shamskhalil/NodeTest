const fs = require('fs');
const { promisify } = require('util');

let myReadFile = promisify(fs.readFile);

try {
    console.log("First line");
    myReadFile('./hello.txt')
        .then(fileContent => {
            console.log(fileContent.toString());
        })
        .catch(err => {
            console.log("Error>>> ", err)
        })
    /*
    fs.readFile('./hell.txt', (err, fileContent) => {
        if (err != null) {
            console.log("Error >> ", err);
        } else {
            console.log(fileContent.toString());
        }
    });
    */

    console.log("Second line");
    console.log("Third line");
} catch (err) {

}
