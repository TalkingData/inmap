import ImgOverlay from '../../src/overlay/ImgOverlay';

describe('ImgOverlay ', () => {
    function createOverlay() {
        return new ImgOverlay({
            tooltip: {
                show: true,
                formatter: "'降雨量：'+{count}"
            },
            style: {
                normal: {
                    icon: new Image(),
                    width: 8,
                    height: 8,
                    offsets: {
                        top: "-100%",
                        left: "-50%"
                    }
                }
            },
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
            "count": 4,
            "geometry": {
                "type": "Point",
                "coordinates": [117.306518554688, 38.5537719726562]
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
            "count": 4,
            "geometry": {
                "type": "Point",
                "coordinates": [117.306518554688, 38.5537719726562]
            }
        }];
        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "'降雨量：'+{count}"
            },
            style: {
                normal: {
                    icon: new Image(),
                    width: 8,
                    height: 8,
                    offsets: {
                        top: "-100%",
                        left: "-50%"
                    }
                }
            },
            data:data
        });
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "'降雨量：'+{count}"
            },
            style: {
                normal: {
                    icon: new Image(),
                    width: 8,
                    height: 8,
                    offsets: {
                        top: "-100%",
                        left: "-50%"
                    }
                }
            },
            data: null,
        });

        expect(overlay._data).to.eql([]);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "'降雨量：'+{count}"
            },
            style: {
                normal: {
                    icon: new Image(),
                    width: 8,
                    height: 8,
                    offsets: {
                        top: "-100%",
                        left: "-50%"
                    }
                }
            },
            data: data,
        });
        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "'降雨量：'+{count}"
            },
            style: {
                normal: {
                    icon: new Image(),
                    width: 8,
                    height: 8,
                    offsets: {
                        top: "-100%",
                        left: "-50%"
                    }
                }
            },
        });
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle();
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);
    });


});