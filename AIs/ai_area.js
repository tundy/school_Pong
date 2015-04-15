/* global Paddle, context, canvas, keyboard, playground */

function AiArea(side)
{
    this.side = side;
    this.x = canvas.width/2;
    this.y = (side === 0) ? 15 : canvas.height - 15;
}

AiArea.prototype = Object.create(Paddle.prototype);

AiArea.prototype.update = function(delta)
{
    var ball = playground[this.side];
    for(var i = 0; i < playground.length; i++)
    {
        if(this.side === 0)
        {
            if(ball.y > playground[i].y)
            {
                if(playground[i].speedy < 0)
                {
                    ball = playground[i];
                }
            }
        }
        else
        {
            if(ball.y < playground[i].y)
            {
                if(playground[i].speedy > 0)
                {
                    ball = playground[i];
                }
            }
        }
    }
    if(ball === playground[this.side])
    {
        ball = playground[2];
        for(var i = 0; i < playground.length; i++)
        {
            if(this.side === 0)
            {
                if(ball.y < playground[i].y)
                {
                        ball = playground[i];
                }
            }
            else
            {
                if(ball.y > playground[i].y)
                {
                        ball = playground[i];
                }
            }
        }
    }
    if(this.x - this.width/3 > ball.x && this.x > this.width/2)
        this.x -= this.speed * delta;
    else if(this.x + this.width/3 < ball.x && this.x < canvas.width - this.width/2)
        this.x += this.speed * delta;
    
    if(this.x < 0) this.x = this.width/2;
    else if(this.x > canvas.width) this.x = canvas.width - this.width/2;
    
    return false;
};