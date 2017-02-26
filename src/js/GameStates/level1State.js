class Level1State{
    constructor(gsm){
        this.tileMap = null
        this.background = null
        this.tileMap = null
        this.player = null
        this.gsm = gsm
        this.init()
    }

    init(){
        this.background = new Background(undefined, '#fff')
        let mapTxt = [
            '1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  1  0  0  0  1  0  0  1  0  0  0  1  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  1  1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1',
            '1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1',
            '1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1  1',

        ]
        this.tileMap = new TileMap(32, mapTxt)
        this.tileMap.setPosition(0,0)

        this.player = new Player(this.tileMap)
        this.player.setPosition(200,100)
    }

    update(){
        this.player.update()

         this.tileMap.setPosition(
            this.player.x, 
            this.player.y
        )
        
        this.background.update()    
    }

    draw(context){
        this.background.draw(context)

        this.tileMap.draw(context)

        this.player.draw(context)
    }

    keyDown(key){
        if(key === 'ArrowLeft'){
            this.player.left = true
        }else if(key === 'ArrowRight'){
            this.player.right = true
        }else if(key === 'Space'  || key === 'ArrowUp'){
            this.player.jumping = true
        }else if(key === 'KeyR'){
            GamePanel.FPS = 15
        }else if(key === 'ArrowDown'){
            this.player.setLowMode()
        }
        
    }
    keyUp(key){
        if(key === 'ArrowLeft'){
            this.player.left = false
        }else if(key === 'ArrowRight'){
            this.player.right = false
        }else if(key === 'Space' || key === 'ArrowUp'){
            this.player.jumping = false
            this.player.canJump = true
        }else if(key === 'KeyR'){
            GamePanel.FPS = 60
        }else if(key === 'ArrowDown'){
            this.player.setNormalMode()
            this.player.y = this.player.y-18
        }
        
    }
}
