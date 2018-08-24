 import ToolTip from './ToolTip';
 export default class Toolbar {
     constructor(mapDom) {
         let toolDom = this._create(mapDom);
         let toolTip = new ToolTip(toolDom);
         let legendContainer = this._createLegendContainer(toolDom);
         return {
             legendContainer,
             toolTip
         };
     }
     _create(mapDom) {
         let div = document.createElement('div');
         div.classList.add('inmap-container');
         mapDom.appendChild(div);
         return div;
     }
     _createLegendContainer(parentDom) {
         let div = document.createElement('div');
         div.classList.add('inmap-legend-container');
         parentDom.appendChild(div);
         return div;
     }
 }