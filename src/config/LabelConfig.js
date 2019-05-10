export default {
    tooltip: {
        show: false,
        formatter: '{count}',
        customClass: 'inmap-tooltip-black', //是否自定义样式
        offsets: {
            top: 5,
            left: 12,
        }
    },
    legend: {
        show: false
    },
    style: {
        normal: {
            font: '18px Arial',
            color: 'yellow',
            shadowColor: 'yellow',
            shadowBlur: 10
        },
        splitList: [],
        colors: []
    },
    data: [],
    checkDataType: {
        name: true,
        count: false
    },
    selected: [], //设置选中
    event: {
        emitEvent: true,
        multiSelect: false, //是否支持多选
        onMouseClick() {},
        onMouseOver() {},
        onState() {

        }
    }
};