import LabelOverlay from '../../src/overlay/LabelOverlay';

describe('LabelOverlay ', () => {
    function createOverlay() {
        return new LabelOverlay({
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
                    shadowBlur: 35, // 投影模糊级数
                    globalCompositeOperation: "lighter", // 颜色叠加方式
                    size: 5 // 半径
                },
                mouseOver: {
                    backgroundColor: "rgba(200, 200, 200, 1)",
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1
                },
                selected: {
                    borderWidth: 1,
                    backgroundColor: "rgba(184,0,0,1)",
                    borderColor: "rgba(255,255,255,1)"
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
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
                    shadowBlur: 35, // 投影模糊级数
                    globalCompositeOperation: "lighter", // 颜色叠加方式
                    size: 5 // 半径
                },
                mouseOver: {
                    backgroundColor: "rgba(200, 200, 200, 1)",
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1
                },
                selected: {
                    borderWidth: 1,
                    backgroundColor: "rgba(184,0,0,1)",
                    borderColor: "rgba(255,255,255,1)"
                }
            },
            data: data,
        });
        expect(overlay._data).to.eql(data);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle({
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
                    shadowBlur: 35, // 投影模糊级数
                    globalCompositeOperation: "lighter", // 颜色叠加方式
                    size: 5 // 半径
                },
                mouseOver: {
                    backgroundColor: "rgba(200, 200, 200, 1)",
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1
                },
                selected: {
                    borderWidth: 1,
                    backgroundColor: "rgba(184,0,0,1)",
                    borderColor: "rgba(255,255,255,1)"
                }
            },
            data: null,
        });

        expect(overlay._data).to.eql([]);
        expect(overlay._workerData).to.eql([]);

        overlay.setOptionStyle({
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
                    shadowBlur: 35, // 投影模糊级数
                    globalCompositeOperation: "lighter", // 颜色叠加方式
                    size: 5 // 半径
                },
                mouseOver: {
                    backgroundColor: "rgba(200, 200, 200, 1)",
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1
                },
                selected: {
                    borderWidth: 1,
                    backgroundColor: "rgba(184,0,0,1)",
                    borderColor: "rgba(255,255,255,1)"
                }
            },
            data: data,
        });
        overlay.setOptionStyle({
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    shadowColor: "rgba(255, 255, 255, 1)", // 投影颜色
                    shadowBlur: 35, // 投影模糊级数
                    globalCompositeOperation: "lighter", // 颜色叠加方式
                    size: 5 // 半径
                },
                mouseOver: {
                    backgroundColor: "rgba(200, 200, 200, 1)",
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1
                },
                selected: {
                    borderWidth: 1,
                    backgroundColor: "rgba(184,0,0,1)",
                    borderColor: "rgba(255,255,255,1)"
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