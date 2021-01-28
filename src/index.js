import Router from './modules/router';
import styles from './assets/styles/index.scss';
import topnavStyles from './assets/styles/topnav.scss';

const body = document.querySelector('body');
body.classList.add(styles['u-size-large']);
body.innerHTML = `
  <div class="${topnavStyles.topnav}">
    <a href="#" id="nav-tutorial">Tutorial</a>
    <a href="#" id="nav-game">Game</a>
    <a href="#" id="nav-about">About</a>
  </div>
  <div class="${styles.container}">
    <div class="${styles.page}" id="content-tutorial">tutorial</div>
    <div class="${styles.page}" id="content-game">game</div>
    <div class="${styles.page}" id="content-about">about</div>
  </div>
`;

const router = new Router(document);
router.init();
