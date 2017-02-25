class Tile{
    constructor(imgPath, type){
        this.img = new Image()
        this.img.src = imgPath
        this.type = type
    }
}

Tile.NORMAL = 0;
Tile.BLOCKED = 1;
Tile.KILLING = 2;
Tile.SAVING = 3;
Tile.OTHER = 4;
Tile.NUMOFTYPES = 5
