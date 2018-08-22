import PointAnimationOverlay from '../../src/overlay/PointAnimationOverlay';

describe('PointAnimationOverlay ', () => {
    function createOverlay() {
        return new PointAnimationOverlay({
            style: {
                fps: 90, //动画帧数
                color: "#FAFA32",
                size: 20,
                speed: 0.15
            },
            data: null,
        });
    }
    it('constructor ', () => {
        let overlay = createOverlay();
        expect(overlay.data).to.eql([]);
    });

    it('setData', () => {
        let overlay = createOverlay();
        overlay.setData(null);
        expect(overlay.data).to.eql([]);

        let data = [{
            "count": 4,
            "geometry": {
                "type": "Point",
                "coordinates": [117.306518554688, 38.5537719726562]
            }
        }];

        overlay.setData(data);
        expect(overlay.data).to.eql(data);
    

        overlay.setData(undefined);
        expect(overlay.data).to.eql([]);
       

        overlay.setData(data);
        expect(overlay.data).to.eql(data);
     


        overlay.setData(null);
        expect(overlay.data).to.eql([]);
       

    });

    it('setOptionStyle', () => {
        let overlay = createOverlay();
        expect(overlay.data).to.eql([]);
       

        let data = [{
            "count": 4,
            "geometry": {
                "type": "Point",
                "coordinates": [117.306518554688, 38.5537719726562]
            }
        }];
        overlay.setOptionStyle({
            style: {
                fps: 90, //动画帧数
                color: "#FAFA32",
                size: 20,
                speed: 0.15
            },
            data:data
        });
        expect(overlay.data).to.eql(data);
      

        overlay.setOptionStyle({
            style: {
                fps: 90, //动画帧数
                color: "#FAFA32",
                size: 20,
                speed: 0.15
            },
            data: null,
        });
        expect(overlay.data).to.eql([]);
        

        overlay.setOptionStyle({
            style: {
                fps: 90, //动画帧数
                color: "#FAFA32",
                size: 20,
                speed: 0.15
            },
            data: data,
        });
        overlay.setOptionStyle({
            style: {
                fps: 90, //动画帧数
                color: "#FAFA32",
                size: 20,
                speed: 0.15
            },
        });
        expect(overlay.data).to.eql(data);
    });


});