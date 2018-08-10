export default {
    style: {
        isEdit: true,
        isDel: true, //右键删除功能
        point: {
            normal: {
                backgroundColor: 'rgba(93,158,247,0.7)', // 填充颜色
                size: 6, // 半径
            },
            mouseOver: {
                backgroundColor: 'rgba(93,158,247,1)',
                borderColor: 'rgba(93,158,247,1)',
                borderWidth: 1
            },
            selected: {
                borderWidth: 1,
                backgroundColor: 'rgba(184,0,0,1)',
            }

        },
        virtualPoint: {
            normal: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 1,
                borderColor: 'rgba(0,131,238, 1)',
                size: 6,
            },
            mouseOver: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2
            },

        },
        polygon: {
            normal: {
                borderWidth: 1.5,
                backgroundColor: 'rgba(0,184,255,0.3)',
                label: {
                    enable: false
                }
            }
        }
    },
    data: null,
    event: {
        onCreated() {},
        onChange() {},
        onDelete(){
            
        }
    }
};