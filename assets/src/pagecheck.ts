const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg:cc.Node
    @property(cc.Node)
    page2:cc.Node
    @property(cc.Sprite)
    imgf: cc.Sprite
    @property(cc.Sprite)
    imgt: cc.Sprite

    // @property(cc.Node)
    // syear:cc.Node
    @property(cc.Prefab)
    sel:cc.Prefab
    @property(cc.Node)
    sec:cc.Node

    hidepagecheck(){
        let mov = cc.moveBy(0.5,cc.p(900,0))
        this.bg.runAction(mov)
        let mov2 = cc.moveBy(0.5,cc.p(900,0))
        // this.schedule(function(){
            // this.page2.runAction(mov2)
        // },0.5)
    }

    onLoad() {
        // init logic
        this.imgt.spriteFrame = this.imgf.spriteFrame
        // let cell = cc.instantiate(prefab)
        // this.scrollview.addChild(cell)
        let te = cc.instantiate(this.sel)
        this.sec.addChild(te)
        let te2 = cc.instantiate(this.sel)
        this.sec.addChild(te2)
        // let test = te.getComponent('selectbar')
        // test.selectorvalue = ["1","1","1","1","1","1","1","1"]

    }
}
