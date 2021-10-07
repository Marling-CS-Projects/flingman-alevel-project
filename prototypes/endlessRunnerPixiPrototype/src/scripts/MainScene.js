//importing pixi functionality
import * as PIXI from "pixi.js";

//importing the global resources we created in Globals.js
import { Globals } from "./Globals";

//importing the Background class made in Background.js
import { Background } from "./Background";

//importing the Platforms class from Platforms.js
import { Platforms } from "./Platforms";

import { Hero } from "./Hero";

import { DiamondCounter } from "./DiamondCounter";

import { FinalScene } from "./FinalScene";






//exporting the main scene of the game, to be used in App.js "Start" function
export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        this.createPlatforms();
        this.createHero();
        this.createInterface();

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

        //setting the MainScene container to be interactive
        this.container.interactive = true;

        //when the mouse is clicked....
        this.container.on("pointerdown", () => {
            //call the method to for the hero to jump
            this.hero.startJump();

        });

        this.hero.sprite.once("die", () => {
            Globals.scene.start(new FinalScene());
        });
            


    }

    createInterface() {
        //creating a label to show how many diamonds are collected by adding the DiamondCounter class
        this.labelCollected = new DiamondCounter();

        //add the diamond counter to the container of the main scene as a child
        this.container.addChild(this.labelCollected.view);

        //when the "collect" event from Hero.js is emitted, the label gets rendered with its updated value displayed
        this.hero.sprite.on("collect", () => {
            this.labelCollected.render(this.hero.diamondsCollected);

            // Assess if the platforms should speed up and apply here

            if (this.hero.diamondsCollected === 5 || this.hero.diamondsCollected === 10 || this.hero.diamondsCollected === 15) {
            console.log("speedUp!");
                
            this.platforms.increasePlatformSpeed();
           
            
            
            }
        });
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