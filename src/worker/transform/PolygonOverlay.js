import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

import Point from './../../common/Point';
import polylabel from './../../common/polylabel';
const PolygonOverlay = {
    calculatePixel: function (webObj) {
        let {
            data,
        } = webObj.request.data;
        let map = webObj.request.map;
        for (let j = 0; j < data.length; j++) {
            let coordinates = data[j].geometry.coordinates;
            let pixels = [],
                labelPixels = [];
            for (let i = 0; i < coordinates.length; i++) {
                let geo = coordinates[i];
                let tmp = [];
                for (let k = 0; k < geo.length; k++) {
                    let pixel = pointToPixelWorker(new Point(geo[k][0], geo[k][1]), map);
                    tmp.push([pixel.x, pixel.y]);
                }
                pixels.push(tmp);
                labelPixels.push(polylabel([tmp]));

            }
            data[j].geometry['pixels'] = pixels;

            data[j].geometry['labelPixels'] = labelPixels;

        }
        webObj.request.data = data;
        return webObj;
    }
};
export default PolygonOverlay;