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
