'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_MapObject) {
	_inherits(Player, _MapObject);

	function Player(tileMap) {
		_classCallCheck(this, Player);

		var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, tileMap));

		_this.width = 32;
		_this.height = 32;
		_this.cwidth = 32;
		_this.cheight = 32;
		_this.moveSpeed = 1;
		_this.maxSpeed = 2;
		_this.stopSpeed = 0.5;
		_this.fallSpeed = 0.2;
		_this.maxFallSpeed = 4;
		_this.jumpStart = -4.8;
		_this.stopJumpSpeed = 0.3;

		var img = new Image();
		img.src = './src/resources/Sprites/Player/Player-1.png';
		_this.animation = new Animation([img], 100);

		_this.facingRight = true;
		return _this;
	}

	_createClass(Player, [{
		key: 'getNextPosition',
		value: function getNextPosition() {
			// movement
			if (this.left) {
				this.dx -= this.moveSpeed;
				if (this.dx < -this.maxSpeed) {
					this.dx = -this.maxSpeed;
				}
			} else if (this.right) {
				this.dx += this.moveSpeed;
				if (this.dx > this.maxSpeed) {
					this.dx = this.maxSpeed;
				}
			} else {
				if (this.dx > 0) {
					this.dx -= this.stopSpeed;
					if (this.dx < 0) {
						this.dx = 0;
					}
				} else if (this.dx < 0) {
					this.dx += this.stopSpeed;
					if (this.dx > 0) {
						thsi.dx = 0;
					}
				}
			}

			if (this.jumping) {
				this.dy = this.jumpStart;
				this.falling = true;
			}

			if (this.falling) {

				if (this.dy > 0 && this.gliding) this.dy += this.fallSpeed * 0.1;else this.dy += this.fallSpeed;

				if (this.dy > 0) this.jumping = false;
				if (this.dy < 0 && !this.jumping) this.dy += this.stopJumpSpeed;

				if (this.dy > this.maxFallSpeed) this.dy = this.maxFallSpeed;
			}
			this.setPosition();
		}
	}, {
		key: 'update',
		value: function update() {
			this.getNextPosition();
			this.checkTileMapCollision();
			this.setPosition(this.xtemp, this.ytemp);
		}
	}, {
		key: 'draw',
		value: function draw(context) {

			this.setMapPosition();

			_get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'draw', this).call(this, g);
		}
	}]);

	return Player;
}(MapObject);