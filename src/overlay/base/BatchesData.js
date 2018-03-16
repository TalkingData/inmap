import {
    chunk
} from './../../common/util';
/**
 * 数据分批间断执行
 */
export default class BatchesData {
    constructor(interval, splitCount) {
        this.interval = interval || 400;
        this.intervalId = null;
        this.splitCount = splitCount || 1500;
        this.splitArray = [];
        this.index = 0;

    }
    clear() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.splitArray = [];
        this.index = 0;
    }
    action(data, callback) {
        this.clear();
        let {
            splitCount,
            interval,
        } = this;
        this.splitArray = chunk(data, splitCount);

        let loop = () => {
            let item = this.splitArray[this.index];
            item && callback(item);

            this.index++;

            if (this.index >= this.splitArray.length - 1) {
                this.clear();
            } else {
                this.intervalId = setTimeout(loop, interval);
            }
        };
        loop();

    }
}