import * as cocoSsd from "@tensorflow-models/coco-ssd"
import * as tfjs from "@tensorflow/tfjs"
export default async function (image: HTMLImageElement, canvasDom: HTMLCanvasElement){
  
  let ctx = canvasDom.getContext('2d')!;
  canvasDom.width = image.width;
  canvasDom.height = image.height;

  const model = await cocoSsd.load();
  const predictions = await model.detect(image);

  ctx.drawImage(image, 0, 0, image.width, image.height);
  predictions.forEach(o =>{
    let box = o.bbox;
    let name = o.class;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.strokeRect(box[0], box[1], box[2], box[3]);
    ctx.font = "16px Arial"
    ctx.fillStyle = "gold";
    ctx.fillText(name, box[0] + 16, box[1] + 20, box[2]);
  })
}
