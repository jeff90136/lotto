const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label;

    // @property({
    //     default: 'hello'
    // })
    // text: string = 'hello';

    // @property(cc.Label)
    //     la1:cc.Label
    // @property(cc.Label)
    //     la2:cc.Label
    // @property(cc.Button)
    //     bt:cc.Button


    // dosome(){
    //     this.la1.string = "123"
    //     this.la2.string = "123"
    //     cc.director.loadScene('index')
    // }





    onLoad() {
        // init logic
        var index = cc.director.getScene().getChildByName('gamebtcontrol')
        index.showlab()
    }
}
