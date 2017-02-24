const WIDTH = 640
const HEIGHT = 480
const FPS = 60
class GamePanel{

    constructor(){
        this.panel = null
        this.context = null  
        this.targetTime = 1000 / FPS
        this.running = true

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
        setInterval(()=>{
            that.update()
            that.draw()
            that.drawToScreen()
        }, that.targetTime*0.5)       
    }

    setKeyListeners(){
        let that = this
        window.addEventListener('keydown', function(e){
            that.keyDown(e.code)
            
        })
    }

    keyDown(key){  
        this.gsm.keyDown(key);
    }

}


