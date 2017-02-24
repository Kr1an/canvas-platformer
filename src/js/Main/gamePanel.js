const WIDTH = 640
const HEIGHT = 480
const FPS = 60
class GamePanel{

    constructor(){
        this.panel = null
        this.context = null  
        this.targetTime = 1000 / FPS

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
        this.panel.width = WIDTH;
        this.panel.height = HEIGHT;
    }
    
   

    run(){      
        let that = this
        let mainLoop = setInterval(()=>{
            if(!this.gsm.running){
                
                clearInterval(mainLoop)
                this.onExit()
                return
            }
            that.update()
            that.draw()
            that.drawToScreen()
            
                

        }, that.targetTime*0.5)       
    }

    setKeyListeners(){
        let that = this
        this.foo = function(e){
            that.keyDown(e.code)
            
        }
        window.addEventListener('keydown', that.foo)
    }

    keyDown(key){  
        this.gsm.keyDown(key);
    }

    onExit(){
        document.getElementById('canvas').remove()
        document.removeEventListener('keydown', this.foo, false)
    }
}


