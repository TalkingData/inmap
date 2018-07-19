import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

const HoneycombOverlay = {
    toRecGrids: function (webObj) {
        let {
            points,
            zoomUnit,
            size,
            mapSize,
            nwMc,
            type
        } = webObj.request.data;
        let map = webObj.request.map;
        HoneycombOverlay._calculatePixel(map, points);
        let gridsObj = HoneycombOverlay.honeycombGrid(points, map, nwMc, size, zoomUnit, mapSize, type);
        webObj.request.data = gridsObj;
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
    honeycombGrid: function (data, map, nwMc, size, zoomUnit, mapSize, type) {
        if (data.length <= 0) {
            return {
                grids: []
            };
        }

        let grids = {};
        let gridStep = parseInt(Math.round(size / zoomUnit), 10);
        let depthX = gridStep;
        let depthY = parseInt(gridStep * 3 / 4, 10);
        let sizeY = 2 * size * 3 / 4;
        let startYMc = parseInt(nwMc.y / sizeY + 1, 10) * sizeY;
        let startY = parseInt((nwMc.y - startYMc) / zoomUnit, 10);
        startY = parseInt(startY, 10);
        let startXMc = parseInt(nwMc.x / size, 10) * size;
        let startX = (startXMc - nwMc.x) / zoomUnit;
        startX = parseInt(startX, 10);

        let endX = parseInt(mapSize.width + depthX, 10);
        let endY = parseInt(mapSize.height + depthY, 10);

        let pointX = startX;
        let pointY = parseInt(startY, 10);

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

        for (let i = 0; i < data.length; i++) {

            let item = data[i];
            let pX = item.geometry.pixel.x;
            let pY = item.geometry.pixel.y;
            if (pX >= startX && pX <= endX && pY >= startY && pY <= endY) {

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
                let key = parseInt(fixX, 10) + '|' + parseInt(fixY, 10);
                if (grids[key]) {

                    grids[key].list.push(item);
                    grids[key].count += item.count;
                }
            }

        }


        let result = [];
        for (let key in grids) {
            let item = grids[key];
            if (type == 'avg' && item.count > 0) {
                item.count = item.count / item.list.length;
            }
            if (item.list.length > 0) {
                result.push(item);
            }
        }
        grids = null, data = null;
        return {
            grids: result,
        };
    }
};
export default HoneycombOverlay;