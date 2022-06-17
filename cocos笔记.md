# cocos笔记

### 生命周期回调

`onLoad()`	组件初始化时执行

`start()`	第一次激活前执行

`update(dt)`	每帧执行(dt参数：每一帧的间隔时间)

`lateUpdate()`	每一帧刷新完成后执行

`onEnable()`	组件启用时执行

`OnDisable()`	组件禁用时执行

`onDestory()`	组件销毁时调用

### 事件响应处理

### propety属性

声明属性，可以在creator面板上增加属性

```
@proprty(类型)
time:string = "123"
```

### 节点的属性

 属性类型:

1、基本类型

string, number, boolean, bigint

2、引用类型（常用）

cc.Node 节点

cc.SpriteFrame 图片帧资源

cc.AudioClip 音频资源

```
//播放音频
cc.audioEngine.play(this.audio,false,1)
```

### 获取节点

1、当前节点  

​	`this.node : cc.Node`

2、父节点 

```typescript
//获取父节点 
this.node.getParent();
//设置父节点
this.node,setParent(ddd)；
```

3、子节点 

```
this.node.children[0];
this.node.getChildByName("abc");
```

​	移除子节点

```typescript
//移除所有子节点
this.node.removeChildren();
//移除指定子节点
this.node.removeChild(ddd);
//从父节点中移除
this.node.removeFromParent();
```



4、全局查找

```
target = cc.find("Canvas/佩奇/名字")
```

5、查找子节点

```
target = cc.find("xx/yy",someNode)
```

### 获取组件

获取api组件

```
let label:cc.Label = target.getComponent(cc.Label)
```

获取脚本组件

```
//Script时target上的一个脚本组件
let script = node.getComponent("Script");
```

获取节点上指定类型的所有组件

```
let label:cc.Label = target.getComponents(cc.Label)
```

从子物体中寻找组件

```typescript
this.getCompoentInChildren(cc.Sprite)
```

### 坐标系

cocos creator使用的都是相对坐标，是相对于父节点锚点的坐标

创建向量对象(Vec2、Vec3对象)

​	2d(两种方式等效)

```
let pos = new cc.Vec2(100,100);
let pso2 = cc.v2(100,100)
```

​	3d

```
let pos = new cc.Vec2(100,100,0);
let pso2 = cc.v2(100,100,0)
```

获取节点坐标

```
let pos:cc.Vec2 = node.getPosition();
```

设置节点坐标

```
node.setPosition(cc.v2(250,-120));
node.setPosition(cc.v3(250,-120,0));
```

设置节点缩放

```
node.setScale(cc.v3(1,1,0))
```

### 缓动系统(cc.tween)

1、使用方法

```
cc.tween(node).to(1, { position: cc.v3(100, -60)，rotation:360}，{easeing:'sineOutIn'}).start();
```

2、`to`和`by`

- `to`：对属性进行绝对值计算，最终的运行结果即是设置的属性值，即改变到某个值。
- `by`：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时节点的属性值，即变化值。

3、参数

`to(duration,args,ease)` 

 duration是需要时间(s)，

`arg` 表示结束时的参数，使用对象的形式添加多个属性参数

ease 表示运动的方式（匀速、加速）

可以使用内置的运动方式，也可以自定义：

```js
cc.tween().to(1, { scale: 2, rotation: 90 }, {
  progress: (start, end, current, ratio) => {
    return start + (end - start) * ratio;
  }
})
```

4、修饰符

`delay()`延迟执行

```
//延迟1s执行后面的to
cc.tween(node).delay(1).to(1, { position: cc.v3(100, -60)).start();
```

`repeat()`重复执行

```
//重复执行前面的to 10次
//写法一
cc.tween(node).to(1, { position: cc.v3(100, -60)).repeat(10).start();
//写法二
cc.tween(node)
	.repeat(10,cc.tween()
	.to(1, { position: cc.v3(100, -60)}
	)
	.start();
```

`repeatForever()`  一直重复执行

```
cc.tween(this.node)
    .by(1, { scale: 1 })
    .repeatForever()
    .start()
```

可以使用链式写法，以此执行多个缓动动作：

```
cc.tween(node).to(1, { position: cc.v3(100, -60)}).to(1,{rotation:360}).start();
```

### 动画

`cc.game.setFramRate(30)` 设置游戏帧率，一般帧率是全局的，可以在Canvas的脚本中设置

update()生命周期函数会在一秒内执行指定帧数(默认60)次内容

dt 表示每帧的间隔时间，大约0.016s

```
update(dt){
	
}
```

### 计时器

开始一个计时器

```javascript
component.schedule(fucntion(){},interval,repeat,delay)
```

`interval` ：计时器的间隔时间(s)

`repeat`: 重复次数（默认是一直重复）

`delay`: 延迟多少（s）时间后开始执行

计时器相关函数：

- `schedule`：开始一个计时器
- `scheduleOnce`：开始一个只执行一次的计时器
- `unschedule`：取消一个计时器
- `unscheduleAllCallbacks`：取消这个组件的所有计时器

### GIF图片展示

cocos creator不支持直接使用GIF, 有以下方式进行处理：

1、循环显示每一帧图片

GIF是由多张图片组成，并循环显示得到的。

先将GIF文件提取出每一帧的图片，加入cocos的资源管理器中，将每一帧图片的Trim Type设置为none。

```typescript
//GIFplayer.ts
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
	
    //设置frame配置项，用来存储每一帧的图片
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
```

在编辑器上的`GIFplayer`组件上依次添加每一帧的图片

![image-20220616114026616](C:\Users\eric\AppData\Roaming\Typora\typora-user-images\image-20220616114026616.png)

2、使用Atlas图集

原理与第一种方法类似，Atlas图集是把每一帧的图片集合在一起形成一个图集（与css的雪碧图类似）。



```
    //设置atlas配置项，用来存储每一帧的图片
	@property(cc.SpriteAtlas)
	atlas:cc.SpriteAtlas = null;
```

### 资源加载

#### 动态加载资源

在编辑器中直接引入的资源是静态引入的，还可以使用函数调用的方式动态引入资源。

* 所有需要通过脚本动态加载的资源，都必须放置在 `resources` 文件夹或它的子文件夹下。

* 使用`cc.resources.load` 等接口动态加载资源时，要传入相对 resources 的路径，并且路径的结尾处 **不能** 包含文件扩展名

```
cc.resources.load(path,type,onComplete)
```

`path` : 相对路径（文件名不加后缀）

`type`: 加载资源的类型,可省略(`cc.SpriteFrame`,` cc.AudioClip`等)

`onComplete`: 指定回调方法，资源加载完成时调用

```typescript
function(err,assets){}
```

若err==null，表示资源加载成功，assets表示加载得到的资源对象

若err!=null，表示资源加载出错，err即为出错的原因

#### 多个资源的加载

1、传入多个资源路径组成的数组

```
cc.resources.load(paths,()=>{})
```

2、使用`loadDir`加载该目录下的所有资源

```
cc.resources.loadDir(path,()=>{})
```

#### 加载远程资源

```typescript
cc.assetManager.loadRemote('url',(err, audioClip) => console.log(audioClip))
```

### 场景管理

1、切换场景

第一个参数直接填场景名称,不用加后缀，也不用写路径

```typescript
cc.director.loadScene("game2",()=>{
    //当前已经加载到场景里了
});
```

```typescript
//先预加载，再载入场景，可以在加载资源过程中加入载入动画
cc.director.preloadScene("game2",()=>{
	//场景已经加载到内存里，但还没有使用
    cc.director.loadScene("gamer2")
});
```

2、常驻节点

某个节点需要在不同场景切换过程中常驻，该节点需要在根节点上

```typescript
//添加常驻节点
cc.game.addPersistRootNode(node);
//删除常驻节点(场景切换是会被删除)
cc.game.removePersistRootNode(node);
```

3、获取场景

```typescript
cc.director.getScene()
```



### 事件

#### 事件监听和发射

注册监听

```typescript
this.node.on('mousedown',(event)=>{},target)
```

​	第三个参数`target`用于绑定响应函数的调用者

关闭监听

```typescript
this.node.off('mousedown',(event)=>{},taget)
```

发射事件

用来触发自定义事件

`emit`

```typescript
//最多可以传递5个参数
this.node.on("mousedown",(event)=>{
    //出发自定义事件
    this.node.emit("myevent");
})
//绑定自定义事件
this.node.on("myevent",(event)=>{
    cc.log("自定义事件")
})
```

`dispatchEvent`

```typescript
//最多可以传递5个参数
this.node.on("mousedown",(event)=>{
    //出发自定义事件
    this.node.dispatchEvent(new cc.Event.EventCustom("myevent",ture));
})
//绑定自定义事件
this.node.on("myevent",(event)=>{
    cc.log("自定义事件")
})
```

​		`dispatchEvent` 会产生冒泡行为，设置第二个参数为`false`取消冒泡；

#### 触摸事件

| 枚举对象定义                     | 对应的事件名  | 事件触发的时机                   |
| :------------------------------- | :------------ | :------------------------------- |
| `cc.Node.EventType.TOUCH_START`  | `touchstart`  | 当手指触点落在目标节点区域内时   |
| `cc.Node.EventType.TOUCH_MOVE`   | `touchmove`   | 当手指在屏幕上移动时             |
| `cc.Node.EventType.TOUCH_END`    | `touchend`    | 当手指在目标节点区域内离开屏幕时 |
| `cc.Node.EventType.TOUCH_CANCEL` | `touchcancel` | 当手指在目标节点区域外离开屏幕时 |

触摸事件（`cc.Event.EventTouch`）的重要 API 如下（`cc.Event` 标准事件 API 除外）：

| API 名                | 类型       | 意义                                                       |
| :-------------------- | :--------- | :--------------------------------------------------------- |
| `touch`               | `cc.Touch` | 与当前事件关联的触点对象                                   |
| `getID`               | `Number`   | 获取触点的 ID，用于多点触摸的逻辑判断                      |
| `getLocation`         | `Object`   | 获取触点位置对象，对象包含 x 和 y 属性                     |
| `getLocationX`        | `Number`   | 获取触点的 X 轴位置                                        |
| `getLocationY`        | `Number`   | 获取触点的 Y 轴位置                                        |
| `getPreviousLocation` | `Object`   | 获取触点上一次触发事件时的位置对象，对象包含 x 和 y 属性   |
| `getStartLocation`    | `Object`   | 获取触点初始时的位置对象，对象包含 x 和 y 属性             |
| `getDelta`            | `Object`   | 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性 |

冒泡机制(触摸事件)

对子节点的事件行为也会逐级触发父节点的事件行为。

```
//使用stopPropagation()阻止冒泡
//e是对应的事件对象
show(e:cc.Event.EventTouch){
	e.stopPropagation();
}
```

`BlockInputEvents`组件可以取消事件穿透

#### 键鼠事件

| `cc.Node.EventType.MOUSE_DOWN`  | `mousedown`  | 当鼠标在目标节点区域按下时触发一次         |
| ------------------------------- | ------------ | ------------------------------------------ |
| `cc.Node.EventType.MOUSE_ENTER` | `mouseenter` | 当鼠标移入目标节点区域时，不论是否按下     |
| `cc.Node.EventType.MOUSE_MOVE`  | `mousemove`  | 当鼠标在目标节点区域中移动时，不论是否按下 |
| `cc.Node.EventType.MOUSE_LEAVE` | `mouseleave` | 当鼠标移出目标节点区域时，不论是否按下     |
| `cc.Node.EventType.MOUSE_UP`    | `mouseup`    | 当鼠标从按下状态松开时触发一次             |
| `cc.Node.EventType.MOUSE_WHEEL` | `mousewheel` | 当鼠标滚轮滚动时                           |

鼠标事件（`cc.Event.EventMouse`）的重要 API 如下（`cc.Event` 标准事件 API 除外）：

| 函数名                | 返回值类型 | 意义                                                         |
| :-------------------- | :--------- | :----------------------------------------------------------- |
| `getScrollY`          | `Number`   | 获取滚轮滚动的 Y 轴距离，只有滚动时才有效                    |
| `getLocation`         | `Object`   | 获取鼠标位置对象，对象包含 x 和 y 属性                       |
| `getLocationX`        | `Number`   | 获取鼠标的 X 轴位置                                          |
| `getLocationY`        | `Number`   | 获取鼠标的 Y 轴位置                                          |
| `getPreviousLocation` | `Object`   | 获取鼠标事件上次触发时的位置对象，对象包含 x 和 y 属性       |
| `getDelta`            | `Object`   | 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性   |
| `getButton`           | `Number`   | `cc.Event.EventMouse.BUTTON_LEFT` 或 `cc.Event.EventMouse.BUTTON_RIGHT` 或 `cc.Event.EventMouse.BUTTON_MIDDLE` |

判断左右键

```typescript
this.node.on(cc.Node.EventType.MOUSE_DOWN,(event)=<{
    if(event.getButton() == cc.EventMouse.BUTTON_RIGHT){
    	console.log("右键");
}
	if(eventgetButton() == cc.EventMouse.BUTTON_LEFT){
    	console.log("左键");
}
})
```

#### 键盘事件 

`cc.SystemEvent.EventType.KEY_DOWN`  按下按键

`cc.SystemEvent.EventType.KEY_UP`	抬起按键

使用`keycode`绑定指定按键的输入

`cc..macro.key.按键` 可以获取对应按键的`keycode`

```typescript
cc.SystemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,(event)=>{
	if(event.keycode == cc.macro.key.w){
        console.log("按下了w")
    }
})
```





`cc.instantiate`  : 克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。
