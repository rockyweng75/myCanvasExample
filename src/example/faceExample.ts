import setup from "../../lib/faceDetection/main"
import testImage from '../images/3.bmp'
export default async function(root: HTMLDivElement){
    root.innerHTML = `
    <div>
      <img id="image" src="${testImage}"></img>
      <canvas id="canvas"></canvas>

    </div>
  `
  let image = document.querySelector<HTMLImageElement>("#image")!;
  let canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  image.onload = ()=>{
    setup(image, canvas)
  }

}