class Background{
    constructor(imgPath){
        this.img = null
        this.isImageLoaded = false
        this.loadImage(imgPath)
    }

    loadImage(imgPath){
        let that = this
        this.img = new Image()
        this.img.onload = function(){
            that.isImageLoaded = true
            console.log("asdf")
        }
        imgPath = './src/resources/mainMenu.jpg'
        this.img.src = imgPath
    }

    update(){

    }

    draw(context){
        if(this.isImageLoaded){
            context.beginPath()
            context.fillStyle = '#000'
            context.fillRect(0, 0, WIDTH, HEIGHT)
            // context.drawImage(this.img, 0, 0, WIDTH, HEIGHT)
        }
        
    }
}
