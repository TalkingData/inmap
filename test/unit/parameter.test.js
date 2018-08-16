import Parameter from '../../src/overlay/base/Parameter';

describe('Parameter  base class ', () => {

  it('color to rgba', () => {
    let style = {
      normal: {
        borderWidth: 0.1,
        backgroundColor: '#fff',
        mergeCount: 1.5,
        label: {
          show: false,
          color: 'rgba(0,0,0,1)',
          font: '13px Arial'
        },
      },
      mouseOver: {
        borderColor: "#fefefe"
      },
      colors: ["#fffeee"],
      splitList: [],
    };

    Parameter.prototype.toRgba(style);
    ['normal', 'mouseOver', 'selected'].forEach((status) => {
      ['backgroundColor', 'borderColor'].forEach((item) => {
        let statusStyle = style[status];
        if (statusStyle) {
          let val = statusStyle[item];
          if (val) {
            let index = val.indexOf('rgba');
            expect(index).to.be.above(-1);
          }
        }
      });
    });

    style.colors && style.colors.forEach((val) => {
      let i = val.indexOf('rgba');
      expect(i).to.be.above(-1);
    });

  });

});