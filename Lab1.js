class Queue {
    constructor() {
        this.q = [];
    }
// get the current number of elements in the queue
//Getter function
    get length() {
        return this.q.length
    };
//Get all the elements 
    get queue() {
        return this.q;
    }
// Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
//Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
// pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };

    //starts at position 0 
    //removes the number of elements equal to the length
    taskA() {
        this.q.splice(0,this.q.length);
        return this.q;
    };

    
    taskB() {
        this.q.push(1,2,3,4);
        return this.q;
    };

    taskC(number) {
        if (number <= this.q.length) {
            this.q.splice(0,number);
            console.log(this.q);
            
        } else {

            console.log("Number too large.");
        }
        
        
    };

    taskD() {
        
        for(let i = 0; i < this.q.length; i++){
            
            console.log(this.q.indexOf(this.q[i]) + "->" + this.q[i]);
         
        }
    };
    
};
let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));

//Executes Task A
queue.taskA();
console.log(queue.q);

//Executes Task B
queue.taskB();
console.log(queue.q);

//Executes Task C
queue.taskC(1);
//queue.taskC(4);
//queue.taskC(5);

//Executes Task D
queue.taskD();






    




