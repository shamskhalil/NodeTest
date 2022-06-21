

let obj = { a: 1, c: () => { console.log('hi') } }


let [a, b] = Object.values(obj);
let c = b.toString();

let x = {}
x.a = c;
let ser = JSON.stringify(x);
console.log(ser);




