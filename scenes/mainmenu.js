/* global keyboard, ENTER, settings, LEFT, canvas, KEY_A */

function NewGame() {
    if(!keyboard[ENTER]) {
        return;
    }
    scene = new Game();
    scene.goal();
}

function AIs_move(i) {
    if(keyboard[LEFT] || keyboard[KEY_A]) {
        switch(settings[2][i]) {
            case "AiCenter":
                settings[2][i] = "Player";
                break;
            case "AiCenterMiddle":
                settings[2][i] = "AiCenter";
                break;
            case "AiArea":
                settings[2][i] = "AiCenterMiddle";
                break;
            case "AiAreaMiddle":
                settings[2][i] = "AiArea";
                break;
            case "AiAreaV2":
                settings[2][i] = "AiAreaMiddle";
                break;
            case "AiAreaMiddleV2":
                settings[2][i] = "AiAreaV2";
                break;
            case "AiAreaMiddleV3":
                settings[2][i] = "AiAreaMiddleV2";
                break;
            case "AiAreaMiddleFastball":
                settings[2][i] = "AiAreaMiddleV3";
                break;
            default:
                settings[2][i] = "AiAreaMiddleFastball";
                break;
        }
    } else {
        switch(settings[2][i]) {
            case "AiCenter":
                settings[2][i] = "AiCenterMiddle";
                break;
            case "AiCenterMiddle":
                settings[2][i] = "AiArea";
                break;
            case "AiArea":
                settings[2][i] = "AiAreaMiddle";
                break;
            case "AiAreaMiddle":
                settings[2][i] = "AiAreaV2";
                break;
            case "AiAreaV2":
                settings[2][i] = "AiAreaMiddleV2";
                break;
            case "AiAreaMiddleV2":
                settings[2][i] = "AiAreaMiddleV3";
                break;
            case "AiAreaMiddleV3":
                settings[2][i] = "AiAreaMiddleFastball";
                break;
            case "AiAreaMiddleFastball":
                settings[2][i] = "Player";
                break;
            default:
                settings[2][i] = "AiCenter";
                break;
        }
    }
}

function TopSideEdit(item) {
    AIs_move(0);
    item.text = "Top side: " + settings[2][0];
}

function BottomSideEdit(item) {
    AIs_move(1);
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
