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
    context.drawImage(image, 8, (this.selected * 25)+30 + 8, 21, 21);
    
    context.font="30px Courier New";
    context.fillStyle = 'Green';
    context.fillText(this.title, 8, 30);
    
    context.font="25px Courier New";
    context.fillStyle = 'Black';
    for(var i in this.items) {
        context.fillText(this.items[i].text, 42, 25*i+55);
    }
    context.fillStyle = 'Green';
    for(var i in this.extra) {
        context.fillText(this.extra[i], 8, canvas.height-25*i-8);
    }
};
