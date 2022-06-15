// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on("mousedown", this.onClicked, this)
    }

    start() {

    }

    // update (dt) {}

    onClicked() {
        // 获取‘名字’节点
        let node: cc.Node = cc.find("Canvas/peiqi/名字");
        let label: cc.Label = node.getComponent(cc.Label)
        node.setPosition(0, -200);
        label.string = "Pegga Pig";

        // 获取脚本组件
        let script = node.getComponent("SimpleScript");
        script.doChange();

        //获取peiqi节点
        let peiqiNode: cc.Node = cc.find("Canvas/peiqi");
        // let pos:cc.Vec2 = cc.v2(100,100);
        let pos = peiqiNode.getPosition();
        cc.log(pos);
        // peiqiNode.setPosition(cc.v3(100,-60,0));
        peiqiNode.setScale(cc.v3(0.5, 0.5, 0))
        // 使用缓动系统
        cc.tween(peiqiNode).to(1, { position: cc.v3(100, -60), rotation: 360 }).to(1, { scale: 0.6 }).start();

        // 获取qiaozi节点
        let qiaozi: cc.Node = cc.find("Canvas/qiaozi");
        cc.log(qiaozi)
        cc.tween(qiaozi).by(1, { position: cc.v3(0, 100, 0) }).by(1, { position: cc.v3(-100, 0, 0) }).by(1, { position: cc.v3(0, -100, 0) }).by(1, { position: cc.v3(100, 0, 0) }).start()
    }
}
