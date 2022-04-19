class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        } 
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, 'MODDED ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 , 'P1 Use (A) (D) to move & (W) to Fire\nP2 Use <- -> to move & (UP) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#B3FF00';
        menuConfig.color = '#800';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 64, 'Multiplayer Modes:   \nPress <- for Synchronous\nPress -> for Alternating\nPress (W) for SinglePlayer', menuConfig).setOrigin(0.5);

        //display high score
        this.add.text(game.config.width/2, game.config.height - borderUISize - borderPadding, 'HIGH SCORE: ' + highScore, menuConfig).setOrigin(0.5);
        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //synch multiplayer
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //alternating multiplayer
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playAltScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            //singleplayer
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playSingle');
        }
    }
}