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
    
    var colours = ["Chocolate", "Coral", "DarkGoldenRod", "DarkKhaki", "Khaki", "NavajoWhite", "Peru", "SandyBrown", "Wheat"];
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
    switch(settings[2][0]) {
        case "AiCenter":
            this.playground.push(new AiCenter(0));
            break;
        case "AiCenterMiddle":
            this.playground.push(new AiCenterMiddle(0));
            break;
        case "AiArea":
            this.playground.push(new AiArea(0));
            break;
        case "AiAreaMiddle":
            this.playground.push(new AiAreaMiddle(0));
            break;
        case "AiAreaV2":
            this.playground.push(new AiAreaV2(0));
            break;
        case "AiAreaMiddleV2":
            this.playground.push(new AiAreaMiddleV2(0));
            break;
        case "AiAreaMiddleV3":
            this.playground.push(new AiAreaMiddleV3(0));
            break;
        case "AiAreaMiddleFastball":
            this.playground.push(new AiAreaMiddleFastball(0));
            break;
        default:
            this.playground.push(new Player(0));
            break;
    }
    
    // Bottom side
    switch(settings[2][1]) {
        case "AiCenter":
            this.playground.push(new AiCenter(1));
            break;
        case "AiCenterMiddle":
            this.playground.push(new AiCenterMiddle(1));
            break;
        case "AiArea":
            this.playground.push(new AiArea(1));
            break;
        case "AiAreaMiddle":
            this.playground.push(new AiAreaMiddle(1));
            break;
        case "AiAreaV2":
            this.playground.push(new AiAreaV2(1));
            break;
        case "AiAreaMiddleV2":
            this.playground.push(new AiAreaMiddleV2(1));
            break;
        case "AiAreaMiddleV3":
            this.playground.push(new AiAreaMiddleV3(1));
            break;
        case "AiAreaMiddleFastball":
            this.playground.push(new AiAreaMiddleFastball(1));
            break;
        default:
            this.playground.push(new Player(1));
            break;
    }
    
    this.playground.push(new Ball(canvas.width/2, canvas.height/2));
    //this.playground.push(new Ball(canvas.width/2, canvas.height/2+50));
    //this.playground.push(new Ball(canvas.width/2, canvas.height/2-50));
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
            context.fillText(this.ScoreUp + " : " + this.ScoreDown, 10, canvas.height/2 + 25);
        }
        else
        {
            context.fillText("Bottom side won", 10, canvas.height/2);
            context.fillText(this.ScoreUp + " : " + this.ScoreDown, 10, canvas.height/2 + 25);
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