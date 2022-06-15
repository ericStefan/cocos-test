// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.node.on("mousedown", this.palyBall, this);
  }

  start() {}

  // update (dt) {}
  palyBall() {
    // 获取篮球节点
    let ball: cc.Node = cc.find("Canvas/篮球");
    let h: number = 300;
    cc.tween(ball)
      .by(0.5, { position: cc.v3(0, -400, 0) }, { easing: "quardIn" })
      .by(0.2, { position: cc.v3(0, (2 / 3) * h, 0) }, { easing: "quardOut" })
      .by(0.2, { position: cc.v3(0, (-2 / 3) * h, 0) }, { easing: "quardIn" })
      .by(0.2, { position: cc.v3(0, (1 / 3) * h, 0) })
      .by(0.2, { position: cc.v3(0, (-1 / 3) * h, 0) })
      .start();
  }
}
