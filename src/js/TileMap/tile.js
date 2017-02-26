class Tile{
    constructor(imgPath, type){
        this.img = new Image()
        this.img.src = imgPath
        this.type = type
    }
}

Tile.NORMAL = 0;
Tile.BLOCKED = 2;
Tile.KILLING = 1;
Tile.SAVING = 3;
Tile.OTHER = 4;
Tile.COINSPAWN = 8
Tile.NUMOFTYPES = 10
