/* global canvas, context */

function Ball(x, y)
{
    this.image = document.getElementById("ball");
    this.x = x;
    this.y = y;
    this.speedx = (Math.random()*4+11) * ((Math.random()*1 <= 0.5) ? -1 : 1);
    this.speedy = (Math.random()*4+11) * ((Math.random()*1 <= 0.5) ? -1 : 1);
    this.size = 12.5;
}

Ball.prototype.update = function(game, delta, index)
{
    this.y += this.speedy * delta;
    if(this.x + this.speedx * delta > this.size/2 && this.x + this.speedx * delta < canvas.width - this.size/2)
    {
        this.x += this.speedx * delta;
    }
    else
    {
        game.playground.push(new Pow(this.x, this.y));
        this.speedx *= -1;
    }

    if(this.y < 0) 
    {
        game.ScoreDown++;
        game.goal();
        return true;
    }
    else if(this.y > canvas.height)
    {
        game.ScoreUp++;
        game.goal();
        return true;
    }
    else    // check collision
    {
        var topA = this.y - this.size/2;
        var leftA = this.x - this.size/2;
        var bottomA = this.y + this.size/2;
        var rightA = this.x + this.size/2;
        
        var paddleBottom = game.FindPaddleBottom();
        var topB = paddleBottom.y - paddleBottom.height/2;
        var leftB = paddleBottom.x - paddleBottom.width/2;
        var bottomB = paddleBottom.y + paddleBottom.height/2;
        var rightB = paddleBottom.x + paddleBottom.width/2;

        if(this.speedy > 0)
        {
            if ( (topA >= topB && topA <= bottomB) || (bottomA >= topB && bottomA <= bottomB) )
            {
                if ( (leftA >= leftB && leftA <= rightB) || (rightA >= leftB && rightA <= rightB) )
                {
                    game.playground.push(new Pow(this.x, this.y));
                    //if(Math.abs(this.speedx)+ Math.abs(this.speedy) < 70)
                    {
                        if(this.x > paddleBottom.x + paddleBottom.width/4)
                        {
                            if(Math.abs(this.speedx) < 45) {
                            var x = (this.x - paddleBottom.x)/paddleBottom.width/2 + 1;
                            //console.log("rychlost X zvysena o " + (x-1)*Math.abs(this.speedx));
                            this.speedx *= x;
                        }
                        }
                        else if (this.x < paddleBottom.x - paddleBottom.width/4)
                        {
                            if(Math.abs(this.speedx) < 45) {
                            var x = (paddleBottom.x - this.x)/paddleBottom.width/2 + 1;
                            //console.log("rychlost X zvysena o " + (x-1)*Math.abs(this.speedx));
                            this.speedx *= x;
                            }
                        }
                        else if (this.x > paddleBottom.x + paddleBottom.width/8)
                        {
                            //console.log("rychlost zostava");
                        }
                        else if (this.x < paddleBottom.x - paddleBottom.width/8)
                        {
                            //console.log("rychlost zostava");
                        }
                        else if (this.x > paddleBottom.x)
                        {
                            var x = (this.x - paddleBottom.x)/paddleBottom.width/2 +0.8;
                            //console.log("rychlost X znizena o " + (x)*Math.abs(this.speedx));
                            this.speedx *= x;
                        }
                        else
                        {
                            var x = (paddleBottom.x - this.x)/paddleBottom.width/2 +0.8;
                            //console.log("rychlost X znizena o " + (x)*Math.abs(this.speedx));
                            this.speedx *= x;
                        }
                        if(Math.abs(this.speedy) < 45) {
                            this.speedy *= 1.05;
                        }
                    }
                    this.speedy *= -1;
                    
                    if(this.x < paddleBottom.x - paddleBottom.width/4)
                    {
                        this.speedx = Math.abs(this.speedx);
                        this.speedx *= -1;
                        //console.log("odraz lopticku dolava");
                    }
                    else if(this.x > paddleBottom.x + paddleBottom.width/4)
                    {
                        this.speedx = Math.abs(this.speedx);
                        //console.log("odraz lopticku doprava");
                    }
                }
            }
        }
        else
        {
            var paddleTop = game.FindPaddleTop();
            topB = paddleTop.y - paddleTop.height/2;
            leftB = paddleTop.x - paddleTop.width/2;
            bottomB = paddleTop.y + paddleTop.height/2;
            rightB = paddleTop.x + paddleTop.width/2;
            if ( (topA >= topB && topA <= bottomB) || (bottomA >= topB && bottomA <= bottomB) )
            {
                if ( (leftA >= leftB && leftA <= rightB) || (rightA >= leftB && rightA <= rightB) )
                {
                    game.playground.push(new Pow(this.x, this.y));
                    //if(Math.abs(this.speedx)+ Math.abs(this.speedy) < 70)
                    {
                        if(this.x > paddleTop.x + paddleTop.width/4)
                        {
                            if(Math.abs(this.speedx) < 45) {
                            var x = (this.x - paddleTop.x)/paddleTop.width/2 + 1;
                            //console.log("rychlost X zvysena o " + (x-1)*Math.abs(this.speedx));
                            this.speedx *= x;
                        }
                        }
                        else if (this.x < paddleTop.x - paddleTop.width/4)
                        {
                            if(Math.abs(this.speedx) < 45) {
                            var x = (paddleTop.x - this.x)/paddleTop.width/2 + 1;
                            //console.log("rychlost X zvysena o " + (x-1)*Math.abs(this.speedx));
                            this.speedx *= x;
                            }
                        }
                        else if (this.x > paddleTop.x + paddleTop.width/8)
                        {
                            //console.log("rychlost zostava");
                        }
                        else if (this.x < paddleTop.x - paddleTop.width/8)
                        {
                            //console.log("rychlost zostava");
                        }
                        else if (this.x > paddleTop.x)
                        {
                            var x = (this.x - paddleTop.x)/paddleTop.width/2 +0.8;
                            //console.log("rychlost X znizena o " + (x)*Math.abs(this.speedx));
                            this.speedx *= x;
                        }
                        else
                        {
                            var x = (paddleTop.x - this.x)/paddleTop.width/2 +0.8;
                            //console.log("rychlost X znizena o " + (x)*Math.abs(this.speedx));
                            this.speedx *= x;
                        }
                        if(Math.abs(this.speedy) < 45) {
                            this.speedy *= 1.05;
                        }
                    }
                    this.speedy *= -1;
                    
                    if(this.x < paddleTop.x - paddleTop.width/4)
                    {
                        this.speedx = Math.abs(this.speedx);
                        //console.log("odraz lopticku dolava");
                        this.speedx *= -1;
                    }
                    else if(this.x > paddleTop.x + paddleTop.width/4)
                    {
                        this.speedx = Math.abs(this.speedx);
                        //console.log("odraz lopticku doprava");
                    }
                }
            }
        }
    }
};

Ball.prototype.draw = function()
{
    /*context.save();
    context.translate(this.x, this.y);*/
    
    /*context.fillStyle = "rgba(0, 128, 0, 1)";
    context.fillRect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);*/
    
    context.drawImage(this.image, this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    
    //context.restore();
    
    /*context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(this.x - this.size/4, 0, this.size/4, canvas.height);
    context.fillRect(0, this.y - this.size/4, canvas.width, this.size/4);*/
};