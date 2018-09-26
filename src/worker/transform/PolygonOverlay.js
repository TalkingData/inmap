import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

import Point from './../../common/Point';
import Polylabel from '../../common/Polylabel';

function transfrom(coordinates, map, pixels, labelPixels, enable) {
    for (let i = 0; i < coordinates.length; i++) {
        let geo = coordinates[i];
        let tmp = [];
        for (let k = 0; k < geo.length; k++) {
            let pixel = pointToPixelWorker(new Point(geo[k][0], geo[k][1]), map);
            tmp.push([pixel.x, pixel.y]);
        }
        pixels.push(tmp);
        if (enable && i == 0) {
            labelPixels.push(Polylabel([tmp]));
        }

    }
}
const PolygonOverlay = {
    calculatePixel: function (webObj) {
        let {
            data,
            enable
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
                    transfrom(coordinates[k], map, p, labelPixels, enable);
                    pixels.push(p);
                }
            } else {
                transfrom(coordinates, map, pixels, labelPixels, enable);
            }

            data[j].geometry['pixels'] = pixels;
            data[j].geometry['labelPixels'] = labelPixels;
        }
        webObj.request.data = data;
        return webObj;
    }

};
export default PolygonOverlay;