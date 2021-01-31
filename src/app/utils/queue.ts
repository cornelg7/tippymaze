export default class Queue<T> {
  elements: T[];
  constructor() { this.elements = []; }
  push(element) { this.elements.push(element); }
  pop() { return this.elements.shift(); }
  empty() { return this.elements.length === 0; }
  peek() { return !this.empty ? this.elements[0] : undefined; }
  length() { return this.elements.length; }
}
