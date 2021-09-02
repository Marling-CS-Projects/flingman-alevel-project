//importing pixi functionality
import * as PIXI from "pixi.js";

//importing the global resources we created in Globals.js
import { Globals } from "./Globals";

//importing the Background class made in Background.js
import { Background } from "./Background";

//importing the Platforms class from Platforms.js
import { Platforms } from "./Platforms"




//exporting the main scene of the game, to be used in App.js "Start" function
export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        this.createPlatforms();

    }
    //creating the background
    createBackground() {
        //creating a new class to contain all the 'Background' code
        this.bg = new Background();
        //adding the container from Background as a child of the main scene
        this.container.addChild(this.bg.container);
    }

    createPlatforms() {
        //the platforms in the main scene are a new instance of the Platforms class
        this.platforms = new Platforms();
        //adding the container from Platforms as a child of the main scene
        this.container.addChild(this.platforms.container);
    }

    //called every frame
    update(dt) {
        //keeps the background moving every frame
        this.bg.update(dt);

        //update position of the platforms
        this.platforms.update(dt);
    }

} 