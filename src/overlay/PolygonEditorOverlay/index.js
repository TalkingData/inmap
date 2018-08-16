 import CanvasOverlay from '../base/CanvasOverlay';
 import PolygonOverlay from '../PolygonOverlay';
 import PointDragOverlay from './PointDragOverlay';
 import config from '../../config/PolygonEditorConfig';
 import {
     merge,
     isPolyContains,
 } from '../../common/util';

 export default class PolygonEditorOverlay2 extends CanvasOverlay {
     constructor(opts) {
         super(opts);
         this._opts = merge(config, opts);
         this._eventConfig = this._opts.event;
         this._dragEndVirtual = this._dragEndVirtual.bind(this);
         this._dragEndPoint = this._dragEndPoint.bind(this);
         this._draggingPoint = this._draggingPoint.bind(this);
         this._draggingVirtual = this._draggingVirtual.bind(this);
         this._dblclickPoint = this._dblclickPoint.bind(this);
         this._dblclickFun = this._dblclickFun.bind(this);
         this._clickFun = this._clickFun.bind(this);
         this._mousemoveFun = this._mousemoveFun.bind(this);
         this._rightclick = this._rightclick.bind(this);
         this._polygonOverlay = null;
         this._pointOverlay = null;
         this._virtualPointOverlay = null;
         this._workerData = [];
         this._pointDataGroup = [];
         this._draggingPointTemp = null;
         this._draggingVirtualTemp = null;
         this._createTempCache = null;
         this._createIndex = -1;
         this.isCreate = false;

     }
     canvasInit() {
         this._polygonOverlay = new PolygonOverlay({
             style: this._opts.style.polygon,
             data: this._opts.data ? [this._toMutilPolygon(this._opts.data)] : [],
             event: {
                 onState: (state) => {
                     if (state == 3) {
                         this._workerData = this._polygonOverlay.getData();
                         if (this._opts.style.isEdit && this.isCreate == false) {
                             this._setPointData();
                             this._setVirtualPointData();
                         } else {
                             this._clearPointOverlay();
                         }
                     }
                 }
             }
         });

         this.map.addOverlay(this._polygonOverlay);

         this._pointOverlay = new PointDragOverlay({
             style: { ...this._opts.style.point,
                 ...{
                     isDrag: true
                 },
             },
             event: {
                 onDragEnd: this._dragEndPoint,
                 onDragging: this._draggingPoint,
                 onDblclick: this._dblclickPoint,
             }
         });
         this.map.addOverlay(this._pointOverlay);

         this._virtualPointOverlay = new PointDragOverlay({
             style: { ...this._opts.style.virtualPoint,
                 ...{
                     isDrag: true
                 },
             },
             event: {
                 onDragEnd: this._dragEndVirtual,
                 onDragging: this._draggingVirtual
             }
         });
         this.map.addOverlay(this._virtualPointOverlay);
         this.map.addEventListener('rightclick', this._rightclick);
     }
     setOptionStyle(opts) {
         if (opts.data === undefined) {
             delete opts.data;
         }
         this._opts = merge(this._opts, opts);
         this._eventConfig = this._opts.event;
         this._polygonOverlay && this._polygonOverlay.setOptionStyle({
             style: this._opts.style.polygon
         });

         this._pointOverlay && this._pointOverlay.setOptionStyle({
             style: { ...this._opts.style.point,
                 ...{
                     isDrag: true
                 },
             }
         });
         this._virtualPointOverlay && this._virtualPointOverlay.setOptionStyle({
             style: { ...this._opts.style.virtualPoint,
                 ...{
                     isDrag: true
                 },
             }
         });
         if (opts.data !== undefined) {
             this.setPath(opts.data);
         }
     }
     create() {
         this.isCreate = true;
         this.setPath();
         this._createTempCache = null;
         this._createIndex = -1;
         if (this.map) {
             this.map.removeEventListener('click', this._clickFun);
             this.map.removeEventListener('dblclick', this._dblclickFun);
             this.map.removeEventListener('mousemove', this._mousemoveFun);
             this.map.addEventListener('click', this._clickFun);
             this.map.addEventListener('dblclick', this._dblclickFun);
             this.map.addEventListener('mousemove', this._mousemoveFun);
         }

     }
     setPath(data) {
         this.isCreate = false;
         this._opts.data = data;
         this._workerData = [];
         this._pointDataGroup = [];
         this._draggingPointTemp = null;
         this._draggingVirtualTemp = null;
         this._createTempCache = null;
         this._createIndex = -1;
         this._polygonOverlay && this._polygonOverlay.setData(this._opts.data ? [this._toMutilPolygon(data)] : []);
     }
     enableEditing() {
         this.isCreate = false;
         this._opts.style.isEdit = true;
         this._removeMoveEvent();
         this._setPointData();
         this._setVirtualPointData();
     }
     disableEditing() {
         this.isCreate = false;
         this._opts.style.isEdit = false;
         this._clearPointOverlay();
     }
     translationPixel(x, y) {
         if (this._workerData.length > 0) {
             for (let i = 0; i < this._workerData.length; i++) {
                 let geometry = this._workerData[i].geometry;
                 let pixels = geometry.pixels;
                 let coordinates = geometry.coordinates;
                 if (geometry.type == 'MultiPolygon') {
                     for (let j = 0; j < pixels.length; j++) {
                         let pixelItem = pixels[j];
                         for (let k = 0, len = pixelItem.length; k < len; k++) {
                             let pixels = pixelItem[k];
                             for (let n = 0; n < pixels.length; n++) {
                                 let pixel = pixels[n];
                                 let point = coordinates[j][k][n];
                                 pixel[0] = pixel[0] + x;
                                 pixel[1] = pixel[1] + y;

                                 let latlng = this.map.overlayPixelToPoint({
                                     x: pixel[0],
                                     y: pixel[1]
                                 });
                                 point[0] = latlng.lng;
                                 point[1] = latlng.lat;

                             }
                         }
                     }
                 }
             }
             this._polygonOverlay && this._polygonOverlay.refresh();
         }
     }
     _removeMoveEvent() {
         if (!this.map) return;
         this.map.removeEventListener('click', this._clickFun);
         this.map.removeEventListener('dblclick', this._dblclickFun);
         this.map.removeEventListener('mousemove', this._mousemoveFun);
         this.map.removeEventListener('rightclick', this.rightclick);
     }
     Tdispose() {
         this._removeMoveEvent();
         this.map.removeOverlay(this._polygonOverlay);
         this.map.removeOverlay(this._pointOverlay);
         this.map.removeOverlay(this._virtualPointOverlay);
         this._polygonOverlay.dispose();
         this._pointOverlay.dispose();
         this._virtualPointOverlay.dispose();
     }
     getPath() {
         if (this._workerData.length > 0) {
             let coordinates = JSON.parse(JSON.stringify(this._workerData[0].geometry.coordinates));
             return {
                 geometry: {
                     type: 'MultiPolygon',
                     coordinates: coordinates
                 }
             };
         } else {
             return null;
         }
     }
     _toMutilPolygon(data) {
         try {
             if (data && data.geometry.type == 'Polygon') {
                 data.geometry.type = 'MultiPolygon';
                 data.geometry.coordinates = [
                     data.geometry.coordinates
                 ];
             }
         } catch (error) {
             throw new TypeError('inMap :data must be is \'MultiPolygon\' or \'Polygon\'');
         }
         return data;

     }
     _clickFun(event) {
         if (!this.isCreate) return;


         if (!this._createTempCache) {
             this._createIndex++;
             this._createTempCache = {
                 coordinates: [
                     [event.point.lng, event.point.lat]
                 ],
                 pixels: [
                     [event.offsetX, event.offsetY]
                 ],
             };
         }
         let geoJSON = this._workerData[0];

         let currentCoordinate = geoJSON.geometry.coordinates[this._createIndex];
         let currentPixels = geoJSON.geometry.pixels[this._createIndex];

         if (!currentCoordinate) {
             geoJSON.geometry.coordinates.push([
                 []
             ]);
             geoJSON.geometry.pixels.push([
                 []
             ]);

             currentCoordinate = geoJSON.geometry.coordinates[this._createIndex];
             currentPixels = geoJSON.geometry.pixels[this._createIndex];
         }

         //外环
         if (currentPixels[0].length > 0) { //检查是否重复
             let pixels = currentPixels[0],
                 len = pixels.length,
                 pixel = pixels[len - 1];
             if (pixel[0] == event.offsetX && pixel[1] == event.offsetY) {
                 this._createTempCache.coordinates.push([event.point.lng, event.point.lat]);
                 this._createTempCache.pixels.push([event.offsetX, event.offsetY]);
                 return;
             }

         }

         currentCoordinate[0].push([event.point.lng, event.point.lat]);
         currentPixels[0].push([event.offsetX, event.offsetY]);

         this._polygonOverlay.refresh();

     }
     _dblclickFun() {
         if (!this.isCreate) {
             return;
         }

         let geoJSON = this._polygonOverlay.workerData[0];

         let currentCoordinate = geoJSON.geometry.coordinates[this._createIndex];
         if (currentCoordinate[0].length <= 2) {
             //无效
             geoJSON.geometry.coordinates.splice(this._createIndex, 1);
             geoJSON.geometry.pixels.splice(this._createIndex, 1);

             this._polygonOverlay.refresh();
             console.log(geoJSON);
             this._createIndex--;
         } else {

             let index = this._isPolyContainsIndex(currentCoordinate[0], geoJSON, this._createIndex);
             if (index > -1) { //包含
                 geoJSON.geometry.coordinates[index].push(currentCoordinate[0]);
                 geoJSON.geometry.pixels[index].push(geoJSON.geometry.pixels[this._createIndex][0]);

                 geoJSON.geometry.coordinates.splice(this._createIndex, 1);
                 geoJSON.geometry.pixels.splice(this._createIndex, 1);
                 this._createIndex--;

                 this._polygonOverlay.refresh();
             }
             this._eventConfig.onCreated.call(this, event);

         }

         this._createTempCache = null;

     }
     _isPolyContainsIndex(lngLats, polygon, notIndex) {
         let coordinates = polygon.geometry.coordinates;
         for (let j = 0, len = coordinates.length; j < len; j++) {
             if (j != notIndex) {
                 let item = coordinates[j][0];

                 let lngs = [],
                     lats = [];
                 for (let k = 0; k < item.length; k++) {
                     lngs.push(parseFloat(item[k][0]));
                     lats.push(parseFloat(item[k][1]));
                 }
                 let result = false;
                 for (let i = 0; i < lngLats.length; i++) {
                     let lng = lngLats[i][0],
                         lat = lngLats[i][1];
                     result = isPolyContains(lats, lngs, lng, lat);
                     if (result) {
                         continue;
                     } else {
                         break;
                     }
                 }
                 if (result) return j;
             }
         }
         return -1;
     }
     _rightclick(event) {
         if (this.isCreate) return;
         if (!this._opts.style.isDel) return;
         let coordinates = this._workerData[0].geometry.coordinates;
         for (let j = 0, len = coordinates.length; j < len; j++) {

             let item = coordinates[j][0];

             let lngs = [],
                 lats = [];
             for (let k = 0; k < item.length; k++) {
                 lngs.push(parseFloat(item[k][0]));
                 lats.push(parseFloat(item[k][1]));
             }

             if (isPolyContains(lats, lngs, event.point.lng, event.point.lat)) {
                 coordinates.splice(j, 1);
                 this._workerData[0].geometry.pixels.splice(j, 1);
                 this._polygonOverlay.refresh();
                 this._eventConfig.onDelete.call(this, event);
                 break;
             }
         }

     }
     _mousemoveFun(event) {

         if (!this.isCreate || !this._createTempCache) return;
         let data = this._polygonOverlay.workerData[0];
         let currentCoordinate = data.geometry.coordinates[this._createIndex];
         let currentPixels = data.geometry.pixels[this._createIndex];

         //外环
         currentCoordinate[0] = this._createTempCache.coordinates.concat([
             [event.point.lng, event.point.lat]
         ]);
         currentPixels[0] = this._createTempCache.pixels.concat([
             [event.offsetX, event.offsetY]
         ]);

         this._polygonOverlay.selectItem = [];
         this._polygonOverlay.refresh();
     }
     _clearPointOverlay() {
         if (!this._pointOverlay) return;
         this._pointOverlay.setWorkerData([]);
         this._pointOverlay.refresh();
         this._virtualPointOverlay.setWorkerData([]);
         this._virtualPointOverlay.refresh();
     }
     _setVirtualPointData() {

         let virtualData = [];
         for (let i = 0; i < this._pointDataGroup.length; i++) {
             let data = this._pointDataGroup[i];
             if (data.length > 0) {
                 data = data.concat([data[0]]);
             }

             for (let j = 0, len = data.length; j < len; j++) {

                 if (j + 1 > data.length - 1) {
                     break;
                 }

                 let geometry = data[j].geometry,
                     nextGeometry = data[j + 1].geometry;
                 let item = {
                     geometry: {
                         type: 'Point',
                         coordinates: [(geometry.coordinates[0] + nextGeometry.coordinates[0]) / 2, (geometry.coordinates[1] + nextGeometry.coordinates[1]) / 2],
                         pixel: {
                             x: (geometry.pixel.x + nextGeometry.pixel.x) / 2,
                             y: (geometry.pixel.y + nextGeometry.pixel.y) / 2
                         },
                     },
                     pre: {
                         index: i,
                         i: j
                     },
                     next: {
                         index: i,
                         i: j < len - 2 ? j + 1 : 0
                     }
                 };
                 virtualData.push(item);

             }

         }
         if (!this._virtualPointOverlay) return;
         this._virtualPointOverlay.selectItem = [];
         this._virtualPointOverlay.setWorkerData(virtualData);
         this._virtualPointOverlay.refresh();
     }
     _setPointData() {
         this._pointDataGroup = [];
         for (let i = 0; i < this._workerData.length; i++) {
             let item = this._workerData[i];
             let type = item.geometry.type;
             if (type == 'MultiPolygon') {
                 for (let k = 0; k < item.geometry.coordinates.length; k++) {
                     this._Andcoordinates(item.geometry.coordinates[k], item.geometry.pixels[k], this._pointDataGroup, i, k);
                 }

             }

         }
         let pointData = [];
         for (let i = 0; i < this._pointDataGroup.length; i++) {
             pointData = pointData.concat(this._pointDataGroup[i]);
         }
         if (!this._pointOverlay) return;
         this._pointOverlay.selectItem = [];
         this._pointOverlay.setWorkerData(pointData);
         this._pointOverlay.refresh();
     }
     _Andcoordinates(coordinates, pixels, target, Arrindex, coordinatesIndex) {

         for (let i = 0; i < coordinates.length; i++) {
             let points = coordinates[i];
             let arr = [];
             for (let j = 0; j < points.length; j++) {
                 let point = points[j];
                 let pixel = pixels[i][j];
                 arr.push({
                     geometry: {
                         type: 'Point',
                         coordinates: [point[0], point[1]],
                         pixel: {
                             x: pixel[0],
                             y: pixel[1]
                         }
                     },
                     _index: {
                         Arrindex,
                         coordinatesIndex,
                         surround: i,
                         i: j
                     }
                 });
             }
             target.push(arr);
         }
     }
     _dragEndVirtual(item, index, event) {
         let key = this._pointOverlay.workerData[index]._index;
         this._draggingPointTemp = null;
         this._draggingVirtualTemp = null;
         this._updatePolygon(item, key, 'insert', event);
         this.clearCanvas();
     }
     _dragEndPoint(item, index, event) {
         let key = this._pointOverlay.workerData[index]._index;
         this._draggingPointTemp = null;
         this._draggingVirtualTemp = null;
         this.clearCanvas();
         this._updatePolygon(item, key, 'update', event);
     }
     _dblclickPoint(item, index, event) {
         let key = this._pointOverlay.workerData[index]._index;
         this.clearCanvas();
         this._updatePolygon(item, key, 'delete', event);
     }
     _updatePolygon(item, key, action, event) {

         let findGeometry = this._workerData[key.Arrindex].geometry;

         if (findGeometry.type == 'MultiPolygon') {
             let latLngs = findGeometry.coordinates[key.coordinatesIndex][key.surround];
             let pixels = findGeometry.pixels[key.coordinatesIndex][key.surround];
             switch (action) {
                 case 'insert':
                     latLngs.splice(key.i + 1, 0, item.geometry.coordinates);
                     pixels.splice(key.i + 1, 0, [item.geometry.pixel.x, item.geometry.pixel.y]);
                     break;
                 case 'update':
                     latLngs.splice(key.i, 1, item.geometry.coordinates);
                     pixels.splice(key.i, 1, [item.geometry.pixel.x, item.geometry.pixel.y]);
                     break;
                 case 'delete':
                     latLngs.splice(key.i, 1);
                     pixels.splice(key.i, 1);
                     break;
             }

             this._polygonOverlay.refresh();
             this._setPointData();
             this._setVirtualPointData();
             //触发 change 事件
             this._eventConfig.onChange.call(this, action, event);
         }
     }
     _findPointDataGroup(data, item) {
         for (let i = 0; i < data.length; i++) {
             let points = data[i];
             for (let index = 0; index < points.length; index++) {
                 if (item == points[index]) {
                     return {
                         i,
                         index,
                         points
                     };
                 }
             }
         }

         return {
             index: -1,
             points: null
         };
     }
     _draggingPoint(item) {

         if (!this._draggingPointTemp) {
             this._draggingPointTemp = this._findPointDataGroup(this._pointDataGroup, item);
         }

         let index = this._draggingPointTemp.index,
             virtualLine = [],
             data = this._draggingPointTemp.points,
             len = data.length;

         if (index == 0) {
             virtualLine.push(data[len - 1]);
         } else {
             virtualLine.push(data[index - 1]);
         }

         virtualLine.push(data[index]);

         if (index == len - 1) {
             virtualLine.push(data[0]);
         } else {
             virtualLine.push(data[index + 1]);
         }

         this._drawLine(virtualLine);
         this._setVirtualPointData();
     }
     _draggingVirtual(item) {
         let preItem = this._pointDataGroup[item.pre.index][item.pre.i];
         let nextItem = this._pointDataGroup[item.next.index][item.next.i];
         let virtualLine = [preItem, item, nextItem];
         this._drawLine(virtualLine);
     }
     _drawLine(data) {
         this.clearCanvas();
         this.ctx.beginPath();
         this.ctx.save();
         this.ctx.lineWidth = 4;
         this.ctx.strokeStyle = 'red';
         this.ctx.setLineDash([10, 5]);
         for (let i = 0; i < data.length; i++) {
             let geometry = data[i].geometry;
             if (i == 0) {
                 this.ctx.moveTo(geometry.pixel.x, geometry.pixel.y);
             } else {
                 this.ctx.lineTo(geometry.pixel.x, geometry.pixel.y);
             }
         }
         this.ctx.stroke();
         this.ctx.restore();
     }

 }