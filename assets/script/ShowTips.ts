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

    index:number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.label = this.getComponent(cc.Label);
        this.text = this.label.string;  //取得完整的文本
        this.label.string = '';  //清空文本，从头显示

        this.schedule(this.onTimer,0.3);
    }

    start () {

    }

    onTimer(){
        this.index ++;

        let str:string = this.text.substring(0,this.index);
        this.label.string = str;

        cc.log(str);
        
        if(this.index >= this.text.length){
            this.unschedule(this.onTimer)
        }
    }
    // update (dt) {}
}

