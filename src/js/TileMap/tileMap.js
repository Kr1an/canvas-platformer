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
            }else if(idx === Tile.BLOCKED || true){
                return new Tile("./src/resources/Sprites/Tiles/Tile-blocked-1.png", Tile.BLOCKED)
            }

        })
        

    }

    loadMap(mapTxt){
        this.map = mapTxt.map((i, idx)=>{
            return i.split(' ').filter((x)=>x!=='').map((x)=>+x)
        })
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
        this.x = x
        this.y = y

        this.colOffset = Math.round(this.x / this.tileSize)
        this.rowOffset = Math.round(this.y / this.tileSize)
    }

    draw(context){
        for(let row = this.rowOffset; row < this.rowOffset + this.numRowsToDraw; row++){
            if(row >= this.numRows) break
            for(let col = this.colOffset; col < this.colOffset + this.numColsToDraw; col++){
                if(col >= this.numCols) break
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

