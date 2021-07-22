// Creating a class for the puzzle grid where the pieces will be randomly arranged :D

// Import PIXI to use its functionality within the class
import * as PIXI from "pixi.js";

// Import the puzzle grid array from PuzzleGridConfig
import { PuzzleGridConfig } from "./PuzzleGridConfig";

//Import the PuzzlePiece class
import { PuzzlePiece } from "./PuzzlePiece";

// Export class to make useable in MainScene.js
export class PuzzleGrid {
    constructor() {

        // Will store all pieces of the puzzle in this container
        this.container = new PIXI.Container();

        //setting the container(puzzle pieces) to be in the centre of the screen
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;

        //call the method to create the puzzle pieces
        this.createPuzzlePieces();



    }
    //creating the puzzle pieces 
    createPuzzlePieces() {
        this.pieces = [];
        // for every field in the puzzle grid, add a piece
        PuzzleGridConfig.forEach(field => {
            //The puzzle pieces will need an id and the field fetched from PuzzleGridConfig
            const piece = new PuzzlePiece(field.id, field);
            
            //adding the sprite of the piece to the container of the puzzle grid
            this.container.addChild(piece.sprite);

            //adding the pieces to the array
            this.pieces.push(piece);
        })
    }
}