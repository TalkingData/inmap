/**
 * 默认点、围栏参数结构
 */

module.exports = {
    tooltip: {
        show: false,
    },
    legend: {
        show: false,
        toFixed: 2, //保留两位小数
    },
    label: {
        // show: false, // 是否显示
        // font: "12px sans-serif",
        // shadowBlur: 0,
        // lineWidth: 1,
        // color: "rgba(75,80,86,1)",
        normal: {
            show: false,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        }
    },
    style: {
        normal: {
            borderWidth: 0.1,
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            label: {}
        },
        mouseOver: {
            label: {

            }
        },
        selected: {
            label: {

            }

        },
        colors: [

        ],
        splitList: [],

    },
    data: [],
    multiSelect: false, //是否支持多选
    event: {

    }
};