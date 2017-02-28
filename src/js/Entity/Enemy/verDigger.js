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
