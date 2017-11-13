const { ccclass, property } = cc._decorator;

export module selind {
    export let selvalue: string
    export let seltype: boolean
}
export interface test{
    tesstring:string
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    select: cc.Button
    @property(cc.Label)
    ind: cc.Label


    @property(cc.Node)
    scroll: cc.Node
    @property(cc.Node)//hide item
    hidenode: cc.Node

    @property(cc.Prefab)
    selectoritem: cc.Prefab
    @property()
    selectorcount: number
    @property()
    selectorvalue: Array<string> = ["選項一", "選項二", "選項三", "選項四", "選項五", "選項六"]

    update() {
        this.ind.string = selind.selvalue
        this.selecbartype(this.hidenode)
    }
    onLoad() {
        // init logic
        // 生成選項
        let test
        selind.seltype = true
        this.selectorcount = this.selectorvalue.length
        for (let i: any = 0; i < this.selectorcount; i++) {
            //預設選項
            if (i == 0) {
                selind.selvalue = this.selectorvalue[i]
            }
            // var A = function () {
            //     cc.log("AAA");
            // }
            let item = cc.instantiate(this.selectoritem)
            this.scroll.addChild(item)
            //input select value
            let itemvalue = item.getComponent('selectorbuttoncontrol')
            // itemvalue.registerClickCallBack(A)
            itemvalue.savelab(this.selectorvalue[i])
        }
        this.unshowselect(this.hidenode)
    }

    clickselect() {
        if (selind.seltype) {
            selind.seltype = false
            this.unshowselect(this.hidenode)
        } else {
            selind.seltype = true
            this.showselect(this.hidenode)
        }
    }



    selecbartype(nod) {
        if (selind.seltype) {
            this.unshowselect(nod)
        } else {
            this.showselect(nod)
        }
    }

    //show selector value
    showselect(nod) {
        nod.runAction(cc.show())
    }
    //hiden selector value
    unshowselect(nod) {
        nod.runAction(cc.hide())
    }

}
