var skwasm = (() => {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
        function (moduleArg = {}) {

            function aa() {
                d.buffer != h.buffer && k();
                return h
            }

            function p() {
                d.buffer != h.buffer && k();
                return ca
            }

            function q() {
                d.buffer != h.buffer && k();
                return da
            }

            function t() {
                d.buffer != h.buffer && k();
                return ea
            }

            function v() {
                d.buffer != h.buffer && k();
                return fa
            }

            function ha() {
                d.buffer != h.buffer && k();
                return ia
            }

            var w = moduleArg, ja, ka;
            w.ready = new Promise((a, b) => {
                ja = a;
                ka = b
            });
            var la = Object.assign({}, w), ma = "./this.program", na = (a, b) => {
                    throw b;
                }, oa = "object" == typeof window, pa = "function" == typeof importScripts,
                x = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
                A = w.ENVIRONMENT_IS_PTHREAD || !1, C = "";

            function qa(a) {
                return w.locateFile ? w.locateFile(a, C) : C + a
            }

            var ra, sa, ta;
            if (x) {
                var fs = require("fs"), ua = require("path");
                C = pa ? ua.dirname(C) + "/" : __dirname + "/";
                ra = (b, c) => {
                    b = b.startsWith("file://") ? new URL(b) : ua.normalize(b);
                    return fs.readFileSync(b, c ? void 0 : "utf8")
                };
                ta = b => {
                    b = ra(b, !0);
                    b.buffer || (b = new Uint8Array(b));
                    return b
                };
                sa = (b, c, e, f = !0) => {
                    b = b.startsWith("file://") ? new URL(b) : ua.normalize(b);
                    fs.readFile(b, f ? void 0 : "utf8", (g, l) => {
                        g ? e(g) : c(f ? l.buffer : l)
                    })
                };
                !w.thisProgram && 1 < process.argv.length && (ma = process.argv[1].replace(/\\/g, "/"));
                process.argv.slice(2);
                na = (b, c) => {
                    process.exitCode =
                        b;
                    throw c;
                };
                w.inspect = () => "[Emscripten Module object]";
                let a;
                try {
                    a = require("worker_threads")
                } catch (b) {
                    throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'), b;
                }
                global.Worker = a.Worker
            } else if (oa || pa) pa ? C = self.location.href : "undefined" != typeof document && document.currentScript && (C = document.currentScript.src), _scriptDir && (C = _scriptDir), 0 !== C.indexOf("blob:") ? C = C.substr(0, C.replace(/[?#].*/, "").lastIndexOf("/") + 1) : C = "", x || (ra = a => {
                var b =
                    new XMLHttpRequest;
                b.open("GET", a, !1);
                b.send(null);
                return b.responseText
            }, pa && (ta = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }), sa = (a, b, c) => {
                var e = new XMLHttpRequest;
                e.open("GET", a, !0);
                e.responseType = "arraybuffer";
                e.onload = () => {
                    200 == e.status || 0 == e.status && e.response ? b(e.response) : c()
                };
                e.onerror = c;
                e.send(null)
            });
            x && "undefined" == typeof performance && (global.performance = require("perf_hooks").performance);
            var va = console.log.bind(console), wa = console.error.bind(console);
            x && (va = (...a) => fs.writeSync(1, a.join(" ") + "\n"), wa = (...a) => fs.writeSync(2, a.join(" ") + "\n"));
            var xa = w.print || va, D = w.printErr || wa;
            Object.assign(w, la);
            la = null;
            w.thisProgram && (ma = w.thisProgram);
            w.quit && (na = w.quit);
            var ya;
            w.wasmBinary && (ya = w.wasmBinary);
            var noExitRuntime = w.noExitRuntime || !0;
            "object" != typeof WebAssembly && za("no native wasm support detected");
            var d, F, Aa, Ba = !1, Ca, h, ca, Da, Ea, da, ea, fa, ia;

            function k() {
                var a = d.buffer;
                w.HEAP8 = h = new Int8Array(a);
                w.HEAP16 = Da = new Int16Array(a);
                w.HEAP32 = da = new Int32Array(a);
                w.HEAPU8 = ca = new Uint8Array(a);
                w.HEAPU16 = Ea = new Uint16Array(a);
                w.HEAPU32 = ea = new Uint32Array(a);
                w.HEAPF32 = fa = new Float32Array(a);
                w.HEAPF64 = ia = new Float64Array(a)
            }

            var Fa = w.INITIAL_MEMORY || 16777216;
            65536 <= Fa || za("INITIAL_MEMORY should be larger than STACK_SIZE, was " + Fa + "! (STACK_SIZE=65536)");
            if (A) d = w.wasmMemory; else if (w.wasmMemory) d = w.wasmMemory; else if (d = new WebAssembly.Memory({
                initial: Fa / 65536,
                maximum: 32768,
                shared: !0
            }), !(d.buffer instanceof SharedArrayBuffer)) throw D("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), x && D("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"),
                Error("bad memory");
            k();
            Fa = d.buffer.byteLength;
            var G, Ga = [], Ha = [], Ia = [], Ja = 0;

            function Ka() {
                return noExitRuntime || 0 < Ja
            }

            var H = 0, La = null, Ma = null;

            function Na() {
                H++;
                w.monitorRunDependencies && w.monitorRunDependencies(H)
            }

            function Oa() {
                H--;
                w.monitorRunDependencies && w.monitorRunDependencies(H);
                if (0 == H && (null !== La && (clearInterval(La), La = null), Ma)) {
                    var a = Ma;
                    Ma = null;
                    a()
                }
            }

            function za(a) {
                if (w.onAbort) w.onAbort(a);
                a = "Aborted(" + a + ")";
                D(a);
                Ba = !0;
                Ca = 1;
                a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                ka(a);
                throw a;
            }

            function Pa(a) {
                return a.startsWith("data:application/octet-stream;base64,")
            }

            var Qa;
            Qa = "skwasm.wasm";
            Pa(Qa) || (Qa = qa(Qa));

            function Ra(a) {
                if (a == Qa && ya) return new Uint8Array(ya);
                if (ta) return ta(a);
                throw "both async and sync fetching of the wasm failed";
            }

            function Sa(a) {
                if (!ya && (oa || pa)) {
                    if ("function" == typeof fetch && !a.startsWith("file://")) return fetch(a, {credentials: "same-origin"}).then(b => {
                        if (!b.ok) throw "failed to load wasm binary file at '" + a + "'";
                        return b.arrayBuffer()
                    }).catch(() => Ra(a));
                    if (sa) return new Promise((b, c) => {
                        sa(a, e => b(new Uint8Array(e)), c)
                    })
                }
                return Promise.resolve().then(() => Ra(a))
            }

            function Ta(a, b, c) {
                return Sa(a).then(e => WebAssembly.instantiate(e, b)).then(e => e).then(c, e => {
                    D("failed to asynchronously prepare wasm: " + e);
                    za(e)
                })
            }

            function Ua(a, b) {
                var c = Qa;
                return ya || "function" != typeof WebAssembly.instantiateStreaming || Pa(c) || c.startsWith("file://") || x || "function" != typeof fetch ? Ta(c, a, b) : fetch(c, {credentials: "same-origin"}).then(e => WebAssembly.instantiateStreaming(e, a).then(b, function (f) {
                    D("wasm streaming compile failed: " + f);
                    D("falling back to ArrayBuffer instantiation");
                    return Ta(c, a, b)
                }))
            }

            function Va(a) {
                this.name = "ExitStatus";
                this.message = `Program terminated with exit(${a})`;
                this.status = a
            }

            function Wa(a) {
                a.terminate();
                a.onmessage = () => {
                }
            }

            function Xa(a) {
                (a = I.g[a]) || za();
                I.xa(a)
            }

            function Ya(a) {
                var b = I.ma();
                if (!b) return 6;
                I.u.push(b);
                I.g[a.m] = b;
                b.m = a.m;
                var c = {cmd: "run", start_routine: a.ya, arg: a.ka, pthread_ptr: a.m};
                c.D = a.D;
                c.S = a.S;
                x && b.unref();
                b.postMessage(c, a.Ea);
                return 0
            }

            var Za = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, $a = (a, b, c) => {
                    var e = b + c;
                    for (c = b; a[c] && !(c >= e);) ++c;
                    if (16 < c - b && a.buffer && Za) return Za.decode(a.slice(b, c));
                    for (e = ""; b < c;) {
                        var f = a[b++];
                        if (f & 128) {
                            var g = a[b++] & 63;
                            if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | g); else {
                                var l = a[b++] & 63;
                                f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | l : (f & 7) << 18 | g << 12 | l << 6 | a[b++] & 63;
                                65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                            }
                        } else e += String.fromCharCode(f)
                    }
                    return e
                },
                J = (a, b) => a ? $a(p(), a, b) : "";

            function ab(a) {
                if (A) return K(1, 1, a);
                Ca = a;
                if (!Ka()) {
                    I.za();
                    if (w.onExit) w.onExit(a);
                    Ba = !0
                }
                na(a, new Va(a))
            }

            var cb = a => {
                Ca = a;
                if (A) throw bb(a), "unwind";
                ab(a)
            }, I = {
                o: [], u: [], ha: [], g: {}, R: function () {
                    A ? I.ra() : I.qa()
                }, qa: function () {
                    for (var a = 1; a--;) I.X();
                    Ga.unshift(() => {
                        Na();
                        I.ta(() => Oa())
                    })
                }, ra: function () {
                    I.receiveObjectTransfer = I.wa;
                    I.threadInitTLS = I.ga;
                    I.setExitStatus = I.fa;
                    noExitRuntime = !1
                }, fa: function (a) {
                    Ca = a
                }, La: ["$terminateWorker"], za: function () {
                    for (var a of I.u) Wa(a);
                    for (a of I.o) Wa(a);
                    I.o = [];
                    I.u = [];
                    I.g = []
                }, xa: function (a) {
                    var b = a.m;
                    delete I.g[b];
                    I.o.push(a);
                    I.u.splice(I.u.indexOf(a), 1);
                    a.m = 0;
                    db(b)
                }, wa: function (a) {
                    "undefined" !=
                    typeof eb && (Object.assign(L, a.S), !w.canvas && a.D && L[a.D] && (w.canvas = L[a.D].F, w.canvas.id = a.D))
                }, ga: function () {
                    I.ha.forEach(a => a())
                }, ba: a => new Promise(b => {
                    a.onmessage = g => {
                        g = g.data;
                        var l = g.cmd;
                        if (g.targetThread && g.targetThread != fb()) {
                            var n = I.g[g.Ka];
                            n ? n.postMessage(g, g.transferList) : D('Internal error! Worker sent a message "' + l + '" to target pthread ' + g.targetThread + ", but that thread no longer exists!")
                        } else if ("checkMailbox" === l) gb(); else if ("spawnThread" === l) Ya(g); else if ("cleanupThread" === l) Xa(g.thread);
                        else if ("killThread" === l) g = g.thread, l = I.g[g], delete I.g[g], Wa(l), db(g), I.u.splice(I.u.indexOf(l), 1), l.m = 0; else if ("cancelThread" === l) I.g[g.thread].postMessage({cmd: "cancel"}); else if ("loaded" === l) a.loaded = !0, x && !a.m && a.unref(), b(a); else if ("alert" === l) alert("Thread " + g.threadId + ": " + g.text); else if ("setimmediate" === g.target) a.postMessage(g); else if ("callHandler" === l) w[g.handler](...g.args); else l && D("worker sent an unknown command " + l)
                    };
                    a.onerror = g => {
                        D("worker sent an error! " + g.filename + ":" + g.lineno +
                            ": " + g.message);
                        throw g;
                    };
                    x && (a.on("message", function (g) {
                        a.onmessage({data: g})
                    }), a.on("error", function (g) {
                        a.onerror(g)
                    }));
                    var c = [], e = ["onExit", "onAbort", "print", "printErr"], f;
                    for (f of e) w.hasOwnProperty(f) && c.push(f);
                    a.postMessage({
                        cmd: "load",
                        handlers: c,
                        urlOrBlob: w.mainScriptUrlOrBlob || _scriptDir,
                        wasmMemory: d,
                        wasmModule: Aa
                    })
                }), ta: function (a) {
                    if (A) return a();
                    Promise.all(I.o.map(I.ba)).then(a)
                }, X: function () {
                    var a = qa("skwasm.worker.js");
                    a = new Worker(a);
                    I.o.push(a)
                }, ma: function () {
                    0 == I.o.length && (I.X(),
                        I.ba(I.o[0]));
                    return I.o.pop()
                }
            };
            w.PThread = I;
            var hb = a => {
                for (; 0 < a.length;) a.shift()(w)
            };
            w.establishStackSpace = function () {
                var a = fb(), b = q()[a + 52 >> 2];
                a = q()[a + 56 >> 2];
                ib(b, b - a);
                M(b)
            };

            function bb(a) {
                if (A) return K(2, 0, a);
                cb(a)
            }

            w.invokeEntryPoint = function (a, b) {
                a = G.get(a)(b);
                Ka() ? I.fa(a) : jb(a)
            };

            function kb(a) {
                this.C = a - 24;
                this.ua = function (b) {
                    t()[this.C + 4 >> 2] = b
                };
                this.sa = function (b) {
                    t()[this.C + 8 >> 2] = b
                };
                this.R = function (b, c) {
                    this.na();
                    this.ua(b);
                    this.sa(c)
                };
                this.na = function () {
                    t()[this.C + 16 >> 2] = 0
                }
            }

            var lb = 0, mb = 0;

            function nb(a, b, c, e) {
                return A ? K(3, 1, a, b, c, e) : ob(a, b, c, e)
            }

            function ob(a, b, c, e) {
                if ("undefined" == typeof SharedArrayBuffer) return D("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
                var f = [], g = 0, l = b ? t()[b + 40 >> 2] : 0;
                4294967295 == l ? l = "#canvas" : l && (l = J(l).trim());
                l && (l = l.split(","));
                var n = {}, r = w.canvas ? w.canvas.id : "", u;
                for (u in l) {
                    var y = l[u].trim();
                    try {
                        if ("#canvas" == y) {
                            if (!w.canvas) {
                                D('pthread_create: could not find canvas with ID "' + y + '" to transfer to thread!');
                                g = 28;
                                break
                            }
                            y = w.canvas.id
                        }
                        if (L[y]) {
                            var V = L[y];
                            L[y] = null;
                            w.canvas instanceof
                            OffscreenCanvas && y === w.canvas.id && (w.canvas = null)
                        } else if (!A) {
                            var E = w.canvas && w.canvas.id === y ? w.canvas : document.querySelector(y);
                            if (!E) {
                                D('pthread_create: could not find canvas with ID "' + y + '" to transfer to thread!');
                                g = 28;
                                break
                            }
                            if (E.Y) {
                                D('pthread_create: cannot transfer canvas with ID "' + y + '" to thread, since the current thread does not have control over it!');
                                g = 63;
                                break
                            }
                            if (E.transferControlToOffscreen) E.h || (E.h = pb(12), q()[E.h >> 2] = E.width, q()[E.h + 4 >> 2] = E.height, q()[E.h + 8 >> 2] = 0), V = {
                                F: E.transferControlToOffscreen(),
                                h: E.h, id: E.id
                            }, E.Y = !0; else return D('pthread_create: cannot transfer control of canvas "' + y + '" to pthread, because current browser does not support OffscreenCanvas!'), D("pthread_create: Build with -sOFFSCREEN_FRAMEBUFFER to enable fallback proxying of GL commands from pthread to main thread."), 52
                        }
                        V && (f.push(V.F), n[V.id] = V)
                    } catch (m) {
                        return D('pthread_create: failed to transfer control of canvas "' + y + '" to OffscreenCanvas! Error: ' + m), 28
                    }
                }
                if (A && (0 === f.length || g)) return nb(a, b, c, e);
                if (g) return g;
                for (E of Object.values(n)) q()[E.h +
                8 >> 2] = a;
                a = {ya: c, m: a, ka: e, D: r, S: n, Ea: f};
                return A ? (a.Ga = "spawnThread", postMessage(a, f), 0) : Ya(a)
            }

            function qb(a, b, c) {
                return A ? K(4, 1, a, b, c) : 0
            }

            function rb(a, b) {
                if (A) return K(5, 1, a, b)
            }

            function sb(a, b, c) {
                return A ? K(6, 1, a, b, c) : 0
            }

            function tb(a, b, c, e) {
                if (A) return K(7, 1, a, b, c, e)
            }

            var ub = a => {
                if (!Ba) try {
                    if (a(), !Ka()) try {
                        A ? jb(Ca) : cb(Ca)
                    } catch (b) {
                        b instanceof Va || "unwind" == b || na(1, b)
                    }
                } catch (b) {
                    b instanceof Va || "unwind" == b || na(1, b)
                }
            };

            function vb(a) {
                "function" === typeof Atomics.Fa && (Atomics.Fa(q(), a >> 2, a).value.then(gb), a += 128, Atomics.store(q(), a >> 2, 1))
            }

            w.__emscripten_thread_mailbox_await = vb;

            function gb() {
                var a = fb();
                a && (vb(a), ub(() => wb()))
            }

            w.checkMailbox = gb;
            var xb = a => {
                var b = N();
                a = a();
                M(b);
                return a
            }, yb = a => {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var e = a.charCodeAt(c);
                    127 >= e ? b++ : 2047 >= e ? b += 2 : 55296 <= e && 57343 >= e ? (b += 4, ++c) : b += 3
                }
                return b
            }, zb = (a, b, c, e) => {
                if (!(0 < e)) return 0;
                var f = c;
                e = c + e - 1;
                for (var g = 0; g < a.length; ++g) {
                    var l = a.charCodeAt(g);
                    if (55296 <= l && 57343 >= l) {
                        var n = a.charCodeAt(++g);
                        l = 65536 + ((l & 1023) << 10) | n & 1023
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
            }, Ab = a => {
                var b = yb(a) + 1, c = pb(b);
                c && zb(a, p(), c, b);
                return c
            };

            function Bb(a, b, c, e) {
                b = b ? J(b) : "";
                xb(function () {
                    var f = Cb(12), g = 0;
                    b && (g = Ab(b));
                    q()[f >> 2] = g;
                    q()[f + 4 >> 2] = c;
                    q()[f + 8 >> 2] = e;
                    Db(a, 654311424, 0, g, f)
                })
            }

            function Eb(a) {
                var b = a.getExtension("ANGLE_instanced_arrays");
                b && (a.vertexAttribDivisor = function (c, e) {
                    b.vertexAttribDivisorANGLE(c, e)
                }, a.drawArraysInstanced = function (c, e, f, g) {
                    b.drawArraysInstancedANGLE(c, e, f, g)
                }, a.drawElementsInstanced = function (c, e, f, g, l) {
                    b.drawElementsInstancedANGLE(c, e, f, g, l)
                })
            }

            function Fb(a) {
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

            function Gb(a) {
                var b = a.getExtension("WEBGL_draw_buffers");
                b && (a.drawBuffers = function (c, e) {
                    b.drawBuffersWEBGL(c, e)
                })
            }

            function Hb(a) {
                a.Z = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance")
            }

            function Ib(a) {
                a.ea = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance")
            }

            function Jb(a) {
                a.Ja = a.getExtension("WEBGL_multi_draw")
            }

            var Kb = 1, Lb = [], O = [], Mb = [], Nb = [], P = [], Q = [], Ob = [], Pb = {}, L = {}, R = [], Qb = [],
                Rb = {}, Sb = {}, Tb = 4;

            function S(a) {
                Ub || (Ub = a)
            }

            function Vb(a) {
                for (var b = Kb++, c = a.length; c < b; c++) a[c] = null;
                return b
            }

            function Wb(a) {
                var b = {
                    da: 2,
                    alpha: !0,
                    depth: !0,
                    stencil: !0,
                    antialias: !1,
                    premultipliedAlpha: !0,
                    preserveDrawingBuffer: !1,
                    powerPreference: "default",
                    failIfMajorPerformanceCaveat: !1,
                    aa: !0
                };
                a.C || (a.C = a.getContext, a.getContext = function (e, f) {
                    f = a.C(e, f);
                    return "webgl" == e == f instanceof WebGLRenderingContext ? f : null
                });
                var c = 1 < b.da ? a.getContext("webgl2", b) : a.getContext("webgl", b);
                return c ? Xb(c, b) : 0
            }

            function Xb(a, b) {
                var c = pb(8);
                q()[c + 4 >> 2] = fb();
                var e = {handle: c, attributes: b, version: b.da, s: a};
                a.canvas && (a.canvas.H = e);
                Pb[c] = e;
                ("undefined" == typeof b.aa || b.aa) && Yb(e);
                return c
            }

            function Yb(a) {
                a || (a = T);
                if (!a.pa) {
                    a.pa = !0;
                    var b = a.s;
                    Eb(b);
                    Fb(b);
                    Gb(b);
                    Hb(b);
                    Ib(b);
                    2 <= a.version && (b.$ = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                    if (2 > a.version || !b.$) b.$ = b.getExtension("EXT_disjoint_timer_query");
                    Jb(b);
                    (b.getSupportedExtensions() || []).forEach(function (c) {
                        c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                    })
                }
            }

            var eb = {}, Ub, T;

            function Zb(a) {
                a = 2 < a ? J(a) : a;
                return L[a.substr(1)] || "canvas" == a && Object.keys(L)[0] || "undefined" != typeof document && document.querySelector(a)
            }

            function $b(a, b, c) {
                var e = Zb(a);
                if (!e) return -4;
                e.h && (q()[e.h >> 2] = b, q()[e.h + 4 >> 2] = c);
                if (e.F || !e.Y) e.F && (e = e.F), a = !1, e.H && e.H.s && (a = e.H.s.getParameter(2978), a = 0 === a[0] && 0 === a[1] && a[2] === e.width && a[3] === e.height), e.width = b, e.height = c, a && e.H.s.viewport(0, 0, b, c); else return e.h ? (e = q()[e.h + 8 >> 2], Bb(e, a, b, c), 1) : -4;
                return 0
            }

            function ac(a, b, c) {
                return A ? K(8, 1, a, b, c) : $b(a, b, c)
            }

            function bc(a, b, c, e, f, g, l, n) {
                return A ? K(9, 1, a, b, c, e, f, g, l, n) : -52
            }

            function cc(a, b, c, e, f, g, l) {
                if (A) return K(10, 1, a, b, c, e, f, g, l)
            }

            function dc(a, b) {
                U.bindFramebuffer(a, Mb[b])
            }

            function ec(a) {
                U.clear(a)
            }

            function fc(a, b, c, e) {
                U.clearColor(a, b, c, e)
            }

            function gc(a) {
                U.clearStencil(a)
            }

            function hc(a, b, c) {
                if (b) {
                    var e = void 0;
                    switch (a) {
                        case 36346:
                            e = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && S(1280);
                            return;
                        case 34814:
                        case 36345:
                            e = 0;
                            break;
                        case 34466:
                            var f = U.getParameter(34467);
                            e = f ? f.length : 0;
                            break;
                        case 33309:
                            if (2 > T.version) {
                                S(1282);
                                return
                            }
                            e = 2 * (U.getSupportedExtensions() || []).length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > T.version) {
                                S(1280);
                                return
                            }
                            e = 33307 == a ? 3 : 0
                    }
                    if (void 0 === e) switch (f = U.getParameter(a), typeof f) {
                        case "number":
                            e = f;
                            break;
                        case "boolean":
                            e = f ? 1 : 0;
                            break;
                        case "string":
                            S(1280);
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
                                    S(1280);
                                    return
                            } else {
                                if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                    for (a = 0; a < f.length; ++a) switch (c) {
                                        case 0:
                                            q()[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 2:
                                            v()[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 4:
                                            aa()[b + a >> 0] = f[a] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    e = f.name |
                                        0
                                } catch (g) {
                                    S(1280);
                                    D("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + g + ")");
                                    return
                                }
                            }
                            break;
                        default:
                            S(1280);
                            D("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + f + " of type " + typeof f + "!");
                            return
                    }
                    switch (c) {
                        case 1:
                            c = e;
                            t()[b >> 2] = c;
                            t()[b + 4 >> 2] = (c - t()[b >> 2]) / 4294967296;
                            break;
                        case 0:
                            q()[b >> 2] = e;
                            break;
                        case 2:
                            v()[b >> 2] = e;
                            break;
                        case 4:
                            aa()[b >> 0] = e ? 1 : 0
                    }
                } else S(1281)
            }

            function ic(a, b) {
                hc(a, b, 0)
            }

            function K(a, b) {
                var c = arguments.length - 2, e = arguments;
                return xb(() => {
                    for (var f = Cb(8 * c), g = f >> 3, l = 0; l < c; l++) {
                        var n = e[2 + l];
                        ha()[g + l] = n
                    }
                    return jc(a, c, f, b)
                })
            }

            var kc = [], lc = {}, nc = () => {
                if (!mc) {
                    var a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: ma || "./this.program"
                    }, b;
                    for (b in lc) void 0 === lc[b] ? delete a[b] : a[b] = lc[b];
                    var c = [];
                    for (b in a) c.push(`${b}=${a[b]}`);
                    mc = c
                }
                return mc
            }, mc;

            function oc(a, b) {
                if (A) return K(11, 1, a, b);
                var c = 0;
                nc().forEach(function (e, f) {
                    var g = b + c;
                    f = t()[a + 4 * f >> 2] = g;
                    for (g = 0; g < e.length; ++g) aa()[f++ >> 0] = e.charCodeAt(g);
                    aa()[f >> 0] = 0;
                    c += e.length + 1
                });
                return 0
            }

            function pc(a, b) {
                if (A) return K(12, 1, a, b);
                var c = nc();
                t()[a >> 2] = c.length;
                var e = 0;
                c.forEach(function (f) {
                    e += f.length + 1
                });
                t()[b >> 2] = e;
                return 0
            }

            function qc(a) {
                return A ? K(13, 1, a) : 52
            }

            function rc(a, b, c, e, f, g) {
                return A ? K(14, 1, a, b, c, e, f, g) : 52
            }

            function sc(a, b, c, e) {
                return A ? K(15, 1, a, b, c, e) : 52
            }

            function tc(a, b, c, e, f) {
                return A ? K(16, 1, a, b, c, e, f) : 70
            }

            var uc = [null, [], []];

            function vc(a, b, c, e) {
                if (A) return K(17, 1, a, b, c, e);
                for (var f = 0, g = 0; g < c; g++) {
                    var l = t()[b >> 2], n = t()[b + 4 >> 2];
                    b += 8;
                    for (var r = 0; r < n; r++) {
                        var u = p()[l + r], y = uc[a];
                        0 === u || 10 === u ? ((1 === a ? xa : D)($a(y, 0)), y.length = 0) : y.push(u)
                    }
                    f += n
                }
                t()[e >> 2] = f;
                return 0
            }

            function wc(a) {
                U.bindVertexArray(Ob[a])
            }

            function xc(a, b) {
                for (var c = 0; c < a; c++) {
                    var e = q()[b + 4 * c >> 2];
                    U.deleteVertexArray(Ob[e]);
                    Ob[e] = null
                }
            }

            var yc = [];

            function zc(a, b, c, e) {
                U.drawElements(a, b, c, e)
            }

            function Ac(a, b, c, e) {
                for (var f = 0; f < a; f++) {
                    var g = U[c](), l = g && Vb(e);
                    g ? (g.name = l, e[l] = g) : S(1282);
                    q()[b + 4 * f >> 2] = l
                }
            }

            function Bc(a, b) {
                Ac(a, b, "createVertexArray", Ob)
            }

            function Cc(a) {
                return "]" == a.slice(-1) && a.lastIndexOf("[")
            }

            function Dc(a) {
                a -= 5120;
                0 == a ? a = aa() : 1 == a ? a = p() : 2 == a ? (d.buffer != h.buffer && k(), a = Da) : 4 == a ? a = q() : 6 == a ? a = v() : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? a = t() : (d.buffer != h.buffer && k(), a = Ea);
                return a
            }

            function Ec(a, b, c, e, f) {
                a = Dc(a);
                var g = 31 - Math.clz32(a.BYTES_PER_ELEMENT), l = Tb;
                return a.subarray(f >> g, f + e * (c * ({
                    5: 3,
                    6: 4,
                    8: 2,
                    29502: 3,
                    29504: 4,
                    26917: 2,
                    26918: 2,
                    29846: 3,
                    29847: 4
                }[b - 6402] || 1) * (1 << g) + l - 1 & -l) >> g)
            }

            function W(a) {
                var b = U.la;
                if (b) {
                    var c = b.G[a];
                    "number" == typeof c && (b.G[a] = c = U.getUniformLocation(b, b.ia[a] + (0 < c ? "[" + c + "]" : "")));
                    return c
                }
                S(1282)
            }

            var X = [], Fc = [];

            function Gc() {
            }

            function Hc() {
            }

            function Jc() {
            }

            function Kc() {
            }

            function Lc() {
            }

            function Mc() {
            }

            function Nc() {
            }

            function Oc() {
            }

            function Pc() {
            }

            var Qc = a => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
                Rc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                Sc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function Tc(a) {
                var b = Array(yb(a) + 1);
                zb(a, b, 0, b.length);
                return b
            }

            var Uc = (a, b) => {
                aa().set(a, b)
            }, Vc = (a, b, c, e) => {
                function f(m, z, B) {
                    for (m = "number" == typeof m ? m.toString() : m || ""; m.length < z;) m = B[0] + m;
                    return m
                }

                function g(m, z) {
                    return f(m, z, "0")
                }

                function l(m, z) {
                    function B(Ic) {
                        return 0 > Ic ? -1 : 0 < Ic ? 1 : 0
                    }

                    var ba;
                    0 === (ba = B(m.getFullYear() - z.getFullYear())) && 0 === (ba = B(m.getMonth() - z.getMonth())) && (ba = B(m.getDate() - z.getDate()));
                    return ba
                }

                function n(m) {
                    switch (m.getDay()) {
                        case 0:
                            return new Date(m.getFullYear() - 1, 11, 29);
                        case 1:
                            return m;
                        case 2:
                            return new Date(m.getFullYear(), 0, 3);
                        case 3:
                            return new Date(m.getFullYear(),
                                0, 2);
                        case 4:
                            return new Date(m.getFullYear(), 0, 1);
                        case 5:
                            return new Date(m.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(m.getFullYear() - 1, 11, 30)
                    }
                }

                function r(m) {
                    var z = m.v;
                    for (m = new Date((new Date(m.A + 1900, 0, 1)).getTime()); 0 < z;) {
                        var B = m.getMonth(), ba = (Qc(m.getFullYear()) ? Rc : Sc)[B];
                        if (z > ba - m.getDate()) z -= ba - m.getDate() + 1, m.setDate(1), 11 > B ? m.setMonth(B + 1) : (m.setMonth(0), m.setFullYear(m.getFullYear() + 1)); else {
                            m.setDate(m.getDate() + z);
                            break
                        }
                    }
                    B = new Date(m.getFullYear() + 1, 0, 4);
                    z = n(new Date(m.getFullYear(),
                        0, 4));
                    B = n(B);
                    return 0 >= l(z, m) ? 0 >= l(B, m) ? m.getFullYear() + 1 : m.getFullYear() : m.getFullYear() - 1
                }

                var u = q()[e + 40 >> 2];
                e = {
                    Ca: q()[e >> 2],
                    Ba: q()[e + 4 >> 2],
                    M: q()[e + 8 >> 2],
                    V: q()[e + 12 >> 2],
                    N: q()[e + 16 >> 2],
                    A: q()[e + 20 >> 2],
                    l: q()[e + 24 >> 2],
                    v: q()[e + 28 >> 2],
                    Ma: q()[e + 32 >> 2],
                    Aa: q()[e + 36 >> 2],
                    Da: u ? J(u) : ""
                };
                c = J(c);
                u = {
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
                for (var y in u) c = c.replace(new RegExp(y, "g"), u[y]);
                var V = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    E = "January February March April May June July August September October November December".split(" ");
                u = {
                    "%a": m => V[m.l].substring(0, 3),
                    "%A": m => V[m.l],
                    "%b": m => E[m.N].substring(0, 3),
                    "%B": m => E[m.N],
                    "%C": m => g((m.A + 1900) / 100 |
                        0, 2),
                    "%d": m => g(m.V, 2),
                    "%e": m => f(m.V, 2, " "),
                    "%g": m => r(m).toString().substring(2),
                    "%G": m => r(m),
                    "%H": m => g(m.M, 2),
                    "%I": m => {
                        m = m.M;
                        0 == m ? m = 12 : 12 < m && (m -= 12);
                        return g(m, 2)
                    },
                    "%j": m => {
                        for (var z = 0, B = 0; B <= m.N - 1; z += (Qc(m.A + 1900) ? Rc : Sc)[B++]) ;
                        return g(m.V + z, 3)
                    },
                    "%m": m => g(m.N + 1, 2),
                    "%M": m => g(m.Ba, 2),
                    "%n": () => "\n",
                    "%p": m => 0 <= m.M && 12 > m.M ? "AM" : "PM",
                    "%S": m => g(m.Ca, 2),
                    "%t": () => "\t",
                    "%u": m => m.l || 7,
                    "%U": m => g(Math.floor((m.v + 7 - m.l) / 7), 2),
                    "%V": m => {
                        var z = Math.floor((m.v + 7 - (m.l + 6) % 7) / 7);
                        2 >= (m.l + 371 - m.v - 2) % 7 && z++;
                        if (z) 53 == z &&
                        (B = (m.l + 371 - m.v) % 7, 4 == B || 3 == B && Qc(m.A) || (z = 1)); else {
                            z = 52;
                            var B = (m.l + 7 - m.v - 1) % 7;
                            (4 == B || 5 == B && Qc(m.A % 400 - 1)) && z++
                        }
                        return g(z, 2)
                    },
                    "%w": m => m.l,
                    "%W": m => g(Math.floor((m.v + 7 - (m.l + 6) % 7) / 7), 2),
                    "%y": m => (m.A + 1900).toString().substring(2),
                    "%Y": m => m.A + 1900,
                    "%z": m => {
                        m = m.Aa;
                        var z = 0 <= m;
                        m = Math.abs(m) / 60;
                        return (z ? "+" : "-") + String("0000" + (m / 60 * 100 + m % 60)).slice(-4)
                    },
                    "%Z": m => m.Da,
                    "%%": () => "%"
                };
                c = c.replace(/%%/g, "\x00\x00");
                for (y in u) c.includes(y) && (c = c.replace(new RegExp(y, "g"), u[y](e)));
                c = c.replace(/\0\0/g, "%");
                y = Tc(c);
                if (y.length > b) return 0;
                Uc(y, a);
                return y.length - 1
            }, Wc = void 0, Xc = [];
            I.R();
            for (var U, Y = 0; 32 > Y; ++Y) yc.push(Array(Y));
            var Yc = new Float32Array(288);
            for (Y = 0; 288 > Y; ++Y) X[Y] = Yc.subarray(0, Y + 1);
            var Zc = new Int32Array(288);
            for (Y = 0; 288 > Y; ++Y) Fc[Y] = Zc.subarray(0, Y + 1);
            (function () {
                const a = new Map, b = new Map;
                Pc = function (c, e, f) {
                    I.g[c].postMessage({L: "setAssociatedObject", T: e, object: f}, [f])
                };
                Mc = function (c) {
                    return b.get(c)
                };
                Nc = function (c) {
                    function e({data: f}) {
                        var g = f.L;
                        if (g) switch (g) {
                            case "renderPicture":
                                $c(f.U, f.va, f.O);
                                break;
                            case "onRenderComplete":
                                ad(f.U, f.O, f.oa);
                                break;
                            case "setAssociatedObject":
                                b.set(f.T, f.object);
                                break;
                            case "disposeAssociatedObject":
                                f = f.T;
                                g = b.get(f);
                                g.close && g.close();
                                b.delete(f);
                                break;
                            default:
                                console.warn(`unrecognized skwasm message: ${g}`)
                        }
                    }

                    c ? I.g[c].addEventListener("message", e) : addEventListener("message", e)
                };
                Kc = function (c, e, f, g) {
                    I.g[c].postMessage({L: "renderPicture", U: e, va: f, O: g})
                };
                Jc = function (c, e) {
                    c = new OffscreenCanvas(c, e);
                    e = Wb(c);
                    a.set(e, c);
                    return e
                };
                Oc = function (c, e, f) {
                    c = a.get(c);
                    c.width = e;
                    c.height = f
                };
                Gc = async function (c, e, f, g, l) {
                    e = a.get(e);
                    g = await createImageBitmap(e, 0, 0, g, l);
                    postMessage({L: "onRenderComplete", U: c, O: f, oa: g}, [g])
                };
                Hc = function (c, e, f) {
                    const g = T.s, l = g.createTexture();
                    g.bindTexture(g.TEXTURE_2D, l);
                    g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                        !0);
                    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, e, f, 0, g.RGBA, g.UNSIGNED_BYTE, c);
                    g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
                    g.bindTexture(g.TEXTURE_2D, null);
                    c = Vb(P);
                    P[c] = l;
                    return c
                };
                Lc = function (c, e) {
                    I.g[c].postMessage({L: "disposeAssociatedObject", T: e})
                }
            })();
            var bd = [null, ab, bb, nb, qb, rb, sb, tb, ac, bc, cc, oc, pc, qc, rc, sc, tc, vc], od = {
                __cxa_throw: function (a, b, c) {
                    (new kb(a)).R(b, c);
                    lb = a;
                    mb++;
                    throw lb;
                },
                __emscripten_init_main_thread_js: function (a) {
                    cd(a, !pa, 1, !oa, 65536, !1);
                    I.ga()
                },
                __emscripten_thread_cleanup: function (a) {
                    A ? postMessage({cmd: "cleanupThread", thread: a}) : Xa(a)
                },
                __pthread_create_js: ob,
                __syscall_fcntl64: qb,
                __syscall_fstat64: rb,
                __syscall_ioctl: sb,
                __syscall_openat: tb,
                _emscripten_get_now_is_monotonic: () => !0,
                _emscripten_notify_mailbox_postmessage: function (a,
                                                                  b) {
                    a == b ? setTimeout(() => gb()) : A ? postMessage({
                        targetThread: a,
                        cmd: "checkMailbox"
                    }) : (a = I.g[a]) && a.postMessage({cmd: "checkMailbox"})
                },
                _emscripten_set_offscreencanvas_size: function (a, b, c) {
                    return Zb(a) ? $b(a, b, c) : ac(a, b, c)
                },
                _emscripten_thread_mailbox_await: vb,
                _emscripten_thread_set_strongref: function (a) {
                    x && I.g[a].ref()
                },
                _emscripten_throw_longjmp: () => {
                    throw Infinity;
                },
                _mmap_js: bc,
                _munmap_js: cc,
                abort: () => {
                    za("")
                },
                emscripten_check_blocking_allowed: function () {
                },
                emscripten_exit_with_live_runtime: () => {
                    Ja += 1;
                    throw "unwind";
                },
                emscripten_get_now: () => performance.timeOrigin + performance.now(),
                emscripten_glBindFramebuffer: dc,
                emscripten_glClear: ec,
                emscripten_glClearColor: fc,
                emscripten_glClearStencil: gc,
                emscripten_glGetIntegerv: ic,
                emscripten_receive_on_main_thread_js: function (a, b, c, e) {
                    I.Ia = b;
                    kc.length = c;
                    b = e >> 3;
                    for (e = 0; e < c; e++) kc[e] = ha()[b + e];
                    return bd[a].apply(null, kc)
                },
                emscripten_resize_heap: a => {
                    var b = p().length;
                    a >>>= 0;
                    if (a <= b || 2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var e = b * (1 + .2 / c);
                        e = Math.min(e, a + 100663296);
                        var f = Math;
                        e = Math.max(a, e);
                        a:{
                            f = f.min.call(f, 2147483648, e + (65536 - e % 65536) % 65536) - d.buffer.byteLength + 65535 >>> 16;
                            try {
                                d.grow(f);
                                k();
                                var g = 1;
                                break a
                            } catch (l) {
                            }
                            g = void 0
                        }
                        if (g) return !0
                    }
                    return !1
                },
                emscripten_webgl_enable_extension: function (a, b) {
                    a = Pb[a];
                    b = J(b);
                    b.startsWith("GL_") && (b = b.substr(3));
                    "ANGLE_instanced_arrays" == b && Eb(U);
                    "OES_vertex_array_object" == b && Fb(U);
                    "WEBGL_draw_buffers" == b && Gb(U);
                    "WEBGL_draw_instanced_base_vertex_base_instance" == b && Hb(U);
                    "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && Ib(U);
                    "WEBGL_multi_draw" == b && Jb(U);
                    return !!a.s.getExtension(b)
                },
                emscripten_webgl_get_current_context: function () {
                    return T ? T.handle : 0
                },
                emscripten_webgl_make_context_current: function (a) {
                    T = Pb[a];
                    w.Ha = U = T && T.s;
                    return !a || U ? 0 : -5
                },
                environ_get: oc,
                environ_sizes_get: pc,
                exit: cb,
                fd_close: qc,
                fd_pread: rc,
                fd_read: sc,
                fd_seek: tc,
                fd_write: vc,
                glActiveTexture: function (a) {
                    U.activeTexture(a)
                },
                glAttachShader: function (a, b) {
                    U.attachShader(O[a], Q[b])
                },
                glBindAttribLocation: function (a, b, c) {
                    U.bindAttribLocation(O[a], b, J(c))
                },
                glBindBuffer: function (a,
                                        b) {
                    35051 == a ? U.P = b : 35052 == a && (U.B = b);
                    U.bindBuffer(a, Lb[b])
                },
                glBindFramebuffer: dc,
                glBindRenderbuffer: function (a, b) {
                    U.bindRenderbuffer(a, Nb[b])
                },
                glBindSampler: function (a, b) {
                    U.bindSampler(a, R[b])
                },
                glBindTexture: function (a, b) {
                    U.bindTexture(a, P[b])
                },
                glBindVertexArray: wc,
                glBindVertexArrayOES: wc,
                glBlendColor: function (a, b, c, e) {
                    U.blendColor(a, b, c, e)
                },
                glBlendEquation: function (a) {
                    U.blendEquation(a)
                },
                glBlendFunc: function (a, b) {
                    U.blendFunc(a, b)
                },
                glBlitFramebuffer: function (a, b, c, e, f, g, l, n, r, u) {
                    U.blitFramebuffer(a,
                        b, c, e, f, g, l, n, r, u)
                },
                glBufferData: function (a, b, c, e) {
                    2 <= T.version ? c && b ? U.bufferData(a, p(), e, c, b) : U.bufferData(a, b, e) : U.bufferData(a, c ? p().subarray(c, c + b) : b, e)
                },
                glBufferSubData: function (a, b, c, e) {
                    2 <= T.version ? c && U.bufferSubData(a, b, p(), e, c) : U.bufferSubData(a, b, p().subarray(e, e + c))
                },
                glCheckFramebufferStatus: function (a) {
                    return U.checkFramebufferStatus(a)
                },
                glClear: ec,
                glClearColor: fc,
                glClearStencil: gc,
                glClientWaitSync: function (a, b, c, e) {
                    return U.clientWaitSync(Qb[a], b, (c >>> 0) + 4294967296 * e)
                },
                glColorMask: function (a,
                                       b, c, e) {
                    U.colorMask(!!a, !!b, !!c, !!e)
                },
                glCompileShader: function (a) {
                    U.compileShader(Q[a])
                },
                glCompressedTexImage2D: function (a, b, c, e, f, g, l, n) {
                    2 <= T.version ? U.B || !l ? U.compressedTexImage2D(a, b, c, e, f, g, l, n) : U.compressedTexImage2D(a, b, c, e, f, g, p(), n, l) : U.compressedTexImage2D(a, b, c, e, f, g, n ? p().subarray(n, n + l) : null)
                },
                glCompressedTexSubImage2D: function (a, b, c, e, f, g, l, n, r) {
                    2 <= T.version ? U.B || !n ? U.compressedTexSubImage2D(a, b, c, e, f, g, l, n, r) : U.compressedTexSubImage2D(a, b, c, e, f, g, l, p(), r, n) : U.compressedTexSubImage2D(a,
                        b, c, e, f, g, l, r ? p().subarray(r, r + n) : null)
                },
                glCopyBufferSubData: function (a, b, c, e, f) {
                    U.copyBufferSubData(a, b, c, e, f)
                },
                glCopyTexSubImage2D: function (a, b, c, e, f, g, l, n) {
                    U.copyTexSubImage2D(a, b, c, e, f, g, l, n)
                },
                glCreateProgram: function () {
                    var a = Vb(O), b = U.createProgram();
                    b.name = a;
                    b.K = b.I = b.J = 0;
                    b.W = 1;
                    O[a] = b;
                    return a
                },
                glCreateShader: function (a) {
                    var b = Vb(Q);
                    Q[b] = U.createShader(a);
                    return b
                },
                glCullFace: function (a) {
                    U.cullFace(a)
                },
                glDeleteBuffers: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = q()[b + 4 * c >> 2], f = Lb[e];
                        f && (U.deleteBuffer(f),
                            f.name = 0, Lb[e] = null, e == U.P && (U.P = 0), e == U.B && (U.B = 0))
                    }
                },
                glDeleteFramebuffers: function (a, b) {
                    for (var c = 0; c < a; ++c) {
                        var e = q()[b + 4 * c >> 2], f = Mb[e];
                        f && (U.deleteFramebuffer(f), f.name = 0, Mb[e] = null)
                    }
                },
                glDeleteProgram: function (a) {
                    if (a) {
                        var b = O[a];
                        b ? (U.deleteProgram(b), b.name = 0, O[a] = null) : S(1281)
                    }
                },
                glDeleteRenderbuffers: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = q()[b + 4 * c >> 2], f = Nb[e];
                        f && (U.deleteRenderbuffer(f), f.name = 0, Nb[e] = null)
                    }
                },
                glDeleteSamplers: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = q()[b + 4 * c >> 2], f = R[e];
                        f && (U.deleteSampler(f), f.name = 0, R[e] = null)
                    }
                },
                glDeleteShader: function (a) {
                    if (a) {
                        var b = Q[a];
                        b ? (U.deleteShader(b), Q[a] = null) : S(1281)
                    }
                },
                glDeleteSync: function (a) {
                    if (a) {
                        var b = Qb[a];
                        b ? (U.deleteSync(b), b.name = 0, Qb[a] = null) : S(1281)
                    }
                },
                glDeleteTextures: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = q()[b + 4 * c >> 2], f = P[e];
                        f && (U.deleteTexture(f), f.name = 0, P[e] = null)
                    }
                },
                glDeleteVertexArrays: xc,
                glDeleteVertexArraysOES: xc,
                glDepthMask: function (a) {
                    U.depthMask(!!a)
                },
                glDisable: function (a) {
                    U.disable(a)
                },
                glDisableVertexAttribArray: function (a) {
                    U.disableVertexAttribArray(a)
                },
                glDrawArrays: function (a, b, c) {
                    U.drawArrays(a, b, c)
                },
                glDrawArraysInstanced: function (a, b, c, e) {
                    U.drawArraysInstanced(a, b, c, e)
                },
                glDrawArraysInstancedBaseInstanceWEBGL: function (a, b, c, e, f) {
                    U.Z.drawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f)
                },
                glDrawBuffers: function (a, b) {
                    for (var c = yc[a], e = 0; e < a; e++) c[e] = q()[b + 4 * e >> 2];
                    U.drawBuffers(c)
                },
                glDrawElements: zc,
                glDrawElementsInstanced: function (a, b, c, e, f) {
                    U.drawElementsInstanced(a, b, c, e, f)
                },
                glDrawElementsInstancedBaseVertexBaseInstanceWEBGL: function (a, b, c, e, f, g, l) {
                    U.Z.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a,
                        b, c, e, f, g, l)
                },
                glDrawRangeElements: function (a, b, c, e, f, g) {
                    zc(a, e, f, g)
                },
                glEnable: function (a) {
                    U.enable(a)
                },
                glEnableVertexAttribArray: function (a) {
                    U.enableVertexAttribArray(a)
                },
                glFenceSync: function (a, b) {
                    return (a = U.fenceSync(a, b)) ? (b = Vb(Qb), a.name = b, Qb[b] = a, b) : 0
                },
                glFinish: function () {
                    U.finish()
                },
                glFlush: function () {
                    U.flush()
                },
                glFramebufferRenderbuffer: function (a, b, c, e) {
                    U.framebufferRenderbuffer(a, b, c, Nb[e])
                },
                glFramebufferTexture2D: function (a, b, c, e, f) {
                    U.framebufferTexture2D(a, b, c, P[e], f)
                },
                glFrontFace: function (a) {
                    U.frontFace(a)
                },
                glGenBuffers: function (a, b) {
                    Ac(a, b, "createBuffer", Lb)
                },
                glGenFramebuffers: function (a, b) {
                    Ac(a, b, "createFramebuffer", Mb)
                },
                glGenRenderbuffers: function (a, b) {
                    Ac(a, b, "createRenderbuffer", Nb)
                },
                glGenSamplers: function (a, b) {
                    Ac(a, b, "createSampler", R)
                },
                glGenTextures: function (a, b) {
                    Ac(a, b, "createTexture", P)
                },
                glGenVertexArrays: Bc,
                glGenVertexArraysOES: Bc,
                glGenerateMipmap: function (a) {
                    U.generateMipmap(a)
                },
                glGetBufferParameteriv: function (a, b, c) {
                    c ? q()[c >> 2] = U.getBufferParameter(a, b) : S(1281)
                },
                glGetError: function () {
                    var a =
                        U.getError() || Ub;
                    Ub = 0;
                    return a
                },
                glGetFloatv: function (a, b) {
                    hc(a, b, 2)
                },
                glGetFramebufferAttachmentParameteriv: function (a, b, c, e) {
                    a = U.getFramebufferAttachmentParameter(a, b, c);
                    if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                    q()[e >> 2] = a
                },
                glGetIntegerv: ic,
                glGetProgramInfoLog: function (a, b, c, e) {
                    a = U.getProgramInfoLog(O[a]);
                    null === a && (a = "(unknown error)");
                    var f;
                    0 < b && e ? f = zb(a, p(), e, b) : f = 0;
                    b = f;
                    c && (q()[c >> 2] = b)
                },
                glGetProgramiv: function (a, b, c) {
                    if (c) if (a >= Kb) S(1281); else if (a = O[a], 35716 == b) a =
                        U.getProgramInfoLog(a), null === a && (a = "(unknown error)"), q()[c >> 2] = a.length + 1; else if (35719 == b) {
                        if (!a.K) for (b = 0; b < U.getProgramParameter(a, 35718); ++b) a.K = Math.max(a.K, U.getActiveUniform(a, b).name.length + 1);
                        q()[c >> 2] = a.K
                    } else if (35722 == b) {
                        if (!a.I) for (b = 0; b < U.getProgramParameter(a, 35721); ++b) a.I = Math.max(a.I, U.getActiveAttrib(a, b).name.length + 1);
                        q()[c >> 2] = a.I
                    } else if (35381 == b) {
                        if (!a.J) for (b = 0; b < U.getProgramParameter(a, 35382); ++b) a.J = Math.max(a.J, U.getActiveUniformBlockName(a, b).length + 1);
                        q()[c >> 2] = a.J
                    } else q()[c >>
                    2] = U.getProgramParameter(a, b); else S(1281)
                },
                glGetRenderbufferParameteriv: function (a, b, c) {
                    c ? q()[c >> 2] = U.getRenderbufferParameter(a, b) : S(1281)
                },
                glGetShaderInfoLog: function (a, b, c, e) {
                    a = U.getShaderInfoLog(Q[a]);
                    null === a && (a = "(unknown error)");
                    var f;
                    0 < b && e ? f = zb(a, p(), e, b) : f = 0;
                    b = f;
                    c && (q()[c >> 2] = b)
                },
                glGetShaderPrecisionFormat: function (a, b, c, e) {
                    a = U.getShaderPrecisionFormat(a, b);
                    q()[c >> 2] = a.rangeMin;
                    q()[c + 4 >> 2] = a.rangeMax;
                    q()[e >> 2] = a.precision
                },
                glGetShaderiv: function (a, b, c) {
                    c ? 35716 == b ? (a = U.getShaderInfoLog(Q[a]),
                    null === a && (a = "(unknown error)"), a = a ? a.length + 1 : 0, q()[c >> 2] = a) : 35720 == b ? (a = (a = U.getShaderSource(Q[a])) ? a.length + 1 : 0, q()[c >> 2] = a) : q()[c >> 2] = U.getShaderParameter(Q[a], b) : S(1281)
                },
                glGetString: function (a) {
                    var b = Rb[a];
                    if (!b) {
                        switch (a) {
                            case 7939:
                                b = U.getSupportedExtensions() || [];
                                b = b.concat(b.map(function (e) {
                                    return "GL_" + e
                                }));
                                b = Ab(b.join(" "));
                                break;
                            case 7936:
                            case 7937:
                            case 37445:
                            case 37446:
                                (b = U.getParameter(a)) || S(1280);
                                b = b && Ab(b);
                                break;
                            case 7938:
                                b = U.getParameter(7938);
                                b = 2 <= T.version ? "OpenGL ES 3.0 (" + b + ")" :
                                    "OpenGL ES 2.0 (" + b + ")";
                                b = Ab(b);
                                break;
                            case 35724:
                                b = U.getParameter(35724);
                                var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                                null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                                b = Ab(b);
                                break;
                            default:
                                S(1280)
                        }
                        Rb[a] = b
                    }
                    return b
                },
                glGetStringi: function (a, b) {
                    if (2 > T.version) return S(1282), 0;
                    var c = Sb[a];
                    if (c) return 0 > b || b >= c.length ? (S(1281), 0) : c[b];
                    switch (a) {
                        case 7939:
                            return c = U.getSupportedExtensions() || [], c = c.concat(c.map(function (e) {
                                return "GL_" + e
                            })), c = c.map(function (e) {
                                return Ab(e)
                            }),
                                c = Sb[a] = c, 0 > b || b >= c.length ? (S(1281), 0) : c[b];
                        default:
                            return S(1280), 0
                    }
                },
                glGetUniformLocation: function (a, b) {
                    b = J(b);
                    if (a = O[a]) {
                        var c = a, e = c.G, f = c.ja, g;
                        if (!e) for (c.G = e = {}, c.ia = {}, g = 0; g < U.getProgramParameter(c, 35718); ++g) {
                            var l = U.getActiveUniform(c, g);
                            var n = l.name;
                            l = l.size;
                            var r = Cc(n);
                            r = 0 < r ? n.slice(0, r) : n;
                            var u = c.W;
                            c.W += l;
                            f[r] = [l, u];
                            for (n = 0; n < l; ++n) e[u] = n, c.ia[u++] = r
                        }
                        c = a.G;
                        e = 0;
                        f = b;
                        g = Cc(b);
                        0 < g && (e = parseInt(b.slice(g + 1)) >>> 0, f = b.slice(0, g));
                        if ((f = a.ja[f]) && e < f[0] && (e += f[1], c[e] = c[e] || U.getUniformLocation(a,
                            b))) return e
                    } else S(1281);
                    return -1
                },
                glInvalidateFramebuffer: function (a, b, c) {
                    for (var e = yc[b], f = 0; f < b; f++) e[f] = q()[c + 4 * f >> 2];
                    U.invalidateFramebuffer(a, e)
                },
                glInvalidateSubFramebuffer: function (a, b, c, e, f, g, l) {
                    for (var n = yc[b], r = 0; r < b; r++) n[r] = q()[c + 4 * r >> 2];
                    U.invalidateSubFramebuffer(a, n, e, f, g, l)
                },
                glIsSync: function (a) {
                    return U.isSync(Qb[a])
                },
                glIsTexture: function (a) {
                    return (a = P[a]) ? U.isTexture(a) : 0
                },
                glLineWidth: function (a) {
                    U.lineWidth(a)
                },
                glLinkProgram: function (a) {
                    a = O[a];
                    U.linkProgram(a);
                    a.G = 0;
                    a.ja = {}
                },
                glMultiDrawArraysInstancedBaseInstanceWEBGL: function (a,
                                                                       b, c, e, f, g) {
                    U.ea.multiDrawArraysInstancedBaseInstanceWEBGL(a, q(), b >> 2, q(), c >> 2, q(), e >> 2, t(), f >> 2, g)
                },
                glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL: function (a, b, c, e, f, g, l, n) {
                    U.ea.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, q(), b >> 2, c, q(), e >> 2, q(), f >> 2, q(), g >> 2, t(), l >> 2, n)
                },
                glPixelStorei: function (a, b) {
                    3317 == a && (Tb = b);
                    U.pixelStorei(a, b)
                },
                glReadBuffer: function (a) {
                    U.readBuffer(a)
                },
                glReadPixels: function (a, b, c, e, f, g, l) {
                    if (2 <= T.version) if (U.P) U.readPixels(a, b, c, e, f, g, l); else {
                        var n = Dc(g);
                        U.readPixels(a, b, c, e, f, g, n, l >> 31 - Math.clz32(n.BYTES_PER_ELEMENT))
                    } else (l = Ec(g, f, c, e, l)) ? U.readPixels(a, b, c, e, f, g, l) : S(1280)
                },
                glRenderbufferStorage: function (a, b, c, e) {
                    U.renderbufferStorage(a, b, c, e)
                },
                glRenderbufferStorageMultisample: function (a, b, c, e, f) {
                    U.renderbufferStorageMultisample(a, b, c, e, f)
                },
                glSamplerParameterf: function (a, b, c) {
                    U.samplerParameterf(R[a], b, c)
                },
                glSamplerParameteri: function (a, b, c) {
                    U.samplerParameteri(R[a], b, c)
                },
                glSamplerParameteriv: function (a, b, c) {
                    c = q()[c >> 2];
                    U.samplerParameteri(R[a],
                        b, c)
                },
                glScissor: function (a, b, c, e) {
                    U.scissor(a, b, c, e)
                },
                glShaderSource: function (a, b, c, e) {
                    for (var f = "", g = 0; g < b; ++g) {
                        var l = e ? q()[e + 4 * g >> 2] : -1;
                        f += J(q()[c + 4 * g >> 2], 0 > l ? void 0 : l)
                    }
                    U.shaderSource(Q[a], f)
                },
                glStencilFunc: function (a, b, c) {
                    U.stencilFunc(a, b, c)
                },
                glStencilFuncSeparate: function (a, b, c, e) {
                    U.stencilFuncSeparate(a, b, c, e)
                },
                glStencilMask: function (a) {
                    U.stencilMask(a)
                },
                glStencilMaskSeparate: function (a, b) {
                    U.stencilMaskSeparate(a, b)
                },
                glStencilOp: function (a, b, c) {
                    U.stencilOp(a, b, c)
                },
                glStencilOpSeparate: function (a,
                                               b, c, e) {
                    U.stencilOpSeparate(a, b, c, e)
                },
                glTexImage2D: function (a, b, c, e, f, g, l, n, r) {
                    if (2 <= T.version) if (U.B) U.texImage2D(a, b, c, e, f, g, l, n, r); else if (r) {
                        var u = Dc(n);
                        U.texImage2D(a, b, c, e, f, g, l, n, u, r >> 31 - Math.clz32(u.BYTES_PER_ELEMENT))
                    } else U.texImage2D(a, b, c, e, f, g, l, n, null); else U.texImage2D(a, b, c, e, f, g, l, n, r ? Ec(n, l, e, f, r) : null)
                },
                glTexParameterf: function (a, b, c) {
                    U.texParameterf(a, b, c)
                },
                glTexParameterfv: function (a, b, c) {
                    c = v()[c >> 2];
                    U.texParameterf(a, b, c)
                },
                glTexParameteri: function (a, b, c) {
                    U.texParameteri(a, b, c)
                },
                glTexParameteriv: function (a, b, c) {
                    c = q()[c >> 2];
                    U.texParameteri(a, b, c)
                },
                glTexStorage2D: function (a, b, c, e, f) {
                    U.texStorage2D(a, b, c, e, f)
                },
                glTexSubImage2D: function (a, b, c, e, f, g, l, n, r) {
                    if (2 <= T.version) if (U.B) U.texSubImage2D(a, b, c, e, f, g, l, n, r); else if (r) {
                        var u = Dc(n);
                        U.texSubImage2D(a, b, c, e, f, g, l, n, u, r >> 31 - Math.clz32(u.BYTES_PER_ELEMENT))
                    } else U.texSubImage2D(a, b, c, e, f, g, l, n, null); else u = null, r && (u = Ec(n, l, f, g, r)), U.texSubImage2D(a, b, c, e, f, g, l, n, u)
                },
                glUniform1f: function (a, b) {
                    U.uniform1f(W(a), b)
                },
                glUniform1fv: function (a,
                                        b, c) {
                    if (2 <= T.version) b && U.uniform1fv(W(a), v(), c >> 2, b); else {
                        if (288 >= b) for (var e = X[b - 1], f = 0; f < b; ++f) e[f] = v()[c + 4 * f >> 2]; else e = v().subarray(c >> 2, c + 4 * b >> 2);
                        U.uniform1fv(W(a), e)
                    }
                },
                glUniform1i: function (a, b) {
                    U.uniform1i(W(a), b)
                },
                glUniform1iv: function (a, b, c) {
                    if (2 <= T.version) b && U.uniform1iv(W(a), q(), c >> 2, b); else {
                        if (288 >= b) for (var e = Fc[b - 1], f = 0; f < b; ++f) e[f] = q()[c + 4 * f >> 2]; else e = q().subarray(c >> 2, c + 4 * b >> 2);
                        U.uniform1iv(W(a), e)
                    }
                },
                glUniform2f: function (a, b, c) {
                    U.uniform2f(W(a), b, c)
                },
                glUniform2fv: function (a, b, c) {
                    if (2 <=
                        T.version) b && U.uniform2fv(W(a), v(), c >> 2, 2 * b); else {
                        if (144 >= b) for (var e = X[2 * b - 1], f = 0; f < 2 * b; f += 2) e[f] = v()[c + 4 * f >> 2], e[f + 1] = v()[c + (4 * f + 4) >> 2]; else e = v().subarray(c >> 2, c + 8 * b >> 2);
                        U.uniform2fv(W(a), e)
                    }
                },
                glUniform2i: function (a, b, c) {
                    U.uniform2i(W(a), b, c)
                },
                glUniform2iv: function (a, b, c) {
                    if (2 <= T.version) b && U.uniform2iv(W(a), q(), c >> 2, 2 * b); else {
                        if (144 >= b) for (var e = Fc[2 * b - 1], f = 0; f < 2 * b; f += 2) e[f] = q()[c + 4 * f >> 2], e[f + 1] = q()[c + (4 * f + 4) >> 2]; else e = q().subarray(c >> 2, c + 8 * b >> 2);
                        U.uniform2iv(W(a), e)
                    }
                },
                glUniform3f: function (a,
                                       b, c, e) {
                    U.uniform3f(W(a), b, c, e)
                },
                glUniform3fv: function (a, b, c) {
                    if (2 <= T.version) b && U.uniform3fv(W(a), v(), c >> 2, 3 * b); else {
                        if (96 >= b) for (var e = X[3 * b - 1], f = 0; f < 3 * b; f += 3) e[f] = v()[c + 4 * f >> 2], e[f + 1] = v()[c + (4 * f + 4) >> 2], e[f + 2] = v()[c + (4 * f + 8) >> 2]; else e = v().subarray(c >> 2, c + 12 * b >> 2);
                        U.uniform3fv(W(a), e)
                    }
                },
                glUniform3i: function (a, b, c, e) {
                    U.uniform3i(W(a), b, c, e)
                },
                glUniform3iv: function (a, b, c) {
                    if (2 <= T.version) b && U.uniform3iv(W(a), q(), c >> 2, 3 * b); else {
                        if (96 >= b) for (var e = Fc[3 * b - 1], f = 0; f < 3 * b; f += 3) e[f] = q()[c + 4 * f >> 2], e[f + 1] = q()[c +
                        (4 * f + 4) >> 2], e[f + 2] = q()[c + (4 * f + 8) >> 2]; else e = q().subarray(c >> 2, c + 12 * b >> 2);
                        U.uniform3iv(W(a), e)
                    }
                },
                glUniform4f: function (a, b, c, e, f) {
                    U.uniform4f(W(a), b, c, e, f)
                },
                glUniform4fv: function (a, b, c) {
                    if (2 <= T.version) b && U.uniform4fv(W(a), v(), c >> 2, 4 * b); else {
                        if (72 >= b) {
                            var e = X[4 * b - 1], f = v();
                            c >>= 2;
                            for (var g = 0; g < 4 * b; g += 4) {
                                var l = c + g;
                                e[g] = f[l];
                                e[g + 1] = f[l + 1];
                                e[g + 2] = f[l + 2];
                                e[g + 3] = f[l + 3]
                            }
                        } else e = v().subarray(c >> 2, c + 16 * b >> 2);
                        U.uniform4fv(W(a), e)
                    }
                },
                glUniform4i: function (a, b, c, e, f) {
                    U.uniform4i(W(a), b, c, e, f)
                },
                glUniform4iv: function (a,
                                        b, c) {
                    if (2 <= T.version) b && U.uniform4iv(W(a), q(), c >> 2, 4 * b); else {
                        if (72 >= b) for (var e = Fc[4 * b - 1], f = 0; f < 4 * b; f += 4) e[f] = q()[c + 4 * f >> 2], e[f + 1] = q()[c + (4 * f + 4) >> 2], e[f + 2] = q()[c + (4 * f + 8) >> 2], e[f + 3] = q()[c + (4 * f + 12) >> 2]; else e = q().subarray(c >> 2, c + 16 * b >> 2);
                        U.uniform4iv(W(a), e)
                    }
                },
                glUniformMatrix2fv: function (a, b, c, e) {
                    if (2 <= T.version) b && U.uniformMatrix2fv(W(a), !!c, v(), e >> 2, 4 * b); else {
                        if (72 >= b) for (var f = X[4 * b - 1], g = 0; g < 4 * b; g += 4) f[g] = v()[e + 4 * g >> 2], f[g + 1] = v()[e + (4 * g + 4) >> 2], f[g + 2] = v()[e + (4 * g + 8) >> 2], f[g + 3] = v()[e + (4 * g + 12) >> 2]; else f =
                            v().subarray(e >> 2, e + 16 * b >> 2);
                        U.uniformMatrix2fv(W(a), !!c, f)
                    }
                },
                glUniformMatrix3fv: function (a, b, c, e) {
                    if (2 <= T.version) b && U.uniformMatrix3fv(W(a), !!c, v(), e >> 2, 9 * b); else {
                        if (32 >= b) for (var f = X[9 * b - 1], g = 0; g < 9 * b; g += 9) f[g] = v()[e + 4 * g >> 2], f[g + 1] = v()[e + (4 * g + 4) >> 2], f[g + 2] = v()[e + (4 * g + 8) >> 2], f[g + 3] = v()[e + (4 * g + 12) >> 2], f[g + 4] = v()[e + (4 * g + 16) >> 2], f[g + 5] = v()[e + (4 * g + 20) >> 2], f[g + 6] = v()[e + (4 * g + 24) >> 2], f[g + 7] = v()[e + (4 * g + 28) >> 2], f[g + 8] = v()[e + (4 * g + 32) >> 2]; else f = v().subarray(e >> 2, e + 36 * b >> 2);
                        U.uniformMatrix3fv(W(a), !!c, f)
                    }
                },
                glUniformMatrix4fv: function (a, b, c, e) {
                    if (2 <= T.version) b && U.uniformMatrix4fv(W(a), !!c, v(), e >> 2, 16 * b); else {
                        if (18 >= b) {
                            var f = X[16 * b - 1], g = v();
                            e >>= 2;
                            for (var l = 0; l < 16 * b; l += 16) {
                                var n = e + l;
                                f[l] = g[n];
                                f[l + 1] = g[n + 1];
                                f[l + 2] = g[n + 2];
                                f[l + 3] = g[n + 3];
                                f[l + 4] = g[n + 4];
                                f[l + 5] = g[n + 5];
                                f[l + 6] = g[n + 6];
                                f[l + 7] = g[n + 7];
                                f[l + 8] = g[n + 8];
                                f[l + 9] = g[n + 9];
                                f[l + 10] = g[n + 10];
                                f[l + 11] = g[n + 11];
                                f[l + 12] = g[n + 12];
                                f[l + 13] = g[n + 13];
                                f[l + 14] = g[n + 14];
                                f[l + 15] = g[n + 15]
                            }
                        } else f = v().subarray(e >> 2, e + 64 * b >> 2);
                        U.uniformMatrix4fv(W(a), !!c, f)
                    }
                },
                glUseProgram: function (a) {
                    a =
                        O[a];
                    U.useProgram(a);
                    U.la = a
                },
                glVertexAttrib1f: function (a, b) {
                    U.vertexAttrib1f(a, b)
                },
                glVertexAttrib2fv: function (a, b) {
                    U.vertexAttrib2f(a, v()[b >> 2], v()[b + 4 >> 2])
                },
                glVertexAttrib3fv: function (a, b) {
                    U.vertexAttrib3f(a, v()[b >> 2], v()[b + 4 >> 2], v()[b + 8 >> 2])
                },
                glVertexAttrib4fv: function (a, b) {
                    U.vertexAttrib4f(a, v()[b >> 2], v()[b + 4 >> 2], v()[b + 8 >> 2], v()[b + 12 >> 2])
                },
                glVertexAttribDivisor: function (a, b) {
                    U.vertexAttribDivisor(a, b)
                },
                glVertexAttribIPointer: function (a, b, c, e, f) {
                    U.vertexAttribIPointer(a, b, c, e, f)
                },
                glVertexAttribPointer: function (a,
                                                 b, c, e, f, g) {
                    U.vertexAttribPointer(a, b, c, !!e, f, g)
                },
                glViewport: function (a, b, c, e) {
                    U.viewport(a, b, c, e)
                },
                glWaitSync: function (a, b, c, e) {
                    U.waitSync(Qb[a], b, (c >>> 0) + 4294967296 * e)
                },
                invoke_ii: dd,
                invoke_iii: ed,
                invoke_iiii: fd,
                invoke_iiiii: gd,
                invoke_iiiiiii: hd,
                invoke_vi: jd,
                invoke_vii: kd,
                invoke_viii: ld,
                invoke_viiii: md,
                invoke_viiiiiii: nd,
                memory: d || w.wasmMemory,
                skwasm_captureImageBitmap: Gc,
                skwasm_createGlTextureFromTextureSource: Hc,
                skwasm_createOffscreenCanvas: Jc,
                skwasm_dispatchRenderPicture: Kc,
                skwasm_disposeAssociatedObjectOnThread: Lc,
                skwasm_getAssociatedObject: Mc,
                skwasm_registerMessageListener: Nc,
                skwasm_resizeCanvas: Oc,
                skwasm_setAssociatedObjectOnThread: Pc,
                strftime_l: (a, b, c, e) => Vc(a, b, c, e)
            };
            (function () {
                function a(c, e) {
                    F = c = c.exports;
                    w.wasmExports = F;
                    I.ha.push(F._emscripten_tls_init);
                    G = F.__indirect_function_table;
                    Ha.unshift(F.__wasm_call_ctors);
                    Aa = e;
                    Oa();
                    return c
                }

                var b = {env: od, wasi_snapshot_preview1: od};
                Na();
                if (w.instantiateWasm) try {
                    return w.instantiateWasm(b, a)
                } catch (c) {
                    D("Module.instantiateWasm callback failed with error: " + c), ka(c)
                }
                Ua(b, function (c) {
                    a(c.instance, c.module)
                }).catch(ka);
                return {}
            })();
            w._canvas_saveLayer = (a, b, c, e) => (w._canvas_saveLayer = F.canvas_saveLayer)(a, b, c, e);
            w._canvas_save = a => (w._canvas_save = F.canvas_save)(a);
            w._canvas_restore = a => (w._canvas_restore = F.canvas_restore)(a);
            w._canvas_restoreToCount = (a, b) => (w._canvas_restoreToCount = F.canvas_restoreToCount)(a, b);
            w._canvas_getSaveCount = a => (w._canvas_getSaveCount = F.canvas_getSaveCount)(a);
            w._canvas_translate = (a, b, c) => (w._canvas_translate = F.canvas_translate)(a, b, c);
            w._canvas_scale = (a, b, c) => (w._canvas_scale = F.canvas_scale)(a, b, c);
            w._canvas_rotate = (a, b) => (w._canvas_rotate = F.canvas_rotate)(a, b);
            w._canvas_skew = (a, b, c) => (w._canvas_skew = F.canvas_skew)(a, b, c);
            w._canvas_transform = (a, b) => (w._canvas_transform = F.canvas_transform)(a, b);
            w._canvas_clipRect = (a, b, c, e) => (w._canvas_clipRect = F.canvas_clipRect)(a, b, c, e);
            w._canvas_clipRRect = (a, b, c) => (w._canvas_clipRRect = F.canvas_clipRRect)(a, b, c);
            w._canvas_clipPath = (a, b, c) => (w._canvas_clipPath = F.canvas_clipPath)(a, b, c);
            w._canvas_drawColor = (a, b, c) => (w._canvas_drawColor = F.canvas_drawColor)(a, b, c);
            w._canvas_drawLine = (a, b, c, e, f, g) => (w._canvas_drawLine = F.canvas_drawLine)(a, b, c, e, f, g);
            w._canvas_drawPaint = (a, b) => (w._canvas_drawPaint = F.canvas_drawPaint)(a, b);
            w._canvas_drawRect = (a, b, c) => (w._canvas_drawRect = F.canvas_drawRect)(a, b, c);
            w._canvas_drawRRect = (a, b, c) => (w._canvas_drawRRect = F.canvas_drawRRect)(a, b, c);
            w._canvas_drawDRRect = (a, b, c, e) => (w._canvas_drawDRRect = F.canvas_drawDRRect)(a, b, c, e);
            w._canvas_drawOval = (a, b, c) => (w._canvas_drawOval = F.canvas_drawOval)(a, b, c);
            w._canvas_drawCircle = (a, b, c, e, f) => (w._canvas_drawCircle = F.canvas_drawCircle)(a, b, c, e, f);
            w._canvas_drawArc = (a, b, c, e, f, g) => (w._canvas_drawArc = F.canvas_drawArc)(a, b, c, e, f, g);
            w._canvas_drawPath = (a, b, c) => (w._canvas_drawPath = F.canvas_drawPath)(a, b, c);
            w._canvas_drawShadow = (a, b, c, e, f, g) => (w._canvas_drawShadow = F.canvas_drawShadow)(a, b, c, e, f, g);
            w._canvas_drawParagraph = (a, b, c, e) => (w._canvas_drawParagraph = F.canvas_drawParagraph)(a, b, c, e);
            w._canvas_drawPicture = (a, b) => (w._canvas_drawPicture = F.canvas_drawPicture)(a, b);
            w._canvas_drawImage = (a, b, c, e, f, g) => (w._canvas_drawImage = F.canvas_drawImage)(a, b, c, e, f, g);
            w._canvas_drawImageRect = (a, b, c, e, f, g) => (w._canvas_drawImageRect = F.canvas_drawImageRect)(a, b, c, e, f, g);
            w._canvas_drawImageNine = (a, b, c, e, f, g) => (w._canvas_drawImageNine = F.canvas_drawImageNine)(a, b, c, e, f, g);
            w._canvas_drawVertices = (a, b, c, e) => (w._canvas_drawVertices = F.canvas_drawVertices)(a, b, c, e);
            w._canvas_drawPoints = (a, b, c, e, f) => (w._canvas_drawPoints = F.canvas_drawPoints)(a, b, c, e, f);
            w._canvas_drawAtlas = (a, b, c, e, f, g, l, n, r) => (w._canvas_drawAtlas = F.canvas_drawAtlas)(a, b, c, e, f, g, l, n, r);
            w._canvas_getTransform = (a, b) => (w._canvas_getTransform = F.canvas_getTransform)(a, b);
            w._canvas_getLocalClipBounds = (a, b) => (w._canvas_getLocalClipBounds = F.canvas_getLocalClipBounds)(a, b);
            w._canvas_getDeviceClipBounds = (a, b) => (w._canvas_getDeviceClipBounds = F.canvas_getDeviceClipBounds)(a, b);
            w._contourMeasureIter_create = (a, b, c) => (w._contourMeasureIter_create = F.contourMeasureIter_create)(a, b, c);
            w._contourMeasureIter_next = a => (w._contourMeasureIter_next = F.contourMeasureIter_next)(a);
            w._contourMeasureIter_dispose = a => (w._contourMeasureIter_dispose = F.contourMeasureIter_dispose)(a);
            w._contourMeasure_dispose = a => (w._contourMeasure_dispose = F.contourMeasure_dispose)(a);
            w._contourMeasure_length = a => (w._contourMeasure_length = F.contourMeasure_length)(a);
            w._contourMeasure_isClosed = a => (w._contourMeasure_isClosed = F.contourMeasure_isClosed)(a);
            w._contourMeasure_getPosTan = (a, b, c, e) => (w._contourMeasure_getPosTan = F.contourMeasure_getPosTan)(a, b, c, e);
            w._contourMeasure_getSegment = (a, b, c, e) => (w._contourMeasure_getSegment = F.contourMeasure_getSegment)(a, b, c, e);
            w._skData_create = a => (w._skData_create = F.skData_create)(a);
            w._skData_getPointer = a => (w._skData_getPointer = F.skData_getPointer)(a);
            w._skData_getConstPointer = a => (w._skData_getConstPointer = F.skData_getConstPointer)(a);
            w._skData_getSize = a => (w._skData_getSize = F.skData_getSize)(a);
            w._skData_dispose = a => (w._skData_dispose = F.skData_dispose)(a);
            w._imageFilter_createBlur = (a, b, c) => (w._imageFilter_createBlur = F.imageFilter_createBlur)(a, b, c);
            w._imageFilter_createDilate = (a, b) => (w._imageFilter_createDilate = F.imageFilter_createDilate)(a, b);
            w._imageFilter_createErode = (a, b) => (w._imageFilter_createErode = F.imageFilter_createErode)(a, b);
            w._imageFilter_createMatrix = (a, b) => (w._imageFilter_createMatrix = F.imageFilter_createMatrix)(a, b);
            w._imageFilter_createFromColorFilter = a => (w._imageFilter_createFromColorFilter = F.imageFilter_createFromColorFilter)(a);
            w._imageFilter_compose = (a, b) => (w._imageFilter_compose = F.imageFilter_compose)(a, b);
            w._imageFilter_dispose = a => (w._imageFilter_dispose = F.imageFilter_dispose)(a);
            w._imageFilter_getFilterBounds = (a, b) => (w._imageFilter_getFilterBounds = F.imageFilter_getFilterBounds)(a, b);
            w._colorFilter_createMode = (a, b) => (w._colorFilter_createMode = F.colorFilter_createMode)(a, b);
            w._colorFilter_createMatrix = a => (w._colorFilter_createMatrix = F.colorFilter_createMatrix)(a);
            w._colorFilter_createSRGBToLinearGamma = () => (w._colorFilter_createSRGBToLinearGamma = F.colorFilter_createSRGBToLinearGamma)();
            w._colorFilter_createLinearToSRGBGamma = () => (w._colorFilter_createLinearToSRGBGamma = F.colorFilter_createLinearToSRGBGamma)();
            w._colorFilter_compose = (a, b) => (w._colorFilter_compose = F.colorFilter_compose)(a, b);
            w._colorFilter_dispose = a => (w._colorFilter_dispose = F.colorFilter_dispose)(a);
            w._maskFilter_createBlur = (a, b) => (w._maskFilter_createBlur = F.maskFilter_createBlur)(a, b);
            w._maskFilter_dispose = a => (w._maskFilter_dispose = F.maskFilter_dispose)(a);
            w._fontCollection_create = () => (w._fontCollection_create = F.fontCollection_create)();
            w._fontCollection_dispose = a => (w._fontCollection_dispose = F.fontCollection_dispose)(a);
            w._typeface_create = a => (w._typeface_create = F.typeface_create)(a);
            w._typeface_dispose = a => (w._typeface_dispose = F.typeface_dispose)(a);
            w._typefaces_filterCoveredCodePoints = (a, b, c, e) => (w._typefaces_filterCoveredCodePoints = F.typefaces_filterCoveredCodePoints)(a, b, c, e);
            w._fontCollection_registerTypeface = (a, b, c) => (w._fontCollection_registerTypeface = F.fontCollection_registerTypeface)(a, b, c);
            w._fontCollection_clearCaches = a => (w._fontCollection_clearCaches = F.fontCollection_clearCaches)(a);
            w._image_createFromPicture = (a, b, c) => (w._image_createFromPicture = F.image_createFromPicture)(a, b, c);
            w._image_createFromPixels = (a, b, c, e, f) => (w._image_createFromPixels = F.image_createFromPixels)(a, b, c, e, f);
            w._image_createFromTextureSource = (a, b, c, e) => (w._image_createFromTextureSource = F.image_createFromTextureSource)(a, b, c, e);
            w._image_ref = a => (w._image_ref = F.image_ref)(a);
            w._image_dispose = a => (w._image_dispose = F.image_dispose)(a);
            w._image_getWidth = a => (w._image_getWidth = F.image_getWidth)(a);
            w._image_getHeight = a => (w._image_getHeight = F.image_getHeight)(a);
            w._paint_create = () => (w._paint_create = F.paint_create)();
            w._paint_dispose = a => (w._paint_dispose = F.paint_dispose)(a);
            w._paint_setBlendMode = (a, b) => (w._paint_setBlendMode = F.paint_setBlendMode)(a, b);
            w._paint_setStyle = (a, b) => (w._paint_setStyle = F.paint_setStyle)(a, b);
            w._paint_getStyle = a => (w._paint_getStyle = F.paint_getStyle)(a);
            w._paint_setStrokeWidth = (a, b) => (w._paint_setStrokeWidth = F.paint_setStrokeWidth)(a, b);
            w._paint_getStrokeWidth = a => (w._paint_getStrokeWidth = F.paint_getStrokeWidth)(a);
            w._paint_setStrokeCap = (a, b) => (w._paint_setStrokeCap = F.paint_setStrokeCap)(a, b);
            w._paint_getStrokeCap = a => (w._paint_getStrokeCap = F.paint_getStrokeCap)(a);
            w._paint_setStrokeJoin = (a, b) => (w._paint_setStrokeJoin = F.paint_setStrokeJoin)(a, b);
            w._paint_getStrokeJoin = a => (w._paint_getStrokeJoin = F.paint_getStrokeJoin)(a);
            w._paint_setAntiAlias = (a, b) => (w._paint_setAntiAlias = F.paint_setAntiAlias)(a, b);
            w._paint_getAntiAlias = a => (w._paint_getAntiAlias = F.paint_getAntiAlias)(a);
            w._paint_setColorInt = (a, b) => (w._paint_setColorInt = F.paint_setColorInt)(a, b);
            w._paint_getColorInt = a => (w._paint_getColorInt = F.paint_getColorInt)(a);
            w._paint_setMiterLimit = (a, b) => (w._paint_setMiterLimit = F.paint_setMiterLimit)(a, b);
            w._paint_getMiterLImit = a => (w._paint_getMiterLImit = F.paint_getMiterLImit)(a);
            w._paint_setShader = (a, b) => (w._paint_setShader = F.paint_setShader)(a, b);
            w._paint_setImageFilter = (a, b) => (w._paint_setImageFilter = F.paint_setImageFilter)(a, b);
            w._paint_setColorFilter = (a, b) => (w._paint_setColorFilter = F.paint_setColorFilter)(a, b);
            w._paint_setMaskFilter = (a, b) => (w._paint_setMaskFilter = F.paint_setMaskFilter)(a, b);
            w._path_create = () => (w._path_create = F.path_create)();
            w._path_dispose = a => (w._path_dispose = F.path_dispose)(a);
            w._path_copy = a => (w._path_copy = F.path_copy)(a);
            w._path_setFillType = (a, b) => (w._path_setFillType = F.path_setFillType)(a, b);
            w._path_getFillType = a => (w._path_getFillType = F.path_getFillType)(a);
            w._path_moveTo = (a, b, c) => (w._path_moveTo = F.path_moveTo)(a, b, c);
            w._path_relativeMoveTo = (a, b, c) => (w._path_relativeMoveTo = F.path_relativeMoveTo)(a, b, c);
            w._path_lineTo = (a, b, c) => (w._path_lineTo = F.path_lineTo)(a, b, c);
            w._path_relativeLineTo = (a, b, c) => (w._path_relativeLineTo = F.path_relativeLineTo)(a, b, c);
            w._path_quadraticBezierTo = (a, b, c, e, f) => (w._path_quadraticBezierTo = F.path_quadraticBezierTo)(a, b, c, e, f);
            w._path_relativeQuadraticBezierTo = (a, b, c, e, f) => (w._path_relativeQuadraticBezierTo = F.path_relativeQuadraticBezierTo)(a, b, c, e, f);
            w._path_cubicTo = (a, b, c, e, f, g, l) => (w._path_cubicTo = F.path_cubicTo)(a, b, c, e, f, g, l);
            w._path_relativeCubicTo = (a, b, c, e, f, g, l) => (w._path_relativeCubicTo = F.path_relativeCubicTo)(a, b, c, e, f, g, l);
            w._path_conicTo = (a, b, c, e, f, g) => (w._path_conicTo = F.path_conicTo)(a, b, c, e, f, g);
            w._path_relativeConicTo = (a, b, c, e, f, g) => (w._path_relativeConicTo = F.path_relativeConicTo)(a, b, c, e, f, g);
            w._path_arcToOval = (a, b, c, e, f) => (w._path_arcToOval = F.path_arcToOval)(a, b, c, e, f);
            w._path_arcToRotated = (a, b, c, e, f, g, l, n) => (w._path_arcToRotated = F.path_arcToRotated)(a, b, c, e, f, g, l, n);
            w._path_relativeArcToRotated = (a, b, c, e, f, g, l, n) => (w._path_relativeArcToRotated = F.path_relativeArcToRotated)(a, b, c, e, f, g, l, n);
            w._path_addRect = (a, b) => (w._path_addRect = F.path_addRect)(a, b);
            w._path_addOval = (a, b) => (w._path_addOval = F.path_addOval)(a, b);
            w._path_addArc = (a, b, c, e) => (w._path_addArc = F.path_addArc)(a, b, c, e);
            w._path_addPolygon = (a, b, c, e) => (w._path_addPolygon = F.path_addPolygon)(a, b, c, e);
            w._path_addRRect = (a, b) => (w._path_addRRect = F.path_addRRect)(a, b);
            w._path_addPath = (a, b, c, e) => (w._path_addPath = F.path_addPath)(a, b, c, e);
            w._path_close = a => (w._path_close = F.path_close)(a);
            w._path_reset = a => (w._path_reset = F.path_reset)(a);
            w._path_contains = (a, b, c) => (w._path_contains = F.path_contains)(a, b, c);
            w._path_transform = (a, b) => (w._path_transform = F.path_transform)(a, b);
            w._path_getBounds = (a, b) => (w._path_getBounds = F.path_getBounds)(a, b);
            w._path_combine = (a, b, c) => (w._path_combine = F.path_combine)(a, b, c);
            w._pictureRecorder_create = () => (w._pictureRecorder_create = F.pictureRecorder_create)();
            w._pictureRecorder_dispose = a => (w._pictureRecorder_dispose = F.pictureRecorder_dispose)(a);
            w._pictureRecorder_beginRecording = (a, b) => (w._pictureRecorder_beginRecording = F.pictureRecorder_beginRecording)(a, b);
            w._pictureRecorder_endRecording = a => (w._pictureRecorder_endRecording = F.pictureRecorder_endRecording)(a);
            w._picture_getCullRect = (a, b) => (w._picture_getCullRect = F.picture_getCullRect)(a, b);
            w._picture_dispose = a => (w._picture_dispose = F.picture_dispose)(a);
            w._picture_approximateBytesUsed = a => (w._picture_approximateBytesUsed = F.picture_approximateBytesUsed)(a);
            w._shader_createLinearGradient = (a, b, c, e, f, g) => (w._shader_createLinearGradient = F.shader_createLinearGradient)(a, b, c, e, f, g);
            w._shader_createRadialGradient = (a, b, c, e, f, g, l, n) => (w._shader_createRadialGradient = F.shader_createRadialGradient)(a, b, c, e, f, g, l, n);
            w._shader_createConicalGradient = (a, b, c, e, f, g, l, n) => (w._shader_createConicalGradient = F.shader_createConicalGradient)(a, b, c, e, f, g, l, n);
            w._shader_createSweepGradient = (a, b, c, e, f, g, l, n, r) => (w._shader_createSweepGradient = F.shader_createSweepGradient)(a, b, c, e, f, g, l, n, r);
            w._shader_dispose = a => (w._shader_dispose = F.shader_dispose)(a);
            w._runtimeEffect_create = a => (w._runtimeEffect_create = F.runtimeEffect_create)(a);
            w._runtimeEffect_dispose = a => (w._runtimeEffect_dispose = F.runtimeEffect_dispose)(a);
            w._runtimeEffect_getUniformSize = a => (w._runtimeEffect_getUniformSize = F.runtimeEffect_getUniformSize)(a);
            w._shader_createRuntimeEffectShader = (a, b, c, e) => (w._shader_createRuntimeEffectShader = F.shader_createRuntimeEffectShader)(a, b, c, e);
            w._shader_createFromImage = (a, b, c, e, f) => (w._shader_createFromImage = F.shader_createFromImage)(a, b, c, e, f);
            w._skString_allocate = a => (w._skString_allocate = F.skString_allocate)(a);
            w._skString_getData = a => (w._skString_getData = F.skString_getData)(a);
            w._skString_free = a => (w._skString_free = F.skString_free)(a);
            w._skString16_allocate = a => (w._skString16_allocate = F.skString16_allocate)(a);
            w._skString16_getData = a => (w._skString16_getData = F.skString16_getData)(a);
            w._skString16_free = a => (w._skString16_free = F.skString16_free)(a);
            var Db = (a, b, c, e, f) => (Db = F.emscripten_dispatch_to_thread_)(a, b, c, e, f);
            w._surface_create = () => (w._surface_create = F.surface_create)();
            w._surface_getThreadId = a => (w._surface_getThreadId = F.surface_getThreadId)(a);
            w._surface_setCallbackHandler = (a, b) => (w._surface_setCallbackHandler = F.surface_setCallbackHandler)(a, b);
            w._surface_destroy = a => (w._surface_destroy = F.surface_destroy)(a);
            w._surface_renderPicture = (a, b) => (w._surface_renderPicture = F.surface_renderPicture)(a, b);
            var $c = w._surface_renderPictureOnWorker = (a, b, c) => ($c = w._surface_renderPictureOnWorker = F.surface_renderPictureOnWorker)(a, b, c);
            w._surface_rasterizeImage = (a, b, c) => (w._surface_rasterizeImage = F.surface_rasterizeImage)(a, b, c);
            var ad = w._surface_onRenderComplete = (a, b, c) => (ad = w._surface_onRenderComplete = F.surface_onRenderComplete)(a, b, c);
            w._lineMetrics_create = (a, b, c, e, f, g, l, n, r) => (w._lineMetrics_create = F.lineMetrics_create)(a, b, c, e, f, g, l, n, r);
            w._lineMetrics_dispose = a => (w._lineMetrics_dispose = F.lineMetrics_dispose)(a);
            w._lineMetrics_getHardBreak = a => (w._lineMetrics_getHardBreak = F.lineMetrics_getHardBreak)(a);
            w._lineMetrics_getAscent = a => (w._lineMetrics_getAscent = F.lineMetrics_getAscent)(a);
            w._lineMetrics_getDescent = a => (w._lineMetrics_getDescent = F.lineMetrics_getDescent)(a);
            w._lineMetrics_getUnscaledAscent = a => (w._lineMetrics_getUnscaledAscent = F.lineMetrics_getUnscaledAscent)(a);
            w._lineMetrics_getHeight = a => (w._lineMetrics_getHeight = F.lineMetrics_getHeight)(a);
            w._lineMetrics_getWidth = a => (w._lineMetrics_getWidth = F.lineMetrics_getWidth)(a);
            w._lineMetrics_getLeft = a => (w._lineMetrics_getLeft = F.lineMetrics_getLeft)(a);
            w._lineMetrics_getBaseline = a => (w._lineMetrics_getBaseline = F.lineMetrics_getBaseline)(a);
            w._lineMetrics_getLineNumber = a => (w._lineMetrics_getLineNumber = F.lineMetrics_getLineNumber)(a);
            w._lineMetrics_getStartIndex = a => (w._lineMetrics_getStartIndex = F.lineMetrics_getStartIndex)(a);
            w._lineMetrics_getEndIndex = a => (w._lineMetrics_getEndIndex = F.lineMetrics_getEndIndex)(a);
            w._paragraph_dispose = a => (w._paragraph_dispose = F.paragraph_dispose)(a);
            w._paragraph_getWidth = a => (w._paragraph_getWidth = F.paragraph_getWidth)(a);
            w._paragraph_getHeight = a => (w._paragraph_getHeight = F.paragraph_getHeight)(a);
            w._paragraph_getLongestLine = a => (w._paragraph_getLongestLine = F.paragraph_getLongestLine)(a);
            w._paragraph_getMinIntrinsicWidth = a => (w._paragraph_getMinIntrinsicWidth = F.paragraph_getMinIntrinsicWidth)(a);
            w._paragraph_getMaxIntrinsicWidth = a => (w._paragraph_getMaxIntrinsicWidth = F.paragraph_getMaxIntrinsicWidth)(a);
            w._paragraph_getAlphabeticBaseline = a => (w._paragraph_getAlphabeticBaseline = F.paragraph_getAlphabeticBaseline)(a);
            w._paragraph_getIdeographicBaseline = a => (w._paragraph_getIdeographicBaseline = F.paragraph_getIdeographicBaseline)(a);
            w._paragraph_getDidExceedMaxLines = a => (w._paragraph_getDidExceedMaxLines = F.paragraph_getDidExceedMaxLines)(a);
            w._paragraph_layout = (a, b) => (w._paragraph_layout = F.paragraph_layout)(a, b);
            w._paragraph_getPositionForOffset = (a, b, c, e) => (w._paragraph_getPositionForOffset = F.paragraph_getPositionForOffset)(a, b, c, e);
            w._paragraph_getClosestGlyphInfoAtCoordinate = (a, b, c, e, f, g) => (w._paragraph_getClosestGlyphInfoAtCoordinate = F.paragraph_getClosestGlyphInfoAtCoordinate)(a, b, c, e, f, g);
            w._paragraph_getGlyphInfoAt = (a, b, c, e, f) => (w._paragraph_getGlyphInfoAt = F.paragraph_getGlyphInfoAt)(a, b, c, e, f);
            w._paragraph_getWordBoundary = (a, b, c) => (w._paragraph_getWordBoundary = F.paragraph_getWordBoundary)(a, b, c);
            w._paragraph_getLineCount = a => (w._paragraph_getLineCount = F.paragraph_getLineCount)(a);
            w._paragraph_getLineNumberAt = (a, b) => (w._paragraph_getLineNumberAt = F.paragraph_getLineNumberAt)(a, b);
            w._paragraph_getLineMetricsAtIndex = (a, b) => (w._paragraph_getLineMetricsAtIndex = F.paragraph_getLineMetricsAtIndex)(a, b);
            w._textBoxList_dispose = a => (w._textBoxList_dispose = F.textBoxList_dispose)(a);
            w._textBoxList_getLength = a => (w._textBoxList_getLength = F.textBoxList_getLength)(a);
            w._textBoxList_getBoxAtIndex = (a, b, c) => (w._textBoxList_getBoxAtIndex = F.textBoxList_getBoxAtIndex)(a, b, c);
            w._paragraph_getBoxesForRange = (a, b, c, e, f) => (w._paragraph_getBoxesForRange = F.paragraph_getBoxesForRange)(a, b, c, e, f);
            w._paragraph_getBoxesForPlaceholders = a => (w._paragraph_getBoxesForPlaceholders = F.paragraph_getBoxesForPlaceholders)(a);
            w._paragraph_getUnresolvedCodePoints = (a, b, c) => (w._paragraph_getUnresolvedCodePoints = F.paragraph_getUnresolvedCodePoints)(a, b, c);
            w._paragraphBuilder_create = (a, b) => (w._paragraphBuilder_create = F.paragraphBuilder_create)(a, b);
            w._paragraphBuilder_dispose = a => (w._paragraphBuilder_dispose = F.paragraphBuilder_dispose)(a);
            w._paragraphBuilder_addPlaceholder = (a, b, c, e, f, g) => (w._paragraphBuilder_addPlaceholder = F.paragraphBuilder_addPlaceholder)(a, b, c, e, f, g);
            w._paragraphBuilder_addText = (a, b) => (w._paragraphBuilder_addText = F.paragraphBuilder_addText)(a, b);
            w._paragraphBuilder_getUtf8Text = (a, b) => (w._paragraphBuilder_getUtf8Text = F.paragraphBuilder_getUtf8Text)(a, b);
            w._paragraphBuilder_pushStyle = (a, b) => (w._paragraphBuilder_pushStyle = F.paragraphBuilder_pushStyle)(a, b);
            w._paragraphBuilder_pop = a => (w._paragraphBuilder_pop = F.paragraphBuilder_pop)(a);
            w._paragraphBuilder_build = a => (w._paragraphBuilder_build = F.paragraphBuilder_build)(a);
            w._unicodePositionBuffer_create = a => (w._unicodePositionBuffer_create = F.unicodePositionBuffer_create)(a);
            w._unicodePositionBuffer_getDataPointer = a => (w._unicodePositionBuffer_getDataPointer = F.unicodePositionBuffer_getDataPointer)(a);
            w._unicodePositionBuffer_free = a => (w._unicodePositionBuffer_free = F.unicodePositionBuffer_free)(a);
            w._lineBreakBuffer_create = a => (w._lineBreakBuffer_create = F.lineBreakBuffer_create)(a);
            w._lineBreakBuffer_getDataPointer = a => (w._lineBreakBuffer_getDataPointer = F.lineBreakBuffer_getDataPointer)(a);
            w._lineBreakBuffer_free = a => (w._lineBreakBuffer_free = F.lineBreakBuffer_free)(a);
            w._paragraphBuilder_setGraphemeBreaksUtf16 = (a, b) => (w._paragraphBuilder_setGraphemeBreaksUtf16 = F.paragraphBuilder_setGraphemeBreaksUtf16)(a, b);
            w._paragraphBuilder_setWordBreaksUtf16 = (a, b) => (w._paragraphBuilder_setWordBreaksUtf16 = F.paragraphBuilder_setWordBreaksUtf16)(a, b);
            w._paragraphBuilder_setLineBreaksUtf16 = (a, b) => (w._paragraphBuilder_setLineBreaksUtf16 = F.paragraphBuilder_setLineBreaksUtf16)(a, b);
            w._paragraphStyle_create = () => (w._paragraphStyle_create = F.paragraphStyle_create)();
            w._paragraphStyle_dispose = a => (w._paragraphStyle_dispose = F.paragraphStyle_dispose)(a);
            w._paragraphStyle_setTextAlign = (a, b) => (w._paragraphStyle_setTextAlign = F.paragraphStyle_setTextAlign)(a, b);
            w._paragraphStyle_setTextDirection = (a, b) => (w._paragraphStyle_setTextDirection = F.paragraphStyle_setTextDirection)(a, b);
            w._paragraphStyle_setMaxLines = (a, b) => (w._paragraphStyle_setMaxLines = F.paragraphStyle_setMaxLines)(a, b);
            w._paragraphStyle_setHeight = (a, b) => (w._paragraphStyle_setHeight = F.paragraphStyle_setHeight)(a, b);
            w._paragraphStyle_setTextHeightBehavior = (a, b, c) => (w._paragraphStyle_setTextHeightBehavior = F.paragraphStyle_setTextHeightBehavior)(a, b, c);
            w._paragraphStyle_setEllipsis = (a, b) => (w._paragraphStyle_setEllipsis = F.paragraphStyle_setEllipsis)(a, b);
            w._paragraphStyle_setStrutStyle = (a, b) => (w._paragraphStyle_setStrutStyle = F.paragraphStyle_setStrutStyle)(a, b);
            w._paragraphStyle_setTextStyle = (a, b) => (w._paragraphStyle_setTextStyle = F.paragraphStyle_setTextStyle)(a, b);
            w._strutStyle_create = () => (w._strutStyle_create = F.strutStyle_create)();
            w._strutStyle_dispose = a => (w._strutStyle_dispose = F.strutStyle_dispose)(a);
            w._strutStyle_setFontFamilies = (a, b, c) => (w._strutStyle_setFontFamilies = F.strutStyle_setFontFamilies)(a, b, c);
            w._strutStyle_setFontSize = (a, b) => (w._strutStyle_setFontSize = F.strutStyle_setFontSize)(a, b);
            w._strutStyle_setHeight = (a, b) => (w._strutStyle_setHeight = F.strutStyle_setHeight)(a, b);
            w._strutStyle_setHalfLeading = (a, b) => (w._strutStyle_setHalfLeading = F.strutStyle_setHalfLeading)(a, b);
            w._strutStyle_setLeading = (a, b) => (w._strutStyle_setLeading = F.strutStyle_setLeading)(a, b);
            w._strutStyle_setFontStyle = (a, b, c) => (w._strutStyle_setFontStyle = F.strutStyle_setFontStyle)(a, b, c);
            w._strutStyle_setForceStrutHeight = (a, b) => (w._strutStyle_setForceStrutHeight = F.strutStyle_setForceStrutHeight)(a, b);
            w._textStyle_create = () => (w._textStyle_create = F.textStyle_create)();
            w._textStyle_copy = a => (w._textStyle_copy = F.textStyle_copy)(a);
            w._textStyle_dispose = a => (w._textStyle_dispose = F.textStyle_dispose)(a);
            w._textStyle_setColor = (a, b) => (w._textStyle_setColor = F.textStyle_setColor)(a, b);
            w._textStyle_setDecoration = (a, b) => (w._textStyle_setDecoration = F.textStyle_setDecoration)(a, b);
            w._textStyle_setDecorationColor = (a, b) => (w._textStyle_setDecorationColor = F.textStyle_setDecorationColor)(a, b);
            w._textStyle_setDecorationStyle = (a, b) => (w._textStyle_setDecorationStyle = F.textStyle_setDecorationStyle)(a, b);
            w._textStyle_setDecorationThickness = (a, b) => (w._textStyle_setDecorationThickness = F.textStyle_setDecorationThickness)(a, b);
            w._textStyle_setFontStyle = (a, b, c) => (w._textStyle_setFontStyle = F.textStyle_setFontStyle)(a, b, c);
            w._textStyle_setTextBaseline = (a, b) => (w._textStyle_setTextBaseline = F.textStyle_setTextBaseline)(a, b);
            w._textStyle_clearFontFamilies = a => (w._textStyle_clearFontFamilies = F.textStyle_clearFontFamilies)(a);
            w._textStyle_addFontFamilies = (a, b, c) => (w._textStyle_addFontFamilies = F.textStyle_addFontFamilies)(a, b, c);
            w._textStyle_setFontSize = (a, b) => (w._textStyle_setFontSize = F.textStyle_setFontSize)(a, b);
            w._textStyle_setLetterSpacing = (a, b) => (w._textStyle_setLetterSpacing = F.textStyle_setLetterSpacing)(a, b);
            w._textStyle_setWordSpacing = (a, b) => (w._textStyle_setWordSpacing = F.textStyle_setWordSpacing)(a, b);
            w._textStyle_setHeight = (a, b) => (w._textStyle_setHeight = F.textStyle_setHeight)(a, b);
            w._textStyle_setHalfLeading = (a, b) => (w._textStyle_setHalfLeading = F.textStyle_setHalfLeading)(a, b);
            w._textStyle_setLocale = (a, b) => (w._textStyle_setLocale = F.textStyle_setLocale)(a, b);
            w._textStyle_setBackground = (a, b) => (w._textStyle_setBackground = F.textStyle_setBackground)(a, b);
            w._textStyle_setForeground = (a, b) => (w._textStyle_setForeground = F.textStyle_setForeground)(a, b);
            w._textStyle_addShadow = (a, b, c, e, f) => (w._textStyle_addShadow = F.textStyle_addShadow)(a, b, c, e, f);
            w._textStyle_addFontFeature = (a, b, c) => (w._textStyle_addFontFeature = F.textStyle_addFontFeature)(a, b, c);
            w._textStyle_setFontVariations = (a, b, c, e) => (w._textStyle_setFontVariations = F.textStyle_setFontVariations)(a, b, c, e);
            w._vertices_create = (a, b, c, e, f, g, l) => (w._vertices_create = F.vertices_create)(a, b, c, e, f, g, l);
            w._vertices_dispose = a => (w._vertices_dispose = F.vertices_dispose)(a);
            var fb = w._pthread_self = () => (fb = w._pthread_self = F.pthread_self)(), pb = a => (pb = F.malloc)(a);
            w.__emscripten_tls_init = () => (w.__emscripten_tls_init = F._emscripten_tls_init)();
            var cd = w.__emscripten_thread_init = (a, b, c, e, f, g) => (cd = w.__emscripten_thread_init = F._emscripten_thread_init)(a, b, c, e, f, g);
            w.__emscripten_thread_crashed = () => (w.__emscripten_thread_crashed = F._emscripten_thread_crashed)();
            var jc = (a, b, c, e) => (jc = F._emscripten_run_in_main_runtime_thread_js)(a, b, c, e),
                db = a => (db = F._emscripten_thread_free_data)(a),
                jb = w.__emscripten_thread_exit = a => (jb = w.__emscripten_thread_exit = F._emscripten_thread_exit)(a),
                wb = w.__emscripten_check_mailbox = () => (wb = w.__emscripten_check_mailbox = F._emscripten_check_mailbox)(),
                Z = (a, b) => (Z = F.setThrew)(a, b), ib = (a, b) => (ib = F.emscripten_stack_set_limits)(a, b),
                N = () => (N = F.stackSave)(), M = a => (M = F.stackRestore)(a),
                Cb = w.stackAlloc = a => (Cb = w.stackAlloc = F.stackAlloc)(a);

            function ed(a, b, c) {
                var e = N();
                try {
                    return G.get(a)(b, c)
                } catch (f) {
                    M(e);
                    if (f !== f + 0) throw f;
                    Z(1, 0)
                }
            }

            function kd(a, b, c) {
                var e = N();
                try {
                    G.get(a)(b, c)
                } catch (f) {
                    M(e);
                    if (f !== f + 0) throw f;
                    Z(1, 0)
                }
            }

            function dd(a, b) {
                var c = N();
                try {
                    return G.get(a)(b)
                } catch (e) {
                    M(c);
                    if (e !== e + 0) throw e;
                    Z(1, 0)
                }
            }

            function ld(a, b, c, e) {
                var f = N();
                try {
                    G.get(a)(b, c, e)
                } catch (g) {
                    M(f);
                    if (g !== g + 0) throw g;
                    Z(1, 0)
                }
            }

            function fd(a, b, c, e) {
                var f = N();
                try {
                    return G.get(a)(b, c, e)
                } catch (g) {
                    M(f);
                    if (g !== g + 0) throw g;
                    Z(1, 0)
                }
            }

            function md(a, b, c, e, f) {
                var g = N();
                try {
                    G.get(a)(b, c, e, f)
                } catch (l) {
                    M(g);
                    if (l !== l + 0) throw l;
                    Z(1, 0)
                }
            }

            function nd(a, b, c, e, f, g, l, n) {
                var r = N();
                try {
                    G.get(a)(b, c, e, f, g, l, n)
                } catch (u) {
                    M(r);
                    if (u !== u + 0) throw u;
                    Z(1, 0)
                }
            }

            function jd(a, b) {
                var c = N();
                try {
                    G.get(a)(b)
                } catch (e) {
                    M(c);
                    if (e !== e + 0) throw e;
                    Z(1, 0)
                }
            }

            function hd(a, b, c, e, f, g, l) {
                var n = N();
                try {
                    return G.get(a)(b, c, e, f, g, l)
                } catch (r) {
                    M(n);
                    if (r !== r + 0) throw r;
                    Z(1, 0)
                }
            }

            function gd(a, b, c, e, f) {
                var g = N();
                try {
                    return G.get(a)(b, c, e, f)
                } catch (l) {
                    M(g);
                    if (l !== l + 0) throw l;
                    Z(1, 0)
                }
            }

            w.keepRuntimeAlive = Ka;
            w.wasmMemory = d;
            w.wasmExports = F;
            w.addFunction = function (a, b) {
                if (!Wc) {
                    Wc = new WeakMap;
                    var c = G.length;
                    if (Wc) for (var e = 0; e < 0 + c; e++) {
                        var f = G.get(e);
                        f && Wc.set(f, e)
                    }
                }
                if (c = Wc.get(a) || 0) return c;
                if (Xc.length) c = Xc.pop(); else {
                    try {
                        G.grow(1)
                    } catch (n) {
                        if (!(n instanceof RangeError)) throw n;
                        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
                    }
                    c = G.length - 1
                }
                try {
                    G.set(c, a)
                } catch (n) {
                    if (!(n instanceof TypeError)) throw n;
                    if ("function" == typeof WebAssembly.Function) {
                        e = WebAssembly.Function;
                        f = {i: "i32", j: "i64", f: "f32", d: "f64", p: "i32"};
                        for (var g = {
                            parameters: [],
                            results: "v" == b[0] ? [] : [f[b[0]]]
                        }, l = 1; l < b.length; ++l) g.parameters.push(f[b[l]]);
                        b = new e(g, a)
                    } else {
                        e = [1];
                        f = b.slice(0, 1);
                        b = b.slice(1);
                        g = {i: 127, p: 127, j: 126, f: 125, d: 124};
                        e.push(96);
                        l = b.length;
                        128 > l ? e.push(l) : e.push(l % 128 | 128, l >> 7);
                        for (l = 0; l < b.length; ++l) e.push(g[b[l]]);
                        "v" == f ? e.push(0) : e.push(1, g[f]);
                        b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
                        f = e.length;
                        128 > f ? b.push(f) : b.push(f % 128 | 128, f >> 7);
                        b.push.apply(b, e);
                        b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
                        b = new WebAssembly.Module(new Uint8Array(b));
                        b = (new WebAssembly.Instance(b,
                            {e: {f: a}})).exports.f
                    }
                    G.set(c, b)
                }
                Wc.set(a, c);
                return c
            };
            w.ExitStatus = Va;
            w.PThread = I;
            var pd;
            Ma = function qd() {
                pd || rd();
                pd || (Ma = qd)
            };

            function rd() {
                function a() {
                    if (!pd && (pd = !0, w.calledRun = !0, !Ba)) {
                        A || hb(Ha);
                        ja(w);
                        if (w.onRuntimeInitialized) w.onRuntimeInitialized();
                        if (!A) {
                            if (w.postRun) for ("function" == typeof w.postRun && (w.postRun = [w.postRun]); w.postRun.length;) {
                                var b = w.postRun.shift();
                                Ia.unshift(b)
                            }
                            hb(Ia)
                        }
                    }
                }

                if (!(0 < H)) if (A) ja(w), A || hb(Ha), startWorker(w); else {
                    if (w.preRun) for ("function" == typeof w.preRun && (w.preRun = [w.preRun]); w.preRun.length;) Ga.unshift(w.preRun.shift());
                    hb(Ga);
                    0 < H || (w.setStatus ? (w.setStatus("Running..."), setTimeout(function () {
                        setTimeout(function () {
                                w.setStatus("")
                            },
                            1);
                        a()
                    }, 1)) : a())
                }
            }

            if (w.preInit) for ("function" == typeof w.preInit && (w.preInit = [w.preInit]); 0 < w.preInit.length;) w.preInit.pop()();
            rd();


            return moduleArg.ready
        }

    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = skwasm;
else if (typeof define === 'function' && define['amd'])
    define([], () => skwasm);
