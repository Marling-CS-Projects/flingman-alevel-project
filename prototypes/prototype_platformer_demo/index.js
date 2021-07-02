    //Disables pixelation of textures
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    //creating the Canvas
    const app = new PIXI.Application({
        width: 960,
        height: 480
    });


    //setting up constants we will use later
    const tileSize = 16;
    const SCALE = 2;

//creating the map/laying out tiles
let map = {
    width: 30,
    height: 15,
    tiles: [
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 3, 4, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    ],

    //Creating the collision map, 0 won't collide with player, 1 will
    collision: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]
}

/**
 * Testing if the position is colliding with the world
 * 
 * @param {number} worldX 
 * @param {number} worldY 
 * @returns 1 if colliding with a block at location
 */
function testCollision(worldX, worldY) {
    let mapX = Math.floor(worldX / tileSize / SCALE);
    let mapY = Math.floor(worldY /tileSize /  SCALE);
    return map.collision[mapY * map.width + mapX];
}

//Setting up keyboard interactivity 
class Keyboard {
    constructor  () {
        this.pressed = {};
    }

    watchKeyboard (el) {

        el.addEventListener('keydown', (e) => {
            this.pressed[e.key] = true;
        });
        el.addEventListener('keyup', (e) => {
            this.pressed[e.key] = false;
        });
    }
}

document.body.appendChild(app.view);
app.view.setAttribute('tabindex', 0);


// Loading in the assets
app.loader.add('tileset', 'assets/tileset.png')
app.loader.add('player_character', 'assets/player.png')
app.loader.add('enemy_model', 'assets/enemy.png')
app.loader.load((loader, resources) => {

    let kb = new Keyboard();
    kb.watchKeyboard(app.view);

    //Splitting up the tileset in 'assets'
    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
        let x = i % 7;  
        let y = Math.floor(i / 7);
        tileTextures[i] = new PIXI.Texture(
            resources.tileset.texture,
            new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
        );
    }

    //Creating the player
    const player = new PIXI.Sprite.from("assets/player.png");
    player.scale.x = SCALE;
    player.scale.y = SCALE;

    //Creating the enemy
    const enemy = new PIXI.Sprite.from("assets/enemy.png");
    enemy.scale.x = SCALE;
    enemy.scale.y = SCALE;

    //Placing the enemy in the world and setting up variables
    let foe = {
        x: 499, y: 384,
        vx: 0, vy: 0
    };

    
    const test = new PIXI.Sprite.from("assets/test.png");
    test.scale.x = SCALE;
    test.scale.y = SCALE;

    let testCharacter = {
        x: 325, y: 352,
        vx: 0, vy: 0
    };
    

   
    

    


    //Laying out the sky in the background using tileTextures
    let sky = new PIXI.TilingSprite(tileTextures[74], map.width * tileSize, map.height * tileSize);


    //Creating the background the entire size of the map and filling using the array of tileTextures (see map at top)
    let background = new PIXI.Container();
    for (let y = 0; y < map.width; y++) {
        for (let x = 0; x < map .width; x++) {
            let tile = map.tiles[y * map.width + x];
            let sprite = new PIXI.Sprite(tileTextures[tile]);
            sprite.x = x * tileSize;
            sprite.y = y * tileSize;
            background.addChild(sprite);
        }
    }

    //Setting the scale of the background/sky
    sky.scale.x = sky.scale.y = SCALE;
    background.scale.x = SCALE;
    background.scale.y = SCALE;

    //Implementing the background, player, enemy and sky
    app.stage.addChild(sky);
    app.stage.addChild(background);
    app.stage.addChild(player);
    app.stage.addChild(enemy);
    app.stage.addChild(test);
    

    //Placing the player in the world and setting up variables
    let character = {
        x: 0, y: 0,
        vx: 0, vy: 0
    };

    //Placing the enemy in the world and setting up variables

    //Adding a game loop
    app.ticker.add((time) => {
        player.x = character.x;
        player.y = character.y;
        enemy.x = foe.x;
        enemy.y = foe.y;
        test.x = testCharacter.x;
        test.y = testCharacter.y;
        

        //Implementing gravity; player is always dragged down
        character.vy = character.vy + 1;
        

        //Allowing horizontal movement
        character.x += character.vx;   

        foe.x += foe.vx;

        //Pathing the enemy
        if (foe.x <= 500) {
            console.log("I reached 500!");
            foe.vx = 0;
            foe.vx = +5;
            
        };

        if (foe.x >= 750) {
            console.log("I reached 750!");
            foe.vx = 0;
            foe.vx = -5;
        };

        // Collision with the test character, only works if the corners are exactly aligned, needs fixing
       
        if ((((player.x + player.width) > testCharacter.x) && ((player.x < (testCharacter.x + character.width)) && ((player.y == testCharacter.y))))) {
            console.log("stomp!");
            app.stage.removeChild(test);



        };

        // Used to find values of positions for player/test character

        if (kb.pressed.ArrowDown) {
            console.log("player x = ", player.x);
            console.log("player y = ", player.y);
            console.log("player width = ", player.width);
            console.log("player height = ", player.height);

            console.log("test character x = ", testCharacter.x);
            console.log("test character y = ", testCharacter.y);
            console.log("test character width = ", testCharacter.width);
            console.log("test character height = ", testCharacter.height);
        };
        

        

        //Testing if the player is touching the ground using testCollision
        let touchingGround = testCollision(
            character.x,
            character.y + tileSize * SCALE * 2 + 1
        );
        
        //Is the player colliding with anything?
        if (character.vy > 0) {
            for (let i = 0; i < character.vy; i++) {
                //Places test coordinates to allow collision on different parts of the player sprite
                let testX1 = character.x;
                let testX2 = character.x + tileSize * SCALE -1;
                let testY1 = character.y;
                let testY2 = character.y + tileSize * SCALE * 2
                if (testCollision(testX1, testY1) || testCollision(testX2, testY1) || testCollision(testX1, testY2) || testCollision(testX2, testY2)) { //stopping the player if they are colliding
                    character.vy = 0;
                    break;  
                }       
                character.y = character.y + 1;
            }
        }

        //Character Movement

        if (character.vy < 0) {
            character.y += character.vy;
        }


        if (kb.pressed.ArrowUp && touchingGround) {
            character.vy = -16;
        }

        if (kb.pressed.ArrowRight) {
            character.vx = Math.min(10, character.vx + 2);
        }

        if (kb.pressed.ArrowLeft) {
            character.vx = Math.max(-10, character.vx - 2);
        }

        

        // Stopping the character when not pressed

        if (character.vx < 0) {
            character.vx += 1; 
        }

        if (character.vx > 0) {
            character.vx -= 1;
        }

    });

    
});

app.loader.onError.add((error) => console.error(error));