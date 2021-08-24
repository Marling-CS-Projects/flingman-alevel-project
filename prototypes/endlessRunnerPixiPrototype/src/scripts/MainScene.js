//importing pixi functionality
import * as PIXI from "pixi.js";

//importing the global resources we created in Globals.js
import { Globals } from "./Globals";

//importing the Background class made in Background.js
import { Background } from "./Background";




//exporting the main scene of the game, to be used in App.js "Start" function
export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        

    }
    //creating the background
    createBackground() {
        //creating a new class to contain all the 'Background' code
        this.bg = new Background();
        //adding background sprite as a child in the container of the main scene
        this.container.addChild(this.bg.container);
    }

    update(dt) {
        this.bg.update(dt);
    }

} 