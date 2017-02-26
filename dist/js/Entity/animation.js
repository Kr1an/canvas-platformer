"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation(frames, delay) {
        _classCallCheck(this, Animation);

        this.frames = frames;
        this.delay = delay;
        this.currentFrame = 0;
        this.startTime = Date.now();
        this.playedOnce = false;
    }

    _createClass(Animation, [{
        key: "update",
        value: function update() {
            if (this.delay == -1) return;

            var elapsed = Date.now() - this.startTime;
            if (elapsed > this.delay) {
                this.currentFrame++;
            }
            if (this.currentFrame >= this.frames.length) {
                this.currentFrame = 0;
                this.playedOnce = true;
            }
        }
    }, {
        key: "getFrame",
        value: function getFrame() {
            return this.frames[this.currentFrame];
        }
    }]);

    return Animation;
}();