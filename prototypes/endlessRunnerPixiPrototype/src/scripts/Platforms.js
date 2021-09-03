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
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200,
            }
         };


        //create a platform, with 4 rows and 6 columns of tiles, at x 200
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

        data.x = this.current.right + offset;

        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));

        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        

        //return the generated random data
        return data;
        
    }

    createPlatform(data) {
        //the created platforms is an instance of the Platform class with parameters of rows, columns, and x value
        const platform = new Platform(data.rows, data.cols, data.x);

        //adds the platform to the container of Platforms, which is later added to the container of Main scene
        this.container.addChild(platform.container);

        //pushes the created platform to the array on line 7
        this.platforms.push(platform);
        
        //'current' property contains the current platform
        this.current = platform;

        //filters out any hidden platforms from the platform array
        platform.container.once("hidden", () => {
            this.platforms = this.platforms.filter(item => item !== platform);
            //remove platforms that are no longer visible, that have been removed from the array
            platform.container.destroy();
        
        });


    }

    //method to check if the hero is colliding with any platform currently visible
    checkCollision(hero) {
        //iterate over the array of all visible platforms
        this.platforms.forEach(platform => {
            platform.checkCollision(hero);  
            
        });


    }

    //new platform must be created each time we see a new platform
    update(dt) {
        //if the current platform is fully visible, create a new platform
        if (this.current.right < window.innerWidth) {
            this.createPlatform(this.randomData);
        }

        //iterate over all the platforms in the platforms array to get all platforms to move (Creating illusion that player is running)
        this.platforms.forEach(platform => {
            platform.move();
        })

    }
}