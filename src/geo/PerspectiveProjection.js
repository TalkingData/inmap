import {
    MercatorProjection
} from './MercatorProjection';
import {
    Point
} from './Point';
import {
    Pixel 
} from './Pixel';

/**
 * 透视图投影
 */
export class PerspectiveProjection extends MercatorProjection {
    lngLatToMercator(lngLat, mapCity) {
        return this._convert2DTo3D(mapCity, this.convertLL2MC(lngLat));
    }
    mercatorToLngLat(mercator, mapCity) {
        return this.convertMC2LL(this._convert3DTo2D(mapCity, mercator));
    }
    lngLatToPoint(lngLat, mapCity) {
        var mercator = this._convert2DTo3D(mapCity, this.convertLL2MC(lngLat));
        return new Pixel(mercator.lng, mercator.lat);
    }
    pointToLngLat(point, mapCity) {
        var mercator = new Point(point.x, point.y);
        return this.convertMC2LL(this._convert3DTo2D(mapCity, mercator));
    }
   
    getZoomUnits(zoom) {
        return Math.pow(2, (20 - zoom));
    }
}