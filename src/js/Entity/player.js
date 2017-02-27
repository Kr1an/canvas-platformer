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

       
        this.loadSprites()

        this.facingRight = true
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

    setNormalMode(){
        this.width = 25
        this.height = 40
        this.cwidth = 25
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
        this.width = 28
        this.height = 16
        this.cwidth = 28
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
        this.checkAnimation()
    }

    checkAnimation(){

        // check attack has stopped
		if(this.currentAction == Player.FIRING) {
			if(this.animation.hasPlayedOnce()) this.firing = false;
		}

		if(this.currentAction != Player.DYING && this.dead){
				this.gameover = true;
		}

        // set animation
		else if(this.firing) {
			if(this.currentAction != Player.FIRING) {
				this.currentAction = Player.FIRING;
                this.animation.setFrames(this.sprites[Player.FIRING]);
				this.animation.setDelay(5);
			}
		}
		else if(this.dy > 0) {
			if(this.currentAction != Player.FALLING) {
				this.currentAction = Player.FALLING;
                this.animation.setFrames(this.sprites[Player.FALLING]);
				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		else if(this.dy < 0) {
			if(this.currentAction != Player.JUMPING) {
				this.currentAction = Player.JUMPING;
                this.animation.setFrames(this.sprites[Player.FALLING]);
				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		else if(this.left || this.right) {
			if(this.currentAction != Player.WALKING) {
				this.currentAction = Player.WALKING;
                this.animation.setFrames(this.sprites[Player.WALKING]);
				this.animation.setDelay(Player.ANIMEDELAY);
			}
		}
		else {
			if(this.currentAction != Player.IDLE) {
				this.currentAction = Player.IDLE;
                this.animation.setFrames(this.sprites[Player.IDLE]);
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

    draw(context) {
		
		this.setMapPosition();
				
		super.draw(context);
	}
}


// Animation Options
Player.ANIMATIONNUM = 6

// Animation Length
Player.ANIMATIONLENGTH = 4
Player.ANIMEDELAY = 100

// Animations
Player.WALKING = 0
Player.IDLE = 1
Player.FALLING = 2
Player.JUMPING = 3
Player.FIRING = 4
Player.DYING = 5



