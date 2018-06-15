import {
    geo
} from '../../lib/pointToPixel';
import {
    getPointList,
    lineCurive
} from './../../common/Curive';
export let LineStringOverlay = {
    transferCoordinate(_coordinates, nwMc, zoomUnit) {
        return _coordinates.map(function (item) {
            let x = (item[0] - nwMc.x) / zoomUnit;
            let y = (nwMc.y - item[1]) / zoomUnit;
            return [x, y];
        });
    },
    calculatePixel: function (webObj) {
        let {
            points,
            zoomUnit,
            nwMc,
            isAnimation,
            lineOrCurve,
            deltaAngle

        } = webObj.request.data;
        if (isAnimation) {
            if (lineOrCurve == 'line') {
                LineStringOverlay.setLineCurive(points, zoomUnit, nwMc,deltaAngle);
            } else if (lineOrCurve == 'curve') {
                LineStringOverlay.setCurive(points, zoomUnit, nwMc, deltaAngle);

            }

        } else {
            LineStringOverlay.transfrom(points, zoomUnit, nwMc);
        }
        webObj.request.data = points;
        console.log(points);
        return webObj;
    },
    setCurive(points, zoomUnit, nwMc, deltaAngle) {
        for (let j = 0; j < points.length; j++) {
            let item = points[j];
            if (!item.geometry.medianCoordinates) {
                item.geometry['medianCoordinates'] = item.geometry.coordinates.map(function (item) {
                    let pixel = geo.projection.lngLatToPoint({
                        lng: item[0],
                        lat: item[1]
                    });
                    return [pixel.x, pixel.y];
                });
            }
            let lngLat1 = item.geometry['medianCoordinates'][0];
            let lngLat2 = item.geometry['medianCoordinates'][1];
            let x1 = (lngLat1[0] - nwMc.x) / zoomUnit;
            let y1 = (nwMc.y - lngLat1[1]) / zoomUnit;

            let x2 = (lngLat2[0] - nwMc.x) / zoomUnit;
            let y2 = (nwMc.y - lngLat2[1]) / zoomUnit;
            item.geometry['pixels'] = getPointList([x1, y1], [x2, y2], deltaAngle);
        }
    },
    setLineCurive(points, zoomUnit, nwMc,n) {
        for (let j = 0; j < points.length; j++) {
            let item = points[j];
            if (!item.geometry.animationCoordinates) {
                item.geometry['animationCoordinates'] = lineCurive(item.geometry.coordinates[0], item.geometry.coordinates[1],n);
            }
            if (!item.geometry.animationMedianCoordinates) {
                item.geometry['animationMedianCoordinates'] = item.geometry.animationCoordinates.map(function (item) {
                    let pixel = geo.projection.lngLatToPoint({
                        lng: item[0],
                        lat: item[1]
                    });
                    return [pixel.x, pixel.y];
                });
            }
            item.geometry['pixels'] = item.geometry['animationMedianCoordinates'].map(function (item) {
                let x = (item[0] - nwMc.x) / zoomUnit;
                let y = (nwMc.y - item[1]) / zoomUnit;
                return [x, y];
            });
        }
    },
    transfrom(points, zoomUnit, nwMc) {
        for (let j = 0; j < points.length; j++) {
            let item = points[j];
            if (!item.geometry.medianCoordinates) {
                item.geometry['medianCoordinates'] = item.geometry.coordinates.map(function (item) {
                    let pixel = geo.projection.lngLatToPoint({
                        lng: item[0],
                        lat: item[1]
                    });
                    return [pixel.x, pixel.y];
                });
            }
            item.geometry['pixels'] = item.geometry['medianCoordinates'].map(function (item) {
                let x = (item[0] - nwMc.x) / zoomUnit;
                let y = (nwMc.y - item[1]) / zoomUnit;
                return [x, y];
            });
        }
    }
};