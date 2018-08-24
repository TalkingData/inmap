export default class MapZoom {
    constructor(map, mapDom, opts) {
        this._map = map;
        this._mapDom = mapDom;
        this._zoom = opts;
        this._createDom();
    }

    _createDom() {
        let div = document.createElement('div');
        div.classList.add('inmap-scale-group');
        div.innerHTML = '<a>+</a > <a>-</a >';
        this._mapDom.appendChild(div);
        this._event(div);
    }
    setButtonState() {
        let doms = this._mapDom.querySelectorAll('.inmap-scale-group a');
        let zoom = this._map.getZoom();
        if (zoom >= this._zoom.max) {
            doms[0].setAttribute('disabled', 'true');
        } else {
            doms[0].removeAttribute('disabled');
        }
        if (zoom <= this._zoom.min) {
            doms[1].setAttribute('disabled', 'true');
        } else {
            doms[1].removeAttribute('disabled');
        }

    }
    _event(div) {
        let doms = div.querySelectorAll('a');
        doms[0].addEventListener('click', () => {
            let zoom = this._map.getZoom();
            if (zoom < this._zoom.max) {
                this._map.zoomIn();
            }

        });
        doms[1].addEventListener('click', () => {
            let zoom = this._map.getZoom();
            if (zoom > this._zoom.min) {
                this._map.zoomOut();
            }
        });


    }
}