const {ccclass, property} = cc._decorator;
// import arr = require('../pageallselector')
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    number: cc.Label;
    @property(cc.Node)
    btball:cc.Node
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
    // inputnumber(){
    //     let ballarr = arr.selectarr.arr
    //     if (ballarr.length == 0){
    //         ballarr.push(this.number.string)//add ball number
    //     }else{
    //         for (let i=0 ; i<ballarr.length ; i++){
    //             if (ballarr[i] == this.number.string){
    //                 cc.log(ballarr[i],this.number.string)
    //                 ballarr.splice(i,1)//del ball number
    //                 break
    //             }else if (i == ballarr.length-1){
    //                 ballarr.push(this.number.string)//add ball number
    //                 break
    //             }
    //         }              
    //             ballarr.sort(function(a:any,b:any){return a - b})
    //     }
    // }
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
