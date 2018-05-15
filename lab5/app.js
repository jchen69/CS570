var fs = require("fs");
var prompt = require("prompt-sync")();


function Node(value){
    this.value = value;
    this.leftchild = null;
    this.rightchild = null;
}
function SortedSet(){
    this.root = null;
}
SortedSet.prototype.isEmpty = function(){
    const root = this.root;
    if(!root){
        return true;
    }else{
        return false;
    }
}
SortedSet.prototype.add = function(value){
    let root = this.root;
    if(!root){
        this.root = new Node(value);
        return;
    }
    let current_node = root;
    let new_node = new Node(value);
    while(current_node){
        if(value<current_node.value){
            if(!current_node.leftchild){
                current_node.leftchild = new_node;
                break;
            }else{
                current_node = current_node.leftchild;
            }
        }else if(value>current_node.value){
            if(!current_node.rightchild){
                current_node.rightchild = new_node;
                break;
            }else{
                current_node = current_node.rightchild;
            }
        }else{
            break;
        }
    }
}
SortedSet.prototype.contains = function(value){
    let root = this.root;
    if(!root){
        return;
    }
    let current_node = root;
    while(current_node){
        if(current_node.value === value){
            return true;
            break;
        }else if(value<current_node.value){
            if(!current_node.leftchild){
                return false;
                break;
            }else{
                current_node = current_node.leftchild;
            }
        }else if(value > current_node.value){
            if(!current_node.rightchild){
                return false;
                break;
            }else{
                current_node = current_node.rightchild;
            }
        }
    }
}
SortedSet.prototype.remove = function(value){
    const removeNode = function(node,value){
        if(!node){
            return null;
        }
        if(value === node.value){
            if(!node.leftchild && !node.rightchild){
                return null;
            }
            if(!node.leftchild){
                return node.rightchild;
            }
            if(!node.rightchild){
                return node.leftchild;
            }
            let n = node.leftchild;
            while(n.rightchild){
                n = n.rightchild;
            }
            node.value = n.value;
            node.leftchild = removeNode(node.leftchild,n.value)
            return node;
        }else if(value < node.value){
            node.leftchild = removeNode(node.leftchild,value);
            return node;
        }else{
            node.rightchild = removeNode(node.rightchild,value);
            return node;
        }
    };
    this.root = removeNode(this.root,value);
}
function inorder(node){
    if(node){
        inorder(node.leftchild);
        console.log(node.value);
        inorder(node.rightchild);
    }
}

const infileText = fs.readFileSync(("infile.dat"), "utf8");
const infileArr = infileText.replace(/\s/g, '').split(",");
const s = new SortedSet();

for (let i in infileArr) {
    let number = Number(infileArr[i]);
    s.add(number);
}

const input = prompt("Input a value to search: ");
let inputNum = Number(input);
if (s.contains(inputNum)) console.log("Yes");
else console.log('No');
