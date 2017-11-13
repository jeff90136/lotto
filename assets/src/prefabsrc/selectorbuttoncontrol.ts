const {ccclass, property} = cc._decorator;
import sel = require('../selectbar')

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = undefined
    @property(cc.Prefab)
    nod:cc.Prefab = undefined

    private _clickCallBack = null;


    send(){
        sel.selind.selvalue = this.label.string
        sel.selind.seltype = true
    }

    savelab(ind:string){
        this.label.string = ind
    }
    onLoad() {
        // init logic
        
    }
    // registerClickCallBack(click, target) {
    //     this._clickCallBack = click;
    // }

    // setClickCallBack(event) {
    //     if (this._clickCallBack) {
    //         this._clickCallBack();
    //     }
    // }
}
