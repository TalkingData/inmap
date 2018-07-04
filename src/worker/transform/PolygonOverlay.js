import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

import Point from './../../common/Point';
import polylabel from './../../common/polylabel';

function transfrom(coordinates, map, pixels, labelPixels) {
    for (let i = 0; i < coordinates.length; i++) {
        let geo = coordinates[i];
        let tmp = [];
        for (let k = 0; k < geo.length; k++) {
            let pixel = pointToPixelWorker(new Point(geo[k][0], geo[k][1]), map);
            tmp.push([pixel.x, pixel.y]);
        }
        pixels.push(tmp);
        if (i == 0) {
            labelPixels.push(polylabel([tmp]));
        }

    }
}
const PolygonOverlay = {
    calculatePixel: function (webObj) {
        let {
            data,
        } = webObj.request.data;
        let map = webObj.request.map;
        for (let j = 0; j < data.length; j++) {
            let geometry = data[j].geometry;
            let type = geometry.type;
            let coordinates = geometry.coordinates;
            let pixels = [],
                labelPixels = [];
            if (type == 'MultiPolygon') {
                for (let k = 0; k < coordinates.length; k++) {
                    let p = [];
                    transfrom(coordinates[k], map, p, labelPixels);
                    pixels.push(p);
                }
            } else {
                transfrom(coordinates, map, pixels, labelPixels);
            }

            data[j].geometry['pixels'] = pixels;
            data[j].geometry['labelPixels'] = labelPixels;
        }
        webObj.request.data = data;
        return webObj;
    }

};
export default PolygonOverlay;