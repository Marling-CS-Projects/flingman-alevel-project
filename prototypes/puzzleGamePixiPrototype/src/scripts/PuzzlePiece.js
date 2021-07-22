//Import Pixi functionality
import * as PIXI from "pixi.js";

//Import Globals to use resources
import { Globals } from "./Globals";

// Class for the puzzle pieces
export class PuzzlePiece {
    //each piece needs an id (1 to 9) and the field in the grid where it will be placed
    constructor(id, field) {
        //the texture of the sprite will be the puzzle piece with the corresponding id from Globals
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);
        this.sprite.x = field.x;
        this. sprite.y = field.y;

        //set the sprites to be placed relative to their centre
        this.sprite.anchor.set(0.5);

        //reduce the size of the sprites by 50% as they are 300px but the fields are 150px
        this.sprite.scale.set(0.5)
    }
}
