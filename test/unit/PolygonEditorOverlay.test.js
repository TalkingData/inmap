import PolygonEditorOverlay from '../../src/overlay/PolygonEditorOverlay/index';


describe('PolygonEditorOverlay ', () => {
    function createOverlay() {
        return new PolygonEditorOverlay({
            style: {
                isEdit: true,
                point: {
                    normal: {
                        backgroundColor: "rgba(93,158,247,0.7)", // 填充颜色
                        size: 6, // 半径
                    },
                    mouseOver: {
                        backgroundColor: "rgba(93,158,247,1)",
                        borderColor: "rgba(93,158,247,1)",
                        borderWidth: 1
                    },
                    selected: {
                        borderWidth: 1,
                        backgroundColor: "rgba(184,0,0,1)",
                    }

                },
                virtualPoint: {
                    normal: {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 1,
                        borderColor: "rgba(0,131,238, 1)",
                        size: 6,
                    },
                    mouseOver: {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 2
                    },

                },
                polygon: {
                    normal: {
                        borderWidth: 1.5,
                        backgroundColor: "rgba(0,184,255,0.3)"
                    }
                }
            },
            data: null,
            event: {
                onCreated(event) {
                    console.log('onCreate', event);
                },
                onChange(type, event) {
                    console.log('onChange', type, event);
                },
                onDelete(event) {
                    console.log('onDelete', event);
                }
            }
        });
    }
    let data = {
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
                [
                    [
                        [
                            101.539687,
                            44.251911
                        ],
                        [
                            95.652552,
                            36.082425
                        ],
                        [
                            104.188897,
                            33.348369
                        ],
                        [
                            117.802897,
                            35.422551
                        ],
                        [
                            116.404702,
                            41.325844
                        ]
                    ],
                    [
                        [
                            104.924789,
                            39.867432
                        ],
                        [
                            103.08506,
                            35.060298
                        ],
                        [
                            110.811924,
                            35.843109
                        ],
                        [
                            109.855265,
                            40.093888
                        ],
                        [
                            109.781676,
                            40.093888
                        ]
                    ]
                ]
            ]
        }
    };

    it('setPath function ', () => {
        let overlay = createOverlay();
        overlay.setPath(data);
        let result = overlay._opts.data;
        expect(result).to.eql(data);
    });

    it('create function ', () => {
        let overlay = createOverlay();
        overlay.create();
    });

    it('getPath function', () => {
        let overlay = createOverlay();
        overlay.setPath(null);
        expect(null).to.eql(overlay.getPath());

    });
    it('enableEditing function', () => {
        let overlay = createOverlay();
        overlay.enableEditing();
        expect(overlay.isCreate).to.eql(false);
        expect(overlay._opts.style.isEdit).to.eql(true);
    });

    it('disableEditing function', () => {
        let overlay = createOverlay();
        overlay.disableEditing();
        expect(overlay.isCreate).to.eql(false);
        expect(overlay._opts.style.isEdit).to.eql(false);
    });

    it('setOptionStyle function set data null', () => {
        let overlay = createOverlay();
        overlay.setPath(data);
        let option = {
            style: {
                isEdit: true,
                polygon: {
                    normal: {
                        backgroundColor: "rgba(155,155,155,0.7)", // 填充颜色
                    },
                }
            },
            data: {
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [
                                    101.539687,
                                    44.251911
                                ],
                                [
                                    95.652552,
                                    36.082425
                                ],
                                [
                                    104.188897,
                                    33.348369
                                ],
                                [
                                    117.802897,
                                    35.422551
                                ],
                                [
                                    116.404702,
                                    41.325844
                                ]
                            ]

                        ]
                    ]
                }
            }
        };

        overlay.setOptionStyle(option);
        expect(overlay._opts.data).to.eql(option.data);


        option.data = null;
        overlay.setOptionStyle(option);

        expect(overlay._workerData.length).to.eql(0);
        expect(overlay._pointDataGroup.length).to.eql(0);
        expect(overlay._draggingPointTemp).to.eql(null);
        expect(overlay._draggingVirtualTemp).to.eql(null);
        expect(overlay._draggingVirtualTemp).to.eql(null);
        expect(overlay._createTempCache).to.eql(null);
        expect(overlay._createIndex).to.eql(-1);
        expect(overlay.isCreate).to.eql(false);

    });
    it('setOptionStyle function set data undefined', () => {
        let overlay = createOverlay();

        overlay.setPath(data);
        let option = {
            style: {
                isEdit: true,
                polygon: {
                    normal: {
                        backgroundColor: "rgba(155,155,155,0.7)", // 填充颜色
                    },
                }
            },
            data: data
        };

        option.data = undefined
        overlay.setOptionStyle(option);
        expect(overlay._opts.data).to.eql(data);
    });

});