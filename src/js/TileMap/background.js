class Background{
    constructor(imgPath, color){
        this.isImage = typeof imgPath !== 'undefined'
        this.isPlaneColor = typeof color !== 'undefined'
        if(this.isImage){
            this.img = null
            this.isImageLoaded = false
            this.loadImage(imgPath)
        } else if(this.isPlaneColor){
            this.color = color
        }
        
    }

    loadImage(imgPath){
        let that = this
        this.img = new Image()
        this.img.onload = function(){
            that.isImageLoaded = true
        }
        this.img.src = imgPath
    }

    update(){

    }

    draw(context){
        if(this.isImage){
            context.beginPath()
            context.drawImage(this.img, 0, 0, GamePanel.WIDTH, GamePanel.HEIGHT)
        }else if(this.isPlaneColor){
            context.beginPath()
            context.fillStyle = this.color
            context.fillRect(0, 0, GamePanel.WIDTH, GamePanel.HEIGHT)
        }        
    }
}
