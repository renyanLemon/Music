
### swiper

###### mode="widthFix"   等比缩放

```js
  <image src="{{item.url}}" mode="widthFix"></image>
```



### 设计组件

###### 高内聚

###### 低耦合
  组件相对独立，功能性相对完整。

###### 单一职责

###### 避免过多参数



### 设置文本显示两行
```css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
```



### 数据监听器

###### observers




### wx:for   修改默认item

```js
<block wx:for="{{swiperImgUrls}}" wx:for-item="data" wx:for-index="idx" wx:key="*this">
  {{idx}} : {{data}}
</block>
```



### 在小程序端，如何使用 async/await 语法？

在云函数里，由于 Node 版本最低是 8.9，因此是天然支持 async/await 语法的。而在小程序端则不然。在微信开发者工具里，以及 Android 端手机（浏览器内核是 QQ浏览器的 X5），async/await是天然支持的，但 iOS 端手机在较低版本则不支持，因此需要引入额外的 文件。可把这个 regenerator/runtime.js 文件引用到有使用 async/await 的文件当中。

```
import regeneratorRuntime from '../../utils/runtime.js'
```



### Request-Promise

This module is installed via npm:
```
npm install --save request
npm install --save request-promise
```

```
const rp = require('request-promise');
```



### 云数据库
云数据库插入只能单条插入


初始化数据库
```
const db = cloud.database()
```

插入数据库
```
db.collection('musiclist').add()
```

### 突破获取数据条数的限制
```
db.collection('musiclist').get()
```
 在云函数中获取，最多每次只能获取100条数据
 在小程序端获取，最多每次只能获取20条数据




### 定时触发器 
