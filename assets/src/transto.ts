const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label;

    // @property({
    //     default: 'hello'
    // })
    // text: string = 'hello';

    onLoad() {
        // init logic
        var index = cc.director.getScene().getChildByName('trans')
        index.on('mouseup',function(){
            index.runAction(cc.moveBy(3,50,50))
            index.lable.string = "to"
        })
    }
}
