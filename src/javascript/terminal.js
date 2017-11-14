//import Parser from './parser.js';

/* Função Criada Para Testar o Evento onkeydown */
function teste(event){
    var valor = event.key; // = document.getElementById('input').value;
    //alert('Entrou na Função' + valor);
    if(valor == 'Backspace' || valor == 'Control' || valor == 'Alt' || valor == 'Tab' || valor == 'CapsLock' || valor == 'Enter'){
        document.getElementById('num').innerHTML = 'Números';
        document.getElementById('ope').innerHTML = 'Operadores';
        document.getElementById('cha').innerHTML = 'Caracteres';
    }else if (isNumber(valor)) {
        document.getElementById('num').innerHTML = valor;
    }else if(isOperator(valor)){
        document.getElementById('ope').innerHTML = valor;
    }else{        
        document.getElementById('cha').innerHTML = valor;
    }
}

let globalExpression = "", oldGlobalExpression = "";

let intervalFunction = () => {

    if(globalExpression != oldGlobalExpression){

        let body = document.body;

        if( parenTest(globalExpression) ){

            let res = Parser.testExpression(globalExpression);

        }else{
            if(body.classList.contains('valid-exp')){
                body.classList.remove('valid-exp');
            }
            body.classList.add('invalid-exp');
        }
    }
};

//Digest cycle, like angular
setInterval(intervalFunction, 500);


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

let parenTest = (exp) => {

    if(exp.includes('(')){
        if(exp.includes(')')){
            //Checking if '(' appears same number of times as ')'
            if(cont.match(/\(/g).length != cont.match(/\)/g).length){
                return false;
            }else{

                let open = [];
                let iter = 0;
                while(iter != exp.length){
                    if(exp[iter] == '('){
                        open.push('(');
                        iter++;
                    }else if(exp[iter] == ')'){
                        if(open.length < 1){
                            return false;
                        }else{
                            open.pop();
                            iter++;
                        }
                    }else{
                        iter++;
                        continue;
                    }
                }
            }
        }else{
            return false;
        }
    }
    return true;
};
