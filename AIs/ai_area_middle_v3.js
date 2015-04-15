/* global canvas, Paddle */

function AiAreaMiddleV3(side)
{
    this.side = side;
    this.y = (side === 0) ? 15 : canvas.height - 15;
    this.x = canvas.width/2;
}

AiAreaMiddleV3.prototype = Object.create(Paddle.prototype);

AiAreaMiddleV3.prototype.update = function(game, delta, index)
{
    var ball = null;                                    // Set no target for start
    for(var i in game.playground)                       // Check with every ball
    {
        if(game.playground[i].constructor.name !== "Ball")  // ignore, not a ball
        {
            continue;
        }
        if(this.side === 0)                             // Are you on top ?
        {
            if(game.playground[i].y <= canvas.height/2)      // is ball on your half ?
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
        }
        else                                            // You are on bottom
        {
            if(game.playground[i].y >= canvas.height/2)      // is ball on your half ?
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
    }
    
    if(ball === null)                                                   // No ball to follow ?
    {                                                                       // go to middle
        if(this.x - this.speed * delta  > canvas.width/2)                       // are you on the right half ?
            this.x -= this.speed * delta;                                           // go left
        else if(this.x + this.speed * delta < canvas.width/2)                   // or are you on the left half ?
            this.x += this.speed * delta;                                           // go right
    }
    else                                                                    // follow ball  
    {
        if(ball.speedx <= 0)                                                // ball moving to left
        {                                                                   // check with right corner of paddle
            if(this.x + this.width/2 > ball.x + ball.speedx * delta && this.x > this.width/2)                       // is ball is on your left ?
                this.x -= this.speed * delta;                                                                           // go left
            else if(this.x + this.width/2 <= ball.x - ball.speedx * delta && this.x < canvas.width - this.width/2)   // or is ball is on your right ?
                this.x += this.speed * delta;                                                                           // go right
        }
        else                                                                // ball moving to right
        {                                                                   // check with left corner of paddle
            if(this.x - this.width/2 >= ball.x + ball.speedx * delta && this.x > this.width/2)                       // is ball is on your left ?
                this.x -= this.speed * delta;                                                                           // go left
            else if(this.x - this.width/2 < ball.x - ball.speedx * delta && this.x < canvas.width - this.width/2)   // or is ball is on your right ?
                this.x += this.speed * delta;                                                                           // go right
        }
    }
    
    if(this.x < 0) this.x = this.width/2;                                   // Are you out of canvas ?
    else if(this.x > canvas.width) this.x = canvas.width - this.width/2;    // force you back
    
    return false;   // I'm alive
};