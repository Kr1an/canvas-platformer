class GamePanel{

    constructor(){
        this.panel = null
        this.context = null  
        this.targetTime = 1000 / GamePanel.FPS

        this.gsm = new GameStateManager()
        this.setContentPanel()
        this.setKeyListeners()
        console.log(this.panel)
        console.log(this.context)
    }

    update(){
        this.gsm.update()
    }
    
    draw(){
        this.gsm.draw(this.context)
    }

    drawToScreen(){
        // console.log("drawToScreen")
        // update screen if needed
    }
    
    setContentPanel(){
        this.panel = document.getElementById("canvas")
        this.context = this.panel.getContext('2d')
        this.panel.width = GamePanel.WIDTH;
        this.panel.height = GamePanel.HEIGHT;
    }
    
   

    run(){      
        let that = this

        

        this.mainLoop = function () {
            

            if(!that.gsm.running){
                that.onExit()
                return
            }
            that.update()
            that.draw()
            that.drawToScreen()
            setTimeout( that.mainLoop, that.getFPS() );
        }
        setTimeout( this.mainLoop, this.getFPS() );     
    }
    
    getFPS(){
        return 1000/GamePanel.FPS
    }

    setKeyListeners(){
        let that = this
        this.onKeyDown = function(e){
            that.keyDown(e.code)
            
        }
        this.onKeyUp = function(e){
            that.keyUp(e.code)
            
        }
        window.addEventListener('keydown', that.onKeyDown)
        window.addEventListener('keyup', that.onKeyUp)
    }

    keyDown(key){  
        this.gsm.keyDown(key);
    }
    keyUp(key){
        this.gsm.keyUp(key);
    }

    onExit(){
        document.getElementById('canvas').remove()
        document.removeEventListener('keydown', this.foo, false)
    }
}

GamePanel.WIDTH = 640
GamePanel.HEIGHT = 480
GamePanel.FPS = 60


