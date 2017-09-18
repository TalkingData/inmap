import {
    pointsToPixelsWoker,
    pointToPixelWorker
} from '../../geo/index';

let a = [{
        count: 1,
        lat: "24.3067",
        lng: "109.3949"
    },
    {
        count: 10,
        lat: "24.3219",
        lng: "109.4160"
    }
]
let b = [{
        count: 1,
        lat: "24.3067",
        lng: "109.3949",
        pixel: {
            x: 23,
            y: 34
        }
    },
    {
        count: 10,
        lat: "24.3219",
        lng: "109.4160",
        pixel: {
            x: 23,
            y: 34
        }
    }
]
/**
 * 数据集转换
  
  - - 转换前 - -
[{
        count: 1,
        lat: "24.3067",
        lng: "109.3949"
    },
    {
        count: 10,
        lat: "24.3219",
        lng: "109.4160"
    }
]
  - - 转换后 - -
  [{
        count: 1,
        lat: "24.3067",
        lng: "109.3949",
        pixel: {
            x: 23,
            y: 34
        }
    },
    {
        count: 10,
        lat: "24.3219",
        lng: "109.4160",
        pixel: {
            x: 23,
            y: 34
        }
    }
]
  */
export var HeatOverlay = {
    pointsToPixels: function (webObj) {
        //debugger
        webObj.request.data.forEach((val) => {
            val["pixel"] = pointToPixelWorker(val, webObj.request.map);
        });
        return {
            data: webObj.request.data,
            client: webObj
        }
    }
}
export var HeatTileOverlay = {
    pointsToPixels: function (webObj) {
        webObj.request.data.forEach((item) => {
            item.pixelData = pointsToPixelsWoker(item.data, webObj.request.map);
        });
        return {
            data: webObj.request.data,
            client: webObj
        }

    }
}