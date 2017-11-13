const { ccclass, property } = cc._decorator;

import game = require('./btcontrol')
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    inputtext: cc.Node
    @property(cc.Button)
    send: cc.Button
    @property(cc.Node)
    bg: cc.Node
    @property(cc.Node)
    page2: cc.Node
    @property(cc.Sprite)
    imgf: cc.Sprite
    @property(cc.Sprite)
    imgt: cc.Sprite
    @property(cc.Label)
    test: cc.Label



    @property(cc.Node)
    showselect: cc.Node

    @property(cc.Prefab)
    vie3star: cc.Prefab
    @property(cc.Prefab)
    vie4star: cc.Prefab
    @property(cc.Prefab)
    vie5ball: cc.Prefab
    @property(cc.Prefab)
    vie6ball: cc.Prefab
    @property(cc.Prefab)
    vie7ball: cc.Prefab
    @property(cc.Prefab)
    ball: cc.Prefab
    @property(cc.Prefab)
    star: cc.Prefab

    @property()
    gameballnumber: number = 0

    private selectorarr: Array<string>
    private totalarr: Array<Array<string>> = []
    private gametype: string = ""
    private gameprefab:cc.Prefab
    private totalcount: number = 0
    private showcount: number = 0
    private scrcount:number = 0
    private cellarr: Array<cc.Node> = []
    private testcount:number = 0
    private canvassize:boolean = true
    private updatetype: boolean = true

    resetinput() {
        // this.selectorarr = []
        this.selectorarr = []
        this.totalarr = []
        this.scrcount = 0
        this.inputtext.removeAllChildren()
        //ball click to insert number in array
        let fu = function (number, arr) {
            let ballarr = arr
            if (ballarr.length == 0) {
                ballarr.push(number.string)//add ball number
            } else {
                for (let i = 0; i < ballarr.length; i++) {
                    if (ballarr[i] == number.string) {
                        cc.log(ballarr[i], number.string)
                        ballarr.splice(i, 1)//del ball number
                        break
                    } else if (i == ballarr.length - 1) {
                        ballarr.push(number.string)//add ball number
                        break
                    }
                }
                ballarr.sort(function (a: any, b: any) { return a - b })
            }
        }

        for (let i = 1; i <= game.game.numb; i++) {

            if (this.gameballnumber == 3 || this.gameballnumber == 4) {
                let newball = cc.instantiate(this.star)
                this.inputtext.addChild(newball)
                let num = newball.getComponent('star')
                num.send(fu, this.selectorarr)
                num.number.string = i - 1
            } else {
                let newball = cc.instantiate(this.ball)
                this.inputtext.addChild(newball)
                let num = newball.getComponent('ball')
                num.send(fu, this.selectorarr)
                num.number.string = i
            }

        }

    }

    update() {
        if(this.imgt.node.x == 0){
            this.canvassize = true
        }else if(this.imgt.node.x == -500){
            this.canvassize = false
        }
        // cc.log(this.showcount,this.scrcount,this.totalarr.length,this.selectorarr)
        let arrchange = this.totalarr.length //辨識totalarr是否有改變

        
        //clear node
        this.showselect.removeAllChildren()
        //show cell
        if (this.gameballnumber == 3 || this.gameballnumber == 4) {
            this.allselect(this.gameballnumber)
            this.checkshowcell(arrchange)
            for(let i = 0 ;i < this.showcount ; i++){
                this.showall(i)
            }
        } else {
            if (this.selectorarr.length < this.gameballnumber) {
                this.test.string = "請選擇正確球數\n(還缺" + (this.gameballnumber - this.selectorarr.length) + "顆)"
            } else {
                this.allselect(this.gameballnumber)
                // if(arrchange != this.totalarr.length){
                //     this.scrcount = 0
                // }
                this.checkshowcell(arrchange)
                for(let i = 0 ;i < this.showcount ; i++){
                    this.showall(i)
                }
            }
        }


        let yposition = Math.floor(this.showselect.y)
        // reset cell position from 300
        
        if(this.scrcount == 0){
            if(yposition >= 460){
                // cc.log(yposition)
                this.showselect.y = 380
                this.scrcount += 1
                // cc.log("error1")
            }else {
                // cc.log("error2")
                return
            }
        }else if(this.scrcount == this.totalcount-10){
            if(yposition <=320){
                this.showselect.y = 380
                this.scrcount -= 1
            }else{
                return
            }
        }else{
            // cc.log(this.scrcount,yposition,this.updatetype)
            if(yposition >= 460 && this.updatetype){
                this.showselect.y = 380
                this.scrcount += 1
            }else if(yposition <=320 && this.updatetype){
                this.showselect.y = 380
                this.scrcount -= 1
            }
        }
        

    }
    updatepause(){
        // cc.log("updatetype change")
        this.scheduleOnce(function(){
            this.updatetype = true
            // cc.log("updatetype change",this.updatetype)
        },0.1)
    }
    hidepageselect() {
        if(this.canvassize){
            let mov = cc.moveBy(0.5, cc.p(900, 0))
            this.bg.runAction(mov)
        }else {
            let mov = cc.moveBy(0.5, cc.p(0, -900))
            this.bg.runAction(mov)
        }
        // let mov = cc.moveBy(0.5, cc.p(900, 0))
        // this.bg.runAction(mov)
    }

    onLoad() {
        // init logic
        this.imgt.spriteFrame = this.imgf.spriteFrame
        // this.selectorarr = []
        //各遊戲選球數
        if (game.game.gametype[0] == true || game.game.gametype[1] == true || game.game.gametype[7] == true || game.game.gametype[9] == true) {
            this.gameballnumber = 6
        } else if (game.game.gametype[2] == true) {
            this.gameballnumber = 7
        } else if (game.game.gametype[3] == true || game.game.gametype[8] == true) {
            this.gameballnumber = 5
        } else if (game.game.gametype[5] == true) {
            this.gameballnumber = 3
        } else if (game.game.gametype[6] == true) {
            this.gameballnumber = 4
        }
        this.resetinput()
        // for (let i = 1; i <= game.game.numb; i++) {

        //     if (this.gameballnumber == 3 || this.gameballnumber == 4) {
        //         let newball = cc.instantiate(this.star)
        //         this.inputtext.addChild(newball)
        //         let num = newball.getComponent('star')
        //         num.number.string = i - 1
        //     } else {
        //         let newball = cc.instantiate(this.ball)
        //         this.inputtext.addChild(newball)
        //         let num = newball.getComponent('ball')
        //         num.number.string = i
        //     }

        // }



    }
    checkshowcell(arrchange){
        //若組合總數有變 換回最頂端
        if(arrchange != this.totalarr.length){
            this.scrcount = 0
            if(this.canvassize){
                this.showselect.y = 300
            }else{
                this.showselect.y = 150
            }
            // this.showselect.y = 300
        }
        //check show cell number
        if(this.totalarr.length>=10){
            this.showcount = 10
        }else{
            this.showcount = this.totalarr.length
        }
        // cc.log(arrchange,this.showcount,this.scrcount,this.totalarr.length,this.showselect.y)
    }
    showall(i) {
        // this.updatetype = false
        this.updatepause()
        let cell = cc.instantiate(this.gameprefab)
        this.showselect.addChild(cell)
        this.cellarr[i] = cell
        let value = this.cellarr[i].getComponent(this.gametype)
        value.savenumber(this.selectorarr[this.totalarr[i+this.scrcount][0]]
                        ,this.selectorarr[this.totalarr[i+this.scrcount][1]]
                        ,this.selectorarr[this.totalarr[i+this.scrcount][2]]
                        ,this.selectorarr[this.totalarr[i+this.scrcount][3]]
                        ,this.selectorarr[this.totalarr[i+this.scrcount][4]]
                        ,this.selectorarr[this.totalarr[i+this.scrcount][5]]
                        ,this.selectorarr[this.totalarr[i+this.scrcount][6]])
        // let selnum = newselect.getComponent(this.gametype)
        // selnum.savenumber(this.selectorarr[arr[0]], this.selectorarr[arr[1]], this.selectorarr[arr[2]], this.selectorarr[arr[3]], this.selectorarr[arr[4]], this.selectorarr[arr[5]], this.selectorarr[arr[6]])
        // cc.log(this.selectorarr[arr[0]],this.selectorarr[arr[1]],this.selectorarr[arr[2]],this.selectorarr[arr[3]],this.selectorarr[arr[4]],this.selectorarr[arr[5]],this.selectorarr[arr[6]])

    }

    allselect(selectcount) {
        let debug: number = 0
        let allarr = []
        this.totalarr = []
        // cc.log(this.selectorarr.length)
        // cc.log(selectcount)
        if (game.game.gametype[0] == true || game.game.gametype[1] == true || game.game.gametype[7] == true || game.game.gametype[9] == true) {

            for (let n1 = 0; n1 <= this.selectorarr.length - selectcount; n1++) {
                for (let n2 = n1 + 1; n2 <= this.selectorarr.length - selectcount + 1; n2++) {
                    for (let n3 = n2 + 1; n3 <= this.selectorarr.length - selectcount + 2; n3++) {
                        for (let n4 = n3 + 1; n4 <= this.selectorarr.length - selectcount + 3; n4++) {
                            for (let n5 = n4 + 1; n5 <= this.selectorarr.length - selectcount + 4; n5++) {
                                for (let n6 = n5 + 1; n6 <= this.selectorarr.length - selectcount + 5; n6++) {
                                    allarr = [n1, n2, n3, n4, n5, n6]
                                    debug += 1
                                    this.gametype = "vie6ballcontrol"
                                    this.gameprefab = this.vie6ball
                                    // this.showall(this.vie6ball, "vie6ballcontrol", allarr)
                                    this.totalarr.push(allarr)
                                }
                            }
                        }
                    }
                }
            }
        } else if (game.game.gametype[2] == true) {
            for (let n1 = 0; n1 <= this.selectorarr.length - selectcount; n1++) {
                for (let n2 = n1 + 1; n2 <= this.selectorarr.length - selectcount + 1; n2++) {
                    for (let n3 = n2 + 1; n3 <= this.selectorarr.length - selectcount + 2; n3++) {
                        for (let n4 = n3 + 1; n4 <= this.selectorarr.length - selectcount + 3; n4++) {
                            for (let n5 = n4 + 1; n5 <= this.selectorarr.length - selectcount + 4; n5++) {
                                for (let n6 = n5 + 1; n6 <= this.selectorarr.length - selectcount + 5; n6++) {
                                    for (let n7 = n6 + 1; n7 <= this.selectorarr.length - selectcount + 6; n7++) {
                                        allarr = [n1, n2, n3, n4, n5, n6, n7]
                                        debug += 1
                                        this.gametype = "vie7ballcontrol"
                                        this.gameprefab = this.vie7ball
                                        // this.showall(this.vie7ball, "vie7ballcontrol", allarr)
                                        this.totalarr.push(allarr)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (game.game.gametype[3] == true || game.game.gametype[8] == true) {
            for (let n1 = 0; n1 <= this.selectorarr.length - selectcount; n1++) {
                for (let n2 = n1 + 1; n2 <= this.selectorarr.length - selectcount + 1; n2++) {
                    for (let n3 = n2 + 1; n3 <= this.selectorarr.length - selectcount + 2; n3++) {
                        for (let n4 = n3 + 1; n4 <= this.selectorarr.length - selectcount + 3; n4++) {
                            for (let n5 = n4 + 1; n5 <= this.selectorarr.length - selectcount + 4; n5++) {
                                allarr = [n1, n2, n3, n4, n5]
                                debug += 1
                                this.gametype = "vie5ballcontrol"
                                this.gameprefab = this.vie5ball
                                // this.showall(this.vie5ball, "vie5ballcontrol", allarr)
                                this.totalarr.push(allarr)
                            }
                        }
                    }
                }
            }
        } else if (game.game.gametype[5] == true) {
            for (let n1 = 0; n1 < this.selectorarr.length; n1++) {
                for (let n2 = 0; n2 < this.selectorarr.length; n2++) {
                    for (let n3 = 0; n3 < this.selectorarr.length; n3++) {
                        allarr = [n1, n2, n3]
                        debug += 1
                        this.gametype = "vie3starcontrol"
                        this.gameprefab = this.vie3star
                        // this.showall(this.vie3star, "vie3starcontrol", allarr)
                        this.totalarr.push(allarr)
                    }
                }
            }
        } else if (game.game.gametype[6] == true) {
            for (let n1 = 0; n1 < this.selectorarr.length; n1++) {
                for (let n2 = 0; n2 < this.selectorarr.length; n2++) {
                    for (let n3 = 0; n3 < this.selectorarr.length; n3++) {
                        for (let n4 = 0; n4 < this.selectorarr.length; n4++) {
                            allarr = [n1, n2, n3, n4]
                            debug += 1
                            this.gametype = "vie4starcontrol"
                            this.gameprefab = this.vie4star
                            // this.showall(this.vie4star, "vie4starcontrol", allarr)
                            this.totalarr.push(allarr)
                        }
                    }
                }
            }
        }
        this.test.string = "共有" + debug + "種組合"
        this.totalcount = debug
        // cc.log(debug)
    }




}
