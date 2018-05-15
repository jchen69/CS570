var fs = require("fs");
var prompt = require("prompt-sync")();
var path = require("path");


const inputText = getInput();
const text = inputText.replace(/[^\w\s]/g, '').replace(/\s+/g, '');
let CodeTable = {};
let fre_table = [];
let frequencyTable = getFrequency(text);
let forest = sortFreqency(frequencyTable);
let result = HuffmanTree(forest);
let result2 = encoding(result[0], '');
let totalBits = 0;

let frequencyResult = 'Symbol	frequency';
for (let i in fre_table) {
    frequencyResult = frequencyResult + '\n  ' + fre_table[i][0] + '      ' + fre_table[i][1] + '%';
}

let sortedKeys = sortedCodes(result2);
let huffmanCodes = 'Symbol	Huffman Codes';
for (let i of sortedKeys) {
    huffmanCodes = huffmanCodes + '\n  ' + i + '      ' + result2[i];
}

for(let i = 0; i < text.length; i++) {
    for(var j in result2) {
        if(text[i] === j.toString()) {
            totalBits = totalBits + result2[j].length;
        }
    }
}

let outputText = frequencyResult + '\n\n' + huffmanCodes + '\n\n' + "Total Bits: " + totalBits;

var outputFilePath = prompt('Input the output file path: ');
fs.writeFileSync(path.join(outputFilePath, 'outfile.dat'), outputText);



function getInput() {
    const inputFilePath = prompt("Please input the input file path: ");
    let originalText;
    try {
        originalText = fs.readFileSync(path.join(inputFilePath, "infile.dat"), "utf8");
        return originalText;
    } catch (e) {
        console.log("Error: no such file or directory");
        return getInput();
    }
}

function getFrequency(text) {
    let frequencyTable = {};
    for (let i = 0; i < text.length; i++) {
        if (frequencyTable[text.charAt(i)] == undefined) {
            frequencyTable[text.charAt(i)] = 1;
        }
        else {
            frequencyTable[text.charAt(i)] = frequencyTable[text.charAt(i)] + 1;
        }
    }
    return frequencyTable;
}

function sortFreqency(frequencyTable) {
    let forest = [];
    let  n = 1;
    for (let i in frequencyTable) {
        let fre = parseFloat((frequencyTable[i] / text.length * 100).toFixed(2));
        let node = new tree_node(i,fre,null,null,null,null,n)
        forest.push(node);
        n++;
        let sym_info = [i,fre];
        fre_table.push(sym_info);
    }
    fre_table.sort((a,b) =>(b[1]-a[1]));
    forest.sort((a, b) => a.frequency- b.frequency);
    return forest;
}
function HuffmanTree(forest){
    let m = forest.length+1;
    while(forest.length>1){
        let least = forest.shift();
        let second = forest.shift();
        let new_node = new tree_node(null,least.frequency+second.frequency,least,second,null,m);
        least.parent = new_node.index;
        second.parent = new_node.index;
        forest.push(new_node);
        forest.sort((a, b) => a.frequency- b.frequency);
        m++;
    }
    return forest;
}
function encoding(node,path){
    if(node.leftchild == null && node.rightchild == null){
        CodeTable[node.symbol] = path;
    }else if(node.leftchild !==null && node.rightchild == null){
        encoding(node.leftchild,path+'0');
    }else if(node.leftchild == null && node.rightchild !== null){
        encoding(node.rightchild,path+'1');
    }else{
        encoding(node.leftchild,path+'0');
        encoding(node.rightchild,path+'1');
    }
    return CodeTable;
}

function sortedCodes(codes) {
    let sortedKeys = Object.keys(codes).sort(function (a, b) { return codes[b].length - codes[a].length });
    return sortedKeys;
}

function tree_node(symbol, frequency, left, right, parent, index) {
    this.symbol = symbol;
    this.frequency = frequency;
    this.leftchild = left;
    this.rightchild = right;
    this.parent = parent;
    this.index = index;
}


