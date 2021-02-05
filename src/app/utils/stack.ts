export default class Stack<T> {
  elements: T[];
  constructor() { this.elements = []; }
  push(element: T): void { this.elements.push(element); }
  length(): number { return this.elements.length; }
  peek(): T { return this.elements[this.length()-1]; }
  empty(): boolean { return this.length() === 0; }
  pop(): T { if(!this.empty()) { return this.elements.pop(); } }
}
