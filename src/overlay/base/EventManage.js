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

        this.map.getContainer().addEventListener('mouseout', (e) => {
            this.trigger('_tMouseout', e);
        });
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
        let lock = false;
        for (let index = 0; index < this.layers.length; index++) {
            const layer = this.layers[index];
            if (layer && layer._map) {
                if (eventName == '_tMousemove' || eventName == '_tMouseClick') {
                    if (!lock) {
                        let reuslt = layer[eventName](e);
                        if (reuslt && reuslt.item) {
                            lock = true;
                        }
                    } else {
                        layer['_tMouseout'](e);
                    }

                } else {
                    layer[eventName](e);
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