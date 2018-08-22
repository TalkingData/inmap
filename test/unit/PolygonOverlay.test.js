import PolygonOverlay from '../../src/overlay/PolygonOverlay';

describe('PolygonOverlay ', () => {
    function createOverlay() {
        return new PolygonOverlay({
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
        expect(overlay.points).to.eql([]);
    });

    it('setData', () => {
        let overlay = createOverlay();
        overlay.setData(null);
        expect(overlay.points).to.eql([]);

        let data = [{
            name: "",
            count: 30, //权重
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [ //外环
                        [123, 23], 
                        [123, 23], 
                        [123, 23]
                    ],
                    [ //内环
                        [124, 21], 
                        [124, 21], 
                        [124, 21]
                    ]
                ]
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
            name: "",
            count: 30, //权重
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [ //外环
                        [123, 23], 
                        [123, 23], 
                        [123, 23]
                    ],
                    [ //内环
                        [124, 21], 
                        [124, 21], 
                        [124, 21]
                    ]
                ]
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
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);

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

        expect(overlay.points).to.eql([]);
        expect(overlay.workerData).to.eql([]);

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
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);
    });


});