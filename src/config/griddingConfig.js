module.exports = {
    tooltip: {
        show: true,
        position: 'top',
        // formatter: function (params) {
        //     return params.count;
        // }
        formatter: "{count}"
    },
    label: {
        show: false, // 是否显示
        font: "12px sans-serif",
        shadowBlur: 0,
        lineWidth: 1,
        color: "rgba(75,80,86,1)",
    },
    legend: {
        show: true,
        title: "图例"

    },
    style: {
        colors: [
            "rgba(156,200,249,0.7)", "rgba(93,158,247,0.7)",
            "rgba(134,207,55,0.7)",
            "rgba(252,198,10,0.7)", "rgba(255,144,0,0.7)", "rgba(255,72,0,0.7)",
            "rgba(255,0,0,0.7)"
        ],
        normal: {
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            borderWidth: 3,
            size: 50,
        },
        mouseOver: {
            backgroundColor: 'rgba(200, 200, 200, 1)',
            scale: 1,
        },
        selected: {
            backgroundColor: 'rgba(184,0,0,1)',
            borderColor: "rgba(255,255,255,1)"
        },

    }
};