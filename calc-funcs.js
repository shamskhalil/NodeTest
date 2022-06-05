class Calculator {
    constructor() { }

    add(a, b) {
        return a + b;
    }

    sub(a, b) {
        return a - b;
    }

    mul(a, b) {
        for (let i = 0; i < 10000000000; i++) { }
        return a * b;
    }

    div(a, b) {
        return a / b;
    }
}

module.exports = Calculator;