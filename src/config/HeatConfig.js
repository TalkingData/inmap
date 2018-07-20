export default {
    tooltip: {
        show: false,
        offsets: {
            top: 5,
            left: 12,
        },
    },
    legend: {
        show: false,
    },
    style: {
        gradient: {
            0.25: 'rgb(0,0,255)',
            0.55: 'rgb(0,255,0)',
            0.85: 'rgb(255,255,0)',
            1.0: 'rgb(255,0,0)'
        },
        radius: 15, // 半径
        minOpacity: 0, // 最小透明度
        maxOpacity: 1, // 最大透明度
        minValue: 0,
        maxValue: 0,
        minScope: 0, // 最小区间,小于此区间的不显示
        maxScope: 1, // 最大区间,大于此区间的不显示
    },
    data: [],
    event: {
        onState() {}
    }
};