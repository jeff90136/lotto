const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label;

    // @property({
    //     default: 'hello'
    // })
    // text: string = 'hello';
    @property(cc.Label)
    showlable:cc.Label


    onclear(){
        this.node.destroy()
    }

    ontest(input){
        this.showlable.string = "position = "+input
    }


    onLoad() {
        // init logic
        this.showlable.string = "123123"
    }
}
