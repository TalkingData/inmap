export class MapZoom {
    constructor(map, mapDom, opts) {
        this.map = map;
        this.mapDom = mapDom;
        this.zoom = opts;
        this.createDom();
    }

    createDom() {
        let div = document.createElement('div');
        div.classList.add('inmap-scale-group');
        div.innerHTML = '<a>+</a > <a>-</a >';
        this.mapDom.appendChild(div);
        this.event(div);
    }
    setButtonState() {
        let doms = this.mapDom.querySelectorAll('.inmap-scale-group a');
        let zoom = this.map.getZoom();
        if (zoom >= this.zoom.max) {
            doms[0].setAttribute('disabled', 'true');
        } else {
            doms[0].removeAttribute('disabled');
        }
        if (zoom <= this.zoom.min) {
            doms[1].setAttribute('disabled', 'true');
        } else {
            doms[1].removeAttribute('disabled');
        }

    }
    event(div) {
        let doms = div.querySelectorAll('a');
        doms[0].addEventListener('click', () => {
            let zoom = this.map.getZoom();
            if (zoom < this.zoom.max) {
                this.map.zoomIn();
            }
            
        });
        doms[1].addEventListener('click', () => {
            let zoom = this.map.getZoom();
            if (zoom > this.zoom.min) {
                this.map.zoomOut();
            }
        });


    }
}