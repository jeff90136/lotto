const { ccclass, property } = cc._decorator;

@ccclass
export default class ComponentInfo extends cc.Component {

    @property(Number)
    localZOrder: number = 0; 
}
