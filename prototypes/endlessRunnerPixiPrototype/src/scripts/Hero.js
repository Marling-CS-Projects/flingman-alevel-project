import * as PIXI from "pixi.js"

import { Globals } from "./Globals"

export class Hero {
    //the hero is created as a new ANIMATED sprite using an array of the different textures it will animate each frame 
    constructor() {
        
        this.sprite = new PIXI.AnimatedSprite([
            Globals.resources["walk1"].texture,
            Globals.resources["walk2"].texture
        ]);
        //sprite is in centre
        this.sprite.x = window.innerWidth / 2;
        this.sprite.y = window.innerHeight / 2;

        //should the animation loop? YES
        this.sprite.loop = true;

        //the speed at which the frames should switch
        this.sprite.animationSpeed = 0.15;

        //begin the animation
        this.sprite.play();


    }
}