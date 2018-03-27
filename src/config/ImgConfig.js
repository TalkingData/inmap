export default {
    tooltip: {
        show: true,
        position: 'top',
        customClass: 'inmap-tooltip-black', //是否自定义样式
        offsets: {
            top: 5,
            left: 12,
        },
        formatter: '{count}'
    },
    legend: {
        show: false
    },
    style: {
        normal: {
            icon: null,
            width: 0,
            height: 0,

            offsets: {
                top: 0,
                left: 0
            }
        },
        mouseOver: {

        },
        selected: {

        },
        colors: [],
        splitList: [],
    },
    data: [],
    event: {
        multiSelect: false, //是否支持多选
        onMouseClick() {},
        onState() {}
    }
};