var CanvasKitInit = (() => {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
        function (moduleArg = {}) {

            var r = moduleArg, aa, ba;
            r.ready = new Promise((a, b) => {
                aa = a;
                ba = b
            });
            (function (a) {
                a.Hd = a.Hd || [];
                a.Hd.push(function () {
                    a.MakeSWCanvasSurface = function (b) {
                        var c = b, e = "undefined" !== typeof OffscreenCanvas && c instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && c instanceof HTMLCanvasElement || e || (c = document.getElementById(b), c))) throw "Canvas with id " + b + " was not found";
                        if (b = a.MakeSurface(c.width, c.height)) b.he = c;
                        return b
                    };
                    a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
                    a.MakeSurface = function (b, c) {
                        var e = {
                            width: b, height: c, colorType: a.ColorType.RGBA_8888,
                            alphaType: a.AlphaType.Unpremul, colorSpace: a.ColorSpace.SRGB
                        }, f = b * c * 4, k = a._malloc(f);
                        if (e = a.Surface._makeRasterDirect(e, k, 4 * b)) e.he = null, e.Pe = b, e.Me = c, e.Ne = f, e.se = k, e.getCanvas().clear(a.TRANSPARENT);
                        return e
                    };
                    a.MakeRasterDirectSurface = function (b, c, e) {
                        return a.Surface._makeRasterDirect(b, c.byteOffset, e)
                    };
                    a.Surface.prototype.flush = function (b) {
                        a.Ed(this.Dd);
                        this._flush();
                        if (this.he) {
                            var c = new Uint8ClampedArray(a.HEAPU8.buffer, this.se, this.Ne);
                            c = new ImageData(c, this.Pe, this.Me);
                            b ? this.he.getContext("2d").putImageData(c,
                                0, 0, b[0], b[1], b[2] - b[0], b[3] - b[1]) : this.he.getContext("2d").putImageData(c, 0, 0)
                        }
                    };
                    a.Surface.prototype.dispose = function () {
                        this.se && a._free(this.se);
                        this.delete()
                    };
                    a.Ed = a.Ed || function () {
                    };
                    a.ie = a.ie || function () {
                        return null
                    }
                })
            })(r);
            (function (a) {
                a.Hd = a.Hd || [];
                a.Hd.push(function () {
                    function b(m, q, w) {
                        return m && m.hasOwnProperty(q) ? m[q] : w
                    }

                    function c(m) {
                        var q = da(ea);
                        ea[q] = m;
                        return q
                    }

                    function e(m) {
                        return m.naturalHeight || m.videoHeight || m.displayHeight || m.height
                    }

                    function f(m) {
                        return m.naturalWidth || m.videoWidth || m.displayWidth || m.width
                    }

                    function k(m, q, w, y) {
                        m.bindTexture(m.TEXTURE_2D, q);
                        y || w.alphaType !== a.AlphaType.Premul || m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                        return q
                    }

                    function l(m, q, w) {
                        w || q.alphaType !== a.AlphaType.Premul ||
                        m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
                        m.bindTexture(m.TEXTURE_2D, null)
                    }

                    a.GetWebGLContext = function (m, q) {
                        if (!m) throw "null canvas passed into makeWebGLContext";
                        var w = {
                            alpha: b(q, "alpha", 1),
                            depth: b(q, "depth", 1),
                            stencil: b(q, "stencil", 8),
                            antialias: b(q, "antialias", 0),
                            premultipliedAlpha: b(q, "premultipliedAlpha", 1),
                            preserveDrawingBuffer: b(q, "preserveDrawingBuffer", 0),
                            preferLowPowerToHighPerformance: b(q, "preferLowPowerToHighPerformance", 0),
                            failIfMajorPerformanceCaveat: b(q, "failIfMajorPerformanceCaveat",
                                0),
                            enableExtensionsByDefault: b(q, "enableExtensionsByDefault", 1),
                            explicitSwapControl: b(q, "explicitSwapControl", 0),
                            renderViaOffscreenBackBuffer: b(q, "renderViaOffscreenBackBuffer", 0)
                        };
                        w.majorVersion = q && q.majorVersion ? q.majorVersion : "undefined" !== typeof WebGL2RenderingContext ? 2 : 1;
                        if (w.explicitSwapControl) throw "explicitSwapControl is not supported";
                        m = fa(m, w);
                        if (!m) return 0;
                        ha(m);
                        x.Pd.getExtension("WEBGL_debug_renderer_info");
                        return m
                    };
                    a.deleteContext = function (m) {
                        x === ia[m] && (x = null);
                        "object" == typeof JSEvents &&
                        JSEvents.tf(ia[m].Pd.canvas);
                        ia[m] && ia[m].Pd.canvas && (ia[m].Pd.canvas.Ke = void 0);
                        ia[m] = null
                    };
                    a._setTextureCleanup({
                        deleteTexture: function (m, q) {
                            var w = ea[q];
                            w && ia[m].Pd.deleteTexture(w);
                            ea[q] = null
                        }
                    });
                    a.MakeWebGLContext = function (m) {
                        if (!this.Ed(m)) return null;
                        var q = this._MakeGrContext();
                        if (!q) return null;
                        q.Dd = m;
                        var w = q.delete.bind(q);
                        q["delete"] = function () {
                            a.Ed(this.Dd);
                            w()
                        }.bind(q);
                        return x.ue = q
                    };
                    a.MakeGrContext = a.MakeWebGLContext;
                    a.GrDirectContext.prototype.getResourceCacheLimitBytes = function () {
                        a.Ed(this.Dd);
                        this._getResourceCacheLimitBytes()
                    };
                    a.GrDirectContext.prototype.getResourceCacheUsageBytes = function () {
                        a.Ed(this.Dd);
                        this._getResourceCacheUsageBytes()
                    };
                    a.GrDirectContext.prototype.releaseResourcesAndAbandonContext = function () {
                        a.Ed(this.Dd);
                        this._releaseResourcesAndAbandonContext()
                    };
                    a.GrDirectContext.prototype.setResourceCacheLimitBytes = function (m) {
                        a.Ed(this.Dd);
                        this._setResourceCacheLimitBytes(m)
                    };
                    a.MakeOnScreenGLSurface = function (m, q, w, y, B, D) {
                        if (!this.Ed(m.Dd)) return null;
                        q = void 0 === B || void 0 === D ?
                            this._MakeOnScreenGLSurface(m, q, w, y) : this._MakeOnScreenGLSurface(m, q, w, y, B, D);
                        if (!q) return null;
                        q.Dd = m.Dd;
                        return q
                    };
                    a.MakeRenderTarget = function () {
                        var m = arguments[0];
                        if (!this.Ed(m.Dd)) return null;
                        if (3 === arguments.length) {
                            var q = this._MakeRenderTargetWH(m, arguments[1], arguments[2]);
                            if (!q) return null
                        } else if (2 === arguments.length) {
                            if (q = this._MakeRenderTargetII(m, arguments[1]), !q) return null
                        } else return null;
                        q.Dd = m.Dd;
                        return q
                    };
                    a.MakeWebGLCanvasSurface = function (m, q, w) {
                        q = q || null;
                        var y = m, B = "undefined" !==
                            typeof OffscreenCanvas && y instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && y instanceof HTMLCanvasElement || B || (y = document.getElementById(m), y))) throw "Canvas with id " + m + " was not found";
                        m = this.GetWebGLContext(y, w);
                        if (!m || 0 > m) throw "failed to create webgl context: err " + m;
                        m = this.MakeWebGLContext(m);
                        q = this.MakeOnScreenGLSurface(m, y.width, y.height, q);
                        return q ? q : (q = y.cloneNode(!0), y.parentNode.replaceChild(q, y), q.classList.add("ck-replaced"), a.MakeSWCanvasSurface(q))
                    };
                    a.MakeCanvasSurface =
                        a.MakeWebGLCanvasSurface;
                    a.Surface.prototype.makeImageFromTexture = function (m, q) {
                        a.Ed(this.Dd);
                        m = c(m);
                        if (q = this._makeImageFromTexture(this.Dd, m, q)) q.ce = m;
                        return q
                    };
                    a.Surface.prototype.makeImageFromTextureSource = function (m, q, w) {
                        q || (q = {
                            height: e(m),
                            width: f(m),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: w ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        });
                        q.colorSpace || (q.colorSpace = a.ColorSpace.SRGB);
                        a.Ed(this.Dd);
                        var y = x.Pd;
                        w = k(y, y.createTexture(), q, w);
                        2 === x.version ? y.texImage2D(y.TEXTURE_2D, 0, y.RGBA, q.width, q.height,
                            0, y.RGBA, y.UNSIGNED_BYTE, m) : y.texImage2D(y.TEXTURE_2D, 0, y.RGBA, y.RGBA, y.UNSIGNED_BYTE, m);
                        l(y, q);
                        this._resetContext();
                        return this.makeImageFromTexture(w, q)
                    };
                    a.Surface.prototype.updateTextureFromSource = function (m, q, w) {
                        if (m.ce) {
                            a.Ed(this.Dd);
                            var y = m.getImageInfo(), B = x.Pd, D = k(B, ea[m.ce], y, w);
                            2 === x.version ? B.texImage2D(B.TEXTURE_2D, 0, B.RGBA, f(q), e(q), 0, B.RGBA, B.UNSIGNED_BYTE, q) : B.texImage2D(B.TEXTURE_2D, 0, B.RGBA, B.RGBA, B.UNSIGNED_BYTE, q);
                            l(B, y, w);
                            this._resetContext();
                            ea[m.ce] = null;
                            m.ce = c(D);
                            y.colorSpace =
                                m.getColorSpace();
                            q = this._makeImageFromTexture(this.Dd, m.ce, y);
                            w = m.jd.Fd;
                            B = m.jd.Kd;
                            m.jd.Fd = q.jd.Fd;
                            m.jd.Kd = q.jd.Kd;
                            q.jd.Fd = w;
                            q.jd.Kd = B;
                            q.delete();
                            y.colorSpace.delete()
                        }
                    };
                    a.MakeLazyImageFromTextureSource = function (m, q, w) {
                        q || (q = {
                            height: e(m),
                            width: f(m),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: w ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        });
                        q.colorSpace || (q.colorSpace = a.ColorSpace.SRGB);
                        var y = {
                            makeTexture: function () {
                                var B = x, D = B.Pd, u = k(D, D.createTexture(), q, w);
                                2 === B.version ? D.texImage2D(D.TEXTURE_2D, 0, D.RGBA,
                                    q.width, q.height, 0, D.RGBA, D.UNSIGNED_BYTE, m) : D.texImage2D(D.TEXTURE_2D, 0, D.RGBA, D.RGBA, D.UNSIGNED_BYTE, m);
                                l(D, q, w);
                                return c(u)
                            }, freeSrc: function () {
                            }
                        };
                        "VideoFrame" === m.constructor.name && (y.freeSrc = function () {
                            m.close()
                        });
                        return a.Image._makeFromGenerator(q, y)
                    };
                    a.Ed = function (m) {
                        return m ? ha(m) : !1
                    };
                    a.ie = function () {
                        return x && x.ue && !x.ue.isDeleted() ? x.ue : null
                    }
                })
            })(r);
            (function (a) {
                function b(g) {
                    return (f(255 * g[3]) << 24 | f(255 * g[0]) << 16 | f(255 * g[1]) << 8 | f(255 * g[2]) << 0) >>> 0
                }

                function c(g) {
                    if (g && g._ck) return g;
                    if (g instanceof Float32Array) {
                        for (var d = Math.floor(g.length / 4), h = new Uint32Array(d), n = 0; n < d; n++) h[n] = b(g.slice(4 * n, 4 * (n + 1)));
                        return h
                    }
                    if (g instanceof Uint32Array) return g;
                    if (g instanceof Array && g[0] instanceof Float32Array) return g.map(b)
                }

                function e(g) {
                    if (void 0 === g) return 1;
                    var d = parseFloat(g);
                    return g && -1 !== g.indexOf("%") ? d / 100 : d
                }

                function f(g) {
                    return Math.round(Math.max(0,
                        Math.min(g || 0, 255)))
                }

                function k(g, d) {
                    d && d._ck || a._free(g)
                }

                function l(g, d, h) {
                    if (!g || !g.length) return M;
                    if (g && g._ck) return g.byteOffset;
                    var n = a[d].BYTES_PER_ELEMENT;
                    h || (h = a._malloc(g.length * n));
                    a[d].set(g, h / n);
                    return h
                }

                function m(g) {
                    var d = {Md: M, count: g.length, colorType: a.ColorType.RGBA_F32};
                    if (g instanceof Float32Array) d.Md = l(g, "HEAPF32"), d.count = g.length / 4; else if (g instanceof Uint32Array) d.Md = l(g, "HEAPU32"), d.colorType = a.ColorType.RGBA_8888; else if (g instanceof Array) {
                        if (g && g.length) {
                            for (var h = a._malloc(16 *
                                g.length), n = 0, t = h / 4, v = 0; v < g.length; v++) for (var z = 0; 4 > z; z++) a.HEAPF32[t + n] = g[v][z], n++;
                            g = h
                        } else g = M;
                        d.Md = g
                    } else throw "Invalid argument to copyFlexibleColorArray, Not a color array " + typeof g;
                    return d
                }

                function q(g) {
                    if (!g) return M;
                    var d = T.toTypedArray();
                    if (g.length) {
                        if (6 === g.length || 9 === g.length) return l(g, "HEAPF32", H), 6 === g.length && a.HEAPF32.set(fd, 6 + H / 4), H;
                        if (16 === g.length) return d[0] = g[0], d[1] = g[1], d[2] = g[3], d[3] = g[4], d[4] = g[5], d[5] = g[7], d[6] = g[12], d[7] = g[13], d[8] = g[15], H;
                        throw "invalid matrix size";
                    }
                    if (void 0 === g.m11) throw "invalid matrix argument";
                    d[0] = g.m11;
                    d[1] = g.m21;
                    d[2] = g.m41;
                    d[3] = g.m12;
                    d[4] = g.m22;
                    d[5] = g.m42;
                    d[6] = g.m14;
                    d[7] = g.m24;
                    d[8] = g.m44;
                    return H
                }

                function w(g) {
                    if (!g) return M;
                    var d = Y.toTypedArray();
                    if (g.length) {
                        if (16 !== g.length && 6 !== g.length && 9 !== g.length) throw "invalid matrix size";
                        if (16 === g.length) return l(g, "HEAPF32", ca);
                        d.fill(0);
                        d[0] = g[0];
                        d[1] = g[1];
                        d[3] = g[2];
                        d[4] = g[3];
                        d[5] = g[4];
                        d[7] = g[5];
                        d[10] = 1;
                        d[12] = g[6];
                        d[13] = g[7];
                        d[15] = g[8];
                        6 === g.length && (d[12] = 0, d[13] = 0, d[15] = 1);
                        return ca
                    }
                    if (void 0 ===
                        g.m11) throw "invalid matrix argument";
                    d[0] = g.m11;
                    d[1] = g.m21;
                    d[2] = g.m31;
                    d[3] = g.m41;
                    d[4] = g.m12;
                    d[5] = g.m22;
                    d[6] = g.m32;
                    d[7] = g.m42;
                    d[8] = g.m13;
                    d[9] = g.m23;
                    d[10] = g.m33;
                    d[11] = g.m43;
                    d[12] = g.m14;
                    d[13] = g.m24;
                    d[14] = g.m34;
                    d[15] = g.m44;
                    return ca
                }

                function y(g, d) {
                    return l(g, "HEAPF32", d || va)
                }

                function B(g, d, h, n) {
                    var t = Ma.toTypedArray();
                    t[0] = g;
                    t[1] = d;
                    t[2] = h;
                    t[3] = n;
                    return va
                }

                function D(g) {
                    for (var d = new Float32Array(4), h = 0; 4 > h; h++) d[h] = a.HEAPF32[g / 4 + h];
                    return d
                }

                function u(g, d) {
                    return l(g, "HEAPF32", d || X)
                }

                function F(g, d) {
                    return l(g,
                        "HEAPF32", d || Eb)
                }

                a.Color = function (g, d, h, n) {
                    void 0 === n && (n = 1);
                    return a.Color4f(f(g) / 255, f(d) / 255, f(h) / 255, n)
                };
                a.ColorAsInt = function (g, d, h, n) {
                    void 0 === n && (n = 255);
                    return (f(n) << 24 | f(g) << 16 | f(d) << 8 | f(h) << 0 & 268435455) >>> 0
                };
                a.Color4f = function (g, d, h, n) {
                    void 0 === n && (n = 1);
                    return Float32Array.of(g, d, h, n)
                };
                Object.defineProperty(a, "TRANSPARENT", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 0)
                    }
                });
                Object.defineProperty(a, "BLACK", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "WHITE", {
                    get: function () {
                        return a.Color4f(1,
                            1, 1, 1)
                    }
                });
                Object.defineProperty(a, "RED", {
                    get: function () {
                        return a.Color4f(1, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "GREEN", {
                    get: function () {
                        return a.Color4f(0, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "BLUE", {
                    get: function () {
                        return a.Color4f(0, 0, 1, 1)
                    }
                });
                Object.defineProperty(a, "YELLOW", {
                    get: function () {
                        return a.Color4f(1, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "CYAN", {
                    get: function () {
                        return a.Color4f(0, 1, 1, 1)
                    }
                });
                Object.defineProperty(a, "MAGENTA", {
                    get: function () {
                        return a.Color4f(1, 0, 1, 1)
                    }
                });
                a.getColorComponents = function (g) {
                    return [Math.floor(255 *
                        g[0]), Math.floor(255 * g[1]), Math.floor(255 * g[2]), g[3]]
                };
                a.parseColorString = function (g, d) {
                    g = g.toLowerCase();
                    if (g.startsWith("#")) {
                        d = 255;
                        switch (g.length) {
                            case 9:
                                d = parseInt(g.slice(7, 9), 16);
                            case 7:
                                var h = parseInt(g.slice(1, 3), 16);
                                var n = parseInt(g.slice(3, 5), 16);
                                var t = parseInt(g.slice(5, 7), 16);
                                break;
                            case 5:
                                d = 17 * parseInt(g.slice(4, 5), 16);
                            case 4:
                                h = 17 * parseInt(g.slice(1, 2), 16), n = 17 * parseInt(g.slice(2, 3), 16), t = 17 * parseInt(g.slice(3, 4), 16)
                        }
                        return a.Color(h, n, t, d / 255)
                    }
                    return g.startsWith("rgba") ? (g = g.slice(5,
                        -1), g = g.split(","), a.Color(+g[0], +g[1], +g[2], e(g[3]))) : g.startsWith("rgb") ? (g = g.slice(4, -1), g = g.split(","), a.Color(+g[0], +g[1], +g[2], e(g[3]))) : g.startsWith("gray(") || g.startsWith("hsl") || !d || (g = d[g], void 0 === g) ? a.BLACK : g
                };
                a.multiplyByAlpha = function (g, d) {
                    g = g.slice();
                    g[3] = Math.max(0, Math.min(g[3] * d, 1));
                    return g
                };
                a.Malloc = function (g, d) {
                    var h = a._malloc(d * g.BYTES_PER_ELEMENT);
                    return {
                        _ck: !0, length: d, byteOffset: h, Xd: null, subarray: function (n, t) {
                            n = this.toTypedArray().subarray(n, t);
                            n._ck = !0;
                            return n
                        }, toTypedArray: function () {
                            if (this.Xd &&
                                this.Xd.length) return this.Xd;
                            this.Xd = new g(a.HEAPU8.buffer, h, d);
                            this.Xd._ck = !0;
                            return this.Xd
                        }
                    }
                };
                a.Free = function (g) {
                    a._free(g.byteOffset);
                    g.byteOffset = M;
                    g.toTypedArray = null;
                    g.Xd = null
                };
                var H = M, T, ca = M, Y, va = M, Ma, na, X = M, fc, Ba = M, gc, Fb = M, hc, Gb = M, hb, Sa = M, ic,
                    Eb = M, jc, kc = M, fd = Float32Array.of(0, 0, 1), M = 0;
                a.onRuntimeInitialized = function () {
                    function g(d, h, n, t, v, z, E) {
                        z || (z = 4 * t.width, t.colorType === a.ColorType.RGBA_F16 ? z *= 2 : t.colorType === a.ColorType.RGBA_F32 && (z *= 4));
                        var J = z * t.height;
                        var I = v ? v.byteOffset : a._malloc(J);
                        if (E ? !d._readPixels(t, I, z, h, n, E) : !d._readPixels(t, I, z, h, n)) return v || a._free(I), null;
                        if (v) return v.toTypedArray();
                        switch (t.colorType) {
                            case a.ColorType.RGBA_8888:
                            case a.ColorType.RGBA_F16:
                                d = (new Uint8Array(a.HEAPU8.buffer, I, J)).slice();
                                break;
                            case a.ColorType.RGBA_F32:
                                d = (new Float32Array(a.HEAPU8.buffer, I, J)).slice();
                                break;
                            default:
                                return null
                        }
                        a._free(I);
                        return d
                    }

                    Ma = a.Malloc(Float32Array, 4);
                    va = Ma.byteOffset;
                    Y = a.Malloc(Float32Array, 16);
                    ca = Y.byteOffset;
                    T = a.Malloc(Float32Array, 9);
                    H = T.byteOffset;
                    ic = a.Malloc(Float32Array,
                        12);
                    Eb = ic.byteOffset;
                    jc = a.Malloc(Float32Array, 12);
                    kc = jc.byteOffset;
                    na = a.Malloc(Float32Array, 4);
                    X = na.byteOffset;
                    fc = a.Malloc(Float32Array, 4);
                    Ba = fc.byteOffset;
                    gc = a.Malloc(Float32Array, 3);
                    Fb = gc.byteOffset;
                    hc = a.Malloc(Float32Array, 3);
                    Gb = hc.byteOffset;
                    hb = a.Malloc(Int32Array, 4);
                    Sa = hb.byteOffset;
                    a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
                    a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
                    a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
                    a.GlyphRunFlags = {IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace};
                    a.Path.MakeFromCmds =
                        function (d) {
                            var h = l(d, "HEAPF32"), n = a.Path._MakeFromCmds(h, d.length);
                            k(h, d);
                            return n
                        };
                    a.Path.MakeFromVerbsPointsWeights = function (d, h, n) {
                        var t = l(d, "HEAPU8"), v = l(h, "HEAPF32"), z = l(n, "HEAPF32"),
                            E = a.Path._MakeFromVerbsPointsWeights(t, d.length, v, h.length, z, n && n.length || 0);
                        k(t, d);
                        k(v, h);
                        k(z, n);
                        return E
                    };
                    a.Path.prototype.addArc = function (d, h, n) {
                        d = u(d);
                        this._addArc(d, h, n);
                        return this
                    };
                    a.Path.prototype.addCircle = function (d, h, n, t) {
                        this._addCircle(d, h, n, !!t);
                        return this
                    };
                    a.Path.prototype.addOval = function (d, h, n) {
                        void 0 ===
                        n && (n = 1);
                        d = u(d);
                        this._addOval(d, !!h, n);
                        return this
                    };
                    a.Path.prototype.addPath = function () {
                        var d = Array.prototype.slice.call(arguments), h = d[0], n = !1;
                        "boolean" === typeof d[d.length - 1] && (n = d.pop());
                        if (1 === d.length) this._addPath(h, 1, 0, 0, 0, 1, 0, 0, 0, 1, n); else if (2 === d.length) d = d[1], this._addPath(h, d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1, n); else if (7 === d.length || 10 === d.length) this._addPath(h, d[1], d[2], d[3], d[4], d[5], d[6], d[7] || 0, d[8] || 0, d[9] || 1, n); else return null;
                        return this
                    };
                    a.Path.prototype.addPoly =
                        function (d, h) {
                            var n = l(d, "HEAPF32");
                            this._addPoly(n, d.length / 2, h);
                            k(n, d);
                            return this
                        };
                    a.Path.prototype.addRect = function (d, h) {
                        d = u(d);
                        this._addRect(d, !!h);
                        return this
                    };
                    a.Path.prototype.addRRect = function (d, h) {
                        d = F(d);
                        this._addRRect(d, !!h);
                        return this
                    };
                    a.Path.prototype.addVerbsPointsWeights = function (d, h, n) {
                        var t = l(d, "HEAPU8"), v = l(h, "HEAPF32"), z = l(n, "HEAPF32");
                        this._addVerbsPointsWeights(t, d.length, v, h.length, z, n && n.length || 0);
                        k(t, d);
                        k(v, h);
                        k(z, n)
                    };
                    a.Path.prototype.arc = function (d, h, n, t, v, z) {
                        d = a.LTRBRect(d -
                            n, h - n, d + n, h + n);
                        v = (v - t) / Math.PI * 180 - 360 * !!z;
                        z = new a.Path;
                        z.addArc(d, t / Math.PI * 180, v);
                        this.addPath(z, !0);
                        z.delete();
                        return this
                    };
                    a.Path.prototype.arcToOval = function (d, h, n, t) {
                        d = u(d);
                        this._arcToOval(d, h, n, t);
                        return this
                    };
                    a.Path.prototype.arcToRotated = function (d, h, n, t, v, z, E) {
                        this._arcToRotated(d, h, n, !!t, !!v, z, E);
                        return this
                    };
                    a.Path.prototype.arcToTangent = function (d, h, n, t, v) {
                        this._arcToTangent(d, h, n, t, v);
                        return this
                    };
                    a.Path.prototype.close = function () {
                        this._close();
                        return this
                    };
                    a.Path.prototype.conicTo =
                        function (d, h, n, t, v) {
                            this._conicTo(d, h, n, t, v);
                            return this
                        };
                    a.Path.prototype.computeTightBounds = function (d) {
                        this._computeTightBounds(X);
                        var h = na.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Path.prototype.cubicTo = function (d, h, n, t, v, z) {
                        this._cubicTo(d, h, n, t, v, z);
                        return this
                    };
                    a.Path.prototype.dash = function (d, h, n) {
                        return this._dash(d, h, n) ? this : null
                    };
                    a.Path.prototype.getBounds = function (d) {
                        this._getBounds(X);
                        var h = na.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Path.prototype.lineTo = function (d,
                                                        h) {
                        this._lineTo(d, h);
                        return this
                    };
                    a.Path.prototype.moveTo = function (d, h) {
                        this._moveTo(d, h);
                        return this
                    };
                    a.Path.prototype.offset = function (d, h) {
                        this._transform(1, 0, d, 0, 1, h, 0, 0, 1);
                        return this
                    };
                    a.Path.prototype.quadTo = function (d, h, n, t) {
                        this._quadTo(d, h, n, t);
                        return this
                    };
                    a.Path.prototype.rArcTo = function (d, h, n, t, v, z, E) {
                        this._rArcTo(d, h, n, t, v, z, E);
                        return this
                    };
                    a.Path.prototype.rConicTo = function (d, h, n, t, v) {
                        this._rConicTo(d, h, n, t, v);
                        return this
                    };
                    a.Path.prototype.rCubicTo = function (d, h, n, t, v, z) {
                        this._rCubicTo(d,
                            h, n, t, v, z);
                        return this
                    };
                    a.Path.prototype.rLineTo = function (d, h) {
                        this._rLineTo(d, h);
                        return this
                    };
                    a.Path.prototype.rMoveTo = function (d, h) {
                        this._rMoveTo(d, h);
                        return this
                    };
                    a.Path.prototype.rQuadTo = function (d, h, n, t) {
                        this._rQuadTo(d, h, n, t);
                        return this
                    };
                    a.Path.prototype.stroke = function (d) {
                        d = d || {};
                        d.width = d.width || 1;
                        d.miter_limit = d.miter_limit || 4;
                        d.cap = d.cap || a.StrokeCap.Butt;
                        d.join = d.join || a.StrokeJoin.Miter;
                        d.precision = d.precision || 1;
                        return this._stroke(d) ? this : null
                    };
                    a.Path.prototype.transform = function () {
                        if (1 ===
                            arguments.length) {
                            var d = arguments[0];
                            this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1)
                        } else if (6 === arguments.length || 9 === arguments.length) d = arguments, this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1); else throw "transform expected to take 1 or 9 arguments. Got " + arguments.length;
                        return this
                    };
                    a.Path.prototype.trim = function (d, h, n) {
                        return this._trim(d, h, !!n) ? this : null
                    };
                    a.Image.prototype.encodeToBytes = function (d, h) {
                        var n = a.ie();
                        d = d || a.ImageFormat.PNG;
                        h = h || 100;
                        return n ? this._encodeToBytes(d, h, n) : this._encodeToBytes(d, h)
                    };
                    a.Image.prototype.makeShaderCubic = function (d, h, n, t, v) {
                        v = q(v);
                        return this._makeShaderCubic(d, h, n, t, v)
                    };
                    a.Image.prototype.makeShaderOptions = function (d, h, n, t, v) {
                        v = q(v);
                        return this._makeShaderOptions(d, h, n, t, v)
                    };
                    a.Image.prototype.readPixels = function (d, h, n, t, v) {
                        var z = a.ie();
                        return g(this, d, h, n, t, v, z)
                    };
                    a.Canvas.prototype.clear = function (d) {
                        a.Ed(this.Dd);
                        d = y(d);
                        this._clear(d)
                    };
                    a.Canvas.prototype.clipRRect = function (d, h, n) {
                        a.Ed(this.Dd);
                        d = F(d);
                        this._clipRRect(d,
                            h, n)
                    };
                    a.Canvas.prototype.clipRect = function (d, h, n) {
                        a.Ed(this.Dd);
                        d = u(d);
                        this._clipRect(d, h, n)
                    };
                    a.Canvas.prototype.concat = function (d) {
                        a.Ed(this.Dd);
                        d = w(d);
                        this._concat(d)
                    };
                    a.Canvas.prototype.drawArc = function (d, h, n, t, v) {
                        a.Ed(this.Dd);
                        d = u(d);
                        this._drawArc(d, h, n, t, v)
                    };
                    a.Canvas.prototype.drawAtlas = function (d, h, n, t, v, z, E) {
                        if (d && t && h && n && h.length === n.length) {
                            a.Ed(this.Dd);
                            v || (v = a.BlendMode.SrcOver);
                            var J = l(h, "HEAPF32"), I = l(n, "HEAPF32"), U = n.length / 4, V = l(c(z), "HEAPU32");
                            if (E && "B" in E && "C" in E) this._drawAtlasCubic(d,
                                I, J, V, U, v, E.B, E.C, t); else {
                                let p = a.FilterMode.Linear, A = a.MipmapMode.None;
                                E && (p = E.filter, "mipmap" in E && (A = E.mipmap));
                                this._drawAtlasOptions(d, I, J, V, U, v, p, A, t)
                            }
                            k(J, h);
                            k(I, n);
                            k(V, z)
                        }
                    };
                    a.Canvas.prototype.drawCircle = function (d, h, n, t) {
                        a.Ed(this.Dd);
                        this._drawCircle(d, h, n, t)
                    };
                    a.Canvas.prototype.drawColor = function (d, h) {
                        a.Ed(this.Dd);
                        d = y(d);
                        void 0 !== h ? this._drawColor(d, h) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawColorInt = function (d, h) {
                        a.Ed(this.Dd);
                        this._drawColorInt(d, h || a.BlendMode.SrcOver)
                    };
                    a.Canvas.prototype.drawColorComponents =
                        function (d, h, n, t, v) {
                            a.Ed(this.Dd);
                            d = B(d, h, n, t);
                            void 0 !== v ? this._drawColor(d, v) : this._drawColor(d)
                        };
                    a.Canvas.prototype.drawDRRect = function (d, h, n) {
                        a.Ed(this.Dd);
                        d = F(d, Eb);
                        h = F(h, kc);
                        this._drawDRRect(d, h, n)
                    };
                    a.Canvas.prototype.drawImage = function (d, h, n, t) {
                        a.Ed(this.Dd);
                        this._drawImage(d, h, n, t || null)
                    };
                    a.Canvas.prototype.drawImageCubic = function (d, h, n, t, v, z) {
                        a.Ed(this.Dd);
                        this._drawImageCubic(d, h, n, t, v, z || null)
                    };
                    a.Canvas.prototype.drawImageOptions = function (d, h, n, t, v, z) {
                        a.Ed(this.Dd);
                        this._drawImageOptions(d,
                            h, n, t, v, z || null)
                    };
                    a.Canvas.prototype.drawImageNine = function (d, h, n, t, v) {
                        a.Ed(this.Dd);
                        h = l(h, "HEAP32", Sa);
                        n = u(n);
                        this._drawImageNine(d, h, n, t, v || null)
                    };
                    a.Canvas.prototype.drawImageRect = function (d, h, n, t, v) {
                        a.Ed(this.Dd);
                        u(h, X);
                        u(n, Ba);
                        this._drawImageRect(d, X, Ba, t, !!v)
                    };
                    a.Canvas.prototype.drawImageRectCubic = function (d, h, n, t, v, z) {
                        a.Ed(this.Dd);
                        u(h, X);
                        u(n, Ba);
                        this._drawImageRectCubic(d, X, Ba, t, v, z || null)
                    };
                    a.Canvas.prototype.drawImageRectOptions = function (d, h, n, t, v, z) {
                        a.Ed(this.Dd);
                        u(h, X);
                        u(n, Ba);
                        this._drawImageRectOptions(d,
                            X, Ba, t, v, z || null)
                    };
                    a.Canvas.prototype.drawLine = function (d, h, n, t, v) {
                        a.Ed(this.Dd);
                        this._drawLine(d, h, n, t, v)
                    };
                    a.Canvas.prototype.drawOval = function (d, h) {
                        a.Ed(this.Dd);
                        d = u(d);
                        this._drawOval(d, h)
                    };
                    a.Canvas.prototype.drawPaint = function (d) {
                        a.Ed(this.Dd);
                        this._drawPaint(d)
                    };
                    a.Canvas.prototype.drawParagraph = function (d, h, n) {
                        a.Ed(this.Dd);
                        this._drawParagraph(d, h, n)
                    };
                    a.Canvas.prototype.drawPatch = function (d, h, n, t, v) {
                        if (24 > d.length) throw "Need 12 cubic points";
                        if (h && 4 > h.length) throw "Need 4 colors";
                        if (n && 8 > n.length) throw "Need 4 shader coordinates";
                        a.Ed(this.Dd);
                        const z = l(d, "HEAPF32"), E = h ? l(c(h), "HEAPU32") : M, J = n ? l(n, "HEAPF32") : M;
                        t || (t = a.BlendMode.Modulate);
                        this._drawPatch(z, E, J, t, v);
                        k(J, n);
                        k(E, h);
                        k(z, d)
                    };
                    a.Canvas.prototype.drawPath = function (d, h) {
                        a.Ed(this.Dd);
                        this._drawPath(d, h)
                    };
                    a.Canvas.prototype.drawPicture = function (d) {
                        a.Ed(this.Dd);
                        this._drawPicture(d)
                    };
                    a.Canvas.prototype.drawPoints = function (d, h, n) {
                        a.Ed(this.Dd);
                        var t = l(h, "HEAPF32");
                        this._drawPoints(d, t, h.length / 2, n);
                        k(t, h)
                    };
                    a.Canvas.prototype.drawRRect = function (d, h) {
                        a.Ed(this.Dd);
                        d = F(d);
                        this._drawRRect(d, h)
                    };
                    a.Canvas.prototype.drawRect = function (d, h) {
                        a.Ed(this.Dd);
                        d = u(d);
                        this._drawRect(d, h)
                    };
                    a.Canvas.prototype.drawRect4f = function (d, h, n, t, v) {
                        a.Ed(this.Dd);
                        this._drawRect4f(d, h, n, t, v)
                    };
                    a.Canvas.prototype.drawShadow = function (d, h, n, t, v, z, E) {
                        a.Ed(this.Dd);
                        var J = l(v, "HEAPF32"), I = l(z, "HEAPF32");
                        h = l(h, "HEAPF32", Fb);
                        n = l(n, "HEAPF32", Gb);
                        this._drawShadow(d, h, n, t, J, I, E);
                        k(J, v);
                        k(I, z)
                    };
                    a.getShadowLocalBounds = function (d, h, n, t, v, z, E) {
                        d = q(d);
                        n = l(n, "HEAPF32", Fb);
                        t = l(t, "HEAPF32", Gb);
                        if (!this._getShadowLocalBounds(d,
                            h, n, t, v, z, X)) return null;
                        h = na.toTypedArray();
                        return E ? (E.set(h), E) : h.slice()
                    };
                    a.Canvas.prototype.drawTextBlob = function (d, h, n, t) {
                        a.Ed(this.Dd);
                        this._drawTextBlob(d, h, n, t)
                    };
                    a.Canvas.prototype.drawVertices = function (d, h, n) {
                        a.Ed(this.Dd);
                        this._drawVertices(d, h, n)
                    };
                    a.Canvas.prototype.getDeviceClipBounds = function (d) {
                        this._getDeviceClipBounds(Sa);
                        var h = hb.toTypedArray();
                        d ? d.set(h) : d = h.slice();
                        return d
                    };
                    a.Canvas.prototype.getLocalToDevice = function () {
                        this._getLocalToDevice(ca);
                        for (var d = ca, h = Array(16), n = 0; 16 >
                        n; n++) h[n] = a.HEAPF32[d / 4 + n];
                        return h
                    };
                    a.Canvas.prototype.getTotalMatrix = function () {
                        this._getTotalMatrix(H);
                        for (var d = Array(9), h = 0; 9 > h; h++) d[h] = a.HEAPF32[H / 4 + h];
                        return d
                    };
                    a.Canvas.prototype.makeSurface = function (d) {
                        d = this._makeSurface(d);
                        d.Dd = this.Dd;
                        return d
                    };
                    a.Canvas.prototype.readPixels = function (d, h, n, t, v) {
                        a.Ed(this.Dd);
                        return g(this, d, h, n, t, v)
                    };
                    a.Canvas.prototype.saveLayer = function (d, h, n, t) {
                        h = u(h);
                        return this._saveLayer(d || null, h, n || null, t || 0)
                    };
                    a.Canvas.prototype.writePixels = function (d, h, n, t, v,
                                                               z, E, J) {
                        if (d.byteLength % (h * n)) throw "pixels length must be a multiple of the srcWidth * srcHeight";
                        a.Ed(this.Dd);
                        var I = d.byteLength / (h * n);
                        z = z || a.AlphaType.Unpremul;
                        E = E || a.ColorType.RGBA_8888;
                        J = J || a.ColorSpace.SRGB;
                        var U = I * h;
                        I = l(d, "HEAPU8");
                        h = this._writePixels({
                            width: h,
                            height: n,
                            colorType: E,
                            alphaType: z,
                            colorSpace: J
                        }, I, U, t, v);
                        k(I, d);
                        return h
                    };
                    a.ColorFilter.MakeBlend = function (d, h, n) {
                        d = y(d);
                        n = n || a.ColorSpace.SRGB;
                        return a.ColorFilter._MakeBlend(d, h, n)
                    };
                    a.ColorFilter.MakeMatrix = function (d) {
                        if (!d || 20 !== d.length) throw "invalid color matrix";
                        var h = l(d, "HEAPF32"), n = a.ColorFilter._makeMatrix(h);
                        k(h, d);
                        return n
                    };
                    a.ContourMeasure.prototype.getPosTan = function (d, h) {
                        this._getPosTan(d, X);
                        d = na.toTypedArray();
                        return h ? (h.set(d), h) : d.slice()
                    };
                    a.ImageFilter.prototype.getOutputBounds = function (d, h, n) {
                        d = u(d, X);
                        h = q(h);
                        this._getOutputBounds(d, h, Sa);
                        h = hb.toTypedArray();
                        return n ? (n.set(h), n) : h.slice()
                    };
                    a.ImageFilter.MakeDropShadow = function (d, h, n, t, v, z) {
                        v = y(v, va);
                        return a.ImageFilter._MakeDropShadow(d, h, n, t, v, z)
                    };
                    a.ImageFilter.MakeDropShadowOnly = function (d,
                                                                 h, n, t, v, z) {
                        v = y(v, va);
                        return a.ImageFilter._MakeDropShadowOnly(d, h, n, t, v, z)
                    };
                    a.ImageFilter.MakeImage = function (d, h, n, t) {
                        n = u(n, X);
                        t = u(t, Ba);
                        if ("B" in h && "C" in h) return a.ImageFilter._MakeImageCubic(d, h.B, h.C, n, t);
                        const v = h.filter;
                        let z = a.MipmapMode.None;
                        "mipmap" in h && (z = h.mipmap);
                        return a.ImageFilter._MakeImageOptions(d, v, z, n, t)
                    };
                    a.ImageFilter.MakeMatrixTransform = function (d, h, n) {
                        d = q(d);
                        if ("B" in h && "C" in h) return a.ImageFilter._MakeMatrixTransformCubic(d, h.B, h.C, n);
                        const t = h.filter;
                        let v = a.MipmapMode.None;
                        "mipmap" in h && (v = h.mipmap);
                        return a.ImageFilter._MakeMatrixTransformOptions(d, t, v, n)
                    };
                    a.Paint.prototype.getColor = function () {
                        this._getColor(va);
                        return D(va)
                    };
                    a.Paint.prototype.setColor = function (d, h) {
                        h = h || null;
                        d = y(d);
                        this._setColor(d, h)
                    };
                    a.Paint.prototype.setColorComponents = function (d, h, n, t, v) {
                        v = v || null;
                        d = B(d, h, n, t);
                        this._setColor(d, v)
                    };
                    a.Path.prototype.getPoint = function (d, h) {
                        this._getPoint(d, X);
                        d = na.toTypedArray();
                        return h ? (h[0] = d[0], h[1] = d[1], h) : d.slice(0, 2)
                    };
                    a.Picture.prototype.makeShader = function (d,
                                                               h, n, t, v) {
                        t = q(t);
                        v = u(v);
                        return this._makeShader(d, h, n, t, v)
                    };
                    a.Picture.prototype.cullRect = function (d) {
                        this._cullRect(X);
                        var h = na.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.PictureRecorder.prototype.beginRecording = function (d, h) {
                        d = u(d);
                        return this._beginRecording(d, !!h)
                    };
                    a.Surface.prototype.getCanvas = function () {
                        var d = this._getCanvas();
                        d.Dd = this.Dd;
                        return d
                    };
                    a.Surface.prototype.makeImageSnapshot = function (d) {
                        a.Ed(this.Dd);
                        d = l(d, "HEAP32", Sa);
                        return this._makeImageSnapshot(d)
                    };
                    a.Surface.prototype.makeSurface =
                        function (d) {
                            a.Ed(this.Dd);
                            d = this._makeSurface(d);
                            d.Dd = this.Dd;
                            return d
                        };
                    a.Surface.prototype.Oe = function (d, h) {
                        this.be || (this.be = this.getCanvas());
                        return requestAnimationFrame(function () {
                            a.Ed(this.Dd);
                            d(this.be);
                            this.flush(h)
                        }.bind(this))
                    };
                    a.Surface.prototype.requestAnimationFrame || (a.Surface.prototype.requestAnimationFrame = a.Surface.prototype.Oe);
                    a.Surface.prototype.Le = function (d, h) {
                        this.be || (this.be = this.getCanvas());
                        requestAnimationFrame(function () {
                            a.Ed(this.Dd);
                            d(this.be);
                            this.flush(h);
                            this.dispose()
                        }.bind(this))
                    };
                    a.Surface.prototype.drawOnce || (a.Surface.prototype.drawOnce = a.Surface.prototype.Le);
                    a.PathEffect.MakeDash = function (d, h) {
                        h || (h = 0);
                        if (!d.length || 1 === d.length % 2) throw "Intervals array must have even length";
                        var n = l(d, "HEAPF32");
                        h = a.PathEffect._MakeDash(n, d.length, h);
                        k(n, d);
                        return h
                    };
                    a.PathEffect.MakeLine2D = function (d, h) {
                        h = q(h);
                        return a.PathEffect._MakeLine2D(d, h)
                    };
                    a.PathEffect.MakePath2D = function (d, h) {
                        d = q(d);
                        return a.PathEffect._MakePath2D(d, h)
                    };
                    a.Shader.MakeColor = function (d, h) {
                        h = h || null;
                        d = y(d);
                        return a.Shader._MakeColor(d,
                            h)
                    };
                    a.Shader.Blend = a.Shader.MakeBlend;
                    a.Shader.Color = a.Shader.MakeColor;
                    a.Shader.MakeLinearGradient = function (d, h, n, t, v, z, E, J) {
                        J = J || null;
                        var I = m(n), U = l(t, "HEAPF32");
                        E = E || 0;
                        z = q(z);
                        var V = na.toTypedArray();
                        V.set(d);
                        V.set(h, 2);
                        d = a.Shader._MakeLinearGradient(X, I.Md, I.colorType, U, I.count, v, E, z, J);
                        k(I.Md, n);
                        t && k(U, t);
                        return d
                    };
                    a.Shader.MakeRadialGradient = function (d, h, n, t, v, z, E, J) {
                        J = J || null;
                        var I = m(n), U = l(t, "HEAPF32");
                        E = E || 0;
                        z = q(z);
                        d = a.Shader._MakeRadialGradient(d[0], d[1], h, I.Md, I.colorType, U, I.count, v, E,
                            z, J);
                        k(I.Md, n);
                        t && k(U, t);
                        return d
                    };
                    a.Shader.MakeSweepGradient = function (d, h, n, t, v, z, E, J, I, U) {
                        U = U || null;
                        var V = m(n), p = l(t, "HEAPF32");
                        E = E || 0;
                        J = J || 0;
                        I = I || 360;
                        z = q(z);
                        d = a.Shader._MakeSweepGradient(d, h, V.Md, V.colorType, p, V.count, v, J, I, E, z, U);
                        k(V.Md, n);
                        t && k(p, t);
                        return d
                    };
                    a.Shader.MakeTwoPointConicalGradient = function (d, h, n, t, v, z, E, J, I, U) {
                        U = U || null;
                        var V = m(v), p = l(z, "HEAPF32");
                        I = I || 0;
                        J = q(J);
                        var A = na.toTypedArray();
                        A.set(d);
                        A.set(n, 2);
                        d = a.Shader._MakeTwoPointConicalGradient(X, h, t, V.Md, V.colorType, p, V.count, E,
                            I, J, U);
                        k(V.Md, v);
                        z && k(p, z);
                        return d
                    };
                    a.Vertices.prototype.bounds = function (d) {
                        this._bounds(X);
                        var h = na.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Hd && a.Hd.forEach(function (d) {
                        d()
                    })
                };
                a.computeTonalColors = function (g) {
                    var d = l(g.ambient, "HEAPF32"), h = l(g.spot, "HEAPF32");
                    this._computeTonalColors(d, h);
                    var n = {ambient: D(d), spot: D(h)};
                    k(d, g.ambient);
                    k(h, g.spot);
                    return n
                };
                a.LTRBRect = function (g, d, h, n) {
                    return Float32Array.of(g, d, h, n)
                };
                a.XYWHRect = function (g, d, h, n) {
                    return Float32Array.of(g, d, g + h, d + n)
                };
                a.LTRBiRect =
                    function (g, d, h, n) {
                        return Int32Array.of(g, d, h, n)
                    };
                a.XYWHiRect = function (g, d, h, n) {
                    return Int32Array.of(g, d, g + h, d + n)
                };
                a.RRectXY = function (g, d, h) {
                    return Float32Array.of(g[0], g[1], g[2], g[3], d, h, d, h, d, h, d, h)
                };
                a.MakeAnimatedImageFromEncoded = function (g) {
                    g = new Uint8Array(g);
                    var d = a._malloc(g.byteLength);
                    a.HEAPU8.set(g, d);
                    return (g = a._decodeAnimatedImage(d, g.byteLength)) ? g : null
                };
                a.MakeImageFromEncoded = function (g) {
                    g = new Uint8Array(g);
                    var d = a._malloc(g.byteLength);
                    a.HEAPU8.set(g, d);
                    return (g = a._decodeImage(d, g.byteLength)) ?
                        g : null
                };
                var Ta = null;
                a.MakeImageFromCanvasImageSource = function (g) {
                    var d = g.width, h = g.height;
                    Ta || (Ta = document.createElement("canvas"));
                    Ta.width = d;
                    Ta.height = h;
                    var n = Ta.getContext("2d", {willReadFrequently: !0});
                    n.drawImage(g, 0, 0);
                    g = n.getImageData(0, 0, d, h);
                    return a.MakeImage({
                        width: d,
                        height: h,
                        alphaType: a.AlphaType.Unpremul,
                        colorType: a.ColorType.RGBA_8888,
                        colorSpace: a.ColorSpace.SRGB
                    }, g.data, 4 * d)
                };
                a.MakeImage = function (g, d, h) {
                    var n = a._malloc(d.length);
                    a.HEAPU8.set(d, n);
                    return a._MakeImage(g, n, d.length, h)
                };
                a.MakeVertices = function (g, d, h, n, t, v) {
                    var z = t && t.length || 0, E = 0;
                    h && h.length && (E |= 1);
                    n && n.length && (E |= 2);
                    void 0 === v || v || (E |= 4);
                    g = new a._VerticesBuilder(g, d.length / 2, z, E);
                    l(d, "HEAPF32", g.positions());
                    g.texCoords() && l(h, "HEAPF32", g.texCoords());
                    g.colors() && l(c(n), "HEAPU32", g.colors());
                    g.indices() && l(t, "HEAPU16", g.indices());
                    return g.detach()
                };
                (function (g) {
                    g.Hd = g.Hd || [];
                    g.Hd.push(function () {
                        function d(p) {
                            p && (p.dir = 0 === p.dir ? g.TextDirection.RTL : g.TextDirection.LTR);
                            return p
                        }

                        function h(p) {
                            if (!p || !p.length) return [];
                            for (var A = [], O = 0; O < p.length; O += 5) {
                                var Z = g.LTRBRect(p[O], p[O + 1], p[O + 2], p[O + 3]), za = g.TextDirection.LTR;
                                0 === p[O + 4] && (za = g.TextDirection.RTL);
                                A.push({rect: Z, dir: za})
                            }
                            g._free(p.byteOffset);
                            return A
                        }

                        function n(p) {
                            p = p || {};
                            void 0 === p.weight && (p.weight = g.FontWeight.Normal);
                            p.width = p.width || g.FontWidth.Normal;
                            p.slant = p.slant || g.FontSlant.Upright;
                            return p
                        }

                        function t(p) {
                            if (!p || !p.length) return M;
                            for (var A = [], O = 0; O < p.length; O++) {
                                var Z = v(p[O]);
                                A.push(Z)
                            }
                            return l(A, "HEAPU32")
                        }

                        function v(p) {
                            if (J[p]) return J[p];
                            var A =
                                ja(p) + 1, O = g._malloc(A);
                            ka(p, C, O, A);
                            return J[p] = O
                        }

                        function z(p) {
                            p._colorPtr = y(p.color);
                            p._foregroundColorPtr = M;
                            p._backgroundColorPtr = M;
                            p._decorationColorPtr = M;
                            p.foregroundColor && (p._foregroundColorPtr = y(p.foregroundColor, I));
                            p.backgroundColor && (p._backgroundColorPtr = y(p.backgroundColor, U));
                            p.decorationColor && (p._decorationColorPtr = y(p.decorationColor, V));
                            Array.isArray(p.fontFamilies) && p.fontFamilies.length ? (p._fontFamiliesPtr = t(p.fontFamilies), p._fontFamiliesLen = p.fontFamilies.length) : (p._fontFamiliesPtr =
                                M, p._fontFamiliesLen = 0);
                            if (p.locale) {
                                var A = p.locale;
                                p._localePtr = v(A);
                                p._localeLen = ja(A)
                            } else p._localePtr = M, p._localeLen = 0;
                            if (Array.isArray(p.shadows) && p.shadows.length) {
                                A = p.shadows;
                                var O = A.map(function (qa) {
                                    return qa.color || g.BLACK
                                }), Z = A.map(function (qa) {
                                    return qa.blurRadius || 0
                                });
                                p._shadowLen = A.length;
                                for (var za = g._malloc(8 * A.length), Hb = za / 4, Ib = 0; Ib < A.length; Ib++) {
                                    var lc = A[Ib].offset || [0, 0];
                                    g.HEAPF32[Hb] = lc[0];
                                    g.HEAPF32[Hb + 1] = lc[1];
                                    Hb += 2
                                }
                                p._shadowColorsPtr = m(O).Md;
                                p._shadowOffsetsPtr = za;
                                p._shadowBlurRadiiPtr =
                                    l(Z, "HEAPF32")
                            } else p._shadowLen = 0, p._shadowColorsPtr = M, p._shadowOffsetsPtr = M, p._shadowBlurRadiiPtr = M;
                            Array.isArray(p.fontFeatures) && p.fontFeatures.length ? (A = p.fontFeatures, O = A.map(function (qa) {
                                return qa.name
                            }), Z = A.map(function (qa) {
                                return qa.value
                            }), p._fontFeatureLen = A.length, p._fontFeatureNamesPtr = t(O), p._fontFeatureValuesPtr = l(Z, "HEAPU32")) : (p._fontFeatureLen = 0, p._fontFeatureNamesPtr = M, p._fontFeatureValuesPtr = M);
                            Array.isArray(p.fontVariations) && p.fontVariations.length ? (A = p.fontVariations, O = A.map(function (qa) {
                                return qa.axis
                            }),
                                Z = A.map(function (qa) {
                                    return qa.value
                                }), p._fontVariationLen = A.length, p._fontVariationAxesPtr = t(O), p._fontVariationValuesPtr = l(Z, "HEAPF32")) : (p._fontVariationLen = 0, p._fontVariationAxesPtr = M, p._fontVariationValuesPtr = M)
                        }

                        function E(p) {
                            g._free(p._fontFamiliesPtr);
                            g._free(p._shadowColorsPtr);
                            g._free(p._shadowOffsetsPtr);
                            g._free(p._shadowBlurRadiiPtr);
                            g._free(p._fontFeatureNamesPtr);
                            g._free(p._fontFeatureValuesPtr);
                            g._free(p._fontVariationAxesPtr);
                            g._free(p._fontVariationValuesPtr)
                        }

                        g.Paragraph.prototype.getRectsForRange =
                            function (p, A, O, Z) {
                                p = this._getRectsForRange(p, A, O, Z);
                                return h(p)
                            };
                        g.Paragraph.prototype.getRectsForPlaceholders = function () {
                            var p = this._getRectsForPlaceholders();
                            return h(p)
                        };
                        g.Paragraph.prototype.getGlyphInfoAt = function (p) {
                            return d(this._getGlyphInfoAt(p))
                        };
                        g.Paragraph.prototype.getClosestGlyphInfoAtCoordinate = function (p, A) {
                            return d(this._getClosestGlyphInfoAtCoordinate(p, A))
                        };
                        g.TypefaceFontProvider.prototype.registerFont = function (p, A) {
                            p = g.Typeface.MakeTypefaceFromData(p);
                            if (!p) return null;
                            A = v(A);
                            this._registerFont(p, A)
                        };
                        g.ParagraphStyle = function (p) {
                            p.disableHinting = p.disableHinting || !1;
                            if (p.ellipsis) {
                                var A = p.ellipsis;
                                p._ellipsisPtr = v(A);
                                p._ellipsisLen = ja(A)
                            } else p._ellipsisPtr = M, p._ellipsisLen = 0;
                            null == p.heightMultiplier && (p.heightMultiplier = -1);
                            p.maxLines = p.maxLines || 0;
                            p.replaceTabCharacters = p.replaceTabCharacters || !1;
                            A = (A = p.strutStyle) || {};
                            A.strutEnabled = A.strutEnabled || !1;
                            A.strutEnabled && Array.isArray(A.fontFamilies) && A.fontFamilies.length ? (A._fontFamiliesPtr = t(A.fontFamilies), A._fontFamiliesLen =
                                A.fontFamilies.length) : (A._fontFamiliesPtr = M, A._fontFamiliesLen = 0);
                            A.fontStyle = n(A.fontStyle);
                            null == A.fontSize && (A.fontSize = -1);
                            null == A.heightMultiplier && (A.heightMultiplier = -1);
                            A.halfLeading = A.halfLeading || !1;
                            A.leading = A.leading || 0;
                            A.forceStrutHeight = A.forceStrutHeight || !1;
                            p.strutStyle = A;
                            p.textAlign = p.textAlign || g.TextAlign.Start;
                            p.textDirection = p.textDirection || g.TextDirection.LTR;
                            p.textHeightBehavior = p.textHeightBehavior || g.TextHeightBehavior.All;
                            p.textStyle = g.TextStyle(p.textStyle);
                            p.applyRoundingHack =
                                !1 !== p.applyRoundingHack;
                            return p
                        };
                        g.TextStyle = function (p) {
                            p.color || (p.color = g.BLACK);
                            p.decoration = p.decoration || 0;
                            p.decorationThickness = p.decorationThickness || 0;
                            p.decorationStyle = p.decorationStyle || g.DecorationStyle.Solid;
                            p.textBaseline = p.textBaseline || g.TextBaseline.Alphabetic;
                            null == p.fontSize && (p.fontSize = -1);
                            p.letterSpacing = p.letterSpacing || 0;
                            p.wordSpacing = p.wordSpacing || 0;
                            null == p.heightMultiplier && (p.heightMultiplier = -1);
                            p.halfLeading = p.halfLeading || !1;
                            p.fontStyle = n(p.fontStyle);
                            return p
                        };
                        var J =
                            {}, I = g._malloc(16), U = g._malloc(16), V = g._malloc(16);
                        g.ParagraphBuilder.Make = function (p, A) {
                            z(p.textStyle);
                            A = g.ParagraphBuilder._Make(p, A);
                            E(p.textStyle);
                            return A
                        };
                        g.ParagraphBuilder.MakeFromFontProvider = function (p, A) {
                            z(p.textStyle);
                            A = g.ParagraphBuilder._MakeFromFontProvider(p, A);
                            E(p.textStyle);
                            return A
                        };
                        g.ParagraphBuilder.MakeFromFontCollection = function (p, A) {
                            z(p.textStyle);
                            A = g.ParagraphBuilder._MakeFromFontCollection(p, A);
                            E(p.textStyle);
                            return A
                        };
                        g.ParagraphBuilder.ShapeText = function (p, A, O) {
                            let Z = 0;
                            for (const za of A) Z += za.length;
                            if (Z !== p.length) throw "Accumulated block lengths must equal text.length";
                            return g.ParagraphBuilder._ShapeText(p, A, O)
                        };
                        g.ParagraphBuilder.prototype.pushStyle = function (p) {
                            z(p);
                            this._pushStyle(p);
                            E(p)
                        };
                        g.ParagraphBuilder.prototype.pushPaintStyle = function (p, A, O) {
                            z(p);
                            this._pushPaintStyle(p, A, O);
                            E(p)
                        };
                        g.ParagraphBuilder.prototype.addPlaceholder = function (p, A, O, Z, za) {
                            O = O || g.PlaceholderAlignment.Baseline;
                            Z = Z || g.TextBaseline.Alphabetic;
                            this._addPlaceholder(p || 0, A || 0, O, Z, za || 0)
                        };
                        g.ParagraphBuilder.prototype.setWordsUtf8 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setWordsUtf8(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setWordsUtf16 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setWordsUtf16(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setGraphemeBreaksUtf8 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setGraphemeBreaksUtf8(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setGraphemeBreaksUtf16 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setGraphemeBreaksUtf16(A, p && p.length ||
                                0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setLineBreaksUtf8 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setLineBreaksUtf8(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setLineBreaksUtf16 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setLineBreaksUtf16(A, p && p.length || 0);
                            k(A, p)
                        }
                    })
                })(r);
                a.Hd = a.Hd || [];
                a.Hd.push(function () {
                    a.Path.prototype.op = function (g, d) {
                        return this._op(g, d) ? this : null
                    };
                    a.Path.prototype.simplify = function () {
                        return this._simplify() ? this : null
                    }
                });
                a.Hd = a.Hd || [];
                a.Hd.push(function () {
                    a.Canvas.prototype.drawText =
                        function (g, d, h, n, t) {
                            var v = ja(g), z = a._malloc(v + 1);
                            ka(g, C, z, v + 1);
                            this._drawSimpleText(z, v, d, h, t, n);
                            a._free(z)
                        };
                    a.Canvas.prototype.drawGlyphs = function (g, d, h, n, t, v) {
                        if (!(2 * g.length <= d.length)) throw "Not enough positions for the array of gyphs";
                        a.Ed(this.Dd);
                        const z = l(g, "HEAPU16"), E = l(d, "HEAPF32");
                        this._drawGlyphs(g.length, z, E, h, n, t, v);
                        k(E, d);
                        k(z, g)
                    };
                    a.Font.prototype.getGlyphBounds = function (g, d, h) {
                        var n = l(g, "HEAPU16"), t = a._malloc(16 * g.length);
                        this._getGlyphWidthBounds(n, g.length, M, t, d || null);
                        d = new Float32Array(a.HEAPU8.buffer,
                            t, 4 * g.length);
                        k(n, g);
                        if (h) return h.set(d), a._free(t), h;
                        g = Float32Array.from(d);
                        a._free(t);
                        return g
                    };
                    a.Font.prototype.getGlyphIDs = function (g, d, h) {
                        d || (d = g.length);
                        var n = ja(g) + 1, t = a._malloc(n);
                        ka(g, C, t, n);
                        g = a._malloc(2 * d);
                        d = this._getGlyphIDs(t, n - 1, d, g);
                        a._free(t);
                        if (0 > d) return a._free(g), null;
                        t = new Uint16Array(a.HEAPU8.buffer, g, d);
                        if (h) return h.set(t), a._free(g), h;
                        h = Uint16Array.from(t);
                        a._free(g);
                        return h
                    };
                    a.Font.prototype.getGlyphIntercepts = function (g, d, h, n) {
                        var t = l(g, "HEAPU16"), v = l(d, "HEAPF32");
                        return this._getGlyphIntercepts(t,
                            g.length, !(g && g._ck), v, d.length, !(d && d._ck), h, n)
                    };
                    a.Font.prototype.getGlyphWidths = function (g, d, h) {
                        var n = l(g, "HEAPU16"), t = a._malloc(4 * g.length);
                        this._getGlyphWidthBounds(n, g.length, t, M, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, t, g.length);
                        k(n, g);
                        if (h) return h.set(d), a._free(t), h;
                        g = Float32Array.from(d);
                        a._free(t);
                        return g
                    };
                    a.FontMgr.FromData = function () {
                        if (!arguments.length) return null;
                        var g = arguments;
                        1 === g.length && Array.isArray(g[0]) && (g = arguments[0]);
                        if (!g.length) return null;
                        for (var d = [], h = [], n =
                            0; n < g.length; n++) {
                            var t = new Uint8Array(g[n]), v = l(t, "HEAPU8");
                            d.push(v);
                            h.push(t.byteLength)
                        }
                        d = l(d, "HEAPU32");
                        h = l(h, "HEAPU32");
                        g = a.FontMgr._fromData(d, h, g.length);
                        a._free(d);
                        a._free(h);
                        return g
                    };
                    a.Typeface.MakeTypefaceFromData = function (g) {
                        g = new Uint8Array(g);
                        var d = l(g, "HEAPU8");
                        return (g = a.Typeface._MakeTypefaceFromData(d, g.byteLength)) ? g : null
                    };
                    a.Typeface.MakeFreeTypeFaceFromData = a.Typeface.MakeTypefaceFromData;
                    a.Typeface.prototype.getGlyphIDs = function (g, d, h) {
                        d || (d = g.length);
                        var n = ja(g) + 1, t = a._malloc(n);
                        ka(g, C, t, n);
                        g = a._malloc(2 * d);
                        d = this._getGlyphIDs(t, n - 1, d, g);
                        a._free(t);
                        if (0 > d) return a._free(g), null;
                        t = new Uint16Array(a.HEAPU8.buffer, g, d);
                        if (h) return h.set(t), a._free(g), h;
                        h = Uint16Array.from(t);
                        a._free(g);
                        return h
                    };
                    a.TextBlob.MakeOnPath = function (g, d, h, n) {
                        if (g && g.length && d && d.countPoints()) {
                            if (1 === d.countPoints()) return this.MakeFromText(g, h);
                            n || (n = 0);
                            var t = h.getGlyphIDs(g);
                            t = h.getGlyphWidths(t);
                            var v = [];
                            d = new a.ContourMeasureIter(d, !1, 1);
                            for (var z = d.next(), E = new Float32Array(4), J = 0; J < g.length &&
                            z; J++) {
                                var I = t[J];
                                n += I / 2;
                                if (n > z.length()) {
                                    z.delete();
                                    z = d.next();
                                    if (!z) {
                                        g = g.substring(0, J);
                                        break
                                    }
                                    n = I / 2
                                }
                                z.getPosTan(n, E);
                                var U = E[2], V = E[3];
                                v.push(U, V, E[0] - I / 2 * U, E[1] - I / 2 * V);
                                n += I / 2
                            }
                            g = this.MakeFromRSXform(g, v, h);
                            z && z.delete();
                            d.delete();
                            return g
                        }
                    };
                    a.TextBlob.MakeFromRSXform = function (g, d, h) {
                        var n = ja(g) + 1, t = a._malloc(n);
                        ka(g, C, t, n);
                        g = l(d, "HEAPF32");
                        h = a.TextBlob._MakeFromRSXform(t, n - 1, g, h);
                        a._free(t);
                        return h ? h : null
                    };
                    a.TextBlob.MakeFromRSXformGlyphs = function (g, d, h) {
                        var n = l(g, "HEAPU16");
                        d = l(d, "HEAPF32");
                        h = a.TextBlob._MakeFromRSXformGlyphs(n, 2 * g.length, d, h);
                        k(n, g);
                        return h ? h : null
                    };
                    a.TextBlob.MakeFromGlyphs = function (g, d) {
                        var h = l(g, "HEAPU16");
                        d = a.TextBlob._MakeFromGlyphs(h, 2 * g.length, d);
                        k(h, g);
                        return d ? d : null
                    };
                    a.TextBlob.MakeFromText = function (g, d) {
                        var h = ja(g) + 1, n = a._malloc(h);
                        ka(g, C, n, h);
                        g = a.TextBlob._MakeFromText(n, h - 1, d);
                        a._free(n);
                        return g ? g : null
                    };
                    a.MallocGlyphIDs = function (g) {
                        return a.Malloc(Uint16Array, g)
                    }
                });
                a.Hd = a.Hd || [];
                a.Hd.push(function () {
                    a.MakePicture = function (g) {
                        g = new Uint8Array(g);
                        var d =
                            a._malloc(g.byteLength);
                        a.HEAPU8.set(g, d);
                        return (g = a._MakePicture(d, g.byteLength)) ? g : null
                    }
                });
                a.Hd = a.Hd || [];
                a.Hd.push(function () {
                    a.RuntimeEffect.Make = function (g, d) {
                        return a.RuntimeEffect._Make(g, {
                            onError: d || function (h) {
                                console.log("RuntimeEffect error", h)
                            }
                        })
                    };
                    a.RuntimeEffect.MakeForBlender = function (g, d) {
                        return a.RuntimeEffect._MakeForBlender(g, {
                            onError: d || function (h) {
                                console.log("RuntimeEffect error", h)
                            }
                        })
                    };
                    a.RuntimeEffect.prototype.makeShader = function (g, d) {
                        var h = !g._ck, n = l(g, "HEAPF32");
                        d = q(d);
                        return this._makeShader(n,
                            4 * g.length, h, d)
                    };
                    a.RuntimeEffect.prototype.makeShaderWithChildren = function (g, d, h) {
                        var n = !g._ck, t = l(g, "HEAPF32");
                        h = q(h);
                        for (var v = [], z = 0; z < d.length; z++) v.push(d[z].jd.Fd);
                        d = l(v, "HEAPU32");
                        return this._makeShaderWithChildren(t, 4 * g.length, n, d, v.length, h)
                    };
                    a.RuntimeEffect.prototype.makeBlender = function (g) {
                        var d = !g._ck, h = l(g, "HEAPF32");
                        return this._makeBlender(h, 4 * g.length, d)
                    }
                })
            })(r);
            var la = Object.assign({}, r), ma = "./this.program", oa = (a, b) => {
                    throw b;
                }, pa = "object" == typeof window, ra = "function" == typeof importScripts,
                sa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
                ta = "", ua, wa, xa;
            if (sa) {
                var fs = require("fs"), ya = require("path");
                ta = ra ? ya.dirname(ta) + "/" : __dirname + "/";
                ua = (a, b) => {
                    a = a.startsWith("file://") ? new URL(a) : ya.normalize(a);
                    return fs.readFileSync(a, b ? void 0 : "utf8")
                };
                xa = a => {
                    a = ua(a, !0);
                    a.buffer || (a = new Uint8Array(a));
                    return a
                };
                wa = (a, b, c, e = !0) => {
                    a = a.startsWith("file://") ? new URL(a) : ya.normalize(a);
                    fs.readFile(a, e ? void 0 : "utf8", (f, k) => {
                        f ? c(f) : b(e ? k.buffer : k)
                    })
                };
                !r.thisProgram && 1 < process.argv.length && (ma = process.argv[1].replace(/\\/g, "/"));
                process.argv.slice(2);
                oa = (a, b) => {
                    process.exitCode =
                        a;
                    throw b;
                };
                r.inspect = () => "[Emscripten Module object]"
            } else if (pa || ra) ra ? ta = self.location.href : "undefined" != typeof document && document.currentScript && (ta = document.currentScript.src), _scriptDir && (ta = _scriptDir), 0 !== ta.indexOf("blob:") ? ta = ta.substr(0, ta.replace(/[?#].*/, "").lastIndexOf("/") + 1) : ta = "", ua = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.send(null);
                return b.responseText
            }, ra && (xa = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }),
                wa = (a, b, c) => {
                    var e = new XMLHttpRequest;
                    e.open("GET", a, !0);
                    e.responseType = "arraybuffer";
                    e.onload = () => {
                        200 == e.status || 0 == e.status && e.response ? b(e.response) : c()
                    };
                    e.onerror = c;
                    e.send(null)
                };
            var Aa = r.print || console.log.bind(console), Ca = r.printErr || console.error.bind(console);
            Object.assign(r, la);
            la = null;
            r.thisProgram && (ma = r.thisProgram);
            r.quit && (oa = r.quit);
            var Da;
            r.wasmBinary && (Da = r.wasmBinary);
            var noExitRuntime = r.noExitRuntime || !0;
            "object" != typeof WebAssembly && Ea("no native wasm support detected");
            var Fa, G, Ga = !1, Ha, C, Ia, Ja, K, L, N, Ka;

            function La() {
                var a = Fa.buffer;
                r.HEAP8 = Ha = new Int8Array(a);
                r.HEAP16 = Ia = new Int16Array(a);
                r.HEAP32 = K = new Int32Array(a);
                r.HEAPU8 = C = new Uint8Array(a);
                r.HEAPU16 = Ja = new Uint16Array(a);
                r.HEAPU32 = L = new Uint32Array(a);
                r.HEAPF32 = N = new Float32Array(a);
                r.HEAPF64 = Ka = new Float64Array(a)
            }

            var Na, Oa = [], Pa = [], Qa = [];

            function Ra() {
                var a = r.preRun.shift();
                Oa.unshift(a)
            }

            var Ua = 0, Va = null, Wa = null;

            function Ea(a) {
                if (r.onAbort) r.onAbort(a);
                a = "Aborted(" + a + ")";
                Ca(a);
                Ga = !0;
                a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                ba(a);
                throw a;
            }

            function Xa(a) {
                return a.startsWith("data:application/octet-stream;base64,")
            }

            var Ya;
            Ya = "canvaskit.wasm";
            if (!Xa(Ya)) {
                var Za = Ya;
                Ya = r.locateFile ? r.locateFile(Za, ta) : ta + Za
            }

            function $a(a) {
                if (a == Ya && Da) return new Uint8Array(Da);
                if (xa) return xa(a);
                throw "both async and sync fetching of the wasm failed";
            }

            function ab(a) {
                if (!Da && (pa || ra)) {
                    if ("function" == typeof fetch && !a.startsWith("file://")) return fetch(a, {credentials: "same-origin"}).then(b => {
                        if (!b.ok) throw "failed to load wasm binary file at '" + a + "'";
                        return b.arrayBuffer()
                    }).catch(() => $a(a));
                    if (wa) return new Promise((b, c) => {
                        wa(a, e => b(new Uint8Array(e)), c)
                    })
                }
                return Promise.resolve().then(() => $a(a))
            }

            function bb(a, b, c) {
                return ab(a).then(e => WebAssembly.instantiate(e, b)).then(e => e).then(c, e => {
                    Ca("failed to asynchronously prepare wasm: " + e);
                    Ea(e)
                })
            }

            function cb(a, b) {
                var c = Ya;
                return Da || "function" != typeof WebAssembly.instantiateStreaming || Xa(c) || c.startsWith("file://") || sa || "function" != typeof fetch ? bb(c, a, b) : fetch(c, {credentials: "same-origin"}).then(e => WebAssembly.instantiateStreaming(e, a).then(b, function (f) {
                    Ca("wasm streaming compile failed: " + f);
                    Ca("falling back to ArrayBuffer instantiation");
                    return bb(c, a, b)
                }))
            }

            function db(a) {
                this.name = "ExitStatus";
                this.message = `Program terminated with exit(${a})`;
                this.status = a
            }

            var eb = a => {
                for (; 0 < a.length;) a.shift()(r)
            };

            function fb(a) {
                this.Fd = a - 24;
                this.Je = function (b) {
                    L[this.Fd + 4 >> 2] = b
                };
                this.re = function (b) {
                    L[this.Fd + 8 >> 2] = b
                };
                this.Ud = function (b, c) {
                    this.qe();
                    this.Je(b);
                    this.re(c)
                };
                this.qe = function () {
                    L[this.Fd + 16 >> 2] = 0
                }
            }

            var gb = 0, ib = 0, jb = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
                kb = (a, b, c) => {
                    var e = b + c;
                    for (c = b; a[c] && !(c >= e);) ++c;
                    if (16 < c - b && a.buffer && jb) return jb.decode(a.subarray(b, c));
                    for (e = ""; b < c;) {
                        var f = a[b++];
                        if (f & 128) {
                            var k = a[b++] & 63;
                            if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | k); else {
                                var l = a[b++] & 63;
                                f = 224 == (f & 240) ? (f & 15) << 12 | k << 6 | l : (f & 7) << 18 | k << 12 | l << 6 | a[b++] & 63;
                                65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                            }
                        } else e += String.fromCharCode(f)
                    }
                    return e
                },
                lb = {};

            function mb(a) {
                for (; a.length;) {
                    var b = a.pop();
                    a.pop()(b)
                }
            }

            function nb(a) {
                return this.fromWireType(K[a >> 2])
            }

            var ob = {}, pb = {}, qb = {}, rb = void 0;

            function sb(a) {
                throw new rb(a);
            }

            function tb(a, b, c) {
                function e(m) {
                    m = c(m);
                    m.length !== a.length && sb("Mismatched type converter count");
                    for (var q = 0; q < a.length; ++q) ub(a[q], m[q])
                }

                a.forEach(function (m) {
                    qb[m] = b
                });
                var f = Array(b.length), k = [], l = 0;
                b.forEach((m, q) => {
                    pb.hasOwnProperty(m) ? f[q] = pb[m] : (k.push(m), ob.hasOwnProperty(m) || (ob[m] = []), ob[m].push(() => {
                        f[q] = pb[m];
                        ++l;
                        l === k.length && e(f)
                    }))
                });
                0 === k.length && e(f)
            }

            function vb(a) {
                switch (a) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                    case 4:
                        return 2;
                    case 8:
                        return 3;
                    default:
                        throw new TypeError(`Unknown type size: ${a}`);
                }
            }

            var wb = void 0;

            function P(a) {
                for (var b = ""; C[a];) b += wb[C[a++]];
                return b
            }

            var xb = void 0;

            function Q(a) {
                throw new xb(a);
            }

            function yb(a, b, c = {}) {
                var e = b.name;
                a || Q(`type "${e}" must have a positive integer typeid pointer`);
                if (pb.hasOwnProperty(a)) {
                    if (c.af) return;
                    Q(`Cannot register type '${e}' twice`)
                }
                pb[a] = b;
                delete qb[a];
                ob.hasOwnProperty(a) && (b = ob[a], delete ob[a], b.forEach(f => f()))
            }

            function ub(a, b, c = {}) {
                if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
                yb(a, b, c)
            }

            function zb(a) {
                Q(a.jd.Id.Gd.name + " instance already deleted")
            }

            var Ab = !1;

            function Bb() {
            }

            function Cb(a) {
                --a.count.value;
                0 === a.count.value && (a.Kd ? a.Od.Sd(a.Kd) : a.Id.Gd.Sd(a.Fd))
            }

            function Db(a, b, c) {
                if (b === c) return a;
                if (void 0 === c.Ld) return null;
                a = Db(a, b, c.Ld);
                return null === a ? null : c.Te(a)
            }

            var Jb = {}, Kb = [];

            function Lb() {
                for (; Kb.length;) {
                    var a = Kb.pop();
                    a.jd.$d = !1;
                    a["delete"]()
                }
            }

            var Mb = void 0, Nb = {};

            function Ob(a, b) {
                for (void 0 === b && Q("ptr should not be undefined"); a.Ld;) b = a.fe(b), a = a.Ld;
                return Nb[b]
            }

            function Pb(a, b) {
                b.Id && b.Fd || sb("makeClassHandle requires ptr and ptrType");
                !!b.Od !== !!b.Kd && sb("Both smartPtrType and smartPtr must be specified");
                b.count = {value: 1};
                return Qb(Object.create(a, {jd: {value: b}}))
            }

            function Qb(a) {
                if ("undefined" === typeof FinalizationRegistry) return Qb = b => b, a;
                Ab = new FinalizationRegistry(b => {
                    Cb(b.jd)
                });
                Qb = b => {
                    var c = b.jd;
                    c.Kd && Ab.register(b, {jd: c}, b);
                    return b
                };
                Bb = b => {
                    Ab.unregister(b)
                };
                return Qb(a)
            }

            function Rb() {
            }

            function Sb(a) {
                if (void 0 === a) return "_unknown";
                a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                var b = a.charCodeAt(0);
                return 48 <= b && 57 >= b ? `_${a}` : a
            }

            function Tb(a, b) {
                a = Sb(a);
                return {
                    [a]: function () {
                        return b.apply(this, arguments)
                    }
                }[a]
            }

            function Ub(a, b, c) {
                if (void 0 === a[b].Jd) {
                    var e = a[b];
                    a[b] = function () {
                        a[b].Jd.hasOwnProperty(arguments.length) || Q(`Function '${c}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[b].Jd})!`);
                        return a[b].Jd[arguments.length].apply(this, arguments)
                    };
                    a[b].Jd = [];
                    a[b].Jd[e.Yd] = e
                }
            }

            function Vb(a, b, c) {
                r.hasOwnProperty(a) ? ((void 0 === c || void 0 !== r[a].Jd && void 0 !== r[a].Jd[c]) && Q(`Cannot register public name '${a}' twice`), Ub(r, a, a), r.hasOwnProperty(c) && Q(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`), r[a].Jd[c] = b) : (r[a] = b, void 0 !== c && (r[a].sf = c))
            }

            function Wb(a, b, c, e, f, k, l, m) {
                this.name = a;
                this.constructor = b;
                this.ae = c;
                this.Sd = e;
                this.Ld = f;
                this.We = k;
                this.fe = l;
                this.Te = m;
                this.ef = []
            }

            function Xb(a, b, c) {
                for (; b !== c;) b.fe || Q(`Expected null or instance of ${c.name}, got an instance of ${b.name}`), a = b.fe(a), b = b.Ld;
                return a
            }

            function Yb(a, b) {
                if (null === b) return this.ve && Q(`null is not a valid ${this.name}`), 0;
                b.jd || Q(`Cannot pass "${Zb(b)}" as a ${this.name}`);
                b.jd.Fd || Q(`Cannot pass deleted object as a pointer of type ${this.name}`);
                return Xb(b.jd.Fd, b.jd.Id.Gd, this.Gd)
            }

            function $b(a, b) {
                if (null === b) {
                    this.ve && Q(`null is not a valid ${this.name}`);
                    if (this.ke) {
                        var c = this.we();
                        null !== a && a.push(this.Sd, c);
                        return c
                    }
                    return 0
                }
                b.jd || Q(`Cannot pass "${Zb(b)}" as a ${this.name}`);
                b.jd.Fd || Q(`Cannot pass deleted object as a pointer of type ${this.name}`);
                !this.je && b.jd.Id.je && Q(`Cannot convert argument of type ${b.jd.Od ? b.jd.Od.name : b.jd.Id.name} to parameter type ${this.name}`);
                c = Xb(b.jd.Fd, b.jd.Id.Gd, this.Gd);
                if (this.ke) switch (void 0 === b.jd.Kd && Q("Passing raw pointer to smart pointer is illegal"),
                    this.kf) {
                    case 0:
                        b.jd.Od === this ? c = b.jd.Kd : Q(`Cannot convert argument of type ${b.jd.Od ? b.jd.Od.name : b.jd.Id.name} to parameter type ${this.name}`);
                        break;
                    case 1:
                        c = b.jd.Kd;
                        break;
                    case 2:
                        if (b.jd.Od === this) c = b.jd.Kd; else {
                            var e = b.clone();
                            c = this.ff(c, ac(function () {
                                e["delete"]()
                            }));
                            null !== a && a.push(this.Sd, c)
                        }
                        break;
                    default:
                        Q("Unsupporting sharing policy")
                }
                return c
            }

            function bc(a, b) {
                if (null === b) return this.ve && Q(`null is not a valid ${this.name}`), 0;
                b.jd || Q(`Cannot pass "${Zb(b)}" as a ${this.name}`);
                b.jd.Fd || Q(`Cannot pass deleted object as a pointer of type ${this.name}`);
                b.jd.Id.je && Q(`Cannot convert argument of type ${b.jd.Id.name} to parameter type ${this.name}`);
                return Xb(b.jd.Fd, b.jd.Id.Gd, this.Gd)
            }

            function cc(a, b, c, e, f, k, l, m, q, w, y) {
                this.name = a;
                this.Gd = b;
                this.ve = c;
                this.je = e;
                this.ke = f;
                this.df = k;
                this.kf = l;
                this.Fe = m;
                this.we = q;
                this.ff = w;
                this.Sd = y;
                f || void 0 !== b.Ld ? this.toWireType = $b : (this.toWireType = e ? Yb : bc, this.Nd = null)
            }

            function dc(a, b, c) {
                r.hasOwnProperty(a) || sb("Replacing nonexistant public symbol");
                void 0 !== r[a].Jd && void 0 !== c ? r[a].Jd[c] = b : (r[a] = b, r[a].Yd = c)
            }

            var ec = (a, b) => {
                var c = [];
                return function () {
                    c.length = 0;
                    Object.assign(c, arguments);
                    if (a.includes("j")) {
                        var e = r["dynCall_" + a];
                        e = c && c.length ? e.apply(null, [b].concat(c)) : e.call(null, b)
                    } else e = Na.get(b).apply(null, c);
                    return e
                }
            };

            function mc(a, b) {
                a = P(a);
                var c = a.includes("j") ? ec(a, b) : Na.get(b);
                "function" != typeof c && Q(`unknown function pointer with signature ${a}: ${b}`);
                return c
            }

            var nc = void 0;

            function oc(a) {
                a = pc(a);
                var b = P(a);
                qc(a);
                return b
            }

            function rc(a, b) {
                function c(k) {
                    f[k] || pb[k] || (qb[k] ? qb[k].forEach(c) : (e.push(k), f[k] = !0))
                }

                var e = [], f = {};
                b.forEach(c);
                throw new nc(`${a}: ` + e.map(oc).join([", "]));
            }

            function sc(a, b, c, e, f) {
                var k = b.length;
                2 > k && Q("argTypes array size mismatch! Must at least get return value and 'this' types!");
                var l = null !== b[1] && null !== c, m = !1;
                for (c = 1; c < b.length; ++c) if (null !== b[c] && void 0 === b[c].Nd) {
                    m = !0;
                    break
                }
                var q = "void" !== b[0].name, w = k - 2, y = Array(w), B = [], D = [];
                return function () {
                    arguments.length !== w && Q(`function ${a} called with ${arguments.length} arguments, expected ${w} args!`);
                    D.length = 0;
                    B.length = l ? 2 : 1;
                    B[0] = f;
                    if (l) {
                        var u = b[1].toWireType(D, this);
                        B[1] = u
                    }
                    for (var F = 0; F < w; ++F) y[F] =
                        b[F + 2].toWireType(D, arguments[F]), B.push(y[F]);
                    F = e.apply(null, B);
                    if (m) mb(D); else for (var H = l ? 1 : 2; H < b.length; H++) {
                        var T = 1 === H ? u : y[H - 2];
                        null !== b[H].Nd && b[H].Nd(T)
                    }
                    u = q ? b[0].fromWireType(F) : void 0;
                    return u
                }
            }

            function tc(a, b) {
                for (var c = [], e = 0; e < a; e++) c.push(L[b + 4 * e >> 2]);
                return c
            }

            function uc() {
                this.Rd = [void 0];
                this.De = []
            }

            var vc = new uc;

            function wc(a) {
                a >= vc.Ud && 0 === --vc.get(a).Ge && vc.re(a)
            }

            var xc = a => {
                a || Q("Cannot use deleted val. handle = " + a);
                return vc.get(a).value
            }, ac = a => {
                switch (a) {
                    case void 0:
                        return 1;
                    case null:
                        return 2;
                    case !0:
                        return 3;
                    case !1:
                        return 4;
                    default:
                        return vc.qe({Ge: 1, value: a})
                }
            };

            function yc(a, b, c) {
                switch (b) {
                    case 0:
                        return function (e) {
                            return this.fromWireType((c ? Ha : C)[e])
                        };
                    case 1:
                        return function (e) {
                            return this.fromWireType((c ? Ia : Ja)[e >> 1])
                        };
                    case 2:
                        return function (e) {
                            return this.fromWireType((c ? K : L)[e >> 2])
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            function zc(a, b) {
                var c = pb[a];
                void 0 === c && Q(b + " has unknown type " + oc(a));
                return c
            }

            function Zb(a) {
                if (null === a) return "null";
                var b = typeof a;
                return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
            }

            function Ac(a, b) {
                switch (b) {
                    case 2:
                        return function (c) {
                            return this.fromWireType(N[c >> 2])
                        };
                    case 3:
                        return function (c) {
                            return this.fromWireType(Ka[c >> 3])
                        };
                    default:
                        throw new TypeError("Unknown float type: " + a);
                }
            }

            function Bc(a, b, c) {
                switch (b) {
                    case 0:
                        return c ? function (e) {
                            return Ha[e]
                        } : function (e) {
                            return C[e]
                        };
                    case 1:
                        return c ? function (e) {
                            return Ia[e >> 1]
                        } : function (e) {
                            return Ja[e >> 1]
                        };
                    case 2:
                        return c ? function (e) {
                            return K[e >> 2]
                        } : function (e) {
                            return L[e >> 2]
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            var ka = (a, b, c, e) => {
                    if (!(0 < e)) return 0;
                    var f = c;
                    e = c + e - 1;
                    for (var k = 0; k < a.length; ++k) {
                        var l = a.charCodeAt(k);
                        if (55296 <= l && 57343 >= l) {
                            var m = a.charCodeAt(++k);
                            l = 65536 + ((l & 1023) << 10) | m & 1023
                        }
                        if (127 >= l) {
                            if (c >= e) break;
                            b[c++] = l
                        } else {
                            if (2047 >= l) {
                                if (c + 1 >= e) break;
                                b[c++] = 192 | l >> 6
                            } else {
                                if (65535 >= l) {
                                    if (c + 2 >= e) break;
                                    b[c++] = 224 | l >> 12
                                } else {
                                    if (c + 3 >= e) break;
                                    b[c++] = 240 | l >> 18;
                                    b[c++] = 128 | l >> 12 & 63
                                }
                                b[c++] = 128 | l >> 6 & 63
                            }
                            b[c++] = 128 | l & 63
                        }
                    }
                    b[c] = 0;
                    return c - f
                }, ja = a => {
                    for (var b = 0, c = 0; c < a.length; ++c) {
                        var e = a.charCodeAt(c);
                        127 >= e ? b++ : 2047 >=
                        e ? b += 2 : 55296 <= e && 57343 >= e ? (b += 4, ++c) : b += 3
                    }
                    return b
                }, Cc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Dc = (a, b) => {
                    var c = a >> 1;
                    for (var e = c + b / 2; !(c >= e) && Ja[c];) ++c;
                    c <<= 1;
                    if (32 < c - a && Cc) return Cc.decode(C.subarray(a, c));
                    c = "";
                    for (e = 0; !(e >= b / 2); ++e) {
                        var f = Ia[a + 2 * e >> 1];
                        if (0 == f) break;
                        c += String.fromCharCode(f)
                    }
                    return c
                }, Ec = (a, b, c) => {
                    void 0 === c && (c = 2147483647);
                    if (2 > c) return 0;
                    c -= 2;
                    var e = b;
                    c = c < 2 * a.length ? c / 2 : a.length;
                    for (var f = 0; f < c; ++f) Ia[b >> 1] = a.charCodeAt(f), b += 2;
                    Ia[b >> 1] = 0;
                    return b - e
                },
                Fc = a => 2 * a.length, Gc = (a, b) => {
                    for (var c = 0, e = ""; !(c >= b / 4);) {
                        var f = K[a + 4 * c >> 2];
                        if (0 == f) break;
                        ++c;
                        65536 <= f ? (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : e += String.fromCharCode(f)
                    }
                    return e
                }, Hc = (a, b, c) => {
                    void 0 === c && (c = 2147483647);
                    if (4 > c) return 0;
                    var e = b;
                    c = e + c - 4;
                    for (var f = 0; f < a.length; ++f) {
                        var k = a.charCodeAt(f);
                        if (55296 <= k && 57343 >= k) {
                            var l = a.charCodeAt(++f);
                            k = 65536 + ((k & 1023) << 10) | l & 1023
                        }
                        K[b >> 2] = k;
                        b += 4;
                        if (b + 4 > c) break
                    }
                    K[b >> 2] = 0;
                    return b - e
                }, Ic = a => {
                    for (var b = 0, c = 0; c < a.length; ++c) {
                        var e = a.charCodeAt(c);
                        55296 <= e && 57343 >= e && ++c;
                        b += 4
                    }
                    return b
                }, Jc = {};

            function Kc(a) {
                var b = Jc[a];
                return void 0 === b ? P(a) : b
            }

            var Lc = [];

            function Mc() {
                function a(b) {
                    b.$$$embind_global$$$ = b;
                    var c = "object" == typeof $$$embind_global$$$ && b.$$$embind_global$$$ == b;
                    c || delete b.$$$embind_global$$$;
                    return c
                }

                if ("object" == typeof globalThis) return globalThis;
                if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
                "object" == typeof global && a(global) ? $$$embind_global$$$ = global : "object" == typeof self && a(self) && ($$$embind_global$$$ = self);
                if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
                throw Error("unable to get global object.");
            }

            function Nc(a) {
                var b = Lc.length;
                Lc.push(a);
                return b
            }

            function Oc(a, b) {
                for (var c = Array(a), e = 0; e < a; ++e) c[e] = zc(L[b + 4 * e >> 2], "parameter " + e);
                return c
            }

            var Pc = [];

            function Qc(a) {
                var b = Array(a + 1);
                return function (c, e, f) {
                    b[0] = c;
                    for (var k = 0; k < a; ++k) {
                        var l = zc(L[e + 4 * k >> 2], "parameter " + k);
                        b[k + 1] = l.readValueFromPointer(f);
                        f += l.argPackAdvance
                    }
                    c = new (c.bind.apply(c, b));
                    return ac(c)
                }
            }

            var Rc = {};

            function Sc(a) {
                var b = a.getExtension("ANGLE_instanced_arrays");
                b && (a.vertexAttribDivisor = function (c, e) {
                    b.vertexAttribDivisorANGLE(c, e)
                }, a.drawArraysInstanced = function (c, e, f, k) {
                    b.drawArraysInstancedANGLE(c, e, f, k)
                }, a.drawElementsInstanced = function (c, e, f, k, l) {
                    b.drawElementsInstancedANGLE(c, e, f, k, l)
                })
            }

            function Tc(a) {
                var b = a.getExtension("OES_vertex_array_object");
                b && (a.createVertexArray = function () {
                    return b.createVertexArrayOES()
                }, a.deleteVertexArray = function (c) {
                    b.deleteVertexArrayOES(c)
                }, a.bindVertexArray = function (c) {
                    b.bindVertexArrayOES(c)
                }, a.isVertexArray = function (c) {
                    return b.isVertexArrayOES(c)
                })
            }

            function Uc(a) {
                var b = a.getExtension("WEBGL_draw_buffers");
                b && (a.drawBuffers = function (c, e) {
                    b.drawBuffersWEBGL(c, e)
                })
            }

            var Vc = 1, Wc = [], Xc = [], Yc = [], Zc = [], ea = [], $c = [], ad = [], ia = [], bd = [], cd = [],
                dd = {}, ed = {}, gd = 4;

            function R(a) {
                hd || (hd = a)
            }

            function da(a) {
                for (var b = Vc++, c = a.length; c < b; c++) a[c] = null;
                return b
            }

            function fa(a, b) {
                a.Ud || (a.Ud = a.getContext, a.getContext = function (e, f) {
                    f = a.Ud(e, f);
                    return "webgl" == e == f instanceof WebGLRenderingContext ? f : null
                });
                var c = 1 < b.majorVersion ? a.getContext("webgl2", b) : a.getContext("webgl", b);
                return c ? jd(c, b) : 0
            }

            function jd(a, b) {
                var c = da(ia), e = {handle: c, attributes: b, version: b.majorVersion, Pd: a};
                a.canvas && (a.canvas.Ke = e);
                ia[c] = e;
                ("undefined" == typeof b.Ue || b.Ue) && kd(e);
                return c
            }

            function ha(a) {
                x = ia[a];
                r.qf = S = x && x.Pd;
                return !(a && !S)
            }

            function kd(a) {
                a || (a = x);
                if (!a.bf) {
                    a.bf = !0;
                    var b = a.Pd;
                    Sc(b);
                    Tc(b);
                    Uc(b);
                    b.Ae = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                    b.Ee = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                    2 <= a.version && (b.Be = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                    if (2 > a.version || !b.Be) b.Be = b.getExtension("EXT_disjoint_timer_query");
                    b.rf = b.getExtension("WEBGL_multi_draw");
                    (b.getSupportedExtensions() || []).forEach(function (c) {
                        c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                    })
                }
            }

            var x, hd, ld = {}, nd = () => {
                if (!md) {
                    var a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: ma || "./this.program"
                    }, b;
                    for (b in ld) void 0 === ld[b] ? delete a[b] : a[b] = ld[b];
                    var c = [];
                    for (b in a) c.push(`${b}=${a[b]}`);
                    md = c
                }
                return md
            }, md, od = [null, [], []];

            function pd(a) {
                S.bindVertexArray(ad[a])
            }

            function qd(a, b) {
                for (var c = 0; c < a; c++) {
                    var e = K[b + 4 * c >> 2];
                    S.deleteVertexArray(ad[e]);
                    ad[e] = null
                }
            }

            var rd = [];

            function sd(a, b, c, e) {
                S.drawElements(a, b, c, e)
            }

            function td(a, b, c, e) {
                for (var f = 0; f < a; f++) {
                    var k = S[c](), l = k && da(e);
                    k ? (k.name = l, e[l] = k) : R(1282);
                    K[b + 4 * f >> 2] = l
                }
            }

            function ud(a, b) {
                td(a, b, "createVertexArray", ad)
            }

            function vd(a, b, c) {
                if (b) {
                    var e = void 0;
                    switch (a) {
                        case 36346:
                            e = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && R(1280);
                            return;
                        case 34814:
                        case 36345:
                            e = 0;
                            break;
                        case 34466:
                            var f = S.getParameter(34467);
                            e = f ? f.length : 0;
                            break;
                        case 33309:
                            if (2 > x.version) {
                                R(1282);
                                return
                            }
                            e = 2 * (S.getSupportedExtensions() || []).length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > x.version) {
                                R(1280);
                                return
                            }
                            e = 33307 == a ? 3 : 0
                    }
                    if (void 0 === e) switch (f = S.getParameter(a), typeof f) {
                        case "number":
                            e = f;
                            break;
                        case "boolean":
                            e = f ? 1 : 0;
                            break;
                        case "string":
                            R(1280);
                            return;
                        case "object":
                            if (null ===
                                f) switch (a) {
                                case 34964:
                                case 35725:
                                case 34965:
                                case 36006:
                                case 36007:
                                case 32873:
                                case 34229:
                                case 36662:
                                case 36663:
                                case 35053:
                                case 35055:
                                case 36010:
                                case 35097:
                                case 35869:
                                case 32874:
                                case 36389:
                                case 35983:
                                case 35368:
                                case 34068:
                                    e = 0;
                                    break;
                                default:
                                    R(1280);
                                    return
                            } else {
                                if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                    for (a = 0; a < f.length; ++a) switch (c) {
                                        case 0:
                                            K[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 2:
                                            N[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 4:
                                            Ha[b + a >> 0] = f[a] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    e = f.name | 0
                                } catch (k) {
                                    R(1280);
                                    Ca("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + k + ")");
                                    return
                                }
                            }
                            break;
                        default:
                            R(1280);
                            Ca("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + f + " of type " + typeof f + "!");
                            return
                    }
                    switch (c) {
                        case 1:
                            c = e;
                            L[b >> 2] = c;
                            L[b + 4 >> 2] = (c - L[b >> 2]) / 4294967296;
                            break;
                        case 0:
                            K[b >> 2] = e;
                            break;
                        case 2:
                            N[b >> 2] = e;
                            break;
                        case 4:
                            Ha[b >> 0] = e ? 1 : 0
                    }
                } else R(1281)
            }

            var xd = a => {
                var b = ja(a) + 1, c = wd(b);
                c && ka(a, C, c, b);
                return c
            };

            function yd(a) {
                return "]" == a.slice(-1) && a.lastIndexOf("[")
            }

            function zd(a) {
                a -= 5120;
                return 0 == a ? Ha : 1 == a ? C : 2 == a ? Ia : 4 == a ? K : 6 == a ? N : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? L : Ja
            }

            function Ad(a, b, c, e, f) {
                a = zd(a);
                var k = 31 - Math.clz32(a.BYTES_PER_ELEMENT), l = gd;
                return a.subarray(f >> k, f + e * (c * ({
                    5: 3,
                    6: 4,
                    8: 2,
                    29502: 3,
                    29504: 4,
                    26917: 2,
                    26918: 2,
                    29846: 3,
                    29847: 4
                }[b - 6402] || 1) * (1 << k) + l - 1 & -l) >> k)
            }

            function W(a) {
                var b = S.Re;
                if (b) {
                    var c = b.ee[a];
                    "number" == typeof c && (b.ee[a] = c = S.getUniformLocation(b, b.He[a] + (0 < c ? "[" + c + "]" : "")));
                    return c
                }
                R(1282)
            }

            var Bd = [], Cd = [], Dd = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
                Ed = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                Fd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function Gd(a) {
                var b = Array(ja(a) + 1);
                ka(a, b, 0, b.length);
                return b
            }

            var Hd = (a, b, c, e) => {
                function f(u, F, H) {
                    for (u = "number" == typeof u ? u.toString() : u || ""; u.length < F;) u = H[0] + u;
                    return u
                }

                function k(u, F) {
                    return f(u, F, "0")
                }

                function l(u, F) {
                    function H(ca) {
                        return 0 > ca ? -1 : 0 < ca ? 1 : 0
                    }

                    var T;
                    0 === (T = H(u.getFullYear() - F.getFullYear())) && 0 === (T = H(u.getMonth() - F.getMonth())) && (T = H(u.getDate() - F.getDate()));
                    return T
                }

                function m(u) {
                    switch (u.getDay()) {
                        case 0:
                            return new Date(u.getFullYear() - 1, 11, 29);
                        case 1:
                            return u;
                        case 2:
                            return new Date(u.getFullYear(), 0, 3);
                        case 3:
                            return new Date(u.getFullYear(),
                                0, 2);
                        case 4:
                            return new Date(u.getFullYear(), 0, 1);
                        case 5:
                            return new Date(u.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(u.getFullYear() - 1, 11, 30)
                    }
                }

                function q(u) {
                    var F = u.Vd;
                    for (u = new Date((new Date(u.Wd + 1900, 0, 1)).getTime()); 0 < F;) {
                        var H = u.getMonth(), T = (Dd(u.getFullYear()) ? Ed : Fd)[H];
                        if (F > T - u.getDate()) F -= T - u.getDate() + 1, u.setDate(1), 11 > H ? u.setMonth(H + 1) : (u.setMonth(0), u.setFullYear(u.getFullYear() + 1)); else {
                            u.setDate(u.getDate() + F);
                            break
                        }
                    }
                    H = new Date(u.getFullYear() + 1, 0, 4);
                    F = m(new Date(u.getFullYear(),
                        0, 4));
                    H = m(H);
                    return 0 >= l(F, u) ? 0 >= l(H, u) ? u.getFullYear() + 1 : u.getFullYear() : u.getFullYear() - 1
                }

                var w = K[e + 40 >> 2];
                e = {
                    nf: K[e >> 2],
                    mf: K[e + 4 >> 2],
                    oe: K[e + 8 >> 2],
                    xe: K[e + 12 >> 2],
                    pe: K[e + 16 >> 2],
                    Wd: K[e + 20 >> 2],
                    Qd: K[e + 24 >> 2],
                    Vd: K[e + 28 >> 2],
                    uf: K[e + 32 >> 2],
                    lf: K[e + 36 >> 2],
                    pf: w ? w ? kb(C, w) : "" : ""
                };
                c = c ? kb(C, c) : "";
                w = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y"
                };
                for (var y in w) c = c.replace(new RegExp(y, "g"), w[y]);
                var B = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    D = "January February March April May June July August September October November December".split(" ");
                w = {
                    "%a": u => B[u.Qd].substring(0, 3),
                    "%A": u => B[u.Qd],
                    "%b": u => D[u.pe].substring(0, 3),
                    "%B": u => D[u.pe],
                    "%C": u => k((u.Wd + 1900) /
                        100 | 0, 2),
                    "%d": u => k(u.xe, 2),
                    "%e": u => f(u.xe, 2, " "),
                    "%g": u => q(u).toString().substring(2),
                    "%G": u => q(u),
                    "%H": u => k(u.oe, 2),
                    "%I": u => {
                        u = u.oe;
                        0 == u ? u = 12 : 12 < u && (u -= 12);
                        return k(u, 2)
                    },
                    "%j": u => {
                        for (var F = 0, H = 0; H <= u.pe - 1; F += (Dd(u.Wd + 1900) ? Ed : Fd)[H++]) ;
                        return k(u.xe + F, 3)
                    },
                    "%m": u => k(u.pe + 1, 2),
                    "%M": u => k(u.mf, 2),
                    "%n": () => "\n",
                    "%p": u => 0 <= u.oe && 12 > u.oe ? "AM" : "PM",
                    "%S": u => k(u.nf, 2),
                    "%t": () => "\t",
                    "%u": u => u.Qd || 7,
                    "%U": u => k(Math.floor((u.Vd + 7 - u.Qd) / 7), 2),
                    "%V": u => {
                        var F = Math.floor((u.Vd + 7 - (u.Qd + 6) % 7) / 7);
                        2 >= (u.Qd + 371 - u.Vd -
                            2) % 7 && F++;
                        if (F) 53 == F && (H = (u.Qd + 371 - u.Vd) % 7, 4 == H || 3 == H && Dd(u.Wd) || (F = 1)); else {
                            F = 52;
                            var H = (u.Qd + 7 - u.Vd - 1) % 7;
                            (4 == H || 5 == H && Dd(u.Wd % 400 - 1)) && F++
                        }
                        return k(F, 2)
                    },
                    "%w": u => u.Qd,
                    "%W": u => k(Math.floor((u.Vd + 7 - (u.Qd + 6) % 7) / 7), 2),
                    "%y": u => (u.Wd + 1900).toString().substring(2),
                    "%Y": u => u.Wd + 1900,
                    "%z": u => {
                        u = u.lf;
                        var F = 0 <= u;
                        u = Math.abs(u) / 60;
                        return (F ? "+" : "-") + String("0000" + (u / 60 * 100 + u % 60)).slice(-4)
                    },
                    "%Z": u => u.pf,
                    "%%": () => "%"
                };
                c = c.replace(/%%/g, "\x00\x00");
                for (y in w) c.includes(y) && (c = c.replace(new RegExp(y, "g"), w[y](e)));
                c = c.replace(/\0\0/g, "%");
                y = Gd(c);
                if (y.length > b) return 0;
                Ha.set(y, a);
                return y.length - 1
            };
            rb = r.InternalError = class extends Error {
                constructor(a) {
                    super(a);
                    this.name = "InternalError"
                }
            };
            for (var Id = Array(256), Jd = 0; 256 > Jd; ++Jd) Id[Jd] = String.fromCharCode(Jd);
            wb = Id;
            xb = r.BindingError = class extends Error {
                constructor(a) {
                    super(a);
                    this.name = "BindingError"
                }
            };
            Rb.prototype.isAliasOf = function (a) {
                if (!(this instanceof Rb && a instanceof Rb)) return !1;
                var b = this.jd.Id.Gd, c = this.jd.Fd, e = a.jd.Id.Gd;
                for (a = a.jd.Fd; b.Ld;) c = b.fe(c), b = b.Ld;
                for (; e.Ld;) a = e.fe(a), e = e.Ld;
                return b === e && c === a
            };
            Rb.prototype.clone = function () {
                this.jd.Fd || zb(this);
                if (this.jd.de) return this.jd.count.value += 1, this;
                var a = Qb, b = Object, c = b.create, e = Object.getPrototypeOf(this), f = this.jd;
                a = a(c.call(b, e, {
                    jd: {
                        value: {
                            count: f.count,
                            $d: f.$d,
                            de: f.de,
                            Fd: f.Fd,
                            Id: f.Id,
                            Kd: f.Kd,
                            Od: f.Od
                        }
                    }
                }));
                a.jd.count.value += 1;
                a.jd.$d = !1;
                return a
            };
            Rb.prototype["delete"] = function () {
                this.jd.Fd || zb(this);
                this.jd.$d && !this.jd.de && Q("Object already scheduled for deletion");
                Bb(this);
                Cb(this.jd);
                this.jd.de || (this.jd.Kd = void 0, this.jd.Fd = void 0)
            };
            Rb.prototype.isDeleted = function () {
                return !this.jd.Fd
            };
            Rb.prototype.deleteLater = function () {
                this.jd.Fd || zb(this);
                this.jd.$d && !this.jd.de && Q("Object already scheduled for deletion");
                Kb.push(this);
                1 === Kb.length && Mb && Mb(Lb);
                this.jd.$d = !0;
                return this
            };
            r.getInheritedInstanceCount = function () {
                return Object.keys(Nb).length
            };
            r.getLiveInheritedInstances = function () {
                var a = [], b;
                for (b in Nb) Nb.hasOwnProperty(b) && a.push(Nb[b]);
                return a
            };
            r.flushPendingDeletes = Lb;
            r.setDelayFunction = function (a) {
                Mb = a;
                Kb.length && Mb && Mb(Lb)
            };
            cc.prototype.Xe = function (a) {
                this.Fe && (a = this.Fe(a));
                return a
            };
            cc.prototype.ze = function (a) {
                this.Sd && this.Sd(a)
            };
            cc.prototype.argPackAdvance = 8;
            cc.prototype.readValueFromPointer = nb;
            cc.prototype.deleteObject = function (a) {
                if (null !== a) a["delete"]()
            };
            cc.prototype.fromWireType = function (a) {
                function b() {
                    return this.ke ? Pb(this.Gd.ae, {Id: this.df, Fd: c, Od: this, Kd: a}) : Pb(this.Gd.ae, {
                        Id: this,
                        Fd: a
                    })
                }

                var c = this.Xe(a);
                if (!c) return this.ze(a), null;
                var e = Ob(this.Gd, c);
                if (void 0 !== e) {
                    if (0 === e.jd.count.value) return e.jd.Fd = c, e.jd.Kd = a, e.clone();
                    e = e.clone();
                    this.ze(a);
                    return e
                }
                e = this.Gd.We(c);
                e = Jb[e];
                if (!e) return b.call(this);
                e = this.je ? e.Qe : e.pointerType;
                var f = Db(c, this.Gd, e.Gd);
                return null === f ? b.call(this) : this.ke ? Pb(e.Gd.ae, {Id: e, Fd: f, Od: this, Kd: a}) : Pb(e.Gd.ae,
                    {Id: e, Fd: f})
            };
            nc = r.UnboundTypeError = function (a, b) {
                var c = Tb(b, function (e) {
                    this.name = b;
                    this.message = e;
                    e = Error(e).stack;
                    void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""))
                });
                c.prototype = Object.create(a.prototype);
                c.prototype.constructor = c;
                c.prototype.toString = function () {
                    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`
                };
                return c
            }(Error, "UnboundTypeError");
            Object.assign(uc.prototype, {
                get(a) {
                    return this.Rd[a]
                }, has(a) {
                    return void 0 !== this.Rd[a]
                }, qe(a) {
                    var b = this.De.pop() || this.Rd.length;
                    this.Rd[b] = a;
                    return b
                }, re(a) {
                    this.Rd[a] = void 0;
                    this.De.push(a)
                }
            });
            vc.Rd.push({value: void 0}, {value: null}, {value: !0}, {value: !1});
            vc.Ud = vc.Rd.length;
            r.count_emval_handles = function () {
                for (var a = 0, b = vc.Ud; b < vc.Rd.length; ++b) void 0 !== vc.Rd[b] && ++a;
                return a
            };
            for (var S, Kd = 0; 32 > Kd; ++Kd) rd.push(Array(Kd));
            var Ld = new Float32Array(288);
            for (Kd = 0; 288 > Kd; ++Kd) Bd[Kd] = Ld.subarray(0, Kd + 1);
            var Md = new Int32Array(288);
            for (Kd = 0; 288 > Kd; ++Kd) Cd[Kd] = Md.subarray(0, Kd + 1);
            var $d = {
                H: function (a, b, c) {
                    (new fb(a)).Ud(b, c);
                    gb = a;
                    ib++;
                    throw gb;
                },
                _: function () {
                    return 0
                },
                _c: () => {
                },
                Zc: function () {
                    return 0
                },
                Yc: () => {
                },
                Xc: function () {
                },
                Wc: () => {
                },
                E: function (a) {
                    var b = lb[a];
                    delete lb[a];
                    var c = b.we, e = b.Sd, f = b.Ce, k = f.map(l => l.$e).concat(f.map(l => l.hf));
                    tb([a], k, l => {
                        var m = {};
                        f.forEach((q, w) => {
                            var y = l[w], B = q.Ye, D = q.Ze, u = l[w + f.length], F = q.gf, H = q.jf;
                            m[q.Ve] = {
                                read: T => y.fromWireType(B(D, T)), write: (T, ca) => {
                                    var Y = [];
                                    F(H, T, u.toWireType(Y, ca));
                                    mb(Y)
                                }
                            }
                        });
                        return [{
                            name: b.name, fromWireType: function (q) {
                                var w =
                                    {}, y;
                                for (y in m) w[y] = m[y].read(q);
                                e(q);
                                return w
                            }, toWireType: function (q, w) {
                                for (var y in m) if (!(y in w)) throw new TypeError(`Missing field: "${y}"`);
                                var B = c();
                                for (y in m) m[y].write(B, w[y]);
                                null !== q && q.push(e, B);
                                return B
                            }, argPackAdvance: 8, readValueFromPointer: nb, Nd: e
                        }]
                    })
                },
                ea: function () {
                },
                Sc: function (a, b, c, e, f) {
                    var k = vb(c);
                    b = P(b);
                    ub(a, {
                        name: b, fromWireType: function (l) {
                            return !!l
                        }, toWireType: function (l, m) {
                            return m ? e : f
                        }, argPackAdvance: 8, readValueFromPointer: function (l) {
                            if (1 === c) var m = Ha; else if (2 === c) m = Ia;
                            else if (4 === c) m = K; else throw new TypeError("Unknown boolean type size: " + b);
                            return this.fromWireType(m[l >> k])
                        }, Nd: null
                    })
                },
                l: function (a, b, c, e, f, k, l, m, q, w, y, B, D) {
                    y = P(y);
                    k = mc(f, k);
                    m && (m = mc(l, m));
                    w && (w = mc(q, w));
                    D = mc(B, D);
                    var u = Sb(y);
                    Vb(u, function () {
                        rc(`Cannot construct ${y} due to unbound types`, [e])
                    });
                    tb([a, b, c], e ? [e] : [], function (F) {
                        F = F[0];
                        if (e) {
                            var H = F.Gd;
                            var T = H.ae
                        } else T = Rb.prototype;
                        F = Tb(u, function () {
                            if (Object.getPrototypeOf(this) !== ca) throw new xb("Use 'new' to construct " + y);
                            if (void 0 === Y.Td) throw new xb(y +
                                " has no accessible constructor");
                            var Ma = Y.Td[arguments.length];
                            if (void 0 === Ma) throw new xb(`Tried to invoke ctor of ${y} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(Y.Td).toString()}) parameters instead!`);
                            return Ma.apply(this, arguments)
                        });
                        var ca = Object.create(T, {constructor: {value: F}});
                        F.prototype = ca;
                        var Y = new Wb(y, F, ca, D, H, k, m, w);
                        Y.Ld && (void 0 === Y.Ld.ge && (Y.Ld.ge = []), Y.Ld.ge.push(Y));
                        H = new cc(y, Y, !0, !1, !1);
                        T = new cc(y + "*", Y, !1, !1, !1);
                        var va = new cc(y + " const*",
                            Y, !1, !0, !1);
                        Jb[a] = {pointerType: T, Qe: va};
                        dc(u, F);
                        return [H, T, va]
                    })
                },
                e: function (a, b, c, e, f, k, l) {
                    var m = tc(c, e);
                    b = P(b);
                    k = mc(f, k);
                    tb([], [a], function (q) {
                        function w() {
                            rc(`Cannot call ${y} due to unbound types`, m)
                        }

                        q = q[0];
                        var y = `${q.name}.${b}`;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        var B = q.Gd.constructor;
                        void 0 === B[b] ? (w.Yd = c - 1, B[b] = w) : (Ub(B, b, y), B[b].Jd[c - 1] = w);
                        tb([], m, function (D) {
                            D = [D[0], null].concat(D.slice(1));
                            D = sc(y, D, null, k, l);
                            void 0 === B[b].Jd ? (D.Yd = c - 1, B[b] = D) : B[b].Jd[c - 1] = D;
                            if (q.Gd.ge) for (const u of q.Gd.ge) u.constructor.hasOwnProperty(b) ||
                            (u.constructor[b] = D);
                            return []
                        });
                        return []
                    })
                },
                B: function (a, b, c, e, f, k) {
                    var l = tc(b, c);
                    f = mc(e, f);
                    tb([], [a], function (m) {
                        m = m[0];
                        var q = `constructor ${m.name}`;
                        void 0 === m.Gd.Td && (m.Gd.Td = []);
                        if (void 0 !== m.Gd.Td[b - 1]) throw new xb(`Cannot register multiple constructors with identical number of parameters (${b - 1}) for class '${m.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
                        m.Gd.Td[b - 1] = () => {
                            rc(`Cannot construct ${m.name} due to unbound types`, l)
                        };
                        tb([], l, function (w) {
                            w.splice(1, 0, null);
                            m.Gd.Td[b - 1] = sc(q, w, null, f, k);
                            return []
                        });
                        return []
                    })
                },
                a: function (a, b, c, e, f, k, l, m) {
                    var q = tc(c, e);
                    b = P(b);
                    k = mc(f, k);
                    tb([], [a], function (w) {
                        function y() {
                            rc(`Cannot call ${B} due to unbound types`, q)
                        }

                        w = w[0];
                        var B = `${w.name}.${b}`;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        m && w.Gd.ef.push(b);
                        var D = w.Gd.ae, u = D[b];
                        void 0 === u || void 0 === u.Jd && u.className !== w.name && u.Yd === c - 2 ? (y.Yd = c - 2, y.className = w.name, D[b] = y) : (Ub(D, b, B), D[b].Jd[c - 2] = y);
                        tb([], q, function (F) {
                            F = sc(B, F,
                                w, k, l);
                            void 0 === D[b].Jd ? (F.Yd = c - 2, D[b] = F) : D[b].Jd[c - 2] = F;
                            return []
                        });
                        return []
                    })
                },
                s: function (a, b, c) {
                    a = P(a);
                    tb([], [b], function (e) {
                        e = e[0];
                        r[a] = e.fromWireType(c);
                        return []
                    })
                },
                Rc: function (a, b) {
                    b = P(b);
                    ub(a, {
                        name: b, fromWireType: function (c) {
                            var e = xc(c);
                            wc(c);
                            return e
                        }, toWireType: function (c, e) {
                            return ac(e)
                        }, argPackAdvance: 8, readValueFromPointer: nb, Nd: null
                    })
                },
                i: function (a, b, c, e) {
                    function f() {
                    }

                    c = vb(c);
                    b = P(b);
                    f.values = {};
                    ub(a, {
                        name: b, constructor: f, fromWireType: function (k) {
                            return this.constructor.values[k]
                        }, toWireType: function (k,
                                                 l) {
                            return l.value
                        }, argPackAdvance: 8, readValueFromPointer: yc(b, c, e), Nd: null
                    });
                    Vb(b, f)
                },
                b: function (a, b, c) {
                    var e = zc(a, "enum");
                    b = P(b);
                    a = e.constructor;
                    e = Object.create(e.constructor.prototype, {
                        value: {value: c},
                        constructor: {
                            value: Tb(`${e.name}_${b}`, function () {
                            })
                        }
                    });
                    a.values[c] = e;
                    a[b] = e
                },
                X: function (a, b, c) {
                    c = vb(c);
                    b = P(b);
                    ub(a, {
                        name: b, fromWireType: function (e) {
                            return e
                        }, toWireType: function (e, f) {
                            return f
                        }, argPackAdvance: 8, readValueFromPointer: Ac(b, c), Nd: null
                    })
                },
                v: function (a, b, c, e, f, k) {
                    var l = tc(b, c);
                    a = P(a);
                    f =
                        mc(e, f);
                    Vb(a, function () {
                        rc(`Cannot call ${a} due to unbound types`, l)
                    }, b - 1);
                    tb([], l, function (m) {
                        m = [m[0], null].concat(m.slice(1));
                        dc(a, sc(a, m, null, f, k), b - 1);
                        return []
                    })
                },
                D: function (a, b, c, e, f) {
                    b = P(b);
                    -1 === f && (f = 4294967295);
                    f = vb(c);
                    var k = m => m;
                    if (0 === e) {
                        var l = 32 - 8 * c;
                        k = m => m << l >>> l
                    }
                    c = b.includes("unsigned") ? function (m, q) {
                        return q >>> 0
                    } : function (m, q) {
                        return q
                    };
                    ub(a, {
                        name: b,
                        fromWireType: k,
                        toWireType: c,
                        argPackAdvance: 8,
                        readValueFromPointer: Bc(b, f, 0 !== e),
                        Nd: null
                    })
                },
                r: function (a, b, c) {
                    function e(k) {
                        k >>= 2;
                        var l =
                            L;
                        return new f(l.buffer, l[k + 1], l[k])
                    }

                    var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                    c = P(c);
                    ub(a, {name: c, fromWireType: e, argPackAdvance: 8, readValueFromPointer: e}, {af: !0})
                },
                q: function (a, b, c, e, f, k, l, m, q, w, y, B) {
                    c = P(c);
                    k = mc(f, k);
                    m = mc(l, m);
                    w = mc(q, w);
                    B = mc(y, B);
                    tb([a], [b], function (D) {
                        D = D[0];
                        return [new cc(c, D.Gd, !1, !1, !0, D, e, k, m, w, B)]
                    })
                },
                W: function (a, b) {
                    b = P(b);
                    var c = "std::string" === b;
                    ub(a, {
                        name: b, fromWireType: function (e) {
                            var f = L[e >> 2], k = e + 4;
                            if (c) for (var l =
                                k, m = 0; m <= f; ++m) {
                                var q = k + m;
                                if (m == f || 0 == C[q]) {
                                    l = l ? kb(C, l, q - l) : "";
                                    if (void 0 === w) var w = l; else w += String.fromCharCode(0), w += l;
                                    l = q + 1
                                }
                            } else {
                                w = Array(f);
                                for (m = 0; m < f; ++m) w[m] = String.fromCharCode(C[k + m]);
                                w = w.join("")
                            }
                            qc(e);
                            return w
                        }, toWireType: function (e, f) {
                            f instanceof ArrayBuffer && (f = new Uint8Array(f));
                            var k = "string" == typeof f;
                            k || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || Q("Cannot pass non-string to std::string");
                            var l = c && k ? ja(f) : f.length;
                            var m = wd(4 + l + 1), q = m + 4;
                            L[m >> 2] =
                                l;
                            if (c && k) ka(f, C, q, l + 1); else if (k) for (k = 0; k < l; ++k) {
                                var w = f.charCodeAt(k);
                                255 < w && (qc(q), Q("String has UTF-16 code units that do not fit in 8 bits"));
                                C[q + k] = w
                            } else for (k = 0; k < l; ++k) C[q + k] = f[k];
                            null !== e && e.push(qc, m);
                            return m
                        }, argPackAdvance: 8, readValueFromPointer: nb, Nd: function (e) {
                            qc(e)
                        }
                    })
                },
                O: function (a, b, c) {
                    c = P(c);
                    if (2 === b) {
                        var e = Dc;
                        var f = Ec;
                        var k = Fc;
                        var l = () => Ja;
                        var m = 1
                    } else 4 === b && (e = Gc, f = Hc, k = Ic, l = () => L, m = 2);
                    ub(a, {
                        name: c, fromWireType: function (q) {
                            for (var w = L[q >> 2], y = l(), B, D = q + 4, u = 0; u <= w; ++u) {
                                var F =
                                    q + 4 + u * b;
                                if (u == w || 0 == y[F >> m]) D = e(D, F - D), void 0 === B ? B = D : (B += String.fromCharCode(0), B += D), D = F + b
                            }
                            qc(q);
                            return B
                        }, toWireType: function (q, w) {
                            "string" != typeof w && Q(`Cannot pass non-string to C++ string type ${c}`);
                            var y = k(w), B = wd(4 + y + b);
                            L[B >> 2] = y >> m;
                            f(w, B + 4, y + b);
                            null !== q && q.push(qc, B);
                            return B
                        }, argPackAdvance: 8, readValueFromPointer: nb, Nd: function (q) {
                            qc(q)
                        }
                    })
                },
                C: function (a, b, c, e, f, k) {
                    lb[a] = {name: P(b), we: mc(c, e), Sd: mc(f, k), Ce: []}
                },
                d: function (a, b, c, e, f, k, l, m, q, w) {
                    lb[a].Ce.push({
                        Ve: P(b), $e: c, Ye: mc(e, f), Ze: k,
                        hf: l, gf: mc(m, q), jf: w
                    })
                },
                Qc: function (a, b) {
                    b = P(b);
                    ub(a, {
                        cf: !0, name: b, argPackAdvance: 0, fromWireType: function () {
                        }, toWireType: function () {
                        }
                    })
                },
                Pc: () => !0,
                Oc: () => {
                    throw Infinity;
                },
                G: function (a, b, c) {
                    a = xc(a);
                    b = zc(b, "emval::as");
                    var e = [], f = ac(e);
                    L[c >> 2] = f;
                    return b.toWireType(e, a)
                },
                N: function (a, b, c, e, f) {
                    a = Lc[a];
                    b = xc(b);
                    c = Kc(c);
                    var k = [];
                    L[e >> 2] = ac(k);
                    return a(b, c, k, f)
                },
                t: function (a, b, c, e) {
                    a = Lc[a];
                    b = xc(b);
                    c = Kc(c);
                    a(b, c, null, e)
                },
                c: wc,
                M: function (a) {
                    if (0 === a) return ac(Mc());
                    a = Kc(a);
                    return ac(Mc()[a])
                },
                p: function (a,
                             b) {
                    var c = Oc(a, b), e = c[0];
                    b = e.name + "_$" + c.slice(1).map(function (l) {
                        return l.name
                    }).join("_") + "$";
                    var f = Pc[b];
                    if (void 0 !== f) return f;
                    var k = Array(a - 1);
                    f = Nc((l, m, q, w) => {
                        for (var y = 0, B = 0; B < a - 1; ++B) k[B] = c[B + 1].readValueFromPointer(w + y), y += c[B + 1].argPackAdvance;
                        l = l[m].apply(l, k);
                        for (B = 0; B < a - 1; ++B) c[B + 1].Se && c[B + 1].Se(k[B]);
                        if (!e.cf) return e.toWireType(q, l)
                    });
                    return Pc[b] = f
                },
                A: function (a, b) {
                    a = xc(a);
                    b = xc(b);
                    return ac(a[b])
                },
                m: function (a) {
                    4 < a && (vc.get(a).Ge += 1)
                },
                L: function (a, b, c, e) {
                    a = xc(a);
                    var f = Rc[b];
                    f || (f =
                        Qc(b), Rc[b] = f);
                    return f(a, c, e)
                },
                I: function () {
                    return ac([])
                },
                f: function (a) {
                    return ac(Kc(a))
                },
                F: function () {
                    return ac({})
                },
                Nc: function (a) {
                    a = xc(a);
                    return !a
                },
                z: function (a) {
                    var b = xc(a);
                    mb(b);
                    wc(a)
                },
                h: function (a, b, c) {
                    a = xc(a);
                    b = xc(b);
                    c = xc(c);
                    a[b] = c
                },
                g: function (a, b) {
                    a = zc(a, "_emval_take_value");
                    a = a.readValueFromPointer(b);
                    return ac(a)
                },
                da: function () {
                    return -52
                },
                ca: function () {
                },
                k: () => {
                    Ea("")
                },
                Mc: () => performance.now(),
                Lc: a => {
                    var b = C.length;
                    a >>>= 0;
                    if (2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var e = b * (1 + .2 / c);
                        e = Math.min(e, a + 100663296);
                        var f = Math;
                        e = Math.max(a, e);
                        a:{
                            f = f.min.call(f, 2147483648, e + (65536 - e % 65536) % 65536) - Fa.buffer.byteLength + 65535 >>> 16;
                            try {
                                Fa.grow(f);
                                La();
                                var k = 1;
                                break a
                            } catch (l) {
                            }
                            k = void 0
                        }
                        if (k) return !0
                    }
                    return !1
                },
                Kc: function () {
                    return x ? x.handle : 0
                },
                Vc: (a, b) => {
                    var c = 0;
                    nd().forEach(function (e, f) {
                        var k = b + c;
                        f = L[a + 4 * f >> 2] = k;
                        for (k = 0; k < e.length; ++k) Ha[f++ >> 0] = e.charCodeAt(k);
                        Ha[f >> 0] = 0;
                        c += e.length + 1
                    });
                    return 0
                },
                Uc: (a, b) => {
                    var c = nd();
                    L[a >> 2] = c.length;
                    var e = 0;
                    c.forEach(function (f) {
                        e += f.length + 1
                    });
                    L[b >>
                    2] = e;
                    return 0
                },
                Jc: a => {
                    if (!noExitRuntime) {
                        if (r.onExit) r.onExit(a);
                        Ga = !0
                    }
                    oa(a, new db(a))
                },
                Z: () => 52,
                ga: function () {
                    return 52
                },
                Tc: () => 52,
                fa: function () {
                    return 70
                },
                Y: (a, b, c, e) => {
                    for (var f = 0, k = 0; k < c; k++) {
                        var l = L[b >> 2], m = L[b + 4 >> 2];
                        b += 8;
                        for (var q = 0; q < m; q++) {
                            var w = C[l + q], y = od[a];
                            0 === w || 10 === w ? ((1 === a ? Aa : Ca)(kb(y, 0)), y.length = 0) : y.push(w)
                        }
                        f += m
                    }
                    L[e >> 2] = f;
                    return 0
                },
                Ic: function (a) {
                    S.activeTexture(a)
                },
                Hc: function (a, b) {
                    S.attachShader(Xc[a], $c[b])
                },
                Gc: function (a, b, c) {
                    S.bindAttribLocation(Xc[a], b, c ? kb(C, c) : "")
                },
                Fc: function (a,
                              b) {
                    35051 == a ? S.te = b : 35052 == a && (S.Zd = b);
                    S.bindBuffer(a, Wc[b])
                },
                V: function (a, b) {
                    S.bindFramebuffer(a, Yc[b])
                },
                Ec: function (a, b) {
                    S.bindRenderbuffer(a, Zc[b])
                },
                Dc: function (a, b) {
                    S.bindSampler(a, bd[b])
                },
                Cc: function (a, b) {
                    S.bindTexture(a, ea[b])
                },
                Bc: pd,
                Ac: pd,
                zc: function (a, b, c, e) {
                    S.blendColor(a, b, c, e)
                },
                yc: function (a) {
                    S.blendEquation(a)
                },
                xc: function (a, b) {
                    S.blendFunc(a, b)
                },
                wc: function (a, b, c, e, f, k, l, m, q, w) {
                    S.blitFramebuffer(a, b, c, e, f, k, l, m, q, w)
                },
                vc: function (a, b, c, e) {
                    2 <= x.version ? c && b ? S.bufferData(a, C, e, c, b) : S.bufferData(a,
                        b, e) : S.bufferData(a, c ? C.subarray(c, c + b) : b, e)
                },
                uc: function (a, b, c, e) {
                    2 <= x.version ? c && S.bufferSubData(a, b, C, e, c) : S.bufferSubData(a, b, C.subarray(e, e + c))
                },
                tc: function (a) {
                    return S.checkFramebufferStatus(a)
                },
                U: function (a) {
                    S.clear(a)
                },
                T: function (a, b, c, e) {
                    S.clearColor(a, b, c, e)
                },
                S: function (a) {
                    S.clearStencil(a)
                },
                ba: function (a, b, c, e) {
                    return S.clientWaitSync(cd[a], b, (c >>> 0) + 4294967296 * e)
                },
                sc: function (a, b, c, e) {
                    S.colorMask(!!a, !!b, !!c, !!e)
                },
                rc: function (a) {
                    S.compileShader($c[a])
                },
                qc: function (a, b, c, e, f, k, l, m) {
                    2 <=
                    x.version ? S.Zd || !l ? S.compressedTexImage2D(a, b, c, e, f, k, l, m) : S.compressedTexImage2D(a, b, c, e, f, k, C, m, l) : S.compressedTexImage2D(a, b, c, e, f, k, m ? C.subarray(m, m + l) : null)
                },
                pc: function (a, b, c, e, f, k, l, m, q) {
                    2 <= x.version ? S.Zd || !m ? S.compressedTexSubImage2D(a, b, c, e, f, k, l, m, q) : S.compressedTexSubImage2D(a, b, c, e, f, k, l, C, q, m) : S.compressedTexSubImage2D(a, b, c, e, f, k, l, q ? C.subarray(q, q + m) : null)
                },
                oc: function (a, b, c, e, f) {
                    S.copyBufferSubData(a, b, c, e, f)
                },
                nc: function (a, b, c, e, f, k, l, m) {
                    S.copyTexSubImage2D(a, b, c, e, f, k, l, m)
                },
                mc: function () {
                    var a =
                        da(Xc), b = S.createProgram();
                    b.name = a;
                    b.ne = b.le = b.me = 0;
                    b.ye = 1;
                    Xc[a] = b;
                    return a
                },
                lc: function (a) {
                    var b = da($c);
                    $c[b] = S.createShader(a);
                    return b
                },
                kc: function (a) {
                    S.cullFace(a)
                },
                jc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = K[b + 4 * c >> 2], f = Wc[e];
                        f && (S.deleteBuffer(f), f.name = 0, Wc[e] = null, e == S.te && (S.te = 0), e == S.Zd && (S.Zd = 0))
                    }
                },
                ic: function (a, b) {
                    for (var c = 0; c < a; ++c) {
                        var e = K[b + 4 * c >> 2], f = Yc[e];
                        f && (S.deleteFramebuffer(f), f.name = 0, Yc[e] = null)
                    }
                },
                hc: function (a) {
                    if (a) {
                        var b = Xc[a];
                        b ? (S.deleteProgram(b), b.name = 0, Xc[a] = null) :
                            R(1281)
                    }
                },
                gc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = K[b + 4 * c >> 2], f = Zc[e];
                        f && (S.deleteRenderbuffer(f), f.name = 0, Zc[e] = null)
                    }
                },
                fc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = K[b + 4 * c >> 2], f = bd[e];
                        f && (S.deleteSampler(f), f.name = 0, bd[e] = null)
                    }
                },
                ec: function (a) {
                    if (a) {
                        var b = $c[a];
                        b ? (S.deleteShader(b), $c[a] = null) : R(1281)
                    }
                },
                dc: function (a) {
                    if (a) {
                        var b = cd[a];
                        b ? (S.deleteSync(b), b.name = 0, cd[a] = null) : R(1281)
                    }
                },
                cc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = K[b + 4 * c >> 2], f = ea[e];
                        f && (S.deleteTexture(f), f.name = 0, ea[e] = null)
                    }
                },
                bc: qd,
                ac: qd,
                $b: function (a) {
                    S.depthMask(!!a)
                },
                _b: function (a) {
                    S.disable(a)
                },
                Zb: function (a) {
                    S.disableVertexAttribArray(a)
                },
                Yb: function (a, b, c) {
                    S.drawArrays(a, b, c)
                },
                Xb: function (a, b, c, e) {
                    S.drawArraysInstanced(a, b, c, e)
                },
                Wb: function (a, b, c, e, f) {
                    S.Ae.drawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f)
                },
                Vb: function (a, b) {
                    for (var c = rd[a], e = 0; e < a; e++) c[e] = K[b + 4 * e >> 2];
                    S.drawBuffers(c)
                },
                Ub: sd,
                Tb: function (a, b, c, e, f) {
                    S.drawElementsInstanced(a, b, c, e, f)
                },
                Sb: function (a, b, c, e, f, k, l) {
                    S.Ae.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a,
                        b, c, e, f, k, l)
                },
                Rb: function (a, b, c, e, f, k) {
                    sd(a, e, f, k)
                },
                Qb: function (a) {
                    S.enable(a)
                },
                Pb: function (a) {
                    S.enableVertexAttribArray(a)
                },
                Ob: function (a, b) {
                    return (a = S.fenceSync(a, b)) ? (b = da(cd), a.name = b, cd[b] = a, b) : 0
                },
                Nb: function () {
                    S.finish()
                },
                Mb: function () {
                    S.flush()
                },
                Lb: function (a, b, c, e) {
                    S.framebufferRenderbuffer(a, b, c, Zc[e])
                },
                Kb: function (a, b, c, e, f) {
                    S.framebufferTexture2D(a, b, c, ea[e], f)
                },
                Jb: function (a) {
                    S.frontFace(a)
                },
                Ib: function (a, b) {
                    td(a, b, "createBuffer", Wc)
                },
                Hb: function (a, b) {
                    td(a, b, "createFramebuffer", Yc)
                },
                Gb: function (a,
                              b) {
                    td(a, b, "createRenderbuffer", Zc)
                },
                Fb: function (a, b) {
                    td(a, b, "createSampler", bd)
                },
                Eb: function (a, b) {
                    td(a, b, "createTexture", ea)
                },
                Db: ud,
                Cb: ud,
                Bb: function (a) {
                    S.generateMipmap(a)
                },
                Ab: function (a, b, c) {
                    c ? K[c >> 2] = S.getBufferParameter(a, b) : R(1281)
                },
                zb: function () {
                    var a = S.getError() || hd;
                    hd = 0;
                    return a
                },
                yb: function (a, b) {
                    vd(a, b, 2)
                },
                xb: function (a, b, c, e) {
                    a = S.getFramebufferAttachmentParameter(a, b, c);
                    if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                    K[e >> 2] = a
                },
                K: function (a, b) {
                    vd(a, b, 0)
                },
                wb: function (a,
                              b, c, e) {
                    a = S.getProgramInfoLog(Xc[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && e ? ka(a, C, e, b) : 0;
                    c && (K[c >> 2] = b)
                },
                vb: function (a, b, c) {
                    if (c) if (a >= Vc) R(1281); else if (a = Xc[a], 35716 == b) a = S.getProgramInfoLog(a), null === a && (a = "(unknown error)"), K[c >> 2] = a.length + 1; else if (35719 == b) {
                        if (!a.ne) for (b = 0; b < S.getProgramParameter(a, 35718); ++b) a.ne = Math.max(a.ne, S.getActiveUniform(a, b).name.length + 1);
                        K[c >> 2] = a.ne
                    } else if (35722 == b) {
                        if (!a.le) for (b = 0; b < S.getProgramParameter(a, 35721); ++b) a.le = Math.max(a.le, S.getActiveAttrib(a,
                            b).name.length + 1);
                        K[c >> 2] = a.le
                    } else if (35381 == b) {
                        if (!a.me) for (b = 0; b < S.getProgramParameter(a, 35382); ++b) a.me = Math.max(a.me, S.getActiveUniformBlockName(a, b).length + 1);
                        K[c >> 2] = a.me
                    } else K[c >> 2] = S.getProgramParameter(a, b); else R(1281)
                },
                ub: function (a, b, c) {
                    c ? K[c >> 2] = S.getRenderbufferParameter(a, b) : R(1281)
                },
                tb: function (a, b, c, e) {
                    a = S.getShaderInfoLog($c[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && e ? ka(a, C, e, b) : 0;
                    c && (K[c >> 2] = b)
                },
                sb: function (a, b, c, e) {
                    a = S.getShaderPrecisionFormat(a, b);
                    K[c >> 2] = a.rangeMin;
                    K[c + 4 >>
                    2] = a.rangeMax;
                    K[e >> 2] = a.precision
                },
                rb: function (a, b, c) {
                    c ? 35716 == b ? (a = S.getShaderInfoLog($c[a]), null === a && (a = "(unknown error)"), K[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = S.getShaderSource($c[a]), K[c >> 2] = a ? a.length + 1 : 0) : K[c >> 2] = S.getShaderParameter($c[a], b) : R(1281)
                },
                R: function (a) {
                    var b = dd[a];
                    if (!b) {
                        switch (a) {
                            case 7939:
                                b = S.getSupportedExtensions() || [];
                                b = b.concat(b.map(function (e) {
                                    return "GL_" + e
                                }));
                                b = xd(b.join(" "));
                                break;
                            case 7936:
                            case 7937:
                            case 37445:
                            case 37446:
                                (b = S.getParameter(a)) || R(1280);
                                b = b && xd(b);
                                break;
                            case 7938:
                                b = S.getParameter(7938);
                                b = 2 <= x.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
                                b = xd(b);
                                break;
                            case 35724:
                                b = S.getParameter(35724);
                                var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                                null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                                b = xd(b);
                                break;
                            default:
                                R(1280)
                        }
                        dd[a] = b
                    }
                    return b
                },
                qb: function (a, b) {
                    if (2 > x.version) return R(1282), 0;
                    var c = ed[a];
                    if (c) return 0 > b || b >= c.length ? (R(1281), 0) : c[b];
                    switch (a) {
                        case 7939:
                            return c = S.getSupportedExtensions() || [],
                                c = c.concat(c.map(function (e) {
                                    return "GL_" + e
                                })), c = c.map(function (e) {
                                return xd(e)
                            }), c = ed[a] = c, 0 > b || b >= c.length ? (R(1281), 0) : c[b];
                        default:
                            return R(1280), 0
                    }
                },
                pb: function (a, b) {
                    b = b ? kb(C, b) : "";
                    if (a = Xc[a]) {
                        var c = a, e = c.ee, f = c.Ie, k;
                        if (!e) for (c.ee = e = {}, c.He = {}, k = 0; k < S.getProgramParameter(c, 35718); ++k) {
                            var l = S.getActiveUniform(c, k);
                            var m = l.name;
                            l = l.size;
                            var q = yd(m);
                            q = 0 < q ? m.slice(0, q) : m;
                            var w = c.ye;
                            c.ye += l;
                            f[q] = [l, w];
                            for (m = 0; m < l; ++m) e[w] = m, c.He[w++] = q
                        }
                        c = a.ee;
                        e = 0;
                        f = b;
                        k = yd(b);
                        0 < k && (e = parseInt(b.slice(k + 1)) >>> 0, f = b.slice(0,
                            k));
                        if ((f = a.Ie[f]) && e < f[0] && (e += f[1], c[e] = c[e] || S.getUniformLocation(a, b))) return e
                    } else R(1281);
                    return -1
                },
                ob: function (a, b, c) {
                    for (var e = rd[b], f = 0; f < b; f++) e[f] = K[c + 4 * f >> 2];
                    S.invalidateFramebuffer(a, e)
                },
                nb: function (a, b, c, e, f, k, l) {
                    for (var m = rd[b], q = 0; q < b; q++) m[q] = K[c + 4 * q >> 2];
                    S.invalidateSubFramebuffer(a, m, e, f, k, l)
                },
                mb: function (a) {
                    return S.isSync(cd[a])
                },
                lb: function (a) {
                    return (a = ea[a]) ? S.isTexture(a) : 0
                },
                kb: function (a) {
                    S.lineWidth(a)
                },
                jb: function (a) {
                    a = Xc[a];
                    S.linkProgram(a);
                    a.ee = 0;
                    a.Ie = {}
                },
                ib: function (a,
                              b, c, e, f, k) {
                    S.Ee.multiDrawArraysInstancedBaseInstanceWEBGL(a, K, b >> 2, K, c >> 2, K, e >> 2, L, f >> 2, k)
                },
                hb: function (a, b, c, e, f, k, l, m) {
                    S.Ee.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, K, b >> 2, c, K, e >> 2, K, f >> 2, K, k >> 2, L, l >> 2, m)
                },
                gb: function (a, b) {
                    3317 == a && (gd = b);
                    S.pixelStorei(a, b)
                },
                fb: function (a) {
                    S.readBuffer(a)
                },
                eb: function (a, b, c, e, f, k, l) {
                    if (2 <= x.version) if (S.te) S.readPixels(a, b, c, e, f, k, l); else {
                        var m = zd(k);
                        S.readPixels(a, b, c, e, f, k, m, l >> 31 - Math.clz32(m.BYTES_PER_ELEMENT))
                    } else (l = Ad(k, f, c, e, l)) ? S.readPixels(a,
                        b, c, e, f, k, l) : R(1280)
                },
                db: function (a, b, c, e) {
                    S.renderbufferStorage(a, b, c, e)
                },
                cb: function (a, b, c, e, f) {
                    S.renderbufferStorageMultisample(a, b, c, e, f)
                },
                bb: function (a, b, c) {
                    S.samplerParameterf(bd[a], b, c)
                },
                ab: function (a, b, c) {
                    S.samplerParameteri(bd[a], b, c)
                },
                $a: function (a, b, c) {
                    S.samplerParameteri(bd[a], b, K[c >> 2])
                },
                _a: function (a, b, c, e) {
                    S.scissor(a, b, c, e)
                },
                Za: function (a, b, c, e) {
                    for (var f = "", k = 0; k < b; ++k) {
                        var l = e ? K[e + 4 * k >> 2] : -1, m = K[c + 4 * k >> 2];
                        l = m ? kb(C, m, 0 > l ? void 0 : l) : "";
                        f += l
                    }
                    S.shaderSource($c[a], f)
                },
                Ya: function (a, b,
                              c) {
                    S.stencilFunc(a, b, c)
                },
                Xa: function (a, b, c, e) {
                    S.stencilFuncSeparate(a, b, c, e)
                },
                Wa: function (a) {
                    S.stencilMask(a)
                },
                Va: function (a, b) {
                    S.stencilMaskSeparate(a, b)
                },
                Ua: function (a, b, c) {
                    S.stencilOp(a, b, c)
                },
                Ta: function (a, b, c, e) {
                    S.stencilOpSeparate(a, b, c, e)
                },
                Sa: function (a, b, c, e, f, k, l, m, q) {
                    if (2 <= x.version) if (S.Zd) S.texImage2D(a, b, c, e, f, k, l, m, q); else if (q) {
                        var w = zd(m);
                        S.texImage2D(a, b, c, e, f, k, l, m, w, q >> 31 - Math.clz32(w.BYTES_PER_ELEMENT))
                    } else S.texImage2D(a, b, c, e, f, k, l, m, null); else S.texImage2D(a, b, c, e, f, k, l, m, q ?
                        Ad(m, l, e, f, q) : null)
                },
                Ra: function (a, b, c) {
                    S.texParameterf(a, b, c)
                },
                Qa: function (a, b, c) {
                    S.texParameterf(a, b, N[c >> 2])
                },
                Pa: function (a, b, c) {
                    S.texParameteri(a, b, c)
                },
                Oa: function (a, b, c) {
                    S.texParameteri(a, b, K[c >> 2])
                },
                Na: function (a, b, c, e, f) {
                    S.texStorage2D(a, b, c, e, f)
                },
                Ma: function (a, b, c, e, f, k, l, m, q) {
                    if (2 <= x.version) if (S.Zd) S.texSubImage2D(a, b, c, e, f, k, l, m, q); else if (q) {
                        var w = zd(m);
                        S.texSubImage2D(a, b, c, e, f, k, l, m, w, q >> 31 - Math.clz32(w.BYTES_PER_ELEMENT))
                    } else S.texSubImage2D(a, b, c, e, f, k, l, m, null); else w = null, q && (w =
                        Ad(m, l, f, k, q)), S.texSubImage2D(a, b, c, e, f, k, l, m, w)
                },
                La: function (a, b) {
                    S.uniform1f(W(a), b)
                },
                Ka: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform1fv(W(a), N, c >> 2, b); else {
                        if (288 >= b) for (var e = Bd[b - 1], f = 0; f < b; ++f) e[f] = N[c + 4 * f >> 2]; else e = N.subarray(c >> 2, c + 4 * b >> 2);
                        S.uniform1fv(W(a), e)
                    }
                },
                Ja: function (a, b) {
                    S.uniform1i(W(a), b)
                },
                Ia: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform1iv(W(a), K, c >> 2, b); else {
                        if (288 >= b) for (var e = Cd[b - 1], f = 0; f < b; ++f) e[f] = K[c + 4 * f >> 2]; else e = K.subarray(c >> 2, c + 4 * b >> 2);
                        S.uniform1iv(W(a), e)
                    }
                },
                Ha: function (a,
                              b, c) {
                    S.uniform2f(W(a), b, c)
                },
                Ga: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform2fv(W(a), N, c >> 2, 2 * b); else {
                        if (144 >= b) for (var e = Bd[2 * b - 1], f = 0; f < 2 * b; f += 2) e[f] = N[c + 4 * f >> 2], e[f + 1] = N[c + (4 * f + 4) >> 2]; else e = N.subarray(c >> 2, c + 8 * b >> 2);
                        S.uniform2fv(W(a), e)
                    }
                },
                Fa: function (a, b, c) {
                    S.uniform2i(W(a), b, c)
                },
                Ea: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform2iv(W(a), K, c >> 2, 2 * b); else {
                        if (144 >= b) for (var e = Cd[2 * b - 1], f = 0; f < 2 * b; f += 2) e[f] = K[c + 4 * f >> 2], e[f + 1] = K[c + (4 * f + 4) >> 2]; else e = K.subarray(c >> 2, c + 8 * b >> 2);
                        S.uniform2iv(W(a), e)
                    }
                },
                Da: function (a,
                              b, c, e) {
                    S.uniform3f(W(a), b, c, e)
                },
                Ca: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform3fv(W(a), N, c >> 2, 3 * b); else {
                        if (96 >= b) for (var e = Bd[3 * b - 1], f = 0; f < 3 * b; f += 3) e[f] = N[c + 4 * f >> 2], e[f + 1] = N[c + (4 * f + 4) >> 2], e[f + 2] = N[c + (4 * f + 8) >> 2]; else e = N.subarray(c >> 2, c + 12 * b >> 2);
                        S.uniform3fv(W(a), e)
                    }
                },
                Ba: function (a, b, c, e) {
                    S.uniform3i(W(a), b, c, e)
                },
                Aa: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform3iv(W(a), K, c >> 2, 3 * b); else {
                        if (96 >= b) for (var e = Cd[3 * b - 1], f = 0; f < 3 * b; f += 3) e[f] = K[c + 4 * f >> 2], e[f + 1] = K[c + (4 * f + 4) >> 2], e[f + 2] = K[c + (4 * f + 8) >> 2]; else e =
                            K.subarray(c >> 2, c + 12 * b >> 2);
                        S.uniform3iv(W(a), e)
                    }
                },
                za: function (a, b, c, e, f) {
                    S.uniform4f(W(a), b, c, e, f)
                },
                ya: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform4fv(W(a), N, c >> 2, 4 * b); else {
                        if (72 >= b) {
                            var e = Bd[4 * b - 1], f = N;
                            c >>= 2;
                            for (var k = 0; k < 4 * b; k += 4) {
                                var l = c + k;
                                e[k] = f[l];
                                e[k + 1] = f[l + 1];
                                e[k + 2] = f[l + 2];
                                e[k + 3] = f[l + 3]
                            }
                        } else e = N.subarray(c >> 2, c + 16 * b >> 2);
                        S.uniform4fv(W(a), e)
                    }
                },
                xa: function (a, b, c, e, f) {
                    S.uniform4i(W(a), b, c, e, f)
                },
                wa: function (a, b, c) {
                    if (2 <= x.version) b && S.uniform4iv(W(a), K, c >> 2, 4 * b); else {
                        if (72 >= b) for (var e = Cd[4 * b -
                        1], f = 0; f < 4 * b; f += 4) e[f] = K[c + 4 * f >> 2], e[f + 1] = K[c + (4 * f + 4) >> 2], e[f + 2] = K[c + (4 * f + 8) >> 2], e[f + 3] = K[c + (4 * f + 12) >> 2]; else e = K.subarray(c >> 2, c + 16 * b >> 2);
                        S.uniform4iv(W(a), e)
                    }
                },
                va: function (a, b, c, e) {
                    if (2 <= x.version) b && S.uniformMatrix2fv(W(a), !!c, N, e >> 2, 4 * b); else {
                        if (72 >= b) for (var f = Bd[4 * b - 1], k = 0; k < 4 * b; k += 4) f[k] = N[e + 4 * k >> 2], f[k + 1] = N[e + (4 * k + 4) >> 2], f[k + 2] = N[e + (4 * k + 8) >> 2], f[k + 3] = N[e + (4 * k + 12) >> 2]; else f = N.subarray(e >> 2, e + 16 * b >> 2);
                        S.uniformMatrix2fv(W(a), !!c, f)
                    }
                },
                ua: function (a, b, c, e) {
                    if (2 <= x.version) b && S.uniformMatrix3fv(W(a),
                        !!c, N, e >> 2, 9 * b); else {
                        if (32 >= b) for (var f = Bd[9 * b - 1], k = 0; k < 9 * b; k += 9) f[k] = N[e + 4 * k >> 2], f[k + 1] = N[e + (4 * k + 4) >> 2], f[k + 2] = N[e + (4 * k + 8) >> 2], f[k + 3] = N[e + (4 * k + 12) >> 2], f[k + 4] = N[e + (4 * k + 16) >> 2], f[k + 5] = N[e + (4 * k + 20) >> 2], f[k + 6] = N[e + (4 * k + 24) >> 2], f[k + 7] = N[e + (4 * k + 28) >> 2], f[k + 8] = N[e + (4 * k + 32) >> 2]; else f = N.subarray(e >> 2, e + 36 * b >> 2);
                        S.uniformMatrix3fv(W(a), !!c, f)
                    }
                },
                ta: function (a, b, c, e) {
                    if (2 <= x.version) b && S.uniformMatrix4fv(W(a), !!c, N, e >> 2, 16 * b); else {
                        if (18 >= b) {
                            var f = Bd[16 * b - 1], k = N;
                            e >>= 2;
                            for (var l = 0; l < 16 * b; l += 16) {
                                var m = e + l;
                                f[l] =
                                    k[m];
                                f[l + 1] = k[m + 1];
                                f[l + 2] = k[m + 2];
                                f[l + 3] = k[m + 3];
                                f[l + 4] = k[m + 4];
                                f[l + 5] = k[m + 5];
                                f[l + 6] = k[m + 6];
                                f[l + 7] = k[m + 7];
                                f[l + 8] = k[m + 8];
                                f[l + 9] = k[m + 9];
                                f[l + 10] = k[m + 10];
                                f[l + 11] = k[m + 11];
                                f[l + 12] = k[m + 12];
                                f[l + 13] = k[m + 13];
                                f[l + 14] = k[m + 14];
                                f[l + 15] = k[m + 15]
                            }
                        } else f = N.subarray(e >> 2, e + 64 * b >> 2);
                        S.uniformMatrix4fv(W(a), !!c, f)
                    }
                },
                sa: function (a) {
                    a = Xc[a];
                    S.useProgram(a);
                    S.Re = a
                },
                ra: function (a, b) {
                    S.vertexAttrib1f(a, b)
                },
                qa: function (a, b) {
                    S.vertexAttrib2f(a, N[b >> 2], N[b + 4 >> 2])
                },
                pa: function (a, b) {
                    S.vertexAttrib3f(a, N[b >> 2], N[b + 4 >> 2], N[b + 8 >> 2])
                },
                oa: function (a, b) {
                    S.vertexAttrib4f(a, N[b >> 2], N[b + 4 >> 2], N[b + 8 >> 2], N[b + 12 >> 2])
                },
                na: function (a, b) {
                    S.vertexAttribDivisor(a, b)
                },
                ma: function (a, b, c, e, f) {
                    S.vertexAttribIPointer(a, b, c, e, f)
                },
                la: function (a, b, c, e, f, k) {
                    S.vertexAttribPointer(a, b, c, !!e, f, k)
                },
                ka: function (a, b, c, e) {
                    S.viewport(a, b, c, e)
                },
                aa: function (a, b, c, e) {
                    S.waitSync(cd[a], b, (c >>> 0) + 4294967296 * e)
                },
                n: Nd,
                u: Od,
                j: Pd,
                J: Qd,
                Q: Rd,
                P: Sd,
                x: Td,
                y: Ud,
                o: Vd,
                w: Wd,
                ja: Xd,
                ia: Yd,
                ha: Zd,
                $: (a, b, c, e) => Hd(a, b, c, e)
            };
            (function () {
                function a(c) {
                    G = c = c.exports;
                    Fa = G.$c;
                    La();
                    Na = G.bd;
                    Pa.unshift(G.ad);
                    Ua--;
                    r.monitorRunDependencies && r.monitorRunDependencies(Ua);
                    if (0 == Ua && (null !== Va && (clearInterval(Va), Va = null), Wa)) {
                        var e = Wa;
                        Wa = null;
                        e()
                    }
                    return c
                }

                var b = {a: $d};
                Ua++;
                r.monitorRunDependencies && r.monitorRunDependencies(Ua);
                if (r.instantiateWasm) try {
                    return r.instantiateWasm(b, a)
                } catch (c) {
                    Ca("Module.instantiateWasm callback failed with error: " + c), ba(c)
                }
                cb(b, function (c) {
                    a(c.instance)
                }).catch(ba);
                return {}
            })();
            var qc = r._free = a => (qc = r._free = G.cd)(a), wd = r._malloc = a => (wd = r._malloc = G.dd)(a),
                pc = a => (pc = G.ed)(a);
            r.__embind_initialize_bindings = () => (r.__embind_initialize_bindings = G.fd)();
            var ae = (a, b) => (ae = G.gd)(a, b), be = () => (be = G.hd)(), ce = a => (ce = G.id)(a);
            r.dynCall_viji = (a, b, c, e, f) => (r.dynCall_viji = G.kd)(a, b, c, e, f);
            r.dynCall_vijiii = (a, b, c, e, f, k, l) => (r.dynCall_vijiii = G.ld)(a, b, c, e, f, k, l);
            r.dynCall_viiiiij = (a, b, c, e, f, k, l, m) => (r.dynCall_viiiiij = G.md)(a, b, c, e, f, k, l, m);
            r.dynCall_jii = (a, b, c) => (r.dynCall_jii = G.nd)(a, b, c);
            r.dynCall_vij = (a, b, c, e) => (r.dynCall_vij = G.od)(a, b, c, e);
            r.dynCall_iiij = (a, b, c, e, f) => (r.dynCall_iiij = G.pd)(a, b, c, e, f);
            r.dynCall_iiiij = (a, b, c, e, f, k) => (r.dynCall_iiiij = G.qd)(a, b, c, e, f, k);
            r.dynCall_viij = (a, b, c, e, f) => (r.dynCall_viij = G.rd)(a, b, c, e, f);
            r.dynCall_viiij = (a, b, c, e, f, k) => (r.dynCall_viiij = G.sd)(a, b, c, e, f, k);
            r.dynCall_ji = (a, b) => (r.dynCall_ji = G.td)(a, b);
            r.dynCall_iij = (a, b, c, e) => (r.dynCall_iij = G.ud)(a, b, c, e);
            r.dynCall_jiiiiii = (a, b, c, e, f, k, l) => (r.dynCall_jiiiiii = G.vd)(a, b, c, e, f, k, l);
            r.dynCall_jiiiiji = (a, b, c, e, f, k, l, m) => (r.dynCall_jiiiiji = G.wd)(a, b, c, e, f, k, l, m);
            r.dynCall_iijj = (a, b, c, e, f, k) => (r.dynCall_iijj = G.xd)(a, b, c, e, f, k);
            r.dynCall_jiji = (a, b, c, e, f) => (r.dynCall_jiji = G.yd)(a, b, c, e, f);
            r.dynCall_viijii = (a, b, c, e, f, k, l) => (r.dynCall_viijii = G.zd)(a, b, c, e, f, k, l);
            r.dynCall_iiiiij = (a, b, c, e, f, k, l) => (r.dynCall_iiiiij = G.Ad)(a, b, c, e, f, k, l);
            r.dynCall_iiiiijj = (a, b, c, e, f, k, l, m, q) => (r.dynCall_iiiiijj = G.Bd)(a, b, c, e, f, k, l, m, q);
            r.dynCall_iiiiiijj = (a, b, c, e, f, k, l, m, q, w) => (r.dynCall_iiiiiijj = G.Cd)(a, b, c, e, f, k, l, m, q, w);

            function Wd(a, b, c, e, f) {
                var k = be();
                try {
                    Na.get(a)(b, c, e, f)
                } catch (l) {
                    ce(k);
                    if (l !== l + 0) throw l;
                    ae(1, 0)
                }
            }

            function Od(a, b, c) {
                var e = be();
                try {
                    return Na.get(a)(b, c)
                } catch (f) {
                    ce(e);
                    if (f !== f + 0) throw f;
                    ae(1, 0)
                }
            }

            function Ud(a, b, c) {
                var e = be();
                try {
                    Na.get(a)(b, c)
                } catch (f) {
                    ce(e);
                    if (f !== f + 0) throw f;
                    ae(1, 0)
                }
            }

            function Nd(a, b) {
                var c = be();
                try {
                    return Na.get(a)(b)
                } catch (e) {
                    ce(c);
                    if (e !== e + 0) throw e;
                    ae(1, 0)
                }
            }

            function Td(a, b) {
                var c = be();
                try {
                    Na.get(a)(b)
                } catch (e) {
                    ce(c);
                    if (e !== e + 0) throw e;
                    ae(1, 0)
                }
            }

            function Pd(a, b, c, e) {
                var f = be();
                try {
                    return Na.get(a)(b, c, e)
                } catch (k) {
                    ce(f);
                    if (k !== k + 0) throw k;
                    ae(1, 0)
                }
            }

            function Zd(a, b, c, e, f, k, l, m, q, w) {
                var y = be();
                try {
                    Na.get(a)(b, c, e, f, k, l, m, q, w)
                } catch (B) {
                    ce(y);
                    if (B !== B + 0) throw B;
                    ae(1, 0)
                }
            }

            function Vd(a, b, c, e) {
                var f = be();
                try {
                    Na.get(a)(b, c, e)
                } catch (k) {
                    ce(f);
                    if (k !== k + 0) throw k;
                    ae(1, 0)
                }
            }

            function Yd(a, b, c, e, f, k, l) {
                var m = be();
                try {
                    Na.get(a)(b, c, e, f, k, l)
                } catch (q) {
                    ce(m);
                    if (q !== q + 0) throw q;
                    ae(1, 0)
                }
            }

            function Qd(a, b, c, e, f) {
                var k = be();
                try {
                    return Na.get(a)(b, c, e, f)
                } catch (l) {
                    ce(k);
                    if (l !== l + 0) throw l;
                    ae(1, 0)
                }
            }

            function Rd(a, b, c, e, f, k, l) {
                var m = be();
                try {
                    return Na.get(a)(b, c, e, f, k, l)
                } catch (q) {
                    ce(m);
                    if (q !== q + 0) throw q;
                    ae(1, 0)
                }
            }

            function Xd(a, b, c, e, f, k) {
                var l = be();
                try {
                    Na.get(a)(b, c, e, f, k)
                } catch (m) {
                    ce(l);
                    if (m !== m + 0) throw m;
                    ae(1, 0)
                }
            }

            function Sd(a, b, c, e, f, k, l, m, q, w) {
                var y = be();
                try {
                    return Na.get(a)(b, c, e, f, k, l, m, q, w)
                } catch (B) {
                    ce(y);
                    if (B !== B + 0) throw B;
                    ae(1, 0)
                }
            }

            var de;
            Wa = function ee() {
                de || fe();
                de || (Wa = ee)
            };

            function fe() {
                function a() {
                    if (!de && (de = !0, r.calledRun = !0, !Ga)) {
                        eb(Pa);
                        aa(r);
                        if (r.onRuntimeInitialized) r.onRuntimeInitialized();
                        if (r.postRun) for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length;) {
                            var b = r.postRun.shift();
                            Qa.unshift(b)
                        }
                        eb(Qa)
                    }
                }

                if (!(0 < Ua)) {
                    if (r.preRun) for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length;) Ra();
                    eb(Oa);
                    0 < Ua || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function () {
                        setTimeout(function () {
                            r.setStatus("")
                        }, 1);
                        a()
                    }, 1)) : a())
                }
            }

            if (r.preInit) for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); 0 < r.preInit.length;) r.preInit.pop()();
            fe();


            return moduleArg.ready
        }

    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = CanvasKitInit;
else if (typeof define === 'function' && define['amd'])
    define([], () => CanvasKitInit);
