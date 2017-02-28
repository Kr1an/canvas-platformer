class Level1State{
    constructor(gsm){
        this.tileMap = null
        this.background = null
        this.tileMap = null
        this.player = null
        this.gsm = gsm
        this.textTips = []
        this.lavaSurfaceEffects = []
        this.enemies = []
        this.coins = []
        this.init()
        GamePanel.FPS = 60
    }

    init(){
        this.background = new Background("./src/resources/Background/0.png")
        this.tileMap = new TileMap(32, Level1State.JSONMap)
        this.tileMap.setPosition(0,0)
        this.respawnPlayer()
        this.addExtraObects()
    }

    addExtraObects(){
        this.addTextTips()
        this.addExtraObjectsFromMapSpawns()
    }

    addExtraObjectsFromMapSpawns(){
        let that = this
        this.tileMap.map.forEach((i, idx)=>{
            i.forEach((j, jdx)=>{
                if(j === Tile.LAVASURFACEEFFECT){
                    let lavaEffect = new LavaSurfaceEffect(that.tileMap)
                    lavaEffect.setPosition((jdx + 0.5)*that.tileMap.tileSize, (idx+0.5)*that.tileMap.tileSize)
                    that.lavaSurfaceEffects.push(lavaEffect)
                }else if(j === Tile.COINSPAWN){
                    let coin = new Coin(that.tileMap)
                    coin.setPosition((jdx + 0.5)*that.tileMap.tileSize, (idx+0.5)*that.tileMap.tileSize)
                    that.coins.push(coin)
                }else if(j === Tile.HORDIGGERSPAWN){
                    let digger = new HorDigger(that.tileMap)
                    digger.setPosition((jdx + 0.5)*that.tileMap.tileSize, (idx+0.5)*that.tileMap.tileSize)
                    that.enemies.push(digger)
                }else if(j === Tile.VERDIGGERSPAWN){
                    let digger = new VerDigger(that.tileMap)
                    digger.setPosition((jdx + 0.5)*that.tileMap.tileSize, (idx+0.5)*that.tileMap.tileSize)
                    that.enemies.push(digger)
                }
            })
        })
        
    }

    addTextTips(){
        this.textTips.push(new TextTip(this.tileMap, ["play","me."], 40, 560))
        this.textTips.push(new TextTip(this.tileMap, ["too","slow?"], 40, 650))
        this.textTips.push(new TextTip(this.tileMap, ["then press <r>"], 40, 800))
        this.textTips.push(new TextTip(this.tileMap, ["pressing <r> is kind of", "to make you life easier"], 140, 865))
        this.textTips.push(new TextTip(this.tileMap, ["Collect all", "coins, then", "we talk."], 40, 500))
        this.textTips.push(new TextTip(this.tileMap, ["kill me", "now"], 550, 495))
        this.textTips[this.textTips.length-1].setFont(8)
        this.textTips[this.textTips.length-1].cheight = 5
        this.textTips.push(new TextTip(this.tileMap, ["congret", "now it's", "impossible"], 40, 495))
        this.textTips[this.textTips.length-1].setFont(8)
        this.textTips[this.textTips.length-1].cheight = 1 
        this.textTips[this.textTips.length-1].cwidth = 1 
    }

    update(){
        this.checkCollisionWithOtherObjects()
        this.checkIfLvlChanged()
        this.player.update()
        this.tileMap.setPosition(this.player.x, this.player.y)
        this.background.update()  
        this.player.checkAttack()
        this.onPlayerActions()  
        this.updateExtraObjects()
    }
    checkIfLvlChanged(){
        if(this.tileMap.lvlChanged){
            this.tileMap.lvlChanged = false
            this.background.changeImgRandomly()
        }
    }
    updateExtraObjects(){
        this.updateTextTips()
        this.updateLavaSurfaceEffects()
        this.updateCoins()
        this.updateEnemies()
    }
    updateEnemies(){
        this.enemies.filter(x=>!x.dead).forEach(x=>x.update())
    }
    updateCoins(){
        this.coins.filter((x)=>x.exists).forEach((i)=>{i.update()})
    }
    updateLavaSurfaceEffects(){
        this.lavaSurfaceEffects.forEach((i)=>{i.update()})
    }

    updateTextTips(){
        this.textTips.filter(x=>x.visible).forEach((i)=>{i.update()})
    }

    checkCollisionWithOtherObjects(){
        // collision with textTile
        let currentTip = this.textTips.find(x=>x.visible)
        if( currentTip && currentTip.intersects(this.player)){
            currentTip.visible = false
        }

        // collision with coins
        let that = this
        this.coins.filter(i=>i.exists).forEach(i=>{
            if(i.intersects(that.player) && that.player.mode != Player.LOWMODE)
                i.exists = false
        })

        // collision with enemies
        this.enemies.filter(x=>!x.dead).forEach((i, idx)=>{
            if(i.intersects(that.player)){
                that.player.hit(i.damage)
                i.hit(40)
            }
                
        })
    }

    resetTextTips(){
        this.textTips.forEach((i)=>{i.visible = true})
    }
    resetCoins(){
        this.coins.forEach((i)=>{i.exists = true})
    }
    resetEnemies(){
        this.enemies.forEach(i=>{i.reset()})
    }



    respawnPlayer(){
        if(this.player !== null)
            delete(this.player)
        this.player = new Player(this.tileMap)
        this.player.setPosition(Level1State.SPAWNLOCATION.x,Level1State.SPAWNLOCATION.y)
    }

    onPlayerActions(){
        if(this.player.dead){
            this.respawnPlayer()
            this.resetTextTips()
            this.resetCoins()
            this.resetEnemies()
        }
    }

    draw(context){
        this.background.draw(context)
        this.tileMap.draw(context)
        this.player.draw(context)
        this.drawExtraObjects(context)
    }
    
    drawExtraObjects(context){
        this.drawTextTips(context)
        this.drawLavaSurfeceEffects(context)
        this.drawCoins(context)  
        this.drawEnemies(context)
    }
    drawEnemies(context){
        this.enemies.filter(x=>!x.dead).forEach(x=>{x.draw(context)})
    }

    drawLavaSurfeceEffects(context){
        this.lavaSurfaceEffects.forEach((i)=>{i.draw(context)})
    }

    drawCoins(context){
        this.coins.filter(x=>x.exists).forEach((i)=>{i.draw(context)})
    }

    drawTextTips(context){
        let currentTip = this.textTips.find(x=>x.visible === true)
        if(currentTip){
            currentTip.draw(context)
        }
    }

    keyDown(key){
        if(key === 'ArrowLeft'){
            this.player.left = true
        }else if(key === 'ArrowRight'){
            this.player.right = true
        }else if(key === 'Space'){
            this.player.jumping = true
        }else if(key === 'KeyR' && this.player.mode == Player.LOWMODE){
            GamePanel.FPS = 15
        }
        
    }
    keyUp(key){
        if(key === 'ArrowLeft'){
            this.player.left = false
        }else if(key === 'ArrowRight'){
            this.player.right = false
        }else if(key === 'Space'){
            this.player.jumping = false
            this.player.canJump = true
        }else if(key === 'KeyR' && this.player.mode == Player.LOWMODE){
            GamePanel.FPS = 60
        }else if(key === 'ArrowDown'){
            this.player.modeDown()
        }else if(key === 'ArrowUp'){
            this.player.modeUp()
        } 
    }
}
Level1State.NUMOFSHOWNTIPS = 1
Level1State.SPAWNLOCATION = {x: 49, y: 500}
Level1State.JSONMap = {name : "New Project", tileSize : 32, tileSetTileCount : 256, tileSetImageUrl : "images/tile-game-1.png", brushTile : 4, airTile : 0, paletteShortcuts : [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250], levelArray : [{name : "Level 1", width : 59, height : 29, map : [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 10, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 2, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 12, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 2, 2, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 8, 0, 10, 0, 0, 0, 0, 0, 0, 8, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 8, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]}]}
