/* global canvas, Paddle */

function AiCenter(side)
{
    this.side = side;
    this.x = canvas.width/2;
    this.y = (side === 0) ? 15 : canvas.height - 15;
}

AiCenter.prototype = Object.create(Paddle.prototype);

AiCenter.prototype.update = function(game, delta, index)
{
    var ball = null;                                    // Set no target for start
    for(var i in game.playground)                       // Check with every ball
    {
        if(game.playground[i].constructor.name !== "Ball")  // ignore, if not a ball
        {
            continue;
        }
        
        if(this.side === 0)                             // Are you on top ?
        {
            if(game.playground[i].speedy < 0)            // is ball moving toward you ?
            {
                if(ball === null)                   // if no target          
                {
                    ball = game.playground[i];           // that ball is my target
                }
                else if(ball.y > game.playground[i].y)   // is that ball the most close to you ?
                {
                    ball = game.playground[i];           // that ball is my target
                }
            }
        }
        else                                // You are on bottom
        {
            if(game.playground[i].speedy > 0)            // is ball moving toward you ?
            {
                if(ball === null)                   // if no target          
                {
                    ball = game.playground[i];           // that ball is my target
                }
                else if(ball.y < game.playground[i].y)   // is that ball the most close to you ?
                {
                    ball = game.playground[i];           // that ball is my target
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
    
    if((this.x > ball.x) && (this.x > this.width/2))                      // is ball is on your left ?
        this.x -= this.speed * delta;                                                                   // go left
    else if(this.x < canvas.width - this.width/2)          // or is ball is on your right ?
        this.x += this.speed * delta;                                                                   // go right
    
    if(this.x < 0) this.x = this.width/2;                                   // Are you out of canvas ?
    else if(this.x > canvas.width) this.x = canvas.width - this.width/2;    // force you back
};