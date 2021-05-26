PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    width: 480,
    height: 320
});

const tileSize = 16;
const SCALE = 2;

let map = {
    width: 16,
    height: 10,
    tiles: [
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 3, 4, 5, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 13, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 13, 12, 12, 12, 12, 12, 12, 12, 12,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    ],
    collision: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]
}

function testCollision(worldX, worldY) {
    console.log(worldX)
    console.log(worldY)
    let mapX = Math.floor(worldX / tileSize / SCALE);
    let mapY = Math.floor(worldY /tileSize /  SCALE);
    return map.collision[mapY * map.width + mapX];
}

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



app.loader.add('tileset', 'assets/tileset.png')
app.loader.add('player_character', 'assets/player.png')
app.loader.load((loader, resources) => {

    let kb = new Keyboard();
    kb.watchKeyboard(app.view);


    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
        let x = i % 7;  
        let y = Math.floor(i / 7);
        tileTextures[i] = new PIXI.Texture(
            resources.tileset.texture,
            new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
        );
    }


    const player = new PIXI.Sprite.from("assets/player.png");
    player.scale.x = SCALE;
    player.scale.y = SCALE;



    



    let sky = new PIXI.TilingSprite(tileTextures[74], map.width * tileSize, map.height * tileSize);
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
    sky.scale.x = sky.scale.y = SCALE;
    background.scale.x = SCALE;
    background.scale.y = SCALE;


    app.stage.addChild(sky);
    app.stage.addChild(background);
    app.stage.addChild(player);

    let character = {
        x: 0, y: 0,
        vx: 0, vy: 0
    };

    app.ticker.add((time) => {
        player.x = character.x;
        player.y = character.y;

        character.vy = character.vy + 1;
        character.x += character.vx;   

        let touchingGround = testCollision(
            character.x,
            character.y + tileSize * SCALE * 2 + 1
        );
        
        if (character.vy > 0) {
            for (let i = 0; i < character.vy; i++) {
                let testX1 = character.x;
                let testX2 = character.x + tileSize * SCALE -1;
                let testY = character.y + tileSize * SCALE * 2
                if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
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