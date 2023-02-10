import CatchPhoto from "./main"
export default function (e: MouseEvent, main: CatchPhoto) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    main.isDown = false;
    main.isMoveImage = false;
    main.mouseX = undefined;
    main.mouseY = undefined;

    let clipLine = main.clipLine;
    if(clipLine){
        clipLine.touchLeft = false;
        clipLine.touchRigth = false;
        clipLine.touchTop = false;
        clipLine.touchBottom = false;
    }
}
