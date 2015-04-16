/* global keyboard, ENTER, settings, LEFT, canvas, KEY_A */

function NewGame() {
    if(!keyboard[ENTER]) {
        return;
    }
    scene = new Game();
    scene.goal();
}

function TopSideEdit(item) {
    if(keyboard[LEFT] || keyboard[KEY_A]) {
        switch(settings[2][0]) {
            case "AreaMiddleV3":
                settings[2][0] = "Player";
                break;
            case "AreaMiddleFastball":
                settings[2][0] = "AreaMiddleV3";
                break;
            default:
                settings[2][0] = "AreaMiddleFastball";
                break;
        }
    } else {
        switch(settings[2][0]) {
            case "AreaMiddleV3":
                settings[2][0] = "AreaMiddleFastball";
                break;
            case "AreaMiddleFastball":
                settings[2][0] = "Player";
                break;
            default:
                settings[2][0] = "AreaMiddleV3";
                break;
        }
    }
    item.text = "Top side: " + settings[2][0];
}

function BottomSideEdit(item) {
    if(keyboard[LEFT] || keyboard[KEY_A]) {
        switch(settings[2][1]) {
            case "AreaMiddleV3":
                settings[2][1] = "Player";
                break;
            case "AreaMiddleFastball":
                settings[2][1] = "AreaMiddleV3";
                break;
            default:
                settings[2][1] = "AreaMiddleFastball";
                break;
        }
    } else {
        switch(settings[2][1]) {
            case "AreaMiddleV3":
                settings[2][1] = "AreaMiddleFastball";
                break;
            case "AreaMiddleFastball":
                settings[2][1] = "Player";
                break;
            default:
                settings[2][1] = "AreaMiddleV3";
                break;
        }
    }
    item.text = "Bottom side: " + settings[2][1];
}

function EditScore(item) {
    if(keyboard[LEFT] || keyboard[KEY_A]) {
        if(--settings[3] <= 0)
        settings[3] = 10;
    } else {
        settings[3] = (settings[3]%10)+1;
    }
    item.text = "MaxScore: " + settings[3];
}

function MainMenu() {
    canvas.style.background = "White";
    scene = new Menu("Pong");
    scene.items.push(new Item("Start", NewGame));
    scene.items.push(new Item("Top side: " + settings[2][0], TopSideEdit));
    scene.items.push(new Item("Bottom side: " + settings[2][1], BottomSideEdit));
    scene.items.push(new Item("MaxScore: " + settings[3], EditScore));
    scene.extra.push("Bottom: <Left> & <Right>");
    scene.extra.push("Top: <A> & <D>");
    scene.extra.push("Player controls:");
}
