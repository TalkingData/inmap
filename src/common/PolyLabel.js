import Queue from '../lib/tinyqueue';

function Cell(x, y, h, polygon) {
    this.x = x; // 中心点x
    this.y = y; // 中心点y
    this.h = h; // 中心点到网格的距离，相当于格网大小的1/2
    this.d = pointToPolygonDist(x, y, polygon); // 中心点到多边形的距离
    this.max = this.d + this.h * Math.SQRT2; // 网格内部区域到多边形的最大距离
}

function distSqr(p, a) {
    let dx = p.x - a.x,
        dy = p.y - a.y;
    return dx * dx + dy * dy;
}

function sub(a, p) {
    a.x -= p.x;
    a.y -= p.y;
    return a;
}

function mult(a, k) {
    a.x *= k;
    a.y *= k;
    return a;
}

function and(a, p) {
    a.x += p.x;
    a.y += p.y;
    return a;
}

function distToSegmentSquared(p, v, w) {
    const l2 = distSqr(w, v);
    if (l2 === 0) return distSqr(v, p);
    const t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return distSqr(v, p);
    if (t > 1) return distSqr(w, p);
    return distSqr(and(mult(sub(w, v), t), v), p);

}
// signed distance from point to polygon outline (negative if point is outside)
function pointToPolygonDist(p, polygon) {
    let inside = false;
    let minDistSq = Infinity;

    for (let k = 0; k < polygon.length; k++) {
        const ring = polygon[k];

        for (let i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
            const a = ring[i];
            const b = ring[j];

            if ((a.y > p.y !== b.y > p.y) &&
                (p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)) inside = !inside;

            minDistSq = Math.min(minDistSq, distToSegmentSquared(p, a, b));
        }
    }

    return (inside ? 1 : -1) * Math.sqrt(minDistSq);
}

function getCentroid(polygon) {
    let totalArea = 0;
    let totalX = 0;
    let totalY = 0;
    let points = polygon[0];
    for (let i = 0; i < points.length - 1; ++i) {
        // a、b以及原点构成一个三角形

        let a = points[i + 1];
        let b = points[i];
        let area = 0.5 * (a[0] * b[1] - b[0] * a[1]); // 计算面积
        let x = (a[0] + b[0]) / 3; // 计算x方向质心
        let y = (a[1] + b[1]) / 3; // 计算y方向质心
        totalArea += area;
        totalX += area * x;
        totalY += area * y;

    }
    return new Cell(totalX / totalArea, totalY / totalArea);
}

export default function Polylabel(polygon) {
    // 计算bbox，为切分网格做准备
    let minX, minY, maxX, maxY;
    for (let i = 0; i < polygon[0].length; i++) {
        let p = polygon[0][i];
        if (!i || p[0] < minX) minX = p[0];
        if (!i || p[1] < minY) minY = p[1];
        if (!i || p[0] > maxX) maxX = p[0];
        if (!i || p[1] > maxY) maxY = p[1];
    }
    if (minX == maxX || minY == maxY) { //直线问题
        return null;
    }
    // 计算长和宽，初始格网大小和高度
    let width = maxX - minX;
    let height = maxY - minY;
    let cellSize = Math.min(width, height);
    let h = cellSize / 2;
    // 初始化一个存储Cell的优先级队列，按距离从大到小排列
    let cellQueue = new Queue(null, function (a, b) {
        return b.max - a.max;
    });
    // 将多边形切分
    for (let x = minX; x < maxX; x += cellSize) {
        for (let y = minY; y < maxY; y += cellSize) {
            cellQueue.push(new Cell(x + h, y + h, h, polygon));
        }
    }
    // 取对首为最优格网
    let bestCell = getCentroid(polygon);
    while (cellQueue.length) {
        let cell = cellQueue.pop();
        if (cell.d > bestCell.d) bestCell = cell;
        // 最大距离小于最优格网的距离，直接淘汰
        if (cell.max <= bestCell.d) continue;
        // 将格网裂为4个小格网
        h = cell.h / 2;
        cellQueue.push(new Cell(cell.x - h, cell.y - h, h, polygon));
        cellQueue.push(new Cell(cell.x + h, cell.y - h, h, polygon));
        cellQueue.push(new Cell(cell.x - h, cell.y + h, h, polygon));
        cellQueue.push(new Cell(cell.x + h, cell.y + h, h, polygon));
    }
    return {
        x: bestCell.x,
        y: bestCell.y
    };
}