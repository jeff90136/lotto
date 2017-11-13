const {ccclass, property} = cc._decorator;

export module game {
    export let gametype:Array<boolean> = [false,false,false,false,false,false,false,false,false,false]
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    canvas:cc.Node
    // @property({
    //     type:cc.Button
    // })
    //     btpower:cc.Button    
    // @property({
    //     type:cc.Button
    // })
    //     btlot:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     btluck:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     bt539:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     bt3star:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     bt4star:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     bt39:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     bt38:cc.Button
    // @property({
    //     type:cc.Button
    // })
    //     bt49:cc.Button
    
    

    @property()
        bttype:boolean = true
    // @property()

    //     list:Array<boolean> = [false,false,false,false,false,false,false,false,false,false]
    // @property(cc.Prefab)
    //     show:cc.Prefab
    // @property(cc.Prefab)
    //     test:cc.Prefab
    

    @property()
        clickcount:number = 0





    @property(cc.Label)
        trans:cc.Label

    onclick(){

        // this.showlab()//動態生成

        if (this.bttype == true){

            // var bpower = cc.moveBy(1,cc.p(0,300));
            // var blot = cc.moveBy(1,cc.p(0,500));
            // var bluck = cc.moveBy(1,cc.p(0,-500));
            // var b539 = cc.moveBy(1,cc.p(0,-300));
            // var bbingo = cc.moveBy(1,cc.p(-300,-300));
            // var b3star = cc.moveBy(1,cc.p(-300,300));
            // var b4star = cc.moveBy(1,cc.p(-500,0));
            // var b39 = cc.moveBy(1,cc.p(500,0));
            // var b38 = cc.moveBy(1,cc.p(300,300));
            // var b49 = cc.moveBy(1,cc.p(300,-300));
            // var tableshow = cc.moveBy(1,cc.p(0,570))

            this.bttype = false;
            
            

        }else if (this.bttype == false){
            // var bpower = cc.moveBy(1,cc.p(0,-300));
            // var blot = cc.moveBy(1,cc.p(0,-500));
            // var bluck = cc.moveBy(1,cc.p(0,500));
            // var b539 = cc.moveBy(1,cc.p(0,300));
            // var bbingo = cc.moveBy(1,cc.p(300,300));
            // var b3star = cc.moveBy(1,cc.p(300,-300));
            // var b4star = cc.moveBy(1,cc.p(500,0));
            // var b39 = cc.moveBy(1,cc.p(-500,0));
            // var b38 = cc.moveBy(1,cc.p(-300,-300));
            // var b49 = cc.moveBy(1,cc.p(-300,300));
            // var tableshow = cc.moveBy(1,cc.p(0,-570))
            
            // this.list = [false,false,false,false,false,false,false,false,false,false]
            this.bttype = true;
            

            
        }
        
        // this.bt1.node.runAction(cc.moveBy(2,cc.p(0,0)));
        
        // this.btgo(bpower,blot,bluck,b539,bbingo,b3star,b4star,b38,b39,b49)

        this.canvas.runAction(cc.fadeOut(0.5));
        
        // cc.director.loadScene("test2");//切換場景
        this.scheduleOnce(function() {
            cc.director.loadScene("test2")
        }, 0.5);
    }
    
    bpowerclick(){
        game.gametype[0] = true
    }
    blotclick(){
        game.gametype[1] = true
    }
    luckclick(){
        game.gametype[2] = true
    }
    b539click(){
        game.gametype[3] = true
    }
    // bingoclick(){
    //     game.gametype[4] = true
    // }
    b3click(){
        game.gametype[5] = true
    }
    b4click(){
        game.gametype[6] = true
    }
    b38click(){
        game.gametype[7] = true
    }
    b39click(){
        game.gametype[8] = true
    }
    b49click(){
        game.gametype[9] = true
    }


    showlab(){
        // if (this.bttype == true){
            var bb = cc.instantiate(this.show)
            // bb.tag = 123
            this.node.addChild(bb)
            bb.width = 750
            bb.height = 300
            bb.setPosition(cc.p(200,this.clickcount*300))
            let str = bb.getComponent('showla')
            str.ontest(this.clickcount);
            this.clickcount += 1
        // }
        
        // la.getComponent('bttest').game = this;
    }




    btgo(bpower,blot,bluck,b539,bbingo,b3star,b4star,b38,b39,b49){
        this.btpower.node.runAction(bpower);
        this.btlot.node.runAction(blot);
        this.btluck.node.runAction(bluck);
        this.bt539.node.runAction(b539);
        // this.btbingo.node.runAction(bbingo);
        this.bt3star.node.runAction(b3star);
        this.bt4star.node.runAction(b4star);
        this.bt38.node.runAction(b38);
        this.bt39.node.runAction(b39);
        this.bt49.node.runAction(b49);

    }
    onLoad() {
        // init logic
        // this.trans.string = "gopage2"
        // cc.game.addPersistRootNode(this.node)
        game.gametype = [false,false,false,false,false,false,false,false,false,false]
    }
}
