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
     draw: {
         //  interval: 400,
         //  splitCount: 1500
     },
     style: {
         normal: {
             size: 3,
             borderWidth: 0.1,
             backgroundColor: 'rgba(200, 200, 200, 0.5)',
             mergeCount: 1.5,
             unit: 'px', // px or m
             label: {
                 show: false,
                 color: 'rgba(0,0,0,1)',
                 font: '13px Arial'
             },
         },
         colors: [

         ],
         splitList: [],

     },
     data: [],
     checkDataType: {
         name: false,
         count: false
     },
     selected: [], //设置选中
     event: {
         multiSelect: false, //是否支持多选
         onMouseClick() {},
         onState() {

         }
     }
 };