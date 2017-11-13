const { ccclass, property } = cc._decorator;

import game = require('./btcontrol')

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    page2: cc.Node = undefined


    @property(cc.Sprite)
    img: cc.Sprite = undefined
    @property(cc.SpriteFrame)
    pow: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    lot: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    luck: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    ftn: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    star3: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    star4: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    te: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    tn: cc.SpriteFrame = undefined
    @property(cc.SpriteFrame)
    fn: cc.SpriteFrame = undefined


    @property(cc.Node)
    scrollview: cc.Node = undefined
    @property(cc.Node)
    pagecheck: cc.Node = undefined
    @property(cc.Node)
    pageselect: cc.Node = undefined
    @property(cc.Node)
    pagetotal: cc.Node = undefined

    @property(cc.Button)
    backindex: cc.Button = undefined
    @property(cc.Button)
    select: cc.Button = undefined
    @property(cc.Button)
    total: cc.Button = undefined
    @property(cc.Button)
    check: cc.Button = undefined

    @property(cc.Prefab)
    prefabpow: cc.Prefab = undefined
    @property(cc.Prefab)
    prefablot: cc.Prefab = undefined
    @property(cc.Prefab)
    prefabluck: cc.Prefab = undefined
    @property(cc.Prefab)
    prefab539: cc.Prefab = undefined
    @property(cc.Prefab)
    prefab3star: cc.Prefab = undefined
    @property(cc.Prefab)
    prefab4star: cc.Prefab = undefined
    @property(cc.Prefab)
    prefab38: cc.Prefab = undefined
    @property(cc.Prefab)
    prefab49: cc.Prefab = undefined

    @property(cc.EditBox)
    insertnumber: cc.EditBox = undefined


    private scrcount: number = 0
    private cellarr: Array<cc.Node> = []
    private totalcount: number = 1500
    private gamename: string = ""
    private showcount: number = 0
    private gameimport: string = ""
    private gamedata = []
    private updatetype: boolean = true
    private yposition: number = 0
    private canvassize: boolean = true

    Xmlrequest(self) {
        let xhr = cc.loader.getXMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && (this.status >= 200 && this.status < 400)) {
                // func(self,this)
                // cc.log(this.responseText)
                self.gamedata = JSON.parse(this.responseText)
            }
        };
        let url = "http://localhost/lott/outputpage2.php?game=" + this.gameimport + "&count=" + this.totalcount
        // let url = "http://172.20.10.2/lott/outputpage2.php?game=" + this.gameimport + "&count=" + this.totalcount
        // let url = "http://172.20.10.12/lott/outputtotal.php?game=" + this.gameimport + "&count=" + this.totalcount
        xhr.open("GET", url, true)
        xhr.send()
    }

    onLoad() {
        this.creatcell()
        this.Xmlrequest(this)
        this.scheduleOnce(function () {
            this.inputcellvalue()
            // cc.log(this.gamedata.length)
            this.totalcount = this.gamedata.length
        }, 1)
        if (this.img.node.x == 0) {
            this.canvassize = true
        } else if (this.img.node.x == -500) {
            this.canvassize = false
        }
    }
    creatcell() {
        // let count = this.totalcount //cell number
        if (this.totalcount > 10) {
            this.showcount = 10
        } else {
            this.showcount = this.totalcount
        }
        if (game.game.gametype[0] == true) { //圖示
            this.img.spriteFrame = this.pow
            this.gamename = "datapowercontrol"
            this.showcell(this.prefabpow)
            this.gameimport = "superlotto638"
        } else if (game.game.gametype[1] == true) {
            this.img.spriteFrame = this.lot
            this.gamename = "datalotcontrol"
            this.showcell(this.prefablot)
            this.gameimport = "Lotto649"
        } else if (game.game.gametype[2] == true) {
            this.img.spriteFrame = this.luck
            this.gamename = "dataluckcontrol"
            this.showcell(this.prefabluck)
            this.gameimport = "Lotto740"
        } else if (game.game.gametype[3] == true) {
            this.img.spriteFrame = this.ftn
            this.gamename = "data539control"
            this.showcell(this.prefab539)
            this.gameimport = "DailyCash"
        } else if (game.game.gametype[5] == true) {
            this.img.spriteFrame = this.star3
            this.gamename = "data3starcontrol"
            this.showcell(this.prefab3star)
            this.gameimport = "3D"
        } else if (game.game.gametype[6] == true) {
            this.img.spriteFrame = this.star4
            this.gamename = "data4starcontrol"
            this.showcell(this.prefab4star)
            this.gameimport = "4D"
        } else if (game.game.gametype[7] == true) {
            this.img.spriteFrame = this.te
            this.gamename = "data38control"
            this.showcell(this.prefab38)
            this.gameimport = "superlotto638"
        } else if (game.game.gametype[8] == true) {
            this.img.spriteFrame = this.tn
            this.gamename = "data539control"
            this.showcell(this.prefab539)
            this.gameimport = "DailyCash"
        } else if (game.game.gametype[9] == true) {
            this.img.spriteFrame = this.fn
            this.gamename = "data49control"
            this.showcell(this.prefab49)
            this.gameimport = "Lotto649"
        }
    }

    backtoindex() {
        cc.director.loadScene('index')
    }
    showpagecheck() {
        if (this.canvassize) {
            let mov = cc.moveBy(0.5, cc.p(-900, 0))
            this.pagecheck.runAction(mov)
        } else {
            let mov = cc.moveBy(0.5, cc.p(0, 900))
            this.pagecheck.runAction(mov)
        }
        // let mov = cc.moveBy(0.5, cc.p(-900, 0))
        // this.pagecheck.runAction(mov)
    }
    showpageselect() {
        if (this.canvassize) {
            let mov = cc.moveBy(0.5, cc.p(-900, 0))
            this.pageselect.runAction(mov)
        } else {
            let mov = cc.moveBy(0.5, cc.p(0, 900))
            this.pageselect.runAction(mov)
        }
        // let mov = cc.moveBy(0.5, cc.p(-900, 0))
        // this.pageselect.runAction(mov)
    }
    showpagetotal() {
        if (this.canvassize) {
            let mov = cc.moveBy(0.5, cc.p(-900, 0))
            this.pagetotal.runAction(mov)
        } else {
            let mov = cc.moveBy(0.5, cc.p(0, 900))
            this.pagetotal.runAction(mov)
        }
        // let mov = cc.moveBy(0.5, cc.p(-900, 0))
        // this.pagetotal.runAction(mov)
    }
    showcell(prefab) {
        let i: number = 0
        for (i; i < this.showcount; i++) {
            let cell = cc.instantiate(prefab)
            this.scrollview.addChild(cell)
            this.cellarr[i] = cell
            cell.setPosition(0, 0)
            cell.setOpacity(50)
            let opa = cc.fadeTo(0.5, 255)
            cell.runAction(opa)
        }
        // this.inputcellvalue()
    }


    // inputnumber(value) {

    // }
    start() {
        if (this.canvassize) {
            this.scrollview.y = 610
        } else {
            this.scrollview.y = 385
        }
        // this.scrollview.y = 610
    }
    update() {
        let initposition: number = 0
        // cc.log(this.scrollview.y)
        if (this.img.node.x == 0) {
            this.canvassize = true
            initposition = 760
        } else if (this.img.node.x == -500) {
            initposition = 535
            this.canvassize = false
        }

        if (this.scrcount == 0) {
            if (this.scrollview.y >= initposition - 160 + 320) {
                this.scrollview.y = initposition
                this.scrcount += 1
                this.inputcellvalue()
            } else {
                return
            }
        } else if (this.scrcount == this.totalcount - 10) {
            if (this.scrollview.y < initposition - 150) {
                this.scrollview.y = initposition
                this.scrcount -= 1
                this.inputcellvalue()
            } else {
                return
            }
        } else {
            if (this.scrollview.y >= initposition - 160 + 320 && this.updatetype) {
                this.scrollview.setPositionY(initposition)
                if (this.scrollview.y == initposition) {
                    this.scrcount += 1
                    this.inputcellvalue()
                }
            } else if (this.scrollview.y < initposition - 150 && this.updatetype) {
                this.scrollview.setPositionY(initposition)
                if (this.scrollview.y == initposition) {
                    this.scrcount -= 1
                    this.inputcellvalue()
                }
            }

        }
        this.yposition = this.scrollview.y
    }
    updatepause() {
        this.scheduleOnce(function () {
            this.updatetype = true
        }, 0.1)
    }
    inputcellvalue() {
        this.updatetype = false
        this.updatepause()
        for (let i = 0; i < this.showcount; i++) {

            let value = this.cellarr[i].getComponent(this.gamename)
            value.no.string = "第" + this.gamedata[i + this.scrcount].No + "期"
            value.date.string = this.gamedata[i + this.scrcount].Date
            if (this.gamedata[i + this.scrcount].hitpeople != "0") {
                value.money.node.color = new cc.Color(255, 0, 0);
            } else {
                value.money.node.color = new cc.Color(255, 255, 255);
            }
            value.money.string = "正彩：" + this.gamedata[i + this.scrcount].hitpeople
            if (game.game.gametype[3] == true) {
                value.money.node.active = true
            }
            // this.inputnumber(value)
            value.savenumber(this.gamedata[i + this.scrcount].number1, this.gamedata[i + this.scrcount].number2, this.gamedata[i + this.scrcount].number3, this.gamedata[i + this.scrcount].number4, this.gamedata[i + this.scrcount].number5, this.gamedata[i + this.scrcount].number6, this.gamedata[i + this.scrcount].number7, this.gamedata[i + this.scrcount].numbersp)
        }

    }
    // beforefeyin() {
    //     // cc.log("1" + this.insertnumber.string)
    // }
    // keying() {
    //     // cc.log("2" + this.insertnumber.string)
    // }
    afterkeyin() {
        this.scrollview.removeAllChildren()
        this.scrcount = 0
        if (this.insertnumber.string == "") {
            this.totalcount = this.gamedata.length
            this.creatcell()
            this.inputcellvalue()
        } else {
            // this.totalcount = 1
            let nu: number
            for (let i = 0; i < this.gamedata.length; i++) {
                if (this.gamedata[i].No == this.insertnumber.string) {
                    this.totalcount = 1
                    nu = i
                    // cc.log("hit")
                    break
                } else {
                    this.totalcount = 0
                    // cc.log("XX")
                }
            }
            this.creatcell()

            let value = this.cellarr[0].getComponent(this.gamename)
            value.no.string = "第" + this.gamedata[nu].No + "期"
            value.date.string = this.gamedata[nu].Date
            if (this.gamedata[nu].hitpeople != "0") {
                value.money.node.color = new cc.Color(255, 0, 0);
            } else {
                value.money.node.color = new cc.Color(255, 255, 255);
            }
            value.money.string = "正彩：" + this.gamedata[nu].hitpeople
            // this.inputnumber(value)
            if (game.game.gametype[3] == true) {
                value.money.node.active = true
            }
            value.savenumber(this.gamedata[nu].number1, this.gamedata[nu].number2, this.gamedata[nu].number3, this.gamedata[nu].number4, this.gamedata[nu].number5, this.gamedata[nu].number6, this.gamedata[nu].number7, this.gamedata[nu].numbersp)

        }
        cc.log(this.insertnumber.string)
        // cc.log(this.gamedata)
    }
}
