import {
    geo
} from '../../lib/pointToPixel';
import Pixel from './../../common/Pixel';
import Point from './../../common/Point';
export let GriddingOverlay = {
    toRecGrids(webObj) {
        let {
            points,
            zoomUnit,
            size,
            mapSize,
            mapCenter,
            nwMc,
            map,
            zoom,
            type
        } = webObj.request.data;
        GriddingOverlay._calculatePixel(map, points, mapSize, mapCenter, zoom);
        let gridsObj = GriddingOverlay.recGrids(points, map, nwMc, size, zoomUnit, mapSize, type);

        return {
            data: gridsObj,
            client: webObj

        };
    },
    _calculatePixel(map, data, mapSize, mapCenter, zoom) {

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

    recGrids(data, map, nwMc, size, zoomUnit, mapSize, type) {

        let grids = {};
        let gridStep = size / zoomUnit;

        let startXMc = parseInt(nwMc.x / size, 10) * size;
        let startX = (startXMc - nwMc.x) / zoomUnit;
        let endX = mapSize.width;
        let startYMc = parseInt(nwMc.y / size, 10) * size + size;
        let startY = (nwMc.y - startYMc) / zoomUnit;
        let endY = mapSize.height;

        if (data.length > 0) {
            let temp = data[0];
            let minPointX = temp.px,
                minPointY = temp.py,
                maxPointX = temp.px,
                maxPointY = temp.py;
            for (let i = 0; i < data.length - 1; i++) {
                let row = data[i];
                if (minPointX > row.px) {
                    minPointX = row.px;
                }
                if (minPointY > row.py) {
                    minPointY = row.py;
                }
                if (maxPointX < row.px) {
                    maxPointX = row.px;
                }
                if (maxPointY < row.py) {
                    maxPointY = row.py;
                }
            }
            startX = minPointX - 2;
            startY = minPointY - 2;
            endX = maxPointX + 2;
            endY = maxPointY + 2;
        }
        let stockXA = [];
        let stickXAIndex = 0;
        while (startX + stickXAIndex * gridStep < endX) {
            let value = startX + stickXAIndex * gridStep;
            stockXA.push(value.toFixed(2));
            stickXAIndex++;
        }

        let stockYA = [];
        let stickYAIndex = 0;
        while (startY + stickYAIndex * gridStep < endY) {
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
            // debugger
            let item = data[i];

            for (let j = 0; j < stockXA.length; j++) {
                let dataX = Number(stockXA[j]);
                if (x >= dataX && x < dataX + gridStep) {
                    for (let k = 0; k < stockYA.length; k++) {
                        let dataY = Number(stockYA[k]);
                        if (y >= dataY && y < dataY + gridStep) {
                            grids[stockXA[j] + '_' + stockYA[k]].push(item);

                        }
                    }
                }
            }
        }
        if (type === 'avg') {
            grids = GriddingOverlay.valueToAvg(grids);
        } else {
            grids = GriddingOverlay.valueToSum(grids);
        }
        return {
            grids: grids
        };
    },
    valueToAvg(grids) {

        for (let o in grids) {
            let arr = grids[o],
                all = 0;
            let item = {
                list: [],
                count: 0
            };
            if (arr.length > 0) {
                item.list = arr;
                for (let i = 0; i < arr.length; i++) {
                    all += arr[i].count;
                }
                item.count = all / arr.length;
            }
            grids[o] = item;
        }
        return grids;
    },
    valueToSum(grids) {
        for (let o in grids) {
            let arr = grids[o],
                all = 0;

            let item = {
                list: [],
                count: 0
            };
            if (arr.length > 0) {
                item.list = arr;
                for (let i = 0; i < arr.length; i++) {
                    all += arr[i].count;
                }
                item.count = all;

            }
            grids[o] = item;
        }
        return grids;
    }
};