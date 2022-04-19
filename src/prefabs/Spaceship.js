class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x,y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }

        if(this.x >= game.config.width + this.width) {
            this.x = 0;
        }
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }

    speedUp() {
        if(this.flipX) {
            this.moveSpeed -= 4;
        }
        else{
            this.moveSpeed += 4;
        }
    }
}