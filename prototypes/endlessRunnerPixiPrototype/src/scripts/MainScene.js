//importing pixi functionality
import * as PIXI from "pixi.js";

//importing the global resources we created in Globals.js
import { Globals } from "./Globals";





//exporting the main scene of the game, to be used in App.js "Start" function
export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        

    }
    //creating the background
    createBackground() {
    }

} 