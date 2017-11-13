const {ccclass, property} = cc._decorator;
// import arr = require('../pageallselector')
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    number: cc.Label = undefined
    @property(cc.Node)
    btball:cc.Node = undefined
    @property()
    bttype:boolean = false

    private parentfu = null
    private arr = null
    press(){
        if(this.bttype == true){
            this.bttype = false
            this.btball.opacity = 100
        }else{
            this.bttype = true
            this.btball.opacity = 255
        }
        // this.inputnumber()
        this.fucatch(this.number)
    }
    fucatch(number){
        this.parentfu(number,this.arr)
    }
    send(fu,arr){
        this.parentfu = fu
        this.arr = arr
    }
    onLoad() {
        // init logic
        this.bttype = false
        this.btball.opacity = 100
    }
}
