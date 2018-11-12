import {
    pointToPixelWorker
} from '../../lib/pointToPixel';
import Geohash from 'latlon-geohash';

const GeoHashOverlay = {
    encode(webObj) {
        let {
            points
        } = webObj.request.data;
        let map = webObj.request.map;

        let result = GeoHashOverlay._calculatePixel(map, points);
        // let result = GeoHashOverlay.recGrids(points, map, nwMc, size, zoomUnit, mapSize, type);
        webObj.request.data = result;
        return webObj;
    },
    _calculatePixel(map, data) {
        for (let j = 0, len = data.length; j < len; j++) {
            let item = data[j];
            if (!item.coordinates) {
                let lnglat = Geohash.decode(item.geohash);
                item.coordinates = [lnglat.lng, lnglat.lat];
            }
            item['pixel'] = pointToPixelWorker({
                lng: item.coordinates[0],
                lat: item.coordinates[1]
            }, map);

            if (data[j].count == null) {
                throw new TypeError('inMap.GeoHashOverlay: data is Invalid format ');
            }

        }
        return data;
    },

   
};
export default GeoHashOverlay;