const prompt = require('prompt-sync')();

const queue = {front:null,last:null,length:0};
const size = 12;
function Node(data,next){
    this.data = data;
    this.next = next;
}
function addValue(value){
    let new_node = new Node(value,null);
    if(queue.length<size){
        if(queue.front == null){
            queue.front = new_node;
        }else{
            queue.last.next = new_node;
        }
        queue.last = new_node;
        queue.last.next = queue.front;
        queue.length++;
    }else if(queue.length ==size){
        queue.front.data = value;
        queue.length++;
    }else{
        let rewrite_node = queue.front;
        for(let i=1;i<=queue.length-size;i++){
            rewrite_node = rewrite_node.next;
        }
        rewrite_node.data = value;
        queue.length++;
    }
}
function display(queue){
    let n = queue.front;
    while(n.next != queue.front){
        console.log(n.data);
        n = n.next;
    }
    console.log(n.data);
}
function main(){
    while(true){
        const getInput = prompt('Please enter a string or quit  ');
        if(getInput ==='quit'){
        display(queue);
        break;
        }else{
            addValue(getInput);
        }
    }
}
main();