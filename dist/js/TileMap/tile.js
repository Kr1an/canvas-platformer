"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile(imgPath, type) {
    _classCallCheck(this, Tile);

    this.img = new Image();
    this.img.src = imgPath;
    this.type = type;
};

Tile.NORMAL = 0;
Tile.BLOCKED = 1;
Tile.KILLING = 2;
Tile.SAVING = 3;
Tile.OTHER = 4;
Tile.NUMOFTYPES = 5;