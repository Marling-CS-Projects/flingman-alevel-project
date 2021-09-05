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

}