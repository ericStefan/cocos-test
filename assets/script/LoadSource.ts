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

    frames:cc.SpriteFrame[] = new Array()
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart",this.getNpc,this);
        this.node.on("touchend",this.getDir,this)
    }

    start () {

    }

    getNpc(){
        cc.resources.load("人物",cc.SpriteFrame,(err,assets)=>{
            this.node.getComponent(cc.Sprite).spriteFrame = <cc.SpriteFrame>assets
        })
    }
    getDir(){
        cc.log(123213);
        cc.resources.load(["爱心","小翅膀"],cc.SpriteFrame,(err,assets:[cc.SpriteFrame])=>{
            this.node.getComponent(cc.Sprite).spriteFrame = <cc.SpriteFrame>assets[0]

            
        })
    }
    // update (dt) {}
}
