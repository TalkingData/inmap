module.exports = {
    tooltip: {
        show: true,
        position: 'top',
        formatter: "{count}~<br/>{count}"
    },
    label: {
        show: false, // 是否显示
    },
    legend: {
        show: true,
        title: "标题",
        data: ["描述1", "描述2", "描述3", "描述4"],
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
        colors:[],
        splitList: [],
    },
    data: [],
    event: {

    }
};