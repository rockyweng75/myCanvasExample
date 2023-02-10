import ClipLine from "./clipLine"
export default class Watermark {
    x: number;
    y: number;
    width: number;
    text: string;
    font: string | undefined;
    fontSize: number = 16;
    fontColor: string | undefined;

    constructor(x: number, y: number, width: number, text: string){
        this.x = x;
        this.y = y;
        this.width = width;
        this.text = text;
    }

    move(newX: number, newY: number){
        this.x = newX;
        this.y = newY;
    }

    print(ctx: CanvasRenderingContext2D, clipLine: ClipLine | undefined) : Promise<void>{
        return new Promise((resolve)=>{
            ctx.save();
            ctx.beginPath();
            if(this.font) ctx.font = this.font;
            if(this.fontColor) ctx.fillStyle = this.fontColor;
            if(clipLine){
                ctx.fillText(this.text, Math.floor(clipLine.x + this.x), Math.floor(clipLine.y + this.y), clipLine.width);
            } else {
                ctx.fillText(this.text, Math.floor(this.x), Math.floor(this.y), this.width);
            }
            ctx.restore();

            resolve();
        })
    }

    isInside (mouseX: number, mouseY: number) : boolean
    {
        if( this.x <= mouseX && mouseX <= (this.x + this.width) 
            && this.y <= mouseY && mouseY <= (this.y + this.fontSize)
                ) {
            return true;
        }
        else return false;
    }
}