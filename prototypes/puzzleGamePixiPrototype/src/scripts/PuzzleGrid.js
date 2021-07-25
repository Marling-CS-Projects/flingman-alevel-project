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

        //enables the children in this container (the puzzle pieces) to be sorted, lets us sort based on their zIndex (layer)
        this.container.sortableChildren = true;

        //call the method to create the puzzle pieces
        this.createPuzzlePieces();



    }
    //creating the puzzle pieces 
    createPuzzlePieces() {
        this.pieces = [];

        let IDs = PuzzleGridConfig.map(field => field.id);
        

        // Iterate through the fields in PuzzleGridConfig.js and add random pieces to them
        PuzzleGridConfig.forEach(field => {

            //Generates a random number from 0 to 8 (representing the different PuzzlePieces in the IDs array)
            const random = Math.floor(Math.random() * IDs.length);  

            //The id of the piece to be put in the grid will be found using the above random generator
            const id = IDs[random];

            //Prevents a piece with an id that is already in the new array from being chosen again
            IDs = IDs.filter(item => item !== id)

            //The puzzle pieces will need an id and the field fetched from PuzzleGridConfig
            const piece = new PuzzlePiece(id, field);

            //custom event for when the piece is no longer being dragged, to enable piece swapping later
            piece.on("dragEnd", () => this.onPieceDragEnd(piece));
            
            //adding the sprite of the piece to the container of the puzzle grid
            this.container.addChild(piece.sprite);

            //adding the pieces to the array
            this.pieces.push(piece);
        });

    }

    //when the piece is released, replace it with the piece it is overlapping
    onPieceDragEnd(piece) {
    
        const pieceToReplace = this.pieces.find(item => 
            item !== piece &&

            //dragged piece should replace the piece if the centre is to the left of the right side
            piece.sprite.x >= item.left &&
            //dragged piece should replace the piece if the centre is to the right of the left side
            piece.sprite.x <= item.right &&
            //piece.centre should be below the top side
            piece.sprite.y <= item.bottom &&
            //piece.centre should be above the bottom side
            piece.sprite.y >= item.top
        );
        
        if (pieceToReplace) {
            const replaceField = pieceToReplace.field;
            pieceToReplace.setField(piece.field);
            piece.setField(replaceField);

        } else {
            piece.resetPiece();
        }

    }

}