var Background = require('../TileMap/background.js'),
    TileMap = require('../TileMap/tileMap.js'),
    Player = require('../Entity/player.js'),
    TextTip = require('../Entity/textTip.js'),
    Tile = require('../TileMap/tile.js'),
    GameStateManager = require('./gameStateManager.js'),
    Coin = require('../Entity/coin.js'),
    LavaSurfaceEffect = require('../Entity/lavaSurfaceEffect.js'),
    HorDigger = require('../Entity/Enemy/horDigger.js'),
    VerDigger = require('../Entity/Enemy/verDigger.js'),
    GamePanel = require('../Main/gamePanel.js')


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
        this.lockers = []
        this.init()
        GamePanel = require('../Main/gamePanel.js')
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
                else if(j === Tile.LOCKER){
                    let locker = {row: idx, col: jdx}
                    that.lockers.push(locker)
                }
            })
        })
        this.lockers.sort((a,b)=> a.col > b.col ? 1 : a.col == b.col ? 0 : -1)
        this.lockers.forEach(i=>{
            that.tileMap.map[i.row][i.col] = Tile.BLOCKED
        })
        
    }

    addTextTips(){
        this.textTips.push(new TextTip(this.tileMap, ['use keyboard to move', '<-left/right->'], 160, 60))
        this.textTips[this.textTips.length-1].setFont(13)
        this.textTips.push(new TextTip(this.tileMap, ['ok,', 'now we can talk'], 200, 60))
        this.textTips[this.textTips.length-1].setFont(13)
        this.textTips.push(new TextTip(this.tileMap, ['Greeting, stranger', 'Welcome to','my imagination.'], 285, 50))
        this.textTips[this.textTips.length-1].setFont(14)
        this.textTips.push(new TextTip(this.tileMap, ['Okey, let us', 'start this game', 'Be nice', 'it should be cool'], 410, 45))
        this.textTips[this.textTips.length-1].setFont(10)
        this.textTips.push(new TextTip(this.tileMap, ['Here you are an', 'old, poor mage', 'with very', 'big family'], 380, 140))
        this.textTips[this.textTips.length-1].setFont(13)
        this.textTips.push(new TextTip(this.tileMap, ['All that you know', 'is about your live job', 'in circus:', 'juggling, joying...'], 240, 140))
        this.textTips[this.textTips.length-1].setFont(13)
        this.textTips.push(new TextTip(this.tileMap, ['But it\'s about hard times:', 'New generation do not need', 'circuses anymore: they have computers', 'No money. In your pockets'], 65, 140))
        this.textTips[this.textTips.length-1].setFont(13)
        this.textTips.push(new TextTip(this.tileMap, ['But still huge family: lovely Nally, smart Ronsonus,', 'not so smart but strong Ronsoniy, little Ronny,', 'Gonny, Morry, offcource Vitty, Ritty.', 'Gilly, Silly.', 'And you are sure, your forgot someone.'], 69, 268))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['My imaginary world is', 'your last opportynity', 'to resque your family from', 'hangry end.'], 250, 280))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['And you finally got it!', 'that\'s exactry why you are here.', 'Because of these coins.', 'Try to find all in this lvl', 'then we will talk'], 110, 370))
        this.textTips[this.textTips.length-1].setFont(9)
        

        this.textTips.push(new TextTip(this.tileMap, ['Holy,','What\'re','fu*ck'], 40, 820))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ["Holy, Seems Someone", 'made this trap for', 'you. What are bad people.', 'But remember.','Your are skilled mage', 'Use your','"transisfuncation"(Arrow Up)', 'to become a bit lighter','', 'Then', 'Use \'Space\''], 35, 525))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ["Nice feeling of flying", 'It\'s one of your mods.','Remember it.', 'Birdman is not very good','at turning', 'but speed and ','flying is awesome'], 230, 810))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['Nice form to grab', 'coins that\'s flying', 'You shoud pick all of', 'these coins for the','sake of your family.'], 389, 525))
        this.textTips[this.textTips.length-1].setFont(9)   
        this.textTips.push(...new Array(6).fill(new TextTip(this.tileMap, [], 0, 0)))


        this.textTips.push(new TextTip(this.tileMap, ['Should use','other form', 'ArrowDownX2'], 680, 840))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['Fast, double', 'jump and', 'little, but', 'cannot take coins.', 'So, unfortunatly.'], 1065, 750))
        this.textTips[this.textTips.length-1].setFont(9)  
        this.textTips.push(...new Array(8).fill(new TextTip(this.tileMap, [], 0, 0)))



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
        this.updateRoomState()
    }

    updateRoomState(){
        if(this.coins.filter(x=>!x.exists).length >= 10){
            this.deleteDivider()
            this.coins = this.coins.filter(x=>x.exists)
            this.textTips.splice(0,10)
            if(Level1State.SPAWNLOCATION.length > 1)
                Level1State.SPAWNLOCATION.splice(0,1)
        }
    }

    deleteDivider(){
        let that = this
        this.lockers.splice(0,3).forEach((x)=>{
            that.tileMap.map[x.row][x.col] = Tile.NORMAL
        })
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
        this.player.setPosition(Level1State.SPAWNLOCATION[0].x,Level1State.SPAWNLOCATION[0].y)
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
        }else if(key === 'KeyC' && this.player.mode == Player.LOWMODE){
            GamePanel = require('../Main/gamePanel.js')
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
        }else if(key === 'KeyC'){
            GamePanel = require('../Main/gamePanel.js')
            GamePanel.FPS = 60
        }else if(key === 'ArrowDown'){
            this.player.modeDown()
        }else if(key === 'ArrowUp'){
            this.player.modeUp()
        } 
    }
}
Level1State.NUMOFSHOWNTIPS = 1
Level1State.SPAWNLOCATION = [
    {x: 120, y: 60}, 
    {x: 77, y: 500},
    {x: 660, y: 800}
    ]
Level1State.JSONMap = {name : "New Project", tileSize : 32, tileSetTileCount : 256, tileSetImageUrl : "images/tile-game-1.png", brushTile : 12, airTile : 0, paletteShortcuts : [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250], levelArray : [{name : "Level 1", width : 59, height : 29, map : [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 8, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 8, 0, 8, 0, 8, 0, 8, 8, 8, 0, 8, 0, 8, 0, 8, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 14, 14, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 12, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 8, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 8, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 8, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 14, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 8, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 14, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 8, 0, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 0, 0, 0, 2, 2, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 8, 0, 2, 2, 0, 0, 0, 14, 0, 2, 0, 6, 6, 2, 6, 6, 2, 6, 6, 6, 6, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 14, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 14, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 8, 0, 0, 8, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 8, 0, 2, 0, 8, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]}]}

module.exports = Level1State