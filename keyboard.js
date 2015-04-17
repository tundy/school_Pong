/* global loop */

var keyboard = [];

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

var ESC = 27;

var ENTER = 13;
var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;

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
    if((e.keyCode >= 112) && (e.keyCode <= 123))    // F1 - F12
        return true;
    else if(e.keyCode === 8 || (e.keyCode >= 91 && e.keyCode <= 92) || e.keyCode === 224)   // BackSpace; (Windows Start; Linux Extra; Command Key)
        return true;
    else if(keyboard[16] || keyboard[17] || keyboard[18] || keyboard[91] || keyboard[92] || keyboard[224])  // Key ShortCuts
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