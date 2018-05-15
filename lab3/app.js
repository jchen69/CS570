class Iterable {
    constructor(capacity = 0) {
        this.length = 0;
        this.arr = new Array(capacity);
        this.length = capacity;
    }
    get capacity() { return this.arr.length; }
    resize(length) {
        // two cases: length <= capacity, or length > capacity
        if (length > this.capacity)
            this.reserve(length);
        this.length = length;
    }
    reserve(capacity) {
        if (this.capacity >= capacity)
            return;
        const copy = new Array(capacity * 2);
        for (let i = 0; i < this.length; i++)
            copy[i] = this.arr[i];
        delete this.arr; // optional
        this.arr = copy;
    }
    get(index) {
        if (index < 0)
            throw new Error("index must be positive");
        if (index >= this.length)
            return undefined;
        return this.arr[index];
    }
    set(index, value) {
        if (index < 0)
            throw new Error("index must be positive");
        if (index >= this.length)
            throw new Error("index exceeds length");
        this.arr[index] = value;
    }
    push(value) {
        if (this.length == this.capacity) {
            let newmem = new Array(this.capacity * 2);
            for (let i = 0; i < this.arr.length; i++)
                newmem[i] = this.arr[i];
            delete this.arr;
            this.arr = newmem;
        }
        this.arr[this.length] = value;
        this.length++;
    }
    insert(index, value) {
        if (this.length == this.capacity)
            this.reserve(this.length + 1);
        for (let i = this.length; i >= index; i--)
            this.arr[i] = this.arr[i - 1];
        this.length++;
        this.arr[index] = value;
    }
    pop() {
        this.length--;
        return this.arr[this.length - 1];
    }
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++)
            yield this.arr[i];
    }
}
const vec = new Iterable();
vec.resize(5);
vec.set(0, 10);
vec.set(1, 20);
vec.insert(1, 5);
output_list(vec);
function output_list(list) {
    // output each item in the list
    for (let elem of list)
        console.log(elem);
}
