import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

export const HeatOverlay = {
    pointsToPixels: function (webObj) {
        webObj.request.data.forEach((val) => {
            let point = val.geometry.coordinates;
            val.geometry['pixel'] = pointToPixelWorker({
                lng: point[0],
                lat: point[1]
            }, webObj.request.map);
            point = null;
        });
        return webObj;
    }
};