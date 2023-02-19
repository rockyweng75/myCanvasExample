import { run, doPrediction } from "../../lib/training/main"
export default async function(root: HTMLDivElement){
    root.innerHTML = `
    <div>
      <button id="predict">預測</button>
    </div>
  `
    let model = await run();

    let button = document.getElementById("predict");

}