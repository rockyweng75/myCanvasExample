export default class ImageObject {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    imageSrc: string;
    constructor(x: number, y: number, width: number, height: number, imageSrc: string){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageSrc = imageSrc;
        this.image = new Image();
        this.image.src = this.imageSrc;
        this.image.onload = (()=>{
        })
    }

    move(newX: number, newY: number){
        this.x = newX;
        this.y = newY;
    }

    print(ctx: CanvasRenderingContext2D) : Promise<void>{
        return new Promise((resolve)=>{
            ctx.drawImage(this.image, Math.floor(this.x), Math.floor(this.y), Math.floor(this.width), Math.floor(this.height));
            resolve();
        })
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
}