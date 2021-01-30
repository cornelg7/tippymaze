import styles from '../../assets/styles/about.scss';

export default class About {
  constructor() {
    this.pageName = 'about';
    this.content = `
    <div class="${styles.row}">
      <h3 class="${styles['about-h3']} ${styles['u-size-medium']}">
        Game made by cornelg7 using
        <a href="https://atomiks.github.io/tippyjs/" target="_blank">
          tippyjs
        </a>
      </h3>
    </div>
    <div class="${styles.row}">
      <h3 class="${styles['about-h3']} ${styles['u-size-medium']}">
        More details
        <a href="https://github.com/cornelg7/tippymaze" target="_blank">
          here
        </a>
      </h3>
    </div>
    `;
  }
}
