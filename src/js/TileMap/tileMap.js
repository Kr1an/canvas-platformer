class TileMap{
    constructor(tileSize, mapTxt){
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
        this.tiles = new Array(Tile.NUMOFTYPES).fill(null).map((i, idx)=>{
            if(idx === Tile.NORMAL){
                return new Tile('./src/resources/Sprites/Tiles/Tile-normal-1.png', Tile.NORMAL)
            }else if(idx === Tile.KILLING){
                return new Tile("./src/resources/Sprites/Tiles/Tile-killing-1.png", Tile.KILLING)
            }else if(idx === Tile.BLOCKED){
                return new Tile("./src/resources/Sprites/Tiles/Tile-blocked-1.png", Tile.BLOCKED)
            }else{
                return new Tile('./src/resources/Sprites/Tiles/Tile-normal-1.png', idx)
            }

        })
        

    }

    loadMap(mapJSON){

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

