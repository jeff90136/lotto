const {ccclass, property} = cc._decorator;

export module game {
    export let gametype:Array<boolean> = [false,false,false,false,false,false,false,false,false,false]
    export let numb:number
    // export interface ball {
    //     number:number
    // }
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    canvas:cc.Node = null

    @property()
        bttype:boolean = true

    @property()
        clickcount:number = 0

    @property(cc.Label)
        trans:cc.Label = null

    onclick(){

        this.canvas.runAction(cc.fadeOut(0.5));
        
        this.scheduleOnce(function() {
            cc.director.loadScene("page2")
            // , () => {
            //     // cc.director.
            // })

            // cc.sys.localStorage.setItem()
            
        }, 0.5);
    }
    
    bpowerclick(){
        game.gametype[0] = true
        game.numb = 38
    }
    blotclick(){
        game.gametype[1] = true
        game.numb = 49
    }
    luckclick(){
        game.gametype[2] = true
        game.numb = 40
    }
    b539click(){
        game.gametype[3] = true
        game.numb = 39
    }
    b3click(){
        game.gametype[5] = true
        game.numb = 10
    }
    b4click(){
        game.gametype[6] = true
        game.numb = 10
    }
    b38click(){
        game.gametype[7] = true
        game.numb = 38
    }
    b39click(){
        game.gametype[8] = true
        game.numb = 39
    }
    b49click(){
        game.gametype[9] = true
        game.numb = 49

        // var a : game.A  = {
        //     x: 10
        // }
    }

    onLoad() {
        game.gametype = [false,false,false,false,false,false,false,false,false,false]
    }
}
