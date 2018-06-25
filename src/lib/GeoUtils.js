var GeoUtils;
(function () {
    var a = 6370996.81;
    var b = GeoUtils = function () {};
    b.isPointInRect = function (f, g) {
        if (!(f instanceof BMap.Point) || !(g instanceof BMap.Bounds)) {
            return false
        }
        var e = g.getSouthWest();
        var h = g.getNorthEast();
        return (f.lng >= e.lng && f.lng <= h.lng && f.lat >= e.lat && f.lat <= h.lat)
    };
    b.isPointInCircle = function (e, h) {
        if (!(e instanceof BMap.Point) || !(h instanceof BMap.Circle)) {
            return false
        }
        var i = h.getCenter();
        var g = h.getRadius();
        var f = b.getDistance(e, i);
        if (f <= g) {
            return true
        } else {
            return false
        }
    };
    b.isPointOnPolyline = function (f, h) {
        if (!(f instanceof BMap.Point) || !(h instanceof BMap.Polyline)) {
            return false
        }
        var e = h.getBounds();
        if (!this.isPointInRect(f, e)) {
            return false
        }
        var m = h.getPath();
        for (var k = 0; k < m.length - 1; k++) {
            var l = m[k];
            var j = m[k + 1];
            if (f.lng >= Math.min(l.lng, j.lng) && f.lng <= Math.max(l.lng, j.lng) && f.lat >= Math.min(l.lat, j.lat) && f.lat <= Math.max(l.lat, j.lat)) {
                var g = (l.lng - f.lng) * (j.lat - f.lat) - (j.lng - f.lng) * (l.lat - f.lat);
                if (g < 2e-10 && g > -2e-10) {
                    return true
                }
            }
        }
        return false
    };
    b.isPointInPolygon = function (o, l) {
        if (!(o instanceof BMap.Point) || !(l instanceof BMap.Polygon)) {
            return false
        }
        var k = l.getBounds();
        if (!this.isPointInRect(o, k)) {
            return false
        }
        var t = l.getPath();
        var h = t.length;
        var n = true;
        var j = 0;
        var g = 2e-10;
        var s, q;
        var e = o;
        s = t[0];
        for (var f = 1; f <= h; ++f) {
            if (e.equals(s)) {
                return n
            }
            q = t[f % h];
            if (e.lat < Math.min(s.lat, q.lat) || e.lat > Math.max(s.lat, q.lat)) {
                s = q;
                continue
            }
            if (e.lat > Math.min(s.lat, q.lat) && e.lat < Math.max(s.lat, q.lat)) {
                if (e.lng <= Math.max(s.lng, q.lng)) {
                    if (s.lat == q.lat && e.lng >= Math.min(s.lng, q.lng)) {
                        return n
                    }
                    if (s.lng == q.lng) {
                        if (s.lng == e.lng) {
                            return n
                        } else {
                            ++j
                        }
                    } else {
                        var r = (e.lat - s.lat) * (q.lng - s.lng) / (q.lat - s.lat) + s.lng;
                        if (Math.abs(e.lng - r) < g) {
                            return n
                        }
                        if (e.lng < r) {
                            ++j
                        }
                    }
                }
            } else {
                if (e.lat == q.lat && e.lng <= q.lng) {
                    var m = t[(f + 1) % h];
                    if (e.lat >= Math.min(s.lat, m.lat) && e.lat <= Math.max(s.lat, m.lat)) {
                        ++j
                    } else {
                        j += 2
                    }
                }
            }
            s = q
        }
        if (j % 2 == 0) {
            return false
        } else {
            return true
        }
    };
    b.degreeToRad = function (e) {
        return Math.PI * e / 180
    };
    b.radToDegree = function (e) {
        return (180 * e) / Math.PI
    };

    function d(g, f, e) {
        if (f != null) {
            g = Math.max(g, f)
        }
        if (e != null) {
            g = Math.min(g, e)
        }
        return g
    }

    function c(g, f, e) {
        while (g > e) {
            g -= e - f
        }
        while (g < f) {
            g += e - f
        }
        return g
    }
    b.getDistance = function (j, h) {
        if (!(j instanceof BMap.Point) || !(h instanceof BMap.Point)) {
            return 0
        }
        j.lng = c(j.lng, -180, 180);
        j.lat = d(j.lat, -74, 74);
        h.lng = c(h.lng, -180, 180);
        h.lat = d(h.lat, -74, 74);
        var f, e, i, g;
        f = b.degreeToRad(j.lng);
        i = b.degreeToRad(j.lat);
        e = b.degreeToRad(h.lng);
        g = b.degreeToRad(h.lat);
        return a * Math.acos((Math.sin(i) * Math.sin(g) + Math.cos(i) * Math.cos(g) * Math.cos(e - f)))
    };
    b.getPolylineDistance = function (f) {
        if (f instanceof BMap.Polyline || f instanceof Array) {
            var l;
            if (f instanceof BMap.Polyline) {
                l = f.getPath()
            } else {
                l = f
            }
            if (l.length < 2) {
                return 0
            }
            var j = 0;
            for (var h = 0; h < l.length - 1; h++) {
                var k = l[h];
                var g = l[h + 1];
                var e = b.getDistance(k, g);
                j += e
            }
            return j
        } else {
            return 0
        }
    };
    b.getPolygonArea = function (t) {
        if (!(t instanceof BMap.Polygon) && !(t instanceof Array)) {
            return 0
        }
        var R;
        if (t instanceof BMap.Polygon) {
            R = t.getPath()
        } else {
            R = t
        }
        if (R.length < 3) {
            return 0
        }
        var w = 0;
        var D = 0;
        var C = 0;
        var L = 0;
        var J = 0;
        var F = 0;
        var E = 0;
        var S = 0;
        var H = 0;
        var p = 0;
        var T = 0;
        var I = 0;
        var q = 0;
        var e = 0;
        var M = 0;
        var v = 0;
        var K = 0;
        var N = 0;
        var s = 0;
        var O = 0;
        var l = 0;
        var g = 0;
        var z = 0;
        var Q = 0;
        var G = 0;
        var j = 0;
        var A = 0;
        var o = 0;
        var m = 0;
        var y = 0;
        var x = 0;
        var h = 0;
        var k = 0;
        var f = 0;
        var n = a;
        var B = R.length;
        for (var P = 0; P < B; P++) {
            if (P == 0) {
                D = R[B - 1].lng * Math.PI / 180;
                C = R[B - 1].lat * Math.PI / 180;
                L = R[0].lng * Math.PI / 180;
                J = R[0].lat * Math.PI / 180;
                F = R[1].lng * Math.PI / 180;
                E = R[1].lat * Math.PI / 180
            } else {
                if (P == B - 1) {
                    D = R[B - 2].lng * Math.PI / 180;
                    C = R[B - 2].lat * Math.PI / 180;
                    L = R[B - 1].lng * Math.PI / 180;
                    J = R[B - 1].lat * Math.PI / 180;
                    F = R[0].lng * Math.PI / 180;
                    E = R[0].lat * Math.PI / 180
                } else {
                    D = R[P - 1].lng * Math.PI / 180;
                    C = R[P - 1].lat * Math.PI / 180;
                    L = R[P].lng * Math.PI / 180;
                    J = R[P].lat * Math.PI / 180;
                    F = R[P + 1].lng * Math.PI / 180;
                    E = R[P + 1].lat * Math.PI / 180
                }
            }
            S = Math.cos(J) * Math.cos(L);
            H = Math.cos(J) * Math.sin(L);
            p = Math.sin(J);
            T = Math.cos(C) * Math.cos(D);
            I = Math.cos(C) * Math.sin(D);
            q = Math.sin(C);
            e = Math.cos(E) * Math.cos(F);
            M = Math.cos(E) * Math.sin(F);
            v = Math.sin(E);
            K = (S * S + H * H + p * p) / (S * T + H * I + p * q);
            N = (S * S + H * H + p * p) / (S * e + H * M + p * v);
            s = K * T - S;
            O = K * I - H;
            l = K * q - p;
            g = N * e - S;
            z = N * M - H;
            Q = N * v - p;
            m = (g * s + z * O + Q * l) / (Math.sqrt(g * g + z * z + Q * Q) * Math.sqrt(s * s + O * O + l * l));
            m = Math.acos(m);
            G = z * l - Q * O;
            j = 0 - (g * l - Q * s);
            A = g * O - z * s;
            if (S != 0) {
                o = G / S
            } else {
                if (H != 0) {
                    o = j / H
                } else {
                    o = A / p
                }
            }
            if (o > 0) {
                y += m;
                k++
            } else {
                x += m;
                h++
            }
        }
        var u, r;
        u = y + (2 * Math.PI * h - x);
        r = (2 * Math.PI * k - y) + x;
        if (y > x) {
            if ((u - (B - 2) * Math.PI) < 1) {
                f = u
            } else {
                f = r
            }
        } else {
            if ((r - (B - 2) * Math.PI) < 1) {
                f = r
            } else {
                f = u
            }
        }
        w = (f - (B - 2) * Math.PI) * n * n;
        return w
    }
})();
export default GeoUtils;