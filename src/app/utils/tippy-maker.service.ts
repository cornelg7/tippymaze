import { Injectable } from '@angular/core';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Edge from './edge';
import Queue from './queue';
import Node from './node';

@Injectable({
  providedIn: 'root'
})
export class TippyMakerService {
  private nodes: { [key: string]: Node; };
  private edges: { [key: string]: Edge; };
  private elements: { [key: string]: HTMLElement; };

  constructor() {
    this.reset();
  }

  node(id: string, placement: any = 'top', text: string = id): Node {
    if (this.nodes[id] === undefined) {
      this.nodes[id] = new Node(id, placement, text);
    }
    return this.nodes[id];
  }

  addRootElement(rootElement: HTMLElement): void {
    this.elements['root'] = rootElement;
  }

  setEdges(edges: { [key: string]: Edge; }): void {
    this.edges = edges;
  }

  reset(): void {
    this.nodes = {};
    this.edges = {};
    this.elements = {};
  }

  makeMaze() {
    const q = new Queue<Edge>();
    console.log(this.edges);
    q.push(this.edges['root']);
    while (!q.empty()) {
      const edge: Edge = q.pop();
      console.log(edge);
      edge.children.forEach(child => {
        this.makeStepTippy(edge.dad.id, child.id, child.placement, edge.dad.text, child.text);
        if (this.edges[child.id]) {
          q.push(this.edges[child.id]);
        }
      });
    }
  }

  private getStepElement(textContent: string): HTMLElement {
    const e = document.createElement('span');
    e.textContent = textContent;
    return e;
  }

  private makeStepTippy(dadId: string, childId: string, placement: any = 'top', dadText: string = dadId, childText: string = childId) {
    if (this.elements[dadId] === undefined || this.elements[dadId] === null) {
      this.elements[dadId] = this.getStepElement(dadText);
    }
    if (this.elements[childId] === undefined || this.elements[childId] === null) {
      this.elements[childId] = this.getStepElement(childText);
    }
    tippy(this.elements[dadId], {
      content: this.elements[childId],
      allowHTML: true,
      maxWidth: 50,
      hideOnClick: false,
      theme: 'dark-border',
      interactive: true,
      interactiveBorder: 30,
      placement: placement,
    });
  }
}
