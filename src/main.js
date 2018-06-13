import {
    PointOverlay
} from './overlay/PointOverlay';

import {
    GriddingOverlay
} from './overlay/GriddingOverlay';
import {
    BoundaryOverlay
} from './overlay/BoundaryOverlay';

import {
    HeatOverlay
} from './overlay/HeatOverlay';
import {
    LineStringOverlay
} from './overlay/LineStringOverlay';

import {
    HoneycombOverlay
} from './overlay/HoneycombOverlay';
import {
    ImgOverlay
} from './overlay/ImgOverlay';
import {
    MoveLineOverlay
} from './overlay/MoveLineOverlay';
import PointAnimationOverlay from './overlay/PointAnimationOverlay';
import {
    Map
} from './map/index';
import * as utils from './common/util';
import {workerMrg} from './common/workerMrg';

let version = VERSION;
console.log(`inMap v${version}`);

const inMap = {
    version,
    utils,
    Map,
    PointOverlay,
    GriddingOverlay,
    BoundaryOverlay,
    HeatOverlay,
    LineStringOverlay,
    HoneycombOverlay,
    ImgOverlay,
    MoveLineOverlay,
    PointAnimationOverlay,
    workerMrg
};
export {
    version,
    utils,
    Map,
    PointOverlay,
    GriddingOverlay,
    BoundaryOverlay,
    HeatOverlay,
    LineStringOverlay,
    HoneycombOverlay,
    ImgOverlay,
    MoveLineOverlay,
    PointAnimationOverlay,
    workerMrg
};
export default inMap;