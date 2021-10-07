import * as PIXI from "pixi.js"

import { Globals } from "./Globals"

import { Platform } from "./Platform"
import { Platforms } from "./Platforms";

export class Hero {
    constructor() {

        this.diamondsCollected = 0;
        //the speed along the y axis
        this.dy = 0;

        //the index for tracking if the hero has jumped
        this.jumpIndex = 0;

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

    

    //star the hero's jump
    startJump() {
        //only let the jump happen if the hero is on a platform, OR if the jump index is 1 (enables a double jump if the hero has previously jumped)
        if (this.platform || this.jumpIndex === 1) {

            ++this.jumpIndex;

            //when the hero jumps, they are no longer assigned to the platform
            this.platform = null;

            //set their y speed to go up, gravity will take effect when they are off the platform
            this.dy = -18;

            

            
        }
    }

    //getters for the different locational properties of the hero sprite
    get left() {
        return this.sprite.x;
    }

    get right() {
        return this.left + this.sprite.width;
    }

    get top() {
        return this.sprite.y;
    }

    get bottom() {
        return this.top + this.sprite.height;
    }

    //the bottom of the sprite, taking into account its falling speed 
    get nextFrameBottom() { 
        return this.bottom + this.dy;
    }

    //method called in Platform.js when the hero collides with the top of a platform
    stayOnPlatform(platform) {

        //set the collided platform as the current platform
        this.platform = platform;

        //set the y speed to 0
        this.dy = 0;

        //reset the hero's jump index
        this.jumpIndex = 0;

        //set the hero to be positioned on the top of the platform (anchor point of sprite is top left, so subtract height to place it exactly on top)
        this.sprite.y = platform.top - this.sprite.height;
    }

    //if the hero is colliding with a platform's left, set its x to the left of the platform in the next frame, - width as the anchor point for the hero sprite is the top left
    moveWithPlatform(platform) {
        this.sprite.x = platform.nextFrameLeft - this.sprite.width;
    }

    //when the hero collects a diamond...
    collectDiamond() {

        //increase the value of diamondsCollected by 1
        ++this.diamondsCollected;

        //emit the event for collecting a diamond
        this.sprite.emit("collect");

    


        

       

    }

    //constatantly updates each frame to check if hero is on a platform
    update() {
        //if hero isn't on a platform, increase the y velocity 
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }

        if (this.sprite.y > window.innerHeight) {
            this.sprite.emit("die");
        }

        
    }

}