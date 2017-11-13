const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    date: cc.Label = undefined
    @property(cc.Label)
    money: cc.Label = undefined
    @property(cc.Label)
    no: cc.Label = undefined
    @property(cc.Label)
    ball1: cc.Label = undefined
    @property(cc.Label)
    ball2: cc.Label = undefined
    @property(cc.Label)
    ball3: cc.Label = undefined
    @property(cc.Label)
    ball4: cc.Label = undefined
    @property(cc.Label)
    ball5: cc.Label = undefined
    @property(cc.Label)
    ball6: cc.Label = undefined
    @property(cc.Label)
    sball: cc.Label = undefined

    
    savenumber(b1,b2,b3,b4,b5,b6,b7,sb){
        this.ball1.string = b1
        this.ball2.string = b2
        this.ball3.string = b3
        this.ball4.string = b4
        this.ball5.string = b5
        this.ball6.string = b6
        this.sball.string = sb
    }

    onLoad() {
        // init logic
        
    }
}
