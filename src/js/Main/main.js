


class Game{
    constructor(){
        let GamePanel = require('./gamePanel.js')
        this.gamePanel = new GamePanel()
        this.gamePanel.setContentPanel()
    }    

    run(){
        this.gamePanel.run()
    }
}

Game.Some = 'qwezxc'

module.exports = Game
