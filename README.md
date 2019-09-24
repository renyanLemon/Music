
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
