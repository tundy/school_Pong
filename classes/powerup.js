/* global canvas, context */

function PowerUp()
{
    this.image = document.getElementById("powerup");
    this.x = Math.random()*(canvas.width-20)+10;
    this.y = Math.random()*(canvas.height-100)+50;
    this.type = Math.floor(Math.random()*3.9);
}

PowerUp.prototype.update = function(game, delta, index)
{
    var topA = this.y - 11;
    var leftA = this.x - 11;
    var bottomA = this.y + 11;
    var rightA = this.x + 11;

    for(var i in game.playground)
    {
        if(game.playground[i].constructor.name !== "Ball")  // ignore, not a ball
        {
            continue;
        }
        var topB = game.playground[i].y - 5;
        var leftB = game.playground[i].x - 5;
        var bottomB = game.playground[i].y + 5;
        var rightB = game.playground[i].x + 5;
        
        if ( (topA >= topB && topA <= bottomB) || (bottomA >= topB && bottomA <= bottomB) )
        {
            if ( (leftA >= leftB && leftA <= rightB) || (rightA >= leftB && rightA <= rightB) )
            {
                var paddleBottom = game.FindPaddleBottom();
                var paddleTop = game.FindPaddleTop();
                switch(this.type)
                {
                    case 1:
                            if(paddleBottom.speed >= 15)
                            {
                                paddleBottom.speed -= 4;
                            }
                            if(paddleTop.speed >= 15)
                            {
                                paddleTop.speed -= 4;
                            }
                        break;
                    case 3:
                            if(paddleBottom.width < (canvas.width-7.5-32))
                            {
                                paddleBottom.width += 7.5;
                            }
                            if(paddleTop.width < (canvas.width-7.5-32))
                            {
                                paddleTop.width += 7.5;
                            }
                        break;
                    case 0:
                            if(paddleBottom.width >= (32+7.5))
                            {
                                paddleBottom.width -= 7.5;
                            }
                            if(paddleTop.width >= (32+7.5))
                            {
                                paddleTop.width -= 7.5;
                            }
                        break;
                    case 2:
                        var l = game.playground.length;
                        game.playground[l] = new Ball(game.playground[i].x, game.playground[i].y);
                        game.playground[i].speedx *= 0.75;
                        game.playground[i].speedy *= 0.75;
                        game.playground[l].speedx = game.playground[i].speedx * (-1);
                        game.playground[l].speedy = game.playground[i].speedy * (-1);
                        break;
                }
                delete game.playground[index];
            }
        }
    }
};

PowerUp.prototype.draw = function()
{
    /*context.save();
    context.translate(this.x, this.y);*/
    
    /*context.strokeStyle = "rgba(0, 64, 0, 1)";
    context.strokeRect(-10, -10, 20, 20);
    
    context.font="10px Georgia";
    context.fillText(this.type, -2, 2);*/
    
    context.drawImage(this.image, 20*this.type, 0, 20, 20, this.x-10, this.y-10, 20, 20);

    //context.restore();
};