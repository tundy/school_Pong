/* global context */

function Paddle()
{
}

Paddle.prototype.img = document.getElementById("paddle");
Paddle.prototype.height = 16;
Paddle.prototype.width = 90;
Paddle.prototype.speed = 35;

Paddle.prototype.draw = function()
{
    context.drawImage(this.img, 17, this.side*16, 72-17*2, 16, this.x-this.width/2+16, this.y-this.height/2, this.width-16*2, 16);
    context.drawImage(this.img, 0, this.side*16, 17, 16, this.x-this.width/2, this.y-this.height/2, 17, 16);
    context.drawImage(this.img, 72-17, this.side*16, 17, 16, this.x+this.width/2-17, this.y-this.height/2, 17, 16);
    /*context.fillStyle = "rgba(0, 192, 0, 1)";
    context.strokeStyle = "rgba(0, 64, 0, 1)";
    context.strokeRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);*/
    
    /*context.fillStyle = "rgba(0, 255, 0, 1)";
    context.fillRect(this.x -this.width/4 - 1, 0, 2, canvas.height);
    context.fillRect(this.x +this.width/4 - 1, 0, 2, canvas.height);
    context.fillStyle = "rgba(0, 192, 0, 1)";
    context.fillRect(this.x -this.width/8 - 1, 0, 2, canvas.height);
    context.fillRect(this.x +this.width/8 - 1, 0, 2, canvas.height);*/
};