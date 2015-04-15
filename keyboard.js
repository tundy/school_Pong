var keyboard = [];

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

var ESC = 27;

var ENTER = 13;
var KEY_A = 65;
var KEY_B = 68;

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
document.addEventListener("onblur", keyboardClear, false);

function keyboardClear(e) {
    keyboard = [];
}

function keyDown(e) {
    keyboard[e.keyCode] = true;
}

function keyUp(e) {
    delete keyboard[e.keyCode];
    //keyboard.splice(e.keyCode, 1);
}
