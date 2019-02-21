const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  push(data, priority) {
    const myNode = new Node(data, priority);
    this.heapSize += 1;
    this.insertNode(myNode);
    this.shiftNodeUp(myNode);
  }

  pop() { // eslint-disable-line
    if (this.root) {
      this.heapSize -= 1;
      const { data } = this.root;
      const detached = this.detachRoot();
      this.restoreRootFromLastInsertedNode(detached);
      if (this.root) {
        this.shiftNodeDown(this.root);
      }
      return data;
    }
  }

  detachRoot() {
    const index = this.parentNodes.indexOf(this.root);
    if (index !== -1) {
      this.parentNodes.splice(index, 1);
    }

    const detachedRoot = this.root;
    this.root = null;
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    const lastInsertedNode = this.parentNodes.pop();

    if (lastInsertedNode && detached) {
      if (lastInsertedNode.parent
        && lastInsertedNode.parent.right === lastInsertedNode
        && lastInsertedNode.parent !== detached) {
        this.parentNodes.unshift(lastInsertedNode.parent);
      }
      if (lastInsertedNode.parent) {
        lastInsertedNode.parent.removeChild(lastInsertedNode);
      }
      lastInsertedNode.left = detached.left;
      lastInsertedNode.right = detached.right;
      if (lastInsertedNode.left) {
        lastInsertedNode.left.parent = lastInsertedNode;
      }
      if (lastInsertedNode.right) {
        lastInsertedNode.right.parent = lastInsertedNode;
      }
      if (!detached.left || !detached.right) {
        this.parentNodes.unshift(lastInsertedNode);
      }
      this.root = lastInsertedNode;
    }
  }

  size() {
    return this.heapSize;
  }

  isEmpty() {
    return this.heapSize === 0;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.heapSize = 0;
  }

  insertNode(node) {
    if (!this.root) {
      this.root = node;
      this.parentNodes.push(node);
    } else {
      this.parentNodes[0].appendChild(node);
      this.parentNodes.push(node);
      if (this.parentNodes[0].right) {
        this.parentNodes.shift();
      }
    }
  }

  shiftNodeUp(node) {
    if (node.parent) {
      if (node.parent.priority < node.priority) {
        const nodeIndex = this.parentNodes.indexOf(node);
        const nodeParentIndex = this.parentNodes.indexOf(node.parent);
        if (nodeIndex !== -1) {
          if (nodeParentIndex !== -1) {
            const tempNode = this.parentNodes[nodeIndex];
            this.parentNodes[nodeIndex] = this.parentNodes[nodeParentIndex];
            this.parentNodes[nodeParentIndex] = tempNode;
          } else {
            this.parentNodes[nodeIndex] = node.parent;
          }
        }
        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    } else {
      this.root = node;
    }
  }

  shiftNodeDown(node) {
    let nodeChild;
    if (node.left && node.right && node.left.priority > node.right.priority) {
      nodeChild = node.left;
    } else if (node.left && node.right && node.left.priority <= node.right.priority) {
      nodeChild = node.right;
    } else if (node.left && node.left.priority > node.priority) {
      nodeChild = node.left;
    } else {
      return;
    }

    const nodeIndex = this.parentNodes.indexOf(node);
    const nodeChildIndex = this.parentNodes.indexOf(nodeChild);
    if (nodeChildIndex !== -1) {
      if (nodeIndex !== -1) {
        const tempNode = this.parentNodes[nodeIndex];
        this.parentNodes[nodeIndex] = this.parentNodes[nodeChildIndex];
        this.parentNodes[nodeChildIndex] = tempNode;
      } else {
        this.parentNodes[nodeChildIndex] = node;
      }
    }
    if (node === this.root) {
      this.root = nodeChild;
    }
    nodeChild.swapWithParent();
    this.shiftNodeDown(node);
  }
}

module.exports = MaxHeap;
