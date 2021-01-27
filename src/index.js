// Test import of a JavaScript function
import example from './modules/example';

// Test import of an asset
import webpackLogo from './assets/images/webpack-logo.svg';

import Tutorial from './modules/pages/tutorial';
import Router from './modules/router';

// Test import of styles
import './assets/styles/index.scss';

const router = new Router(document);
router.init();

const tutorial = new Tutorial();
console.log('tutorial content: ', tutorial.content);

// Appending to the DOM
const logo = document.createElement('img');
logo.src = webpackLogo;

const heading = document.createElement('h1');
heading.textContent = example();

const app = document.querySelector('#root');
app.append(logo, heading);
