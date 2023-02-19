import setup from "../../lib/myImageDetection/main"
import testImage from '../images/9.png'
export default async function(root: HTMLDivElement){
    root.innerHTML = `
    <div>
      <img id="image" src="${testImage}"></img>
    </div>
  `
  let image = document.querySelector<HTMLImageElement>("#image")!;
  image.onload = ()=>{
    setup(image)
  }

}