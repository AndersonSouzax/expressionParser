class Parser{

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

    // //testting expression in a recursive way
    // let recTestExp = (index,expLength) => {
    //     let np = 1;
    //     let end = 0;
    //     //getting the expression's closing parenthesis
    //     for(let g=index+1;g < expLength;g++){
    //         if(exp[g].symbol == '('){ np++;}
    //         if(exp[g].symbol == ')'){ np--;}
    //
    //         if(np == 0){
    //             end = g == expLength - 1 ? expLength - 1 : g;
    //             break;
    //         }
    //     }
    //     return testExpression(exp.slice(index + 1,end)) ? end : false;
    // };
    //
    // let isExpression = (cont) => {
    //
    //     let jump = 1;
    //     let it = 0;
    //
    //     if(cont.includes('(')){
    //
    //         if(cont.includes(')')){
    //             //Checking if '(' appears same number of times as ')'
    //             if(cont.match(/\(/g).length != cont.match(/\)/g).length){
    //                 throw new Error('Missing parenthesis in Expression' + message(pos));
    //             }else{
    //                 let open = [];
    //
    //                 while(it != cont.length){
    //                     if(cont[it] == '('){
    //                         open.push('(');
    //                         it++;
    //                     }else if(cont[it] == ')'){
    //                         if(open.length < 1){
    //                             throw new Error('Misuse of parenthesis in Expression' + message(pos));
    //                         }else{
    //                             open.pop();
    //                             it++;
    //                         }
    //                     }else{
    //                         it++;
    //                         continue;
    //                     }
    //                 }
    //                 if(cont[0] == '('){
    //                     insertToken('(','parenthesis','ExpressionParenthesisOPen',[pos[0],pos[1] + jump]);
    //                     it = 1;
    //                 }
    //             }
    //         }else{
    //                 throw new Error('Invalid Expression' + message(pos));
    //         }
    //     }
    //     let token = 0;
    //     console.log('tamanho do cont: ' + cont.length);
    //     while(it != cont.length){
    //         console.log('char da vez ' + it);
    //
    //         if(cont[it] != ' '){
    //             console.log('char...' + cont[it] + 'no it: '  + it);
    //             console.log('it..' + it);
    //             if(it != cont.length - 1){
    //                 console.log('symbol: ' + cont[it]);
    //             }
    //             console.log('index: ' + index);
    //             token = justToken(index + it);
    //
    //             console.log('token: ' + token);
    //             if(cont[it] == '('){
    //
    //                 //getting only the content, without the parenthesis
    //                 let sub = cont.substring(it + 1,cont.indexOf(')'));
    //
    //                 //getting the nested possible expression including parenthesis
    //                 let intSub = cont.substring(it);
    //                 let otherSub = intSub.substring(0,intSub.indexOf(')') + 1);
    //
    //                 if(sub != ''){
    //                     if(lastToken().class == 'identifier'){
    //
    //                     let res = isFunctionCall(sub,[pos[0],pos[1] + it],index + it);
    //                     console.log('isFunctionCall???..' + res);
    //
    //                         if(res){
    //                             jump += res;
    //                             it += res;
    //                         }else{
    //                             throw new Error('invalid functionCall' + message(pos));
    //                         }
    //                     }else{
    //                         let re = isExpression(otherSub,[pos[0],pos[1] + it],index + it);
    //                         if(re){
    //                             jump += re;
    //                             it += re;
    //                         }else{
    //                             throw new Error('invalid type in Expression' + message(pos));
    //                         }
    //                     }
    //                 }else{
    //                     throw new Error('Invalid Empty Expression' + message(pos));
    //                 }
    //             }else if(cont[it] == ')'){
    //                 insertToken(')','parenthesis','ExpressionParenthesisClose',[pos[0],pos[1] + it]);
    //                 it++;
    //                 return it;
    //             }else if(isIdentifier(token)){
    //                 insertToken(token,'identifier','ExpressionIdentifier',[pos[0],pos[1] + it]);
    //                 it+= token.length;
    //             }else if(isOperator(token)){
    //                 //Checking if is an operation or signing
    //                 let opt = isSign(token) ? 'sign' : isOperator(token);
    //                 let sub = opt == 'sign' ? 'numberSign' : 'ExpressionOperator';
    //
    //                 insertToken(token,opt,sub,[pos[0],pos[1] + it]);
    //                 it += token.length;
    //                 if([';',')'].includes(code[it])){
    //                     throw new Error('Missing another operator in Expression' + message(pos));
    //                 }
    //             }else if(isNumber(token)){
    //                 let cl = tokensTable.length != 0 && lastToken().class != 'sign' ?
    //                          'unsignedNumber' : 'number';
    //                 insertToken(token,cl,'ExpressionNumber',[pos[0],pos[1] + it]);
    //                 it+= token.length;
    //             }else{
    //                 throw new Error('invalid type in Expression' + message(pos));
    //             }
    //         }else{
    //             it++;
    //             continue;
    //         }
    //     }
    //     return it;
    // };

}
