import {
    DotOverlay
} from './overlay/DotOverlay';

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
import FlashDotOverlay from './overlay/FlashDotOverlay';
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
    DotOverlay,
    GriddingOverlay,
    BoundaryOverlay,
    HeatOverlay,
    LineStringOverlay,
    HoneycombOverlay,
    ImgOverlay,
    MoveLineOverlay,
    FlashDotOverlay,
    workerMrg
};
export {
    version,
    utils,
    Map,
    DotOverlay,
    GriddingOverlay,
    BoundaryOverlay,
    HeatOverlay,
    LineStringOverlay,
    HoneycombOverlay,
    ImgOverlay,
    MoveLineOverlay,
    FlashDotOverlay,
    workerMrg
};
export default inMap;