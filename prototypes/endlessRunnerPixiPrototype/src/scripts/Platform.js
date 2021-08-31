import * as PIXI from "pixi.js"

import { Globals } from "./Globals"

//the tiles are 64 pixels by 64 pixels
const TileSize = 64;

//exporting the Platforms class to be used in MainScene to implement them into the game
export class Platform {
    constructor(rows, col, x) {
        this.rows = rows;
        this.col = col;

        this.createContainer(x);
        this.createTiles();
        
        
    }
    
    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        //the height of the platform will be the number of rows multiplied by tilesize subtracted from the height of the screen
        this.container.y = window.innerHeight - this.rows * TileSize   
    }

    createTiles() {
        //creating the tiles of the platform using iteration; for every row needed in the platform the tiles will be created
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.col; col++) {
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
}