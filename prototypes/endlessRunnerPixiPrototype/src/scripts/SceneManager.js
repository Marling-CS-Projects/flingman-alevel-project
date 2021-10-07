import * as PIXI from "pixi.js"

//scene manager will manage which scene is currently on the screen, changing from the "main game" screen to the game over screen, etc
export class sceneManager {
    constructor() {
        this.container = new PIXI.Container();

        this.scene = null;
    }

    start(scene) {

        //by the time a new scene is being made, there will already be others. We need to remove them for when this new scene is made
        if(this.scene) {
            //remove the current scene from the scene container in MainScene.js
            this.scene.container.destroy();
        }

        //setting up the scene to be displayed
        this.scene = scene;

        //adding the scene as a child of the MainScene container
        this.container.addChild(this.scene.container);

        
        


        
    }

    //if there is a created scene and the update method for it is called, then update using delta time (time since last frame)
    update(dt) {
        if(this.scene && this.scene.update) {
            this.scene.update(dt);
        }
    }
}