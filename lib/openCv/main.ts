import './opencv.4.5.0.js';

export default function(imageDom: HTMLImageElement, canvasDom: HTMLCanvasElement) {
    let cv: any = globalThis.cv;
    try {
        // Your OpenCV code
        let mat = cv.imread(imageDom);
        canvasDom.width = imageDom.width;
        canvasDom.height = imageDom.height;
        let dst = new cv.Mat();
        cv.cvtColor(mat, dst, cv.COLOR_RGBA2GRAY, 0);

        cv.imshow(canvasDom, dst);
        mat.delete(); dst.delete();

        imageDom.after(canvasDom);
    } catch (err) {
        console.log(err)
    }
}