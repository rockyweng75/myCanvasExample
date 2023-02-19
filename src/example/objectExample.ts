import setup from "../../lib/objectDetection/main"
import testImage from '../images/3.bmp'
export default async function(root: HTMLDivElement){
    root.innerHTML = `
    <div>
      <img id="image" src="${testImage}" ></img>
      <canvas id="canvas"></canvas>
    </div>
  `
  let image = document.querySelector<HTMLImageElement>("#image")!;

  let canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  image.onload = ()=>{
    image.width = image.width * 0.4;
    image.height = image.height * 0.4;
    setup(image, canvas)
  }

}