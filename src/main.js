/* MODDED CHANGES:

track and display high score (5) DONE
speed increase 30 sec into the game (5) DONE
simultaneous 2 player mode (30) DONE
smaller, faster ship (20) DONE
alternating 2 player mode (20) DONE
display time remaining on the screen (10) DONE
randomize ship movement (5) DONE
allow player to control rocket after firing (5) DONE

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, PlayAlt, PlaySingle]
}

let game = new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height /15;
let borderPadding = borderUISize /3;

//reserve keyboard vars
let keyW, keyA, keyD, keyR, keyLEFT, keyRIGHT, keyUP;

//high score
let highScore = 0;

//remember p1 score for alternating multiplayer
let rememberScore = 0;