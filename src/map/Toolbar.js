 import Legend from './Legend';
 import ToolTip from './ToolTip';
 export default class Toolbar {
     constructor(mapDom) {
         let toolDom = this.create(mapDom);
         let legend = new Legend(toolDom);
         let toolTip = new ToolTip(toolDom);
         return {
             legend,
             toolTip
         };
     }
     create(mapDom) {
         let div = document.createElement('div');
         div.classList.add('inmap-container');
         mapDom.appendChild(div);
         return div;
     }
 }