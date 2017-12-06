# inMap
[![](https://img.shields.io/travis/TalkingData/inmap.svg?style=flat-square)](https://travis-ci.org/TalkingData/inmap)
[![iView](https://img.shields.io/npm/v/inmap.svg?style=flat-square)](https://www.npmjs.org/package/inmap)

## Introduce
inMap is a big data visualization library based on Baidu map. It focuses on the dot, heat map, grid and aggregation algorithm. Make it easy to use.

## Features
- High performance.
- Worker.
- Multi-layer overlay.
- Friendly API.
- Themes.

## Docs
[http://inmap.talkingdata.com/](http://inmap.talkingdata.com/)

## Overview
![](https://raw.githubusercontent.com/TalkingData/inmap/master/asset/overview.jpg)

## Install
Using npm:
```
npm install inmap --save
```

Using a script tag for global use:
```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=0lPULNZ5PmrFVg76kFuRjezF"></script>
<script type="text/javascript" src="inmap.min.js"></script>
```

## Usage
```html
<script>
var inmap = new inMap.Map({
    id: 'allmap',  
    skin: "Blueness",
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

## Major Contributors
|Name|Avatar|
|---|---|
|[fengluhome](https://github.com/fengluhome) |  ![](https://avatars3.githubusercontent.com/u/4446509?v=3&s=60)|
|[Aresn](https://github.com/icarusion) |  ![](https://avatars3.githubusercontent.com/u/5370542?v=3&s=60)|
|[ChowBu](https://github.com/ChowBu) |  ![](https://avatars3.githubusercontent.com/u/7564637?v=3&s=60)|
|[cheekahao](https://github.com/cheekahao) |  ![](https://avatars3.githubusercontent.com/u/11977758?v=3&s=60)|
|[chenli8](https://github.com/chenli8) |  ![](https://avatars3.githubusercontent.com/u/24763413?v=3&s=60)|

## Links
- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)

## License
[Apache License 2.0](https://github.com/TalkingData/inmap/blob/master/LICENSE)

Copyright (c) 2015-present, TalkingData