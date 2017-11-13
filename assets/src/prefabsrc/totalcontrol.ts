const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ProgressBar)
    total:cc.ProgressBar  = undefined
    @property(cc.Label)
    ballnumber:cc.Label = undefined
    @property(cc.Label)
    totalnumber:cc.Label = undefined
    @property(cc.Node)
    bar:cc.Node = undefined
    
    setposition(){
        this.totalnumber.node.setPositionY(-500*(1-this.total.progress))
    }


    onLoad() {
        // init logic
        this.total.progress = 0.5
        this.ballnumber.string = "00"
        this.totalnumber.string = "000"
        
    }
}
