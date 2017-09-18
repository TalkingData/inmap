/**
 * 游标尺
 */
export let configuration = [{
        zoom: 19,
        value: 25
    },
    {
        zoom: 18,
        value: 50,
    },
    {
        zoom: 17,
        value: 100
    },
    {
        zoom: 16,
        value: 200
    },
    {
        zoom: 15,
        value: 500
    },
    {
        zoom: 14,
        value: 1000
    },
    {
        zoom: 13,
        value: 2000
    },
    {
        zoom: 12,
        value: 5000
    },
    {
        zoom: 11,
        value: 10000
    },
    {
        zoom: 10,
        value: 20000
    },
    {
        zoom: 9,
        value: 25000
    },
    {
        zoom: 8,
        value: 50000
    },
    {
        zoom: 7,
        value: 100000
    },
    {
        zoom: 6,
        value: 200000
    },
    {
        zoom: 5,
        value: 500000
    },
    {
        zoom: 4,
        value: 1000000
    },
    {
        zoom: 3,
        value: 2000000
    },
    {
        zoom: 2,
        value: 5000000
    },
    {
        zoom: 1,
        value: 10000000
    },
];
/**
 * 求出两个级别之前的像素倍速
 * @param {*} zoom1 地图级别 
 * @param {*} zoom2 地图级别
 */
export function pixelMultiple(zoom1, zoom2) {
    let item1 = configuration.find((val) => {
        return val.zoom == zoom1;
    });
    let item2 = configuration.find((val) => {
        return val.zoom == zoom2;
    });
    if (item1 == null || item2 == null) {
        throw new Error('map zoom error');
    }
    return item1.value / item2.value;
}