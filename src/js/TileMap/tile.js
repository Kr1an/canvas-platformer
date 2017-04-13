class Tile{
    constructor(imgPath, type){
        this.img = new Image()
        this.img.src = imgPath
        this.type = type
    }
}
Tile.NUMOFTYPES = 15

Tile.NORMAL = 0
Tile.BLOCKED = 2
Tile.KILLING = 4
Tile.SAVING = 3
Tile.OTHER = 1
Tile.COINSPAWN = 8
Tile.LAVASURFACEEFFECT = 6
Tile.HORDIGGERSPAWN = 10
Tile.VERDIGGERSPAWN = 12
Tile.LOCKER = 14

module.exports = Tile
