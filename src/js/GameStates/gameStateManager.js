class GameStateManager{
    
    constructor(){
        this.NUMGAMESTATES = 4
        this.MENUSTATE = 0
        this.LEVEL1STATE = 1
        this.HELPSTATE = 2
        this.EXITSTATE = 3

        this.running = true
    
        this.gameStates = new Array(this.NUMGAMESTATES)
        this.currentState = this.MENUSTATE
        this.loadState(this.MENUSTATE)
    }

    loadState(state){
        if(state === this.MENUSTATE)
            this.gameStates[this.currentState] = new MenuState(this)
        else if( state === this.LEVEL1STATE)
            this.gameStates[this.currentState] = new Level1State(this)
        else if( state === this.EXITSTATE)
            this.running = false
        
    }

    unloadState(state){
        delete(this.gameStates[state])
    }

    setState(state){
        this.unloadState(this.currentState)
        this.currentState = state
        this.loadState(this.currentState)
    }

    update(context){
        this.gameStates[this.currentState].update()
    }

    draw(context){
        this.gameStates[this.currentState].draw(context)
    }
    
    keyDown(key){
        this.gameStates[this.currentState].keyDown(key)
    }
    keyUp(key){
        this.gameStates[this.currentState].keyUp(key)
    }
}
