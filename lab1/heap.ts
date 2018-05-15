//堆的构造：如果已经有一个完全二叉树，则从最后一个点(n)的父节点(n/2)开始构造这个父节点的最大堆,依次构造每一个父节点，直到根节点。
class maxHeap {
    private heap: number[];

    constructor() {
        this.heap = new Array();
    };

    public insert(input) {
        this.heap.push(input);
        this.shiftUp(this.heap.length - 1);
    };

    private shiftUp(size: number) {
        while (size > 1 && this.heap[size / 2] < this.heap[size]) {
            this.swap(size, size / 2);
            size = size / 2;
        }
    };

    private shiftDown(father) {
        while (2 * father <= size) {
            int newFather = 2 * father;
            if (newFather + 1 <= size && data[newFather + 1].compareTo(data[newFather]) > 0) {//data[j] data[j+1]两者取大的那个
                newFather = newFather + 1;
            }
            if (data[father].compareTo(data[newFather]) >= 0) {
                break;
            } else {
                swap(father, newFather);//值进行交换
                father = newFather;//newFather是(2*father)或者是(2*father+1),也就是继续shiftDown(newFather);
            }
        }
    }

    private swap(i, j) {
        let temp;

        if (i !== j) {
            temp = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
        }
    };

    /*private hSize() {
        let x: number
        x = this.heap.length;
        return x;
    }*/

    public outPut() {
        return this.heap;
    }
};

let newHeap = new maxHeap();
newHeap.insert(3);
newHeap.insert(6);
newHeap.insert(2);
newHeap.insert(1);
newHeap.insert(9);
newHeap.insert(7);
newHeap.insert(8);

console.log(newHeap.outPut());