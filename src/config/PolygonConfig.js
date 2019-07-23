/**
 * 默认散点、围栏参数结构
 */

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
        show: false,
        toFixed: 2, //保留两位小数
    },

    style: {
        isHighlight: false,
        normal: {
            backgroundColor: 'rgba(0,133,235,0.6)',
            borderWidth: 1.5,
            borderStyle: 'solid',
            label: {
                enable: true,
                overflow: 'hidden',  // hidden visible  
                centerType: 'cell', //cell  minMax
                show: true,
                font: '13px bold ',
                color: '#fff'
            }
        },
        mouseOver: {
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: 10,
            borderWidth: 1.5,
            label: {
                color: 'rgba(0, 0, 0, 1)'
            }
        },
        colors: [

        ],
        splitList: [],

    },
    data: [],
    checkDataType: {
        name: true,
        count: true
    },
    event: {
        emitEvent: true,
        multiSelect: false, //是否支持多选
       
    }
};