export default class Toolbar {
    constructor(mapDom) {
        let container = this._create(mapDom);
        let legendContainer = this._createLegendContainer(container);
        return {
            container,
            legendContainer,
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