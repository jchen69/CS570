let graph = digraph();
console.log(topologicalSort(graph));
console.log(topologicalSort2(graph));


function digraph() {
    //const prompt = require('prompt-sync')();
    const fs = require('fs');
    const input = fs.readFileSync('infile.dat', 'utf8');
    let digraph = {};
    let lines = input.split('\r\n');
    let firstLine = lines.shift();
    let nodesNum = firstLine.split(' ')[0];
    let edgesNum = firstLine.split(' ')[1];
    let nodes = [];
    let edges = lines;

    for(let i=0;i<nodesNum;i++) digraph[i]=[];

    let edge_end_node_1, edge_end_node_2;

    for (let i of edges) {
        edge_end_node_1 = i.split(' ')[0];
        edge_end_node_2 = i.split(' ')[1];
        digraph[edge_end_node_1].push(edge_end_node_2);
    }

    return digraph;
}

function topologicalSort(digraph) {
    function is_e(digraph){
        let n=0;
        for(let i in digraph){
            n++;
        }
        if(n==0) return true;
        else return false;
    }
    let sort={};
    for(let i in digraph){
        sort[i]=digraph[i];
    }
    let table=[];
    let index=0;
    while(!is_e(sort)){
    let indegree={};
    let top_node=[];
    for(let i in sort){
        indegree[i]=0;
    }
    for(let i in sort){
        for(let j in sort[i]){
            indegree[sort[i][j]]++;
        }
    }
    for(let i in indegree){
        if(indegree[i]===0) top_node.push(i);
    }
    index++;
    table[index]=top_node[top_node.length-1];
    delete(sort[top_node[top_node.length-1]]);
    for(let i in sort){
        for(let j in sort[i]){
            if(sort[i][j]===top_node[top_node.length-1]) sort[i].splice(j,1);
        }
    }
}
return table;
}

function topologicalSort2(digraph) {
    function is_e(digraph){
        let n=0;
        for(let i in digraph){
            n++;
        }
        if(n==0) return true;
        else return false;
    }
    let sort2={};
    for(let i in digraph){
        sort2[i]=digraph[i];
    }
    let table=[];
    let index=0;
    while(!is_e(sort2)){
    let indegree={};
    let top_node=[];
    for(let i in sort2){
        indegree[i]=0;
    }
    for(let i in sort2){
        for(let j in sort2[i]){
            indegree[sort2[i][j]]++;
        }
    }
    for(let i in indegree){
        if(indegree[i]===0) top_node.push(i);
    }
    index++;
    table[index]=top_node[0];
    delete(sort2[top_node[0]]);
    for(let i in sort2){
        for(let j in sort2[i]){
            if(sort2[i][j]===top_node[0]) sort2[i].splice(j,1);
        }
    }
}
return table;
}
