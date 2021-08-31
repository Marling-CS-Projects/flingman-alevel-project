import * as PIXI from "pixi.js"
import { Platform } from "./Platform"

//exporting the Platforms class to be used in MainScene to implement them into the game
export class Platforms {
    constructor() {
        //all of the platforms will be stored in an array
        this.platforms = [];
        this.container = new PIXI.Container();
        //create a platforms, with 4 rows and 6 columns of tiles, at x 200
        this.createPlatform({
            rows: 4,
            col:6,
            x:200

        });
    }

    createPlatform(data) {
        //the created platforms is an instance of the Platform class with parameters of rows, columns, and x value
        const platform = new Platform(data.rows, data.col, data.x);
        //adds the platform to the container of Platforms, which is later added to the container of Main scene
        this.container.addChild(platform.container);
        //pushes the created platform to the array on line 7
        this.platforms.push(platform);
    }
}