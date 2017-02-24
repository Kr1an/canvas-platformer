
class Game{
    constructor(){
        this.gamePanel = new GamePanel()
        this.gamePanel.setContentPanel()
    }    

    run(){
        this.gamePanel.run()
    }
}
