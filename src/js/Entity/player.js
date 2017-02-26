class Player extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.width = 32
        this.height = 32
        this.cwidth = 32
        this.cheight = 32
        this.moveSpeed = .5
        this.maxSpeed = 2.5
        this.stopSpeed = 0.5
        this.fallSpeed = 0.2
        this.maxFallSpeed = 4
        this.jumpStart = -7
        this.stopJumpSpeed = 2
        this.jumpCount = 0
        this.canJump = true
        this.maxJumpTimes = 2

        let img = new Image()
        img.src = './src/resources/Sprites/Player/Player-1.png'
        this.animation = new Animation([img], 100)

        this.facingRight = true
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
		




		if(this.jumping && this.jumpCount < this.maxJumpTimes && this.canJump){
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
        this.doubleJumpValidation()
    }

    doubleJumpValidation(){
        if(!this.dy && !this.falling){
            this.canJump = true
            this.jumpCount = 0
        }
        
        

    }

    draw(context) {
		
		this.setMapPosition();
				
		super.draw(context);
	}
}
