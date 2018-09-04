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
    style: {
        normal: {
            borderColor: 'rgba(50, 50, 255, 0.8)',
            borderWidth: 0.05,
            lineCurive: null, //‘cure’ 曲线
            deltaAngle: -0.2
        },
        splitList: [],
    },
    data: [],
    selected: [], //设置选中
    event: {
        onMouseClick() {},
        onState() {

        }
    }
};