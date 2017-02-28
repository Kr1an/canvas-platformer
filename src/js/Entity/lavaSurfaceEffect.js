class LavaSurfaceEffect extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.currentAction = -1
        this.cwidth = this.tileMap.tileSize
        this.cheight = this.tileMap.tileSize
        this.width = 32
        this.height = 32
        this.cwidth = 32
        this.cheight = 32
        this.loadSprites()
                        
    }

    loadSprites(){
        this.sprites = 
            new Array(LavaSurfaceEffect.ANIMATIONNUM)
            .fill(new Array(LavaSurfaceEffect.ANIMATIONLENGTH).fill(null))

        this.sprites = this.sprites.map((i, idx)=>{
            return i.map((j, jdx)=>{
                let img = new Image()
                img.src = `./src/resources/Sprites/LavaSurEffect/${idx}/${jdx}.png`
                return img
            })
        })

        this.currentAction = LavaSurfaceEffect.DISACTIVE
        this.animation = new Animation()
        this.animation.setFrames(this.sprites[this.currentAction])
        this.animation.setDelay(LavaSurfaceEffect.ANIMEDELAY)
    }


    update(){
        this.checkAnimation()
        this.animation.update()
        this.setMapPosition()
        
        
    }

    changeAnimation(){
        this.currentAction = (this.currentAction + 1) % LavaSurfaceEffect.ANIMATIONNUM
        this.animation.setFrames(this.sprites[this.currentAction])
        this.animation.setDelay(LavaSurfaceEffect.ANIMEDELAY)
    }

    checkAnimation(){
        if(this.animation.playedOnce){
            this.facingRight = !this.facingRight
            if(Math.random()*(this.currentAction+2) | 0){
                this.changeAnimation()
            }
        }
    }
    
}

// Animation Options
LavaSurfaceEffect.ANIMATIONNUM = 2

// Animation Length
LavaSurfaceEffect.ANIMATIONLENGTH = 4
LavaSurfaceEffect.ANIMEDELAY = 100

//Animations
LavaSurfaceEffect.ACTIVE = 0
LavaSurfaceEffect.DISACTIVE = 1


