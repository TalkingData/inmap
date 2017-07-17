import {
    Projection
} from "./Projection";
import {
    Point
} from "./Point";
import {
    Pixel
} from "./Pixel";
export class MercatorProjection extends Projection {
    constructor() {
        super();
        this.EARTHRADIUS = 6370996.81,
            this.MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
            this.LLBAND = [75, 60, 45, 30, 15, 0],
            this.MC2LL = [
                [1.410526172116255e-008, 8.983055096488720e-006, -1.99398338163310, 2.009824383106796e+002, -1.872403703815547e+002, 91.60875166698430, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.733798120000000e+007],
                [-7.435856389565537e-009, 8.983055097726239e-006, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486000000e+007],
                [-3.030883460898826e-008, 8.983055099835780e-006, 0.30071316287616, 59.74293618442277, 7.35798407487100, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6.856817370000000e+006],
                [-1.981981304930552e-008, 8.983055099779535e-006, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4.482777060000000e+006],
                [3.091913710684370e-009, 8.983055096812155e-006, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.63218178102420, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2.555164400000000e+006],
                [2.890871144776878e-009, 8.983055095805407e-006, -0.00000003068298, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 8.260885000000000e+005]
            ],
            this.LL2MC = [
                [-0.00157021024440, 1.113207020616939e+005, 1.704480524535203e+015, -1.033898737604234e+016, 2.611266785660388e+016, -3.514966917665370e+016, 2.659570071840392e+016, -1.072501245418824e+016, 1.800819912950474e+015, 82.5],
                [8.277824516172526e-004, 1.113207020463578e+005, 6.477955746671608e+008, -4.082003173641316e+009, 1.077490566351142e+010, -1.517187553151559e+010, 1.205306533862167e+010, -5.124939663577472e+009, 9.133119359512032e+008, 67.5],
                [0.00337398766765, 1.113207020202162e+005, 4.481351045890365e+006, -2.339375119931662e+007, 7.968221547186455e+007, -1.159649932797253e+008, 9.723671115602145e+007, -4.366194633752821e+007, 8.477230501135234e+006, 52.5],
                [0.00220636496208, 1.113207020209128e+005, 5.175186112841131e+004, 3.796837749470245e+006, 9.920137397791013e+005, -1.221952217112870e+006, 1.340652697009075e+006, -6.209436990984312e+005, 1.444169293806241e+005, 37.5],
                [-3.441963504368392e-004, 1.113207020576856e+005, 2.782353980772752e+002, 2.485758690035394e+006, 6.070750963243378e+003, 5.482118345352118e+004, 9.540606633304236e+003, -2.710553267466450e+003, 1.405483844121726e+003, 22.5],
                [-3.218135878613132e-004, 1.113207020701615e+005, 0.00369383431289, 8.237256402795718e+005, 0.46104986909093, 2.351343141331292e+003, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
            ];

    }
    getDistanceByMC(point1, point2) {
        if (!point1 || !point2) return 0;
        var x1, y1, x2, y2;
        point1 = this.convertMC2LL(point1);
        if (!point1) return 0;
        x1 = this.toRadians(point1.lng);
        y1 = this.toRadians(point1.lat);
        point2 = this.convertMC2LL(point2);
        if (!point2) return 0;
        x2 = this.toRadians(point2.lng);
        y2 = this.toRadians(point2.lat);
        return this.getDistance(x1, x2, y1, y2);
    }
    /**
     * 根据经纬度坐标计算两点间距离;
     * @param {Point} point1 经纬度点坐标1
     * @param {Point} point2 经纬度点坐标2;
     * @return {Number} 返回两点间的距离
     */
    getDistanceByLL(point1, point2) {
        if (!point1 || !point2) return 0;
        point1.lng = this.getLoop(point1.lng, -180, 180);
        point1.lat = this.getRange(point1.lat, -74, 74);
        point2.lng = this.getLoop(point2.lng, -180, 180);
        point2.lat = this.getRange(point2.lat, -74, 74);
        var x1, x2, y1, y2;
        x1 = this.toRadians(point1.lng);
        y1 = this.toRadians(point1.lat);
        x2 = this.toRadians(point2.lng);
        y2 = this.toRadians(point2.lat);
        return this.getDistance(x1, x2, y1, y2);
    }
    /**
     * 平面直角坐标转换成经纬度坐标;
     * @param {Point} point 平面直角坐标
     * @return {Point} 返回经纬度坐标
     */
    convertMC2LL(point) {
        var temp, factor;
        temp = new Point(Math.abs(point.lng), Math.abs(point.lat));
        for (var i = 0; i < this.MCBAND.length; i++) {
            if (temp.lat >= this.MCBAND[i]) {
                factor = this.MC2LL[i];
                break;
            }
        };
        var lnglat = this.convertor(point, factor);
        var point = new Point(lnglat.lng.toFixed(6), lnglat.lat.toFixed(6));
        return point;
    }

    /**
     * 经纬度坐标转换成平面直角坐标;
     * @param {Point} point 经纬度坐标
     * @return {Point} 返回平面直角坐标
     */
    convertLL2MC(point) {
        var temp, factor;
        point.lng = this.getLoop(point.lng, -180, 180);
        point.lat = this.getRange(point.lat, -74, 74);
        temp = new Point(point.lng, point.lat);
        for (var i = 0; i < this.LLBAND.length; i++) {
            if (temp.lat >= this.LLBAND[i]) {
                factor = this.LL2MC[i];
                break;
            }
        }
        if (!factor) {
            for (var i = this.LLBAND.length - 1; i >= 0; i--) {
                if (temp.lat <= -this.LLBAND[i]) {
                    factor = this.LL2MC[i];
                    break;
                }
            }
        }
        var mc = this.convertor(point, factor);
        var point = new Point(mc.lng.toFixed(2), mc.lat.toFixed(2));
        return point;
    }
    convertor(fromPoint, factor) {
        if (!fromPoint || !factor) {
            return;
        }
        var x = factor[0] + factor[1] * Math.abs(fromPoint.lng);
        var temp = Math.abs(fromPoint.lat) / factor[9];
        var y = factor[2] +
            factor[3] * temp +
            factor[4] * temp * temp +
            factor[5] * temp * temp * temp +
            factor[6] * temp * temp * temp * temp +
            factor[7] * temp * temp * temp * temp * temp +
            factor[8] * temp * temp * temp * temp * temp * temp;
        x *= (fromPoint.lng < 0 ? -1 : 1);
        y *= (fromPoint.lat < 0 ? -1 : 1);
        return new Point(x, y);
    }

    getDistance(x1, x2, y1, y2) {
        return this.EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)));
    }

    toRadians(angdeg) {
        return Math.PI * angdeg / 180;
    }

    toDegrees(angrad) {
        return (180 * angrad) / Math.PI;
    }
    getRange(v, a, b) {
        if (a != null) {
            v = Math.max(v, a);
        }
        if (b != null) {
            v = Math.min(v, b);
        }
        return v
    }
    getLoop(v, a, b) {
        while (v > b) {
            v -= b - a
        }
        while (v < a) {
            v += b - a
        }
        return v;
    }

    /**
     * 经纬度变换至墨卡托坐标
     * @param Point 经纬度
     * @return Point 墨卡托
     */
    lngLatToMercator(point) {
        return this.convertLL2MC(point);
    }
    /**
     * 球面到平面坐标
     * @param Point 球面坐标
     * @return Pixel 平面坐标
     */
    lngLatToPoint(point) {
        var mercator = this.convertLL2MC(point);
        return new Pixel(mercator.lng, mercator.lat);
    }
    /**
     * 墨卡托变换至经纬度
     * @param Point 墨卡托
     * @returns Point 经纬度
     */
    mercatorToLngLat(point) {
        return this.convertMC2LL(point);
    }
    /**
     * 平面到球面坐标
     * @param Pixel 平面坐标
     * @returns Point 球面坐标
     */
    pointToLngLat(point) {
        var mercator = new Point(point.x, point.y);
        return this.convertMC2LL(mercator);
    }
    /**
     * 地理坐标转换至像素坐标
     * @param Point 地理坐标
     * @param Number 级别
     * @param Point 地图中心点，注意为了保证没有误差，这里需要传递墨卡托坐标
     * @param Size 地图容器大小
     * @return Pixel 像素坐标
     */
    pointToPixel(point, zoom, mapCenter, mapSize, curCity) {
        if (!point) {
            return;
        }
        point = this.lngLatToMercator(point, curCity);
        mapCenter = this.lngLatToMercator(mapCenter)
        var zoomUnits = this.getZoomUnits(zoom);
        var x = Math.round((point.lng - mapCenter.lng) / zoomUnits + mapSize.width / 2);
        var y = Math.round((mapCenter.lat - point.lat) / zoomUnits + mapSize.height / 2);
        return new Pixel(x, y);
    }
    /**
     * 像素坐标转换至地理坐标
     * @param Pixel 像素坐标
     * @param Number 级别
     * @param Point 地图中心点，注意为了保证没有误差，这里需要传递墨卡托坐标
     * @param Size 地图容器大小
     * @return Point 地理坐标
     */
    pixelToPoint(pixel, zoom, mapCenter, mapSize, curCity) {
        if (!pixel) {
            return;
        }
        var zoomUnits = this.getZoomUnits(zoom);
        var lng = mapCenter.lng + zoomUnits * (pixel.x - mapSize.width / 2);
        var lat = mapCenter.lat - zoomUnits * (pixel.y - mapSize.height / 2);
        var point = new Point(lng, lat);
        return this.mercatorToLngLat(point, curCity);
    }
    getZoomUnits(zoom) {
        return Math.pow(2, (18 - zoom));
    }

}