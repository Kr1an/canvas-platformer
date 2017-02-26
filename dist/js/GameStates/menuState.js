'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuState = function () {
    function MenuState(gsm) {
        _classCallCheck(this, MenuState);

        this.background = new Background(undefined, "#000");
        this.currentChoice = 0;
        this.options = ['Play', 'Help', 'Exit'];
        this.gsm = gsm;
    }

    _createClass(MenuState, [{
        key: 'update',
        value: function update() {}
    }, {
        key: 'draw',
        value: function draw(context) {
            var _this = this;

            context.beginPath();
            this.background.draw(context);

            this.options.forEach(function (i, idx) {
                context.beginPath();
                context.lineWidth = 5;
                context.font = '30px Delux';
                context.fillStyle = _this.currentChoice === idx ? "#AA0000" : "#FFF";
                context.fillText(i, 255, 180 + idx * 65);
            });
        }
    }, {
        key: 'keyDown',
        value: function keyDown(key) {
            if (key === 'ArrowUp') {
                this.currentChoice--;
                if (this.currentChoice === -1) this.currentChoice = this.options.length - 1;
            } else if (key === 'ArrowDown') {
                this.currentChoice++;
                if (this.currentChoice === this.options.length) this.currentChoice = 0;
            } else if (key === 'Enter') {
                this.select();
            }
            console.log(this.currentChoice);
        }
    }, {
        key: 'select',
        value: function select() {
            if (this.currentChoice === 0) {
                this.gsm.setState(this.gsm.LEVEL1STATE);
            } else if (this.currentChoice === 1) {
                this.gsm.setState(this.gsm.HELPSTATE);
            } else if (this.currentChoice === 2) {
                this.gsm.setState(this.gsm.EXITSTATE);
            }
        }
    }]);

    return MenuState;
}();