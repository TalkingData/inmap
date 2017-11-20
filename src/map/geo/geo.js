import {
    MercatorProjection
} from './MercatorProjection';

export var geo = {
    pointToPixel(point, zoom, center, size) {
        return this.projection.pointToPixel(point, zoom, center, size);
    },

    pixelToPoint(piexl) {

    }
    /**
     * 经纬度变换至墨卡托坐标
     * @param Point 经纬度
     * @return Point 墨卡托
     */
    ,
    lngLatToMercator() {
        return this.projection.convertLL2MC(point);
    },
    projection: new MercatorProjection()
};


