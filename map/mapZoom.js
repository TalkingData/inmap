export class MapZoom {
    constructor(map) {
        this.map = map;
        this.dom = map._tdmapOption.toolDom;
        this.mpZoom = map._tdmapOption.mpZoom;
        this.createDom();
    }

    createDom() {
        let div = document.createElement('div');
        div.classList.add('scale-group');
        div.innerHTML = '<a>+</a > <a>-</a >';
        this.dom.appendChild(div);
        this.event(div);
    }
    event(div) {
        // debugger
        let doms = div.querySelectorAll('a');
        doms[0].addEventListener('click', (e) => {
            let zoom = this.map.getZoom();
            if (zoom < this.mpZoom.max) {
                this.map.zoomIn();
            }

        });
        doms[1].addEventListener('click', (e) => {
            let zoom = this.map.getZoom();
            if (zoom > this.mpZoom.min) {
                this.map.zoomOut();
            }
        });

    }
}