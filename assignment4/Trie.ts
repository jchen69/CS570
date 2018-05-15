import * as fs from 'fs';
import * as prompt from 'prompt-sync';
import * as readline from 'readline';

class trieNode {
    public primary: string;
    public end: boolean;
    public val: string;
    public childNodes: trieNode[] = [];

    constructor(val, end) {
        this.val = val;
        this.end = end;
    };

    public subNodes(c) {
        let x;

        for(x in this.childNodes){  
            if (this.childNodes[x].val == c){  
                return this.childNodes[x];  
            }  
        }  

        return null; 
    };
}

class trie {
    private root;
    private cName = "";
    private result: {[title: string]: number} = {};
    private absResult: {[title: string]: number} = {};

    constructor() {
        this.root = new trieNode(" ", false);
    };

    public outputResult() {
        return this.result;
    };

    public outputAbsResult() {
        return this.absResult;
    };

    public recordInResult(cName) {
        if (this.result[cName]) {
            this.result[cName]++;
        } else {
            this.result[cName] = 1;
        };
    };

    public recordInAbsResult(cName) {
        if (this.absResult[cName]) {
            this.absResult[cName]++;
        } else {
            this.absResult[cName] = 1;
        };
    };

    public insert(companyName: string, primary: string) {
        let current = this.root;

        for(let i = 0; i < companyName.length; i++) {
            if (current.subNodes(companyName[i]) !== null) {//对得上
                if (i == (companyName.length - 1)) {
                    current.subNodes(companyName[i]).end = true;
                    current.subNodes(companyName[i]).primary = primary;
                }
                current = current.subNodes(companyName[i]);
            } else {
                let temp = new trieNode(companyName[i], false);

                if (i == (companyName.length - 1)) {
                    temp.end = true;
                    temp.primary = primary;
                };

                current.childNodes.push(temp);
                current = temp;
            }
        }
    };

    public search(word: string) {
        let current = this.root;
        let tempName = "";

        for(let i = 0; i < word.length - 1; i++) {
            if (current.subNodes(word[i]) !== null) {//这一个对得上
                if (current.subNodes(word[i]).end && current.subNodes(word[i]).subNodes(word[i + 1]) == null) {//是end 和下一个对不上
                    this.cName = this.cName + word[i];

                    this.recordInAbsResult(this.cName);

                    this.recordInResult(current.subNodes(word[i]).primary);

                    tempName = "";
                    current = this.root;
                } else if (current.subNodes(word[i]).end && current.subNodes(word[i]).subNodes(word[i + 1]) !== null) {//是end 和下一个对的上
                    this.cName = this.cName + word[i];
                    tempName = this.cName;
                    current = current.subNodes(word[i]);
                } else if (!current.subNodes(word[i]).end && current.subNodes(word[i]).subNodes(word[i + 1]) == null) {//不是end 和下一个对不上
                    if(tempName !== "") {
                        this.recordInResult(current.primary);
                        this.recordInAbsResult(tempName);
                    };
                    tempName = "";
                    this.cName = "";
                    
                    current = this.root;
                } else { //不是end 和下一个对得上
                    this.cName = this.cName + word[i];
                    current = current.subNodes(word.charAt(i));
                }
            } else {
                this.cName = "";
            }
        };
    };
}

let companiesText = fs.readFileSync("companies.dat", "utf8");
let companiesRow = companiesText.split('\n');
let companiesName = [];
for (let i in companiesRow) {
    companiesName.push(companiesRow[i].split('\t'));
}

let newTrie = new trie();
let result: { [title: string]: number } = {};

for (let i in companiesName) {
    for (let j in companiesName[i]) {
        newTrie.insert(companiesName[i][j], companiesName[i][0]);
    }
}

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let totalWords;
console.log('Please input your article: ');
rl.on('line', function (inputLine) {
    if (inputLine === '.') {
        rl.close();
        console.log('Company      Hit Count       Relevance');
        let totalNum = countWords(totalWords);
        let resultMap = newTrie.outputResult();
        let total = 0;

        for (let i in resultMap) {
            total += resultMap[i];
            console.log(i + '       ' + resultMap[i] + '        ' + (resultMap[i] * 100 / totalNum).toFixed(4) + ' %');
        }
        console.log('Total: ' + total);
        console.log('Total Words: ' + totalNum);
    }
    else {
        newTrie.search(inputLine);
        totalWords += inputLine;
    }
});

function countWords(text: string) {
    text = text.replace(/[^\w\s]/g, '').replace(' an ', ' ').replace(' a ', ' ').replace(' the ', ' ').replace(' and ', ' ').replace(' but ', ' ');
    let wordArr = text.split(/\s+/g);
    return wordArr.length;
}

//input test:
/* Tencent is a great companey, i love Tencent, Apple is a cell phone company, Apple's full name is Apple Inc., Alibaba invent Taobao and Alipay, which makes our life conviencer Tencent. I love Tencent Corpararion. */