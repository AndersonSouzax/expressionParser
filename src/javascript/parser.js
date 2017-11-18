class Parser{

    static testExpression(exp){

		let it = 0, expLength = exp.length, finalValue = null;

		//getting the whole intern expression
		let getIntExp = (exp, index) => {
			let np = 1, end = 0, expLength = exp.length;

			//getting the expression's closing parenthesis
			for(let g=index+1;g < expLength;g++){
				if(exp[g].symbol == '('){ np++;}
				if(exp[g].symbol == ')'){ np--;}

				if(np == 0){
					end = g == expLength - 1 ? expLength - 1 : g;
					break;
				}
			}
			return end;
		};

        let recSolveExp = (exp) => {

            if(!/[0-9]/.test(exp)){
                return null;
            }

            while(exp.indexOf('(') != -1){

                let index  = exp.indexOf('(');
                let end = getIntExp(exp,index);

                let value =  recSolveExp( exp.substring( index + 1, end) );

                if(!value) { return null; }

                let oneSide = index != 0 ? exp.substring(0,index) : '';
                let otherSide = end != exp.length - 1 ? exp.substring(end + 1) : '';

                oneSide[oneSide.length] = value;

                exp = oneSide + otherSide;

            }

            while(/[\+\-\*\/]/.test(exp)){

                let operation = { 'sy' , '*', index : 0 };
                let right = '', left = '', rightSide = 0, leftSide = 0;
                let mat = null, value = null, end = 0;

                //Operation precedence
                if(exp.indexOf('*') != -1){

                     operation.sy = '*';
                     //Negative and non-negative numbers
                     mat = exp.match(/-?[0-9]+\s+\*\s+-?[0-9]+/ );
                     operation.index = mat.index;
                     operation.sub = mat[0];

                }else if(exp.indexOf('/') != -1){
                     operation.sy = '/';
                     mat = exp.match(/-?[0-9]+\s+\/\s+-?[0-9]+/ );
                     operation.index = mat.index;
                     operation.sub = mat[0];

                }else if(exp.indexOf('+') != -1){
                     operation.sy = '+';
                     mat = exp.match(/-?[0-9]+\s+\/\s+-?[0-9]+/ );
                     operation.index = mat.index;
                     operation.sub = mat[0];
                }else{
                    operation.sy = '-';
                    mat = exp.match(/-?[0-9]+\s+\-\s+-?[0-9]+/ );
                    operation.index = mat.index;
                    operation.sub = mat[0];
                }

                if(operation.sy == '-'){

                }else{

                    let sub = operation.sub.split(operation.sy);
                    right  = parseInt(sub[0]);
                    left   = parseInt(sub[1]);
                }

                switch (operation.sy) {
                    case '*':
                        value = right * left;
                        break;
                    case '+':
                        value = right + left;
                        break;
                    case '/':
                        if(left == 0){
                            return null;
                        }
                        value = right / left;
                        break;
                    case '-':
                        value = right - left;
                        break;
                }

                //Splicing the expression
                end = operation.index + (operation.sub.length - 1);
                rightSide = operation.index != 0 ? exp.substring(0,operation.index) : '';
                leftSide = end != exp.length - 1 ? exp.substring(end + 1) : '';

                rightSide[rightSide.length] = value;

                exp = rightSide + leftSide;
            }

            return exp;
        };

        //If there's some operation
		if(exp.some( x => /[\+\-\*\/]/.test(exp))){
			let inds = [], i = 0, pars = [];

			for(i;i < expLength; i++){
				if(/[\+\-\*\/]/.test(exp[i])){
					inds.push(i);
				}
			}
			i = inds.length - 1;

            //Checking for double operators (++,**,--,//) and incomplet expressions
			while(i != 0){
				if(inds[i] - inds[i-1] == 1 || i == expLength - 1 || exp[i+1] == ')'){
					return null;
				}
				i--;
			}

            return recSolveExp(exp);

		}else{
			console.log(exp);

            //If there are parenthesis
            if(/\(/.test(exp)){
                 /**
                 * Checking for ')('. No operations betweeen intern expressions ()
                 * and for 12(15). Numbers with no operations with intern expressions
                 */
                if(/\)\(/.test(exp) || /\)\s+\(/.test(exp) || /[0-9]\(/){
                    return false;
                }

                let mat = exp.match(/[0-9]/);

                if(mat){
                    let sub  = exp.substring(mat.index);
                    return sub.substring(0,sub.indexOf(')'));
                }
                return false;

            }else{
                return exp;
            }
		}

	}
}
