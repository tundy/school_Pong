/* global context */

function Pow(x, y) {
    this.img = document.getElementById("pow");
    this.x = x;
    this.y = y;
    this.time = 0;
}

Pow.prototype.update = function(game, delta, index) {
    this.time += delta;
    if(this.time >= 2) {
        delete game.playground[index];
    }
};

Pow.prototype.draw = function() {
    var step = Math.floor(this.time);
    context.drawImage(this.img, step*16, 0, 16, 16, this.x-8, this.y-8, 16, 16);
};