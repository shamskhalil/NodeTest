let payload = [
    [20, 4], [30, 3], [100, 5], [10, 0], [100, 25], [300, 45]
]

let promiseStore = [];
payload.forEach(obj => {
    promiseStore.push(divp(obj));
});


Promise.race(promiseStore)
    .then(arrResults => {
        console.log(arrResults);
    })
    .catch(e => {
        console.log(e);
    });




/*
Promise.all(promiseStore)
    .then(arrResults => {
        console.log(arrResults);
    })
    .catch(e => {
        console.log(e);
    });
    */

/*
for (let i = 0; i < payload.length; i++) {
    divp(payload[i])
        
}
*/






function divp(arr) {
    let [a, b] = arr;
    console.log(`Dividing ${a} by ${b}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (b == 0) {
                reject("Division by zero not allowed!!!!");
            } else {
                resolve(a / b)
            }
        }, Math.ceil(Math.random() * 1000));

    });
}