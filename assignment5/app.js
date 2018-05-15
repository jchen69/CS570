const fs = require('fs');
const os = require('os');
const readline = require('readline');

const Router = require("./routers.js");
const Lsp = require('./lsp.js');

let tick = 0;

let routerMap = new Map();
let input;

input = fs.readFileSync('infile.dat', 'utf-8');
input = input.split(/\r\n|\n/);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Edge {
    constructor(to, cost, isAvailable) {
        this.to = to;//another router
        this.cost = cost;//the cost of edge
        this.isAvailable = isAvailable;
    }
}
let router;
for (let i = 0; i < input.length; i++) {
    if (input[i][0] !== ' ' && input[i][0] !== '\t') {
    		let temp = input[i].split(/\t| /);
        let params = [];
        for (let j = 0; j < temp.length; j++)
            if (temp[j] !== '') params.push(temp[j]);
        router = new Router(parseInt(params[0]), params[1], [], 1, new Map(), true);
        routerMap.set(router.id, router);      
    }
    else {
        let temp = input[i].split(/\t| /);
        let params = [];
        for (let j = 0; j < temp.length; j++)
            if (temp[j] !== '') params.push(temp[j]);
        let edge = new Edge(parseInt(params[0]), params[1] === undefined ? 1 : parseInt(params[1]), true);
        
        router.neighbors.push(edge);
    }
}
for (let router of routerMap.values()) {
    for (let edge of router.neighbors) {
        let other = routerMap.get(edge.to);
        edge.to = other;
    }
}
console.log('read input file complete');

let promptInfo = '****' + os.EOL + '    Please enter C to continue, or Q to quit, or P followed by a router\'s id to print the routing table of'
    + os.EOL + '    a router, or S followed by id to shutdown a touter, or T followed by id to start up a router' + os.EOL + '****';
console.log(promptInfo);

rl.on('line', (input) => {
    if (input === 'C' || input === 'c') {
        tick++;
        for (let router of routerMap.values())
            router.originatePacket();
        console.log(promptInfo);
    }
    else if (input === 'Q' || input === 'q') {
        rl.close();
    }
    else if (input[0] === 'P' || input[0] === 'p') {
        let router = routerMap.get(parseInt(input.substring(1)));
        if (router === undefined) console.log('No such router. Try again.');
        else if (!router.start) console.log('This router is shut down. It\'s meaningless to print the routing table of it.');
        else console.log(router.routingTable);
        console.log(promptInfo);
    }
    else if (input[0] === 'S' || input[0] === 's') {
        let router = routerMap.get(parseInt(input.substring(1)));
        if (router === undefined) console.log('No such router. Try again.');
        else router.start = false;
        console.log(promptInfo);
    }
    else if (input[0] === 'T' || input[0] === 't') {
        let router = routerMap.get(parseInt(input.substring(1)));
        if (router === undefined) console.log('No such router. Try again.');
        else router.start = true;
        console.log(promptInfo);
    }
    else {
        console.log('Unexpected input. Try again.');
        console.log(promptInfo);
    }
});
