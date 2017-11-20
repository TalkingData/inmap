import {
    geo
} from '../../geo/geo';
import {
    Pixel 
} from './../../geo/Pixel';
import {
    Point 
} from './../../geo/Point';
export let GriddingOverlay = {
    toRecGrids: function (webObj) {

        let data = webObj,
            points = data.request.data.points,
            zoomUnit = data.request.data.zoomUnit,
            size = data.request.data.size,
            mapSize = data.request.data.mapSize,
            mapCenter = data.request.data.mapCenter;
        let nwMc = data.request.data.nwMc,
            map = data.request.map,
            zoom = data.request.data.zoom;

        GriddingOverlay._calculatePixel(map, points, mapSize, mapCenter, zoom);
        let gridsObj = GriddingOverlay.recGrids(points, map, nwMc, size, zoomUnit, mapSize);

        return {
            data: gridsObj,
            client: webObj

        };
    },
    _calculatePixel: function (map, data, mapSize, mapCenter, zoom) {

        let zoomUnit = Math.pow(2, 18 - zoom);
        let mcCenter = geo.projection.lngLatToPoint(mapCenter);

        let nwMc = new Pixel(mcCenter.x - mapSize.width / 2 * zoomUnit, mcCenter.y + mapSize.height / 2 * zoomUnit); //左上角墨卡托坐标
        for (let j = 0; j < data.length; j++) {
            if (data[j].lng && data[j].lat && !data[j].x && !data[j].y) {
                let pixel = geo.projection.lngLatToPoint(new Point(data[j].lng, data[j].lat), map);
                data[j].x = pixel.x;
                data[j].y = pixel.y;

            }
            if (data[j].x && data[j].y) {
                data[j].px = (data[j].x - nwMc.x) / zoomUnit;
                data[j].py = (nwMc.y - data[j].y) / zoomUnit;
            }

        }
        return data;
    },

    recGrids: function (data, map, nwMc, size, zoomUnit, mapSize) {
        //isAvg 聚合的方式
        let max = 0;
        let grids = {};

        let gridStep = size / zoomUnit;

        let startXMc = parseInt(nwMc.x / size, 10) * size;

        let startX = (startXMc - nwMc.x) / zoomUnit;

        let stockXA = [];
        let stickXAIndex = 0;
        while (startX + stickXAIndex * gridStep < mapSize.width) {
            let value = startX + stickXAIndex * gridStep;
            stockXA.push(value.toFixed(2));
            stickXAIndex++;
        }

        let startYMc = parseInt(nwMc.y / size, 10) * size + size;
        let startY = (nwMc.y - startYMc) / zoomUnit;
        let stockYA = [];
        let stickYAIndex = 0;
        while (startY + stickYAIndex * gridStep < mapSize.height) {
            let value = startY + stickYAIndex * gridStep;
            stockYA.push(value.toFixed(2));
            stickYAIndex++;
        }

        for (let i = 0; i < stockXA.length; i++) {
            for (let j = 0; j < stockYA.length; j++) {
                let name = stockXA[i] + '_' + stockYA[j];
                grids[name] = [];
            }
        }

        for (let i = 0; i < data.length; i++) {
            let x = data[i].px;
            let y = data[i].py;
            let val = data[i].count;

            for (let j = 0; j < stockXA.length; j++) {
                let dataX = Number(stockXA[j]);
                if (x >= dataX && x < dataX + gridStep) {
                    for (let k = 0; k < stockYA.length; k++) {
                        let dataY = Number(stockYA[k]);
                        if (y >= dataY && y < dataY + gridStep) {
                            grids[stockXA[j] + '_' + stockYA[k]].push(val);

                        }
                    }
                }
            }
        }
        for (let o in grids) {
            let arr = grids[o],
                all = 0;
            if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                    all += arr[i];
                }
                grids[o] = all / arr.length;
                if (grids[o] > max) {
                    max = grids[o];
                }
            } else {
                grids[o] = 0;
            }


        }

        return {
            grids: grids,
            max: max,
            min: 0
        };
    }
};