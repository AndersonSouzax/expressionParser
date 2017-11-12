import Parser from './parser.js';

let isNumber = (number) => {
    return /[0-9]+/.test(number);
};

let isPar = (text) => {
    return text == ')' || text == '(';
}

let isOperator = (ope) => {
    let operators = ['*','/','+','-'];
    return operators.includes(ope);
};
