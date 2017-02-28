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
