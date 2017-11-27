export default {
    tooltip: {
        show: true,
        position: 'top',
        customClass: "black", //是否自定义样式
        offsets: {
            top: 0,
            left: 0
        },
        formatter: '{count}~<br/>{count}'
    },
    legend: {
        show: false
    },
    style: {
        normal: {
            icon: null,
            width: 0,
            height: 0,
            scale: 1,
            offsets: {
                top: 0,
                left: 0
            }
        },
        mouseOver: {
            scale: 1,
        },
        selected: {
            scale: 1
        },
        colors: [],
        splitList: [],
    },
    data: [],
    event: {

    }
};