"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapObject = function () {
	function MapObject(tileMap) {
		_classCallCheck(this, MapObject);

		this.tileMap = tileMap;
		this.tileSize = tileMap.tileSize;
		this.xmap = 0;
		this.ymap = 0;

		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
		this.width = 0;
		this.height = 0;

		this.cwidth = 0;
		this.cheight = 0;

		this.curRow = 0;
		this.curCol = 0;
		this.xdest = 0;
		this.ydest = 0;
		this.xtemp = 0;
		this.ytemp = 0;

		this.topLeft = false;
		this.topRight = false;
		this.bottomLeft = false;
		this.bottomRight = false;

		this.animation = null;
		this.currentAction = 0;
		this.previousAction = 0;
		this.facingRight = true;

		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
		this.jumping = false;
		this.falling = false;

		this.moveSpeed = 0;
		this.maxSpeed = 0;
		this.stopSpeed = 0;
		this.fallSpeed = 0;
		this.maxFallSpeed = 0;
		this.jumpStart = 0;
		this.stopJumpSpeed = 0;
	}

	_createClass(MapObject, [{
		key: "intersects",
		value: function intersects(other) {
			this.getRect().intersects(other.getRect());
		}
	}, {
		key: "getRect",
		value: function getRect() {
			return new Rect(this.x, this.y, this.cwidth, this.cheight);
		}
	}, {
		key: "calculateCorners",
		value: function calculateCorners(x, y) {
			var leftTile = (x - this.cwidth / 2) / this.tileSize;
			var rightTile = (x + this.cwidth / 2 - 1) / this.tileSize;
			var topTile = (y - this.cheight / 2) / this.tileSize;
			var bottomTile = (y + this.cheight / 2 - 1) / this.tileSize;

			var tl = this.tileMap[(topTile, leftTile)].type;
			var tr = this.tileMap[(topTile, rightTile)].type;
			var bl = this.tileMap[(bottomTile, leftTile)].type;
			var br = this.tileMap[(bottomTile, rightTile)].type;

			this.topLeft = tl == Tile.BLOCKED;
			this.topRight = tr == Tile.BLOCKED;
			this.bottomLeft = bl == Tile.BLOCKED;
			this.bottomRight = br == Tile.BLOCKED;
		}
	}, {
		key: "checkTileMapCollision",
		value: function checkTileMapCollision() {

			this.currCol = (this.x | 0) / tileSize;
			this.currRow = (this.y | 0) / tileSize;

			this.xdest = this.x + this.dx;
			this.ydest = this.y + this.dy;

			this.xtemp = x;
			this.ytemp = y;

			this.calculateCorners(this.x, this.ydest);
			if (this.dy < 0) {
				if (this.topLeft || this.topRight) {
					this.dy = 0;
					this.ytemp = this.currRow * this.tileSize + this.cheight / 2;
				} else {
					this.ytemp += this.dy;
				}
			}
			if (dy > 0) {
				if (this.bottomLeft || this.bottomRight) {
					this.dy = 0;
					this.falling = false;
					this.ytemp = (this.currRow + 1) * this.tileSize - this.cheight / 2;
				} else {
					this.ytemp += this.dy;
				}
			}

			calculateCorners(this.xdest, this.y);
			if (this.dx < 0) {
				if (this.topLeft || this.bottomLeft) {
					this.dx = 0;
					this.xtemp = this.currCol * this.tileSize + this.cwidth / 2;
				} else {
					this.xtemp += this.dx;
				}
			}
			if (this.dx > 0) {
				if (this.topRight || tshi.bottomRight) {
					this.dx = 0;
					this.xtemp = (this.currCol + 1) * this.tileSize - this.cwidth / 2;
				} else {
					this.xtemp += this.dx;
				}
			}

			if (!this.falling) {
				calculateCorners(this.x, this.ydest + 1);
				if (!this.bottomLeft && !this.bottomRight) {
					this.falling = true;
				}
			}
		}
	}, {
		key: "setPosition",
		value: function setPosition(x, y) {
			this.x = x;
			this.y = y;
		}
	}, {
		key: "setVector",
		value: function setVector(dx, dy) {
			this.dx = dx;
			this.dy = dy;
		}
	}, {
		key: "setMapPosition",
		value: function setMapPosition() {
			this.xmap = this.tileMap.x;
			this.ymap = this.tileMap.y;
		}
	}, {
		key: "notOnScreen",
		value: function notOnScreen() {
			return this.x + this.xmap + this.width < 0 || this.x + this.xmap - this.width > GamePanel.WIDTH || this.y + this.ymap + this.height < 0 || this.y + this.ymap - this.height > GamePanel.HEIGHT;
		}
	}, {
		key: "draw",
		value: function draw(context) {
			if (this.facingRight) {
				context.drawImage(this.animation.getFrame(), this.x + this.xmap - this.width / 2 | 0, this.y + this.ymap - this.height / 2 | 0, this.width, this.height);
			} else {
				context.drawImage(this.animation.getFrame(), this.x + this.xmap - this.width / 2.0 + width | 0, this.y + this.ymap - this.height / 2.0 | 0, -this.width, this.height);
			}
		}
	}]);

	return MapObject;
}();

var Rect = function () {
	function Rect(x, y, cwidth, cheight) {
		_classCallCheck(this, Rect);

		this.x = x | 0 - cwidth;
		this.y = y | 0 - cheight;
		this.width = cwidth;
		this.height = cheight;
	}

	_createClass(Rect, [{
		key: "intersects",
		value: function intersects(other) {
			if (other.x < this.x + this.width && this.x < other.x + other.width && other.y < this.y + this.height) return this.y < other.y + other.height;else return false;
		}
	}]);

	return Rect;
}();