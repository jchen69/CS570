//堆的构造：如果已经有一个完全二叉树，则从最后一个点(n)的父节点(n/2)开始构造这个父节点的最大堆,依次构造每一个父节点，直到根节点。
class maxHeap {
    constructor() {
        this.heap = new Array();
    }
    ;
    insert(input) {
        this.heap.push(input);
        this.shiftUp(this.heap.length - 1);
    }
    ;
    shiftUp(size) {
        while (size > 1 && this.heap[size / 2] < this.heap[size]) {
            this.swap(size, size / 2);
            size = size / 2;
        }
    }
    ;
    swap(i, j) {
        let temp;
        if (i !== j) {
            temp = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
        }
    }
    ;
    outPut() {
        return this.heap;
    }
}
;
let newHeap = new maxHeap();
newHeap.insert(3);
newHeap.insert(6);
newHeap.insert(2);
newHeap.insert(1);
newHeap.insert(9);
newHeap.insert(7);
newHeap.insert(8);
console.log(newHeap.outPut());
