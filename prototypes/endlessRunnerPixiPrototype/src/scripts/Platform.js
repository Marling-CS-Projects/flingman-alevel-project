import * as PIXI from "pixi.js";

import { Globals } from "./Globals";

import { Diamond } from "./Diamond";

//the tiles are 64 pixels by 64 pixels
const TileSize = 64;

//exporting the Platforms class to be used in MainScene to implement them into the game
export class Platform {
    constructor(rows, cols, x) {
        //creating an array for the collectible diamonds
        this.diamonds = [];
        this.diamondsOffsetMin = 100;
        this.diamondsOffsetMax = 200;

        //offset value for moving platforms
        this.dx = -5;

        this.rows = rows;
        this.cols = cols;
    

        //defining aspects of the platform
        this.width = cols * TileSize;

        this.height = rows * TileSize;
        //create the platform as a container, and specify its x position
        this.createContainer(x);

        this.createTiles();

        this.createDiamonds();
        
        
    }

    createDiamonds() {
        //creating a random value for the poition of the diamonds on the y axis
        const y = this.diamondsOffsetMin + Math.random() * (this.diamondsOffsetMax - this.diamondsOffsetMin);
        //iterate over every tile on a platform; each tile has a 40% chance to spawn a diamond
        for (let i = 0; i < this.cols; i++) {
            //gives a 40% chance of it happening
            if (Math.random() < 0.3) {
                //the tiles are 64 pixels, so multiply tilesize by the column number to get the coordinate of the tile  
                //the y value is negative because a positive value would place diamonds below the platform, + y = down, - y = up
                const diamond = new Diamond(64 * i, -y);

                //add the diamond sprite to the container
                this.container.addChild(diamond.sprite);

                //push the created diamond to the array of diamonds
                this.diamonds.push(diamond)
            }

        }
    }

    //check if the hero is colliding with the platform
    checkCollision(hero) {

        //iterate over the array of diamonds, and check if the hero is colliding with any of them
        this.diamonds.forEach(diamond => diamond.checkCollision(hero));
        

        //if the hero is colliding with the top (call the method to check, using hero as a parameter)
        if (this.isCollideTop(hero)) {

            //then the hero should stay on top of THIS platform (call method)
            hero.stayOnPlatform(this);
            
        } else {

            //if the hero's current platform is this platform, and the hero isn't colliding with it, set the hero to not have a platform
            if (hero.platform === this) {

                hero.platform = null;
            }

            //if the hero is colliding with the left of a platform....
            if (this.isCollideLeft(hero)) {
            
                //then the hero should move with it off the screen
                hero.moveByPlatform(this);
            }
        }
    }

    //checking if the player is touching the top of the platform
    isCollideTop(hero) {

        //return that the hero IS colliding with the platform if......
        // if the hero's right side is on or in front of the left side of the platform
        return hero.right >= this.left &&

        // if the hero's left side is on or behind the right side of the platform
        hero.left <= this.right &&

        // if the hero's lower side is below or equal to the top side of the platform
        hero.bottom <= this.top &&

        // if the hero's lower side will be higher or equal to the platform in the next frame
        hero.nextFrameBottom >= this.top;

    }

    //checking if the hero is colliding with the side of the platform
    isCollideLeft(hero) {

        return hero.bottom >= this.top &&

        hero.top <= this.bottom &&

        hero.right <= this.left && 

        hero.right >= this.nextFrameLeft;

    }

    //get the different positional values of the platform
    get left() {
        return this.container.x;
    }

    get right() {
        return this.left + this.width;
    }

    get top() {
        return this.container.y;
    }

    get bottom() {
        return this.top + this.height;
    }

    //get the left position, taking into account where it will be next frame
    get nextFrameLeft() {
        return this.left + this.dx;
    }
    
    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;

        //the height of the platform will be the number of rows multiplied by tilesize subtracted from the height of the screen
        this.container.y = window.innerHeight - this.rows * TileSize;   
    }

    createTiles() {
        //creating the tiles of the platform using iteration; for every row needed in the platform the tiles will be created
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }

        }
    }

    //method to create each individual tile
    createTile(row, col) {
        // if the row being iterated is the top, then each tile should be the grassy block, if not then the dirt block
        const texture = row === 0 ? "platform" : "tile"
        //creating the tile as a new pixi sprite using "tile.png" as the texture
        const tile = new PIXI.Sprite(Globals.resources[texture].texture);
        //adding the tile as a container of the Platform class
        this.container.addChild(tile);
        //the x position of the tile is its column number multiplied by the width of the tile (64 pixels)
        tile.x = col * tile.width;
        //the y position of the tile is its row number multiplied by the height of the tile (64 pixels)
        tile.y = row * tile.height;
    }

    //the method to handle the movement of the platforms
    move(){
        this.container.x += this.dx;

        //if the platform goes past the left side of the screen, declare it as hidden
        if (this.right < 0) {
            this.container.emit("hidden");
        }
    }


}