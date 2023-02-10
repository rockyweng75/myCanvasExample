import ClipLine from './clipLine'
import MouseDown from './mouseDown'
import MouseMove from './mouseMove'
import MouseOut from './mouseOut'
import MouseUp from './mouseUp'
import ImageObject from './image'
import Watermark from './watermark'
export default class CatchPhoto {

    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    clipLine: ClipLine | undefined;
    image: ImageObject | undefined; 
    watermark: Watermark | undefined;
    startX:number | undefined;
    startY:number | undefined;
    mouseX:number | undefined;
    mouseY:number | undefined;
    promiseId: number = 0;

    isDown: boolean = false;
    isMoveImage: boolean = false;

    selectedImage: ImageObject| undefined;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        canvas.onmousedown = (e) => MouseDown(e, this);
        canvas.onmousemove = (e) => MouseMove(e, this);
        canvas.onmouseup = (e) => MouseUp(e, this);
        canvas.onmouseout = (e) => MouseOut(e, this);

        if(this.canvas.getContext){
            this.ctx = this.canvas.getContext("2d")!;

        } else{
            throw "canvas is not htmlCanvas"
        }
    }

    loadImage(imgSrc: string){
        this.image = new ImageObject(0, 0, this.width, this.height, imgSrc);
        this.addClipLine(
            Math.floor(this.width * 0.2), 
            Math.floor(this.height * 0.2),
            Math.floor(this.width * 0.6),
            Math.floor(this.height * 0.6),
            );
    }

    async printImage() : Promise<void>{
        await this.image!.print(this.ctx);
    }

    addClipLine(x: number, y: number, width: number, height: number){
        this.clipLine = new ClipLine(x, y, width, height);
    }

    async printClipLine() : Promise<void>{
        if(this.clipLine){
            this.clipLine.print(this.ctx);
        }
    }

    async print() : Promise<void>{
        this.promiseId = setInterval(async ()=>{
            this.ctx.clearRect(0, 0, this.width, this.height);
            await this.printImage();
            await this.printClipLine();
            await this.printWatermark();
        }, 10)
    }

    // async reload() : Promise<void>{
    //     this.print();
    // }

    addWatermark(text: string, 
            x: number, 
            y: number, 
            maxWidth: number | undefined,
            font: string | undefined, 
            fontColor: string | undefined,
            ){

        this.watermark = new Watermark(x, y, maxWidth ? maxWidth : this.width, text);
        this.watermark.font = font;
        this.watermark.fontColor = fontColor;
    }

    async printWatermark() : Promise<void>{
        if(this.watermark){
            this.watermark.print(this.ctx, this.clipLine);
        }
    }

    async save() : Promise<ImageData | undefined>{
        clearInterval(this.promiseId);

        await this.printImage();
        await this.printClipLine();
        await this.printWatermark();

        if(this.clipLine){
            return this.clipLine.clip(this.ctx);
    
        } else {
            return this.ctx.getImageData(0, 0, this.width, this.height);
        }
    }   
}
  