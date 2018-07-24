export default {
    tooltip: {
        show: false,
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
            avoid: false, //文字避让
            font: '18px Arial',
            color: 'yellow',
            shadowColor: 'yellow',
            shadowBlur: 10
        },
        splitList: [],
    },
    data: [],
    selected: [], //设置选中
    event: {
        multiSelect: false, //是否支持多选
        onMouseClick() {},
        onState() {

        }
    }
};