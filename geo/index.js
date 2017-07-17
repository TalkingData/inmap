import {
    geo
} from "./geo.js";
import {
    isArray
} from "./../common/util"
export function pointToPixel(point, map) {
    var zoom = map.getZoom();
    var center = map.getCenter();
    var size = map.getSize()
    return geo.pointToPixel(point, zoom, center, size)
}

export function pointsToPixels(points, map) {
    var data = points;
    points = isArray(data) ? data : data.request.data;
    map = map || data.request.map;
    var pixels = [];
    for (var i = 0, len = points.length; i < len; i++) {
        pixels.push(pointToPixel(points[i], map));
    }
    return pixels;
}

export function pointToPixelWorker(point, map) {
    var zoom = map.zoom;
    var center = map.center;
    var size = map.size;
    return geo.pointToPixel(point, zoom, center, size)
}

export function pointsToPixelsWoker(points, map) {
    var data = points;
    points = isArray(data) ? data : data.request.data;
    map = map || data.request.map;
    var pixels = [];
    for (var i = 0, len = points.length; i < len; i++) {
        pixels.push(pointToPixelWorker(points[i], map));
    }
    return pixels;
};