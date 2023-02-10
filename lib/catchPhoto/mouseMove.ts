import CatchPhoto from "./main"
export default function(e: MouseEvent, main: CatchPhoto){
    e.preventDefault();
    e.stopPropagation();

    if(!main.isDown) {
        return;
    }

    if(!main.mouseX) main.mouseX = main.startX;
    if(!main.mouseY) main.mouseY = main.startY;

    let mouseX = e.clientX - main.canvas.offsetLeft + main.canvas.scrollLeft;
    let mouseY = e.clientY - main.canvas.offsetTop + main.canvas.scrollTop;

    if(!handleClipLineMove(main, mouseX, mouseY)){
        handleImageMove(main, mouseX, mouseY);
    }

    main.mouseX = mouseX;
    main.mouseY = mouseY;
}

function handleImageMove(main: CatchPhoto, mouseX: number, mouseY: number) : boolean{

    if(main.image && main.isMoveImage){
        // 計算移動量
        let moveX = mouseX - main.mouseX!;
        let moveY = mouseY - main.mouseY!;
        main.image.move(main.image.x + moveX,main.image.y + moveY);
        return true;
    }
    return false;
}

function handleClipLineMove(main: CatchPhoto, mouseX: number, mouseY: number) : boolean{

    let clipLine = main.clipLine;
    if (clipLine){
        if(!(clipLine.touchBottom
            || clipLine.touchLeft 
            || clipLine.touchRigth 
            || clipLine.touchTop))
        {
            return false;
        }
    }

    if(main.clipLine){
        let newWidht = main.clipLine.width;
        let newHeight = main.clipLine.height;
    
        let clipLine = main.clipLine;

        let clipLeft = main.clipLine.x;
        let clipRigth = main.clipLine.x + main.clipLine.width;
        let clipTop = main.clipLine.y;
        let clipBottom = main.clipLine.y + main.clipLine.height;
    
        if(clipLine.touchLeft){
            console.log(mouseX, clipRigth)

            if(mouseX! < clipLeft ){
                newWidht += clipLeft - mouseX;
            } else if(mouseX! > clipLeft ){
                newWidht -= mouseX - clipLeft; 
            }
            main.clipLine.x = mouseX;
        }
    
        if(clipLine.touchRigth){
            if(mouseX! > clipRigth ){
                newWidht += mouseX - clipRigth;
            } else if(mouseX! < clipRigth ){
                newWidht -= clipRigth - mouseX; 
            }
        }
    
        if(clipLine.touchTop){
            if(mouseY! < clipTop ){
                newHeight += clipTop - mouseY;
            } else if(mouseY! > clipTop ){
                newHeight -= mouseY - clipTop; 
            }
            main.clipLine.y = mouseY;
        }
     
        if(clipLine.touchBottom){
            if(mouseY! > clipBottom ){
                newHeight += mouseY - clipBottom;
            } else if(mouseY! < clipBottom ){
                newHeight -= clipBottom - mouseY; 
            }
        }
    
        main.clipLine.resize(newWidht, newHeight);
        return true;
    } else {
        return false;
    }
   
}