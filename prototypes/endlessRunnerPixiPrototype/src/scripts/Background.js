import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

//exporting the Background class to be used in MainScene.js
export class Background {
    constructor() {
        this.container = new PIXI.Container();
        this.createSprites();
    }
    //method to create 3 sprites that will be the 3 looping tiles of the backhground
    createSprites() {
        this.sprites = [];
        
        for (let i = 0; i < 3; i++) {
            this.createSprite(i)
        }
        
    }
    
        //method to create the sprite using the selected resource
        createSprite(i) {
        //creating the sprite as a new PIXI.Sprite using the resource labelled "background" for its texture
        const sprite = new PIXI.Sprite(Globals.resources["background"].texture);
        //position the new sprite after the current one using it's indexed (i) position
        sprite.x = sprite.width * i;
        sprite.y = 0;

        
        
        //adding the background sprite as a child to the container of the Background class
        this.container.addChild(sprite);
        //push the sprite to the sprites container
        this.sprites.push(sprite);
    }

}