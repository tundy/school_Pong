/* global keyboard, UP, DOWN, ENTER, context, canvas, LEFT, RIGHT */

function Menu(title) {
    this.title = title;
    this.pause = 1;
    this.items = [];
    this.extra = [];
    this.selected = 0;
    this.moved = false;
    this.time = 0;
}

Menu.prototype.update = function(delta) {
    this.time += delta;
    if(this.moved)
    {
       if(this.time >= this.pause)
       {
           this.time = 0;
           this.moved = false;
       }
    }
    else
    {
        if(keyboard[UP])
        {
            this.selected--;
            if(this.selected < 0)
            {
                this.selected = this.items.length - 1;
            }
            this.moved = true;
            this.time = 0;
        }
        if(keyboard[DOWN])
        {
            this.selected++;
            this.selected %= this.items.length;
            this.moved = true;
            this.time = 0;
        }
        if(keyboard[ENTER] || keyboard[LEFT] || keyboard[RIGHT])
        {
            this.moved = true;
            this.time = 0;
            //console.log(this.items[this.selected]);
            this.items[this.selected].work();
        }
    }
};

Menu.prototype.draw = function() {
    clear();
    
    if(this.items.length === 0) {
        context.fillText("Error: Menu is empty!", 0, 20);
        return;
    }
    
    var image = document.getElementById("ball");
    context.drawImage(image, 8, (this.selected * 20)+30 + 8, 16, 16);
    
    context.font="30px Courier New";
    context.fillStyle = 'Green';
    context.fillText(this.title, 8, 30);
    
    context.font="20px Courier New";
    context.fillStyle = 'Black';
    for(var i in this.items) {
        context.fillText(this.items[i].text, 32, 20*i+55);
    }
    context.fillStyle = 'Green';
    for(var i in this.extra) {
        context.fillText(this.extra[i], 8, canvas.height-20*i-8);
    }
};
