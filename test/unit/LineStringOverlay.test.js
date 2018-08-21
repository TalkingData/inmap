import LineStringOverlay from '../../src/overlay/LineStringOverlay';

describe('LineStringOverlay ', () => {
    function createOverlay() {
        return new LineStringOverlay({
            style: {
                normal: {
                    globalCompositeOperation: 'lighter',
                    borderColor: 'rgba(50, 50, 255, 0.8)',
                    borderWidth: 0.5,
                }
            },
            data: null,
        });
    }
    it('constructor ', () => {
        let overlay = createOverlay();
        expect(overlay.points).to.eql([]);
    });

    it('setData', () => {
        let overlay = createOverlay();
        overlay.setData(null);
        expect(overlay.points).to.eql([]);

        let data = [{
            "count": 4,
            "geometry": {
                "type": "Point",
                "coordinates": [117.306518554688, 38.5537719726562]
            }
        }];

        overlay.setData(data);
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);

        overlay.setData(undefined);
        expect(overlay.points).to.eql([]);
        expect(overlay.workerData).to.eql([]);

        overlay.setData(data);
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);


        overlay.setData(null);
        expect(overlay.points).to.eql([]);
        expect(overlay.workerData).to.eql([]);

    });

    it('setOptionStyle', () => {
        let overlay = createOverlay();

        expect(overlay.points).to.eql([]);
        expect(overlay.workerData).to.eql([]);

        let data = [{
            "count": 4,
            "geometry": {
                "type": "Point",
                "coordinates": [117.306518554688, 38.5537719726562]
            }
        }];
        overlay.setOptionStyle({
            style: {
                normal: {
                    globalCompositeOperation: 'lighter',
                    borderColor: 'rgba(50, 50, 255, 0.8)',
                    borderWidth: 0.5,
                }
            },
            data: data,
        });
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);

        overlay.setOptionStyle({
            style: {
                normal: {
                    globalCompositeOperation: 'lighter',
                    borderColor: 'rgba(50, 50, 255, 0.8)',
                    borderWidth: 0.5,
                }
            },
            data: null,
        });

        expect(overlay.points).to.eql([]);
        expect(overlay.workerData).to.eql([]);

        overlay.setOptionStyle({
            style: {
                normal: {
                    globalCompositeOperation: 'lighter',
                    borderColor: 'rgba(50, 50, 255, 0.8)',
                    borderWidth: 0.5,
                }
            },
            data: data,
        });
        overlay.setOptionStyle({
            style: {
                normal: {
                    globalCompositeOperation: 'lighter',
                    borderColor: 'rgba(50, 50, 255, 0.8)',
                    borderWidth: 0.5,
                }
            },
        });
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);
    });
});