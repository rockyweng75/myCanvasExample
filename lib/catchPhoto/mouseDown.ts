import CatchPhoto from "./main"
export default function(e: MouseEvent, main: CatchPhoto){
    e.preventDefault();
    e.stopPropagation();

    main.isDown = true;
    let offsetX = main.canvas.offsetLeft;
    let offsetY = main.canvas.offsetTop;

    let scrollX = main.canvas.scrollLeft;
    let scrollY = main.canvas.scrollTop;

    main.startX = e.clientX - offsetX + scrollX;
    main.startY = e.clientY - offsetY + scrollY;

    if(!handleClipLineDown(main, main.startX, main.startY)){
        handleImageDown(main, main.startX, main.startY)
    }
}

function handleImageDown(main: CatchPhoto, startX: number, startY: number) : boolean{

    if(main.image){
        let inClipLine = false;
        if(main.clipLine){
            inClipLine = main.clipLine.isInside(startX, startY)
        }

        if(main.image.isInside(startX, startY) && !inClipLine){
            main.isMoveImage = true;
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

function handleClipLineDown(main: CatchPhoto, startX: number, startY: number) : boolean{

    if(main.clipLine){
        if(Math.abs(startX - main.clipLine.x) < 3){
            main.clipLine.touchLeft = true;
        } 
        if(Math.abs(startY - main.clipLine.y) < 3){
            main.clipLine.touchTop = true;
        } 
    
        if(Math.abs(startX - main.clipLine.x - main.clipLine.width) < 3){
            main.clipLine.touchRigth = true;
        } 
    
        if(Math.abs(startY - main.clipLine.y - main.clipLine.height) < 3){
            main.clipLine.touchBottom = true;
        } 
        return main.clipLine.touchLeft || 
            main.clipLine.touchBottom ||
            main.clipLine.touchRigth ||
            main.clipLine.touchRigth
    } else {
        return false;
    }
}
