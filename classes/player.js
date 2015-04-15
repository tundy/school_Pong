/* global settings, canvas, Paddle, keyboard */

function Player(side)
{
    this.left = settings[side][0];
    this.right = settings[side][1];
    this.side = side;
    this.x = canvas.width/2;
    this.y = (side === 0) ? 15 : canvas.height - 15;
}

Player.prototype = Object.create(Paddle.prototype);

Player.prototype.update = function(game, delta, index)
{
    if(keyboard[this.left] && keyboard[this.right]) {
        return;
    }
    if(keyboard[this.left]) {
        if(this.x > this.width/2) {
            this.x -= this.speed * delta;
        } else {    // also if bugged
            delete keyboard[this.left];
        }
    }
    if(keyboard[this.right]) {
        if(this.x < canvas.width - this.width/2) {
            this.x += this.speed * delta;
        } else {    // also if bugged
            delete keyboard[this.right];
        }
    }
    
    if(this.x < 0) {
        this.x = this.width/2;
    }
    else if(this.x > canvas.width) {
        this.x = canvas.width - this.width/2;
    }
};