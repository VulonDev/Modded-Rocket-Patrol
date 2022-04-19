/*
Elizabeth Arnold - Rocket Patrol Mods
This took about 5.5 hours to complete

MODDED CHANGES:

track and display high score (5)
speed increase 30 sec into the game (5) 
simultaneous 2 player mode (30) 
smaller, faster ship (20) 
alternating 2 player mode (20) 
display time remaining on the screen (10)
randomize ship movement (5) 
allow player to control rocket after firing (5) 

alternating, singleplayer, and simultaneous multiplayer are separate modes to be selected
at the menu screen. all three modes include every mod, except of course the mutually exclusive singleplayer/multiplayer modes.
in each mode the ui is adjusted to be appropriate to the mode, in terms of score display and (for simultaneous multiplayer) the color of the rockets.

simultaneous multiplayer is played with two people on the same keyboard. one uses W, A, D and the other uses UP, LEFT, RIGHT arrows.
alternating multiplayer and singleplayer both always use W, A, D. 

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