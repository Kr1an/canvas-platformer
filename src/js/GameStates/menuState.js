class MenuState{
    constructor(gsm){
        this.background = new Background(undefined, "#000")
        this.currentChoice = 0
        this.options = ['Play', 'Help', 'Exit']
        this.gsm = gsm
    }

    update(){

    }

    draw(context){
        context.beginPath()
        this.background.draw(context)

        this.options.forEach((i, idx)=>{
            context.beginPath()
            context.lineWidth = 5
            context.font = '30px Delux'
            context.fillStyle = this.currentChoice === idx ? "#AA0000" : "#FFF"
            context.fillText(i, 255, 180+idx*65)
        })
        
        
    }

    keyDown(key){
        if(key === 'ArrowUp'){
            this.currentChoice--
            if(this.currentChoice === -1)
                this.currentChoice = this.options.length - 1
        }else if(key === 'ArrowDown'){
            this.currentChoice++
            if(this.currentChoice === this.options.length)
                this.currentChoice = 0
        }else if(key === 'Enter'){
            this.select()
        }
        console.log(this.currentChoice)
    }

    select(){
        if(this.currentChoice === 0){
            this.gsm.setState(this.gsm.LEVEL1STATE)
        }else if(this.currentChoice === 1){
            this.gsm.setState(this.gsm.HELPSTATE)
        }else if(this.currentChoice === 2){
            this.gsm.setState(this.gsm.EXITSTATE)
        }

    }
}
