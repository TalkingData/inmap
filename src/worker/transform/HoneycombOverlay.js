import {
    geo
} from '../../lib/pointToPixel';
import Pixel from './../../common/Pixel';
import Point from './../../common/Point';

export let HoneycombOverlay = {
    toRecGrids: function (webObj) {
        let data = webObj,
            points = data.request.data.points,
            zoomUnit = data.request.data.zoomUnit,
            size = data.request.data.size,
            mapSize = data.request.data.mapSize,
            mapCenter = data.request.data.mapCenter,
            nwMc = data.request.data.nwMc,
            map = data.request.map,
            zoom = data.request.data.zoom;

        HoneycombOverlay._calculatePixel(map, points, mapSize, mapCenter, zoom);
        let gridsObj = HoneycombOverlay.honeycombGrid(points, map, nwMc, size, zoomUnit, mapSize);

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
    honeycombGrid: function (data, map, nwMc, size, zoomUnit, mapSize) {

        let max = 0;
        let min = 0;

        let grids = {};

        let gridStep = size / zoomUnit;

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
            startX = parseInt(minPointX - 11,10);
            startY = parseInt(minPointY - 11,10);
            endX = parseInt(maxPointX + 11,10);
            endY = parseInt(maxPointY + 11,10);
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
                    len: 0
                };

                pointX += depthX;
            }
            odd = !odd;
            pointX = startX;
            pointY += depthY;
        }

        for (let i in data) {
            let count = data[i].count;
            let pX = data[i].px;
            let pY = data[i].py;

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
                grids[fixX + '|' + fixY].len += count;
                let num = grids[fixX + '|' + fixY].len;
                max = max || num;
                min = min || num;
                max = Math.max(max, num);
                min = Math.min(min, num);
            }
        }

        return {
            grids: grids,
            max: max,
            min: min
        };
    }


};