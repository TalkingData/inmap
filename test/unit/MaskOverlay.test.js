import MaskOverlay from '../../src/overlay/MaskOverlay';

describe('MaskOverlay ', () => {
    function createOverlay() {
        return new MaskOverlay({
            style: {},
            data: null,
        });
    }
    it('constructor ', () => {
        let overlay = createOverlay();
        expect(overlay._data).to.eql([]);
    });

    it('setData', () => {
        let overlay = createOverlay();
        overlay.setData(null);
        expect(overlay._data).to.eql([]);

        let data = [{
            "name": '',
            "geometry": {
                "type": "Polygon",
                "coordinates": []
            }
        }];

        overlay.setData(data);
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);

        overlay.setData(undefined);
        expect(overlay._data).to.eql([]);
        expect(overlay._workerData).to.eql([]);

        overlay.setData(data);
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);


        overlay.setData(null);
        expect(overlay._data).to.eql([]);
        expect(overlay._workerData).to.eql([]);

    });

    it('setOptionStyle', () => {
        let overlay = createOverlay();
        expect(overlay._data).to.eql([]);
        expect(overlay._workerData).to.eql([]);

        let data = [{
            "name": "",
            "geometry": {
                "type": "Polygon",
                "coordinates": []
            }
        }];
        overlay.setOptionStyle({
            style: {},
            data: data,
        });
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle({
            style: {},
            data: null,
        });

        expect(overlay._data).to.eql([]);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle({
            style: {},
            data: data,
        });
        overlay.setOptionStyle({
            style: {},
        });
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle();
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);
    });


});