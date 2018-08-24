import MoveLineOverlay from '../../src/overlay/MoveLineOverlay';

describe('MoveLineOverlay ', () => {
            function createOverlay() {
                return new MoveLineOverlay({
                    style: {
                        point: { //散点配置
                            tooltip: {
                                show: true,
                                formatter: "{name}"
                            },
                            style: {
                                normal: {
                                    backgroundColor: 'rgba(200, 200, 50, 1)',
                                    borderWidth: 1,
                                    borderColor: "rgba(255,255,255,1)",
                                    size: 6,
                                    label: {
                                        show: true,
                                        color: 'rgba(255,255,255,1)'

                                    },
                                },
                                mouseOver: {
                                    backgroundColor: 'rgba(200, 200, 200, 1)',
                                    borderColor: "rgba(255,255,255,1)",
                                    borderWidth: 4,
                                },
                                selected: {
                                    backgroundColor: 'rgba(184,0,0,1)',
                                    borderColor: "rgba(255,255,255,1)"
                                },
                            }
                        },
                        line: { //线的配置
                            style: {
                                normal: {
                                    borderColor: 'rgba(200, 200, 50, 1)',
                                    borderWidth: 1,
                                    // shadowColor: 'rgba(255, 250, 50, 1)',
                                    // shadowBlur: 20,
                                    lineCurive: "curve"
                                }
                            }
                        },
                        lineAnimation: {
                            style: {
                                size: 2,
                                //移动点颜色
                                fillColor: '#fff',
                                //移动点阴影颜色
                                shadowColor: '#fff',
                                //移动点阴影大小
                                shadowBlur: 10,
                                lineOrCurve: 'curve',
                            }

                        },
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
                    "from": {
                        "name": "广州",
                        "coordinates": [113.270793, 23.135308]
                    },
                    "to": {
                        "name": "衡山",
                        "coordinates": [112.612787, 27.317599]
                    },
                    "count": 1
                }];
                overlay.setData(data);
                expect(overlay._data).to.eql(data);


                overlay.setData(undefined);
                expect(overlay._data).to.eql([]);


                overlay.setData(data);
                expect(overlay._data).to.eql(data);


                overlay.setData(null);
                expect(overlay._data).to.eql([]);


            });

            it('setOptionStyle', () => {
                    let overlay = createOverlay();

                    expect(overlay._data).to.eql([]);

                    let data = 
                        [{
                            "from": {
                                "name": "广州",
                                "coordinates": [113.270793, 23.135308]
                            },
                            "to": {
                                "name": "衡山",
                                "coordinates": [112.612787, 27.317599]
                            },
                            "count": 1
                        }];
                        overlay.setOptionStyle({
                            style: {
                                point: { //散点配置
                                    tooltip: {
                                        show: true,
                                        formatter: "{name}"
                                    },
                                    style: {
                                        normal: {
                                            backgroundColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,1)",
                                            size: 6,
                                            label: {
                                                show: true,
                                                color: 'rgba(255,255,255,1)'

                                            },
                                        },
                                        mouseOver: {
                                            backgroundColor: 'rgba(200, 200, 200, 1)',
                                            borderColor: "rgba(255,255,255,1)",
                                            borderWidth: 4,
                                        },
                                        selected: {
                                            backgroundColor: 'rgba(184,0,0,1)',
                                            borderColor: "rgba(255,255,255,1)"
                                        },
                                    },

                                },
                                line: { //线的配置
                                    style: {
                                        normal: {
                                            borderColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            // shadowColor: 'rgba(255, 250, 50, 1)',
                                            // shadowBlur: 20,
                                            lineCurive: "curve"
                                        }
                                    }
                                },
                                lineAnimation: {
                                    style: {
                                        size: 2,
                                        //移动点颜色
                                        fillColor: '#fff',
                                        //移动点阴影颜色
                                        shadowColor: '#fff',
                                        //移动点阴影大小
                                        shadowBlur: 10,
                                        lineOrCurve: 'curve',
                                    }

                                },
                            },
                            data: data,
                        });
                        expect(overlay._data).to.eql(data);

                        overlay.setOptionStyle({
                            style: {
                                point: { //散点配置
                                    tooltip: {
                                        show: true,
                                        formatter: "{name}"
                                    },
                                    style: {
                                        normal: {
                                            backgroundColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,1)",
                                            size: 6,
                                            label: {
                                                show: true,
                                                color: 'rgba(255,255,255,1)'

                                            },
                                        },
                                        mouseOver: {
                                            backgroundColor: 'rgba(200, 200, 200, 1)',
                                            borderColor: "rgba(255,255,255,1)",
                                            borderWidth: 4,
                                        },
                                        selected: {
                                            backgroundColor: 'rgba(184,0,0,1)',
                                            borderColor: "rgba(255,255,255,1)"
                                        },
                                    }
                                },
                                line: { //线的配置
                                    style: {
                                        normal: {
                                            borderColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            // shadowColor: 'rgba(255, 250, 50, 1)',
                                            // shadowBlur: 20,
                                            lineCurive: "curve"
                                        }
                                    }
                                },
                                lineAnimation: {
                                    style: {
                                        size: 2,
                                        //移动点颜色
                                        fillColor: '#fff',
                                        //移动点阴影颜色
                                        shadowColor: '#fff',
                                        //移动点阴影大小
                                        shadowBlur: 10,
                                        lineOrCurve: 'curve',
                                    }

                                },
                            },
                            data: null,
                        });

                        expect(overlay._data).to.eql([]);


                        overlay.setOptionStyle({
                            style: {
                                point: { //散点配置
                                    tooltip: {
                                        show: true,
                                        formatter: "{name}"
                                    },
                                    style: {
                                        normal: {
                                            backgroundColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,1)",
                                            size: 6,
                                            label: {
                                                show: true,
                                                color: 'rgba(255,255,255,1)'

                                            },
                                        },
                                        mouseOver: {
                                            backgroundColor: 'rgba(200, 200, 200, 1)',
                                            borderColor: "rgba(255,255,255,1)",
                                            borderWidth: 4,
                                        },
                                        selected: {
                                            backgroundColor: 'rgba(184,0,0,1)',
                                            borderColor: "rgba(255,255,255,1)"
                                        },
                                    }
                                },
                                line: { //线的配置
                                    style: {
                                        normal: {
                                            borderColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            // shadowColor: 'rgba(255, 250, 50, 1)',
                                            // shadowBlur: 20,
                                            lineCurive: "curve"
                                        }
                                    }
                                },
                                lineAnimation: {
                                    style: {
                                        size: 2,
                                        //移动点颜色
                                        fillColor: '#fff',
                                        //移动点阴影颜色
                                        shadowColor: '#fff',
                                        //移动点阴影大小
                                        shadowBlur: 10,
                                        lineOrCurve: 'curve',
                                    }

                                },
                            },
                            data: data,
                        });
                        overlay.setOptionStyle({
                            style: {
                                point: { //散点配置
                                    tooltip: {
                                        show: true,
                                        formatter: "{name}"
                                    },
                                    style: {
                                        normal: {
                                            backgroundColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,1)",
                                            size: 6,
                                            label: {
                                                show: true,
                                                color: 'rgba(255,255,255,1)'

                                            },
                                        },
                                        mouseOver: {
                                            backgroundColor: 'rgba(200, 200, 200, 1)',
                                            borderColor: "rgba(255,255,255,1)",
                                            borderWidth: 4,
                                        },
                                        selected: {
                                            backgroundColor: 'rgba(184,0,0,1)',
                                            borderColor: "rgba(255,255,255,1)"
                                        },
                                    }
                                },
                                line: { //线的配置
                                    style: {
                                        normal: {
                                            borderColor: 'rgba(200, 200, 50, 1)',
                                            borderWidth: 1,
                                            // shadowColor: 'rgba(255, 250, 50, 1)',
                                            // shadowBlur: 20,
                                            lineCurive: "curve"
                                        }
                                    }
                                },
                                lineAnimation: {
                                    style: {
                                        size: 2,
                                        //移动点颜色
                                        fillColor: '#fff',
                                        //移动点阴影颜色
                                        shadowColor: '#fff',
                                        //移动点阴影大小
                                        shadowBlur: 10,
                                        lineOrCurve: 'curve',
                                    }

                                },
                            },
                        });
                        expect(overlay._data).to.eql(data);

                        overlay.setOptionStyle();
                        expect(overlay._data).to.eql(data);
                        

                    });
            });