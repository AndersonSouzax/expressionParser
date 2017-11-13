class Parser{

    static testExpression(exp){

		let it = 0, expLength = exp.length, finalValue = null;

		let acepTypes = ['identifier','functionIdentifier',
						 'actualParameter','unsignedNumber',
						 'functionCall','sign'];

		//testting expression in a recursive way
		let recTestExp = (index,expLength) => {
			let np = 1;
			let end = 0;
			//getting the expression's closing parenthesis
			for(let g=index+1;g < expLength;g++){
				if(exp[g].symbol == '('){ np++;}
				if(exp[g].symbol == ')'){ np--;}

				if(np == 0){
					end = g == expLength - 1 ? expLength - 1 : g;
					break;
				}
			}
			return testExpression(exp.slice(index + 1,end)) ? end : false;
		};

		if(exp.some( x => x.class.includes('Operator'))){
			let inds = [], i = 0;

			for(i;i < expLength; i++){
				if(exp[i].class.includes('Operator')){
					inds.push(i);
				}
			}
			i = inds.length - 1;
			while(i != 0){
				if(inds[i] - inds[i-1] == 1){
					throw new Error('Invalid double operator in expression at token: ' + exp[i].symbol);
				}
				i--;
			}

			for(i=0;i < expLength; i++){
				if(inds.includes(i)){
					if(i == expLength - 1 || exp[i+1] == ')'){
						throw new Error('Missing another operator in Expression at token: ' + exp[i].symbol);
					}
					continue;
				}
				if(!acepTypes.includes(exp[i].class)){
					if(exp[i].subclass == 'ExpressionParenthesisOPen'){
						let rr = recTestExp(i,expLength);
						if(rr){
							i = rr;
						}else{
							return false;
						}
					}else{
						throw new Error('Invalid type in expression at token: ' + exp[i].symbol);
					}
				}
			}
			return true;
		}else{
			console.log(exp);
			for(it;it < expLength; it++){
				debugger;
				if(!acepTypes.includes(exp[it].class)){
					if(exp[it].subclass == 'ExpressionParenthesisOPen'){
						let rr = recTestExp(it,expLength);
						if(rr){
							it = rr;
						}else{
							return false;
						}
					}else{
						throw new Error('Invalid type in expression at token: ' + exp[it].symbol);
					}
				}
			}
			return true;
		}

	}
}

export default Parser;
