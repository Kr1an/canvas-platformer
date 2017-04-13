/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var GameStateManager = __webpack_require__(6)

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








/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Animation{

    constructor(){
        this.frames = null
        this.currentFrame = -1
        this.delay = -1
    }

    setFrames(frames){
        this.frames = frames
    }
    
    setDelay(delay){
        this.delay = delay
        this.currentFrame = 0
        this.startTime = Date.now();
        this.playedOnce = false
    }

    update(){
        if(this.delay == -1) return

        let elapsed = Date.now() - this.startTime
        if(elapsed > this.delay){
            this.currentFrame++
            this.startTime = Date.now()  
        }
        if(this.currentFrame >= this.frames.length) {
			this.currentFrame = 0;
			this.playedOnce = true;
		}
    }

    getFrame(){
        return this.frames[this.currentFrame]
    }
}

module.exports = Animation

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var TileMap = __webpack_require__(8),
    Animation = __webpack_require__(1),
    Tile = __webpack_require__(3),
    GamePanel = __webpack_require__(0)

class MapObject{
    constructor(tileMap){
        this.tileMap = tileMap
        this.tileSize = tileMap.tileSize
        this.xmap = 0
        this.ymap = 0

        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        this.width = 0
        this.height = 0

        this.cwidth = 0
        this.cheight = 0

        this.curRow = 0
        this.curCol = 0
        this.xdest = 0
        this.ydest = 0
        this.xtemp = 0
        this.ytemp = 0

        this.topLeft = false
        this.topRight = false
        this.bottomLeft = false
        this.bottomRight = false

        this.animation = null
        this.currentAction = 0
        this.previousAction = 0
        this.facingRight = true

        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.jumping = false
        this.falling = false

        this.moveSpeed = 0
        this.maxSpeed = 0
        this.stopSpeed = 0
        this.fallSpeed = 0
        this.maxFallSpeed = 0
        this.jumpStart = 0
        this.stopJumpSpeed = 0  
    }

    intersects(other){
        return this.getRect().intersects(other.getRect())

    }
    getRect(){
        return new Rect((this.x + this.xmap - this.width / 2) | 0, (this.y + this.ymap - this.height / 2) | 0, this.cwidth, this.cheight)
    }

    calculateCorners(x, y){
        let leftTile = (x - this.cwidth / 2) / this.tileSize | 0;
		let rightTile = (x + this.cwidth / 2 - 1) / this.tileSize | 0;
		let topTile = (y - this.cheight / 2) / this.tileSize | 0;
		let bottomTile = (y + this.cheight / 2 - 1) / this.tileSize | 0;
        // console.log(topTile)
        // console.log(leftTile + "  " + rightTile)
        // console.log(bottomTile)
        
		
        let tl = this.tileMap.map[topTile][leftTile];
        let tr = this.tileMap.map[topTile][rightTile];
        let bl = this.tileMap.map[bottomTile][leftTile];
        let br = this.tileMap.map[bottomTile][rightTile];

        // console.log(tl + " " + tr + " " + bl + " " + br)
        // console.log(this.y + " " +  this.x)
        // console.log(GamePanel.FPS + " - FPS")
        // console.log("========================")
		
	 	this.topLeft = tl == Tile.BLOCKED;
		this.topRight = tr == Tile.BLOCKED;
		this.bottomLeft = bl == Tile.BLOCKED;
		this.bottomRight = br == Tile.BLOCKED;

    }

    checkTileMapCollision() {
		
        this.currCol = Math.floor(this.x / this.tileSize);
        this.currRow = Math.floor(this.y / this.tileSize);
		
		this.xdest = this.x + this.dx;
		this.ydest = this.y + this.dy;
		
		this.xtemp = this.x;
		this.ytemp = this.y;
		
		this.calculateCorners(this.x, this.ydest);
		if(this.dy < 0) {
			if(this.topLeft || this.topRight) {
				this.dy = 0;
				this.ytemp = this.currRow * this.tileSize + this.cheight / 2;
			}
			else {
				this.ytemp += this.dy;
			}
		}
		if(this.dy > 0) {
			if(this.bottomLeft || this.bottomRight) {
				this.dy = 0;
				this.falling = false;
				this.ytemp = (this.currRow + 1) * this.tileSize - this.cheight / 2;
			}
			else {
				this.ytemp += this.dy;
			}
		}
		
		this.calculateCorners(this.xdest, this.y);
		if(this.dx < 0) {
			if(this.topLeft || this.bottomLeft) {
				this.dx = 0;
				this.xtemp = this.currCol * this.tileSize + this.cwidth / 2;
			}
			else {
				this.xtemp += this.dx;
			}
		}
		if(this.dx > 0) {
			if(this.topRight || this.bottomRight) {
				this.dx = 0;
				this.xtemp = (this.currCol + 1) * this.tileSize - this.cwidth / 2;
			}
			else {
				this.xtemp += this.dx;
			}
		}
		
		if(!this.falling) {
			this.calculateCorners(this.x, this.ydest + 1);
			if(!this.bottomLeft && !this.bottomRight) {
				this.falling = true;
			}
		}
		
	}

    setPosition(x, y){
        this.x = x
        this.y = y
    }

    setVector(dx, dy) {
		this.dx = dx;
		this.dy = dy;
	}
    setMapPosition() {
		this.xmap = this.tileMap.x;
		this.ymap = this.tileMap.y;
	}

    get getCurrRow(){return (this.x/this.tileSize) | 0}
    
    get getCurrCol(){return (this.y/this.tileSize) | 0}

    notOnScreen(){
        return this.x + this.xmap + this.width < 0 ||
			this.x + this.xmap - this.width > GamePanel.WIDTH ||
			this.y + this.ymap + this.height < 0 ||
			this.y + this.ymap - this.height > GamePanel.HEIGHT;
    }
    draw(context){
        if(this.facingRight) {
			context.drawImage(
				this.animation.getFrame(),
				(this.x + this.xmap - this.width / 2) | 0,
				(this.y + this.ymap - this.height / 2) | 0,
					this.width,
					this.height
			)
		}
		else {
            context.save()
            context.scale(-1, 1);
            
            context.drawImage(
				this.animation.getFrame(),
                -(this.x + this.xmap - this.width / 2.0 + this.width) | 0,
                (this.y + this.ymap - this.height / 2.0) | 0, 
                this.width,
				this.height
			)
           context.restore()
            
            
		}
    }


    
}

class Rect{
    constructor(x, y, cwidth, cheight){
        this.x = x
        this.y = y
        this.width = cwidth
        this.height = cheight
    }
    intersects(other){
        if (other.x < this.x + this.width && this.x < other.x + other.width && other.y < this.y + this.height)
            return this.y < other.y + other.height;
        else
            return false;
    }
}

module.exports = MapObject

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Tile{
    constructor(imgPath, type){
        this.img = new Image()
        this.img.src = imgPath
        this.type = type
    }
}
Tile.NUMOFTYPES = 15

Tile.NORMAL = 0
Tile.BLOCKED = 2
Tile.KILLING = 4
Tile.SAVING = 3
Tile.OTHER = 1
Tile.COINSPAWN = 8
Tile.LAVASURFACEEFFECT = 6
Tile.HORDIGGERSPAWN = 10
Tile.VERDIGGERSPAWN = 12
Tile.LOCKER = 14

module.exports = Tile


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Enemy = __webpack_require__(5),
	Animation = __webpack_require__(1)

class HorDigger extends Enemy{
    constructor(tileMap){
        super(tileMap)
        this.moveSpeed = 0.3
        this.maxSpeed = 0.3
        this.width = 50
        this.height = 50
        this.cwidth = 30
        this.cheight = 30
        
        this.maxHealth = 20
        this.health = this.maxHealth
        this.damage = 20

        this.loadSprites()
        this.initWithRandom()

        this.facingRight = true
        this.right = true
    }
    initWithRandom(){
        this.moveSpeed = this.maxSpeed = 0.3 + Math.random()*1
        this.width = this.height = 30 + Math.random()*60 | 0
        this.cwidth = this.cheight = this.width - 20
    }

    loadSprites(){
        let frames = new Array(HorDigger.ANIMATIONLENGTH).fill(null).map((i, idx)=>{
            let img = new Image()
            img.src = `./src/resources/Sprites/Enemy/horDigger/${idx}.png`
            return img
        })
        this.animation = new Animation()
        this.animation.setFrames(frames)
        this.animation.setDelay(HorDigger.ANIMEDELAY)
        
    }

    getNextPosition() {
		
		// movement
		if(this.left) {
			this.dx -= this.moveSpeed;
			if(this.dx < -this.maxSpeed) {
				this.dx = -this.maxSpeed;
			}
		}
		else if(this.right) {
			this.dx += this.moveSpeed;
			if(this.dx > this.maxSpeed) {
				this.dx = this.maxSpeed;
			}
		}
		
		// falling
		if(this.falling) {
			this.dy = 0;
		}
		
	}


	update() {
		
		// update position
		this.getNextPosition();
		this.checkTileMapCollision();
		this.setPosition(this.xtemp, this.ytemp);
		
		// if it hits a wall, go other direction
		if(this.right && this.dx == 0) {
			this.right = false;
			this.left = true;
			this.facingRight = false;
		}
		else if(this.left && this.dx == 0) {
			this.right = true;
			this.left = false;
			this.facingRight = true;
		}
		
		// update animation
		this.animation.update();
		
	}

    draw(context){
        this.setMapPosition();
		super.draw(context);
    }
}

// Animation Length
HorDigger.ANIMATIONLENGTH = 5
HorDigger.ANIMEDELAY = 100

module.exports = HorDigger

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var MapObject = __webpack_require__(2)

class Enemy extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.sprites = null
        this.dead = false
        this.health = this.maxHealth
        this.maxHealth = 20

        this.facingRight = true
    }

    hit(damage){
        if(this.dead) return
        this.health -= damage
        if(this.health < 0) this.health = 0
        if(this.health == 0) this.dead = true

    }

    reset(){
        this.dead = false
        this.health = this.maxHealth
    }

    update(){

    }
}

module.exports = Enemy

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Level1State = __webpack_require__(16),
    MenuState = __webpack_require__(17);


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
    keyPress(key){
        this.gameStates[this.currentState].keyPress(key)
    }
}

module.exports = GameStateManager


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

class Background{
    constructor(imgPath, color){
        this.isImage = typeof imgPath !== 'undefined'
        this.isPlaneColor = typeof color !== 'undefined'
        if(this.isImage){
            this.img = null
            this.isImageLoaded = false
            this.loadImage(imgPath)
        } else if(this.isPlaneColor){
            this.color = color
        }
        
    }

    loadImage(imgPath){
        let that = this
        this.img = new Image()
        this.img.onload = function(){
            that.isImageLoaded = true
        }
        this.img.src = imgPath
    }

    update(){
        

    }

    changeImgRandomly(){
        if((Math.random()*5 | 0) ==4 || true){
            this.img = new Image()
            this.img.src = `./src/resources/Background/${Math.random()*3 | 0}.png`
        }
    }

    draw(context){
        let GamePanel = __webpack_require__(0)
        if(this.isImage){
            context.beginPath()
            context.drawImage(this.img, 0, 0, GamePanel.WIDTH, GamePanel.HEIGHT)
        }else if(this.isPlaneColor){
            context.beginPath()
            context.fillStyle = this.color
            context.fillRect(0, 0, GamePanel.WIDTH, GamePanel.HEIGHT)
        }        
    }
}

module.exports = Background


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

class TileMap{
    constructor(tileSize, mapTxt){
        let GamePanel = __webpack_require__(0)
        this.x = 0
        this.y = 0
        this.xmin = 0
        this.xmax = 0
        this.map = null
        this.tileSize = tileSize
        this.numRows = 0
        this.numCols = 0
        this.width = 0
        this.height = 0
        this.tileSet = null
        this.tiles = null
        this.lvlChanged = false

        this.rowOffset = 0
        this.colOffset = 0
        this.numRowsToDraw = GamePanel.HEIGHT / this.tileSize + 2
        this.numColsToDraw = GamePanel.WIDTH / this.tileSize + 2

        this.loadTiles()
        this.loadMap(mapTxt)
    }

    loadTiles(){
        let Tile = __webpack_require__(3)
        this.tiles = new Array(Tile.NUMOFTYPES).fill(null).map((i, idx)=>{
            if(idx === Tile.NORMAL){
                return new Tile('./src/resources/Sprites/Tiles/Tile-normal-1.png', Tile.NORMAL)
            }else if(idx === Tile.KILLING){
                return new Tile("./src/resources/Sprites/Tiles/Tile-killing-1.png", Tile.KILLING)
            }else if(idx === Tile.BLOCKED){
                return new Tile("./src/resources/Sprites/Tiles/Tile-blocked-1.png", Tile.BLOCKED)
            }else if(idx === Tile.LOCKER){
                return new Tile("./src/resources/Sprites/Tiles/Tile-blocked-1.png", Tile.BLOCKED)
            }else{
                return new Tile('./src/resources/Sprites/Tiles/Tile-normal-1.png', idx)
            }

        })
        

    }

    loadMap(mapJSON){
        let GamePanel = __webpack_require__(0)

        this.map = new Array(mapJSON.levelArray[0].height)
            .fill(0)
        
        this.map = this.map.map((i, idx)=>{
            return mapJSON.levelArray[0].map.slice(mapJSON.levelArray[0].width*idx, mapJSON.levelArray[0].width*(idx+1))
        })

        // this.map = mapTxt.map((i, idx)=>{
        //     return i.split(' ').filter((x)=>x!=='').map((x)=>+x)
        // })
        this.numCols = this.map[0].length
        this.numRows = this.map.length
        this.width = this.numCols * this.tileSize;
        this.height = this.numRows * this.tileSize;

        this.xmin = GamePanel.WIDTH - this.width;
        this.xmax = 0;
        this.ymin = GamePanel.HEIGHT - this.height;
        this.ymax = 0;
    }

    setPosition(x, y){
        
        this.x = -(x / (this.tileSize*20) | 0) * this.tileSize*20
        this.y = -(y / (this.tileSize*15) | 0) * this.tileSize*15
        
        

        this.fixBounds()
        if((this.colOffset !== -this.x/this.tileSize | 0) || (this.rowOffset !== -this.y/this.tileSize | 0)){
            this.lvlChanged = true
        }
        this.colOffset = -this.x/this.tileSize | 0
        this.rowOffset = -this.y/this.tileSize | 0
        
        
        
        
    }

    fixBounds() {
		if(this.x < this.xmin) this.x = this.xmin;
		if(this.y < this.ymin) this.y = this.ymin;
		if(this.x > this.xmax) this.x = this.xmax;
		if(this.y > this.ymax) this.y = this.ymax;
	}


    draw(context){
        for(let row = this.rowOffset; row < this.rowOffset + this.numRowsToDraw; row++){
            if(row >= this.numRows || row < 0) break
            for(let col = this.colOffset; col < this.colOffset + this.numColsToDraw; col++){
                if(col >= this.numCols || col <0) break
                    if(this.map[row][col] <= 0) continue
                context.drawImage(
                    this.tiles[this.map[row][col]].img, 
                    -this.colOffset*this.tileSize + col*this.tileSize, 
                    -this.rowOffset*this.tileSize + row*this.tileSize,
                    32,
                    32
                )
            }
        }

    }

}

module.exports = TileMap


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(18)

new Game().run()

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Enemy = __webpack_require__(5),
	Animation = __webpack_require__(1),
	HorDigger = __webpack_require__(4)

class VerDigger extends HorDigger{
    constructor(tileMap){
        super(tileMap)

        this.jumpStart = 0.3
        this.fallSpeed = 0.3
        this.maxFallSpeed = 0.3
        
        this.width = 50
        this.height = 50
        this.cwidth = 30
        this.cheight = 30
        
        this.maxHealth = 20
        this.health = this.maxHealth
        this.damage = 20

        this.loadSprites()
        //this.initWithRandom()

        this.facingRight = true
        this.up = true
    }
    initWithRandom(){
        this.moveSpeed = this.maxSpeed = 0.3 + Math.random()*1
        this.width = this.height = 30 + Math.random()*60 | 0
        this.cwidth = this.cheight = this.width - 20
    }
    
    
    getNextPosition() {
        
		
		// movement
		if(this.up) {
			this.dy -= this.jumpStart;
			if(this.dy < -this.maxFallSpeed) {
				this.dy = -this.maxFallSpeed;
			}
		}
		else if(this.down) {
			this.dy += this.jumpStart;
			if(this.dy > this.maxFallSpeed) {
				this.dy = this.maxFallSpeed;
			}
		}		
	}

    update() {
		
		// update position
		this.getNextPosition();
		this.checkTileMapCollision();
		this.setPosition(this.xtemp, this.ytemp);
		
		// if it hits a wall, go other direction
		if(this.up && this.dy == 0) {
			this.up = false;
			this.down = true;
			this.facingRight = false;
		}
		else if(this.down && this.dy == 0) {
			this.up = true;
			this.down = false;
			this.facingRight = true;
		}
		
		// update animation
		this.animation.update();
		
	}
    
}

module.exports = VerDigger


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Animation = __webpack_require__(1),
    MapObject = __webpack_require__(2)

class Coin extends MapObject{
    constructor(tileMap, x, y){
        super(tileMap)
        this.exists = true
        this.width = 13
        this.height = 13
        this.cwidth = 13
        this.cheight = 13
        this.setPosition(x, y)
        this.animation = null

        this.loadSprites()
    }

    loadSprites(){
        let frames = new Array(Coin.ANIMATIONLENGTH).fill(null).map((i, idx)=>{
            let img = new Image()
            img.src = `./src/resources/Sprites/Coin/0/${idx}.png`
            return img
        })
        this.animation = new Animation()
        this.animation.setFrames(frames)
        this.animation.setDelay(Coin.ANIMEDELAY)

    }

    update(){
        this.setMapPosition()
        this.animation.update()
    }
}

// Animation Length
Coin.ANIMATIONLENGTH = 6
Coin.ANIMEDELAY = 100

module.exports = Coin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var MapObject = __webpack_require__(2),
    Animation = __webpack_require__(1)


class LavaSurfaceEffect extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.currentAction = -1
        this.cwidth = this.tileMap.tileSize
        this.cheight = this.tileMap.tileSize
        this.width = 32
        this.height = 32
        this.cwidth = 32
        this.cheight = 32
        this.loadSprites()
                        
    }

    loadSprites(){
        this.sprites = 
            new Array(LavaSurfaceEffect.ANIMATIONNUM)
            .fill(new Array(LavaSurfaceEffect.ANIMATIONLENGTH).fill(null))

        this.sprites = this.sprites.map((i, idx)=>{
            return i.map((j, jdx)=>{
                let img = new Image()
                img.src = `./src/resources/Sprites/LavaSurEffect/${idx}/${jdx}.png`
                return img
            })
        })

        this.currentAction = LavaSurfaceEffect.DISACTIVE
        this.animation = new Animation()
        this.animation.setFrames(this.sprites[this.currentAction])
        this.animation.setDelay(LavaSurfaceEffect.ANIMEDELAY)
    }


    update(){
        this.checkAnimation()
        this.animation.update()
        this.setMapPosition()
        
        
    }

    changeAnimation(){
        this.currentAction = (this.currentAction + 1) % LavaSurfaceEffect.ANIMATIONNUM
        this.animation.setFrames(this.sprites[this.currentAction])
        this.animation.setDelay(LavaSurfaceEffect.ANIMEDELAY)
    }

    checkAnimation(){
        if(this.animation.playedOnce){
            this.facingRight = !this.facingRight
            if(Math.random()*(this.currentAction*4+2) | 0){
                this.changeAnimation()
            }
        }
    }
    
}

// Animation Options
LavaSurfaceEffect.ANIMATIONNUM = 2

// Animation Length
LavaSurfaceEffect.ANIMATIONLENGTH = 4
LavaSurfaceEffect.ANIMEDELAY = 100

//Animations
LavaSurfaceEffect.ACTIVE = 0
LavaSurfaceEffect.DISACTIVE = 1

module.exports = LavaSurfaceEffect

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var MapObject = __webpack_require__(2),
    Animation = __webpack_require__(1),
    Tile = __webpack_require__(3)

class Player extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.setNormalMode();
        this.canJump = true
        this.jumpCount = 0
        this.firing = false
        this.sprites = null
        this.currentAction = -1
        this.gameover = false
        this.dead = false
        this.health = 1
        this.shouldChangeAnimation = false

        this.loadSprites()
        this.facingRight = true
    }

    checkAttack(){
        if(this.tileMap.map[this.getCurrCol][this.getCurrRow] === Tile.KILLING){
			this.hit(20);
		}
    }
    hit(damage){
        this.health -= damage;
		if(this.health < 0) 
            this.health = 0
		if(this.health == 0) 
            this.dead = true
    }

    loadSprites(){

        this.sprites = 
            new Array(Player.ANIMATIONNUM)
            .fill(new Array(Player.ANIMATIONLENGTH).fill(null))
  
        this.sprites = this.sprites.map((i, idx)=>{
            return i.map((j, jdx)=>{
                let img = new Image()
                img.src = `./src/resources/Sprites/Player/${idx}/${jdx}.png`
                return img
            })
        })
        this.currentAction = Player.IDLE
        this.animation = new Animation()
        this.animation.setFrames(this.sprites[this.currentAction])
        this.animation.setDelay(Player.ANIMEDELAY)
    }
   
    modeUp(){
        if(this.mode == Player.NORMALMODE){
            this.setFlyMode()
            this.shouldChangeAnimation = true
        }
        else if(this.mode == Player.LOWMODE){
            this.setNormalMode()
            this.y = this.y-13
            // this.shouldChangeAnimation = true
        }    
    }

    modeDown(){
        if(this.mode == Player.NORMALMODE){
            // this.shouldChangeAnimation = true
            this.setLowMode()
            this.y = this.y+11
        }
        else if(this.mode == Player.FLYMODE){
            this.setNormalMode()
            this.y = this.y-6
            // this.shouldChangeAnimation = true
        }
    }

    setNormalMode(){
        this.width = 32
        this.height = 40
        this.cwidth = 20
        this.cheight = 40
        this.moveSpeed = 1*0.5
        this.maxSpeed = 1
        this.stopSpeed = 2*0.7
        this.fallSpeed = 0.5*0.7*0.5
        this.maxFallSpeed = 9
        this.jumpStart = -10*0.85*.5
        this.stopJumpSpeed = 3*0.7*.05
        this.maxJumpTimes = 0
        this.canJumpMoreThenOnce = false
        this.mode = Player.NORMALMODE
    }
    setLowMode(){
        this.width = 35
        this.height = 20
        this.cwidth = 20
        this.cheight = 16
        this.moveSpeed = 0.3
        this.maxSpeed = 3
        this.stopSpeed = 0.5
        this.fallSpeed =  0.5
        this.maxFallSpeed = 9
        this.jumpStart = -9
        this.stopJumpSpeed = 0.5        
        this.maxJumpTimes = 2
        this.canJumpMoreThenOnce = true
        this.mode = Player.LOWMODE
    }
    setFlyMode(){
        this.width = 28
        this.height = 28
        this.cwidth = 20
        this.cheight = 32
        this.moveSpeed = 1*0.5*0.05
        this.maxSpeed = 10
        this.stopSpeed = 2*0.7*0.01
        this.fallSpeed = 0.2
        this.maxFallSpeed = 1
        this.jumpStart = -3
        this.stopJumpSpeed = 0
        this.maxJumpTimes = 9999
        this.canJumpMoreThenOnce = true
        this.mode = Player.FLYMODE
    }

    getNextPosition() {
		// movement
		if(this.left) {
			this.dx -= this.moveSpeed;
			if(this.dx < -this.maxSpeed) {
				this.dx = -this.maxSpeed;
			}
		}
		else if(this.right) {
			this.dx += this.moveSpeed;
			if(this.dx > this.maxSpeed) {
				this.dx = this.maxSpeed;
			}
		}
		else {
			if(this.dx > 0) {
				this.dx -= this.stopSpeed;
				if(this.dx < 0) {
					this.dx = 0;
				}
			}
			else if(this.dx < 0) {
				this.dx += this.stopSpeed;
				if(this.dx > 0) {
					this.dx = 0;
				}
			}
		}

        if(this.jumping && this.jumpCount < this.maxJumpTimes && this.canJump && (this.canJumpMoreThenOnce || !this.falling)){
            this.canJump = false
            this.jumpCount ++
			this.dy = this.jumpStart
			this.falling = true
		}


		if(this.falling) {
			
			if(this.dy > 0 && this.gliding) this.dy += this.fallSpeed * 0.1;
			else this.dy += this.fallSpeed;
			
			if(this.dy > 0) this.jumping = false;
			if(this.dy < 0 && !this.jumping) this.dy += this.stopJumpSpeed;
			
			if(this.dy > this.maxFallSpeed) this.dy = this.maxFallSpeed;
			
		}
		
	}

    update(){
        this.getNextPosition()
        
		this.checkTileMapCollision()
		this.setPosition(this.xtemp, this.ytemp)
        this.setMapPosition();
        this.doubleJumpValidation()
        this.checkAnimation()
    }

    checkAnimation(){

        // check attack has stopped
        if(this.shouldChangeAnimation){
            // console.log(this.mode)
            // this.animation.setFrames(this.sprites[this.mode])
            // this.shouldChangeAnimation = false;
        }
		if(this.currentAction == Player.FIRING) {
			if(this.animation.hasPlayedOnce()) this.firing = false;
		}

		if(this.currentAction != Player.DYING && this.dead){
				this.gameover = true;
		}

		else if(this.dy > 0) {
			if(this.currentAction != Player.FALLING) {
                this.currentAction = Player.FALLING;
                if(this.mode === Player.LOWMODE)
                    this.animation.setFrames(this.sprites[Player.IDLELOW])
                else if(this.mode === Player.NORMALMODE)
                    this.animation.setFrames(this.sprites[Player.IDLE])
                else if(this.mode === Player.FLYMODE)
                    this.animation.setFrames(this.sprites[Player.FALLINGFLY])
				
				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		else if(this.dy < 0) {
			if(this.currentAction != Player.JUMPING) {
				this.currentAction = Player.JUMPING;
                if(this.mode === Player.LOWMODE)
                    this.animation.setFrames(this.sprites[Player.WALKINGLOW])
                else if(this.mode === Player.NORMALMODE)
                    this.animation.setFrames(this.sprites[Player.IDLE])
                else if(this.mode === Player.FLYMODE)
                    this.animation.setFrames(this.sprites[Player.FALLINGFLY])

				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		else if(this.left || this.right) {
			if(this.currentAction != Player.WALKING) {
				this.currentAction = Player.WALKING
                if(this.mode === Player.LOWMODE)
                    this.animation.setFrames(this.sprites[Player.WALKINGLOW])
                else if(this.mode === Player.NORMALMODE)
                    this.animation.setFrames(this.sprites[Player.WALKING])
                else if(this.mode === Player.FLYMODE)
                    this.animation.setFrames(this.sprites[Player.FALLINGFLY])

				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		else {
			if(this.currentAction != Player.IDLE) {
				this.currentAction = Player.IDLE
                if(this.mode === Player.LOWMODE)
                    this.animation.setFrames(this.sprites[Player.IDLELOW])
                else if(this.mode === Player.NORMALMODE)
                    this.animation.setFrames(this.sprites[Player.IDLE])
                else if(this.mode === Player.FLYMODE)
                    this.animation.setFrames(this.sprites[Player.IDLEFLY])

				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		
		this.animation.update();
        		
		// set direction
		if(this.currentAction != Player.FIRING) {
			if(this.right) this.facingRight = true;
			if(this.left) this.facingRight = false;
		}
    }

    doubleJumpValidation(){
        if(!this.dy && !this.falling){
            this.canJump = true
            this.jumpCount = 0
        }
        
        

    }

    draw(context){
        if(this.facingRight) {
			context.drawImage(
				this.animation.getFrame(),
				(this.x + this.xmap - this.width / 2) | 0,
				(this.y + this.ymap - this.height / 2) | 0,
					this.width,
					this.height
			)
		}
		else {
            context.save()
            context.scale(-1, 1);      
            context.drawImage(
				this.animation.getFrame(),
                -(this.x + this.xmap - this.width / 2.0 + this.width) | 0,
                (this.y + this.ymap - this.height / 2.0) | 0, 
                this.width,
				this.height
			)
           context.restore()    
		}
    }
}


// Animation Options
Player.ANIMATIONNUM = 10

// Animation Length
Player.ANIMATIONLENGTH = 4
Player.ANIMEDELAY = 150

// Animations
Player.WALKING = 0
Player.IDLE = 1
Player.FALLING = 2
Player.JUMPING = 3
Player.FIRING = 4
Player.DYING = 5

// for low mode
Player.WALKINGLOW = 6
Player.IDLELOW = 7

// for flyingmode
Player.IDLEFLY = 8
Player.FALLINGFLY = 9


// Modes
Player.MODESNUM = 3

Player.FLYMODE = 2
Player.NORMALMODE = 1
Player.LOWMODE = 0

module.exports = Player



/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var MapObject = __webpack_require__(2)

class TextTip extends MapObject{
    constructor(tileMap, text, x, y){
        super(tileMap)
        this.text = text
        this.visible = true
        this.cwidth = 96
        this.cheight = 96
        this.setFont(19)
        this.color = "#000"
        this.setPosition(x, y)
    }

    update(){
        this.setMapPosition()
    }

    setFont(fontSize){
        this.fontSize = fontSize
        this.font = `${this.fontSize}px Delux`
    }

    draw(context){
        if(this.visible){
            this.text.forEach((i, idx)=>{
                context.beginPath()
                context.font = this.font
                context.fillStyle = this.color
                context.fillText(
                    i, 
                    this.xmap + this.x ,
                    this.ymap + this.y  + idx*this.fontSize*1.2 
                )
            })
        }
    }
}

module.exports = TextTip

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Background = __webpack_require__(7),
    TileMap = __webpack_require__(8),
    Player = __webpack_require__(14),
    TextTip = __webpack_require__(15),
    Tile = __webpack_require__(3),
    GameStateManager = __webpack_require__(6),
    Coin = __webpack_require__(12),
    LavaSurfaceEffect = __webpack_require__(13),
    HorDigger = __webpack_require__(4),
    VerDigger = __webpack_require__(11),
    GamePanel = __webpack_require__(0)


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
        GamePanel = __webpack_require__(0)
        GamePanel.FPS = 60
    }

    init(){
        this.background = new Background("./src/resources/Background/0.png")
        this.tileMap = new TileMap(32, Level1State.JSONMap)
        this.tileMap.setPosition(0,0)
        this.addExtraObects()
        this.respawnPlayer()
        
    }

    addExtraObects(){
        this.addExtraObjectsFromMapSpawns()
        this.addTextTips()
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
        Level1State.SPAWNLOCATION.push({x: 120, y: 60}) 
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
        
        
        Level1State.SPAWNLOCATION.push({x: 77, y: 500})
        this.textTips.push(new TextTip(this.tileMap, ['Holy,','What\'re','fu*ck'], 50, 800))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ["Holy, Seems Someone", 'made this trap for', 'you. What are bad people.', 'But remember.','Your are skilled mage', 'Use your','"transisfuncation"(Arrow Up)', 'to become a bit lighter','', 'Then', 'Use \'Space\''], 35, 520))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ["Nice feeling of flying", 'It\'s one of your mods.','Remember it.', 'Birdman is not very good','at turning', 'but speed and ','flying is awesome'], 230, 810))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['Nice form to grab', 'coins that\'s flying', 'You shoud pick all of', 'these coins for the','sake of your family.'], 389, 525))
        this.textTips[this.textTips.length-1].setFont(9)   
        this.textTips.push(...new Array(6).fill(new TextTip(this.tileMap, [], 0, 0)))

        
        Level1State.SPAWNLOCATION.push({x: 660, y: 800})
        this.textTips.push(new TextTip(this.tileMap, ['Should use','other form', 'ArrowDownX2'], 680, 840))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['Fast, double', 'jump and', 'little, but', 'cannot take coins.', 'So, unfortunatly.'], 1065, 750))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, [''], 950, 690))
        this.textTips[this.textTips.length-1].setFont(9)  
        this.textTips.push(new TextTip(this.tileMap, ['Use <C> key to slow time in small/fast mode'], 750, 565))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips.push(new TextTip(this.tileMap, ['Now, you are ready to earn some money. Good luck there.'], 750, 500))
        this.textTips[this.textTips.length-1].setFont(9)
        this.textTips[this.textTips.length-1].cheight = 30
        this.textTips.push(...new Array(8).fill(new TextTip(this.tileMap, [], 0, 0)))

        Level1State.SPAWNLOCATION.push({x: 1232, y: 630})



        Level1State.SPAWNLOCATION.push({x: 1504, y: 800})

        Level1State.SPAWNLOCATION.push({x: 2112, y: 890})

        Level1State.SPAWNLOCATION.push({x: 2112, y: 1090})

        Level1State.SPAWNLOCATION.push({x: 690, y: 416})

        Level1State.SPAWNLOCATION.push({x: 2400, y: 576})

        Level1State.SPAWNLOCATION.push({x: 2880, y: 640})
        Level1State.SPAWNLOCATION.push({x: 20*32*7 + 16, y: 20*32})
        Level1State.SPAWNLOCATION.push({x: 20*32*7 + 16, y: 20*32})
        Level1State.SPAWNLOCATION.push({x: 20*32*5 + 11*32, y: 9*32})
        



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
            if(i.intersects(that.player))
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
        }else if(key === 'KeyC'){
            GamePanel = __webpack_require__(0)
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
            GamePanel = __webpack_require__(0)
            GamePanel.FPS = 60
        }else if(key === 'ArrowDown'){
            this.player.modeDown()
        }else if(key === 'ArrowUp'){
            this.player.modeUp()
        } 
    }
    keyPress(key){
    }
}
Level1State.NUMOFSHOWNTIPS = 1
Level1State.SPAWNLOCATION = []
Level1State.JSONMap = {name : "New Project", tileSize : 32, tileSetTileCount : 256, tileSetImageUrl : "images/tile-game-1.png", brushTile : 12, airTile : 0, paletteShortcuts : [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250], levelArray : [{name : "Level 1", width : 182, height : 45, map : [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 12, 0, 0, 8, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 8, 0, 2, 2, 0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 8, 8, 0, 0, 8, 0, 8, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 10, 0, 0, 12, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 8, 2, 0, 0, 0, 12, 0, 0, 0, 0, 2, 8, 2, 0, 0, 2, 2, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 8, 0, 8, 0, 8, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 12, 0, 0, 0, 0, 0, 12, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 8, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 8, 8, 8, 8, 8, 0, 8, 0, 8, 0, 0, 8, 0, 8, 0, 8, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 8, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 2, 2, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 2, 8, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 12, 0, 0, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 8, 0, 8, 0, 0, 8, 8, 0, 0, 8, 0, 0, 8, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 8, 0, 8, 0, 8, 0, 0, 8, 0, 8, 0, 0, 8, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 2, 2, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 8, 0, 0, 8, 0, 8, 0, 0, 8, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 8, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2, 2, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 8, 0, 0, 8, 0, 8, 0, 0, 8, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 8, 6, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 8, 0, 0, 0, 8, 8, 0, 0, 0, 8, 8, 8, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 2, 2, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 12, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 8, 0, 8, 0, 8, 0, 8, 8, 8, 0, 8, 0, 8, 0, 8, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 4, 2, 2, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 6, 6, 0, 2, 2, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 14, 14, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 4, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 12, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 2, 2, 2, 4, 4, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 8, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 8, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 0, 0, 0, 14, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 2, 2, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 8, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 8, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 8, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 14, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2, 2, 4, 4, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 6, 6, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 8, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 12, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 8, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 8, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 14, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 14, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 2, 2, 4, 4, 4, 4, 4, 0, 8, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 8, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 8, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 8, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 14, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 6, 0, 0, 0, 0, 8, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 6, 4, 4, 0, 0, 0, 0, 0, 6, 6, 2, 2, 0, 0, 0, 2, 12, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 8, 0, 2, 2, 2, 8, 2, 2, 2, 8, 2, 2, 8, 2, 2, 2, 2, 0, 0, 0, 2, 2, 14, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 4, 4, 6, 6, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 4, 4, 0, 0, 0, 6, 6, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 12, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 8, 0, 2, 2, 0, 0, 0, 14, 0, 2, 0, 6, 6, 2, 6, 6, 2, 6, 6, 6, 6, 0, 0, 0, 0, 2, 2, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 4, 4, 4, 4, 6, 6, 6, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 4, 4, 4, 0, 0, 0, 6, 4, 4, 4, 4, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 14, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 8, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 4, 4, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 8, 0, 12, 0, 8, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 14, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 8, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8, 0, 2, 2, 2, 0, 0, 0, 0, 8, 0, 10, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 4, 4, 4, 6, 6, 0, 0, 0, 0, 0, 6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 6, 0, 0, 0, 6, 4, 4, 4, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 8, 0, 0, 8, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 8, 0, 2, 0, 8, 0, 0, 2, 2, 0, 0, 0, 2, 2, 6, 0, 6, 0, 0, 2, 6, 6, 6, 6, 2, 0, 6, 6, 6, 6, 6, 6, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 6, 6, 6, 6, 6, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 2, 2, 2, 0, 0, 0, 0, 2, 0, 8, 12, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 10, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 0, 0, 0, 4, 4, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 14, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 0, 0, 8, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 4, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 0, 8, 0, 4, 4, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 0, 0, 0, 4, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 14, 2, 2, 2, 2, 2, 14, 2, 2, 2, 2, 2, 2, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 0, 0, 0, 4, 4, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 8, 2, 2, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 0, 0, 0, 4, 4, 4, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 0, 0, 0, 0, 0, 4, 4, 4, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 8, 2, 0, 0, 2, 2, 0, 0, 8, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 8, 0, 0, 0, 0, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 2, 2, 2, 2, 0, 8, 0, 8, 0, 2, 2, 0, 8, 8, 0, 2, 2, 0, 8, 0, 8, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 4, 0, 0, 0, 6, 6, 0, 0, 0, 0, 4, 4, 2, 2, 2, 10, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 0, 0, 8, 0, 4, 4, 0, 0, 0, 0, 4, 4, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 10, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 8, 8, 12, 0, 8, 8, 0, 0, 8, 8, 0, 0, 8, 8, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 2, 2, 4, 0, 0, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 0, 0, 0, 0, 4, 4, 0, 0, 8, 0, 4, 4, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 10, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 4, 4, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 14, 0, 0, 0, 8, 0, 8, 0, 0, 8, 0, 0, 8, 0, 0, 8, 0, 8, 0, 0, 2, 2, 4, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 6, 6, 6, 6, 6, 6, 0, 0, 6, 6, 4, 4, 2, 0, 2, 0, 8, 0, 8, 0, 2, 2, 0, 8, 8, 0, 2, 2, 0, 8, 0, 8, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 10, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 4, 4, 2, 2, 0, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 0, 0, 6, 6, 6, 0, 6, 6, 0, 0, 6, 6, 0, 6, 6, 6, 0, 0, 2, 2, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 4, 4, 2, 2, 4, 4, 2, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]}
module.exports = Level1State

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Background = __webpack_require__(7)

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
    }

    keyUp(key){
        
    }
    keyPress(key){
        
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

module.exports = MenuState

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {




class Game{
    constructor(){
        let GamePanel = __webpack_require__(0)
        this.gamePanel = new GamePanel()
        this.gamePanel.setContentPanel()
    }    

    run(){
        this.gamePanel.run()
    }
}

Game.Some = 'qwezxc'

module.exports = Game


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(10);
module.exports = __webpack_require__(9);


/***/ })
/******/ ]);