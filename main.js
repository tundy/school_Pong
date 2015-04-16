/* global KEY_A, KEY_D, LEFT, RIGHT */

var canvas;
var context;
var lastUpdate;
var scene;
var playing;

var settings = [];
settings[0] = [];              // top player settings
settings[0][0] = KEY_A;
settings[0][1] = KEY_D;
settings[1] = [];              // bot player settings
settings[1][0] = LEFT;
settings[1][1] = RIGHT;
settings[2] = [];              // side settings
settings[2][0] = "AreaMiddleFastball";       // top
settings[2][1] = "Player";     // bot
settings[3] = 10;              // max score
//settings[4] = [];
//settings[4][0] = 25;           // speed
//settings[4][1] = 90;           // width
//settings[4][2] = 16;           // height

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

function loop() {
    var now = Date.now();
    var delta = (now - lastUpdate) / 100;
    lastUpdate = now;
    
    scene.update(delta);
    scene.draw();
    
    playing = requestAnimationFrame(loop);
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 400;
    
    lastUpdate = Date.now();
    MainMenu();
    
    playing = requestAnimationFrame(loop);
};