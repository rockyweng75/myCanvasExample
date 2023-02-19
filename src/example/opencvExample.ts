import setup from "../../lib/openCv/main"
import testImage from '../images/3.bmp'
export default async function(root: HTMLDivElement){
    root.innerHTML = `
    <div>
      <img id="image" src="${testImage}"></img>
      <canvas id="canvas" src="${testImage}"></canvas>

    </div>
  `
  let image = document.querySelector<HTMLImageElement>("#image")!;
  let canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  image.onload = ()=>{
    setup(image, canvas)
  }

}