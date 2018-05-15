class IndexMinPQ {

    constructor(comparator) {
        this.pq = [];
        this.toIndex = new Map();
        this.N = 0;
        this.comparator = comparator;
    }

    isEmpty() {
        return this.N === 0;
    }

    size() {
        return this.N;
    }

    contains(obj) {
        return this.toIndex.has(obj);
    }

    insert(obj) {
        this.pq[++this.N] = obj;
        this.toIndex.set(obj, this.N);
        this.swim(this.N);
    }

    deleteMin() {
        let min = this.pq[1];
        this.pq[1] = this.pq[this.N];
        this.toIndex.set(this.pq[1], 1);
        this.toIndex.delete(min);
        this.pq[this.N--] = undefined;
        this.sink(1);
        return min;
    }

    change(obj) {
        this.swim(this.toIndex.get(obj));
        this.sink(this.toIndex.get(obj));
    }

    less(i, j) {
        return this.comparator(this.pq[i], this.pq[j]) < 0;
    }

    swap(i, j) {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
        this.toIndex.set(this.pq[i], i);
        this.toIndex.set(this.pq[j], j);
    }

    swim(k) {
        while (k > 1 && this.less(k, Math.floor(k / 2))) {
            this.swap(k, Math.floor(k / 2));
            k = Math.floor(k / 2);
        }
    }

    sink(k) {
        while (2 * k <= this.N) {
            let j = 2 * k;
            if (j < this.N && this.less(j + 1, j)) j++;
            if (this.less(k, j)) break;
            this.swap(k, j);
            k = j;
        }
    }
};

class Graph {

    constructor(router,tick) {

        this.vertices = new Set();
        this.distTo = new Map();
        this.preVertex = new Map();
        this.tick = tick;
        this.vertices.add(router);
        this.distTo.set(router, 0);
        this.preVertex.set(router, undefined);

        let minPQ = new IndexMinPQ((rtA, rtB) => this.distTo.get(rtA) - this.distTo.get(rtB));

        for (let edge of router.neighbors) {
            if (!edge.isAvailable) continue;
            let other = edge.to;
            this.vertices.add(other);
            this.distTo.set(other, edge.cost);
            this.preVertex.set(other, router);
            minPQ.insert(other);
        }

        while (!minPQ.isEmpty()) {
            let vertex = minPQ.deleteMin();

            let oldlsp = router.lspMap.get(vertex);
            if (oldlsp === undefined || this.tick - oldlsp.time > 2) continue;

            let availableNei = oldlsp.dynamicNei;
            for (let edge of availableNei) {
                let other = edge.to;
                if (!this.vertices.has(other)) {
                    this.vertices.add(other);
                    this.distTo.set(other, Infinity);
                    this.preVertex.set(other, undefined);
                }

                if (this.distTo.get(other) > this.distTo.get(vertex) + edge.cost) {
                    this.distTo.set(other, this.distTo.get(vertex) + edge.cost);
                    this.preVertex.set(other, vertex);
                    if (minPQ.contains(other)) minPQ.change(other);
                    else minPQ.insert(other);
                }
            }
        }
    }

    costTo(router) {
        return this.distTo.get(router);
    }

    hasPathTo(router) {
        return this.distTo.get(router) < Infinity;
    }

    pathTo(router) {
        if (!this.hasPathTo(router)) return undefined;
        let path = [];
        path.push(router);
        for (let pre = this.preVertex.get(router); pre !== undefined; pre = this.preVertex.get(pre))
            path.push(pre);
        return path.reverse();
    }
};

//module.exports = IndexMinPQ;
module.exports = Graph;