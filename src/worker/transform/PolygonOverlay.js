import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

import Point from './../../common/Point';
import Polylabel from '../../common/Polylabel';
function getGeoCenter(geo) {
    let minX = geo[0][0];
    let minY = geo[0][1];
    let maxX = geo[0][0];
    let maxY = geo[0][1];
    for (let i = 1; i < geo.length; i++) {
        minX = Math.min(minX, geo[i][0]);
        maxX = Math.max(maxX, geo[i][0]);
        minY = Math.min(minY, geo[i][1]);
        maxY = Math.max(maxY, geo[i][1]);
    }
    return { x: minX + (maxX - minX) / 2, y: minY + (maxY - minY) / 2 };

}
function transfrom(coordinates, map, pixels, labelPixels, enable, centerType) {
    for (let i = 0; i < coordinates.length; i++) {
        let geo = coordinates[i];
        let tmp = [];

        for (let k = 0; k < geo.length; k++) {
            let pixel = pointToPixelWorker(new Point(geo[k][0], geo[k][1]), map);
            tmp.push([pixel.x, pixel.y]);
        }
        pixels.push(tmp);
        if (enable && i == 0) {
            if (centerType == 'minMax') {
                labelPixels.push(getGeoCenter(tmp));
            } else if (centerType == 'cell') {
                labelPixels.push(Polylabel([tmp]));
            }
        }

    }
}
const PolygonOverlay = {
    calculatePixel: function (webObj) {
        let {
            data,
            enable,
            centerType,
            customZoom
        } = webObj.request.data;
        let map = webObj.request.map;
        if (customZoom != null) map.zoom = customZoom;
        for (let j = 0; j < data.length; j++) {
            let geometry = data[j].geometry;
            let type = geometry.type;
            let coordinates = geometry.coordinates;
            let pixels = [],
                labelPixels = [];
            if (type == 'MultiPolygon') {
                for (let k = 0; k < coordinates.length; k++) {
                    let p = [];
                    transfrom(coordinates[k], map, p, labelPixels, enable, centerType);
                    pixels.push(p);
                }
            } else {
                transfrom(coordinates, map, pixels, labelPixels, enable, centerType);
            }

            data[j].geometry['pixels'] = pixels;
            data[j].geometry['labelPixels'] = labelPixels;
        }
        webObj.request.data = data;
        return webObj;
    }

};
export default PolygonOverlay;