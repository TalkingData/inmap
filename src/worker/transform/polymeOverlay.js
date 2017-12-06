import {
    pointToPixelWorker
} from '../../lib/pointToPixel';
export let polymeOverlay = {
    mergeCount: 0,
    /*
     * 判断两个圆点是否相交
     */
    isMeet: function (a, b) {
        let dx = a.x - b.x,
            dy = a.y - b.y;

        if (dx * dx + dy * dy > (a.radius + b.radius) * (a.radius + b.radius)) {
            return false;
        } else {
            return true;
        }
    },
    /*
     * 计算两个圆合并后的坐标和半径
     */
    getDots: function (d1, d2, r) {
        let a = d1.pixel,
            b = d2.pixel;
        let merges1 = d1.merges,
            merges2 = d2.merges;
        let tempDot = {
            merges: (merges1 || [d1]).concat(merges2 || [d2]),
            pixel: {
                radius: a.radius + b.radius - r + polymeOverlay.mergeCount,
                x: Math.ceil((a.x + b.x) / 2),
                y: Math.ceil((a.y + b.y) / 2)
            }
        };

        return tempDot;
    },
    merge: function (dots, defautR) {

        do {
            var merges = [],
                meet = false; //本轮是否有合并
            for (let i = 0; i < dots.length; i++) {
                let temp = dots[i];
                for (let j = 0; j < dots.length; j++) {
                    if (i != j && polymeOverlay.isMeet(temp.pixel, dots[j].pixel)) {
                        temp = polymeOverlay.getDots(temp, dots[j],defautR);
                        dots.splice(i, 1);
                        dots.splice(j - 1, 1);
                        meet = true;
                    }
                }
                merges.push(temp);
            }
            if (dots.length > 0) {
                merges.push(dots[0]);
            }
            dots = merges;
        } while (meet);
        return merges;
    },
    mergePoint: function (webObj) {
        polymeOverlay.mergeCount = webObj.request.data.mergeCount;
        let data = webObj.request.data.points;
        let radius = webObj.request.data.size;
        data.forEach((val) => {
            let pixel = pointToPixelWorker(val, webObj.request.map);
            val['pixel'] = {
                x: pixel.x,
                y: pixel.y,
                radius: radius
            };
        });
        let temp = polymeOverlay.merge(data, radius);
        return {
            data: temp,
            client: webObj
        };
    }
};