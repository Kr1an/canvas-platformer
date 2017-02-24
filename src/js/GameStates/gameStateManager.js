class GameStateManager{
    constructor(){
        this.NUMGAMESTATES = 2
        this.MENUSTATE = 0
        this.LEVEL1STATE = 1
    
        this.gameStates = new Array(this.NUMGAMESTATES)
        this.currentState = this.MENUSTATE
        this.loadState(this.MENUSTATE)
    }

    loadState(state){
        if(state == this.MENUSTATE){
            this.gameStates[this.currentState] = new MenuState();
        }
    }

    unloadState(state){
        delete(this.gameStates[state])
    }

    setState(state){
        unloadState(this.currentState)
        this.currentState = state
        loadState(this.currentState)
    }

    update(context){
        // this.gameState[this.currentState].update()
        //console.log("update")
    }

    draw(){
        // this.gameState[this.currentState].draw()
        //console.log("draw")
    }
    
    keyDown(key){
        this.gameStates[this.currentState].keyDown(key)
    }
}
