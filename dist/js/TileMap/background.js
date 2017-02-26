'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = function () {
    function Background(imgPath, color) {
        _classCallCheck(this, Background);

        this.isImage = typeof imgPath !== 'undefined';
        this.isPlaneColor = typeof color !== 'undefined';
        if (this.isImage) {
            this.img = null;
            this.isImageLoaded = false;
            this.loadImage(imgPath);
        } else if (this.isPlaneColor) {
            this.color = color;
        }
    }

    _createClass(Background, [{
        key: 'loadImage',
        value: function loadImage(imgPath) {
            var that = this;
            this.img = new Image();
            this.img.onload = function () {
                that.isImageLoaded = true;
            };
            this.img.src = imgPath;
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'draw',
        value: function draw(context) {
            if (this.isImage) {
                context.beginPath();
                context.drawImage(this.img, 0, 0, GamePanel.WIDTH, GamePanel.HEIGHT);
            } else if (this.isPlaneColor) {
                context.beginPath();
                context.fillStyle = this.color;
                context.fillRect(0, 0, GamePanel.WIDTH, GamePanel.HEIGHT);
            }
        }
    }]);

    return Background;
}();