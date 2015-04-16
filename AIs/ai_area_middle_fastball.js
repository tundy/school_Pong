/* global canvas, Paddle */

function AiAreaMiddleFastball(side)
{
    this.side = side;
    this.y = (side === 0) ? 15 : canvas.height - 15;
    this.x = canvas.width/2;
}

AiAreaMiddleFastball.prototype = Object.create(Paddle.prototype);

AiAreaMiddleFastball.prototype.update = function(game, delta, index)
{
    var ball = null;                                    // Set no target for start
    var time = 0;
    for(var i in game.playground)                       // Check with every ball
    {
        if(game.playground[i].constructor.name !== "Ball")  // ignore, not a ball
        {
            continue;
        }
        if(this.side === 0)                             // Are you on top ?
        {
            if(game.playground[i].y - game.playground[i].speedy <= canvas.height*2/3)      // is ball on your half ?
            {
                if(game.playground[i].speedy < 0)            // is ball moving toward you ?
                {
                    if(ball === null)                   // if no target          
                    {
                        ball = game.playground[i];           // that ball is my target
                        time = game.playground[i].speedy / (game.playground[i].y - this.y);
                    }
                    else                                    // Which ball will be first to goal ?
                    {
                        var now = game.playground[i].speedy / (game.playground[i].y - this.y);
                        if(now < time) {
                            ball = game.playground[i];           // that ball is my target
                        }
                    }
                }
            }
        }
        else                                            // You are on bottom
        {
            if(game.playground[i].y + game.playground[i].speedy  >= canvas.height*2/3)      // is ball on your half ?
            {
                if(game.playground[i].speedy > 0)            // is ball moving toward you ?
                {
                    if(ball === null)                   // if no target
                    {
                        ball = game.playground[i];           // that ball is my target
                        time = game.playground[i].speedy / (this.y - game.playground[i].y);
                    }
                    else                                    // Which ball will be first to goal ?
                    {
                        var now = game.playground[i].speedy / (this.y - game.playground[i].y);
                        if(now < time) {
                            ball = game.playground[i];           // that ball is my target
                        }
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