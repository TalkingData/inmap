 /**
  * 默认点、围栏参数结构
  */

 export default {
     tooltip: {
         show: false,
     },
     legend: {
         show: false,
         toFixed: 2, //保留两位小数
     },
     label: {
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
             label: {},
             scale: 1
         },
         mouseOver: {
             scale: 1,
             label: {

             }
         },
         selected: {
             scale: 1,
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