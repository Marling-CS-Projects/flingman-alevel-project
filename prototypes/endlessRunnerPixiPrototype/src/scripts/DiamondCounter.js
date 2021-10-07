import * as PIXI from "pixi.js";

//the diamond counter will be used in MainScene to keep track of diamonds that heros have collected
export class DiamondCounter {
    constructor() {

        this.view = new PIXI.Text();

        this.view.x = 5;
        this.view.y = 5;

        //using CSS styling for the diamond counter
        this.view.style = {
            fontFamily: "Arial",
            fontSize: 50,
            fill: ["#CF5AFF"]

        };

        this.render();

    }
    
        render(diamondsCollected = 0) {
            this.view.text = `Diamonds Collected = ${diamondsCollected}`;
        }   

        
}