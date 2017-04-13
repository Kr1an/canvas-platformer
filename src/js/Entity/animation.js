class Animation{

    constructor(){
        this.frames = null
        this.currentFrame = -1
        this.delay = -1
    }

    setFrames(frames){
        this.frames = frames
    }
    
    setDelay(delay){
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
            this.startTime = Date.now()  
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

module.exports = Animation