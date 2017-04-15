var TileMap = require('../TileMap/tileMap.js'),
    Animation = require('./animation.js'),
    Tile = require('../TileMap/tile.js'),
    GamePanel = require('../Main/gamePanel.js')

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
		
	 	this.topLeft = tl == Tile.BLOCKED || tl == Tile.LOCKER;
		this.topRight = tr == Tile.BLOCKED || tr == Tile.LOCKER;
		this.bottomLeft = bl == Tile.BLOCKED || bl == Tile.LOCKER;
		this.bottomRight = br == Tile.BLOCKED || br == Tile.LOCKER;

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