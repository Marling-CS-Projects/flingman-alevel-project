// Importing the pixi library
import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

// Import the custom loader I made
import { Loader } from "./Loader";
//Import the class for the scene(any game screen; main menu, background, game over etc) I made 
import { MainScene } from "./MainScene";
import { sceneManager } from "./SceneManager";


// Creating a class used as the basis of the application that creates the canvas and automatically sizes it to the device window
export class App {
    run() {
        //create the canvas
        this.app = new PIXI.Application({resizeTo: window}); 
        document.body.appendChild(this.app.view);

        //the scene manager's new created scene needs to be accessable from anywhere, stick it in as a Global
        Globals.scene = new sceneManager();

        //add the container of the scene (from SceneManager.js :P) to the app
        this.app.stage.addChild(Globals.scene.container);

        this.app.ticker.add(dt => Globals.scene.update(dt))

        //load the sprites
        this.loader = new Loader(this.app.loader);
        //the game will start when the promise(in Loader.js) is fulfilled!
        this.loader.preload().then(() => {
            Globals.scene.start(new MainScene());
        }); 

        
        
    

    
    }


    
}