const app = new PIXI.Application({
    width: 480,
    height: 320
});

const tileSize = 16;

document.body.appendChild(app.view);

app.loader.add('tileset', 'assets/tileset.png').load((loader, resources) => {

    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
        let x = i % 7;  
        let y = Math.floor(i / 7);
        tileTextures[i] = new PIXI.Texture(
            resources.tileset.texture,
            new PIXI.Rectangle(x * tileSize, x * tileSize, tileSize, tileSize)
        );
    }


    const bunny = new PIXI.Sprite(tileTextures[0]);



    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    app.stage.addChild(bunny);

    app.ticker.add(() => {
        tileset.rotation += 0.01
    });
});

app.loader.onError.add((error) => console.error(error));