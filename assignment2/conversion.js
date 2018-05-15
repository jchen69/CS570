convertInfixToPostfix = (infixQ) => {
    let postfixQ = [];
    let opStack = [];
    let t = '';

    while (infixQ.length > 0) {
        t = infixQ.shift();

        if (!isNaN(t)) {
            postfixQ.push(t);
        }
        else if (opStack.length < 1) {
            opStack.push(t);
        }
        else if (t === '(') {
            opStack.push(t);
        }
        else if (t === ')') {
            while (opStack[opStack.length-1] !== '(') {
                postfixQ.push(opStack.pop());
            }
            opStack.pop();
        }
        else {
            while (opStack.length > 0 && opStack[opStack.length-1] != '(' && getPrecedence(t) <= getPrecedence(opStack[opStack.length-1])) {
                postfixQ.push(opStack.pop());
            }
            opStack.push(t);
        }
    }

    while (opStack.length > 0) {
        postfixQ.push(opStack.pop());
    }

    return postfixQ;
}


getPrecedence = (operater) => {
    if (operater === '+' || operater === '-') return 1;

    if (operater === '*' || operater === '/' || operater === '%') return 2;

    if (operater === '(' || operater === ')') return 3;
}

module.exports = {
    convertInfixToPostfix: convertInfixToPostfix
}