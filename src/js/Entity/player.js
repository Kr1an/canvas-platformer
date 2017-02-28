class Player extends MapObject{
    constructor(tileMap){
        super(tileMap)
        this.setFlyMode();
        this.canJump = true
        this.jumpCount = 0
        this.firing = false
        this.sprites = null
        this.currentAction = -1
        this.gameover = false
        this.dead = false
        this.health = 1

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
        if(this.mode == Player.NORMALMODE && !this.jumping && !this.falling)
            this.setFlyMode()
        else if(this.mode == Player.LOWMODE && !this.jumping && !this.falling){
            this.setNormalMode()
            this.y = this.y-15
        }    
    }

    modeDown(){
        if(this.mode == Player.NORMALMODE && !this.jumping && !this.falling)
            this.setLowMode()
        else if(this.mode == Player.FLYMODE && !this.jumping && !this.falling){
            this.setNormalMode()
            this.y = this.y-15
        }
    }

    setNormalMode(){
        this.width = 32
        this.height = 40
        this.cwidth = 32
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
        this.width = 28
        this.height = 16
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
        this.cwidth = 32
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



