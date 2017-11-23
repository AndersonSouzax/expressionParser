let globalExpression = "", oldGlobalExpression = "";
let box = document.getElementById('textBox');
let expBox = document.getElementById('expResult');

let setResult = (res) => {
    expBox.innerHTML = res;
};

let changeBodyColor = (valid) => {
    let body = document.body;
    let addClass = valid ? 'valid-exp' : 'invalid-exp';
    let removeClass = valid ? 'invalid-exp' : 'valid-exp';

    if(body.classList.contains(removeClass)){
        body.classList.remove(removeClass);
    }

    body.classList.add(addClass);
};

let filter = (event) => {

    let value = event.key;

    if(isPar(value) || isNumber(value) || isOperator(value) || value == 'Backspace'){

        if(expBox.innerHTML != ''){
            expBox.innerHTML = '';
        }

        setTimeout( () => {

            let content = box.value.trim();

            if(/[a-zA-Z\@\#\$\%\&\!\?\;\.\,]/.test(content)){
                if(!document.body.classList.contains('invalid-exp')){
                    changeBodyColor(false);
                }
                return;
            }
            globalExpression = content;

            intervalFunction();

        },500);

    }else if(!['Home','End','Alt', 'ArrowRight', 'ArrowLeft'].includes(value)){

        if(expBox.innerHTML != ''){
            expBox.innerHTML = '';
        }

        changeBodyColor(false);
    }
};

let intervalFunction = () => {

    //If there is no expression, then clear the screen
    if(globalExpression.length == 0){

        document.body.classList.remove('valid-exp');
        document.body.classList.remove('invalid-exp');

        return;
    }

    let last = globalExpression[globalExpression.length - 1] || globalExpression[0];

    //Checking syntax of expression on last element
    if(last == '(' || isOperator(last)){
        changeBodyColor(false);
        return;
    }

    //If there's only numbers, no operations
    if(! /[\(\)]/.test(globalExpression) && ! /[\+\-\/\*]/.test(globalExpression)){
        setResult(globalExpression);
        return;
    }

    if(globalExpression != oldGlobalExpression){

        let body = document.body;

        if( parenTest(globalExpression) ){

            let res = Parser.testExpression(globalExpression);

            if(res){
                changeBodyColor(true);
                setResult(res);
                oldGlobalExpression = globalExpression;
            }else{
                changeBodyColor(false);
            }
        }else{
            changeBodyColor(false);
        }
    }
};

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
            if(exp.match(/\(/g).length != exp.match(/\)/g).length){
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
