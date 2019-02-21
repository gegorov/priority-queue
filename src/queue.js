const MaxHeap = require('./max-heap.js');

class PriorityQueue {
  constructor(maxSize = 30) {
    this.maxSize = maxSize;
    this.heap = new MaxHeap();
  }

  push(data, priority) {
    if (this.heap.size() >= this.maxSize) {
      throw new Error(`max size reached: ${this.maxSize}`);
    } else {
      this.heap.push(data, priority);
    }
  }

  shift() {
    if (this.heap.isEmpty()) {
      throw new Error('heap is empty');
    } else {
      const result = this.heap.pop();
      return result;
    }
  }

  size() {
    return this.heap.size();
  }

  isEmpty() {
    return this.heap.isEmpty();
  }
}

module.exports = PriorityQueue;
