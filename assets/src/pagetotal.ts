const { ccclass, property } = cc._decorator;

import game = require('./btcontrol')

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    bg: cc.Node
    @property(cc.Sprite)
    imgf: cc.Sprite
    @property(cc.Sprite)
    imgt: cc.Sprite

    @property(cc.Node)
    totalview: cc.Node
    @property(cc.Prefab)
    totalbar: cc.Prefab
    @property(cc.Node)
    drawnode: cc.Node
    @property(cc.Graphics)
    draw: cc.Graphics

    private gameimport: string = ""
    private gamedata = []
    private bararr: Array<cc.Node> = []
    private lenarr = []
    private canvassize:boolean = true

    Xmlrequest(self) {
        let xhr = cc.loader.getXMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status >= 200 && this.status < 400)) {
                // func(self,this)
                // cc.log(this.responseText)
                self.gamedata = JSON.parse(this.responseText)
            }
        };
        let url = "http://localhost/lott/outputtotal.php?game=" + this.gameimport
        // let url = "http://172.20.10.2/lott/outputtotal.php?game=" + this.gameimport
        // let url = "http://172.20.10.12/lott/outputtotal.php?game=" + this.gameimport
       
        xhr.open("GET", url, true)
        xhr.send()
    }
    onLoad() {
        // init logic
        this.imgt.spriteFrame = this.imgf.spriteFrame
        // this.bar1.progress = 1
        if (game.game.gametype[0] == true) { //圖示
            this.gameimport = "superlotto638"
        } else if (game.game.gametype[1] == true) {
            this.gameimport = "Lotto649"
        } else if (game.game.gametype[2] == true) {
            this.gameimport = "Lotto740"
        } else if (game.game.gametype[3] == true || game.game.gametype[8] == true) {
            this.gameimport = "DailyCash"
        } else if (game.game.gametype[5] == true) {
            this.gameimport = "3D"
        } else if (game.game.gametype[6] == true) {
            this.gameimport = "4D"
        } else if (game.game.gametype[7] == true) {
            this.gameimport = "superlotto638"
        } else if (game.game.gametype[9] == true) {
            this.gameimport = "Lotto649"
        }
        this.Xmlrequest(this)

        this.scheduleOnce(function () {
            this.showtotalview()
        }, 1)

        this.drawnode.active = false
    }
    showtotalview() {
        //統計期數
        cc.log(this.gamedata)
        let allcount: number = 100
        for (let i = 0; i < game.game.numb; i++) {
            let bar = cc.instantiate(this.totalbar)
            this.totalview.addChild(bar)
            this.bararr[i] = bar;
            let bn = bar.getComponent('totalcontrol')
            //bar number
            let ballcount: number
            if (game.game.gametype[5] == true || game.game.gametype[6] == true) {
                bn.ballnumber.string = i
                ballcount = this.gamedata[0][i]
            } else if (game.game.gametype[1] || game.game.gametype[2]) {
                bn.ballnumber.string = i + 1
                ballcount = this.gamedata[0][i + 1] + this.gamedata[1][i + 1]
            } else {
                bn.ballnumber.string = i + 1
                ballcount = this.gamedata[0][i + 1]
            }
            bn.total.progress = ballcount / allcount
            

            bn.setposition()
            bn.totalnumber.string = ballcount

            if (game.game.gametype[5] == true || game.game.gametype[6] == true ){
                this.lenarr[i] = ballcount / allcount * 1000
            }else{
                this.lenarr[i] = ballcount / allcount * 2000
            }
            if (i == 0) {
                this.draw.moveTo(20 + i * 35, this.lenarr[i])
            } else {
                this.draw.moveTo(20 + (i - 1) * 35, this.lenarr[i - 1])
                this.draw.lineTo(20 + i * 35, this.lenarr[i])
            }

        }
        if (game.game.gametype[0] == true) {
            for (let i = 1; i < 9; i++) {
                let bar = cc.instantiate(this.totalbar)
                this.totalview.addChild(bar)
                this.bararr[i] = bar;
                let bn = bar.getComponent('totalcontrol')
                //bar number
                let ballcount: number
                bn.ballnumber.string = i
                ballcount = this.gamedata[1][i]
                bn.total.progress = ballcount / allcount
                this.lenarr[i] = ballcount / allcount * 2000

                bn.setposition()
                bn.totalnumber.string = ballcount

                bn.bar.color = new cc.Color(255, 0, 0)

                if (i == 1) {
                    this.draw.moveTo(20 + (i + game.game.numb - 1) * 35, this.lenarr[i])
                } else {
                    this.draw.moveTo(20 + (i + game.game.numb - 2) * 35, this.lenarr[i - 1])
                    this.draw.lineTo(20 + (i + game.game.numb - 1) * 35, this.lenarr[i])
                }

            }
        }
        this.draw.stroke()

    }
    hidepagetotal() {
        if(this.canvassize){
            let mov = cc.moveBy(0.5, cc.p(900, 0))
            this.bg.runAction(mov)
        }else {
            let mov = cc.moveBy(0.5, cc.p(0, -900))
            this.bg.runAction(mov)
        }
        // let mov = cc.moveBy(0.5, 900, 0)
        // this.bg.runAction(mov)
    }
    turnonoff() {

        if (this.drawnode.active) {
            this.drawnode.active = false
            this.totalview.runAction(cc.moveBy(0, cc.p(10, 0)))
        } else {
            this.drawnode.active = true
            this.totalview.runAction(cc.moveBy(0, cc.p(-10, 0)))
        }
    }
    update() {
        if(this.imgt.node.x == 0){
            this.canvassize = true
        }else if(this.imgt.node.x == -500){
            this.canvassize = false
        }
    }
}
