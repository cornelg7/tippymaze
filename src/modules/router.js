import Tutorial from './pages/tutorial';
import Game from './pages/game';
import About from './pages/about';
import styles from '../assets/styles/index.scss';
import topnavStyles from '../assets/styles/topnav.scss';

export default class Router {
  constructor(document) {
    this.document = document;
  }

  PAGES = [{ name: 'tutorial' }, { name: 'game' }, { name: 'about' }];

  addTemplates() {
    this.document.querySelector('#content-tutorial').innerHTML = new Tutorial().content;
    this.document.querySelector('#content-game').innerHTML = new Game().content;
    this.document.querySelector('#content-about').innerHTML = new About().content;
  }

  deactivatePage(page) {
    this.document.querySelector(`#nav-${page.name}`).classList.remove(topnavStyles.active);
    this.document.querySelector(`#content-${page.name}`).classList.remove(styles.active);
  }

  activatePage(page) {
    this.document.querySelector(`#nav-${page.name}`).classList.add(topnavStyles.active);
    this.document.querySelector(`#content-${page.name}`).classList.add(styles.active);
  }

  goToPageByName(name) {
    this.PAGES.filter((page) => page.name !== name).forEach((page) => this.deactivatePage(page));
    // eslint-disable-next-line no-shadow
    const page = this.PAGES.filter((page) => page.name === name)[0];
    this.activatePage(page);
  }

  initNavClicks() {
    this.PAGES.forEach((page) => {
      document.querySelector(`#nav-${page.name}`).addEventListener('click', () => this.goToPageByName(page.name));
    });
  }

  init() {
    this.addTemplates();
    this.initNavClicks();
    this.goToPageByName('tutorial');
  }
}
