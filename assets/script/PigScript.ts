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

    @property
    //速度
    speed : number = 1;

    //方向
    // 向上为(0,1) 向下为(0,-1) 停止为(0,0)
    direction:cc.Vec2 = null

    @property
    // 是否可以控制
    controlable:boolean = false

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("mousedown",this.moveLeft,this);
        cc.systemEvent.on('keydown',this.onKeyPress,this)
    }

    start () {
        cc.log("你好，我是佩奇！"+123)
    }

    moveLeft(){
        this.node.x -= 100;
    }
    
    onKeyPress(e:cc.Event.EventKeyboard){
            if(e.keyCode == cc.macro.KEY.left){
                this.direction = cc.v2(-1,0);
            }else if(e.keyCode == cc.macro.KEY.right){
                this.direction = cc.v2(1,0);
            }else if(e.keyCode == cc.macro.KEY.up){
                this.direction = cc.v2(0,1);
            }else if(e.keyCode == cc.macro.KEY.down){
                this.direction = cc.v2(0,-1);
            }else if(e.keyCode == cc.macro.KEY.space){
                this.direction = cc.v2(0,0);
            }

            if(!this.controlable){
                this.direction = null;
            }
            console.log(this.direction);  
    }

    update (dt) {
        
        if(this.direction == null) return; //原地不动

        let pos:cc.Vec2 = this.node.getPosition();
        pos.x += this.speed *this.direction.x;
        pos.y += this.speed *this.direction.y;
        this.node.setPosition(pos);
    }

    
}
