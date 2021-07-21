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
        //setting the background to be a pixi sprite using the Globals.resources texture of "bg"
        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
        //setting the background to always fit the screensize of the user
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        //adding the background to the container of the main scene
        this.container.addChild(this.bg);
        //dev utility: displays all global resources :D
        console.log(Globals);
    }
} 