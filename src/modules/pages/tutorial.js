import tippy from 'tippy.js';
import styles from '../../assets/styles/tutorial.scss';

export default class Tutorial {
  constructor() {
    this.pageName = 'tutorial';
    this.content = this.getContent();

    tippy(`.${styles.how}`, {
      content: `
      <ul class="${styles['u-size-medium']}">
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
  }

  // eslint-disable-next-line class-methods-use-this
  getContent() {
    return `
    <div class="${styles.row}">
      <h3 class="${styles.how}">How?</h3>
      <span class="${styles.hoverme} ${styles['u-size-medium']}">&larr; hover me</span>
    </div>
    <div class="${styles.row} ${styles['map-container']}">
      <div class="${styles.map}">
        <div class="${styles.root} ${styles['u-size-steps']} ${styles['u-center']}"> start </div>
      </div>
    </div>
    `;
  }
}
