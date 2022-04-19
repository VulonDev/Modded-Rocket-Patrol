class PlayAlt extends Phaser.Scene {
    constructor() {
        super("playAltScene");
    }

    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('fighter', './assets/fighter.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosionf', './assets/explosionf.png', {frameWidth: 64, frameHeight: 25, startFrame: 0, endFrame: 9});
    }

    create() {
        this.add.text(20, 20, "Rocket Patrol Play");
        
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize *2, 0x00FF00).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        
        //add rocket (p1)
        this.p1Rocket = new Rocket1(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        //define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        //add fighter
        this.fighter01 = new Fighter(this, game.config.width + borderUISize * 3, borderUISize*8 + borderPadding*2, 'fighter', 0, 50).setOrigin(0,0);

        //randomize ship movement
        this.randomizeDirection(this.ship01);
        this.randomizeDirection(this.ship02);
        this.randomizeDirection(this.ship03);
        this.randomizeDirection(this.fighter01)
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first:0}),
            frameRate: 30
        });

        // init score
        this.p1Score = rememberScore;
        this.p2Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - 100 -(borderUISize + borderPadding), borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        this.scoreHigh = this.add.text(game.config.width/2 -50, game.config.height - borderUISize, highScore, scoreConfig );

        //GAME OVER flag
        this.gameOver = false;

        // play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.winMessage = this.add.text(game.config.width/2, game.config.height/2 - 60, 'ajifohjaig', scoreConfig).setOrigin(0.5);
            if(rememberScore == 0) {
                this.winMessage.text = "Player 1: " + this.p1Score + "    \nContinue to Player 2";
                rememberScore = this.p1Score;
            }
            else if (rememberScore > this.p2Score) {
                this.winMessage.text = "PLAYER 1 WINS";
                rememberScore = 0;
            }
            else if (rememberScore < this.p2Score) {
                this.winMessage.text = "PLAYER 2 WINS";
                rememberScore = 0;
            }
            else {
                this.winMessage.text = "IT'S A TIE";
                rememberScore = 0;
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Continue or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            if(this.p1Score > highScore || this.p2Score > highScore) {
                highScore = this.p1Score;
                if(this.p2Score = highScore) {highScore = this.p2Score;}
                this.scoreHigh.text = highScore;
                this.add.text(game.config.width/2, game.config.height/2+64+64, 'New High Score: ' + highScore, scoreConfig).setOrigin(0.5);
            }
        }, null, this);

        //speed increase after 30 sec
        this.speedUp = this.time.delayedCall(30000, () => {
            this.ship01.speedUp();
            this.ship02.speedUp();
            this.ship03.speedUp();
            this.fighter01.speedUp();
        }, null, this);

        //display timer
        scoreConfig.fixedWidth = 35;
        this.timer = this.add.text(game.config.width/2 - 17.5, borderUISize + borderPadding*2, "aoifhihtedsiga", scoreConfig);
        scoreConfig.fixedWidth = 0;

        
    }

    update() {

        //draw timer

        this.timer.text = Math.floor(60 - (60 * this.clock.getProgress()));
        //check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start('menuScene');
        }
        this.starfield.tilePositionX -= 4;

        if(!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.fighter01.update();
        }

        if(rememberScore == 0) {
            //check collisions p1
            if(this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.p1ShipExplode(this.ship03);
            }
            if(this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.p1ShipExplode(this.ship02);
            }
            if(this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.p1ShipExplode(this.ship01);
            }

            if(this.checkCollision(this.p1Rocket, this.fighter01)) {
                this.p1Rocket.reset();
                this.p1FighterExplode(this.fighter01);
            }
        }
        else {
            //check collisions p2
            if(this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset();
                this.p2ShipExplode(this.ship03);
            }
            if(this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset();
                this.p2ShipExplode(this.ship02);
            }
            if(this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset();
                this.p2ShipExplode(this.ship01);
            }

            if(this.checkCollision(this.p1Rocket, this.fighter01)) {
                this.p1Rocket.reset();
                this.p2FighterExplode(this.fighter01);
            }
        }

    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        }
        else {
            return false;
        }
    }

    p1ShipExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    p2ShipExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        this.sound.play('sfx_explosion');
    }

    p2FighterExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosionf').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        this.sound.play('sfx_explosion');
    }

    p1FighterExplode(ship) {
        //temp hide ship
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, 'explosionf').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

    randomizeDirection(ship) {
        let dir = Phaser.Math.Between(1,2);
        if(dir == 2) {
            ship.flipX = true;
            ship.moveSpeed *= -1;
        }
    }
}