import './style.css';
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';
import { TitleView } from "./views/title";
import { GameView } from "./views/game";
import { IView } from './interfaces';

const minRatio = 1242 / 2688; // iPhone X full-screen
const maxRatio = 1242 / 1700; // iPhone 6/7/8 with browser visible
const gameWidth = 750;
let gameHeight = gameWidth;

let app = new PIXI.Application({width: gameWidth, height: gameHeight});
document.body.appendChild(app.view);

let currentView: IView;

function resize() {
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	let screenRatio = canvasWidth / canvasHeight;

	if (screenRatio < minRatio) {
		screenRatio = minRatio;
	}

	if (screenRatio > maxRatio) {
		screenRatio = maxRatio;
	}

	if (canvasWidth / screenRatio > canvasHeight) {
		canvasWidth = canvasHeight * screenRatio;
	}

	canvasHeight = canvasWidth / screenRatio;

	const canvas = document.querySelector("canvas");
	canvas.style.width = canvasWidth + "px";
	canvas.style.height = canvasHeight + "px";

	gameHeight = gameWidth / screenRatio;
	
	app.renderer.resize(gameWidth, gameHeight);

	if (currentView) {
		currentView.resize(gameWidth, gameHeight);
	}
}

window.addEventListener("resize", resize, false);
window.addEventListener("orientationchange", resize, false);

const views: { [viewName: string]: IView; } = {};

function registerView(viewName: string, view: IView) {
	views[viewName] = view;
	view.visible = false;
	app.stage.addChild(view);

	view.on('openView', (newViewName: string) => {
		openView(newViewName);
	})
}

function openView(viewName: string) {
	if (currentView) {
		currentView.visible = false;
	}
	currentView = views[viewName];
	currentView.visible = true;
	currentView.open();
	resize();
}

PIXI.loader
	// .add('my_image', require('./path/to/image.png'))
	.load(() => setup());

function setup() {
	registerView('title', new TitleView());
	registerView('game', new GameView());
	openView('title');
	update();
}


let lastTime = Date.now();
function update() {
	const now = Date.now();
	const dt = now - lastTime;
	lastTime = now;
	currentView.update(dt);
	TWEEN.update();
	requestAnimationFrame(update);
}
