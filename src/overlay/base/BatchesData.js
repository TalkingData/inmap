import {
    chunk
} from './../../common/util';
/**
 * 数据分批间断执行
 */
export default class BatchesData {
    constructor(option) {
        this.setOption(option);
        this.intervalId = null;
        this.splitArray = [];
        this.index = 0;
        this.usable = true;
    }
    setOption({
        interval = 400,
        splitCount = 1500
    }) {
        this.clear();
        this.interval = interval;
        this.splitCount = splitCount;
    }
    /**
     *是否可用
     *
     * @param {*} Boolean
     * @memberof BatchesData
     */
    setUsable(val) {
        this.usable = val;
    }
    clear() {
        this.splitArray = [];
        this.index = 0;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

    }
    action(data, callback, ctx) {
       
        if (this.usable) {
            this.clear();
        } else {
            return;
        }
        let {
            splitCount,
            interval,
        } = this;

        this.splitArray = chunk(data, splitCount);

        let loop = () => {
            if (!this.usable) {
                this.clear();
                return;
            }
            let item = this.splitArray[this.index];
            item && callback(ctx, item);

            this.index++;

            if (this.index >= this.splitArray.length) {
                this.clear();
            } else {
                this.intervalId = setTimeout(loop, interval);
            }
        };
        loop();

    }
}