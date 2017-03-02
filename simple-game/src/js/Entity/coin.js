class Coin extends MapObject{
    constructor(tileMap, x, y){
        super(tileMap)
        this.exists = true
        this.width = 13
        this.height = 13
        this.cwidth = 13
        this.cheight = 13
        this.setPosition(x, y)
        this.animation = null

        this.loadSprites()
    }

    loadSprites(){
        let frames = new Array(Coin.ANIMATIONLENGTH).fill(null).map((i, idx)=>{
            let img = new Image()
            img.src = `./src/resources/Sprites/Coin/0/${idx}.png`
            return img
        })
        this.animation = new Animation()
        this.animation.setFrames(frames)
        this.animation.setDelay(Coin.ANIMEDELAY)

    }

    update(){
        this.setMapPosition()
        this.animation.update()
    }
}

// Animation Length
Coin.ANIMATIONLENGTH = 6
Coin.ANIMEDELAY = 100
