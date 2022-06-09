
divp(40, 2)
    .then(r => {
        console.log("number is now :", r);
        return divp(r, 2)
    })
    .then(r => {
        console.log("number is now :", r);
        return divp(r, 2)
    })
    .then(r => {
        console.log("number is now :", r);
        return divp(r, 2)
    })
    .then(r => {
        console.log("number is now :", r);
        return divp(r, 2)
    })
    .then(x => {
        console.log("RESULT >> ", x);
    })
    .catch(e => {
        console.log("Error>> ", e);
    })




function divp(a, b) {
    return new Promise((resolve, reject) => {
        if (b == 0) {
            reject("Division by zero not allowed!!!!");
        } else if (a == 10) {
            reject("Sorry i dont divide ten's")
        }
        else {
            resolve(a / b)
        }
    });
}