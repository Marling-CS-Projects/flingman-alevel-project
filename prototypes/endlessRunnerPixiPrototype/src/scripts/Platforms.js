import * as PIXI from "pixi.js"
import { Platform } from "./Platform"

//exporting the Platforms class to be used in MainScene to implement them into the game
export class Platforms {
    constructor() {
        //all of the platforms will be stored in an array
        this.platforms = [];
        this.container = new PIXI.Container();

        //creating ranges for the random data for new platforms; their size and position are randomized 
        this.ranges = { 
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 4,
                max: 8
            },
            offset: {
                min: 60,
                max: 200,
            }
         };


        //create a platforms, with 4 rows and 6 columns of tiles, at x 200
        this.createPlatform({
            rows: 4,
            cols:6,
            x:200

        });
    }
    //getting random data for the platforms to be created
    get randomData() {
        let data = { rows: 0, cols: 0 , x: 0 };

        //formula for generating a random value within the set range
            // const randomNumber = min + Math.round(Math.random() * (max - min));

        //generate the random properties of the new platofrm and updates the 'data' properties for each one
        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));

        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        data.x = this.current.right + offset;

        //return the generated random data
        return data;
        
    }

    createPlatform(data) {
        //the created platforms is an instance of the Platform class with parameters of rows, columns, and x value
        const platform = new Platform(data.rows, data.col, data.x);
        //adds the platform to the container of Platforms, which is later added to the container of Main scene
        this.container.addChild(platform.container);
        //pushes the created platform to the array on line 7
        this.platforms.push(platform);
        //'current' property contains the current platform
        this.current = platform;


    }

    //new platform must be created each time we see a new platform
    update(dt) {
        //if the current platform is fully visible, create a new platform
        if (this.current.right < window.innerWidth) {
            this.createPlatform(this.randomData);
        }

    }
}