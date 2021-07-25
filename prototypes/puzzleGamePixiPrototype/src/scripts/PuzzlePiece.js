//Import Pixi functionality
import * as PIXI from "pixi.js";

//Import Globals to use resources
import { Globals } from "./Globals";

// Class for the puzzle pieces as a class of PIXI.utils.EventEmitter
export class PuzzlePiece extends PIXI.utils.EventEmitter {

    //each piece needs an id (1 to 9) and the field in the grid where it will be placed
    constructor(id, field) {

        super();

        //the texture of the sprite will be the puzzle piece with the corresponding id from Globals
        this.sprite = new PIXI.Sprite(Globals.resources[`puzzle${id}`].texture);

        //set field as property of the puzzle piece object
        this.field = field;

        //Setting the position of the puzzle piece to be the same as the field it is placed in
        this.resetPiece();

        

        //set the sprites to be placed relative to their centre
        this.sprite.anchor.set(0.5);

        //reduce the size of the sprites by 50% as they are 300px but the fields are 150px
        this.sprite.scale.set(0.5);

        

        //Call a method that will enable interactivity with this class of sprite
        this.setInteractive();

    }

    setInteractive() {
        //Set the sprite to be interractable
        this.sprite.interactive = true;

        // When the mouse is held down, call onTouchStart, and the context is set to 'this' (the puzzle piece)
        this.sprite.on("pointerdown", this.onTouchStart, this);

        //When the mouse is moved, call onTouchMove, and the context is set to 'this' (the puzzle piece)
        this.sprite.on("pointermove", this.onTouchMove, this);

        //When the mouse is released, call onTouchEnd, and the context is set to 'this' (the puzzle piece)
        this.sprite.on("pointerup", this.onTouchEnd, this);



    }

    onTouchStart(event) {
        // Needs to: 
        //1. remember position of mouse cursor

        //the position of the mouse cursor at the time of the mouse being clicked down is fetched from the click event's global x/y value
        this.touchposition = {x: event.data.global.x, y: event.data.global.y};

        //2. set dragging state for this sprite
        this.dragging = true;

        //3. the sprite needs to be set on a layer above all the others so it isn't dragged underneath by the mouse
        this.sprite.zIndex = 1;

        

    }

    onTouchMove(event) {
        
        //if the mouse is not clicked (this.dragging = true) then return from this function
        if (!this.dragging) {
            return;
        }

        //1. get global coordinates of cursor
        const currentPosition = {x: event.data.global.x, y: event.data.global.y};


        //2. calculate offset by subtract 'touch coordinate' from current coordinate
        const offsetX = currentPosition.x - this.touchposition.x;
        const offsetY = currentPosition.y - this.touchposition.y;

        //3. apply resulting offset to local sprite coordinate
        //the sprite's position is calculated while being dragged by adding the difference in x between where the mouse is, and where the field is
        this.sprite.x = this.field.x + offsetX;
        this.sprite.y = this.field.y + offsetY;
    }

    //When the mouse is no longer clicked
    onTouchEnd() {

        //the dragging state of the sprite ends
        this.dragging = false; 

        //the sprite is reset to its original position
        // this.resetPiece();

        //the sprite is reset to the base layer
        this.sprite.zIndex = 0;

        this.emit("dragEnd");
    }

    resetPiece() {

        //returns the sprite to the coordinates of its original field
        this.sprite.x = this.field.x;
        this.sprite.y = this.field.y; 
    }

    //find the left side of the sprite
    get left() {
        //the Sprite's X value is in the centre, due to anchor being 0.5, so taking away half the width of the sprite will find the left side
        return this.sprite.x - this.sprite.width / 2;

    }

    //find the right side of the sprite
    get right() {

        return this.sprite.x + this.sprite.width / 2;

    }

    //find the top side of the sprite
    get top() {

        return this.sprite.y - this.sprite.height / 2;
    }

    //find the bottom side of the sprite
    get bottom() {

        return this.sprite.y + this.sprite.height / 2;
    }

    setField(field) {
        this.field = field;

        this.resetPiece();
    }


    

    
}
