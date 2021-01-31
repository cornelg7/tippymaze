
export default class Node {
  id: string;
  placement: string;
  text: string;
  onClick: () => void;
  onClickInt: () => void;

  constructor(id: string, placement: string, text: string = id, onClick?: () => void, onClickInt?: () => void) {
    this.id = id;
    this.placement = placement;
    this.text = text;
    this.onClick = onClick;
    this.onClickInt = onClickInt;
  }
}
