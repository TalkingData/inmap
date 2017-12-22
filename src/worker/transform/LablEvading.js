import {
    Label
} from './../helper/Label';

export let LablEvading = {
    merge: function (webObj) {
        let {
            pixels,
            height,
            borderWidth,
            byteWidth
        } = webObj.request.data;

        let labels = pixels.map((val) => {
            let radius = val.pixel.radius + borderWidth;
            return new Label(val.pixel.x, val.pixel.y, radius, height, byteWidth, val.name);
        });
        //x排序从小到大
        labels.sort((a, b) => {
            return b.x - a.x;
        });
        do {
            var meet = false; //本轮是否有相交
            for (let i = 0; i < labels.length; i++) {
                let temp = labels[i];
                for (let j = 0; j < labels.length; j++) {
                    if (i != j && temp.show && temp.isAnchorMeet(labels[j])) {
                        temp.next();
                        meet = true;
                        break;
                    }
                }
            }
        } while (meet);
        let temp = [];
        labels.forEach(element => {
            if (element.show) {
                let pixel = element.getCurrentRect();
                temp.push({
                    text: element.text,
                    x: pixel.x,
                    y: pixel.y
                });
            }
        });


        return {
            data: temp,
            client: webObj
        };
    }
};