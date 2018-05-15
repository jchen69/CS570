const prompt = require('prompt-sync')();

let maxHeap = [];

for (let i = 0; i < 10; i++) {
    let input = Number(prompt("input a number: "));
    maxHeap = insert(maxHeap, input);
}

console.log("descending order:");

for (let i = 0; i < 10; i++) {
    console.log(deleteMax(maxHeap));
}


function isEmpty(heap) {
    if (heap.length > 0) {
        return false;
    }
    return true;
}

function insert(heap, newItem) {
    heap.push(newItem);
    let insertPosition = heap.length - 1;
    let parentNode = Math.floor(heap.length / 2) - 1;

    while (parentNode >= 0){
        if (heap[parentNode] < newItem) {
            heap[insertPosition] = heap[parentNode];
            heap[parentNode] = newItem;
            insertPosition = parentNode;
            parentNode = Math.floor((insertPosition + 1) / 2) - 1;
        }
    }
    return heap;
}

function deleteMax(heap) {
    let maxNum = heap[0];

    heap[0] = heap.pop();
    let insertPosition = 0;
    let leftChild = (insertPosition + 1) * 2 - 1;
    let rightChild = (insertPosition + 1) * 2;

    while (heap[insertPosition] < heap[leftChild] || heap[insertPosition] < heap[rightChild]) {
        if (heap[leftChild] > heap[rightChild]) {
            let temp = heap[insertPosition];
            heap[insertPosition] = heap[leftChild];
            heap[leftChild] = temp;
            insertPosition = leftChild;
            leftChild = (insertPosition + 1) * 2 - 1;
            rightChild = (insertPosition + 1) * 2;
        }
        else {
            let temp = heap[insertPosition];
            heap[insertPosition] = heap[rightChild];
            heap[rightChild] = temp;
            insertPosition = rightChild;
            leftChild = (insertPosition + 1) * 2 - 1;
            rightChild = (insertPosition + 1) * 2;
        }
    }
    return maxNum;
}