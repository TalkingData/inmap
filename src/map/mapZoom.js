export class MapZoom {
    constructor(map) {
        this.map = map;
        this.dom = map._inmapOption.toolDom;
        this.zoom = map._inmapOption.zoom;
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
            if (zoom < this.zoom.max) {
                this.map.zoomIn();
            }

        });
        doms[1].addEventListener('click', (e) => {
            let zoom = this.map.getZoom();
            if (zoom > this.zoom.min) {
                this.map.zoomOut();
            }
        });

    }
}