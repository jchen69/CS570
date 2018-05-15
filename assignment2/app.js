const prompt = require('prompt-sync')();
const convert = require('./conversion.js');
const calculator = require('./calculator.js');

const pattern = /[\+\-\*\/]/;

let infixProblemString = prompt("Enter the infix math problem you want to calculate: ");
let infixProblem = [];
let tempString = "";
let tempNumber = 0;


for(let i = 0; i < infixProblemString.length; i++) {
	if(!isNaN(infixProblemString[i]) || infixProblemString[i] === ".") {
		tempString = tempString + infixProblemString[i];
	} else {
		if(pattern.test(infixProblemString[i])) {
			if(tempString !== "" && tempString.indexOf('.') !== -1) {
				tempNumber = parseFloat(tempString);
				infixProblem.push(tempNumber);
				infixProblem.push(infixProblemString[i]);
				tempString = "";
			} else if(tempString !== "" && tempString.indexOf('.') === -1) {
				tempNumber = parseInt(tempString);
				infixProblem.push(tempNumber);
				infixProblem.push(infixProblemString[i]);
				tempString = "";
			}
		}
	}

	if(i === (infixProblemString.length - 1) && tempString !== "") {
		tempNumber = parseInt(tempString);
		infixProblem.push(tempNumber);
	}
}

let postfix = convert.convertInfixToPostfix(infixProblem);

console.log(postfix);

let result = calculator.calculator(postfix);

console.log("The result is: " + result);
