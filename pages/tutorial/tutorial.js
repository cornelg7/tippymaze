tippy('#how', {
  content: `
  <ul class="u-size-medium">
    <li>only mouse - too easy with phone</li>
    <li>hover through the maze</li>
    <li>make sure the entire map (4 green borders) is visible - zoom out otherwise</li>
    <li>click to interact</li>
  </ul>
  `,
  allowHTML: true,
  maxWidth: 'none',
  hideOnClick: false,
  theme: 'dark-border',
  interactive: true,
});

class Queue {
  constructor() { this.elements = []; }
  push(element) { this.elements.push(element); }
  pop() { return this.elements.shift(); }
  empty() { return this.elements.length === 0; }
  peek() { return !this.empty ? elements[0] : undefined; }
  length() { return this.elements.length; }
}

class Node {
  constructor(id, placement, text = id) {
    this.id = id;
    this.placement = placement;
    this.text = text;
  }
}

// Edges from dadNode to childrenNodes
class Edge {
  constructor(dad, children) {
    this.dad = dad;
    this.children = children;
  }
}

let nodes = {};

function node(id, placement = 'top', text = id) {
  if (nodes[id] === undefined) {
    nodes[id] = new Node(id, placement, text);
  }
  return nodes[id];
}

let elements = {
  'root': document.getElementById('root'),
};

function getStepElement(textContent) {
  const e = document.createElement('span');
  e.textContent = textContent;
  return e;
}

function makeStepTippy(dadId, childId, placement = 'top', dadText = dadId, childText = childId) {
  if (elements[dadId] === undefined || elements[dadId] === null) {
    elements[dadId] = getStepElement(dadText);
  }
  if (elements[childId] === undefined || elements[childId] === null) {
    elements[childId] = getStepElement(childText);
  }
  tippy(elements[dadId], {
    content: elements[childId],
    allowHTML: true,
    maxWidth: 50,
    hideOnClick: false,
    theme: 'dark-border',
    interactive: true,
    interactiveBorder: 30,
    placement: placement,
  });
}

function makeMaze() {
  const q = new Queue();
  q.push(edges['root']);
  while (!q.empty()) {
    const edge = q.pop();
    edge.children.forEach(child => {
      makeStepTippy(edge.dad.id, child.id, child.placement, edge.dad.text, child.text);
      if (edges[child.id]) {
        q.push(edges[child.id]);
      }
    })
  }
  console.log('created maze');
}

let edges = {
  'root': new Edge(node('root'), [node('s1')]),
  's1': new Edge(node('s1'), [node('s2')]),
  's2': new Edge(node('s2'), [node('s3')]),
  's3': new Edge(node('s3'), [node('s4', 'right', '😁'), node('s5', 'top', '😎')]),
};

makeMaze();