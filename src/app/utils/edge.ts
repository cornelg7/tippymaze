import Node from './node';

export default class Edge {
  dad: Node;
  children: Node[];

  constructor(dad: Node, children: Node[]) {
    this.dad = dad;
    this.children = children;
  }
}
