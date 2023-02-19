import CatchPhoto from "./main"
export default class Camra{
    video: HTMLVideoElement;
    static constraints:{
        audio: false,
        video: {
            facingMode: "user",  //開前鏡頭
            // frameRate: { ideal: 10, max: 15 } }
        }
    }
    constructor(video: HTMLVideoElement){
        this.video = video;
        this.video.autoplay = true;
    }
    async open(){
        try{
            let stream = await navigator.mediaDevices
                .getUserMedia(Camra.constraints);
            this.video.srcObject = stream;
        } catch{
            throw 'camra is not found'
        }        
    }

    async toCanvas(catchPhoto: CatchPhoto) : Promise<void>{
        return await new Promise((resolve)=>{
            catchPhoto.ctx.drawImage(this.video, 0, 0, catchPhoto.width, catchPhoto.height); 
            resolve();
        })
    }

    async close() : Promise<void>{
        return await new Promise((resolve)=>{
            if(this.video.srcObject){
                let media: MediaStream = this.video.srcObject as MediaStream;
                media.getTracks().map(function(track) {
                    track.stop();
                });
                resolve();
            } else {
                resolve();
            }
        })
    }
}