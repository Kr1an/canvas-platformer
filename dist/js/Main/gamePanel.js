'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GamePanel = function () {
    function GamePanel() {
        _classCallCheck(this, GamePanel);

        this.panel = null;
        this.context = null;
        this.targetTime = 1000 / GamePanel.FPS;

        this.gsm = new GameStateManager();
        this.setContentPanel();
        this.setKeyListeners();
        console.log(this.panel);
        console.log(this.context);
    }

    _createClass(GamePanel, [{
        key: 'update',
        value: function update() {
            this.gsm.update();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.gsm.draw(this.context);
        }
    }, {
        key: 'drawToScreen',
        value: function drawToScreen() {
            // console.log("drawToScreen")
            // update screen if needed
        }
    }, {
        key: 'setContentPanel',
        value: function setContentPanel() {
            this.panel = document.getElementById("canvas");
            this.context = this.panel.getContext('2d');
            this.panel.width = GamePanel.WIDTH;
            this.panel.height = GamePanel.HEIGHT;
        }
    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            var that = this;
            var mainLoop = setInterval(function () {
                if (!_this.gsm.running) {

                    clearInterval(mainLoop);
                    _this.onExit();
                    return;
                }
                that.update();
                that.draw();
                that.drawToScreen();
            }, that.targetTime * 0.5);
        }
    }, {
        key: 'setKeyListeners',
        value: function setKeyListeners() {
            var that = this;
            this.foo = function (e) {
                that.keyDown(e.code);
            };
            window.addEventListener('keydown', that.foo);
        }
    }, {
        key: 'keyDown',
        value: function keyDown(key) {
            this.gsm.keyDown(key);
        }
    }, {
        key: 'onExit',
        value: function onExit() {
            document.getElementById('canvas').remove();
            document.removeEventListener('keydown', this.foo, false);
        }
    }]);

    return GamePanel;
}();

GamePanel.WIDTH = 640;
GamePanel.HEIGHT = 480;
GamePanel.FPS = 60;