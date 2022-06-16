// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    

    onLoad () {
        let pignode:cc.Node =cc.find("Canvas/FlyingQiaozi/qiaozi");
        pignode.on("mousedown",this.pigFly,this)
    }

    start () {

    }

    // update (dt) {}
    pigFly(){
        
        let fullPig:cc.Node = cc.find("Canvas/FlyingQiaozi");
        cc.log(fullPig);
        cc.tween(fullPig).to(2,{position:cc.v3(-385,63,0),scale:0.4}).start();
    }
}
