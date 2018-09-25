 /**
  * 默认散点、围栏参数结构
  */

 export default {
    tooltip: {
        show: false,
    },
    legend: {
        show: false,
    },
    style: {
        normal: {
            size: 3,
            borderWidth: 0.1,
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
       
        },
        splitList:[]
    },
    data: [],
    checkDataType: {
        name: false,
        count: false
    },
    event: {
         onDragStart:function(){},
         onDragging:function(){},
         onDragEnd:function(){
         },
         onDblclick:function(){

         }
    }
};