//import the PIXI library's functionality
import * as PIXI from "pixi.js";

//import the Global variables
import { Globals } from "./Globals";

//export the diamond class to be used in Platform.js
export class Diamond {
    //the constructor needs to know the x and y coordinates of the diamond
    constructor(x, y) {
        //the diamond's sprite is a new PIXI sprite using the 'diamond' png as a texture
        this.sprite = new PIXI.Sprite(Globals.resources["diamond"].texture);
        this.sprite.x = x;
        this.sprite.y = y;
    }

    //method to check if diamond is colliding with hero
    checkCollision(hero) {
        //if the diamond is already collected (and therefore is null)
        if (!this.sprite) {
            //break the code early, don't continue the method
            return;
        }
    
        //if the diamond sprite is overlapping the hero sprite...
        if (this.isOverlap(hero)) {

            console.log("diamond collected!");
            
            //destroy the visible sprite
            this.sprite.destroy();

            //delete it from the array, it no longer exists
            this.sprite = null;

            
        }

    }

    //checking if the hero is overlapping the diamond sprite
    isOverlap(hero) {
        return hero.bottom  >= this.top && 
            hero.top <= this.bottom &&
            hero.right >= this.left &&
            hero.left <= this.right

    }


    get left() {
        return this.sprite.x + this.sprite.parent.x;
    }

    get right() {
        return this.left + this.sprite.width;
    }

    get top() {
        return this.sprite.y + this.sprite.parent.y;
    }

    get bottom() {
        return this.top + this.sprite.height;
    }
}

        



        