export interface IView extends PIXI.Container {
	resize(gameWidth: number, gameHeight: number) : void;
	open() : void;
	update(dt: number) : void;
}
