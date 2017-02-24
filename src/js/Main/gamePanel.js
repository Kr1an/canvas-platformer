class GamePanel{
    constructor(){
        this.WIDTH = 640
        this.HEIGHT = 480
        this.FPS = 60

        this.panel = null
        this.context = null  
        this.targetTime = 1000 / this.FPS
        this.running = true

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
        this.panel.width = this.WIDTH;
        this.panel.height = this.HEIGHT;
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


