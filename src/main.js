/* MODDED CHANGES:

track and display high score (5) DONE
speed increase 30 sec into the game (5) DONE
simultaneous 2 player (30) 
smaller, faster ship (20) 
alternating 2 player mode (20)
display time remaining on the screen (10)
randomize ship movement (5)
add BGM (5)

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height /15;
let borderPadding = borderUISize /3;

//reserve keyboard vars
let keyW, keyA, keyD, keyR, keyLEFT, keyRIGHT, keyUP;
//high score
let highScore = 0;
