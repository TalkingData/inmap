export default {
    tooltip: {
        show: false,
        customClass: 'inmap-tooltip-black', //是否自定义样式
        offsets: {
            top: 5,
            left: 12,
        },
    },
    legend: {
        show: false,
    },
    style: {
        gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
        radius: 15, // 半径
        blur: 0.15,//模糊 0~1
        minOpacity: 0.03, // 最小透明度
        maxOpacity: 1, // 最大透明度
        minValue: null,
        maxValue: null,
        minScope: 0, // 最小区间,小于此区间的不显示
        maxScope: 1, // 最大区间,大于此区间的不显示
    },
    data: [],
    checkDataType: {
        name: false,
        count: true
    },
    event: {
        emitEvent: true
    }
};