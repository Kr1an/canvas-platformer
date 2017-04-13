var GameStateManager = require('../GameStates/gameStateManager.js')

class GamePanel{

    constructor(){
        this.panel = null
        this.context = null  
        this.targetTime = 1000 / GamePanel.FPS

        this.gsm = new GameStateManager()
        this.setContentPanel()
        this.setKeyListeners()
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
            if(!that.gsm.running) that.onExit()
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
        let usedKeys = [
            'ArrowDown',
            'ArrowUp',
            'Space',
            'KeyC'
        ]
        let that = this

        this.onKeyDown = (e)=>{
            if(usedKeys.includes(e.code))           
                e.preventDefault()
            that.keyDown(e.code)
        }
        this.onKeyUp = (e)=>{
            if(usedKeys.includes(e.code))
                e.preventDefault()
            that.keyUp(e.code);
        }
        this.onKeyPress  = (e)=>{
            if(usedKeys.includes(e.code))
                e.preventDefault()
            that.keyPress(e.code);
        }
        window.addEventListener('keydown', that.onKeyDown)
        window.addEventListener('keyup', that.onKeyUp)
        window.addEventListener('keypress', that.onKeyPress)
    }

    keyDown(key){  
        this.gsm.keyDown(key);
    }
    keyUp(key){
        this.gsm.keyUp(key);
    }
    keyPress(key){
        this.gsm.keyPress(key);
    }

    onExit(){
        document.getElementById('canvas').remove()
        document.removeEventListener('keydown', this.foo, false)
    }
}

GamePanel.WIDTH = 640
GamePanel.HEIGHT = 480
GamePanel.FPS = 60

module.exports = GamePanel






