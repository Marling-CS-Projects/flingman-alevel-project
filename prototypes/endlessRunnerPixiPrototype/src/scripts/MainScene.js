//importing pixi functionality
import * as PIXI from "pixi.js";

//importing the global resources we created in Globals.js
import { Globals } from "./Globals";

//importing the Background class made in Background.js
import { Background } from "./Background";

//importing the Platforms class from Platforms.js
import { Platforms } from "./Platforms";

import { Hero } from "./Hero";




//exporting the main scene of the game, to be used in App.js "Start" function
export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        this.createPlatforms();
        this.createHero();

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

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
    }

    //called every frame
    update(dt) {
        //calls the update method from Background.js
        this.bg.update(dt);

        //each frame, check if the hero is colliding with a platform
        this.platforms.checkCollision(this.hero);

        //calls the update method from Platforms.js
        this.platforms.update(dt);
        
        //calls the update method from Hero.js
        this.hero.update(dt); 


    }

} 