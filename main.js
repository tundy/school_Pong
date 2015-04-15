/* global KEY_A, RIGHT, KEY_B, LEFT, ENTER, keyboard */

var canvas;
var context;
var lastUpdate;
var scene;

var settings = [];
settings[0] = [];              // top player settings
settings[0][0] = KEY_A;
settings[0][1] = KEY_B;
settings[1] = [];              // bot player settings
settings[1][0] = LEFT;
settings[1][1] = RIGHT;
settings[2] = [];              // side settings
settings[2][0] = "bot";        // top
settings[2][1] = "player";     // bot
settings[3] = 10;              // max score
//ettings[4] = [];
//settings[4] = 25;           // speed
//settings[4] = 90;           // width


function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

function NewGame() {
    if(!keyboard[ENTER]) {
        return;
    }
    scene = new Game();
    scene.goal();
}

function TopSideEdit(item) {
    settings[2][0] = (settings[2][0] === "bot") ? "player" : "bot";
    item.text = "Top side: " + settings[2][0];
}

function BottomSideEdit(item) {
    settings[2][1] = (settings[2][1] === "bot") ? "player" : "bot";
    item.text = "Bottom side: " + settings[2][1];
}

function EditScore(item) {
    if(keyboard[LEFT]) {
        if(--settings[3] <= 0)
        settings[3] = 10;
    } else {
        settings[3] = (settings[3]%10)+1;
    }
    item.text = "MaxScore: " + settings[3];
}

function MainMenu() {
    scene = new Menu("Pong");
    scene.items.push(new Item("Start", NewGame));
    scene.items.push(new Item("Top side: " + settings[2][0], TopSideEdit));
    scene.items.push(new Item("Bottom side: " + settings[2][1], BottomSideEdit));
    scene.items.push(new Item("MaxScore: " + settings[3], EditScore));
    scene.extra.push("Bottom: <Left> & <Right>");
    scene.extra.push("Top: <A> & <D>");
    scene.extra.push("Player controls:");
}

function loop() {
    var now = Date.now();
    var delta = (now - lastUpdate) / 100;
    lastUpdate = now;
    
    scene.update(delta);
    scene.draw();
    
    requestAnimationFrame(loop);
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 400;
    
    MainMenu();
    
    requestAnimationFrame(loop);
};