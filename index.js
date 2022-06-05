/*
let Calculator = require('./calc-funcs');
let myCalc = new Calculator();
console.log("add", myCalc.add(10, 5))
console.log("sub", myCalc.sub(10, 5))
console.log("mul", myCalc.mul(10, 5))
console.log("div", myCalc.div(10, 5))
*/

let Calculator = require('./calc-events');

let myCalc = new Calculator();
let count = 0;


myCalc.addListener('random', (d) => {
    if (count > 9) {
        myCalc.removeListener('random', () => {
            console.log('Ok no more random numbers !!! thanks')
        });
    } else {
        console.log("RAndom Number ", d)
    }
    count++;
})

myCalc.on('result', data => {
    console.log("RESULT >>> ", data);
});
myCalc.on('error', data => {
    console.log("ERROR >>> ", data);
});


myCalc.calculate('add', 10, 5);
myCalc.calculate('sub', 10, 5);
myCalc.calculate('div', 10, 5);
myCalc.calculate('mul', 10, 5);

