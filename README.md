<p align="center">
    <a href="http://inmap.talkingdata.com">
        <img width="200" src="http://file.iviewui.com/inmap-logo.svg">
    </a>
</p>

# inMap
[![GitHub license](https://img.shields.io/github/license/TalkingData/inmap.svg?style=flat-square)](https://github.com/TalkingData/inmap/blob/master/LICENSE)
[![](https://img.shields.io/travis/TalkingData/inmap.svg?style=flat-square)](https://travis-ci.org/TalkingData/inmap)
[![inMap](https://img.shields.io/npm/v/inmap.svg?style=flat-square)](https://www.npmjs.org/package/inmap)
[![NPM downloads](http://img.shields.io/npm/dm/inmap.svg?style=flat-square)](https://npmjs.org/package/inmap)
[![NPM downloads](https://img.shields.io/npm/dt/inmap.svg?style=flat-square)](https://npmjs.org/package/inmap)


## 介绍
inMap 是一款基于百度地图的大数据可视化库，专注于大数据方向的散点、热力图、网格、聚合等方式展示，致力于让大数据可视化变得简单易用。

## Features
- 高性能.
- 多线程.
- 多图层叠加.
- 支持GeoJSON
- 友好的 API.
- 可以自定义主题.

## 文档
[http://inmap.talkingdata.com/](http://inmap.talkingdata.com/)

## 示例效果图
![image](http://ozjyavyki.bkt.clouddn.com/demo/demoe%E6%88%AA%E5%9B%BE.jpg)
![image](http://ozjyavyki.bkt.clouddn.com/demo/demo%E6%88%AA%E5%9B%BE2.jpg)
## 首先引用地图
```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=0lPULNZ5PmrFVg76kFuRjezF"></script>
```
## 安装
Using npm:
```
npm install inmap --save
```

或使用 <script> 全局引用，inMap 会被注册为一个全局变量:
```html
<script type="text/javascript" src="http://unpkg.com/inmap/dist/inmap.min.js"></script>
```

## 示例
```html
<script>
var inmap = new inMap.Map({
    id: 'allmap',  
    skin: 'Blueness',
    center: [105.403119, 38.028658], // center of map
    zoom: {
        value: 5, // level of map
        show: true, // whether to display the zoom button
        max: 18, 
        min: 5
    }
})
</script>
```
## 预览当前项目所有demo
```shell
# 从 GitHub 下载后，安装依赖
npm install

# 编译代码
npm run dev

在浏览器地址栏输入：http://localhost:8088/examples/index.html
```
# 捐赠
![image](http://ozjyavyki.bkt.clouddn.com/WX20180906-140345.png)
![image](http://ozjyavyki.bkt.clouddn.com/inmap/WX20180906-125056.png)

## Major Contributors
|Name|Avatar|
|---|---|
|[fengluhome](https://github.com/fengluhome) |  ![](https://avatars3.githubusercontent.com/u/4446509?v=3&s=60)|
|[Aresn](https://github.com/icarusion) |  ![](https://avatars3.githubusercontent.com/u/5370542?v=3&s=60)|
|[ChowBu](https://github.com/ChowBu) |  ![](https://avatars3.githubusercontent.com/u/7564637?v=3&s=60)|
|[cheekahao](https://github.com/cheekahao) |  ![](https://avatars3.githubusercontent.com/u/11977758?v=3&s=60)|
|[chenli8](https://github.com/chenli8) |  ![](https://avatars3.githubusercontent.com/u/24763413?v=3&s=60)|

欢迎加入QQ反馈问题: 618308202

## Links
- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)

## License
[Apache License 2.0](https://github.com/TalkingData/inmap/blob/master/LICENSE)

Copyright (c) 2015-present, TalkingData
