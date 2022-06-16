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
        this.node.on("touchstart",this.sonShow,this);
        this.node.parent.on("touchstart",this.fatherShow,this.node.parent);
    }

    start () {

    }
    sonShow(e:cc.Event.EventTouch){
        // 阻止冒泡
        e.stopPropagation();
        cc.log("触发了子节点");
    }
    fatherShow(){
        cc.log("触发了父节点")
    }
    // update (dt) {}
}
