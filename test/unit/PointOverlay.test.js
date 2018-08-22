import PointOverlay from '../../src/overlay/PointOverlay';

describe('PointOverlay ', () => {
    function createOverlay() {
        return new PointOverlay({
            tooltip: {
                show: true,
                formatter: "{count}"
            },
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1,
                    size: 5 // 半径
                },
                colors: [
                    "rgba(156,200,249,0.7)",
                    "rgba(93,158,247,0.7)",
                    "rgba(134,207,55,0.7)",
                    "rgba(252,198,10,0.7)",
                    "rgba(255,144,0,0.7)",
                    "rgba(255,72,0,0.7)",
                    "rgba(255,0,0,0.7)"
                ],
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
            legend: {
                show: true,
                title: "标题"
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
            tooltip: {
                show: true,
                formatter: "{count}"
            },
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1,
                    size: 5 // 半径
                },
                colors: [
                    "rgba(156,200,249,0.7)",
                    "rgba(93,158,247,0.7)",
                    "rgba(134,207,55,0.7)",
                    "rgba(252,198,10,0.7)",
                    "rgba(255,144,0,0.7)",
                    "rgba(255,72,0,0.7)",
                    "rgba(255,0,0,0.7)"
                ],
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
            legend: {
                show: true,
                title: "标题"
            },
            data: data
        });
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);

        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "{count}"
            },
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1,
                    size: 5 // 半径
                },
                colors: [
                    "rgba(156,200,249,0.7)",
                    "rgba(93,158,247,0.7)",
                    "rgba(134,207,55,0.7)",
                    "rgba(252,198,10,0.7)",
                    "rgba(255,144,0,0.7)",
                    "rgba(255,72,0,0.7)",
                    "rgba(255,0,0,0.7)"
                ],
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
            legend: {
                show: true,
                title: "标题"
            },
            data: null,
        });

        expect(overlay.points).to.eql([]);
        expect(overlay.workerData).to.eql([]);

        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "{count}"
            },
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1,
                    size: 5 // 半径
                },
                colors: [
                    "rgba(156,200,249,0.7)",
                    "rgba(93,158,247,0.7)",
                    "rgba(134,207,55,0.7)",
                    "rgba(252,198,10,0.7)",
                    "rgba(255,144,0,0.7)",
                    "rgba(255,72,0,0.7)",
                    "rgba(255,0,0,0.7)"
                ],
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
            legend: {
                show: true,
                title: "标题"
            },
            data: data,
        });
        overlay.setOptionStyle({
            tooltip: {
                show: true,
                formatter: "{count}"
            },
            style: {
                normal: {
                    backgroundColor: "rgba(200, 200, 50, 1)", // 填充颜色
                    borderColor: "rgba(255,255,255,1)",
                    borderWidth: 1,
                    size: 5 // 半径
                },
                colors: [
                    "rgba(156,200,249,0.7)",
                    "rgba(93,158,247,0.7)",
                    "rgba(134,207,55,0.7)",
                    "rgba(252,198,10,0.7)",
                    "rgba(255,144,0,0.7)",
                    "rgba(255,72,0,0.7)",
                    "rgba(255,0,0,0.7)"
                ],
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
            legend: {
                show: true,
                title: "标题"
            },
        });
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);

        overlay.setOptionStyle();
        expect(overlay.points).to.eql(data);
        expect(overlay.workerData).to.eql([]);
    });


});