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
  public edges: { [key: string]: Edge; };
  private nodes: { [key: string]: Node; };
  private elements: { [key: string]: HTMLElement; };
  private active: { [key: string]: boolean };
  private tippies: any[] = [];

  constructor() {
    this.reset();
  }

  node(id: string, placement: any = 'top', text: string = id, onClick = () => {}, onClickInt = () => {}): Node {
    if (this.nodes[id] === undefined) {
      this.nodes[id] = new Node(id, placement, text, onClick, onClickInt);
    }
    return this.nodes[id];
  }

  addRootElement(rootElement: HTMLElement): void {
    this.elements['root'] = rootElement;
  }

  reset(nodes = true, edges = true, elements = true, active = true, tippies = true): void {
    if (nodes) this.nodes = {};
    if (edges) this.edges = {};
    if (elements) this.elements = {};
    if (active) this.active = {};
    if (tippies) {
      this.tippies.forEach(tippy => tippy.destroy());
      this.tippies = [];
    }
  }

  updateMaze(newEdges: {[key: string]: Edge}, reset = false, rootElement: HTMLElement = undefined) {
    if (reset) {
      if (rootElement !== undefined) {
        this.reset();
        this.elements['root'] = rootElement;
      } else {
        console.error('no rootElement with reset = true in updateMaze')
      }
    }
    for (const [key, value] of Object.entries(newEdges)) {
      this.edges[key] = value;
      this.active[key] = false;
    }
    this.makeMaze();
  }

  makeMaze() {
    const q = new Queue<Edge>();
    q.push(this.edges['root']);
    while (!q.empty()) {
      const edge: Edge = q.pop();
      edge.children.forEach(child => {
        if (!this.active[child.id]) {
          this.makeStepTippy(edge.dad.id, child.id, child.placement, edge.dad.text, child.text, child.onClick, child.onClickInt);
          this.active[child.id] = true;
        }
        if (this.edges[child.id]) {
          q.push(this.edges[child.id]);
        }
      });
    }
  }

  private getStepElement(textContent: string, onClick = () => {}, onClickInt = () => {}): HTMLElement {
    const e = document.createElement('span');
    e.textContent = textContent;
    e.addEventListener('click', onClick);
    e.addEventListener('click', onClickInt);
    return e;
  }

  private makeStepTippy(dadId: string, childId: string, placement: any = 'top', dadText: string = dadId, childText: string = childId, onClick = () => {}, onClickInt = () => {}) {
    if (this.elements[dadId] === undefined || this.elements[dadId] === null) {
      this.elements[dadId] = this.getStepElement(dadText);
    }
    if (this.elements[childId] === undefined || this.elements[childId] === null) {
      this.elements[childId] = this.getStepElement(childText, onClick, onClickInt);
    }
    this.tippies.push(tippy(this.elements[dadId], {
      content: this.elements[childId],
      allowHTML: true,
      maxWidth: 50,
      hideOnClick: false,
      theme: 'dark-border',
      interactive: true,
      interactiveBorder: 15,
      placement: placement,
    }));
  }
}
