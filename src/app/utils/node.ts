
export default class Node {
  id: string;
  placement: string;
  text: string;

  constructor(id: string, placement: string, text: string = id) {
    this.id = id;
    this.placement = placement;
    this.text = text;
  }
}
