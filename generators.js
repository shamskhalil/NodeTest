let count = 0;

function* counter() {
    while (true) {
        count++;
        yield count;
    }
}

let iCounter = counter();
while (true) {
    let harvest = iCounter.next();
    if (harvest.done != true) {
        console.log(harvest.value);
    } else {
        break;
    }
}

/*


function* login() {
    //user info
    yield { name: 'Shams', sex: 'Male' }
    // user picture
    yield 'shamspicture.jpg'
    // user history
    yield '07-06-2022, 05-06-2022'
}
let iLogin = login();
while (true) {
    let harvest = iLogin.next();
    if (harvest.done != true) {
        console.log(harvest.value);
    } else {
        break;
    }
}
*/