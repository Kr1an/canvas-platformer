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
                context.fillText(i, this.xmap + this.x ,this.ymap + this.y  + idx*this.fontSize*1.2 )
            })
        }
    }
}
