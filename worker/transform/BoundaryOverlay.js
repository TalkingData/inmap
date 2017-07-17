import {
    isArray
} from "./../../common/util";

import {
    pointToPixelWorker
} from "../../geo/index";
import {
    Point
} from "./../../geo/Point";
export let BoundaryOverlay = {
    calculatePixel: function (webObj) {
        let data = webObj,
            points = isArray(data) ? data : data.request.data,
            map = data.request.map;

        for (let j = 0; j < points.length; j++) {
            if (points[j].geo) {
                let tmp = [];
                for (let i = 0; i < points[j].geo.length; i++) {
                    let pixel = pointToPixelWorker(new Point(points[j].geo[i][0], points[j].geo[i][1]), map);
                    tmp.push([pixel.x, pixel.y, parseFloat(points[j].geo[i][2])]);
                }
                points[j].pgeo = tmp;
            }
        }

        return {
            data: points,
            client: webObj
        }
    }
}