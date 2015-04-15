/* global Paddle, context, canvas, keyboard, playground */

function AiCenterMiddle(side)
{
    this.side = side;
    this.x = canvas.width/2;
    this.y = (side === 0) ? 15 : canvas.height - 15;
}

AiCenterMiddle.prototype = Object.create(Paddle.prototype);

AiCenterMiddle.prototype.update = function(delta)
{
    var ball = playground[this.side];
    for(var i = 2; i < playground.length; i++)
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
        if(this.x - this.speed * delta  > canvas.width/2)
            this.x -= this.speed * delta;
        else if(this.x + this.speed * delta < canvas.width/2)
            this.x += this.speed * delta;
    }
    else
    {
        if(this.x > ball.x && this.x > this.width/2)
            this.x -= this.speed * delta;
        else if(this.x < canvas.width - this.width/2)
            this.x += this.speed * delta;
    }
    
    if(this.x < 0) this.x = this.width/2;
    else if(this.x > canvas.width) this.x = canvas.width - this.width/2;
    
    return false;
};