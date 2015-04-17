/* global Paddle, canvas */

function AiAreaMiddleV2(side)
{
    this.side = side;
    this.x = canvas.width/2;
    this.y = (side === 0) ? 15 : canvas.height - 15;
}

AiAreaMiddleV2.prototype = Object.create(Paddle.prototype);

AiAreaMiddleV2.prototype.update = function(game, delta, index)
{
    var ball = null;                                    // Set no target for start
    for(var i in game.playground)                       // Check with every ball
    {
        if(game.playground[i].constructor.name !== "Ball")  // ignore, if not a ball
        {
            continue;
        }
        
        if(this.side === 0)
        {
            if(ball.y > game.playground[i].y)
            {
                if(game.playground[i].speedy < 0)
                {
                    ball = game.playground[i];
                }
            }
        }
        else
        {
            if(ball.y < game.playground[i].y)
            {
                if(game.playground[i].speedy > 0)
                {
                    ball = game.playground[i];
                }
            }
        }
    }
    
    if(ball === game.playground[this.side])
    {
        if(this.x - this.speed * delta  > canvas.width/2)
            this.x -= this.speed * delta;
        else if(this.x + this.speed * delta < canvas.width/2)
            this.x += this.speed * delta;
    }
    else
    {
        if(ball.speedx <= 0)
        {
            if(this.x + this.width/2 > ball.x + ball.speedx * delta && this.x > this.width/2)
                this.x -= this.speed * delta;
            else if(this.x + this.width/2 < ball.x + ball.speedx * delta && this.x < canvas.width - this.width/2)
                this.x += this.speed * delta;
        }
        else
        {
            if(this.x - this.width/2 > ball.x + ball.speedx * delta && this.x > this.width/2)
                this.x -= this.speed * delta;
            else if(this.x - this.width/2 < ball.x + ball.speedx * delta && this.x < canvas.width - this.width/2)
                this.x += this.speed * delta;
        }
    }
    
    if(this.x < 0) this.x = this.width/2;
    else if(this.x > canvas.width) this.x = canvas.width - this.width/2;
    
    return false;
};