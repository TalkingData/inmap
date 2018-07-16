import './lib/require-babel-polyfill.js';

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
import PolygonEditorOverlay from './overlay/PolygonEditorOverlay';
import Map from './map/index';
import * as utils from './common/util';
import workerMrg from './common/workerMrg';

let version = VERSION;
console.log(`inMap v${version}`);

const inMap = {
    version,
    utils,
    Map,
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
    workerMrg
};
export {
    version,
    utils,
    Map,
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
    workerMrg
};
export default inMap;