# cocos笔记

### 生命周期回调

`onLoad()`	组件初始化时执行

`start()`	第一次激活前执行

`update()`	每帧执行

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

### 属性的应用

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

### API获取节点

1、当前节点  this.node : cc.Node

2、父节点 this.node.parent

3、子节点 this.node.children: cc.Node[]

4、全局查找

```
target = cc.find("Canvas/佩奇/名字")
```

5、查找子节点

```
target = cc.find("xx/yy",someNode)
```

### API获取组件

获取api组件

```
let label:cc.Label = target.getComponent(cc.Label)
```

获取脚本组件

```
//Script时target上的一个脚本组件
let script = node.getComponent("Script");
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