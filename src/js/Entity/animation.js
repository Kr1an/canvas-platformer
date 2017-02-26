class Animation{

    constructor(frames, delay){
        this.frames = frames
        this.delay = delay
        this.currentFrame = 0
        this.startTime = Date.now();
        this.playedOnce = false
    }

    update(){
        if(this.delay == -1) return

        let elapsed = Date.now() - this.startTime
        if(elapsed > this.delay){
            this.currentFrame++  
        }
        if(this.currentFrame >= this.frames.length) {
			this.currentFrame = 0;
			this.playedOnce = true;
		}
    }

    getFrame(){
        return this.frames[this.currentFrame]
    }
}
