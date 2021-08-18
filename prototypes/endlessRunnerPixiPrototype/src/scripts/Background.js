import * as PIXI from "PIXI.js";
import { Globals } from "./Globals";

//exporting the Background class to be used in MainScene.js
export class Background {
    constructor() {
        this.container = new PIXI.Container();
        this.createSprite();
    }
    //method to create the sprite using the selected resource
    createSprite() {
        //creating the sprite as a new PIXI.Sprite using the resource labelled "background" for its texture
        const sprite = new PIXI.Sprite(Globals.resources["background"].texture);
        // sprite.x = 0;
        // sprite.y = 0;
        //adding the background sprite as a child to the container of the Background class
        this.container.addChild(sprite);
    }

}