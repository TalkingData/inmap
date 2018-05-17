import {
    geo
} from '../../lib/pointToPixel';
import Pixel from './../../common/Pixel';
import Point from './../../common/Point';

export let HoneycombOverlay = {
    toRecGrids: function (webObj) {
        let {
            points,
            zoomUnit,
            size,
            mapSize,
            mapCenter,
            nwMc,
            zoom,
            type
        } = webObj.request.data;
        let map = webObj.request.map;
        HoneycombOverlay._calculatePixel(map, points, mapSize, mapCenter, zoom);
        let gridsObj = HoneycombOverlay.honeycombGrid(points, map, nwMc, size, zoomUnit, mapSize, type);
        webObj.request.data = gridsObj;
        return webObj;
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
    honeycombGrid: function (data, map, nwMc, size, zoomUnit, mapSize, type) {
        let grids = {};
        let gridStep = Math.round(size / zoomUnit);
        let depthX = gridStep;
        let depthY = gridStep * 3 / 4;
        let sizeY = 2 * size * 3 / 4;
        let startYMc = parseInt(nwMc.y / sizeY + 1, 10) * sizeY;
        let startY = (nwMc.y - startYMc) / zoomUnit;
        startY = parseInt(startY, 10);
        let startXMc = parseInt(nwMc.x / size, 10) * size;
        let startX = (startXMc - nwMc.x) / zoomUnit;
        startX = parseInt(startX, 10);

        let endX = parseInt(mapSize.width + depthX, 10);
        let endY = parseInt(mapSize.height + depthY, 10);
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

            startX = parseInt(minPointX, 10);
            startY = parseInt(minPointY, 10);
            endX = parseInt(maxPointX, 10);
            endY = parseInt(maxPointY, 10);
        }
        let pointX = startX;
        let pointY = startY;

        let odd = false;

        while (pointY < endY) {
            while (pointX < endX) {
                let x = odd ? pointX - depthX / 2 : pointX;
                x = parseInt(x, 10);
                grids[x + '|' + pointY] = grids[x + '|' + pointY] || {
                    x: x,
                    y: pointY,
                    list: [],
                    count: 0,

                };

                pointX += depthX;
            }
            odd = !odd;
            pointX = startX;
            pointY += depthY;
        }

        for (let i in data) {
            let item = data[i];
            let pX = item.px;
            let pY = item.py;
            let fixYIndex = Math.round((pY - startY) / depthY);
            let fixY = fixYIndex * depthY + startY;
            let fixXIndex = Math.round((pX - startX) / depthX);
            let fixX = fixXIndex * depthX + startX;

            if (fixYIndex % 2) {
                fixX = fixX - depthX / 2;
            }
            if (fixX < startX || fixX > endX || fixY < startY || fixY > endY) {
                continue;
            }
            if (grids[fixX + '|' + fixY]) {
                grids[fixX + '|' + fixY].list.push(item);
                grids[fixX + '|' + fixY].count += item.count;
            }
        }
       
        let result = [];
        for (let key in grids) {
            let item = grids[key];
            if (type == 'avg' && item.count > 0) {
                item.count = item.count / item.list.length;
            }
            if (item.count > 0) {
                result.push(item);
            }
        }
        grids = null, data = null;
        return {
            grids: result,
        };
    }
};