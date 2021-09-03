import * as PIXI from "pixi.js"

import { Globals } from "./Globals"

export class Hero {
    constructor() {
        //the speed along the y axis
        this.dy = 0;

        //what platform is the hero standing on?
        this.platform = null;
        
        //the hero is created as a new ANIMATED sprite using an array of the different textures it will animate each frame 
        this.sprite = new PIXI.AnimatedSprite([
            Globals.resources["walk1"].texture,
            Globals.resources["walk2"].texture
        ]);
        //sprite is in centre
        this.sprite.x = 100;
        this.sprite.y = 100;

        //should the animation loop? YES
        this.sprite.loop = true;

        //the speed at which the frames should switch
        this.sprite.animationSpeed = 0.15;

        //begin the animation
        this.sprite.play();


    }

    //constatantly updates each frame to check if hero is on a platform
    update() {
        //if hero isn't on a platform, increase the y velocity 
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }
    }
}