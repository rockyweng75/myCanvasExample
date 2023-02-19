import { drawConnectors } from '@mediapipe/drawing_utils';
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection"
import * as faceMesh from "@mediapipe/face_mesh"
import sumglasses from "../../src/images/sunglasses-5-svgrepo-com.svg"

export default async function (image: HTMLImageElement, canvasDom: HTMLCanvasElement){
  
  let ctx = canvasDom.getContext('2d');
  canvasDom.width = image.width;
  canvasDom.height = image.height;

  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;

  const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig = {
      runtime: 'mediapipe', // or 'tfjs'
      // solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      solutionPath: "/node_modules/@mediapipe/face_mesh",
      refineLandmarks: true
    }
  const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

  const faces = await detector.estimateFaces(image);
  let face = faces[0];  

  ctx!.beginPath();
  ctx!.fillStyle = "beige";
  ctx!.fillRect(0, 0, image.width, image.height);
  // ctx!.drawImage(image, 0, 0, image.width, image.height);
  ctx!.strokeStyle = "gold";
  ctx!.lineWidth = 5;

  if(image.height < image.width){
    let rate = image.height / image.width ;
    ctx!.strokeRect(face.box.xMin, face.box.yMin * rate, face.box.width, face.box.height * rate);
  } else {
    let rate = image.width / image.height ;
    ctx!.strokeRect(face.box.xMin * rate, face.box.yMin, face.box.width * rate, face.box.height) ;
  }
  
  ctx!.strokeStyle = "green";
  ctx!.lineWidth = 1;

  let newkeypoints = face.keypoints.map(o =>{
    return  {x: (o.x /image.width), y: (o.y/image.width), z:(o.z!/image.width)};
  })
  
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_TESSELATION,
                {color: '#C0C0C070', lineWidth: 1});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_RIGHT_EYE, {color: '#FF3030'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_LEFT_EYE, {color: '#30FF30'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_LEFT_IRIS, {color: '#30FF30'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
  drawConnectors(ctx!, newkeypoints, faceMesh.FACEMESH_LIPS, {color: '#E0E0E0'});
  ctx!.stroke();

  addClasses(ctx!, face);

  // let mesh = new faceMesh.FaceMesh({locateFile: (file) => {
  //   return `/node_modules/@mediapipe/face_mesh/${file}`;
  // }});

  // mesh.setOptions({
  //   maxNumFaces: 1,
  //   refineLandmarks: true,
  //   minDetectionConfidence: 0.5,
  //   minTrackingConfidence: 0.5
  // });
  // mesh.onResults((results: faceMesh.Results) => {
  //   console.log(results)

  // //   ctx!.save();
  // //   ctx!.clearRect(0, 0, image.width, image.height);
  // //   ctx!.drawImage(
  // //       results.image, 0, 0, image.width, image.height);
  // //   if (results.multiFaceLandmarks) {
  // //     for (const landmarks of results.multiFaceLandmarks) {
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_TESSELATION,
  // //                     {color: '#C0C0C070', lineWidth: 1});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_RIGHT_EYE, {color: '#FF3030'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_LEFT_EYE, {color: '#30FF30'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_LEFT_IRIS, {color: '#30FF30'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
  // //       drawConnectors(ctx!, landmarks, faceMesh.FACEMESH_LIPS, {color: '#E0E0E0'});
  // //     }
  // //   }
  // //   ctx!.restore();
  // }) 

  // mesh.send({image: image});

}

function addClasses(ctx: CanvasRenderingContext2D, result: faceLandmarksDetection.Face){
  // 注意：是鏡向
  let rightIrispoints = result.keypoints
    .filter(o => o.name && o.name!.toLowerCase().indexOf('rightiris') >= 0);

    ctx.beginPath();
    ctx.fillStyle = "white"
    // 逆時鐘方向 0:右邊 3:下面
    ctx.arc(rightIrispoints[2].x, rightIrispoints[2].y, 2, 0, 4 * Math.PI);
    ctx.fill();

  let leftIrispoints = result.keypoints
    .filter(o => o.name && o.name!.toLowerCase().indexOf('leftiris') >= 0);

  
  ctx.beginPath();
  ctx.fillStyle = "white"
  ctx.arc(leftIrispoints[2].x, leftIrispoints[2].y, 2, 0, 4 * Math.PI);
  ctx.fill();

  let img = new Image();
  img.src = sumglasses;
  console.log(rightIrispoints[3].y, rightIrispoints[1].y)

  img.onload = () => {
    // ctx!.drawImage(img, 0, -30, 100, 100)
    ctx!.drawImage(img, rightIrispoints[2].x * 0.88, leftIrispoints[1].y * 0.7,
      (leftIrispoints[0].x - rightIrispoints[2].x) * 1.4, (rightIrispoints[3].y - rightIrispoints[1].y) * 8);

  }
}
