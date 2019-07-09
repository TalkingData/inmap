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
            borderStyle: 'solid',   
            borderColor: 'rgba(50, 50, 255, 0.8)',
            borderWidth: 0.05,
            lineOrCurive: null, //‘cure’ 曲线
            deltaAngle: -0.2
        },
        colors: [],
        splitList: [],
    },
    data: [],
    checkDataType: {
        name: false,
        count: false
    },
    selected: [], //设置选中
    event: {
        emitEvent: true,
      
    }
};