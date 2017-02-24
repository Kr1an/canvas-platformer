class GameStateManager{
    
    constructor(){
        this.NUMGAMESTATES = 4
        this.MENUSTATE = 0
        this.LEVEL1STATE = 1
        this.HELPSTATE = 2
        this.EXITSTATE = 3
    
        this.gameStates = new Array(this.NUMGAMESTATES)
        this.currentState = this.MENUSTATE
        this.loadState(this.MENUSTATE)
    }

    loadState(state){
        if(state === this.MENUSTATE){
            this.gameStates[this.currentState] = new MenuState(this);
        }else if( state === this.LEVEL1STATE){

        }else if( state === this.HELPSTATE){

        }else if( state === this.EXITSTATE){
            
        }
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
        // this.gameState[this.currentState].update()
        //console.log("update")
    }

    draw(context){
        this.gameStates[this.currentState].draw(context)
        //console.log("draw")
    }
    
    keyDown(key){
        this.gameStates[this.currentState].keyDown(key)
    }
}
