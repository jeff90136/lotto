const {ccclass, property} = cc._decorator;




export module tran {
    export let transtring: string;
}


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label;

    

    onLoad() {
        // init logic
        // this.label.string = "index"
        tran.transtring = "trstring"
        
        this.label.string = tran.transtring
        // cc.game.addPersistRootNode(this.node)
    }
}
