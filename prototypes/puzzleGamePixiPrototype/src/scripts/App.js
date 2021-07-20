// Importing the pixi library
import * as PIXI from "pixi.js";
// Import the custom loader I made
import { Loader } from "./Loader";

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
    start() {
        console.log("Game starting!")
    }
    
}