import {

    detectmob,

} from '../../common/Util';
const isMobile = detectmob();
class EventManage {
    constructor() {
        this.map = null;
        this.layers = [];
    }
    register(map, layer) {
        if (this.map != map) {
            this.map = map;
            this.bindEvent();
        }
        if (!this.isContains(layer)) {
            this.layers.push(layer);

            this.layers.sort((a, b) => {
                return b._zIndex - a._zIndex;
            });

        }
    }
    bindEvent() {

        this.map.addEventListener('mousemove', (e) => {
            this.trigger('_tMousemove', e);
        });
        if (isMobile) {
            this.map.addEventListener('touchstart', (e) => {
                this.trigger('_tMouseClick', e);
            });
        } else {
            this.map.addEventListener('click', (e) => {
                this.trigger('_tMouseClick', e);
            });
        }
    }
    trigger(eventName, e) {

        for (let index = 0; index < this.layers.length; index++) {
            const item = this.layers[index];
            if (item && item._map) {
                if (eventName == '_tMousemove' || eventName == '_tMouseClick') {
                    let reuslt = item[eventName](e);
                    // console.log(this.layers);
                    if (reuslt && reuslt.item) {

                        // break;
                    }

                } else {
                    item[eventName](e);
                }

            } else {

                this.layers.splice(index, 1);
                index--;
            }

        }

    }
    isContains(layer) {
        let index = this.layers.findIndex((item) => {
            return item == layer;
        });
        return index > -1 ? true : false;
    }

}
export default new EventManage();