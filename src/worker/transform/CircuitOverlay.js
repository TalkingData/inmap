import {
    isArray
} from "./../../common/util";

import {
    pointToPixelWorker
} from "../../geo/index";
import {
    Point
} from "./../../geo/Point";

export let CircuitOverlay = {
    transferCoordinate(_coordinates, nwMc, zoomUnit) {
        let map = this.map;
        return _coordinates.map(function (item) {
            // debugger
            var x = (item[0] - nwMc.x) / zoomUnit;
            var y = (nwMc.y - item[1]) / zoomUnit;
            return [x, y];
        });
    },
    calculatePixel: function (webObj) {
        // let data = webObj,
        //     points = isArray(data) ? data : data.request.data,
        //     map = data.request.map;

        let data = webObj,
            points = data.request.data.points,
            zoomUnit = data.request.data.zoomUnit,
            nwMc = data.request.data.nwMc,
            map = data.request.map;

        // CircuitOverlay.transferCoordinate(points, nwMc, zoomUnit);
        for (let j = 0; j < points.length; j++) {
            let item = points[j];
            // let coordinates = item._coordinates;
            item['pixels'] = CircuitOverlay.transferCoordinate(item._coordinates, nwMc, zoomUnit);
        }

        // debugger
        // for (let j = 0; j < points.length; j++) {
        //     if (points[j].geo) {
        //         let tmp = [];
        //         for (let i = 0; i < points[j].geo.length; i++) {
        //             let pixel = pointToPixelWorker(new Point(points[j].geo[i][0], points[j].geo[i][1]), map);
        //             tmp.push([pixel.x, pixel.y, parseFloat(points[j].geo[i][2])]);
        //         }
        //         points[j].pgeo = tmp;

        //     }
        // }

        return {
            data: points,
            client: webObj
        }
    }
}