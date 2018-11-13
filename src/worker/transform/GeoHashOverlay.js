import {
    pointToPixelWorker
} from '../../lib/pointToPixel';
import Geohash from 'latlon-geohash';
import Coordtransform from 'coordtransform';
const GeoHashOverlay = {
    encode(webObj) {
        let {
            points
        } = webObj.request.data;
        let map = webObj.request.map;

        let result = GeoHashOverlay._calculatePixel(map, points);
        webObj.request.data = result;
        return webObj;
    },
    _calculatePixel(map, data) {
        for (let j = 0, len = data.length; j < len; j++) {
            let item = data[j];
            if (!item.coordinates) {
                let lnglat = Geohash.decode(item.geohash);
                let wgs84togcj02 = Coordtransform.wgs84togcj02(lnglat.lon, lnglat.lat);
                item.coordinates = Coordtransform.gcj02tobd09(wgs84togcj02[0], wgs84togcj02[1]);
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