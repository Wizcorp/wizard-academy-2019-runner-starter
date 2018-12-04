import { IView } from '../interfaces';

export class GameView extends PIXI.Container implements IView {

	centerContainer: PIXI.Container;

	constructor () {
		super();

		this.centerContainer = this.addChild(new PIXI.Container());

		const txt = new PIXI.Text('game view', { fill: 0xffffff, fontSize: 60 });
		txt.anchor.set(0.5, 0.5);
		this.centerContainer.addChild(txt);

	}

	resize (gameWidth: number, gameHeight: number) {
		this.centerContainer.position.set(gameWidth / 2, gameHeight / 2);
	}

	open () {

	}

	update (dt: number) {

	}

}
