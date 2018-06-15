function getOffsetPoint(start, end, deltaAngle) {
    let distance = getDistance(start, end) / 4;
    let angle, dX, dY;
    let mp = [start[0], start[1]];
    deltaAngle = deltaAngle == null ? -0.2 : deltaAngle;
    if (start[0] != end[0] && start[1] != end[1]) {
        let k = (end[1] - start[1]) / (end[0] - start[0]);
        angle = Math.atan(k);
    } else if (start[0] == end[0]) {
        angle = (start[1] <= end[1] ? 1 : -1) * Math.PI / 2;
    } else {
        angle = 0;
    }
    if (start[0] <= end[0]) {
        angle -= deltaAngle;
        dX = Math.round(Math.cos(angle) * distance);
        dY = Math.round(Math.sin(angle) * distance);
        mp[0] += dX;
        mp[1] += dY;
    } else {
        angle += deltaAngle;
        dX = Math.round(Math.cos(angle) * distance);
        dY = Math.round(Math.sin(angle) * distance);
        mp[0] -= dX;
        mp[1] -= dY;
    }
    return mp;
}

function smoothSpline(points, isLoop) {
    let len = points.length;
    let ret = [];
    let distance = 0;
    for (let i = 1; i < len; i++) {
        distance += getDistance(points[i - 1], points[i]);
    }
    let segs = distance / 2;
    segs = segs < len ? len : segs;
    for (let i = 0; i < segs; i++) {
        let pos = i / (segs - 1) * (isLoop ? len : len - 1);
        let idx = Math.floor(pos);
        let w = pos - idx;
        let p0;
        let p1 = points[idx % len];
        let p2;
        let p3;
        if (!isLoop) {
            p0 = points[idx === 0 ? idx : idx - 1];
            p2 = points[idx > len - 2 ? len - 1 : idx + 1];
            p3 = points[idx > len - 3 ? len - 1 : idx + 2];
        } else {
            p0 = points[(idx - 1 + len) % len];
            p2 = points[(idx + 1) % len];
            p3 = points[(idx + 2) % len];
        }
        let w2 = w * w;
        let w3 = w * w2;

        ret.push([
            interpolate(p0[0], p1[0], p2[0], p3[0], w, w2, w3),
            interpolate(p0[1], p1[1], p2[1], p3[1], w, w2, w3)
        ]);
    }
    return ret;
}

function interpolate(p0, p1, p2, p3, t, t2, t3) {
    let v0 = (p2 - p0) * 0.5;
    let v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3 + (-3 * (p1 - p2) - 2 * v0 - v1) * t2 + v0 * t + p1;
}

function getDistance(p1, p2) {
    return Math.sqrt(
        (p1[0] - p2[0]) * (p1[0] - p2[0]) +
        (p1[1] - p2[1]) * (p1[1] - p2[1])
    );
}
export function lineCurive(fromPoint, endPoint, n) {
    let delLng = (endPoint[0] - fromPoint[0]) / n;
    let delLat = (endPoint[1] - fromPoint[1]) / n;
    let path = [];
    for (let i = 0; i < n; i++) {
        let pointNLng = fromPoint[0] + delLng * i;
        let pointNLat = fromPoint[1] + delLat * i;
        path.push([pointNLng, pointNLat]);
    }
    return path;
}
export function getPointList(start, end, deltaAngle) {
    let points = [
        [start[0], start[1]],
        [end[0], end[1]]
    ];
    let ex = points[1][0];
    let ey = points[1][1];
    points[3] = [ex, ey];
    points[1] = getOffsetPoint(points[0], points[3], deltaAngle);
    points[2] = getOffsetPoint(points[3], points[0], deltaAngle);
    points = smoothSpline(points, false);
    points[points.length - 1] = [ex, ey];
    return points;
}