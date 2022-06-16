// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
// 这个脚本可以实现GIF的展示
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property([cc.SpriteFrame])
    frames: cc.SpriteFrame[] = [];

    sprite:cc.Sprite = null;  //Sprite组件
    index:number = 0;   //当前显示的第N张图片
    interval:number = 0.1;  //定时器的间隔
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sprite = this.getComponent(cc.Sprite);
    }

    start () {
        this.schedule(this.onTimer,this.interval);
    }

    onTimer(){
        if(this.frames.length == 0) return;
        this.sprite.spriteFrame = this.frames[this.index];

        // 下一帧
        this.index++;
        if(this.index >=this.frames.length){
            this.index = 0;
        }
    }
    // update (dt) {}
    onDestory(){
        this.unschedule(this.onTimer);
    }
}
