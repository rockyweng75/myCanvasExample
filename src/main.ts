import './style.css'
import testImage from './images/face-2-svgrepo-com.svg'
import CatchPhoto from '../lib/catchPhoto/main'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="canvas" width="500" height="500"></canvas>
    <img id="image"></img>
  </div>
`
let canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const catchPhoto = new CatchPhoto(canvas)
catchPhoto.loadImage(testImage);
catchPhoto.addWatermark("測試用浮水印", 10, 20, undefined, "16px sans-serif", undefined)
await catchPhoto.print();
setTimeout(async () => {
  let imageData = await catchPhoto.save();
  if(imageData){
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    let ctx = tempCanvas.getContext('2d');
    ctx?.putImageData(imageData, 0, 0);
    let image = document.querySelector<HTMLImageElement>("#image")!;
    image.width = tempCanvas.width;
    image.height = tempCanvas.height;
    image.src = tempCanvas.toDataURL("image/svg")
  }
}, 100);


