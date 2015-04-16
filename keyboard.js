/* global loop */

var keyboard = [];

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

var ESC = 27;

var ENTER = 13;
var KEY_A = 65;
var KEY_B = 68;

/*document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);*/
document.addEventListener("onblur", keyboardClear, false);

//<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>        
$(window).blur(function(){
    keyboardClear();
    window.cancelAnimationFrame(playing);
    playing = undefined;
});
$(window).focus(function() {
    if(!playing) {
        playing = requestAnimationFrame(loop);
        lastUpdate = Date.now();
    }
});


function keyboardClear() {
    keyboard = [];
}

document.onkeydown = function(e) {
    //console.log(e.keyCode);
    keyboard[e.keyCode] = true;
    if((e.keyCode >= 112) && (e.keyCode <= 123))
        return true;
    return false;
};

document.onkeyup = function(e) {
    delete keyboard[e.keyCode];
    if((e.keyCode >= 112) && (e.keyCode <= 123))
        return true;
    return false;
};

/*
function keyDown(e) {
    keyboard[e.keyCode] = true;
}

function keyUp(e) {
    delete keyboard[e.keyCode];
    //keyboard.splice(e.keyCode, 1);
}*/