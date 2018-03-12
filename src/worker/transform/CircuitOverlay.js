
export let CircuitOverlay = {
    transferCoordinate(_coordinates, nwMc, zoomUnit) {
        return _coordinates.map(function (item) {
            let x = (item[0] - nwMc.x) / zoomUnit;
            let y = (nwMc.y - item[1]) / zoomUnit;
            return [x, y];
        });
    },
    calculatePixel: function (webObj) {
        let data = webObj,
            points = data.request.data.points,
            zoomUnit = data.request.data.zoomUnit,
            nwMc = data.request.data.nwMc;

        for (let j = 0; j < points.length; j++) {
            let item = points[j];
            item['pixels'] = CircuitOverlay.transferCoordinate(item._coordinates, nwMc, zoomUnit);
        }
        return {
            data: points,
            client: webObj
        };
    }
};