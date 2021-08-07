// Importing the pixi library
import * as PIXI from "pixi.js";
// Import the custom loader I made
import { Loader } from "./Loader";
//Import the class for the scene(any game screen; main menu, background, game over etc) I made 
import { MainScene } from "./MainScene";


// Creating a class used as the basis of the application that creates the canvas and automatically sizes it to the device window
export class App {
    run() {
        //create the canvas
        this.app = new PIXI.Application({resizeTo: window}); 
        document.body.appendChild(this.app.view);

        //load the sprites
        this.loader = new Loader(this.app.loader);
        //the game will start when the promise(in Loader.js) is fulfilled!
        this.loader.preload().then(() => this.start());
    }
    //start the game
    start() {
        console.log(this.app.ticker);

        //setting up the scene to be displayed
        this.scene = new MainScene();
        //adding the scene to the 'Stage' container, which is auto included in the application by pixi
        this.app.stage.addChild(this.scene.container);


        
    }
    
}