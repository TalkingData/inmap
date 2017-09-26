/**
 * 绘制Marker的Label
 *
 * author zhenjia.hao
 * date 20170725
 */

import deepmerge from 'deepmerge';
import BaseClass from '../base/BaseClass';
import baseConfig from './../../config/parameterConfig';
import {
	forEach,
	isObject
} from '../../common/util.js';
import {
    workerMrg
} from '../../common/workerMrg';

import {
	TextRender
} from './TextRender';

export class LabelRender extends BaseClass{
	constructor(opts) {
		opts = deepmerge({}, baseConfig, opts);

		super(opts);

		this.labelStyle = opts.label;
		this.textRender = null;
		this.ctx = null;
		this.pixels = [];
		this.pixelsGroup = [];
		this.pixelsMap = {};
		this.offset = 5;

		this.setTextRender();
	}
	/**
	 * 设置TextRender，用于label标注
	 * @param {String} type [description]
	 */
	setTextRender(type = 'normal'){
		let textRender = this.textRender,
			labelStyle = this.labelStyle[type];

		if(!textRender){
			textRender = this.textRender = new TextRender(labelStyle);
		}else{
			textRender.setOption(labelStyle);
		}

		return textRender
	}
	/**
	 * 重写BaseClass的postMessage方法，因为该子类不需要this.map
	 * @param  {[type]}   workerClassPath [description]
	 * @param  {[type]}   data            [description]
	 * @param  {Function} callback        [description]
	 * @return {[type]}                   [description]
	 */
	postMessage(workerClassPath, data, callback){
	    let msgId = this.setMsgId();
	    let request = {
	        'type': 'web',
	        'data': data,
	        'hashCode': this.hashCode,
	        'className': this.className,
	        'classPath': workerClassPath,
	        'msgId': msgId
	    };
	    workerMrg.postMessage({
	        request: request
	    }, callback);
	}
	/**
	 * 渲染label
	 * @param  {[type]} ctx    [description]
	 * @param  {[type]} pixels [description]
	 * @return {[type]}        [description]
	 */
	drawLabel(ctx, pixels) {
		let that = this;

		if(!this.textRender.isShow()) return;

		this.ctx = ctx;
		this.pixels = pixels;
		this.reset();
		this.setPixelsMap();
		this.groupPixelsByDistance();
		this.drawByGroup();
	}
	/**
	 * 清空缓存的坐标点信息
	 * @return {[type]} [description]
	 */
	reset(){
		this.pixelsGroup = [];
		this.pixelsMap = {};
	}
	/**
	 * 将所有的点按照距离分类，找出可能相交的点
	 * @return {[type]} [description]
	 */
	groupPixelsByDistance(){
		let that = this,
			pixels = this.pixels,
			pixelsGroup = this.pixelsGroup,
			isNear,
			item, i = 0;
	
		this.sortPixels(pixels);

		while(i < pixels.length){
			item = pixels[i];
			isNear = false;
			forEach(pixelsGroup, function(groupItem){
				forEach(groupItem, function(pixel){
					isNear = that.isNear(item, pixel);

					if(isNear && (item != pixel)){
						groupItem.push(item);
						return false
					}
				})
				return !isNear
			});
			//都不靠近的话，pixelsGroup增加一条
			!isNear && pixelsGroup.push([item]);
			i++;
		}
	}
	/**
	 * 将所有的点排序，排序规则x值从小到大，x值相等时，按照y值从小到大的顺序排排列
	 * @param  {[type]} pixels [description]
	 * @return {[type]}        [description]
	 */
	sortPixels(pixels){
		pixels.sort(function(a, b){
			let result;

			b = b.pixel;
			a = a.pixel;

			result = a.x - b.x ;

			if(result === 0){
				result = b.y - a.y;
			}

			return result
		})
	}
	/**
	 * 将所有的点以x,y坐标值为id缓存到map中，以保证标注label过程中，不污染源数据
	 */
	setPixelsMap(){
		let pixels = this.pixels,
			map = this.pixelsMap,
			item, key, mapItem;

		for (let i = pixels.length - 1; i >= 0; i--) {
			item = pixels[i];
			key = this.getPixelsId(item);
			mapItem = map[key] = {
				isShow: 1,
				text: item.name,
				pixel: item.pixel,
				labelBounds: null,
				labelPixel: null,
				labelPosition: 'right'
			};
			this.setLabelPixelAndBounds(mapItem);
		}
	}
	/**
	 * 按照ID或者源数据中的pixel，取得pixelsMap对应的item
	 * @param  {[type]} pixel [description]
	 * @return {[type]}       [description]
	 */
	getPixelsMapItem(pixel){
		let map = this.pixelsMap,
			key = isObject(pixel) ? this.getPixelsId(pixel) : pixel;

		return map[key];
	}
	/**
	 * 设置Label标注后占据的区域，及Label文案的起始点
	 * @param {[type]} item [description]
	 */
	setLabelPixelAndBounds(item, position = item.labelPosition){
		let ctx = this.ctx,
			pixel = item.pixel,
			textRender = this.textRender,
			textWidth = textRender.getTextWidth(ctx, item.text),
			textHeight = textRender.getTextHeight(),
			offset = this.offset,
			boundsWidth,
			boundsHeight,
			boundsMinX,
			boundsMaxX,
			boundsMinY,
			boundsMaxY,
			labelPixel = {};

		item.labelPosition = position;

		switch(position){
			case 'top':
				boundsWidth = textWidth;
				boundsHeight = textHeight + offset;
				boundsMinX = pixel.x - textWidth * 0.5;
				boundsMinY = pixel.y - boundsHeight;
				labelPixel = {
					x: boundsMinX,
					y: pixel.y - offset
				};
				break;
			case 'topRight':
				boundsWidth = textWidth + offset;
				boundsHeight = textHeight + offset;
				boundsMinX = pixel.x;
				boundsMinY = pixel.y - boundsHeight;
				labelPixel = {
					x: pixel.x + offset,
					y: pixel.y - offset
				};
				break;
			case 'right':
				boundsWidth = textWidth + offset;
				boundsHeight = textHeight;
				boundsMinX = pixel.x;
				boundsMinY = pixel.y - textHeight * 0.5;
				labelPixel = {
					x: pixel.x + offset,
					y: boundsMinY + boundsHeight
				};
				break;
			case 'bottomRight':
				boundsWidth = textWidth + offset;
				boundsHeight = textHeight + offset;
				boundsMinX = pixel.x;
				boundsMinY = pixel.y;
				labelPixel = {
					x: pixel.x + offset,
					y: pixel.y + offset
				};
				break;
			case 'bottom':
				boundsWidth = textWidth;
				boundsHeight = textHeight + offset;
				boundsMinX = pixel.x - textWidth * 0.5;
				boundsMinY = pixel.y;
				labelPixel = {
					x: boundsMinX,
					y: boundsMinY + boundsHeight
				};
				
				break;
			case 'bottomLeft':
				boundsWidth = textWidth + offset;
				boundsHeight = textHeight + offset;
				boundsMinX = pixel.x - boundsWidth;
				boundsMinY = pixel.y;
				labelPixel = {
					x: boundsMinX,
					y: boundsMinY + boundsHeight
				};
				break;
			case 'left':
				boundsWidth = textWidth + offset;
				boundsHeight = textHeight;
				boundsMinX = pixel.x - boundsWidth;
				boundsMinY = pixel.y - textHeight * 0.5;
				labelPixel = {
					x: boundsMinX,
					y: boundsMinY + boundsHeight
				};
				break;
			case 'topLeft':
				boundsWidth = textWidth + offset;
				boundsHeight = textHeight + offset;
				boundsMinX = pixel.x - boundsWidth;
				boundsMinY = pixel.y - boundsHeight;
				labelPixel = {
					x: boundsMinX,
					y: pixel.y - offset
				};
				break;
			case 'none':
				item.isShow = 0; 
				boundsWidth = boundsHeight = 1;
				boundsMinX = pixel.x;
				boundsMinY = pixel.y;
				labelPixel = pixel;
				break;
		}

		item.labelPixel = labelPixel;
		item.labelBounds = {
			width: boundsWidth,
			height: boundsHeight,
			minX: boundsMinX,
			minY: boundsMinY,
			maxX: boundsMinX + boundsWidth,
			maxY: boundsMinY + boundsHeight
		};
	}
	/**
	 * 按照分组绘制Label，每组只有一个点时直接标注，两个点时，将左侧的点label设置为左侧，三个以上点时自动避让
	 * @return {[type]} [description]
	 */
	drawByGroup(){
		let that = this,
			group = this.pixelsGroup,
			mapItem;

		forEach(group, function(item){
			if(item.length > 1){
				that.avoidLabelByGroup(item);
			}

			that.drawPixels(item);
		});
	}
	/**
	 * 按照组将重叠的Label避让标注
	 * @param  {[type]} pixels [description]
	 * @return {[type]}        [description]
	 */
	avoidLabelByGroup(pixels){
		let group = this.setGroupBounds(pixels),
			overlappedPixels;

		this.setGirdMatrix(group);
		this.setPixelsToGird(group);
		this._avoidLabel(group);

		// this._drawGird(group.matrix);
	}
	/**
	 * 自动避让该组中，重叠的Label
	 * @param  {[type]} group [description]
	 * @return {[type]}       [description]
	 */
	_avoidLabel(group){
		let overlappedPixels = this._getOverlappedPixels(group);

		forEach(overlappedPixels, (pixel) => {
			let positions = ['top', 'left', 'bottom', 'topRight', 'topLeft', 'bottomLeft', 'bottomRight', 'none'];
			forEach(positions, (position) => {
				let overlapped = this._getOverlappedPixels(group, 'map'),
					mapItem;

				if(overlapped[pixel]){
					mapItem = this.getPixelsMapItem(pixel);
					this.setLabelPixelAndBounds(mapItem, position);
					this.setPixelsToGird(group);
				}else{
					return false
				}
			});
		})
	}
	/**
	 * 获取该组中Label重叠的点
	 * @param  {[type]} group [description]
	 * @return {[type]}       [description]
	 */
	_getOverlappedPixels(group, type = 'array'){
		let matrix = group.matrix,
			overlappedPixels = [],
			pixelsMap = {},
			result;

		forEach(matrix, function(row){
			forEach(row, function(item){
				let pixels = item.pixels;

				if(pixels.length > 1){
					forEach(pixels, function(pixel){
						if(!pixelsMap[pixel]){
							overlappedPixels.push(pixel);
							pixelsMap[pixel] = true;
						}
					})
				}
			})
		});

		result = {
			array: overlappedPixels,
			map: pixelsMap
		}

		return result[type]
	}
	setGroupBounds(pixels){
		let that = this,
			i = 0,
			group = {
				pixels: [],
				bounds: {}
			},
			offset = this.offset,
			item,
			pixel,
			textHeight = this.textRender.getTextHeight(),
			left, right,
			minX, maxX,
			minY, maxY;

		//确定所有点中的最大，最小x,y坐标
		while(i < pixels.length){
			item = that.getPixelsMapItem(pixels[i]);
			pixel = item.pixel;
			group.pixels.push(that.getPixelsId(pixels[i]));

			minY = (!minY || minY > pixel.y) ? pixel.y : minY;
			maxY = (!maxY || maxY < pixel.y) ? pixel.y : maxY;

			if(!minX || minX > pixel.x){
				left = item;
				minX = pixel.x;
			}
			if(!maxX || maxX < pixel.x){
				right = item;
				maxX = pixel.x;
			}
			
			i++;
		}

		group.bounds = {
			minX: minX - left.labelBounds.width,
			maxX: maxX + right.labelBounds.width,
			minY: minY - textHeight - offset, //区域上下要留出offset的区域
			maxY: maxY + textHeight + offset
		}

		return group
	}
	setGirdMatrix(group){
		let matrix = [],
			i = 0, row, item,
			girdSize = this.textRender.getFontSize() / 2,
			bounds = group.bounds,
			x,
			y = bounds.minY;

		while(y < bounds.maxY){
			if(!matrix[i]){
				matrix[i] = [];
			}
			row = matrix[i];
			x = bounds.minX;
			while(x < bounds.maxX){
				row.push({
					bounds: {
						minX: x,
						maxX: x + girdSize > bounds.maxX ? bounds.maxX : x + girdSize,
						minY: y,
						maxY: y + girdSize > bounds.maxY ? bounds.maxY : y + girdSize
					},
					pixels: []
				});

				x += girdSize;
			}
			y += girdSize;
			i++;
		}

		group.matrix = matrix;
		group.girdSize = girdSize;
	}
	setPixelsToGird(group){
		let that = this,
			pixels = group.pixels,
			girdSize = group.girdSize,
			matrix = group.matrix,
			groupBounds = group.bounds;

		this.clearPixelsGird(group);
		//当组内pixels的个数大于等于3时才微移label标注，两个点简单的调整就能达到避让的效果
		// pixels.length > 2 && this.nudgeLabelByGird(group);

		forEach(pixels, function(item){
			let pixelItem = that.getPixelsMapItem(item),
				labelBounds = pixelItem.labelBounds,
				startCol = Math.floor((labelBounds.minX - groupBounds.minX) / girdSize),
				endCol = Math.ceil((labelBounds.maxX - groupBounds.minX) / girdSize),
				startRow = Math.floor((labelBounds.minY - groupBounds.minY) / girdSize),
				endRow = Math.ceil((labelBounds.maxY - groupBounds.minY) / girdSize),
				x = startRow, //行, 从0开始
				y; //列, 从0开始

			while(pixelItem.isShow && x < endRow){
				y = startCol;
				while(y < endCol){
					matrix[x][y] && matrix[x][y].pixels.push(pixelItem);
					y++;
				}
				x++;
			}
		})
	}
	clearPixelsGird(group){
		forEach(group.matrix, function(row){
			forEach(row, function(item){
				item.pixels = [];
			})
		})
	}
	getIndex(max, min, size){
		return Math.floor((max - min)/size)
	}
	_drawGird(matrix){
		let that = this,
			ctx = this.ctx,
			tl, tr, bl, br;

		forEach(matrix, function(row){
			forEach(row, function(item){
				let bounds = item.bounds;
				ctx.beginPath();
				ctx.lineWidth = "1";
				ctx.strokeStyle = "white";
				ctx.rect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
				ctx.stroke();

				item.pixels.length && that.drawText(item.pixels.length, {x: bounds.minX, y: bounds.maxY}, 'red');
			})
		})
	}
	getPixelsId(pixel){
		pixel = pixel.pixel;

		return 'x' + pixel.x + 'y' + pixel.y
	}
	isNear(target, point){
		var targetPixel, pointPixel,boundary;

		target = this.getPixelsMapItem(target);
		point = this.getPixelsMapItem(point);

		targetPixel = target.labelPixel;
		pointPixel = point.labelPixel;
		boundary = target.labelBounds;

		return Math.abs(targetPixel.x - pointPixel.x) < 2 * boundary.width || Math.abs(targetPixel.y - pointPixel.y) < 2 * boundary.height
	}
	_dataRender() {
		let pixels = this.workData,
			ctx = this.ctx;

		for (let i = 0, len = pixels.length; i < len; i++) {
			let pixels = pixels[i];

			this.drawText(ctx, pixels);
		}
	}
	drawPixels(pixels){
		let that = this, item;

		forEach(pixels, function(pixel, index){
			item = that.getPixelsMapItem(pixel);

			item.isShow && that.drawText(item.text, item.labelPixel);
		})
	}
	drawText(text, position, color) {
		let ctx = this.ctx,
			textRender = this.textRender;

		textRender.draw(ctx, text, position, color)
	}
}