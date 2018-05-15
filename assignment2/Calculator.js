function calculator(queue){
    let eval = [];
    let t,topNum,nextNum,answer;
    while(queue.length != 0){
        t = queue[0];
        queue.shift();
        if(typeof t === 'number'){
            eval.unshift(t);
        }else{
            topNum = eval[0];
            eval.shift();
            nextNum = eval[0];
            eval.shift();
            switch(t){
                case'+':answer = nextNum + topNum;break;
                case'-':answer = nextNum - topNum;break;
                case'*':answer = nextNum * topNum;break;
                case'/':answer = nextNum / topNum;break;
                case'%':answer = nextNum % topNum;break;
            }
            eval.unshift(answer);
        }
    }
    return eval[0];
}

module.exports = {
    calculator: calculator
}
