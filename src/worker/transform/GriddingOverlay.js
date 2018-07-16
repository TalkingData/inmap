import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

const GriddingOverlay = {
    toRecGrids(webObj) {
        let {
            points,
            zoomUnit,
            size,
            mapSize,
            nwMc,
            type,

        } = webObj.request.data;
        let map = webObj.request.map;

        GriddingOverlay._calculatePixel(map, points);
        let result = GriddingOverlay.recGrids(points, map, nwMc, size, zoomUnit, mapSize, type);
        webObj.request.data = result;
        return webObj;
    },
    _calculatePixel(map, data) {
        for (let j = 0, len = data.length; j < len; j++) {
            let geometry = data[j].geometry;
            let coordinates = geometry.coordinates;
            geometry['pixel'] = pointToPixelWorker({
                lng: coordinates[0],
                lat: coordinates[1]
            }, map);

            if (data[j].count == null) {
                throw new TypeError('inMap.GriddingOverlay: data is Invalid format ');
            }

        }
        return data;
    },

    recGrids(data, map, nwMc, size, zoomUnit, mapSize, type) {
        if (data.length <= 0) {
            return {
                grids: []
            };
        }

        let grids = {};

        let gridStep = size / zoomUnit;
        let startXMc = parseInt(nwMc.x / size, 10) * size;
        let startX = (startXMc - nwMc.x) / zoomUnit;
        let endX = mapSize.width;
        let startYMc = parseInt(nwMc.y / size, 10) * size + size;
        let startY = (nwMc.y - startYMc) / zoomUnit;
        let endY = mapSize.height;


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
                grids[name] = {
                    x: parseFloat(stockXA[i]),
                    y: parseFloat(stockYA[j]),
                    list: [],
                    count: 0,
                };
            }
        }
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let x = item.geometry.pixel.x;
            let y = item.geometry.pixel.y;
            if (x >= startX && x <= endX && y >= startY && y <= endY) {
                for (let j = 0; j < stockXA.length; j++) {
                    let dataX = Number(stockXA[j]);
                    if (x >= dataX && x < dataX + gridStep) {
                        for (let k = 0; k < stockYA.length; k++) {
                            let dataY = Number(stockYA[k]);
                            if (y >= dataY && y < dataY + gridStep) {
                                let grid = grids[stockXA[j] + '_' + stockYA[k]];
                                grid.list.push(item);
                                grid.count += item.count; //sum
                            }
                        }
                    }
                }
            }
        }

        let result = [];
        for (let key in grids) {
            let item = grids[key];
            if (type === 'avg' && item.list.length > 0) {
                item.count = item.count / item.list.length;
            }
            if (item.count > 0) {
                result.push(item);
            }


        }
        grids = null, stockXA = null, stockYA = null, data = null;

        return {
            grids: result
        };
    }
};
export default GriddingOverlay;