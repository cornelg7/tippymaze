import Tutorial from './pages/tutorial';

export default class Router {
  constructor(document) {
    this.document = document;
  }

  PAGES = [{ name: 'tutorial' }];

  addTemplates() {
    this.document.querySelector('#content-tutorial').append(new Tutorial().content);
  }

  deactivatePage(page) {
    this.document.querySelector(`#nav-${page.name}`).classList.remove('active');
    this.document.querySelector(`#content-${page.name}`).classList.remove('active');
  }

  activatePage(page) {
    this.document.querySelector(`#nav-${page.name}`).classList.add('active');
    this.document.querySelector(`#content-${page.name}`).classList.add('active');
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
