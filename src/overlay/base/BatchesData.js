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
    }
    setOption({
        interval =  400,
        splitCount = 1500
    }) {
        this.clear();
        this.interval = interval;
        this.splitCount = splitCount;
    }
    clear() {
        this.splitArray = [];
        this.index = 0;
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
      
    }
    action(data, callback, ctx) {
        this.clear();
        let {
            splitCount,
            interval,
        } = this;
       
        this.splitArray = chunk(data, splitCount);

        let loop = () => {
            let item = this.splitArray[this.index];
            item && callback(ctx, item);

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