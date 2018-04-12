export default {
    tooltip: {
        show: true,
        position: 'top',
        formatter: '{count}',
        offsets: {
            top: 5,
            left: 12,
        },
    },
    legend: {
        show: true,
        title: '图例'
    },
    style: {
        type: 'sum', //sum avg
        unit: 'px',
        colors: ['rgba(31,98,1,1)',
            'rgba(95,154,4,1)',
            'rgba(139,227,7,1)',
            'rgba(218,134,9,1)',
            'rgba(220,54,6,1)',
            'rgba(218,2,8,1)',
            'rgba(148,1,2,1)',
            'rgba(92,1,0,1)'
        ],
        normal: {
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            padding: 1,
            size: 50,
            label: {
                show: false, // 是否显示
                font: '12px sans-serif',
                shadowBlur: 0,
                lineWidth: 1,
                color: 'rgba(75,80,86,1)',
            },
        },
        mouseOver: {
            backgroundColor: 'rgba(200, 200, 200, 1)',

        },
        selected: {
            backgroundColor: 'rgba(184,0,0,1)',
            borderColor: 'rgba(255,255,255,1)'
        },

    },
    data: [],
    event: {
        multiSelect: false,
        onState() {}
    }
};