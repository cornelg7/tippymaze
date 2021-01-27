class App {
  PAGES = [
    {name: 'tutorial'}, 
    {name: 'game'},
    {name: 'about'},
  ]

  deactivatePage(page) {
    document.querySelector(`#nav-${page.name}`).classList.remove('active');
    document.querySelector(`#content-${page.name}`).classList.remove('active');
  }

  activatePage(page) {
    document.querySelector(`#nav-${page.name}`).classList.add('active');
    document.querySelector(`#content-${page.name}`).classList.add('active');
  }

  goToPageByName(name) {
    this.PAGES.filter(page => page.name !== name).forEach(page => this.deactivatePage(page));
    const page = this.PAGES.filter(page => page.name === name)[0];
    this.activatePage(page);
  }

  initNavClicks() {
    this.PAGES.forEach(page => {
      document.querySelector(`#nav-${page.name}`).addEventListener('click', () => this.goToPageByName(page.name));
    });
  }

  init() {
    this.initNavClicks();
    this.goToPageByName('tutorial');
  }
}

(function main() {
  const app = new App;
  app.init();
})();