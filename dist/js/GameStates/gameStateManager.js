"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameStateManager = function () {
    function GameStateManager() {
        _classCallCheck(this, GameStateManager);

        this.NUMGAMESTATES = 4;
        this.MENUSTATE = 0;
        this.LEVEL1STATE = 1;
        this.HELPSTATE = 2;
        this.EXITSTATE = 3;

        this.running = true;

        this.gameStates = new Array(this.NUMGAMESTATES);
        this.currentState = this.MENUSTATE;
        this.loadState(this.MENUSTATE);
    }

    _createClass(GameStateManager, [{
        key: "loadState",
        value: function loadState(state) {
            if (state === this.MENUSTATE) {
                this.gameStates[this.currentState] = new MenuState(this);
            } else if (state === this.LEVEL1STATE) {
                this.gameStates[this.currentState] = new Level1State(this);
            } else if (state === this.HELPSTATE) {} else if (state === this.EXITSTATE) {
                this.running = false;
            }
        }
    }, {
        key: "unloadState",
        value: function unloadState(state) {
            delete this.gameStates[state];
        }
    }, {
        key: "setState",
        value: function setState(state) {
            this.unloadState(this.currentState);
            this.currentState = state;
            this.loadState(this.currentState);
        }
    }, {
        key: "update",
        value: function update(context) {
            this.gameStates[this.currentState].update();
        }
    }, {
        key: "draw",
        value: function draw(context) {
            this.gameStates[this.currentState].draw(context);
        }
    }, {
        key: "keyDown",
        value: function keyDown(key) {
            this.gameStates[this.currentState].keyDown(key);
        }
    }]);

    return GameStateManager;
}();