class Iterable<T> {
    private arr: T[];
    private length: number = 0;

    public get capacity(): number { return this.arr.length; }

    constructor(capacity = 0) {
        this.arr = new Array(capacity);
        this.length = capacity;
    }

    public resize(length: number) {
        // two cases: length <= capacity, or length > capacity
        if (length > this.capacity)
            this.reserve(length);

        this.length = length;
    }

    public reserve(capacity: number) {
        if (this.capacity >= capacity) return;
        const copy = new Array(capacity * 2);
        for (let i = 0; i < this.length; i++)
            copy[i] = this.arr[i];
        delete this.arr; // optional
        this.arr = copy;
    }

    public get(index: number): T {
        if (index < 0) throw new Error("index must be positive");
        if (index >= this.length) return undefined;
        return this.arr[index];
    }

    public set(index: number, value: T) {
        if (index < 0) throw new Error("index must be positive");
        if (index >= this.length) throw new Error("index exceeds length");
        this.arr[index] = value;
    }

    public push(value: T) {
       this.length++;
       this.resize(this.length);
       this.arr[this.length - 1] = value;
    }

    public insert(index: number, value: T) {
        if(this.length == this.capacity)
            this.reserve(this.length + 1);
        
        for(let i = this.length; i >= index; i--)
            this.arr[i] = this.arr[i - 1];

        this.length++;

        this.arr[index] = value;
    }

    public pop(): T {
        this.length--;
        return this.arr[this.length];
    }

    public* [Symbol.iterator]() {
        for (let i = 0; i < this.length; i++)
            yield this.arr[i];
    }
}

interface Vector<T> extends Iterable<T> {
    get(index: number);
    set(index: number, value: T);
    push(value: T);
    pop(): T;
    insert(index: number, value: T);
    // remember to implement the iterable functionality
}

const vec: Vector<number> = new Iterable<number>();
vec.set(0, 10);
vec.set(1, 20);
vec.insert(1,5);
console.log

output(vec);

function output(list: Iterable<any>) {
    // output each item in the list
    for (let elem of list)
        console.log(elem);
}