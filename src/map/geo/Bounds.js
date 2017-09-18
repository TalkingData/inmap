import {
    Point
} from './Point';

/**
 * @fileoverview 关于矩形地理区域类文件
 * @author jiazheng
 * @version 1.0
 */
/**
 * 矩形地理区域类;
 * @param {Point} south west 西南角，可选
 * @param {Point} north east 东北角，可选
 */
class Bounds {
    constructor(sw, ne) {
        if (sw && !ne) {
            ne = sw;
        }
        this._sw = this._ne = null;
        this._swLng = this._swLat = null;
        this._neLng = this._neLat = null;
        if (sw) {
            this._sw = new Point(sw.lng, sw.lat);
            this._ne = new Point(ne.lng, ne.lat);
            this._swLng = sw.lng;
            this._swLat = sw.lat;
            this._neLng = ne.lng;
            this._neLat = ne.lat;
        }
    }
    /**
     * 矩形是否为空，当sw或ne为空时，返回true
     * @returns Boolean
     */
    isEmpty() {
        return !this._sw || !this._ne;
    }
    /**
     * 判断矩形区域是否与其他矩形区域相等
     * @param Bounds
     */
    equals(other) {
        if (!(other instanceof Bounds) ||
            this.isEmpty()) {
            return false;
        }
        return this.getSouthWest().equals(other.getSouthWest()) && this.getNorthEast().equals(other.getNorthEast());
    }
    /**
     * 获取西南角坐标
     */
    getSouthWest() {
        return this._sw;
    }
    /**
     * 获取东北角坐标
     */
    getNorthEast() {
        return this._ne;
    }
    /**
     * 返回该区域(Bounds)是否包含指定的区域(Bounds)
     * @param {Bounds} bounds
     * @return {Boolean} 返回true.
     */
    containsBounds(bounds) {
        if (!(bounds instanceof Bounds) ||
            this.isEmpty() ||
            bounds.isEmpty()) {
            return false;
        }

        return (bounds._swLng > this._swLng && bounds._neLng < this._neLng && bounds._swLat > this._swLat && bounds._neLat < this._neLat);
    }
    /**
     * 返回该区域的中心点地理坐标
     * @return {Point} 地理点坐标对象.
     */
    getCenter() {
        if (this.isEmpty()) {
            return null;
        }
        return new Point((this._swLng + this._neLng) / 2, (this._swLat + this._neLat) / 2);
    }
    /**
     * 返回该项矩形区域与指定矩形区域的交集，不相交返回空
     * @param {Bounds} bounds 指定的地理矩形区域
     * @return {Bounds|Null} 返回相交的Bounds，否则为null.
     */
    intersects(bounds) {
        if (!(bounds instanceof Bounds)) {
            return null;
        }
        if (Math.max(bounds._swLng, bounds._neLng) < Math.min(this._swLng, this._neLng) ||
            Math.min(bounds._swLng, bounds._neLng) > Math.max(this._swLng, this._neLng) ||
            Math.max(bounds._swLat, bounds._neLat) < Math.min(this._swLat, this._neLat) ||
            Math.min(bounds._swLat, bounds._neLat) > Math.max(this._swLat, this._neLat)) {
            return null;
        }

        var newMinX = Math.max(this._swLng, bounds._swLng);
        var newMaxX = Math.min(this._neLng, bounds._neLng);
        var newMinY = Math.max(this._swLat, bounds._swLat);
        var newMaxY = Math.min(this._neLat, bounds._neLat);

        return new Bounds(new Point(newMinX, newMinY), new Point(newMaxX, newMaxY));
    }
    /**
     * 返回该区域(Bounds)是否包含指定的点(Point) ;
     * @param {Point} point 点对象
     * @return {Boolean} 布尔值,包含:true,不包含:false;.
     */
    containsPoint(point) {
        if (!(point instanceof Point) ||
            this.isEmpty()) {
            return false;
        }
        return (point.lng >= this._swLng && point.lng <= this._neLng && point.lat >= this._swLat && point.lat <= this._neLat);
    }
    /**
     * 扩展一个地理点的bounds区域
     * @param Point point点对象.
     * @return ;.
     */
    extend(point) {
        if (!(point instanceof Point)) {
            return;
        }
        var lng = point.lng,
            lat = point.lat;
        if (!this._sw) {
            this._sw = new Point(0, 0);
        }
        if (!this._ne) {
            this._ne = new Point(0, 0);
        }
        if (!this._swLng || this._swLng > lng) {
            this._sw.lng = this._swLng = lng;
        }
        if (!this._neLng || this._neLng < lng) {
            this._ne.lng = this._neLng = lng;
        }
        if (!this._swLat || this._swLat > lat) {
            this._sw.lat = this._swLat = lat;
        }
        if (!this._neLat || this._neLat < lat) {
            this._ne.lat = this._neLat = lat;
        }
    }
    /**
     * 返回地理区域跨度，用坐标表示
     * @return Point
     */
    toSpan() {
        if (this.isEmpty()) {
            return new Point(0, 0);
        }
        return new Point(Math.abs(this._neLng - this._swLng), Math.abs(this._neLat - this._swLat));
    }

}


export default Bounds;