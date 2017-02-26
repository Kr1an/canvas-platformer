class Player extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.setNormalMode();
        this.canJump = true
        this.jumpCount = 0

        let img = new Image()
        img.src = './src/resources/Sprites/Player/Player-1.png'
        this.animation = new Animation([img], 100)

        this.facingRight = true
    }
    setNormalMode(){
        this.width = 32
        this.height = 40
        this.cwidth = 32
        this.cheight = 40
        this.moveSpeed = 1*0.5
        this.maxSpeed = 5*0.5
        this.stopSpeed = 2*0.7
        this.fallSpeed = 0.5*0.7
        this.maxFallSpeed = 9
        this.jumpStart = -10*0.85
        this.stopJumpSpeed = 3*0.7
        this.maxJumpTimes = 1
        this.canJumpMoreThenOnce = false
    }
    setLowMode(){
        this.width = 32
        this.height = 16
        this.cwidth = 32
        this.cheight = 16
        this.moveSpeed = .005
        this.maxSpeed = 5
        this.stopSpeed = 0.05
        this.fallSpeed =  1
        this.maxFallSpeed = 9
        this.jumpStart = -7
        this.stopJumpSpeed = 3        
        this.maxJumpTimes = 0
        this.canJumpMoreThenOnce = false

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
