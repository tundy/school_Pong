/* global settings, canvas, keyboard, ESC, context, ENTER, scene */

function Game() {
    this.time = 0;
    
    this.ScoreUp = 0;
    this.ScoreDown = 0;
    
    this.playground = [];
    
    this.background = document.getElementById("gameGB");
}

Game.prototype.FindPaddleTop = function() {
    for(var i in this.playground) {
        if(this.playground[i].constructor.name === "Paddle"){
            if(this.playground[i].side === 0) {
                return this.playground[i];
            }
        }
    }
    return null;
};

Game.prototype.FindPaddleBottom = function() {
    for(var i in this.playground) {
        if(this.playground[i].constructor.name === "Paddle"){
            if(this.playground[i].side === 1) {
                return this.playground[i];
            }
        }
    }
    return null;
};

Game.prototype.goal = function() {
    
    var colours = ["Chocolate", "Coral", "DarkGoldenRod", "DarkKhaki", "Khaki", "LightGoldenRodYellow", "NavajoWhite", "Peru", "SandyBrown", "Wheat"];
    var x = Math.floor(Math.random()*colours.length+0.1);
    var color = colours[x];
    //console.log(color, canvas.style.backgroundColor);
    while(color === canvas.style.backgroundColor ) {
        x = Math.floor(Math.random()*colours.length+0.1);
        color = colours[x];
        //console.log(color, canvas.style.backgroundColor);
    }
    canvas.style.background = color;
    
    this.playground = [];
    
    // Top side
    if(settings[2][0] === "bot")
    {
        this.playground.push(new AiAreaMiddleV3(0));
    }
    else
    {
        this.playground.push(new Player(0));
    }
    
    // Bottom side
    if(settings[2][1] === "bot")
    {
        this.playground.push(new AiAreaMiddleV3(1));
    }
    else
    {
        this.playground.push(new Player(1));
    }
    
    this.playground.push(new Ball(canvas.width/2, canvas.height/2));
};

Game.prototype.update = function(delta) {
    if(keyboard[ESC])
    {
        MainMenu();
        return;
    }
    
    if(this.ScoreUp >= settings[3] || this.ScoreDown >= settings[3])
    {
        if(keyboard[ENTER])
        {
            MainMenu();
            scene.moved = true;
            delete keyboard[ENTER];
        }
        return;
    }
    
    this.time += delta;
    if(this.time >= 100)
    {
        this.playground.push(new PowerUp());
        this.time %= 100;
    }
    
    for(var i in this.playground) {
        //console.log(i, this.playground[i].constructor, this.playground[i]);
        if(this.playground[i]) {
            this.playground[i].update(this, delta, i);
        }
    }
};

Game.prototype.draw = function() {
    clear();
    
    if(this.ScoreUp >= settings[3] || this.ScoreDown >= settings[3])
    {
        canvas.style.background = "White";
        context.font="25px Georgia";
        context.fillStyle = 'Green';
        if(this.ScoreUp > this.ScoreDown)
        {
            context.fillText("Top side won", 10, canvas.height/2);
        }
        else
        {
            context.fillText("Bottom side won", 10, canvas.height/2);
        }
        return;
    }
    
    /*context.fillStyle = this.color;
    context.fillRect(0,0,canvas.width,canvas.height);*/
    
    context.strokeStyle = 'White';
    context.lineWidth = 10;
    
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0,canvas.height);
    context.closePath();
    context.stroke();
    
    context.beginPath();
    context.moveTo(canvas.width,0);
    context.lineTo(canvas.width,canvas.height);
    context.closePath();
    context.stroke();
    
    context.beginPath();
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.closePath();
    context.stroke();
    
    for(var i in this.playground) {
        //console.log(i, this.playground[i].constructor, this.playground[i]);
        this.playground[i].draw();
    }
    
    context.font="20px Georgia";
    context.lineWidth = 2;
    context.strokeStyle = 'White';
    context.fillStyle = 'Green';
    
    context.strokeText(this.ScoreUp, 10, canvas.height/2 - 12);
    context.fillText(this.ScoreUp, 10, canvas.height/2 - 12);
    
    context.strokeText(this.ScoreDown, 10, canvas.height/2 + 25);
    context.fillText(this.ScoreDown, 10, canvas.height/2 + 25);
};