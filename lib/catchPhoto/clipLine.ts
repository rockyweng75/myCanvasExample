export default class ClipLine{
    x: number;
    y: number;
    width: number;
    height: number;
    touchLeft: boolean = false;
    touchRigth: boolean = false;
    touchTop: boolean = false;
    touchBottom: boolean = false;

    constructor(x:number, y:number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    print(ctx: CanvasRenderingContext2D) : void{
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "chartreuse"
        ctx.lineWidth = 5;
        ctx.strokeRect(Math.floor(this.x), Math.floor(this.y), Math.floor(this.width), Math.floor(this.height));
        ctx.closePath();
        ctx.restore();
    }

    resize(newWidht: number, newHeight: number){
        this.width = newWidht;
        this.height = newHeight;
    }

    isInside (mouseX: number, mouseY: number) : boolean
    {
        if( this.x <= mouseX && mouseX <= (this.x + this.width) 
            && this.y <= mouseY && mouseY <= (this.y + this.height)
                ) {
            return true;
        }
        else return false;
    }

    clip(ctx: CanvasRenderingContext2D) : ImageData{
        return ctx.getImageData(this.x, this.y, this.width, this.height);
    }
}