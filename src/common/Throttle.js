export default class Throttle {
    constructor(options) {

        this.options = {
            duration: 200
        };
        this.listeners = {};
        this._timer = null;

        this.startTime = 0;
        this.endTime = 0;
        this._trigger = this.trigger.bind(this);

        options && Object.assign(this.options, options);

    }
    initTime() {
        this.startTime = this.startTime === 0 ? Date.now() : this.endTime;
        this.endTime = Date.now();
        if (this.endTime - this.startTime < this.options.duration) {
            this._timer && clearTimeout(this._timer);
            this._timer = setTimeout(this._trigger, this.options.duration);

        } else {
            this._trigger();
        }

    }
    on(name, callback) {
        if (!this.listeners[name]) {
            this.listeners[name] = callback;
        }
    }
    trigger() {
        const listeners = this.listeners;
        for (let i in listeners) {
            if (listeners[i]) {
                listeners[i]();
            }
        }
    }
    dispose() {
        clearTimeout(this._timer);
        const listeners = this.listeners;
        for (let i in listeners) {
            if (listeners[i]) {
                delete listeners[i];
            }
        }
    }

    throttleEvent() {
        this.initTime();
    }
}