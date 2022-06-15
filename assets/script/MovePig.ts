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

    @property("string")
    time: string = '2020-10-2'

    @property("number")
    step:number = 1

    @property("boolean")
    towardsLeft:boolean = true

    
    @property(cc.AudioClip)
    audio: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("mousedown",this.move,this)
    }

    start () {

    }

    update (dt:number) {
    }

    move(){
        // 移动
        if(this.towardsLeft){
            this.node.x -= this.step;
        }else{
            this.node.x += this.step;
        }
        // 播放脚步声
        if(this.audio!=null){
            cc.audioEngine.play(this.audio,false,1)
        }

    }
}
