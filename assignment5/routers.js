const LSP = require('./lsp.js');
const Graph= require('./shortPath.js');
const os = require('os');
//const Graph = shortPath.Graph;
let tick = 0;
class Router {

    constructor(id, network, neighbors, sequence, lspMap, start) {
    	this.sequence = sequence;
    	this.lspMap = lspMap;
    	this.neighbors = neighbors;        
        this.network = network;
        this.start = start;
        this.routingTable = '';
        this.id = id;
    }

    receivePacket(lsp) {
        if (this.start) {
        	lsp.timeToLive = lsp.timeToLive - lsp.transCost;

	        if (lsp.timeToLive <= 0) {
                return
            };
	        let savedlsp = this.lspMap.get(lsp.origin);

	        if (savedlsp !== undefined && savedlsp.sequence >= lsp.sequence) {
                return
            } ;

	        this.lspMap.set(lsp.origin, lsp);

	        let hasChanged = false;
	        if (savedlsp === undefined || tick - savedlsp.time > 2)  {
                hasChanged = true
            } else {
	            let s = new Set();
	            for (let edge of lsp.dynamicNei) {
	                s.add(edge);
                };

	            for (let edge of savedlsp.dynamicNei) {
	                if (!s.delete(edge)) {
	                    hasChanged = true;
	                    break;
	                }
	            }
	            if (s.size !== 0) {
                    hasChanged = true;
                }
	        }

	        if (hasChanged) {
	            this.routingTable = '';

	            let graph = new Graph(this);

	            for (let rt of graph.vertices) {
	                if (rt === this || !graph.hasPathTo(rt)) {
                        continue;
                    }
	                let tmp = '';
	                tmp += rt.network + ', ' + graph.pathTo(rt)[1].id + os.EOL;
	                this.routingTable += tmp;
	            }
	        }

	        for (let edge of this.neighbors) {
	            if (edge.to === lsp.origin || edge.to === lsp.transit) {
                    continue;
                }
	            let newlsp = new LSP(lsp.origin, lsp.dynamicNei, lsp.sequence, lsp.timeToLive, this, edge.cost,tick);
	            edge.to.receivePacket(newlsp);
	        }
        } else {
        	return;
        }
    }

    originatePacket() {
        if (this.start) {
            let hasChanged = false;

            for (let edge of this.neighbors) {
                let savedlsp = this.lspMap.get(edge.to);
                let latestTime = savedlsp === undefined ? 0 : savedlsp.time;

                if (edge.isAvailable !== (tick - latestTime <= 2)) {
                    edge.isAvailable = (tick - latestTime <= 2);
                    hasChanged = true;
                }
            }

            if (hasChanged) {
                this.routingTable = '';
                let graph = new Graph(this,tick);

                for (let rt of graph.vertices) {
                    if (rt === this || !graph.hasPathTo(rt)) {
                        continue;
                    }
                    let tmp = '';
                    tmp += rt.network + ', ' + graph.pathTo(rt)[1].id + os.EOL;
                    this.routingTable += tmp;
                }
            }

            let availableNei = [];

            for (let edge of this.neighbors) {
                if (edge.isAvailable) {
                    availableNei.push(edge);
                }
            }

            for (let edge of this.neighbors) {
                let lsp = new LSP(this, availableNei, this.sequence, 10, this, edge.cost,tick);
                edge.to.receivePacket(lsp);
            }
            this.sequence++;
        } else {
            return
        }
    }
};

module.exports = Router;