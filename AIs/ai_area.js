/* global Paddle, canvas */

function AiArea(side)
{
    this.side = side;
    this.x = canvas.width/2;
    this.y = (side === 0) ? 15 : canvas.height - 15;
}

AiArea.prototype = Object.create(Paddle.prototype);

AiArea.prototype.update = function(game, delta, index)
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
            if(ball === null)                   // if no target          
            {
                ball = game.playground[i];           // that ball is my target
            }
            else if(ball.y > game.playground[i].y)
            {
                if(game.playground[i].speedy < 0)
                {
                    ball = game.playground[i];
                }
            }
        }
        else
        {
            if(ball === null)                   // if no target          
            {
                ball = game.playground[i];           // that ball is my target
            }
            else if(ball.y < game.playground[i].y)
            {
                if(game.playground[i].speedy > 0)
                {
                    ball = game.playground[i];
                }
            }
        }
    }
    if(ball === null)
    {
        for(var i in game.playground)                       // Check with every ball
        {
            if(game.playground[i].constructor.name !== "Ball")  // ignore, if not a ball
            {
                continue;
            }
            if(this.side === 0)
            {
                if(ball === null)                   // if no target          
                {
                    ball = game.playground[i];           // that ball is my target
                }
                else if(ball.y < game.playground[i].y)
                {
                        ball = game.playground[i];
                }
            }
            else
            {
                if(ball === null)                   // if no target          
                {
                    ball = game.playground[i];           // that ball is my target
                }
                else if(ball.y > game.playground[i].y)
                {
                        ball = game.playground[i];
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