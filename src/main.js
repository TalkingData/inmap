import './lib/require-babel-polyfill.js';
import TWEEN  from './lib/Tween';
import LabelOverlay from './overlay/LabelOverlay';
import PointOverlay from './overlay/PointOverlay';

import GriddingOverlay from './overlay/GriddingOverlay';
import PolygonOverlay from './overlay/PolygonOverlay';

import HeatOverlay from './overlay/HeatOverlay';
import LineStringOverlay from './overlay/LineStringOverlay';

import HoneycombOverlay from './overlay/HoneycombOverlay';
import ImgOverlay from './overlay/ImgOverlay';
import MoveLineOverlay from './overlay/MoveLineOverlay';
import PointAnimationOverlay from './overlay/PointAnimationOverlay';
import LineStringAnimationOverlay from './overlay/LineStringAnimationOverlay';
import PolygonEditorOverlay from './overlay/PolygonEditorOverlay/index';
import MaskOverlay from './overlay/MaskOverlay';
import Map from './map/index';
import * as utils from './common/Util';
import WorkerMrg from './common/WorkerMrg';
import config from './config/Config';
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);
let version = VERSION;
console.log(`inMap v${version}`);
const inMap = {
    version,
    utils,
    Map,
    LabelOverlay,
    PointOverlay,
    GriddingOverlay,
    PolygonOverlay,
    PolygonEditorOverlay,
    HeatOverlay,
    LineStringOverlay,
    HoneycombOverlay,
    ImgOverlay,
    MoveLineOverlay,
    PointAnimationOverlay,
    LineStringAnimationOverlay,
    WorkerMrg,
    MaskOverlay,
    config
};
export {
    version,
    utils,
    Map,
    LabelOverlay,
    PointOverlay,
    GriddingOverlay,
    PolygonOverlay,
    PolygonEditorOverlay,
    HeatOverlay,
    LineStringOverlay,
    HoneycombOverlay,
    ImgOverlay,
    MoveLineOverlay,
    PointAnimationOverlay,
    LineStringAnimationOverlay,
    WorkerMrg,
    MaskOverlay,
    config
};
export default inMap;