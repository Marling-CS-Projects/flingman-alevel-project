import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

//exporting the Background class to be used in MainScene.js
export class Background {
    constructor() {
        //the speed of the background
        this.speed = 2;
        //setting the background as a 'container' using PIXI's container functionality
        this.container = new PIXI.Container();
        this.createSprites();
    }
    //method to create 3 sprites that will be the 3 looping tiles of the background in an array
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
        //push the created sprites to the sprites array
        this.sprites.push(sprite);
    }

    move(sprite, offset) {
        //the right most part of the sprite
        const spriteRightX = sprite.x + sprite.width;
        //the left of the screen is always 0
        const screenLeftX = 0;
        //if the sprite's right edge reaches the left of the screen, send it 3 times the length of a background tile forward
        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length
        }

        sprite.x -= offset;
    }



    //method to update the position of the background
    update(dt) {
        //the offset to move the background tiles by, is the const of 'speed' * the delta time (time since last frame update)
        const offset = this.speed * dt;
        //for every sprite, call the move function and move them by the offset
        this.sprites.forEach(sprite => {
            this.move(sprite, offset)
        });
        
    }

}