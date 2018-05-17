import {
    pointToPixelWorker
} from '../../lib/pointToPixel';

import {
    Point
} from './../../common/Point';
import polylabel from './../../common/polylabel';
export let BoundaryOverlay = {
    calculatePixel: function (webObj) {
        let {
            data,
            labelShow,
        } = webObj.request.data;
        let map = webObj.request.map;

        for (let j = 0; j < data.length; j++) {
            if (data[j].geo) {
                let tmp = [];
                for (let i = 0; i < data[j].geo.length; i++) {
                    let pixel = pointToPixelWorker(new Point(data[j].geo[i][0], data[j].geo[i][1]), map);
                    tmp.push([pixel.x, pixel.y]);
                }
                data[j].pixels = tmp;
                if (labelShow) {
                    let bestCell = polylabel([tmp]);
                    data[j]['bestCell'] = bestCell;
                }
            }
        }
        webObj.request.data = data;
        return webObj;
    }
};