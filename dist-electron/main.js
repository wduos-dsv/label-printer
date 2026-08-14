import Ut, { dialog as Il, ipcMain as Mt, app as jr, BrowserWindow as Rl } from "electron";
import { createRequire as rd } from "node:module";
import { fileURLToPath as id } from "node:url";
import gt from "node:path";
import * as od from "node:net";
import * as sd from "node:crypto";
import At from "fs";
import ad from "constants";
import Qn from "stream";
import Po from "util";
import Pl from "assert";
import Z from "path";
import ei from "child_process";
import Nl from "events";
import Zn from "crypto";
import Dl from "tty";
import ti from "os";
import Tt from "url";
import Fl from "zlib";
import ld from "http";
var Oe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, un = {}, Bt = {}, Ie = {};
Ie.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ie.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var ut = ad, cd = process.cwd, Ur = null, ud = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Ur || (Ur = cd.call(process)), Ur;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ns = process.chdir;
  process.chdir = function(e) {
    Ur = null, Ns.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ns);
}
var fd = dd;
function dd(e) {
  ut.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, f, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, f, h, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), ud === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function f(h, g, _) {
      var E = Date.now(), A = 0;
      l(h, g, function T($) {
        if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - E < 6e4) {
          setTimeout(function() {
            e.stat(g, function(D, B) {
              D && D.code === "ENOENT" ? l(h, g, T) : _($);
            });
          }, A), A < 100 && (A += 10);
          return;
        }
        _ && _($);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function f(h, g, _, E, A, T) {
      var $;
      if (T && typeof T == "function") {
        var D = 0;
        $ = function(B, q, J) {
          if (B && B.code === "EAGAIN" && D < 10)
            return D++, l.call(e, h, g, _, E, A, $);
          T.apply(this, arguments);
        };
      }
      return l.call(e, h, g, _, E, A, $);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(f, h, g, _, E) {
      for (var A = 0; ; )
        try {
          return l.call(e, f, h, g, _, E);
        } catch (T) {
          if (T.code === "EAGAIN" && A < 10) {
            A++;
            continue;
          }
          throw T;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(f, h, g) {
      l.open(
        f,
        ut.O_WRONLY | ut.O_SYMLINK,
        h,
        function(_, E) {
          if (_) {
            g && g(_);
            return;
          }
          l.fchmod(E, h, function(A) {
            l.close(E, function(T) {
              g && g(A || T);
            });
          });
        }
      );
    }, l.lchmodSync = function(f, h) {
      var g = l.openSync(f, ut.O_WRONLY | ut.O_SYMLINK, h), _ = !0, E;
      try {
        E = l.fchmodSync(g, h), _ = !1;
      } finally {
        if (_)
          try {
            l.closeSync(g);
          } catch {
          }
        else
          l.closeSync(g);
      }
      return E;
    };
  }
  function n(l) {
    ut.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(f, h, g, _) {
      l.open(f, ut.O_SYMLINK, function(E, A) {
        if (E) {
          _ && _(E);
          return;
        }
        l.futimes(A, h, g, function(T) {
          l.close(A, function($) {
            _ && _(T || $);
          });
        });
      });
    }, l.lutimesSync = function(f, h, g) {
      var _ = l.openSync(f, ut.O_SYMLINK), E, A = !0;
      try {
        E = l.futimesSync(_, h, g), A = !1;
      } finally {
        if (A)
          try {
            l.closeSync(_);
          } catch {
          }
        else
          l.closeSync(_);
      }
      return E;
    }) : l.futimes && (l.lutimes = function(f, h, g, _) {
      _ && process.nextTick(_);
    }, l.lutimesSync = function() {
    });
  }
  function r(l) {
    return l && function(f, h, g) {
      return l.call(e, f, h, function(_) {
        m(_) && (_ = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(f, h) {
      try {
        return l.call(e, f, h);
      } catch (g) {
        if (!m(g)) throw g;
      }
    };
  }
  function o(l) {
    return l && function(f, h, g, _) {
      return l.call(e, f, h, g, function(E) {
        m(E) && (E = null), _ && _.apply(this, arguments);
      });
    };
  }
  function s(l) {
    return l && function(f, h, g) {
      try {
        return l.call(e, f, h, g);
      } catch (_) {
        if (!m(_)) throw _;
      }
    };
  }
  function a(l) {
    return l && function(f, h, g) {
      typeof h == "function" && (g = h, h = null);
      function _(E, A) {
        A && (A.uid < 0 && (A.uid += 4294967296), A.gid < 0 && (A.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return h ? l.call(e, f, h, _) : l.call(e, f, _);
    };
  }
  function c(l) {
    return l && function(f, h) {
      var g = h ? l.call(e, f, h) : l.call(e, f);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function m(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ds = Qn.Stream, hd = pd;
function pd(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Ds.call(this);
    var o = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), a = 0, c = s.length; a < c; a++) {
      var m = s[a];
      this[m] = i[m];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, f) {
      if (l) {
        o.emit("error", l), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    Ds.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
      var c = o[s];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var md = Ed, gd = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Ed(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: gd(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var re = At, yd = fd, wd = hd, _d = md, _r = Po, ye, qr;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ye = Symbol.for("graceful-fs.queue"), qr = Symbol.for("graceful-fs.previous")) : (ye = "___graceful-fs.queue", qr = "___graceful-fs.previous");
function vd() {
}
function xl(e, t) {
  Object.defineProperty(e, ye, {
    get: function() {
      return t;
    }
  });
}
var Lt = vd;
_r.debuglog ? Lt = _r.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Lt = function() {
  var e = _r.format.apply(_r, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!re[ye]) {
  var Ad = Oe[ye] || [];
  xl(re, Ad), re.close = function(e) {
    function t(n, r) {
      return e.call(re, n, function(i) {
        i || Fs(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, qr, {
      value: e
    }), t;
  }(re.close), re.closeSync = function(e) {
    function t(n) {
      e.apply(re, arguments), Fs();
    }
    return Object.defineProperty(t, qr, {
      value: e
    }), t;
  }(re.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Lt(re[ye]), Pl.equal(re[ye].length, 0);
  });
}
Oe[ye] || xl(Oe, re[ye]);
var Re = No(_d(re));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !re.__patched && (Re = No(re), re.__patched = !0);
function No(e) {
  yd(e), e.gracefulify = No, e.createReadStream = q, e.createWriteStream = J;
  var t = e.readFile;
  e.readFile = n;
  function n(U, y, j) {
    return typeof y == "function" && (j = y, y = null), Y(U, y, j);
    function Y(ee, I, O, P) {
      return t(ee, I, function(b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE") ? zt([Y, [ee, I, O], b, P || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(U, y, j, Y) {
    return typeof j == "function" && (Y = j, j = null), ee(U, y, j, Y);
    function ee(I, O, P, b, N) {
      return r(I, O, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? zt([ee, [I, O, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(U, y, j, Y) {
    return typeof j == "function" && (Y = j, j = null), ee(U, y, j, Y);
    function ee(I, O, P, b, N) {
      return o(I, O, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? zt([ee, [I, O, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = c);
  function c(U, y, j, Y) {
    return typeof j == "function" && (Y = j, j = 0), ee(U, y, j, Y);
    function ee(I, O, P, b, N) {
      return a(I, O, P, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? zt([ee, [I, O, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = f;
  var l = /^v[0-5]\./;
  function f(U, y, j) {
    typeof y == "function" && (j = y, y = null);
    var Y = l.test(process.version) ? function(O, P, b, N) {
      return m(O, ee(
        O,
        P,
        b,
        N
      ));
    } : function(O, P, b, N) {
      return m(O, P, ee(
        O,
        P,
        b,
        N
      ));
    };
    return Y(U, y, j);
    function ee(I, O, P, b) {
      return function(N, R) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? zt([
          Y,
          [I, O, P],
          N,
          b || Date.now(),
          Date.now()
        ]) : (R && R.sort && R.sort(), typeof P == "function" && P.call(this, N, R));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = wd(e);
    T = h.ReadStream, D = h.WriteStream;
  }
  var g = e.ReadStream;
  g && (T.prototype = Object.create(g.prototype), T.prototype.open = $);
  var _ = e.WriteStream;
  _ && (D.prototype = Object.create(_.prototype), D.prototype.open = B), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return T;
    },
    set: function(U) {
      T = U;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return D;
    },
    set: function(U) {
      D = U;
    },
    enumerable: !0,
    configurable: !0
  });
  var E = T;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return E;
    },
    set: function(U) {
      E = U;
    },
    enumerable: !0,
    configurable: !0
  });
  var A = D;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return A;
    },
    set: function(U) {
      A = U;
    },
    enumerable: !0,
    configurable: !0
  });
  function T(U, y) {
    return this instanceof T ? (g.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function $() {
    var U = this;
    oe(U.path, U.flags, U.mode, function(y, j) {
      y ? (U.autoClose && U.destroy(), U.emit("error", y)) : (U.fd = j, U.emit("open", j), U.read());
    });
  }
  function D(U, y) {
    return this instanceof D ? (_.apply(this, arguments), this) : D.apply(Object.create(D.prototype), arguments);
  }
  function B() {
    var U = this;
    oe(U.path, U.flags, U.mode, function(y, j) {
      y ? (U.destroy(), U.emit("error", y)) : (U.fd = j, U.emit("open", j));
    });
  }
  function q(U, y) {
    return new e.ReadStream(U, y);
  }
  function J(U, y) {
    return new e.WriteStream(U, y);
  }
  var Q = e.open;
  e.open = oe;
  function oe(U, y, j, Y) {
    return typeof j == "function" && (Y = j, j = null), ee(U, y, j, Y);
    function ee(I, O, P, b, N) {
      return Q(I, O, P, function(R, k) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? zt([ee, [I, O, P, b], R, N || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  return e;
}
function zt(e) {
  Lt("ENQUEUE", e[0].name, e[1]), re[ye].push(e), Do();
}
var vr;
function Fs() {
  for (var e = Date.now(), t = 0; t < re[ye].length; ++t)
    re[ye][t].length > 2 && (re[ye][t][3] = e, re[ye][t][4] = e);
  Do();
}
function Do() {
  if (clearTimeout(vr), vr = void 0, re[ye].length !== 0) {
    var e = re[ye].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Lt("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      Lt("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, c = Math.max(o - i, 1), m = Math.min(c * 1.2, 100);
      a >= m ? (Lt("RETRY", t.name, n), t.apply(null, n.concat([i]))) : re[ye].push(e);
    }
    vr === void 0 && (vr = setTimeout(Do, 0));
  }
}
(function(e) {
  const t = Ie.fromCallback, n = Re, r = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof n[i] == "function");
  Object.assign(e, n), r.forEach((i) => {
    e[i] = t(n[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? n.exists(i, o) : new Promise((s) => n.exists(i, s));
  }, e.read = function(i, o, s, a, c, m) {
    return typeof m == "function" ? n.read(i, o, s, a, c, m) : new Promise((l, f) => {
      n.read(i, o, s, a, c, (h, g, _) => {
        if (h) return f(h);
        l({ bytesRead: g, buffer: _ });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, o, ...s) : new Promise((a, c) => {
      n.write(i, o, ...s, (m, l, f) => {
        if (m) return c(m);
        a({ bytesWritten: l, buffer: f });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, o, ...s) : new Promise((a, c) => {
      n.writev(i, o, ...s, (m, l, f) => {
        if (m) return c(m);
        a({ bytesWritten: l, buffers: f });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Bt);
var Fo = {}, Ll = {};
const Td = Z;
Ll.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Td.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const Ul = Bt, { checkPath: kl } = Ll, Ml = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Fo.makeDir = async (e, t) => (kl(e), Ul.mkdir(e, {
  mode: Ml(t),
  recursive: !0
}));
Fo.makeDirSync = (e, t) => (kl(e), Ul.mkdirSync(e, {
  mode: Ml(t),
  recursive: !0
}));
const Sd = Ie.fromPromise, { makeDir: Cd, makeDirSync: Ni } = Fo, Di = Sd(Cd);
var et = {
  mkdirs: Di,
  mkdirsSync: Ni,
  // alias
  mkdirp: Di,
  mkdirpSync: Ni,
  ensureDir: Di,
  ensureDirSync: Ni
};
const bd = Ie.fromPromise, Bl = Bt;
function Od(e) {
  return Bl.access(e).then(() => !0).catch(() => !1);
}
var Ht = {
  pathExists: bd(Od),
  pathExistsSync: Bl.existsSync
};
const an = Re;
function $d(e, t, n, r) {
  an.open(e, "r+", (i, o) => {
    if (i) return r(i);
    an.futimes(o, t, n, (s) => {
      an.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function Id(e, t, n) {
  const r = an.openSync(e, "r+");
  return an.futimesSync(r, t, n), an.closeSync(r);
}
var Hl = {
  utimesMillis: $d,
  utimesMillisSync: Id
};
const fn = Bt, me = Z, Rd = Po;
function Pd(e, t, n) {
  const r = n.dereference ? (i) => fn.stat(i, { bigint: !0 }) : (i) => fn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function Nd(e, t, n) {
  let r;
  const i = n.dereference ? (s) => fn.statSync(s, { bigint: !0 }) : (s) => fn.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function Dd(e, t, n, r, i) {
  Rd.callbackify(Pd)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: c } = s;
    if (c) {
      if (er(a, c)) {
        const m = me.basename(e), l = me.basename(t);
        return n === "move" && m !== l && m.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: a, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && xo(e, t) ? i(new Error(ni(e, t, n))) : i(null, { srcStat: a, destStat: c });
  });
}
function Fd(e, t, n, r) {
  const { srcStat: i, destStat: o } = Nd(e, t, r);
  if (o) {
    if (er(i, o)) {
      const s = me.basename(e), a = me.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && xo(e, t))
    throw new Error(ni(e, t, n));
  return { srcStat: i, destStat: o };
}
function jl(e, t, n, r, i) {
  const o = me.resolve(me.dirname(e)), s = me.resolve(me.dirname(n));
  if (s === o || s === me.parse(s).root) return i();
  fn.stat(s, { bigint: !0 }, (a, c) => a ? a.code === "ENOENT" ? i() : i(a) : er(t, c) ? i(new Error(ni(e, n, r))) : jl(e, t, s, r, i));
}
function ql(e, t, n, r) {
  const i = me.resolve(me.dirname(e)), o = me.resolve(me.dirname(n));
  if (o === i || o === me.parse(o).root) return;
  let s;
  try {
    s = fn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (er(t, s))
    throw new Error(ni(e, n, r));
  return ql(e, t, o, r);
}
function er(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function xo(e, t) {
  const n = me.resolve(e).split(me.sep).filter((i) => i), r = me.resolve(t).split(me.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function ni(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var mn = {
  checkPaths: Dd,
  checkPathsSync: Fd,
  checkParentPaths: jl,
  checkParentPathsSync: ql,
  isSrcSubdir: xo,
  areIdentical: er
};
const De = Re, Un = Z, xd = et.mkdirs, Ld = Ht.pathExists, Ud = Hl.utimesMillis, kn = mn;
function kd(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), kn.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    kn.checkParentPaths(e, s, t, "copy", (c) => c ? r(c) : n.filter ? Gl(xs, a, e, t, n, r) : xs(a, e, t, n, r));
  });
}
function xs(e, t, n, r, i) {
  const o = Un.dirname(n);
  Ld(o, (s, a) => {
    if (s) return i(s);
    if (a) return Gr(e, t, n, r, i);
    xd(o, (c) => c ? i(c) : Gr(e, t, n, r, i));
  });
}
function Gl(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function Md(e, t, n, r, i) {
  return r.filter ? Gl(Gr, e, t, n, r, i) : Gr(e, t, n, r, i);
}
function Gr(e, t, n, r, i) {
  (r.dereference ? De.stat : De.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Wd(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? Bd(a, e, t, n, r, i) : a.isSymbolicLink() ? Xd(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Bd(e, t, n, r, i, o) {
  return t ? Hd(e, n, r, i, o) : Vl(e, n, r, i, o);
}
function Hd(e, t, n, r, i) {
  if (r.overwrite)
    De.unlink(n, (o) => o ? i(o) : Vl(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function Vl(e, t, n, r, i) {
  De.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? jd(e.mode, t, n, i) : ri(n, e.mode, i));
}
function jd(e, t, n, r) {
  return qd(e) ? Gd(n, e, (i) => i ? r(i) : Ls(e, t, n, r)) : Ls(e, t, n, r);
}
function qd(e) {
  return (e & 128) === 0;
}
function Gd(e, t, n) {
  return ri(e, t | 128, n);
}
function Ls(e, t, n, r) {
  Vd(t, n, (i) => i ? r(i) : ri(n, e, r));
}
function ri(e, t, n) {
  return De.chmod(e, t, n);
}
function Vd(e, t, n) {
  De.stat(e, (r, i) => r ? n(r) : Ud(t, i.atime, i.mtime, n));
}
function Wd(e, t, n, r, i, o) {
  return t ? Wl(n, r, i, o) : Yd(e.mode, n, r, i, o);
}
function Yd(e, t, n, r, i) {
  De.mkdir(n, (o) => {
    if (o) return i(o);
    Wl(t, n, r, (s) => s ? i(s) : ri(n, e, i));
  });
}
function Wl(e, t, n, r) {
  De.readdir(e, (i, o) => i ? r(i) : Yl(o, e, t, n, r));
}
function Yl(e, t, n, r, i) {
  const o = e.pop();
  return o ? zd(e, o, t, n, r, i) : i();
}
function zd(e, t, n, r, i, o) {
  const s = Un.join(n, t), a = Un.join(r, t);
  kn.checkPaths(s, a, "copy", i, (c, m) => {
    if (c) return o(c);
    const { destStat: l } = m;
    Md(l, s, a, i, (f) => f ? o(f) : Yl(e, n, r, i, o));
  });
}
function Xd(e, t, n, r, i) {
  De.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = Un.resolve(process.cwd(), s)), e)
      De.readlink(n, (a, c) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? De.symlink(s, n, i) : i(a) : (r.dereference && (c = Un.resolve(process.cwd(), c)), kn.isSrcSubdir(s, c) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && kn.isSrcSubdir(c, s) ? i(new Error(`Cannot overwrite '${c}' with '${s}'.`)) : Kd(s, n, i)));
    else
      return De.symlink(s, n, i);
  });
}
function Kd(e, t, n) {
  De.unlink(t, (r) => r ? n(r) : De.symlink(e, t, n));
}
var Jd = kd;
const Se = Re, Mn = Z, Qd = et.mkdirsSync, Zd = Hl.utimesMillisSync, Bn = mn;
function eh(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = Bn.checkPathsSync(e, t, "copy", n);
  return Bn.checkParentPathsSync(e, r, t, "copy"), th(i, e, t, n);
}
function th(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = Mn.dirname(n);
  return Se.existsSync(i) || Qd(i), zl(e, t, n, r);
}
function nh(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return zl(e, t, n, r);
}
function zl(e, t, n, r) {
  const o = (r.dereference ? Se.statSync : Se.lstatSync)(t);
  if (o.isDirectory()) return ch(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return rh(o, e, t, n, r);
  if (o.isSymbolicLink()) return dh(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function rh(e, t, n, r, i) {
  return t ? ih(e, n, r, i) : Xl(e, n, r, i);
}
function ih(e, t, n, r) {
  if (r.overwrite)
    return Se.unlinkSync(n), Xl(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function Xl(e, t, n, r) {
  return Se.copyFileSync(t, n), r.preserveTimestamps && oh(e.mode, t, n), Lo(n, e.mode);
}
function oh(e, t, n) {
  return sh(e) && ah(n, e), lh(t, n);
}
function sh(e) {
  return (e & 128) === 0;
}
function ah(e, t) {
  return Lo(e, t | 128);
}
function Lo(e, t) {
  return Se.chmodSync(e, t);
}
function lh(e, t) {
  const n = Se.statSync(e);
  return Zd(t, n.atime, n.mtime);
}
function ch(e, t, n, r, i) {
  return t ? Kl(n, r, i) : uh(e.mode, n, r, i);
}
function uh(e, t, n, r) {
  return Se.mkdirSync(n), Kl(t, n, r), Lo(n, e);
}
function Kl(e, t, n) {
  Se.readdirSync(e).forEach((r) => fh(r, e, t, n));
}
function fh(e, t, n, r) {
  const i = Mn.join(t, e), o = Mn.join(n, e), { destStat: s } = Bn.checkPathsSync(i, o, "copy", r);
  return nh(s, i, o, r);
}
function dh(e, t, n, r) {
  let i = Se.readlinkSync(t);
  if (r.dereference && (i = Mn.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Se.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Se.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = Mn.resolve(process.cwd(), o)), Bn.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Se.statSync(n).isDirectory() && Bn.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return hh(i, n);
  } else
    return Se.symlinkSync(i, n);
}
function hh(e, t) {
  return Se.unlinkSync(t), Se.symlinkSync(e, t);
}
var ph = eh;
const mh = Ie.fromCallback;
var Uo = {
  copy: mh(Jd),
  copySync: ph
};
const Us = Re, Jl = Z, X = Pl, Hn = process.platform === "win32";
function Ql(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Us[n], n = n + "Sync", e[n] = e[n] || Us[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function ko(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), X(e, "rimraf: missing path"), X.strictEqual(typeof e, "string", "rimraf: path should be a string"), X.strictEqual(typeof n, "function", "rimraf: callback function required"), X(t, "rimraf: invalid options argument provided"), X.strictEqual(typeof t, "object", "rimraf: options should be object"), Ql(t), ks(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => ks(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function ks(e, t, n) {
  X(e), X(t), X(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Hn)
      return Ms(e, t, r, n);
    if (i && i.isDirectory())
      return kr(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return Hn ? Ms(e, t, o, n) : kr(e, t, o, n);
        if (o.code === "EISDIR")
          return kr(e, t, o, n);
      }
      return n(o);
    });
  });
}
function Ms(e, t, n, r) {
  X(e), X(t), X(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? kr(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function Bs(e, t, n) {
  let r;
  X(e), X(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  try {
    r = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  r.isDirectory() ? Mr(e, t, n) : t.unlinkSync(e);
}
function kr(e, t, n, r) {
  X(e), X(t), X(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? gh(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function gh(e, t, n) {
  X(e), X(t), X(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      ko(Jl.join(e, a), t, (c) => {
        if (!s) {
          if (c) return n(s = c);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function Zl(e, t) {
  let n;
  t = t || {}, Ql(t), X(e, "rimraf: missing path"), X.strictEqual(typeof e, "string", "rimraf: path should be a string"), X(t, "rimraf: missing options"), X.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Hn && Bs(e, t, r);
  }
  try {
    n && n.isDirectory() ? Mr(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Hn ? Bs(e, t, r) : Mr(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Mr(e, t, r);
  }
}
function Mr(e, t, n) {
  X(e), X(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Eh(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Eh(e, t) {
  if (X(e), X(t), t.readdirSync(e).forEach((n) => Zl(Jl.join(e, n), t)), Hn) {
    const n = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - n < 500);
  } else
    return t.rmdirSync(e, t);
}
var yh = ko;
ko.sync = Zl;
const Vr = Re, wh = Ie.fromCallback, ec = yh;
function _h(e, t) {
  if (Vr.rm) return Vr.rm(e, { recursive: !0, force: !0 }, t);
  ec(e, t);
}
function vh(e) {
  if (Vr.rmSync) return Vr.rmSync(e, { recursive: !0, force: !0 });
  ec.sync(e);
}
var ii = {
  remove: wh(_h),
  removeSync: vh
};
const Ah = Ie.fromPromise, tc = Bt, nc = Z, rc = et, ic = ii, Hs = Ah(async function(t) {
  let n;
  try {
    n = await tc.readdir(t);
  } catch {
    return rc.mkdirs(t);
  }
  return Promise.all(n.map((r) => ic.remove(nc.join(t, r))));
});
function js(e) {
  let t;
  try {
    t = tc.readdirSync(e);
  } catch {
    return rc.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = nc.join(e, n), ic.removeSync(n);
  });
}
var Th = {
  emptyDirSync: js,
  emptydirSync: js,
  emptyDir: Hs,
  emptydir: Hs
};
const Sh = Ie.fromCallback, oc = Z, pt = Re, sc = et;
function Ch(e, t) {
  function n() {
    pt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  pt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = oc.dirname(e);
    pt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? sc.mkdirs(o, (c) => {
          if (c) return t(c);
          n();
        }) : t(s);
      a.isDirectory() ? n() : pt.readdir(o, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function bh(e) {
  let t;
  try {
    t = pt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = oc.dirname(e);
  try {
    pt.statSync(n).isDirectory() || pt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") sc.mkdirsSync(n);
    else throw r;
  }
  pt.writeFileSync(e, "");
}
var Oh = {
  createFile: Sh(Ch),
  createFileSync: bh
};
const $h = Ie.fromCallback, ac = Z, ht = Re, lc = et, Ih = Ht.pathExists, { areIdentical: cc } = mn;
function Rh(e, t, n) {
  function r(i, o) {
    ht.link(i, o, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  ht.lstat(t, (i, o) => {
    ht.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (o && cc(a, o)) return n(null);
      const c = ac.dirname(t);
      Ih(c, (m, l) => {
        if (m) return n(m);
        if (l) return r(e, t);
        lc.mkdirs(c, (f) => {
          if (f) return n(f);
          r(e, t);
        });
      });
    });
  });
}
function Ph(e, t) {
  let n;
  try {
    n = ht.lstatSync(t);
  } catch {
  }
  try {
    const o = ht.lstatSync(e);
    if (n && cc(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = ac.dirname(t);
  return ht.existsSync(r) || lc.mkdirsSync(r), ht.linkSync(e, t);
}
var Nh = {
  createLink: $h(Rh),
  createLinkSync: Ph
};
const mt = Z, Dn = Re, Dh = Ht.pathExists;
function Fh(e, t, n) {
  if (mt.isAbsolute(e))
    return Dn.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = mt.dirname(t), i = mt.join(r, e);
    return Dh(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : Dn.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: mt.relative(r, e)
    })));
  }
}
function xh(e, t) {
  let n;
  if (mt.isAbsolute(e)) {
    if (n = Dn.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = mt.dirname(t), i = mt.join(r, e);
    if (n = Dn.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = Dn.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: mt.relative(r, e)
    };
  }
}
var Lh = {
  symlinkPaths: Fh,
  symlinkPathsSync: xh
};
const uc = Re;
function Uh(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  uc.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function kh(e, t) {
  let n;
  if (t) return t;
  try {
    n = uc.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var Mh = {
  symlinkType: Uh,
  symlinkTypeSync: kh
};
const Bh = Ie.fromCallback, fc = Z, Ge = Bt, dc = et, Hh = dc.mkdirs, jh = dc.mkdirsSync, hc = Lh, qh = hc.symlinkPaths, Gh = hc.symlinkPathsSync, pc = Mh, Vh = pc.symlinkType, Wh = pc.symlinkTypeSync, Yh = Ht.pathExists, { areIdentical: mc } = mn;
function zh(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, Ge.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Ge.stat(e),
      Ge.stat(t)
    ]).then(([s, a]) => {
      if (mc(s, a)) return r(null);
      qs(e, t, n, r);
    }) : qs(e, t, n, r);
  });
}
function qs(e, t, n, r) {
  qh(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, Vh(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const c = fc.dirname(t);
      Yh(c, (m, l) => {
        if (m) return r(m);
        if (l) return Ge.symlink(e, t, a, r);
        Hh(c, (f) => {
          if (f) return r(f);
          Ge.symlink(e, t, a, r);
        });
      });
    });
  });
}
function Xh(e, t, n) {
  let r;
  try {
    r = Ge.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = Ge.statSync(e), c = Ge.statSync(t);
    if (mc(a, c)) return;
  }
  const i = Gh(e, t);
  e = i.toDst, n = Wh(i.toCwd, n);
  const o = fc.dirname(t);
  return Ge.existsSync(o) || jh(o), Ge.symlinkSync(e, t, n);
}
var Kh = {
  createSymlink: Bh(zh),
  createSymlinkSync: Xh
};
const { createFile: Gs, createFileSync: Vs } = Oh, { createLink: Ws, createLinkSync: Ys } = Nh, { createSymlink: zs, createSymlinkSync: Xs } = Kh;
var Jh = {
  // file
  createFile: Gs,
  createFileSync: Vs,
  ensureFile: Gs,
  ensureFileSync: Vs,
  // link
  createLink: Ws,
  createLinkSync: Ys,
  ensureLink: Ws,
  ensureLinkSync: Ys,
  // symlink
  createSymlink: zs,
  createSymlinkSync: Xs,
  ensureSymlink: zs,
  ensureSymlinkSync: Xs
};
function Qh(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function Zh(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Mo = { stringify: Qh, stripBom: Zh };
let dn;
try {
  dn = Re;
} catch {
  dn = At;
}
const oi = Ie, { stringify: gc, stripBom: Ec } = Mo;
async function ep(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || dn, r = "throws" in t ? t.throws : !0;
  let i = await oi.fromCallback(n.readFile)(e, t);
  i = Ec(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (r)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return o;
}
const tp = oi.fromPromise(ep);
function np(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || dn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Ec(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function rp(e, t, n = {}) {
  const r = n.fs || dn, i = gc(t, n);
  await oi.fromCallback(r.writeFile)(e, i, n);
}
const ip = oi.fromPromise(rp);
function op(e, t, n = {}) {
  const r = n.fs || dn, i = gc(t, n);
  return r.writeFileSync(e, i, n);
}
var sp = {
  readFile: tp,
  readFileSync: np,
  writeFile: ip,
  writeFileSync: op
};
const Ar = sp;
var ap = {
  // jsonfile exports
  readJson: Ar.readFile,
  readJsonSync: Ar.readFileSync,
  writeJson: Ar.writeFile,
  writeJsonSync: Ar.writeFileSync
};
const lp = Ie.fromCallback, Fn = Re, yc = Z, wc = et, cp = Ht.pathExists;
function up(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = yc.dirname(e);
  cp(i, (o, s) => {
    if (o) return r(o);
    if (s) return Fn.writeFile(e, t, n, r);
    wc.mkdirs(i, (a) => {
      if (a) return r(a);
      Fn.writeFile(e, t, n, r);
    });
  });
}
function fp(e, ...t) {
  const n = yc.dirname(e);
  if (Fn.existsSync(n))
    return Fn.writeFileSync(e, ...t);
  wc.mkdirsSync(n), Fn.writeFileSync(e, ...t);
}
var Bo = {
  outputFile: lp(up),
  outputFileSync: fp
};
const { stringify: dp } = Mo, { outputFile: hp } = Bo;
async function pp(e, t, n = {}) {
  const r = dp(t, n);
  await hp(e, r, n);
}
var mp = pp;
const { stringify: gp } = Mo, { outputFileSync: Ep } = Bo;
function yp(e, t, n) {
  const r = gp(t, n);
  Ep(e, r, n);
}
var wp = yp;
const _p = Ie.fromPromise, $e = ap;
$e.outputJson = _p(mp);
$e.outputJsonSync = wp;
$e.outputJSON = $e.outputJson;
$e.outputJSONSync = $e.outputJsonSync;
$e.writeJSON = $e.writeJson;
$e.writeJSONSync = $e.writeJsonSync;
$e.readJSON = $e.readJson;
$e.readJSONSync = $e.readJsonSync;
var vp = $e;
const Ap = Re, mo = Z, Tp = Uo.copy, _c = ii.remove, Sp = et.mkdirp, Cp = Ht.pathExists, Ks = mn;
function bp(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  Ks.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: c = !1 } = s;
    Ks.checkParentPaths(e, a, t, "move", (m) => {
      if (m) return r(m);
      if (Op(t)) return Js(e, t, i, c, r);
      Sp(mo.dirname(t), (l) => l ? r(l) : Js(e, t, i, c, r));
    });
  });
}
function Op(e) {
  const t = mo.dirname(e);
  return mo.parse(t).root === t;
}
function Js(e, t, n, r, i) {
  if (r) return Fi(e, t, n, i);
  if (n)
    return _c(t, (o) => o ? i(o) : Fi(e, t, n, i));
  Cp(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : Fi(e, t, n, i));
}
function Fi(e, t, n, r) {
  Ap.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : $p(e, t, n, r) : r());
}
function $p(e, t, n, r) {
  Tp(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : _c(e, r));
}
var Ip = bp;
const vc = Re, go = Z, Rp = Uo.copySync, Ac = ii.removeSync, Pp = et.mkdirpSync, Qs = mn;
function Np(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Qs.checkPathsSync(e, t, "move", n);
  return Qs.checkParentPathsSync(e, i, t, "move"), Dp(t) || Pp(go.dirname(t)), Fp(e, t, r, o);
}
function Dp(e) {
  const t = go.dirname(e);
  return go.parse(t).root === t;
}
function Fp(e, t, n, r) {
  if (r) return xi(e, t, n);
  if (n)
    return Ac(t), xi(e, t, n);
  if (vc.existsSync(t)) throw new Error("dest already exists.");
  return xi(e, t, n);
}
function xi(e, t, n) {
  try {
    vc.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return xp(e, t, n);
  }
}
function xp(e, t, n) {
  return Rp(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Ac(e);
}
var Lp = Np;
const Up = Ie.fromCallback;
var kp = {
  move: Up(Ip),
  moveSync: Lp
}, St = {
  // Export promiseified graceful-fs:
  ...Bt,
  // Export extra methods:
  ...Uo,
  ...Th,
  ...Jh,
  ...vp,
  ...et,
  ...kp,
  ...Bo,
  ...Ht,
  ...ii
}, jt = {}, yt = {}, he = {}, wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.CancellationError = wt.CancellationToken = void 0;
const Mp = Nl;
class Bp extends Mp.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Eo());
    const n = () => {
      if (r != null)
        try {
          this.removeListener("cancel", r), r = null;
        } catch {
        }
    };
    let r = null;
    return new Promise((i, o) => {
      let s = null;
      if (r = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          o(new Eo());
        }
      }, this.cancelled) {
        r();
        return;
      }
      this.onCancel(r), t(i, o, (a) => {
        s = a;
      });
    }).then((i) => (n(), i)).catch((i) => {
      throw n(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
wt.CancellationToken = Bp;
class Eo extends Error {
  constructor() {
    super("cancelled");
  }
}
wt.CancellationError = Eo;
var gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.newError = Hp;
function Hp(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var de = {}, yo = { exports: {} }, Tr = { exports: {} }, Li, Zs;
function jp() {
  if (Zs) return Li;
  Zs = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  Li = function(l, f) {
    f = f || {};
    var h = typeof l;
    if (h === "string" && l.length > 0)
      return s(l);
    if (h === "number" && isFinite(l))
      return f.long ? c(l) : a(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function s(l) {
    if (l = String(l), !(l.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (f) {
        var h = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var f = Math.abs(l);
    return f >= r ? Math.round(l / r) + "d" : f >= n ? Math.round(l / n) + "h" : f >= t ? Math.round(l / t) + "m" : f >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= r ? m(l, f, r, "day") : f >= n ? m(l, f, n, "hour") : f >= t ? m(l, f, t, "minute") : f >= e ? m(l, f, e, "second") : l + " ms";
  }
  function m(l, f, h, g) {
    var _ = f >= h * 1.5;
    return Math.round(l / h) + " " + g + (_ ? "s" : "");
  }
  return Li;
}
var Ui, ea;
function Tc() {
  if (ea) return Ui;
  ea = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = m, r.disable = a, r.enable = o, r.enabled = c, r.humanize = jp(), r.destroy = l, Object.keys(t).forEach((f) => {
      r[f] = t[f];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(f) {
      let h = 0;
      for (let g = 0; g < f.length; g++)
        h = (h << 5) - h + f.charCodeAt(g), h |= 0;
      return r.colors[Math.abs(h) % r.colors.length];
    }
    r.selectColor = n;
    function r(f) {
      let h, g = null, _, E;
      function A(...T) {
        if (!A.enabled)
          return;
        const $ = A, D = Number(/* @__PURE__ */ new Date()), B = D - (h || D);
        $.diff = B, $.prev = h, $.curr = D, h = D, T[0] = r.coerce(T[0]), typeof T[0] != "string" && T.unshift("%O");
        let q = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, (Q, oe) => {
          if (Q === "%%")
            return "%";
          q++;
          const U = r.formatters[oe];
          if (typeof U == "function") {
            const y = T[q];
            Q = U.call($, y), T.splice(q, 1), q--;
          }
          return Q;
        }), r.formatArgs.call($, T), ($.log || r.log).apply($, T);
      }
      return A.namespace = f, A.useColors = r.useColors(), A.color = r.selectColor(f), A.extend = i, A.destroy = r.destroy, Object.defineProperty(A, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (_ !== r.namespaces && (_ = r.namespaces, E = r.enabled(f)), E),
        set: (T) => {
          g = T;
        }
      }), typeof r.init == "function" && r.init(A), A;
    }
    function i(f, h) {
      const g = r(this.namespace + (typeof h > "u" ? ":" : h) + f);
      return g.log = this.log, g;
    }
    function o(f) {
      r.save(f), r.namespaces = f, r.names = [], r.skips = [];
      const h = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const g of h)
        g[0] === "-" ? r.skips.push(g.slice(1)) : r.names.push(g);
    }
    function s(f, h) {
      let g = 0, _ = 0, E = -1, A = 0;
      for (; g < f.length; )
        if (_ < h.length && (h[_] === f[g] || h[_] === "*"))
          h[_] === "*" ? (E = _, A = g, _++) : (g++, _++);
        else if (E !== -1)
          _ = E + 1, A++, g = A;
        else
          return !1;
      for (; _ < h.length && h[_] === "*"; )
        _++;
      return _ === h.length;
    }
    function a() {
      const f = [
        ...r.names,
        ...r.skips.map((h) => "-" + h)
      ].join(",");
      return r.enable(""), f;
    }
    function c(f) {
      for (const h of r.skips)
        if (s(f, h))
          return !1;
      for (const h of r.names)
        if (s(f, h))
          return !0;
      return !1;
    }
    function m(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Ui = e, Ui;
}
var ta;
function qp() {
  return ta || (ta = 1, function(e, t) {
    t.formatArgs = r, t.save = i, t.load = o, t.useColors = n, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      c.splice(1, 0, m, "color: inherit");
      let l = 0, f = 0;
      c[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (l++, h === "%c" && (f = l));
      }), c.splice(f, 0, m);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Tc()(t);
    const { formatters: a } = e.exports;
    a.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(Tr, Tr.exports)), Tr.exports;
}
var Sr = { exports: {} }, ki, na;
function Gp() {
  return na || (na = 1, ki = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), ki;
}
var Mi, ra;
function Vp() {
  if (ra) return Mi;
  ra = 1;
  const e = ti, t = Dl, n = Gp(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function o(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function s(c, m) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !m && i === void 0)
      return 0;
    const l = i || 0;
    if (r.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in r) || r.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const f = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : l;
  }
  function a(c) {
    const m = s(c, c && c.isTTY);
    return o(m);
  }
  return Mi = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, Mi;
}
var ia;
function Wp() {
  return ia || (ia = 1, function(e, t) {
    const n = Dl, r = Po;
    t.init = l, t.log = a, t.formatArgs = o, t.save = c, t.load = m, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = Vp();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, g) => {
      const _ = g.substring(6).toLowerCase().replace(/_([a-z])/g, (A, T) => T.toUpperCase());
      let E = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), h[_] = E, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: g, useColors: _ } = this;
      if (_) {
        const E = this.color, A = "\x1B[3" + (E < 8 ? E : "8;5;" + E), T = `  ${A};1m${g} \x1B[0m`;
        h[0] = T + h[0].split(`
`).join(`
` + T), h.push(A + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = s() + g + " " + h[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...h) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function c(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function l(h) {
      h.inspectOpts = {};
      const g = Object.keys(t.inspectOpts);
      for (let _ = 0; _ < g.length; _++)
        h.inspectOpts[g[_]] = t.inspectOpts[g[_]];
    }
    e.exports = Tc()(t);
    const { formatters: f } = e.exports;
    f.o = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, f.O = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts);
    };
  }(Sr, Sr.exports)), Sr.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? yo.exports = qp() : yo.exports = Wp();
var Yp = yo.exports, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.ProgressCallbackTransform = void 0;
const zp = Qn;
class Xp extends zp.Transform {
  constructor(t, n, r) {
    super(), this.total = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
tr.ProgressCallbackTransform = Xp;
Object.defineProperty(de, "__esModule", { value: !0 });
de.DigestTransform = de.HttpExecutor = de.HttpError = void 0;
de.addSensitiveRedirectHeader = nm;
de.addSensitiveFieldPattern = rm;
de.createHttpError = _o;
de.parseJson = om;
de.configureRequestOptionsFromUrl = $c;
de.configureRequestUrl = qo;
de.safeGetHeader = ln;
de.configureRequestOptions = Wr;
de.isSensitiveFieldName = Ic;
de.hashSensitiveValue = Rc;
de.safeStringifyJson = tn;
const Sc = Zn, Kp = Yp, Jp = At, Qp = Qn, wo = Tt, Zp = wt, oa = gn, em = tr, ft = (0, Kp.default)("electron-builder"), Ho = (e) => e.toLowerCase().replace(/[-_]/g, ""), Cc = /* @__PURE__ */ new Set(["authorization", "proxyauthorization", "privatetoken", "xapikey", "xauthtoken", "xaccesstoken", "xgitlabtoken", "cookie", "xcsrftoken"]), bc = ["token", "password", "secret", "authorization", "credential", "apikey", "passphrase", "auth"], tm = ["key"];
function nm(e) {
  Cc.add(Ho(e));
}
function rm(e) {
  bc.push(e.toLowerCase().replace(/[-_]/g, ""));
}
function _o(e, t = null) {
  return new jo(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + tn(e.headers), t);
}
const im = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class jo extends Error {
  constructor(t, n = `HTTP error: ${im.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
de.HttpError = jo;
function om(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class en {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new Zp.CancellationToken(), r) {
    Wr(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      ft.enabled && ft(tn(r));
      const { headers: s, ...a } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...s
        },
        ...a
      };
    }
    return this.doApiRequest(t, n, (s) => s.end(o));
  }
  doApiRequest(t, n, r, i = 0) {
    if (ft.enabled) {
      const { headers: o, auth: s, ...a } = t;
      ft(`Request: ${tn(a)}`);
    }
    return n.createPromise((o, s, a) => {
      const c = this.createRequest(t, (m) => {
        try {
          this.handleResponse(m, t, n, o, s, i, r);
        } catch (l) {
          s(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, s, t.timeout), this.addRedirectHandlers(c, t, s, i, (m) => {
        this.doApiRequest(m, n, r, i).then(o).catch(s);
      }), r(c, s), a(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, n, r, i, o) {
  }
  addErrorAndTimeoutHandlers(t, n, r = 60 * 1e3) {
    this.addTimeOutHandler(t, n, r), t.on("error", n), t.on("aborted", () => {
      n(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, n, r, i, o, s, a) {
    var c;
    if (ft.enabled) {
      const { headers: g, auth: _, ...E } = n;
      ft(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${tn(E)}`);
    }
    if (t.statusCode === 404) {
      o(_o(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const m = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = m >= 300 && m < 400, f = ln(t, "location");
    if (l && f != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(en.prepareRedirectUrlOptions(f, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (g) => h += g), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const g = ln(t, "content-type"), _ = g != null && (Array.isArray(g) ? g.find((E) => E.includes("json")) != null : g.includes("json"));
          o(_o(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${_ ? tn(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (g) {
        o(g);
      }
    });
  }
  async downloadToBuffer(t, n) {
    return await n.cancellationToken.createPromise((r, i, o) => {
      const s = [], a = {
        headers: n.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      qo(t, a), Wr(a), this.doDownload(a, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (c) => {
          c == null ? r(Buffer.concat(s)) : i(c);
        },
        responseHandler: (c, m) => {
          let l = 0;
          c.on("data", (f) => {
            if (l += f.length, l > 524288e3) {
              m(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(f);
          }), c.on("end", () => {
            m(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, n, r) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        n.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", n.callback);
      const s = ln(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(en.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? am(n, o) : n.responseHandler(o, n.callback);
    });
    this.addErrorAndTimeoutHandlers(i, n.callback, t.timeout), this.addRedirectHandlers(i, t, n.callback, r, (o) => {
      this.doDownload(o, n, r++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, n, r) {
    t.on("socket", (i) => {
      i.setTimeout(r, () => {
        t.abort(), n(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, n) {
    const r = $c(t, { ...n }), i = r.headers;
    if (i == null)
      return r;
    const o = en.reconstructOriginalUrl(n), s = Oc(t, n);
    if (en.isCrossOriginRedirect(o, s)) {
      ft.enabled && ft(`Cross-origin redirect (${o.host} → ${s.host}): stripping sensitive headers`);
      for (const a of Object.keys(i))
        Cc.has(Ho(a)) && delete i[a];
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new wo.URL(`${n}//${r}${i}${o}`);
  }
  static isCrossOriginRedirect(t, n) {
    if (t.hostname.toLowerCase() !== n.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && n.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(n.port))
      return !1;
    if (t.protocol !== n.protocol)
      return !0;
    const r = t.port, i = n.port;
    return r !== i;
  }
  static async retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return await t();
      } catch (i) {
        if (r < n && (i instanceof jo && i.isServerError() || i.code === "EPIPE")) {
          await new Promise((o) => setTimeout(o, 1e3 * (r + 1)));
          continue;
        }
        throw i;
      }
  }
}
de.HttpExecutor = en;
function Oc(e, t) {
  try {
    return new wo.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${r}//${n}${i}`;
    return new wo.URL(e, o);
  }
}
function $c(e, t) {
  const n = Wr(t), r = Oc(e, t);
  return qo(r, n), n;
}
function qo(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class vo extends Qp.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Sc.createHash)(n);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, n, r) {
    this.digester.update(t), r(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (n) {
        t(n);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, oa.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, oa.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
de.DigestTransform = vo;
function sm(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function ln(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function am(e, t) {
  if (!sm(ln(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = ln(t, "content-length");
    s != null && n.push(new em.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new vo(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new vo(e.options.sha2, "sha256", "hex"));
  const i = (0, Jp.createWriteStream)(e.destination);
  n.push(i);
  let o = t;
  for (const s of n)
    s.on("error", (a) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(a);
    }), o = o.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function Wr(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Ic(e) {
  const t = Ho(e);
  return bc.some((n) => t.includes(n)) || tm.some((n) => t.endsWith(n));
}
function Rc(e) {
  return `${(0, Sc.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
}
function tn(e, t) {
  return JSON.stringify(e, (n, r) => Ic(n) || t != null && t.has(n) ? typeof r == "string" ? Rc(r) : "<stripped sensitive data>" : r, 2);
}
var si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.MemoLazy = void 0;
class lm {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Pc(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
si.MemoLazy = lm;
function Pc(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => Pc(e[s], t[s]));
  }
  return e === t;
}
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.githubUrl = cm;
nr.githubTagPrefix = um;
nr.getS3LikeProviderBaseUrl = fm;
function cm(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function um(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function fm(e) {
  const t = e.provider;
  if (t === "s3")
    return dm(e);
  if (t === "spaces")
    return hm(e);
  throw new Error(`Not supported provider: ${t}`);
}
function dm(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Nc(t, e.path);
}
function Nc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function hm(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Nc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
Go.retry = Dc;
const pm = wt;
async function Dc(e, t) {
  var n;
  const { retries: r, interval: i, backoff: o = 0, attempt: s = 0, shouldRetry: a, cancellationToken: c = new pm.CancellationToken() } = t;
  try {
    return await e();
  } catch (m) {
    if (await Promise.resolve((n = a == null ? void 0 : a(m)) !== null && n !== void 0 ? n : !0) && r > 0 && !c.cancelled)
      return await new Promise((l) => setTimeout(l, i + o * s)), await Dc(e, { ...t, retries: r - 1, attempt: s + 1 });
    throw m;
  }
}
var Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
Vo.parseDn = mm;
function mm(e) {
  let t = !1, n = null, r = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      n !== null && o.set(n, r);
      break;
    }
    const a = e[s];
    if (t) {
      if (a === '"') {
        t = !1;
        continue;
      }
    } else {
      if (a === '"') {
        t = !0;
        continue;
      }
      if (a === "\\") {
        s++;
        const c = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(c) ? r += e[s] : (s++, r += String.fromCharCode(c));
        continue;
      }
      if (n === null && a === "=") {
        n = r, r = "";
        continue;
      }
      if (a === "," || a === ";" || a === "+") {
        n !== null && o.set(n, r), n = null, r = "";
        continue;
      }
    }
    if (a === " " && !t) {
      if (r.length === 0)
        continue;
      if (s > i) {
        let c = s;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || n === null && e[i] === "=" || n !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    r += a;
  }
  return o;
}
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.nil = hn.UUID = void 0;
const Fc = Zn, xc = gn, gm = "options.name must be either a string or a Buffer", sa = (0, Fc.randomBytes)(16);
sa[0] = sa[0] | 1;
const Br = {}, V = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Br[t] = e, V[e] = t;
}
class kt {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = kt.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return Em(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = ym(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Br[t[14] + t[15]] & 240) >> 4,
        variant: aa((Br[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < n + 16)
        return !1;
      let r = 0;
      for (; r < 16 && t[n + r] === 0; r++)
        ;
      return r === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[n + 6] & 240) >> 4,
        variant: aa((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, xc.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = Br[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
hn.UUID = kt;
kt.OID = kt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function aa(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var xn;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(xn || (xn = {}));
function Em(e, t, n, r, i = xn.ASCII) {
  const o = (0, Fc.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, xc.newError)(gm, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let c;
  switch (i) {
    case xn.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, c = a;
      break;
    case xn.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, c = new kt(a);
      break;
    default:
      c = V[a[0]] + V[a[1]] + V[a[2]] + V[a[3]] + "-" + V[a[4]] + V[a[5]] + "-" + V[a[6] & 15 | n] + V[a[7]] + "-" + V[a[8] & 63 | 128] + V[a[9]] + "-" + V[a[10]] + V[a[11]] + V[a[12]] + V[a[13]] + V[a[14]] + V[a[15]];
      break;
  }
  return c;
}
function ym(e) {
  return V[e[0]] + V[e[1]] + V[e[2]] + V[e[3]] + "-" + V[e[4]] + V[e[5]] + "-" + V[e[6]] + V[e[7]] + "-" + V[e[8]] + V[e[9]] + "-" + V[e[10]] + V[e[11]] + V[e[12]] + V[e[13]] + V[e[14]] + V[e[15]];
}
hn.nil = new kt("00000000-0000-0000-0000-000000000000");
var rr = {}, Lc = {};
(function(e) {
  (function(t) {
    t.parser = function(d, u) {
      return new r(d, u);
    }, t.SAXParser = r, t.SAXStream = f, t.createStream = m, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function r(d, u) {
      if (!(this instanceof r))
        return new r(d, u);
      var S = this;
      o(S), S.q = S.c = "", S.bufferCheckPosition = t.MAX_BUFFER_LENGTH, S.encoding = null, S.opt = u || {}, S.opt.lowercase = S.opt.lowercase || S.opt.lowercasetags, S.looseCase = S.opt.lowercase ? "toLowerCase" : "toUpperCase", S.opt.maxEntityCount = S.opt.maxEntityCount || 512, S.opt.maxEntityDepth = S.opt.maxEntityDepth || 4, S.entityCount = S.entityDepth = 0, S.tags = [], S.closed = S.closedRoot = S.sawRoot = !1, S.tag = S.error = null, S.strict = !!d, S.noscript = !!(d || S.opt.noscript), S.state = y.BEGIN, S.strictEntities = S.opt.strictEntities, S.ENTITIES = S.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), S.attribList = [], S.opt.xmlns && (S.ns = Object.create(A)), S.opt.unquotedAttributeValues === void 0 && (S.opt.unquotedAttributeValues = !d), S.trackPosition = S.opt.position !== !1, S.trackPosition && (S.position = S.line = S.column = 0), Y(S, "onready");
    }
    Object.create || (Object.create = function(d) {
      function u() {
      }
      u.prototype = d;
      var S = new u();
      return S;
    }), Object.keys || (Object.keys = function(d) {
      var u = [];
      for (var S in d) d.hasOwnProperty(S) && u.push(S);
      return u;
    });
    function i(d) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), S = 0, w = 0, W = n.length; w < W; w++) {
        var te = d[n[w]].length;
        if (te > u)
          switch (n[w]) {
            case "textNode":
              N(d);
              break;
            case "cdata":
              b(d, "oncdata", d.cdata), d.cdata = "";
              break;
            case "script":
              b(d, "onscript", d.script), d.script = "";
              break;
            default:
              k(d, "Max buffer length exceeded: " + n[w]);
          }
        S = Math.max(S, te);
      }
      var se = t.MAX_BUFFER_LENGTH - S;
      d.bufferCheckPosition = se + d.position;
    }
    function o(d) {
      for (var u = 0, S = n.length; u < S; u++)
        d[n[u]] = "";
    }
    function s(d) {
      N(d), d.cdata !== "" && (b(d, "oncdata", d.cdata), d.cdata = ""), d.script !== "" && (b(d, "onscript", d.script), d.script = "");
    }
    r.prototype = {
      end: function() {
        G(this);
      },
      write: An,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var a;
    try {
      a = require("stream").Stream;
    } catch {
      a = function() {
      };
    }
    a || (a = function() {
    });
    var c = t.EVENTS.filter(function(d) {
      return d !== "error" && d !== "end";
    });
    function m(d, u) {
      return new f(d, u);
    }
    function l(d, u) {
      if (d.length >= 2) {
        if (d[0] === 255 && d[1] === 254)
          return "utf-16le";
        if (d[0] === 254 && d[1] === 255)
          return "utf-16be";
      }
      return d.length >= 3 && d[0] === 239 && d[1] === 187 && d[2] === 191 ? "utf8" : d.length >= 4 ? d[0] === 60 && d[1] === 0 && d[2] === 63 && d[3] === 0 ? "utf-16le" : d[0] === 0 && d[1] === 60 && d[2] === 0 && d[3] === 63 ? "utf-16be" : "utf8" : u ? "utf8" : null;
    }
    function f(d, u) {
      if (!(this instanceof f))
        return new f(d, u);
      a.apply(this), this._parser = new r(d, u), this.writable = !0, this.readable = !0;
      var S = this;
      this._parser.onend = function() {
        S.emit("end");
      }, this._parser.onerror = function(w) {
        S.emit("error", w), S._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, c.forEach(function(w) {
        Object.defineProperty(S, "on" + w, {
          get: function() {
            return S._parser["on" + w];
          },
          set: function(W) {
            if (!W)
              return S.removeAllListeners(w), S._parser["on" + w] = W, W;
            S.on(w, W);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    f.prototype = Object.create(a.prototype, {
      constructor: {
        value: f
      }
    }), f.prototype._decodeBuffer = function(d, u) {
      if (this._decoderBuffer && (d = Buffer.concat([this._decoderBuffer, d]), this._decoderBuffer = null), !this._decoder) {
        var S = l(d, u);
        if (!S)
          return this._decoderBuffer = d, "";
        this._parser.encoding = S, this._decoder = new TextDecoder(S);
      }
      return this._decoder.decode(d, { stream: !u });
    }, f.prototype.write = function(d) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d))
        d = this._decodeBuffer(d, !1);
      else if (this._decoderBuffer) {
        var u = this._decodeBuffer(Buffer.alloc(0), !0);
        u && (this._parser.write(u), this.emit("data", u));
      }
      return this._parser.write(d.toString()), this.emit("data", d), !0;
    }, f.prototype.end = function(d) {
      if (d && d.length && this.write(d), this._decoderBuffer) {
        var u = this._decodeBuffer(Buffer.alloc(0), !0);
        u && (this._parser.write(u), this.emit("data", u));
      } else if (this._decoder) {
        var S = this._decoder.decode();
        S && (this._parser.write(S), this.emit("data", S));
      }
      return this._parser.end(), !0;
    }, f.prototype.on = function(d, u) {
      var S = this;
      return !S._parser["on" + d] && c.indexOf(d) !== -1 && (S._parser["on" + d] = function() {
        var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        w.splice(0, 0, d), S.emit.apply(S, w);
      }), a.prototype.on.call(S, d, u);
    };
    var h = /^\[CDATA\[$/i, g = /^DOCTYPE$/i, _ = "http://www.w3.org/XML/1998/namespace", E = "http://www.w3.org/2000/xmlns/", A = { xml: _, xmlns: E }, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, $ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, D = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, B = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function q(d) {
      return d === " " || d === `
` || d === "\r" || d === "	";
    }
    function J(d) {
      return d === '"' || d === "'";
    }
    function Q(d) {
      return d === ">" || q(d);
    }
    function oe(d, u) {
      return d.test(u);
    }
    function U(d, u) {
      return !oe(d, u);
    }
    var y = 0;
    t.STATE = {
      BEGIN: y++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: y++,
      // leading whitespace
      TEXT: y++,
      // general stuff
      TEXT_ENTITY: y++,
      // &amp and such.
      OPEN_WAKA: y++,
      // <
      SGML_DECL: y++,
      // <!BLARG
      SGML_DECL_QUOTED: y++,
      // <!BLARG foo "bar
      DOCTYPE: y++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: y++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: y++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: y++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: y++,
      // <!-
      COMMENT: y++,
      // <!--
      COMMENT_ENDING: y++,
      // <!-- blah -
      COMMENT_ENDED: y++,
      // <!-- blah --
      CDATA: y++,
      // <![CDATA[ something
      CDATA_ENDING: y++,
      // ]
      CDATA_ENDING_2: y++,
      // ]]
      PROC_INST: y++,
      // <?hi
      PROC_INST_BODY: y++,
      // <?hi there
      PROC_INST_ENDING: y++,
      // <?hi "there" ?
      OPEN_TAG: y++,
      // <strong
      OPEN_TAG_SLASH: y++,
      // <strong /
      ATTRIB: y++,
      // <a
      ATTRIB_NAME: y++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: y++,
      // <a foo _
      ATTRIB_VALUE: y++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: y++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: y++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: y++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: y++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: y++,
      // <foo bar=&quot
      CLOSE_TAG: y++,
      // </a
      CLOSE_TAG_SAW_WHITE: y++,
      // </a   >
      SCRIPT: y++,
      // <script> ...
      SCRIPT_ENDING: y++
      // <script> ... <
    }, t.XML_ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }), t.ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }), Object.keys(t.ENTITIES).forEach(function(d) {
      var u = t.ENTITIES[d], S = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[d] = S;
    });
    for (var j in t.STATE)
      t.STATE[t.STATE[j]] = j;
    y = t.STATE;
    function Y(d, u, S) {
      d[u] && d[u](S);
    }
    function ee(d) {
      var u = d && d.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return u ? u[2] : null;
    }
    function I(d) {
      return d ? d.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function O(d, u) {
      const S = I(d), w = I(u);
      return !S || !w ? !0 : w === "utf16" ? S === "utf16le" || S === "utf16be" : S === w;
    }
    function P(d, u) {
      if (!(!d.strict || !d.encoding || !u || u.name !== "xml")) {
        var S = ee(u.body);
        S && !O(d.encoding, S) && F(
          d,
          "XML declaration encoding " + S + " does not match detected stream encoding " + d.encoding.toUpperCase()
        );
      }
    }
    function b(d, u, S) {
      d.textNode && N(d), Y(d, u, S);
    }
    function N(d) {
      d.textNode = R(d.opt, d.textNode), d.textNode && Y(d, "ontext", d.textNode), d.textNode = "";
    }
    function R(d, u) {
      return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function k(d, u) {
      return N(d), d.trackPosition && (u += `
Line: ` + d.line + `
Column: ` + d.column + `
Char: ` + d.c), u = new Error(u), d.error = u, Y(d, "onerror", u), d;
    }
    function G(d) {
      return d.sawRoot && !d.closedRoot && F(d, "Unclosed root tag"), d.state !== y.BEGIN && d.state !== y.BEGIN_WHITESPACE && d.state !== y.TEXT && k(d, "Unexpected end"), N(d), d.c = "", d.closed = !0, Y(d, "onend"), r.call(d, d.strict, d.opt), d;
    }
    function F(d, u) {
      if (typeof d != "object" || !(d instanceof r))
        throw new Error("bad call to strictFail");
      d.strict && k(d, u);
    }
    function z(d) {
      d.strict || (d.tagName = d.tagName[d.looseCase]());
      var u = d.tags[d.tags.length - 1] || d, S = d.tag = { name: d.tagName, attributes: {} };
      d.opt.xmlns && (S.ns = u.ns), d.attribList.length = 0, b(d, "onopentagstart", S);
    }
    function ue(d, u) {
      var S = d.indexOf(":"), w = S < 0 ? ["", d] : d.split(":"), W = w[0], te = w[1];
      return u && d === "xmlns" && (W = "xmlns", te = ""), { prefix: W, local: te };
    }
    function M(d) {
      if (d.strict || (d.attribName = d.attribName[d.looseCase]()), d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName)) {
        d.attribName = d.attribValue = "";
        return;
      }
      if (d.opt.xmlns) {
        var u = ue(d.attribName, !0), S = u.prefix, w = u.local;
        if (S === "xmlns")
          if (w === "xml" && d.attribValue !== _)
            F(
              d,
              "xml: prefix must be bound to " + _ + `
Actual: ` + d.attribValue
            );
          else if (w === "xmlns" && d.attribValue !== E)
            F(
              d,
              "xmlns: prefix must be bound to " + E + `
Actual: ` + d.attribValue
            );
          else {
            var W = d.tag, te = d.tags[d.tags.length - 1] || d;
            W.ns === te.ns && (W.ns = Object.create(te.ns)), W.ns[w] = d.attribValue;
          }
        d.attribList.push([d.attribName, d.attribValue]);
      } else
        d.tag.attributes[d.attribName] = d.attribValue, b(d, "onattribute", {
          name: d.attribName,
          value: d.attribValue
        });
      d.attribName = d.attribValue = "";
    }
    function _e(d, u) {
      if (d.opt.xmlns) {
        var S = d.tag, w = ue(d.tagName);
        S.prefix = w.prefix, S.local = w.local, S.uri = S.ns[w.prefix] || "", S.prefix && !S.uri && (F(
          d,
          "Unbound namespace prefix: " + JSON.stringify(d.tagName)
        ), S.uri = w.prefix);
        var W = d.tags[d.tags.length - 1] || d;
        S.ns && W.ns !== S.ns && Object.keys(S.ns).forEach(function(Wt) {
          b(d, "onopennamespace", {
            prefix: Wt,
            uri: S.ns[Wt]
          });
        });
        for (var te = 0, se = d.attribList.length; te < se; te++) {
          var ve = d.attribList[te], Ae = ve[0], Be = ve[1], fe = ue(Ae, !0), He = fe.prefix, Ci = fe.local, dr = He === "" ? "" : S.ns[He] || "", st = {
            name: Ae,
            value: Be,
            prefix: He,
            local: Ci,
            uri: dr
          };
          He && He !== "xmlns" && !dr && (F(
            d,
            "Unbound namespace prefix: " + JSON.stringify(He)
          ), st.uri = He), d.tag.attributes[Ae] = st, b(d, "onattribute", st);
        }
        d.attribList.length = 0;
      }
      d.tag.isSelfClosing = !!u, d.sawRoot = !0, d.tags.push(d.tag), b(d, "onopentag", d.tag), u || (!d.noscript && d.tagName.toLowerCase() === "script" ? d.state = y.SCRIPT : d.state = y.TEXT, d.tag = null, d.tagName = ""), d.attribName = d.attribValue = "", d.attribList.length = 0;
    }
    function _n(d) {
      if (!d.tagName) {
        F(d, "Weird empty close tag."), d.textNode += "</>", d.state = y.TEXT;
        return;
      }
      if (d.script) {
        if (d.tagName !== "script") {
          d.script += "</" + d.tagName + ">", d.tagName = "", d.state = y.SCRIPT;
          return;
        }
        b(d, "onscript", d.script), d.script = "";
      }
      var u = d.tags.length, S = d.tagName;
      d.strict || (S = S[d.looseCase]());
      for (var w = S; u--; ) {
        var W = d.tags[u];
        if (W.name !== w)
          F(d, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        F(d, "Unmatched closing tag: " + d.tagName), d.textNode += "</" + d.tagName + ">", d.state = y.TEXT;
        return;
      }
      d.tagName = S;
      for (var te = d.tags.length; te-- > u; ) {
        var se = d.tag = d.tags.pop();
        d.tagName = d.tag.name, b(d, "onclosetag", d.tagName);
        var ve = {};
        for (var Ae in se.ns)
          ve[Ae] = se.ns[Ae];
        var Be = d.tags[d.tags.length - 1] || d;
        d.opt.xmlns && se.ns !== Be.ns && Object.keys(se.ns).forEach(function(fe) {
          var He = se.ns[fe];
          b(d, "onclosenamespace", { prefix: fe, uri: He });
        });
      }
      u === 0 && (d.closedRoot = !0), d.tagName = d.attribValue = d.attribName = "", d.attribList.length = 0, d.state = y.TEXT;
    }
    function Me(d) {
      var u = d.entity, S = u.toLowerCase(), w, W = "";
      return d.ENTITIES[u] ? d.ENTITIES[u] : d.ENTITIES[S] ? d.ENTITIES[S] : (u = S, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), w = parseInt(u, 16), W = w.toString(16)) : (u = u.slice(1), w = parseInt(u, 10), W = w.toString(10))), u = u.replace(/^0+/, ""), isNaN(w) || W.toLowerCase() !== u || w < 0 || w > 1114111 || !fr(w) ? (F(d, "Invalid character entity"), "&" + d.entity + ";") : String.fromCodePoint(w));
    }
    function fr(d) {
      return d === 9 || d === 10 || d === 13 || d >= 32 && d <= 55295 || d >= 57344 && d <= 65533 || d >= 65536 && d <= 1114111;
    }
    function vn(d, u) {
      u === "<" ? (d.state = y.OPEN_WAKA, d.startTagPosition = d.position) : q(u) || (F(d, "Non-whitespace before first tag."), d.textNode = u, d.state = y.TEXT);
    }
    function Vt(d, u) {
      var S = "";
      return u < d.length && (S = d.charAt(u)), S;
    }
    function An(d) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return k(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (d === null)
        return G(u);
      typeof d == "object" && (d = d.toString());
      for (var S = 0, w = ""; w = Vt(d, S++), u.c = w, !!w; )
        switch (u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case y.BEGIN:
            if (u.state = y.BEGIN_WHITESPACE, w === "\uFEFF")
              continue;
            vn(u, w);
            continue;
          case y.BEGIN_WHITESPACE:
            vn(u, w);
            continue;
          case y.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var te = S - 1; w && w !== "<" && w !== "&"; )
                w = Vt(d, S++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += d.substring(te, S - 1);
            }
            w === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = y.OPEN_WAKA, u.startTagPosition = u.position) : (!q(w) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."), w === "&" ? u.state = y.TEXT_ENTITY : u.textNode += w);
            continue;
          case y.SCRIPT:
            w === "<" ? u.state = y.SCRIPT_ENDING : u.script += w;
            continue;
          case y.SCRIPT_ENDING:
            w === "/" ? u.state = y.CLOSE_TAG : (u.script += "<" + w, u.state = y.SCRIPT);
            continue;
          case y.OPEN_WAKA:
            if (w === "!")
              u.state = y.SGML_DECL, u.sgmlDecl = "";
            else if (!q(w)) if (oe(T, w))
              u.state = y.OPEN_TAG, u.tagName = w;
            else if (w === "/")
              u.state = y.CLOSE_TAG, u.tagName = "";
            else if (w === "?")
              u.state = y.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (F(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var W = u.position - u.startTagPosition;
                w = new Array(W).join(" ") + w;
              }
              u.textNode += "<" + w, u.state = y.TEXT;
            }
            continue;
          case y.SGML_DECL:
            if (u.sgmlDecl + w === "--") {
              u.state = y.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = y.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + w, u.sgmlDecl = "") : h.test(u.sgmlDecl + w) ? (b(u, "onopencdata"), u.state = y.CDATA, u.sgmlDecl = "", u.cdata = "") : g.test(u.sgmlDecl + w) ? (u.state = y.DOCTYPE, (u.doctype || u.sawRoot) && F(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : w === ">" ? (b(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = y.TEXT) : (J(w) && (u.state = y.SGML_DECL_QUOTED), u.sgmlDecl += w);
            continue;
          case y.SGML_DECL_QUOTED:
            w === u.q && (u.state = y.SGML_DECL, u.q = ""), u.sgmlDecl += w;
            continue;
          case y.DOCTYPE:
            w === ">" ? (u.state = y.TEXT, b(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += w, w === "[" ? u.state = y.DOCTYPE_DTD : J(w) && (u.state = y.DOCTYPE_QUOTED, u.q = w));
            continue;
          case y.DOCTYPE_QUOTED:
            u.doctype += w, w === u.q && (u.q = "", u.state = y.DOCTYPE);
            continue;
          case y.DOCTYPE_DTD:
            w === "]" ? (u.doctype += w, u.state = y.DOCTYPE) : w === "<" ? (u.state = y.OPEN_WAKA, u.startTagPosition = u.position) : J(w) ? (u.doctype += w, u.state = y.DOCTYPE_DTD_QUOTED, u.q = w) : u.doctype += w;
            continue;
          case y.DOCTYPE_DTD_QUOTED:
            u.doctype += w, w === u.q && (u.state = y.DOCTYPE_DTD, u.q = "");
            continue;
          case y.COMMENT:
            w === "-" ? u.state = y.COMMENT_ENDING : u.comment += w;
            continue;
          case y.COMMENT_ENDING:
            w === "-" ? (u.state = y.COMMENT_ENDED, u.comment = R(u.opt, u.comment), u.comment && b(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + w, u.state = y.COMMENT);
            continue;
          case y.COMMENT_ENDED:
            w !== ">" ? (F(u, "Malformed comment"), u.comment += "--" + w, u.state = y.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = y.DOCTYPE_DTD : u.state = y.TEXT;
            continue;
          case y.CDATA:
            for (var te = S - 1; w && w !== "]"; )
              w = Vt(d, S++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
            u.cdata += d.substring(te, S - 1), w === "]" && (u.state = y.CDATA_ENDING);
            continue;
          case y.CDATA_ENDING:
            w === "]" ? u.state = y.CDATA_ENDING_2 : (u.cdata += "]" + w, u.state = y.CDATA);
            continue;
          case y.CDATA_ENDING_2:
            w === ">" ? (u.cdata && b(u, "oncdata", u.cdata), b(u, "onclosecdata"), u.cdata = "", u.state = y.TEXT) : w === "]" ? u.cdata += "]" : (u.cdata += "]]" + w, u.state = y.CDATA);
            continue;
          case y.PROC_INST:
            w === "?" ? u.state = y.PROC_INST_ENDING : q(w) ? u.state = y.PROC_INST_BODY : u.procInstName += w;
            continue;
          case y.PROC_INST_BODY:
            if (!u.procInstBody && q(w))
              continue;
            w === "?" ? u.state = y.PROC_INST_ENDING : u.procInstBody += w;
            continue;
          case y.PROC_INST_ENDING:
            if (w === ">") {
              const Be = {
                name: u.procInstName,
                body: u.procInstBody
              };
              P(u, Be), b(u, "onprocessinginstruction", Be), u.procInstName = u.procInstBody = "", u.state = y.TEXT;
            } else
              u.procInstBody += "?" + w, u.state = y.PROC_INST_BODY;
            continue;
          case y.OPEN_TAG:
            oe($, w) ? u.tagName += w : (z(u), w === ">" ? _e(u) : w === "/" ? u.state = y.OPEN_TAG_SLASH : (q(w) || F(u, "Invalid character in tag name"), u.state = y.ATTRIB));
            continue;
          case y.OPEN_TAG_SLASH:
            w === ">" ? (_e(u, !0), _n(u)) : (F(
              u,
              "Forward-slash in opening tag not followed by >"
            ), u.state = y.ATTRIB);
            continue;
          case y.ATTRIB:
            if (q(w))
              continue;
            w === ">" ? _e(u) : w === "/" ? u.state = y.OPEN_TAG_SLASH : oe(T, w) ? (u.attribName = w, u.attribValue = "", u.state = y.ATTRIB_NAME) : F(u, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME:
            w === "=" ? u.state = y.ATTRIB_VALUE : w === ">" ? (F(u, "Attribute without value"), u.attribValue = u.attribName, M(u), _e(u)) : q(w) ? u.state = y.ATTRIB_NAME_SAW_WHITE : oe($, w) ? u.attribName += w : F(u, "Invalid attribute name");
            continue;
          case y.ATTRIB_NAME_SAW_WHITE:
            if (w === "=")
              u.state = y.ATTRIB_VALUE;
            else {
              if (q(w))
                continue;
              F(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", b(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", w === ">" ? _e(u) : oe(T, w) ? (u.attribName = w, u.state = y.ATTRIB_NAME) : (F(u, "Invalid attribute name"), u.state = y.ATTRIB);
            }
            continue;
          case y.ATTRIB_VALUE:
            if (q(w))
              continue;
            J(w) ? (u.q = w, u.state = y.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || k(u, "Unquoted attribute value"), u.state = y.ATTRIB_VALUE_UNQUOTED, u.attribValue = w);
            continue;
          case y.ATTRIB_VALUE_QUOTED:
            if (w !== u.q) {
              w === "&" ? u.state = y.ATTRIB_VALUE_ENTITY_Q : u.attribValue += w;
              continue;
            }
            M(u), u.q = "", u.state = y.ATTRIB_VALUE_CLOSED;
            continue;
          case y.ATTRIB_VALUE_CLOSED:
            q(w) ? u.state = y.ATTRIB : w === ">" ? _e(u) : w === "/" ? u.state = y.OPEN_TAG_SLASH : oe(T, w) ? (F(u, "No whitespace between attributes"), u.attribName = w, u.attribValue = "", u.state = y.ATTRIB_NAME) : F(u, "Invalid attribute name");
            continue;
          case y.ATTRIB_VALUE_UNQUOTED:
            if (!Q(w)) {
              w === "&" ? u.state = y.ATTRIB_VALUE_ENTITY_U : u.attribValue += w;
              continue;
            }
            M(u), w === ">" ? _e(u) : u.state = y.ATTRIB;
            continue;
          case y.CLOSE_TAG:
            if (u.tagName)
              w === ">" ? _n(u) : oe($, w) ? u.tagName += w : u.script ? (u.script += "</" + u.tagName + w, u.tagName = "", u.state = y.SCRIPT) : (q(w) || F(u, "Invalid tagname in closing tag"), u.state = y.CLOSE_TAG_SAW_WHITE);
            else {
              if (q(w))
                continue;
              U(T, w) ? u.script ? (u.script += "</" + w, u.state = y.SCRIPT) : F(u, "Invalid tagname in closing tag.") : u.tagName = w;
            }
            continue;
          case y.CLOSE_TAG_SAW_WHITE:
            if (q(w))
              continue;
            w === ">" ? _n(u) : F(u, "Invalid characters in closing tag");
            continue;
          case y.TEXT_ENTITY:
          case y.ATTRIB_VALUE_ENTITY_Q:
          case y.ATTRIB_VALUE_ENTITY_U:
            var se, ve;
            switch (u.state) {
              case y.TEXT_ENTITY:
                se = y.TEXT, ve = "textNode";
                break;
              case y.ATTRIB_VALUE_ENTITY_Q:
                se = y.ATTRIB_VALUE_QUOTED, ve = "attribValue";
                break;
              case y.ATTRIB_VALUE_ENTITY_U:
                se = y.ATTRIB_VALUE_UNQUOTED, ve = "attribValue";
                break;
            }
            if (w === ";") {
              var Ae = Me(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ae) ? ((u.entityCount += 1) > u.opt.maxEntityCount && k(
                u,
                "Parsed entity count exceeds max entity count"
              ), (u.entityDepth += 1) > u.opt.maxEntityDepth && k(
                u,
                "Parsed entity depth exceeds max entity depth"
              ), u.entity = "", u.state = se, u.write(Ae), u.entityDepth -= 1) : (u[ve] += Ae, u.entity = "", u.state = se);
            } else oe(u.entity.length ? B : D, w) ? u.entity += w : (F(u, "Invalid character in entity name"), u[ve] += "&" + u.entity + w, u.entity = "", u.state = se);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var d = String.fromCharCode, u = Math.floor, S = function() {
        var w = 16384, W = [], te, se, ve = -1, Ae = arguments.length;
        if (!Ae)
          return "";
        for (var Be = ""; ++ve < Ae; ) {
          var fe = Number(arguments[ve]);
          if (!isFinite(fe) || // `NaN`, `+Infinity`, or `-Infinity`
          fe < 0 || // not a valid Unicode code point
          fe > 1114111 || // not a valid Unicode code point
          u(fe) !== fe)
            throw RangeError("Invalid code point: " + fe);
          fe <= 65535 ? W.push(fe) : (fe -= 65536, te = (fe >> 10) + 55296, se = fe % 1024 + 56320, W.push(te, se)), (ve + 1 === Ae || W.length > w) && (Be += d.apply(null, W), W.length = 0);
        }
        return Be;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: S,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = S;
    }();
  })(e);
})(Lc);
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.XElement = void 0;
rr.parseXml = Am;
const wm = Lc, Cr = gn;
class Uc {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Cr.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!vm(t))
      throw (0, Cr.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, Cr.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, Cr.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (la(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => la(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
rr.XElement = Uc;
const _m = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function vm(e) {
  return _m.test(e);
}
function la(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function Am(e) {
  let t = null;
  const n = wm.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new Uc(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const s = r[r.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(o);
    }
    r.push(o);
  }, n.onclosetag = () => {
    r.pop();
  }, n.ontext = (i) => {
    r.length > 0 && (r[r.length - 1].value = i);
  }, n.oncdata = (i) => {
    const o = r[r.length - 1];
    o.value = i, o.isCData = !0;
  }, n.onerror = (i) => {
    throw i;
  }, n.write(e), t;
}
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.mapToObject = kc;
qt.isValidKey = ai;
qt.asArray = Tm;
qt.deepAssign = Cm;
qt.objectToArgs = $m;
function kc(e) {
  const t = {};
  for (const [n, r] of e)
    ai(n) && (r instanceof Map ? t[n] = kc(r) : t[n] = r);
  return t;
}
function ai(e) {
  return ["__proto__", "prototype", "constructor"].includes(e) ? !1 : ["string", "number", "symbol", "boolean"].includes(typeof e) || e === null;
}
function Tm(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function ca(e) {
  if (Array.isArray(e))
    return !1;
  const t = typeof e;
  return t === "object" || t === "function";
}
function Sm(e, t, n) {
  const r = t[n];
  if (r === void 0)
    return;
  const i = e[n];
  i == null || r == null || !ca(i) || !ca(r) ? Array.isArray(i) && Array.isArray(r) ? e[n] = Array.from(new Set(i.concat(r))) : e[n] = r : e[n] = Mc(i, r);
}
function Mc(e, t) {
  if (e !== t)
    for (const n of Object.getOwnPropertyNames(t))
      ai(n) && Sm(e, t, n);
  return e;
}
function Cm(e, ...t) {
  for (const n of t)
    n != null && Mc(e, n);
  return e;
}
const bm = /^[a-zA-Z][a-zA-Z0-9-]*$/, Om = /[\0\r\n]/;
function $m(e) {
  const t = Object.entries(e).reduce((n, [r, i]) => {
    if (!ai(r) || i == null)
      return n;
    if (!bm.test(r))
      throw new Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(r)}`);
    if (Om.test(i))
      throw new Error(`objectToArgs: value for --${r} contains a null byte or newline`);
    return n.concat([`--${r}`, i]);
  }, []);
  return Object.freeze(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
  var t = wt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = gn;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = de;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "hashSensitiveValue", { enumerable: !0, get: function() {
    return r.hashSensitiveValue;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "isSensitiveFieldName", { enumerable: !0, get: function() {
    return r.isSensitiveFieldName;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } });
  var i = si;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = tr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var s = nr;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return s.githubTagPrefix;
  } });
  var a = Go;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var c = Vo;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var m = hn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return m.UUID;
  } });
  var l = rr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } });
  var f = qt;
  Object.defineProperty(e, "isValidKey", { enumerable: !0, get: function() {
    return f.isValidKey;
  } }), Object.defineProperty(e, "mapToObject", { enumerable: !0, get: function() {
    return f.mapToObject;
  } }), Object.defineProperty(e, "asArray", { enumerable: !0, get: function() {
    return f.asArray;
  } }), Object.defineProperty(e, "deepAssign", { enumerable: !0, get: function() {
    return f.deepAssign;
  } }), Object.defineProperty(e, "objectToArgs", { enumerable: !0, get: function() {
    return f.objectToArgs;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
})(he);
var we = {}, Wo = {}, We = {};
function Bc(e) {
  return typeof e > "u" || e === null;
}
function Im(e) {
  return typeof e == "object" && e !== null;
}
function Rm(e) {
  return Array.isArray(e) ? e : Bc(e) ? [] : [e];
}
function Pm(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function Nm(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function Dm(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
We.isNothing = Bc;
We.isObject = Im;
We.toArray = Rm;
We.repeat = Nm;
We.isNegativeZero = Dm;
We.extend = Pm;
function Hc(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function jn(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Hc(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
jn.prototype = Object.create(Error.prototype);
jn.prototype.constructor = jn;
jn.prototype.toString = function(t) {
  return this.name + ": " + Hc(this, t);
};
var ir = jn;
const Rn = We;
function Bi(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function Hi(e, t) {
  return Rn.repeat(" ", t - e.length) + e;
}
function Fm(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  const n = /\r?\n|\r|\0/g, r = [0], i = [];
  let o, s = -1;
  for (; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let a = "";
  const c = Math.min(e.line + t.linesAfter, i.length).toString().length, m = t.maxLength - (t.indent + c + 3);
  for (let f = 1; f <= t.linesBefore && !(s - f < 0); f++) {
    const h = Bi(
      e.buffer,
      r[s - f],
      i[s - f],
      e.position - (r[s] - r[s - f]),
      m
    );
    a = Rn.repeat(" ", t.indent) + Hi((e.line - f + 1).toString(), c) + " | " + h.str + `
` + a;
  }
  const l = Bi(e.buffer, r[s], i[s], e.position, m);
  a += Rn.repeat(" ", t.indent) + Hi((e.line + 1).toString(), c) + " | " + l.str + `
`, a += Rn.repeat("-", t.indent + c + 3 + l.pos) + `^
`;
  for (let f = 1; f <= t.linesAfter && !(s + f >= i.length); f++) {
    const h = Bi(
      e.buffer,
      r[s + f],
      i[s + f],
      e.position - (r[s] - r[s + f]),
      m
    );
    a += Rn.repeat(" ", t.indent) + Hi((e.line + f + 1).toString(), c) + " | " + h.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var xm = Fm;
const ua = ir, Lm = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Um = [
  "scalar",
  "sequence",
  "mapping"
];
function km(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function Mm(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (Lm.indexOf(n) === -1)
      throw new ua('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = km(t.styleAliases || null), Um.indexOf(this.kind) === -1)
    throw new ua('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Pe = Mm;
const On = ir, ji = Pe;
function fa(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function Bm() {
  const e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  };
  function t(n) {
    n.multi ? (e.multi[n.kind].push(n), e.multi.fallback.push(n)) : e[n.kind][n.tag] = e.fallback[n.tag] = n;
  }
  for (let n = 0, r = arguments.length; n < r; n += 1)
    arguments[n].forEach(t);
  return e;
}
function Ao(e) {
  return this.extend(e);
}
Ao.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof ji)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new On("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof ji))
      throw new On("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new On("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new On("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof ji))
      throw new On("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(Ao.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = fa(i, "implicit"), i.compiledExplicit = fa(i, "explicit"), i.compiledTypeMap = Bm(i.compiledImplicit, i.compiledExplicit), i;
};
var jc = Ao;
const Hm = Pe;
var qc = new Hm("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const jm = Pe;
var Gc = new jm("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const qm = Pe;
var Vc = new qm("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const Gm = jc;
var Wc = new Gm({
  explicit: [
    qc,
    Gc,
    Vc
  ]
});
const Vm = Pe;
function Wm(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Ym() {
  return null;
}
function zm(e) {
  return e === null;
}
var Yc = new Vm("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Wm,
  construct: Ym,
  predicate: zm,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
const Xm = Pe;
function Km(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Jm(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Qm(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var zc = new Xm("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Km,
  construct: Jm,
  predicate: Qm,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
const Zm = We, e0 = Pe;
function t0(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function n0(e) {
  return e >= 48 && e <= 55;
}
function r0(e) {
  return e >= 48 && e <= 57;
}
function i0(e) {
  if (e === null) return !1;
  const t = e.length;
  let n = 0, r = !1;
  if (!t) return !1;
  let i = e[n];
  if ((i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++) {
        if (i = e[n], i !== "0" && i !== "1") return !1;
        r = !0;
      }
      return r && isFinite(Pn(e));
    }
    if (i === "x") {
      for (n++; n < t; n++) {
        if (!t0(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(Pn(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!n0(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(Pn(e));
    }
  }
  for (; n < t; n++) {
    if (!r0(e.charCodeAt(n)))
      return !1;
    r = !0;
  }
  return r ? isFinite(Pn(e)) : !1;
}
function Pn(e) {
  let t = e, n = 1, r = t[0];
  if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function o0(e) {
  return Pn(e);
}
function s0(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Zm.isNegativeZero(e);
}
var Xc = new e0("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: i0,
  construct: o0,
  predicate: s0,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
const Kc = We, a0 = Pe, l0 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), c0 = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function u0(e) {
  return e === null || !l0.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : c0.test(e);
}
function f0(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const d0 = /^[-+]?[0-9]+e/;
function h0(e, t) {
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Kc.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return d0.test(n) ? n.replace("e", ".e") : n;
}
function p0(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Kc.isNegativeZero(e));
}
var Jc = new a0("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: u0,
  construct: f0,
  predicate: p0,
  represent: h0,
  defaultStyle: "lowercase"
}), Qc = Wc.extend({
  implicit: [
    Yc,
    zc,
    Xc,
    Jc
  ]
}), Zc = Qc;
const m0 = Pe, eu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), tu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function g0(e) {
  return e === null ? !1 : eu.exec(e) !== null || tu.exec(e) !== null;
}
function E0(e) {
  let t = 0, n = null, r = eu.exec(e);
  if (r === null && (r = tu.exec(e)), r === null) throw new Error("Date resolve error");
  const i = +r[1], o = +r[2] - 1, s = +r[3];
  if (!r[4])
    return new Date(Date.UTC(i, o, s));
  const a = +r[4], c = +r[5], m = +r[6];
  if (r[7]) {
    for (t = r[7].slice(0, 3); t.length < 3; )
      t += "0";
    t = +t;
  }
  if (r[9]) {
    const f = +r[10], h = +(r[11] || 0);
    n = (f * 60 + h) * 6e4, r[9] === "-" && (n = -n);
  }
  const l = new Date(Date.UTC(i, o, s, a, c, m, t));
  return n && l.setTime(l.getTime() - n), l;
}
function y0(e) {
  return e.toISOString();
}
var nu = new m0("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: g0,
  construct: E0,
  instanceOf: Date,
  represent: y0
});
const w0 = Pe;
function _0(e) {
  return e === "<<" || e === null;
}
var ru = new w0("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: _0
});
const v0 = Pe, Yo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function A0(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = Yo;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function T0(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = Yo;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function S0(e) {
  let t = "", n = 0;
  const r = e.length, i = Yo;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function C0(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var iu = new v0("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: A0,
  construct: T0,
  predicate: C0,
  represent: S0
});
const b0 = Pe, da = Object.prototype.hasOwnProperty, O0 = Object.prototype.toString;
function $0(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (O0.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (da.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || da.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function I0(e) {
  return e !== null ? e : [];
}
var ou = new b0("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: $0,
  construct: I0
});
const R0 = Pe, P0 = Object.prototype.toString;
function N0(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (P0.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function D0(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var su = new R0("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: N0,
  construct: D0
});
const F0 = Pe, x0 = Object.prototype.hasOwnProperty;
function L0(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (x0.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function U0(e) {
  return e !== null ? e : {};
}
var au = new F0("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: L0,
  construct: U0
}), zo = Zc.extend({
  implicit: [
    nu,
    ru
  ],
  explicit: [
    iu,
    ou,
    su,
    au
  ]
});
const Dt = We, lu = ir, k0 = xm, M0 = zo, Ve = Object.prototype.hasOwnProperty, Yr = 1, cu = 2, uu = 3, zr = 4, qi = 1, B0 = 2, ha = 3, H0 = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, j0 = /[\x85\u2028\u2029]/, q0 = /[,\[\]{}]/, fu = /^(?:!|!!|![0-9A-Za-z-]+!)$/, du = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function pa(e) {
  return Object.prototype.toString.call(e);
}
function Ze(e) {
  return e === 10 || e === 13;
}
function it(e) {
  return e === 9 || e === 32;
}
function Fe(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function nn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function G0(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function V0(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function W0(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function ma(e) {
  switch (e) {
    case 48:
      return "\0";
    case 97:
      return "\x07";
    case 98:
      return "\b";
    case 116:
      return "	";
    case 9:
      return "	";
    case 110:
      return `
`;
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 114:
      return "\r";
    case 101:
      return "\x1B";
    case 32:
      return " ";
    case 34:
      return '"';
    case 47:
      return "/";
    case 92:
      return "\\";
    case 78:
      return "";
    case 95:
      return " ";
    case 76:
      return "\u2028";
    case 80:
      return "\u2029";
    default:
      return "";
  }
}
function Y0(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function hu(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const pu = new Array(256), mu = new Array(256);
for (let e = 0; e < 256; e++)
  pu[e] = ma(e) ? 1 : 0, mu[e] = ma(e);
function z0(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || M0, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function gu(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = k0(n), new lu(t, n);
}
function L(e, t) {
  throw gu(e, t);
}
function Xr(e, t) {
  e.onWarning && e.onWarning.call(null, gu(e, t));
}
function Ft(e, t, n) {
  const r = e.anchorMapTransactions;
  if (r.length !== 0) {
    const i = r[r.length - 1];
    Ve.call(i, t) || (i[t] = {
      existed: Ve.call(e.anchorMap, t),
      value: e.anchorMap[t]
    });
  }
  e.anchorMap[t] = n;
}
function X0(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function K0(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    Ve.call(r, a) || (r[a] = t[a]);
  }
}
function J0(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function Eu(e) {
  return {
    position: e.position,
    line: e.line,
    lineStart: e.lineStart,
    lineIndent: e.lineIndent,
    firstTabInLine: e.firstTabInLine,
    tag: e.tag,
    anchor: e.anchor,
    kind: e.kind,
    result: e.result
  };
}
function ga(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const Ea = {
  YAML: function(t, n, r) {
    t.version !== null && L(t, "duplication of %YAML directive"), r.length !== 1 && L(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && L(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && L(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Xr(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && L(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], fu.test(o) || L(t, "ill-formed tag handle (first argument) of the TAG directive"), Ve.call(t.tagMap, o) && L(t, 'there is a previously declared suffix for "' + o + '" tag handle'), du.test(i) || L(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      L(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function Et(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || L(e, "expected valid JSON character");
      }
    else H0.test(i) && L(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function ya(e, t, n, r) {
  Dt.isObject(n) || L(e, "cannot merge mappings; the provided source object is unacceptable");
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    e.maxTotalMergeKeys !== -1 && ++e.totalMergeKeys > e.maxTotalMergeKeys && L(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")"), Ve.call(t, a) || (hu(t, a, n[a]), r[a] = !0);
  }
}
function rn(e, t, n, r, i, o, s, a, c) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let m = 0, l = i.length; m < l; m += 1)
      Array.isArray(i[m]) && L(e, "nested arrays are not supported inside keys"), typeof i == "object" && pa(i[m]) === "[object Object]" && (i[m] = "[object Object]");
  }
  if (typeof i == "object" && pa(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (let m = 0, l = o.length; m < l; m += 1)
        ya(e, t, o[m], n);
    else
      ya(e, t, o, n);
  else
    !e.json && !Ve.call(n, i) && Ve.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = c || e.position, L(e, "duplicated mapping key")), hu(t, i, o), delete n[i];
  return t;
}
function Xo(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : L(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function le(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; it(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Ze(i))
      for (Xo(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && Xr(e, "deficient indentation"), r;
}
function li(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Fe(n)));
}
function Ko(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Dt.repeat(`
`, t - 1));
}
function Q0(e, t, n) {
  let r, i, o, s, a, c;
  const m = e.kind, l = e.result;
  let f = e.input.charCodeAt(e.position);
  if (Fe(f) || nn(f) || f === 35 || f === 38 || f === 42 || f === 33 || f === 124 || f === 62 || f === 39 || f === 34 || f === 37 || f === 64 || f === 96)
    return !1;
  if (f === 63 || f === 45) {
    const h = e.input.charCodeAt(e.position + 1);
    if (Fe(h) || n && nn(h))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; f !== 0; ) {
    if (f === 58) {
      const h = e.input.charCodeAt(e.position + 1);
      if (Fe(h) || n && nn(h))
        break;
    } else if (f === 35) {
      const h = e.input.charCodeAt(e.position - 1);
      if (Fe(h))
        break;
    } else {
      if (e.position === e.lineStart && li(e) || n && nn(f))
        break;
      if (Ze(f))
        if (s = e.line, a = e.lineStart, c = e.lineIndent, le(e, !1, -1), e.lineIndent >= t) {
          o = !0, f = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = c;
          break;
        }
    }
    o && (Et(e, r, i, !1), Ko(e, e.line - s), r = i = e.position, o = !1), it(f) || (i = e.position + 1), f = e.input.charCodeAt(++e.position);
  }
  return Et(e, r, i, !1), e.result ? !0 : (e.kind = m, e.result = l, !1);
}
function Z0(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Et(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else Ze(i) ? (Et(e, n, r, !0), Ko(e, le(e, !1, t)), n = r = e.position) : e.position === e.lineStart && li(e) ? L(e, "unexpected end of the document within a single quoted scalar") : (e.position++, it(i) || (r = e.position));
  L(e, "unexpected end of the stream within a single quoted scalar");
}
function eg(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Et(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Et(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), Ze(o))
        le(e, !1, t);
      else if (o < 256 && pu[o])
        e.result += mu[o], e.position++;
      else if ((i = V0(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = G0(o)) >= 0 ? a = (a << 4) + i : L(e, "expected hexadecimal character");
        e.result += Y0(a), e.position++;
      } else
        L(e, "unknown escape sequence");
      n = r = e.position;
    } else Ze(o) ? (Et(e, n, r, !0), Ko(e, le(e, !1, t)), n = r = e.position) : e.position === e.lineStart && li(e) ? L(e, "unexpected end of the document within a double quoted scalar") : (e.position++, it(o) || (r = e.position));
  }
  L(e, "unexpected end of the stream within a double quoted scalar");
}
function tg(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const c = e.anchor;
  let m, l, f, h;
  const g = /* @__PURE__ */ Object.create(null);
  let _, E, A, T = e.input.charCodeAt(e.position);
  if (T === 91)
    m = 93, h = !1, a = [];
  else if (T === 123)
    m = 125, h = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && Ft(e, e.anchor, a), T = e.input.charCodeAt(++e.position); T !== 0; ) {
    if (le(e, !0, t), T = e.input.charCodeAt(e.position), T === m)
      return e.position++, e.tag = s, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = a, !0;
    if (n ? T === 44 && L(e, "expected the node content, but found ','") : L(e, "missed comma between flow collection entries"), E = _ = A = null, l = f = !1, T === 63) {
      const $ = e.input.charCodeAt(e.position + 1);
      Fe($) && (l = f = !0, e.position++, le(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, pn(e, t, Yr, !1, !0), E = e.tag, _ = e.result, le(e, !0, t), T = e.input.charCodeAt(e.position), (f || e.line === r) && T === 58 && (l = !0, T = e.input.charCodeAt(++e.position), le(e, !0, t), pn(e, t, Yr, !1, !0), A = e.result), h ? rn(e, a, g, E, _, A, r, i, o) : l ? a.push(rn(e, null, g, E, _, A, r, i, o)) : a.push(_), le(e, !0, t), T = e.input.charCodeAt(e.position), T === 44 ? (n = !0, T = e.input.charCodeAt(++e.position)) : n = !1;
  }
  L(e, "unexpected end of the stream within a flow collection");
}
function ng(e, t) {
  let n, r = qi, i = !1, o = !1, s = t, a = 0, c = !1, m, l = e.input.charCodeAt(e.position);
  if (l === 124)
    n = !1;
  else if (l === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; l !== 0; )
    if (l = e.input.charCodeAt(++e.position), l === 43 || l === 45)
      qi === r ? r = l === 43 ? ha : B0 : L(e, "repeat of a chomping mode identifier");
    else if ((m = W0(l)) >= 0)
      m === 0 ? L(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? L(e, "repeat of an indentation width identifier") : (s = t + m - 1, o = !0);
    else
      break;
  if (it(l)) {
    do
      l = e.input.charCodeAt(++e.position);
    while (it(l));
    if (l === 35)
      do
        l = e.input.charCodeAt(++e.position);
      while (!Ze(l) && l !== 0);
  }
  for (; l !== 0; ) {
    for (Xo(e), e.lineIndent = 0, l = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && l === 32; )
      e.lineIndent++, l = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), Ze(l)) {
      a++;
      continue;
    }
    if (!o && s === 0 && L(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === ha ? e.result += Dt.repeat(`
`, i ? 1 + a : a) : r === qi && i && (e.result += `
`);
      break;
    }
    n ? it(l) ? (c = !0, e.result += Dt.repeat(`
`, i ? 1 + a : a)) : c ? (c = !1, e.result += Dt.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += Dt.repeat(`
`, a) : e.result += Dt.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const f = e.position;
    for (; !Ze(l) && l !== 0; )
      l = e.input.charCodeAt(++e.position);
    Et(e, f, e.position, !1);
  }
  return !0;
}
function wa(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && Ft(e, e.anchor, i);
  let s = e.input.charCodeAt(e.position);
  for (; s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation")), s === 45); ) {
    const a = e.input.charCodeAt(e.position + 1);
    if (!Fe(a))
      break;
    if (o = !0, e.position++, le(e, !0, -1) && e.lineIndent <= t) {
      i.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    const c = e.line;
    if (pn(e, t, uu, !1, !0), i.push(e.result), le(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === c || e.lineIndent > t) && s !== 0)
      L(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function yu(e, t, n) {
  let r, i, o, s;
  const a = e.tag, c = e.anchor, m = {}, l = /* @__PURE__ */ Object.create(null);
  let f = null, h = null, g = null, _ = !1, E = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && Ft(e, e.anchor, m);
  let A = e.input.charCodeAt(e.position);
  for (; A !== 0; ) {
    !_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, L(e, "tab characters must not be used in indentation"));
    const T = e.input.charCodeAt(e.position + 1), $ = e.line;
    if ((A === 63 || A === 58) && Fe(T))
      A === 63 ? (_ && (rn(e, m, l, f, h, null, i, o, s), f = h = g = null), E = !0, _ = !0, r = !0) : _ ? (_ = !1, r = !0) : L(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, A = T;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !pn(e, n, cu, !1, !0))
        break;
      if (e.line === $) {
        for (A = e.input.charCodeAt(e.position); it(A); )
          A = e.input.charCodeAt(++e.position);
        if (A === 58)
          A = e.input.charCodeAt(++e.position), Fe(A) || L(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (rn(e, m, l, f, h, null, i, o, s), f = h = g = null), E = !0, _ = !1, r = !1, f = e.tag, h = e.result;
        else if (E)
          L(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = c, !0;
      } else if (E)
        L(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = c, !0;
    }
    if ((e.line === $ || e.lineIndent > t) && (_ && (i = e.line, o = e.lineStart, s = e.position), pn(e, t, zr, !0, r) && (_ ? h = e.result : g = e.result), _ || (rn(e, m, l, f, h, g, i, o, s), f = h = g = null), le(e, !0, -1), A = e.input.charCodeAt(e.position)), (e.line === $ || e.lineIndent > t) && A !== 0)
      L(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && rn(e, m, l, f, h, null, i, o, s), E && (e.tag = a, e.anchor = c, e.kind = "mapping", e.result = m), E;
}
function rg(e) {
  let t = !1, n = !1, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 33) return !1;
  e.tag !== null && L(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (t = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!";
  let s = e.position;
  if (t) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (i = e.input.slice(s, e.position), o = e.input.charCodeAt(++e.position)) : L(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Fe(o); )
      o === 33 && (n ? L(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), fu.test(r) || L(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), q0.test(i) && L(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !du.test(i) && L(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    L(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : Ve.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : L(e, 'undeclared tag handle "' + r + '"'), !0;
}
function ig(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && L(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Fe(t) && !nn(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && L(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function og(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Fe(t) && !nn(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && L(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return Ve.call(e.anchorMap, r) || L(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], le(e, !0, -1), !0;
}
function sg(e, t, n, r) {
  const i = Eu(e);
  return X0(e), ga(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, yu(e, n, r) && e.kind === "mapping" ? (K0(e), !0) : (J0(e), ga(e, i), !1);
}
function pn(e, t, n, r, i) {
  let o, s, a = 1, c = !1, m = !1, l = null, f, h, g;
  e.depth >= e.maxDepth && L(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const _ = o = s = zr === n || uu === n;
  if (r && le(e, !0, -1) && (c = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const E = e.input.charCodeAt(e.position), A = Eu(e);
      if (c && (E === 33 && e.tag !== null || E === 38 && e.anchor !== null) || !rg(e) && !ig(e))
        break;
      l === null && (l = A), le(e, !0, -1) ? (c = !0, s = _, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = c || i), a === 1 || zr === n)
    if (Yr === n || cu === n ? h = t : h = t + 1, g = e.position - e.lineStart, a === 1)
      if (s && (wa(e, g) || yu(e, g, h)) || tg(e, h))
        m = !0;
      else {
        const E = e.input.charCodeAt(e.position);
        l !== null && _ && !s && E !== 124 && E !== 62 && sg(
          e,
          l,
          l.position - l.lineStart,
          h
        ) || o && ng(e, h) || Z0(e, h) || eg(e, h) ? m = !0 : og(e) ? (m = !0, (e.tag !== null || e.anchor !== null) && L(e, "alias node should not have any properties")) : Q0(e, h, Yr === n) && (m = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && Ft(e, e.anchor, e.result);
      }
    else a === 0 && (m = s && wa(e, g));
  if (e.tag === null)
    e.anchor !== null && Ft(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && L(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let E = 0, A = e.implicitTypes.length; E < A; E += 1)
      if (f = e.implicitTypes[E], f.resolve(e.result)) {
        e.result = f.construct(e.result), e.tag = f.tag, e.anchor !== null && Ft(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Ve.call(e.typeMap[e.kind || "fallback"], e.tag))
      f = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      f = null;
      const E = e.typeMap.multi[e.kind || "fallback"];
      for (let A = 0, T = E.length; A < T; A += 1)
        if (e.tag.slice(0, E[A].tag.length) === E[A].tag) {
          f = E[A];
          break;
        }
    }
    f || L(e, "unknown tag !<" + e.tag + ">"), e.result !== null && f.kind !== e.kind && L(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + f.kind + '", not "' + e.kind + '"'), f.resolve(e.result, e.tag) ? (e.result = f.construct(e.result, e.tag), e.anchor !== null && Ft(e, e.anchor, e.result)) : L(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || m;
}
function ag(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (le(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !Fe(r); )
      r = e.input.charCodeAt(++e.position);
    const o = e.input.slice(i, e.position), s = [];
    for (o.length < 1 && L(e, "directive name must not be less than one character in length"); r !== 0; ) {
      for (; it(r); )
        r = e.input.charCodeAt(++e.position);
      if (r === 35) {
        do
          r = e.input.charCodeAt(++e.position);
        while (r !== 0 && !Ze(r));
        break;
      }
      if (Ze(r)) break;
      for (i = e.position; r !== 0 && !Fe(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && Xo(e), Ve.call(Ea, o) ? Ea[o](e, o, s) : Xr(e, 'unknown document directive "' + o + '"');
  }
  if (le(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, le(e, !0, -1)) : n && L(e, "directives end mark is expected"), pn(e, e.lineIndent - 1, zr, !1, !0), le(e, !0, -1), e.checkLineBreaks && j0.test(e.input.slice(t, e.position)) && Xr(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && li(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, le(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && L(e, "end of the stream or a document separator is expected");
}
function wu(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new z0(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, L(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    ag(n);
  return n.documents;
}
function lg(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = wu(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function cg(e, t) {
  const n = wu(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new lu("expected a single document in the stream, but found more");
  }
}
Wo.loadAll = lg;
Wo.load = cg;
var _u = {};
const ci = We, or = ir, ug = zo, vu = Object.prototype.toString, Au = Object.prototype.hasOwnProperty, Jo = 65279, fg = 9, qn = 10, dg = 13, hg = 32, pg = 33, mg = 34, To = 35, gg = 37, Eg = 38, yg = 39, wg = 42, Tu = 44, _g = 45, Kr = 58, vg = 61, Ag = 62, Tg = 63, Sg = 64, Su = 91, Cu = 93, Cg = 96, bu = 123, bg = 124, Ou = 125, Ce = {};
Ce[0] = "\\0";
Ce[7] = "\\a";
Ce[8] = "\\b";
Ce[9] = "\\t";
Ce[10] = "\\n";
Ce[11] = "\\v";
Ce[12] = "\\f";
Ce[13] = "\\r";
Ce[27] = "\\e";
Ce[34] = '\\"';
Ce[92] = "\\\\";
Ce[133] = "\\N";
Ce[160] = "\\_";
Ce[8232] = "\\L";
Ce[8233] = "\\P";
const Og = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], $g = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Ig(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const c = e.compiledTypeMap.fallback[s];
    c && Au.call(c.styleAliases, a) && (a = c.styleAliases[a]), n[s] = a;
  }
  return n;
}
function Rg(e) {
  let t, n;
  const r = e.toString(16).toUpperCase();
  if (e <= 255)
    t = "x", n = 2;
  else if (e <= 65535)
    t = "u", n = 4;
  else if (e <= 4294967295)
    t = "U", n = 8;
  else
    throw new or("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + t + ci.repeat("0", n - r.length) + r;
}
const Pg = 1, Gn = 2;
function Ng(e) {
  this.schema = e.schema || ug, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = ci.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Ig(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Gn : Pg, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function _a(e, t) {
  const n = ci.repeat(" ", t);
  let r = 0, i = "";
  const o = e.length;
  for (; r < o; ) {
    let s;
    const a = e.indexOf(`
`, r);
    a === -1 ? (s = e.slice(r), r = o) : (s = e.slice(r, a + 1), r = a + 1), s.length && s !== `
` && (i += n), i += s;
  }
  return i;
}
function So(e, t) {
  return `
` + ci.repeat(" ", e.indent * t);
}
function Dg(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function Jr(e) {
  return e === hg || e === fg;
}
function Vn(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Jo || e >= 65536 && e <= 1114111;
}
function va(e) {
  return Vn(e) && e !== Jo && // - b-char
  e !== dg && e !== qn;
}
function Aa(e, t, n) {
  const r = va(e), i = r && !Jr(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== Tu && e !== Su && e !== Cu && e !== bu && e !== Ou) && // ns-plain-char
    e !== To && // false on '#'
    !(t === Kr && !i) || // false on ': '
    va(t) && !Jr(t) && e === To || // change to true on '[^ ]#'
    t === Kr && i
  );
}
function Fg(e) {
  return Vn(e) && e !== Jo && !Jr(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== _g && e !== Tg && e !== Kr && e !== Tu && e !== Su && e !== Cu && e !== bu && e !== Ou && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== To && e !== Eg && e !== wg && e !== pg && e !== bg && e !== vg && e !== Ag && e !== yg && e !== mg && // | “%” | “@” | “`”)
  e !== gg && e !== Sg && e !== Cg;
}
function xg(e) {
  return !Jr(e) && e !== Kr;
}
function Nn(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function $u(e) {
  return /^\n* /.test(e);
}
const Iu = 1, Co = 2, Ru = 3, Pu = 4, Zt = 5;
function Lg(e, t, n, r, i, o, s, a) {
  let c, m = 0, l = null, f = !1, h = !1;
  const g = r !== -1;
  let _ = -1, E = Fg(Nn(e, 0)) && xg(Nn(e, e.length - 1));
  if (t || s)
    for (c = 0; c < e.length; m >= 65536 ? c += 2 : c++) {
      if (m = Nn(e, c), !Vn(m))
        return Zt;
      E = E && Aa(m, l, a), l = m;
    }
  else {
    for (c = 0; c < e.length; m >= 65536 ? c += 2 : c++) {
      if (m = Nn(e, c), m === qn)
        f = !0, g && (h = h || // Foldable line = too long, and not more-indented.
        c - _ - 1 > r && e[_ + 1] !== " ", _ = c);
      else if (!Vn(m))
        return Zt;
      E = E && Aa(m, l, a), l = m;
    }
    h = h || g && c - _ - 1 > r && e[_ + 1] !== " ";
  }
  return !f && !h ? E && !s && !i(e) ? Iu : o === Gn ? Zt : Co : n > 9 && $u(e) ? Zt : s ? o === Gn ? Zt : Co : h ? Pu : Ru;
}
function Ug(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Gn ? '""' : "''";
    if (!e.noCompatMode && (Og.indexOf(t) !== -1 || $g.test(t)))
      return e.quotingType === Gn ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function c(m) {
      return Dg(e, m);
    }
    switch (Lg(
      t,
      a,
      e.indent,
      s,
      c,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case Iu:
        return t;
      case Co:
        return "'" + t.replace(/'/g, "''") + "'";
      case Ru:
        return "|" + Ta(t, e.indent) + Sa(_a(t, o));
      case Pu:
        return ">" + Ta(t, e.indent) + Sa(_a(kg(t, s), o));
      case Zt:
        return '"' + Mg(t) + '"';
      default:
        throw new or("impossible error: invalid scalar style");
    }
  }();
}
function Ta(e, t) {
  const n = $u(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function Sa(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function kg(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, Ca(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], c = s[2];
    o = c[0] === " ", r += a + (!i && !o && c !== "" ? `
` : "") + Ca(c, t), i = o;
  }
  return r;
}
function Ca(e, t) {
  if (e === "" || e[0] === " ") return e;
  const n = / [^ ]/g;
  let r, i = 0, o, s = 0, a = 0, c = "";
  for (; r = n.exec(e); )
    a = r.index, a - i > t && (o = s > i ? s : a, c += `
` + e.slice(i, o), i = o + 1), s = a;
  return c += `
`, e.length - i > t && s > i ? c += e.slice(i, s) + `
` + e.slice(s + 1) : c += e.slice(i), c.slice(1);
}
function Mg(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = Nn(e, r);
    const i = Ce[n];
    !i && Vn(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || Rg(n);
  }
  return t;
}
function Bg(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (ot(e, t, a, !1, !1) || typeof a > "u" && ot(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function ba(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let c = n[s];
    e.replacer && (c = e.replacer.call(n, String(s), c)), (ot(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && ot(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += So(e, t)), e.dump && qn === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function Hg(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let c = "";
    r !== "" && (c += ", "), e.condenseFlow && (c += '"');
    const m = o[s];
    let l = n[m];
    e.replacer && (l = e.replacer.call(n, m, l)), ot(e, t, m, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), ot(e, t, l, !1, !1) && (c += e.dump, r += c));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function jg(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new or("sortKeys must be a boolean or a function");
  for (let a = 0, c = s.length; a < c; a += 1) {
    let m = "";
    (!r || i !== "") && (m += So(e, t));
    const l = s[a];
    let f = n[l];
    if (e.replacer && (f = e.replacer.call(n, l, f)), !ot(e, t + 1, l, !0, !0, !0))
      continue;
    const h = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    h && (e.dump && qn === e.dump.charCodeAt(0) ? m += "?" : m += "? "), m += e.dump, h && (m += So(e, t)), ot(e, t + 1, f, !0, h) && (e.dump && qn === e.dump.charCodeAt(0) ? m += ":" : m += ": ", m += e.dump, i += m);
  }
  e.tag = o, e.dump = i || "{}";
}
function Oa(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let c;
        if (vu.call(s.represent) === "[object Function]")
          c = s.represent(t, a);
        else if (Au.call(s.represent, a))
          c = s.represent[a](t, a);
        else
          throw new or("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = c;
      }
      return !0;
    }
  }
  return !1;
}
function ot(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, Oa(e, n, !1) || Oa(e, n, !0);
  const a = vu.call(e.dump), c = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const m = a === "[object Object]" || a === "[object Array]";
  let l, f;
  if (m && (l = e.duplicates.indexOf(n), f = l !== -1), (e.tag !== null && e.tag !== "?" || f || e.indent !== 2 && t > 0) && (i = !1), f && e.usedDuplicates[l])
    e.dump = "*ref_" + l;
  else {
    if (m && f && !e.usedDuplicates[l] && (e.usedDuplicates[l] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (jg(e, t, e.dump, i), f && (e.dump = "&ref_" + l + e.dump)) : (Hg(e, t, e.dump), f && (e.dump = "&ref_" + l + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? ba(e, t - 1, e.dump, i) : ba(e, t, e.dump, i), f && (e.dump = "&ref_" + l + e.dump)) : (Bg(e, t, e.dump), f && (e.dump = "&ref_" + l + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && Ug(e, e.dump, t, o, c);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new or("unacceptable kind of an object to dump " + a);
    }
    if (e.tag !== null && e.tag !== "?") {
      let h = encodeURI(
        e.tag[0] === "!" ? e.tag.slice(1) : e.tag
      ).replace(/!/g, "%21");
      e.tag[0] === "!" ? h = "!" + h : h.slice(0, 18) === "tag:yaml.org,2002:" ? h = "!!" + h.slice(18) : h = "!<" + h + ">", e.dump = h + " " + e.dump;
    }
  }
  return !0;
}
function qg(e, t) {
  const n = [], r = [];
  bo(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function bo(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        bo(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        bo(e[i[o]], t, n);
    }
  }
}
function Gg(e, t) {
  t = t || {};
  const n = new Ng(t);
  n.noRefs || qg(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), ot(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
_u.dump = Gg;
const Nu = Wo, Vg = _u;
function Qo(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
we.Type = Pe;
we.Schema = jc;
we.FAILSAFE_SCHEMA = Wc;
we.JSON_SCHEMA = Qc;
we.CORE_SCHEMA = Zc;
we.DEFAULT_SCHEMA = zo;
we.load = Nu.load;
we.loadAll = Nu.loadAll;
we.dump = Vg.dump;
we.YAMLException = ir;
we.types = {
  binary: iu,
  float: Jc,
  map: Vc,
  null: Yc,
  pairs: su,
  set: au,
  timestamp: nu,
  bool: zc,
  int: Xc,
  merge: ru,
  omap: ou,
  seq: Gc,
  str: qc
};
we.safeLoad = Qo("safeLoad", "load");
we.safeLoadAll = Qo("safeLoadAll", "loadAll");
we.safeDump = Qo("safeDump", "dump");
var ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.Lazy = void 0;
class Wg {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
ui.Lazy = Wg;
var Oo = { exports: {} };
const Yg = "2.0.0", Du = 256, zg = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Xg = 16, Kg = Du - 6, Jg = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var fi = {
  MAX_LENGTH: Du,
  MAX_SAFE_COMPONENT_LENGTH: Xg,
  MAX_SAFE_BUILD_LENGTH: Kg,
  MAX_SAFE_INTEGER: zg,
  RELEASE_TYPES: Jg,
  SEMVER_SPEC_VERSION: Yg,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Qg = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var di = Qg;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = fi, o = di;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], c = t.src = [], m = t.safeSrc = [], l = t.t = {};
  let f = 0;
  const h = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", i],
    [h, r]
  ], _ = (A) => {
    for (const [T, $] of g)
      A = A.split(`${T}*`).join(`${T}{0,${$}}`).split(`${T}+`).join(`${T}{1,${$}}`);
    return A;
  }, E = (A, T, $) => {
    const D = _(T), B = f++;
    o(A, B, T), l[A] = B, c[B] = T, m[B] = D, s[B] = new RegExp(T, $ ? "g" : void 0), a[B] = new RegExp(D, $ ? "g" : void 0);
  };
  E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), E("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${h}+`), E("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), E("FULL", `^${c[l.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), E("LOOSE", `^${c[l.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), E("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), E("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", c[l.COERCE], !0), E("COERCERTLFULL", c[l.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", E("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", E("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Oo, Oo.exports);
var sr = Oo.exports;
const Zg = Object.freeze({ loose: !0 }), eE = Object.freeze({}), tE = (e) => e ? typeof e != "object" ? Zg : e : eE;
var Zo = tE;
const $a = /^[0-9]+$/, Fu = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = $a.test(e), r = $a.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, nE = (e, t) => Fu(t, e);
var xu = {
  compareIdentifiers: Fu,
  rcompareIdentifiers: nE
};
const br = di, { MAX_LENGTH: Ia, MAX_SAFE_INTEGER: Or } = fi, { safeRe: $r, t: Ir } = sr, rE = Zo, { compareIdentifiers: Gi } = xu;
let iE = class Je {
  constructor(t, n) {
    if (n = rE(n), t instanceof Je) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ia)
      throw new TypeError(
        `version is longer than ${Ia} characters`
      );
    br("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? $r[Ir.LOOSE] : $r[Ir.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > Or || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Or || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Or || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < Or)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (br("SemVer.compare", this.version, this.options, t), !(t instanceof Je)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Je(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Je || (t = new Je(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof Je || (t = new Je(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (br("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Gi(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof Je || (t = new Je(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (br("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Gi(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? $r[Ir.PRERELEASELOOSE] : $r[Ir.PRERELEASE]);
        if (!i || i[1] !== n)
          throw new Error(`invalid identifier: ${n}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(r) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (n) {
          let o = [n, i];
          r === !1 && (o = [n]), Gi(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ne = iE;
const Ra = Ne, oE = (e, t, n = !1) => {
  if (e instanceof Ra)
    return e;
  try {
    return new Ra(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var En = oE;
const sE = En, aE = (e, t) => {
  const n = sE(e, t);
  return n ? n.version : null;
};
var lE = aE;
const cE = En, uE = (e, t) => {
  const n = cE(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var fE = uE;
const Pa = Ne, dE = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new Pa(
      e instanceof Pa ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var hE = dE;
const Na = En, pE = (e, t) => {
  const n = Na(e, null, !0), r = Na(t, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const o = i > 0, s = o ? n : r, a = o ? r : n, c = !!s.prerelease.length;
  if (!!a.prerelease.length && !c) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(s) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return n.major !== r.major ? l + "major" : n.minor !== r.minor ? l + "minor" : n.patch !== r.patch ? l + "patch" : "prerelease";
};
var mE = pE;
const gE = Ne, EE = (e, t) => new gE(e, t).major;
var yE = EE;
const wE = Ne, _E = (e, t) => new wE(e, t).minor;
var vE = _E;
const AE = Ne, TE = (e, t) => new AE(e, t).patch;
var SE = TE;
const CE = En, bE = (e, t) => {
  const n = CE(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var OE = bE;
const Da = Ne, $E = (e, t, n) => new Da(e, n).compare(new Da(t, n));
var Ye = $E;
const IE = Ye, RE = (e, t, n) => IE(t, e, n);
var PE = RE;
const NE = Ye, DE = (e, t) => NE(e, t, !0);
var FE = DE;
const Fa = Ne, xE = (e, t, n) => {
  const r = new Fa(e, n), i = new Fa(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var es = xE;
const LE = es, UE = (e, t) => e.sort((n, r) => LE(n, r, t));
var kE = UE;
const ME = es, BE = (e, t) => e.sort((n, r) => ME(r, n, t));
var HE = BE;
const jE = Ye, qE = (e, t, n) => jE(e, t, n) > 0;
var hi = qE;
const GE = Ye, VE = (e, t, n) => GE(e, t, n) < 0;
var ts = VE;
const WE = Ye, YE = (e, t, n) => WE(e, t, n) === 0;
var Lu = YE;
const zE = Ye, XE = (e, t, n) => zE(e, t, n) !== 0;
var Uu = XE;
const KE = Ye, JE = (e, t, n) => KE(e, t, n) >= 0;
var ns = JE;
const QE = Ye, ZE = (e, t, n) => QE(e, t, n) <= 0;
var rs = ZE;
const ey = Lu, ty = Uu, ny = hi, ry = ns, iy = ts, oy = rs, sy = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return ey(e, n, r);
    case "!=":
      return ty(e, n, r);
    case ">":
      return ny(e, n, r);
    case ">=":
      return ry(e, n, r);
    case "<":
      return iy(e, n, r);
    case "<=":
      return oy(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var ku = sy;
const ay = Ne, ly = En, { safeRe: Rr, t: Pr } = sr, cy = (e, t) => {
  if (e instanceof ay)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? Rr[Pr.COERCEFULL] : Rr[Pr.COERCE]);
  else {
    const c = t.includePrerelease ? Rr[Pr.COERCERTLFULL] : Rr[Pr.COERCERTL];
    let m;
    for (; (m = c.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || m.index + m[0].length !== n.index + n[0].length) && (n = m), c.lastIndex = m.index + m[1].length + m[2].length;
    c.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return ly(`${r}.${i}.${o}${s}${a}`, t);
};
var uy = cy;
class fy {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var dy = fy, Vi, xa;
function ze() {
  if (xa) return Vi;
  xa = 1;
  const e = /\s+/g;
  class t {
    constructor(O, P) {
      if (P = i(P), O instanceof t)
        return O.loose === !!P.loose && O.includePrerelease === !!P.includePrerelease ? O : new t(O.raw, P);
      if (O instanceof o)
        return this.raw = O.value, this.set = [[O]], this.formatted = void 0, this;
      if (this.options = P, this.loose = !!P.loose, this.includePrerelease = !!P.includePrerelease, this.raw = O.trim().replace(e, " "), this.set = this.raw.split("||").map((b) => this.parseRange(b.trim())).filter((b) => b.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const b = this.set[0];
        if (this.set = this.set.filter((N) => !E(N[0])), this.set.length === 0)
          this.set = [b];
        else if (this.set.length > 1) {
          for (const N of this.set)
            if (N.length === 1 && A(N[0])) {
              this.set = [N];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let O = 0; O < this.set.length; O++) {
          O > 0 && (this.formatted += "||");
          const P = this.set[O];
          for (let b = 0; b < P.length; b++)
            b > 0 && (this.formatted += " "), this.formatted += P[b].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(O) {
      const b = ((this.options.includePrerelease && g) | (this.options.loose && _)) + ":" + O, N = r.get(b);
      if (N)
        return N;
      const R = this.options.loose, k = R ? c[m.HYPHENRANGELOOSE] : c[m.HYPHENRANGE];
      O = O.replace(k, Y(this.options.includePrerelease)), s("hyphen replace", O), O = O.replace(c[m.COMPARATORTRIM], l), s("comparator trim", O), O = O.replace(c[m.TILDETRIM], f), s("tilde trim", O), O = O.replace(c[m.CARETTRIM], h), s("caret trim", O);
      let G = O.split(" ").map((M) => $(M, this.options)).join(" ").split(/\s+/).map((M) => j(M, this.options));
      R && (G = G.filter((M) => (s("loose invalid filter", M, this.options), !!M.match(c[m.COMPARATORLOOSE])))), s("range list", G);
      const F = /* @__PURE__ */ new Map(), z = G.map((M) => new o(M, this.options));
      for (const M of z) {
        if (E(M))
          return [M];
        F.set(M.value, M);
      }
      F.size > 1 && F.has("") && F.delete("");
      const ue = [...F.values()];
      return r.set(b, ue), ue;
    }
    intersects(O, P) {
      if (!(O instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((b) => T(b, P) && O.set.some((N) => T(N, P) && b.every((R) => N.every((k) => R.intersects(k, P)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(O) {
      if (!O)
        return !1;
      if (typeof O == "string")
        try {
          O = new a(O, this.options);
        } catch {
          return !1;
        }
      for (let P = 0; P < this.set.length; P++)
        if (ee(this.set[P], O, this.options))
          return !0;
      return !1;
    }
  }
  Vi = t;
  const n = dy, r = new n(), i = Zo, o = pi(), s = di, a = Ne, {
    safeRe: c,
    t: m,
    comparatorTrimReplace: l,
    tildeTrimReplace: f,
    caretTrimReplace: h
  } = sr, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: _ } = fi, E = (I) => I.value === "<0.0.0-0", A = (I) => I.value === "", T = (I, O) => {
    let P = !0;
    const b = I.slice();
    let N = b.pop();
    for (; P && b.length; )
      P = b.every((R) => N.intersects(R, O)), N = b.pop();
    return P;
  }, $ = (I, O) => (I = I.replace(c[m.BUILD], ""), s("comp", I, O), I = J(I, O), s("caret", I), I = B(I, O), s("tildes", I), I = oe(I, O), s("xrange", I), I = y(I, O), s("stars", I), I), D = (I) => !I || I.toLowerCase() === "x" || I === "*", B = (I, O) => I.trim().split(/\s+/).map((P) => q(P, O)).join(" "), q = (I, O) => {
    const P = O.loose ? c[m.TILDELOOSE] : c[m.TILDE];
    return I.replace(P, (b, N, R, k, G) => {
      s("tilde", I, b, N, R, k, G);
      let F;
      return D(N) ? F = "" : D(R) ? F = `>=${N}.0.0 <${+N + 1}.0.0-0` : D(k) ? F = `>=${N}.${R}.0 <${N}.${+R + 1}.0-0` : G ? (s("replaceTilde pr", G), F = `>=${N}.${R}.${k}-${G} <${N}.${+R + 1}.0-0`) : F = `>=${N}.${R}.${k} <${N}.${+R + 1}.0-0`, s("tilde return", F), F;
    });
  }, J = (I, O) => I.trim().split(/\s+/).map((P) => Q(P, O)).join(" "), Q = (I, O) => {
    s("caret", I, O);
    const P = O.loose ? c[m.CARETLOOSE] : c[m.CARET], b = O.includePrerelease ? "-0" : "";
    return I.replace(P, (N, R, k, G, F) => {
      s("caret", I, N, R, k, G, F);
      let z;
      return D(R) ? z = "" : D(k) ? z = `>=${R}.0.0${b} <${+R + 1}.0.0-0` : D(G) ? R === "0" ? z = `>=${R}.${k}.0${b} <${R}.${+k + 1}.0-0` : z = `>=${R}.${k}.0${b} <${+R + 1}.0.0-0` : F ? (s("replaceCaret pr", F), R === "0" ? k === "0" ? z = `>=${R}.${k}.${G}-${F} <${R}.${k}.${+G + 1}-0` : z = `>=${R}.${k}.${G}-${F} <${R}.${+k + 1}.0-0` : z = `>=${R}.${k}.${G}-${F} <${+R + 1}.0.0-0`) : (s("no pr"), R === "0" ? k === "0" ? z = `>=${R}.${k}.${G}${b} <${R}.${k}.${+G + 1}-0` : z = `>=${R}.${k}.${G}${b} <${R}.${+k + 1}.0-0` : z = `>=${R}.${k}.${G} <${+R + 1}.0.0-0`), s("caret return", z), z;
    });
  }, oe = (I, O) => (s("replaceXRanges", I, O), I.split(/\s+/).map((P) => U(P, O)).join(" ")), U = (I, O) => {
    I = I.trim();
    const P = O.loose ? c[m.XRANGELOOSE] : c[m.XRANGE];
    return I.replace(P, (b, N, R, k, G, F) => {
      s("xRange", I, b, N, R, k, G, F);
      const z = D(R), ue = z || D(k), M = ue || D(G), _e = M;
      return N === "=" && _e && (N = ""), F = O.includePrerelease ? "-0" : "", z ? N === ">" || N === "<" ? b = "<0.0.0-0" : b = "*" : N && _e ? (ue && (k = 0), G = 0, N === ">" ? (N = ">=", ue ? (R = +R + 1, k = 0, G = 0) : (k = +k + 1, G = 0)) : N === "<=" && (N = "<", ue ? R = +R + 1 : k = +k + 1), N === "<" && (F = "-0"), b = `${N + R}.${k}.${G}${F}`) : ue ? b = `>=${R}.0.0${F} <${+R + 1}.0.0-0` : M && (b = `>=${R}.${k}.0${F} <${R}.${+k + 1}.0-0`), s("xRange return", b), b;
    });
  }, y = (I, O) => (s("replaceStars", I, O), I.trim().replace(c[m.STAR], "")), j = (I, O) => (s("replaceGTE0", I, O), I.trim().replace(c[O.includePrerelease ? m.GTE0PRE : m.GTE0], "")), Y = (I) => (O, P, b, N, R, k, G, F, z, ue, M, _e) => (D(b) ? P = "" : D(N) ? P = `>=${b}.0.0${I ? "-0" : ""}` : D(R) ? P = `>=${b}.${N}.0${I ? "-0" : ""}` : k ? P = `>=${P}` : P = `>=${P}${I ? "-0" : ""}`, D(z) ? F = "" : D(ue) ? F = `<${+z + 1}.0.0-0` : D(M) ? F = `<${z}.${+ue + 1}.0-0` : _e ? F = `<=${z}.${ue}.${M}-${_e}` : I ? F = `<${z}.${ue}.${+M + 1}-0` : F = `<=${F}`, `${P} ${F}`.trim()), ee = (I, O, P) => {
    for (let b = 0; b < I.length; b++)
      if (!I[b].test(O))
        return !1;
    if (O.prerelease.length && !P.includePrerelease) {
      for (let b = 0; b < I.length; b++)
        if (s(I[b].semver), I[b].semver !== o.ANY && I[b].semver.prerelease.length > 0) {
          const N = I[b].semver;
          if (N.major === O.major && N.minor === O.minor && N.patch === O.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Vi;
}
var Wi, La;
function pi() {
  if (La) return Wi;
  La = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, f) {
      if (f = n(f), l instanceof t) {
        if (l.loose === !!f.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), s("comparator", l, f), this.options = f, this.loose = !!f.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], h = l.match(f);
      if (!h)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (s("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new a(l, this.options);
        } catch {
          return !1;
        }
      return o(l, this.operator, this.semver, this.options);
    }
    intersects(l, f) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, f).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, f).test(l.semver) : (f = n(f), f.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || o(this.semver, "<", l.semver, f) && this.operator.startsWith(">") && l.operator.startsWith("<") || o(this.semver, ">", l.semver, f) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Wi = t;
  const n = Zo, { safeRe: r, t: i } = sr, o = ku, s = di, a = Ne, c = ze();
  return Wi;
}
const hy = ze(), py = (e, t, n) => {
  try {
    t = new hy(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var mi = py;
const my = ze(), gy = (e, t) => new my(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Ey = gy;
const yy = Ne, wy = ze(), _y = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new wy(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new yy(r, n));
  }), r;
};
var vy = _y;
const Ay = Ne, Ty = ze(), Sy = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new Ty(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new Ay(r, n));
  }), r;
};
var Cy = Sy;
const Yi = Ne, by = ze(), Ua = hi, Oy = (e, t) => {
  e = new by(e, t);
  let n = new Yi("0.0.0");
  if (e.test(n) || (n = new Yi("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new Yi(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || Ua(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || Ua(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var $y = Oy;
const Iy = ze(), Ry = (e, t) => {
  try {
    return new Iy(e, t).range || "*";
  } catch {
    return null;
  }
};
var Py = Ry;
const Ny = Ne, Mu = pi(), { ANY: Dy } = Mu, Fy = ze(), xy = mi, ka = hi, Ma = ts, Ly = rs, Uy = ns, ky = (e, t, n, r) => {
  e = new Ny(e, r), t = new Fy(t, r);
  let i, o, s, a, c;
  switch (n) {
    case ">":
      i = ka, o = Ly, s = Ma, a = ">", c = ">=";
      break;
    case "<":
      i = Ma, o = Uy, s = ka, a = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (xy(e, t, r))
    return !1;
  for (let m = 0; m < t.set.length; ++m) {
    const l = t.set[m];
    let f = null, h = null;
    if (l.forEach((g) => {
      g.semver === Dy && (g = new Mu(">=0.0.0")), f = f || g, h = h || g, i(g.semver, f.semver, r) ? f = g : s(g.semver, h.semver, r) && (h = g);
    }), f.operator === a || f.operator === c || (!h.operator || h.operator === a) && o(e, h.semver))
      return !1;
    if (h.operator === c && s(e, h.semver))
      return !1;
  }
  return !0;
};
var is = ky;
const My = is, By = (e, t, n) => My(e, t, ">", n);
var Hy = By;
const jy = is, qy = (e, t, n) => jy(e, t, "<", n);
var Gy = qy;
const Ba = ze(), Vy = (e, t, n) => (e = new Ba(e, n), t = new Ba(t, n), e.intersects(t, n));
var Wy = Vy;
const Yy = mi, zy = Ye;
var Xy = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((l, f) => zy(l, f, n));
  for (const l of s)
    Yy(l, t, n) ? (o = l, i || (i = l)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [l, f] of r)
    l === f ? a.push(l) : !f && l === s[0] ? a.push("*") : f ? l === s[0] ? a.push(`<=${f}`) : a.push(`${l} - ${f}`) : a.push(`>=${l}`);
  const c = a.join(" || "), m = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < m.length ? c : t;
};
const Ha = ze(), os = pi(), { ANY: zi } = os, $n = mi, ss = Ye, Ky = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Ha(e, n), t = new Ha(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = Qy(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, Jy = [new os(">=0.0.0-0")], ja = [new os(">=0.0.0")], Qy = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === zi) {
    if (t.length === 1 && t[0].semver === zi)
      return !0;
    n.includePrerelease ? e = Jy : e = ja;
  }
  if (t.length === 1 && t[0].semver === zi) {
    if (n.includePrerelease)
      return !0;
    t = ja;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = qa(i, g, n) : g.operator === "<" || g.operator === "<=" ? o = Ga(o, g, n) : r.add(g.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = ss(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of r) {
    if (i && !$n(g, String(i), n) || o && !$n(g, String(o), n))
      return null;
    for (const _ of t)
      if (!$n(g, String(_), n))
        return !1;
    return !0;
  }
  let a, c, m, l, f = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of t) {
    if (l = l || g.operator === ">" || g.operator === ">=", m = m || g.operator === "<" || g.operator === "<=", i) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === ">" || g.operator === ">=") {
        if (a = qa(i, g, n), a === g && a !== i)
          return !1;
      } else if (i.operator === ">=" && !$n(i.semver, String(g), n))
        return !1;
    }
    if (o) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (c = Ga(o, g, n), c === g && c !== o)
          return !1;
      } else if (o.operator === "<=" && !$n(o.semver, String(g), n))
        return !1;
    }
    if (!g.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && m && !o && s !== 0 || o && l && !i && s !== 0 || h || f);
}, qa = (e, t, n) => {
  if (!e)
    return t;
  const r = ss(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ga = (e, t, n) => {
  if (!e)
    return t;
  const r = ss(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Zy = Ky;
const Xi = sr, Va = fi, ew = Ne, Wa = xu, tw = En, nw = lE, rw = fE, iw = hE, ow = mE, sw = yE, aw = vE, lw = SE, cw = OE, uw = Ye, fw = PE, dw = FE, hw = es, pw = kE, mw = HE, gw = hi, Ew = ts, yw = Lu, ww = Uu, _w = ns, vw = rs, Aw = ku, Tw = uy, Sw = pi(), Cw = ze(), bw = mi, Ow = Ey, $w = vy, Iw = Cy, Rw = $y, Pw = Py, Nw = is, Dw = Hy, Fw = Gy, xw = Wy, Lw = Xy, Uw = Zy;
var Bu = {
  parse: tw,
  valid: nw,
  clean: rw,
  inc: iw,
  diff: ow,
  major: sw,
  minor: aw,
  patch: lw,
  prerelease: cw,
  compare: uw,
  rcompare: fw,
  compareLoose: dw,
  compareBuild: hw,
  sort: pw,
  rsort: mw,
  gt: gw,
  lt: Ew,
  eq: yw,
  neq: ww,
  gte: _w,
  lte: vw,
  cmp: Aw,
  coerce: Tw,
  Comparator: Sw,
  Range: Cw,
  satisfies: bw,
  toComparators: Ow,
  maxSatisfying: $w,
  minSatisfying: Iw,
  minVersion: Rw,
  validRange: Pw,
  outside: Nw,
  gtr: Dw,
  ltr: Fw,
  intersects: xw,
  simplifyRange: Lw,
  subset: Uw,
  SemVer: ew,
  re: Xi.re,
  src: Xi.src,
  tokens: Xi.t,
  SEMVER_SPEC_VERSION: Va.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Va.RELEASE_TYPES,
  compareIdentifiers: Wa.compareIdentifiers,
  rcompareIdentifiers: Wa.rcompareIdentifiers
}, ar = {}, Qr = { exports: {} };
Qr.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", c = "[object Array]", m = "[object AsyncFunction]", l = "[object Boolean]", f = "[object Date]", h = "[object Error]", g = "[object Function]", _ = "[object GeneratorFunction]", E = "[object Map]", A = "[object Number]", T = "[object Null]", $ = "[object Object]", D = "[object Promise]", B = "[object Proxy]", q = "[object RegExp]", J = "[object Set]", Q = "[object String]", oe = "[object Symbol]", U = "[object Undefined]", y = "[object WeakMap]", j = "[object ArrayBuffer]", Y = "[object DataView]", ee = "[object Float32Array]", I = "[object Float64Array]", O = "[object Int8Array]", P = "[object Int16Array]", b = "[object Int32Array]", N = "[object Uint8Array]", R = "[object Uint8ClampedArray]", k = "[object Uint16Array]", G = "[object Uint32Array]", F = /[\\^$.*+?()[\]{}|]/g, z = /^\[object .+?Constructor\]$/, ue = /^(?:0|[1-9]\d*)$/, M = {};
  M[ee] = M[I] = M[O] = M[P] = M[b] = M[N] = M[R] = M[k] = M[G] = !0, M[a] = M[c] = M[j] = M[l] = M[Y] = M[f] = M[h] = M[g] = M[E] = M[A] = M[$] = M[q] = M[J] = M[Q] = M[y] = !1;
  var _e = typeof Oe == "object" && Oe && Oe.Object === Object && Oe, _n = typeof self == "object" && self && self.Object === Object && self, Me = _e || _n || Function("return this")(), fr = t && !t.nodeType && t, vn = fr && !0 && e && !e.nodeType && e, Vt = vn && vn.exports === fr, An = Vt && _e.process, d = function() {
    try {
      return An && An.binding && An.binding("util");
    } catch {
    }
  }(), u = d && d.isTypedArray;
  function S(p, v) {
    for (var C = -1, x = p == null ? 0 : p.length, K = 0, H = []; ++C < x; ) {
      var ie = p[C];
      v(ie, C, p) && (H[K++] = ie);
    }
    return H;
  }
  function w(p, v) {
    for (var C = -1, x = v.length, K = p.length; ++C < x; )
      p[K + C] = v[C];
    return p;
  }
  function W(p, v) {
    for (var C = -1, x = p == null ? 0 : p.length; ++C < x; )
      if (v(p[C], C, p))
        return !0;
    return !1;
  }
  function te(p, v) {
    for (var C = -1, x = Array(p); ++C < p; )
      x[C] = v(C);
    return x;
  }
  function se(p) {
    return function(v) {
      return p(v);
    };
  }
  function ve(p, v) {
    return p.has(v);
  }
  function Ae(p, v) {
    return p == null ? void 0 : p[v];
  }
  function Be(p) {
    var v = -1, C = Array(p.size);
    return p.forEach(function(x, K) {
      C[++v] = [K, x];
    }), C;
  }
  function fe(p, v) {
    return function(C) {
      return p(v(C));
    };
  }
  function He(p) {
    var v = -1, C = Array(p.size);
    return p.forEach(function(x) {
      C[++v] = x;
    }), C;
  }
  var Ci = Array.prototype, dr = Function.prototype, st = Object.prototype, Wt = Me["__core-js_shared__"], ps = dr.toString, Ke = st.hasOwnProperty, ms = function() {
    var p = /[^.]+$/.exec(Wt && Wt.keys && Wt.keys.IE_PROTO || "");
    return p ? "Symbol(src)_1." + p : "";
  }(), gs = st.toString, of = RegExp(
    "^" + ps.call(Ke).replace(F, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Es = Vt ? Me.Buffer : void 0, hr = Me.Symbol, ys = Me.Uint8Array, ws = st.propertyIsEnumerable, sf = Ci.splice, bt = hr ? hr.toStringTag : void 0, _s = Object.getOwnPropertySymbols, af = Es ? Es.isBuffer : void 0, lf = fe(Object.keys, Object), bi = Yt(Me, "DataView"), Tn = Yt(Me, "Map"), Oi = Yt(Me, "Promise"), $i = Yt(Me, "Set"), Ii = Yt(Me, "WeakMap"), Sn = Yt(Object, "create"), cf = It(bi), uf = It(Tn), ff = It(Oi), df = It($i), hf = It(Ii), vs = hr ? hr.prototype : void 0, Ri = vs ? vs.valueOf : void 0;
  function Ot(p) {
    var v = -1, C = p == null ? 0 : p.length;
    for (this.clear(); ++v < C; ) {
      var x = p[v];
      this.set(x[0], x[1]);
    }
  }
  function pf() {
    this.__data__ = Sn ? Sn(null) : {}, this.size = 0;
  }
  function mf(p) {
    var v = this.has(p) && delete this.__data__[p];
    return this.size -= v ? 1 : 0, v;
  }
  function gf(p) {
    var v = this.__data__;
    if (Sn) {
      var C = v[p];
      return C === r ? void 0 : C;
    }
    return Ke.call(v, p) ? v[p] : void 0;
  }
  function Ef(p) {
    var v = this.__data__;
    return Sn ? v[p] !== void 0 : Ke.call(v, p);
  }
  function yf(p, v) {
    var C = this.__data__;
    return this.size += this.has(p) ? 0 : 1, C[p] = Sn && v === void 0 ? r : v, this;
  }
  Ot.prototype.clear = pf, Ot.prototype.delete = mf, Ot.prototype.get = gf, Ot.prototype.has = Ef, Ot.prototype.set = yf;
  function tt(p) {
    var v = -1, C = p == null ? 0 : p.length;
    for (this.clear(); ++v < C; ) {
      var x = p[v];
      this.set(x[0], x[1]);
    }
  }
  function wf() {
    this.__data__ = [], this.size = 0;
  }
  function _f(p) {
    var v = this.__data__, C = mr(v, p);
    if (C < 0)
      return !1;
    var x = v.length - 1;
    return C == x ? v.pop() : sf.call(v, C, 1), --this.size, !0;
  }
  function vf(p) {
    var v = this.__data__, C = mr(v, p);
    return C < 0 ? void 0 : v[C][1];
  }
  function Af(p) {
    return mr(this.__data__, p) > -1;
  }
  function Tf(p, v) {
    var C = this.__data__, x = mr(C, p);
    return x < 0 ? (++this.size, C.push([p, v])) : C[x][1] = v, this;
  }
  tt.prototype.clear = wf, tt.prototype.delete = _f, tt.prototype.get = vf, tt.prototype.has = Af, tt.prototype.set = Tf;
  function $t(p) {
    var v = -1, C = p == null ? 0 : p.length;
    for (this.clear(); ++v < C; ) {
      var x = p[v];
      this.set(x[0], x[1]);
    }
  }
  function Sf() {
    this.size = 0, this.__data__ = {
      hash: new Ot(),
      map: new (Tn || tt)(),
      string: new Ot()
    };
  }
  function Cf(p) {
    var v = gr(this, p).delete(p);
    return this.size -= v ? 1 : 0, v;
  }
  function bf(p) {
    return gr(this, p).get(p);
  }
  function Of(p) {
    return gr(this, p).has(p);
  }
  function $f(p, v) {
    var C = gr(this, p), x = C.size;
    return C.set(p, v), this.size += C.size == x ? 0 : 1, this;
  }
  $t.prototype.clear = Sf, $t.prototype.delete = Cf, $t.prototype.get = bf, $t.prototype.has = Of, $t.prototype.set = $f;
  function pr(p) {
    var v = -1, C = p == null ? 0 : p.length;
    for (this.__data__ = new $t(); ++v < C; )
      this.add(p[v]);
  }
  function If(p) {
    return this.__data__.set(p, r), this;
  }
  function Rf(p) {
    return this.__data__.has(p);
  }
  pr.prototype.add = pr.prototype.push = If, pr.prototype.has = Rf;
  function at(p) {
    var v = this.__data__ = new tt(p);
    this.size = v.size;
  }
  function Pf() {
    this.__data__ = new tt(), this.size = 0;
  }
  function Nf(p) {
    var v = this.__data__, C = v.delete(p);
    return this.size = v.size, C;
  }
  function Df(p) {
    return this.__data__.get(p);
  }
  function Ff(p) {
    return this.__data__.has(p);
  }
  function xf(p, v) {
    var C = this.__data__;
    if (C instanceof tt) {
      var x = C.__data__;
      if (!Tn || x.length < n - 1)
        return x.push([p, v]), this.size = ++C.size, this;
      C = this.__data__ = new $t(x);
    }
    return C.set(p, v), this.size = C.size, this;
  }
  at.prototype.clear = Pf, at.prototype.delete = Nf, at.prototype.get = Df, at.prototype.has = Ff, at.prototype.set = xf;
  function Lf(p, v) {
    var C = Er(p), x = !C && Jf(p), K = !C && !x && Pi(p), H = !C && !x && !K && Rs(p), ie = C || x || K || H, pe = ie ? te(p.length, String) : [], ge = pe.length;
    for (var ne in p)
      Ke.call(p, ne) && !(ie && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ne == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      K && (ne == "offset" || ne == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      H && (ne == "buffer" || ne == "byteLength" || ne == "byteOffset") || // Skip index properties.
      Wf(ne, ge))) && pe.push(ne);
    return pe;
  }
  function mr(p, v) {
    for (var C = p.length; C--; )
      if (bs(p[C][0], v))
        return C;
    return -1;
  }
  function Uf(p, v, C) {
    var x = v(p);
    return Er(p) ? x : w(x, C(p));
  }
  function Cn(p) {
    return p == null ? p === void 0 ? U : T : bt && bt in Object(p) ? Gf(p) : Kf(p);
  }
  function As(p) {
    return bn(p) && Cn(p) == a;
  }
  function Ts(p, v, C, x, K) {
    return p === v ? !0 : p == null || v == null || !bn(p) && !bn(v) ? p !== p && v !== v : kf(p, v, C, x, Ts, K);
  }
  function kf(p, v, C, x, K, H) {
    var ie = Er(p), pe = Er(v), ge = ie ? c : lt(p), ne = pe ? c : lt(v);
    ge = ge == a ? $ : ge, ne = ne == a ? $ : ne;
    var xe = ge == $, je = ne == $, Te = ge == ne;
    if (Te && Pi(p)) {
      if (!Pi(v))
        return !1;
      ie = !0, xe = !1;
    }
    if (Te && !xe)
      return H || (H = new at()), ie || Rs(p) ? Ss(p, v, C, x, K, H) : jf(p, v, ge, C, x, K, H);
    if (!(C & i)) {
      var Le = xe && Ke.call(p, "__wrapped__"), Ue = je && Ke.call(v, "__wrapped__");
      if (Le || Ue) {
        var ct = Le ? p.value() : p, nt = Ue ? v.value() : v;
        return H || (H = new at()), K(ct, nt, C, x, H);
      }
    }
    return Te ? (H || (H = new at()), qf(p, v, C, x, K, H)) : !1;
  }
  function Mf(p) {
    if (!Is(p) || zf(p))
      return !1;
    var v = Os(p) ? of : z;
    return v.test(It(p));
  }
  function Bf(p) {
    return bn(p) && $s(p.length) && !!M[Cn(p)];
  }
  function Hf(p) {
    if (!Xf(p))
      return lf(p);
    var v = [];
    for (var C in Object(p))
      Ke.call(p, C) && C != "constructor" && v.push(C);
    return v;
  }
  function Ss(p, v, C, x, K, H) {
    var ie = C & i, pe = p.length, ge = v.length;
    if (pe != ge && !(ie && ge > pe))
      return !1;
    var ne = H.get(p);
    if (ne && H.get(v))
      return ne == v;
    var xe = -1, je = !0, Te = C & o ? new pr() : void 0;
    for (H.set(p, v), H.set(v, p); ++xe < pe; ) {
      var Le = p[xe], Ue = v[xe];
      if (x)
        var ct = ie ? x(Ue, Le, xe, v, p, H) : x(Le, Ue, xe, p, v, H);
      if (ct !== void 0) {
        if (ct)
          continue;
        je = !1;
        break;
      }
      if (Te) {
        if (!W(v, function(nt, Rt) {
          if (!ve(Te, Rt) && (Le === nt || K(Le, nt, C, x, H)))
            return Te.push(Rt);
        })) {
          je = !1;
          break;
        }
      } else if (!(Le === Ue || K(Le, Ue, C, x, H))) {
        je = !1;
        break;
      }
    }
    return H.delete(p), H.delete(v), je;
  }
  function jf(p, v, C, x, K, H, ie) {
    switch (C) {
      case Y:
        if (p.byteLength != v.byteLength || p.byteOffset != v.byteOffset)
          return !1;
        p = p.buffer, v = v.buffer;
      case j:
        return !(p.byteLength != v.byteLength || !H(new ys(p), new ys(v)));
      case l:
      case f:
      case A:
        return bs(+p, +v);
      case h:
        return p.name == v.name && p.message == v.message;
      case q:
      case Q:
        return p == v + "";
      case E:
        var pe = Be;
      case J:
        var ge = x & i;
        if (pe || (pe = He), p.size != v.size && !ge)
          return !1;
        var ne = ie.get(p);
        if (ne)
          return ne == v;
        x |= o, ie.set(p, v);
        var xe = Ss(pe(p), pe(v), x, K, H, ie);
        return ie.delete(p), xe;
      case oe:
        if (Ri)
          return Ri.call(p) == Ri.call(v);
    }
    return !1;
  }
  function qf(p, v, C, x, K, H) {
    var ie = C & i, pe = Cs(p), ge = pe.length, ne = Cs(v), xe = ne.length;
    if (ge != xe && !ie)
      return !1;
    for (var je = ge; je--; ) {
      var Te = pe[je];
      if (!(ie ? Te in v : Ke.call(v, Te)))
        return !1;
    }
    var Le = H.get(p);
    if (Le && H.get(v))
      return Le == v;
    var Ue = !0;
    H.set(p, v), H.set(v, p);
    for (var ct = ie; ++je < ge; ) {
      Te = pe[je];
      var nt = p[Te], Rt = v[Te];
      if (x)
        var Ps = ie ? x(Rt, nt, Te, v, p, H) : x(nt, Rt, Te, p, v, H);
      if (!(Ps === void 0 ? nt === Rt || K(nt, Rt, C, x, H) : Ps)) {
        Ue = !1;
        break;
      }
      ct || (ct = Te == "constructor");
    }
    if (Ue && !ct) {
      var yr = p.constructor, wr = v.constructor;
      yr != wr && "constructor" in p && "constructor" in v && !(typeof yr == "function" && yr instanceof yr && typeof wr == "function" && wr instanceof wr) && (Ue = !1);
    }
    return H.delete(p), H.delete(v), Ue;
  }
  function Cs(p) {
    return Uf(p, ed, Vf);
  }
  function gr(p, v) {
    var C = p.__data__;
    return Yf(v) ? C[typeof v == "string" ? "string" : "hash"] : C.map;
  }
  function Yt(p, v) {
    var C = Ae(p, v);
    return Mf(C) ? C : void 0;
  }
  function Gf(p) {
    var v = Ke.call(p, bt), C = p[bt];
    try {
      p[bt] = void 0;
      var x = !0;
    } catch {
    }
    var K = gs.call(p);
    return x && (v ? p[bt] = C : delete p[bt]), K;
  }
  var Vf = _s ? function(p) {
    return p == null ? [] : (p = Object(p), S(_s(p), function(v) {
      return ws.call(p, v);
    }));
  } : td, lt = Cn;
  (bi && lt(new bi(new ArrayBuffer(1))) != Y || Tn && lt(new Tn()) != E || Oi && lt(Oi.resolve()) != D || $i && lt(new $i()) != J || Ii && lt(new Ii()) != y) && (lt = function(p) {
    var v = Cn(p), C = v == $ ? p.constructor : void 0, x = C ? It(C) : "";
    if (x)
      switch (x) {
        case cf:
          return Y;
        case uf:
          return E;
        case ff:
          return D;
        case df:
          return J;
        case hf:
          return y;
      }
    return v;
  });
  function Wf(p, v) {
    return v = v ?? s, !!v && (typeof p == "number" || ue.test(p)) && p > -1 && p % 1 == 0 && p < v;
  }
  function Yf(p) {
    var v = typeof p;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? p !== "__proto__" : p === null;
  }
  function zf(p) {
    return !!ms && ms in p;
  }
  function Xf(p) {
    var v = p && p.constructor, C = typeof v == "function" && v.prototype || st;
    return p === C;
  }
  function Kf(p) {
    return gs.call(p);
  }
  function It(p) {
    if (p != null) {
      try {
        return ps.call(p);
      } catch {
      }
      try {
        return p + "";
      } catch {
      }
    }
    return "";
  }
  function bs(p, v) {
    return p === v || p !== p && v !== v;
  }
  var Jf = As(/* @__PURE__ */ function() {
    return arguments;
  }()) ? As : function(p) {
    return bn(p) && Ke.call(p, "callee") && !ws.call(p, "callee");
  }, Er = Array.isArray;
  function Qf(p) {
    return p != null && $s(p.length) && !Os(p);
  }
  var Pi = af || nd;
  function Zf(p, v) {
    return Ts(p, v);
  }
  function Os(p) {
    if (!Is(p))
      return !1;
    var v = Cn(p);
    return v == g || v == _ || v == m || v == B;
  }
  function $s(p) {
    return typeof p == "number" && p > -1 && p % 1 == 0 && p <= s;
  }
  function Is(p) {
    var v = typeof p;
    return p != null && (v == "object" || v == "function");
  }
  function bn(p) {
    return p != null && typeof p == "object";
  }
  var Rs = u ? se(u) : Bf;
  function ed(p) {
    return Qf(p) ? Lf(p) : Hf(p);
  }
  function td() {
    return [];
  }
  function nd() {
    return !1;
  }
  e.exports = Zf;
})(Qr, Qr.exports);
var kw = Qr.exports;
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.DownloadedUpdateHelper = void 0;
ar.createTempUpdateFile = qw;
const Mw = Zn, Bw = At, Ya = kw, Pt = St, Ln = Z;
class Hw {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Ln.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Ya(this.versionInfo, n) && Ya(this.fileInfo.info, r.info) && await (0, Pt.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, Pt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Pt.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, n) {
    const r = this.getUpdateInfoFile();
    if (!await (0, Pt.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, Pt.readJson)(r);
    } catch (m) {
      let l = "No cached update info available";
      return m.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${m.message})`), n.info(l), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = Ln.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, Pt.pathExists)(a))
      return n.info("Cached update file doesn't exist"), null;
    const c = await jw(a);
    return t.info.sha512 !== c ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, a);
  }
  getUpdateInfoFile() {
    return Ln.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
ar.DownloadedUpdateHelper = Hw;
function jw(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, Mw.createHash)(t);
    s.on("error", o).setEncoding(n), (0, Bw.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function qw(e, t, n) {
  let r = 0, i = Ln.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, Pt.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = Ln.join(t, `${r++}-${e}`);
    }
  return i;
}
var gi = {}, as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
as.getAppCacheDir = Vw;
const Ki = Z, Gw = ti;
function Vw() {
  const e = (0, Gw.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Ki.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Ki.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Ki.join(e, ".cache"), t;
}
Object.defineProperty(gi, "__esModule", { value: !0 });
gi.ElectronAppAdapter = void 0;
const za = Z, Ww = as;
class Yw {
  constructor(t = Ut.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? za.join(process.resourcesPath, "app-update.yml") : za.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Ww.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (n, r) => t(r));
  }
}
gi.ElectronAppAdapter = Yw;
var Hu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = he;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return Ut.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((c, m, l) => {
        const f = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
          destination: s,
          options: a,
          onCancel: l,
          callback: (h) => {
            h == null ? c(s) : m(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, s) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const a = Ut.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, c, m) {
      o.on("redirect", (l, f, h) => {
        o.abort(), c > this.maxRedirects ? a(this.createMaxRedirectError()) : m(t.HttpExecutor.prepareRedirectUrlOptions(h, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(Hu);
var lr = {}, Xe = {};
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.newBaseUrl = zw;
Xe.newUrlFromBase = Xw;
Xe.getChannelFilename = Kw;
const ju = Tt;
function zw(e) {
  const t = new ju.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Xw(e, t, n = !1) {
  const r = new ju.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function Kw(e) {
  return `${e}.yml`;
}
var ce = {}, Jw = "[object Symbol]", qu = /[\\^$.*+?()[\]{}|]/g, Qw = RegExp(qu.source), Zw = typeof Oe == "object" && Oe && Oe.Object === Object && Oe, e_ = typeof self == "object" && self && self.Object === Object && self, t_ = Zw || e_ || Function("return this")(), n_ = Object.prototype, r_ = n_.toString, Xa = t_.Symbol, Ka = Xa ? Xa.prototype : void 0, Ja = Ka ? Ka.toString : void 0;
function i_(e) {
  if (typeof e == "string")
    return e;
  if (s_(e))
    return Ja ? Ja.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function o_(e) {
  return !!e && typeof e == "object";
}
function s_(e) {
  return typeof e == "symbol" || o_(e) && r_.call(e) == Jw;
}
function a_(e) {
  return e == null ? "" : i_(e);
}
function l_(e) {
  return e = a_(e), e && Qw.test(e) ? e.replace(qu, "\\$&") : e;
}
var Gu = l_;
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.Provider = void 0;
ce.findFile = h_;
ce.parseUpdateInfo = p_;
ce.getFileList = Vu;
ce.resolveFiles = m_;
const _t = he, c_ = we, u_ = Tt, Zr = Xe, f_ = Gu;
class d_ {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const o = (0, Zr.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Zr.newUrlFromBase)(`${t.pathname.replace(new RegExp(f_(r), "g"), n)}.blockmap`, i ? new u_.URL(i) : t), o];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, n, r) {
    return this.executor.request(this.createRequestOptions(t, n), r);
  }
  createRequestOptions(t, n) {
    const r = {};
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, _t.configureRequestUrl)(t, r), r;
  }
}
ce.Provider = d_;
function h_(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, _t.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (r = i.find((s) => [s.url.pathname, s.info.url].some((a) => a.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return o || (n == null ? e[0] : e.find((s) => !n.some((a) => s.url.pathname.toLowerCase().endsWith(`.${a.toLowerCase()}`))));
}
function p_(e, t, n) {
  if (e == null)
    throw (0, _t.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, c_.load)(e);
  } catch (i) {
    throw (0, _t.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function Vu(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, _t.newError)(`No files provided: ${(0, _t.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function m_(e, t, n = (r) => r) {
  const i = Vu(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, _t.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, _t.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Zr.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, Zr.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.GenericProvider = void 0;
const Qa = he, Ji = Xe, Qi = ce;
class g_ extends Qi.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, Ji.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Ji.getChannelFilename)(this.channel), n = (0, Ji.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, Qi.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Qa.HttpError && i.statusCode === 404)
          throw (0, Qa.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && r < 3) {
          await new Promise((o, s) => {
            try {
              setTimeout(o, 1e3 * r);
            } catch (a) {
              s(a);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Qi.resolveFiles)(t, this.baseUrl);
  }
}
lr.GenericProvider = g_;
var Ei = {}, yi = {};
Object.defineProperty(yi, "__esModule", { value: !0 });
yi.BitbucketProvider = void 0;
const Za = he, Zi = Xe, eo = ce;
class E_ extends eo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Zi.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Za.CancellationToken(), n = (0, Zi.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Zi.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, eo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Za.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, eo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
yi.BitbucketProvider = E_;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.GitHubProvider = vt.BaseGitHubProvider = void 0;
vt.computeReleaseNotes = Yu;
const rt = he, Qe = Bu, y_ = Tt, on = Xe, $o = ce, to = /\/tag\/(v?[^/]+)$/;
class Wu extends $o.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, on.newBaseUrl)((0, rt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, on.newBaseUrl)((0, rt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
vt.BaseGitHubProvider = Wu;
class w_ extends Wu {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new rt.CancellationToken(), a = await this.httpRequest((0, on.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), c = (0, rt.parseXml)(a);
    let m = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const A = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = Qe.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (A === null)
          l = to.exec(m.element("link").attribute("href"))[1];
        else
          for (const T of c.getElements("entry")) {
            const $ = to.exec(T.element("link").attribute("href"));
            if ($ === null)
              continue;
            const D = $[1];
            if (!Qe.valid(D))
              continue;
            const B = ((r = Qe.prerelease(D)) === null || r === void 0 ? void 0 : r[0]) || null, q = !A || ["alpha", "beta"].includes(A), J = B !== null && !["alpha", "beta"].includes(String(B));
            if (q && !J && !(A === "beta" && B === "alpha")) {
              l = D, m = T;
              break;
            }
            if (B && B === A) {
              l = D, m = T;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(s);
        for (const A of c.getElements("entry")) {
          const T = to.exec(A.element("link").attribute("href"));
          if (T != null && T[1] === l) {
            m = A;
            break;
          }
        }
      }
    } catch (A) {
      throw (0, rt.newError)(`Cannot parse releases feed: ${A.stack || A.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, rt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, h = "", g = "";
    const _ = async (A) => {
      h = (0, on.getChannelFilename)(A), g = (0, on.newUrlFromBase)(this.getBaseDownloadPath(String(l), h), this.baseUrl);
      const T = this.createRequestOptions(g);
      try {
        return await this.executor.request(T, s);
      } catch ($) {
        throw $ instanceof rt.HttpError && $.statusCode === 404 ? (0, rt.newError)(`Cannot find ${h} in the latest release artifacts (${g}): ${$.stack || $.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : $;
      }
    };
    try {
      let A = this.channel;
      this.updater.allowPrerelease && (!((i = Qe.prerelease(l)) === null || i === void 0) && i[0]) && (A = this.getCustomChannelName(String((o = Qe.prerelease(l)) === null || o === void 0 ? void 0 : o[0]))), f = await _(A);
    } catch (A) {
      if (this.updater.allowPrerelease)
        f = await _(this.getDefaultChannelName());
      else
        throw A;
    }
    const E = (0, $o.parseUpdateInfo)(f, h, g);
    return E.releaseName == null && (E.releaseName = m.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = Yu(this.updater.currentVersion, this.updater.fullChangelog, c, m)), {
      tag: l,
      ...E
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, on.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new y_.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, rt.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, $o.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
vt.GitHubProvider = w_;
function el(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Yu(e, t, n, r) {
  if (!t)
    return el(r);
  const i = /\/tag\/v?([^/]+)$/;
  let o;
  try {
    o = i.exec(r.element("link").attribute("href"))[1], o = Qe.valid(o) ? o : void 0;
  } catch {
  }
  if (o == null)
    return null;
  const s = [];
  for (const a of n.getElements("entry")) {
    let c;
    try {
      const f = i.exec(a.element("link").attribute("href"));
      if (!f)
        continue;
      c = f[1];
    } catch {
      continue;
    }
    if (!Qe.valid(c))
      continue;
    const m = Qe.gt(c, e.raw), l = Qe.lte(c, o);
    m && l && s.push({
      version: c,
      note: el(a)
    });
  }
  return s.sort((a, c) => Qe.rcompare(a.version, c.version));
}
var wi = {};
Object.defineProperty(wi, "__esModule", { value: !0 });
wi.GitLabProvider = void 0;
const Ee = he, no = Tt, __ = Gu, Nr = Xe, ro = ce;
class v_ extends ro.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, n, r) {
    super({
      ...r,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = n, this.cachedLatestVersion = null;
    const o = t.host || "gitlab.com";
    this.baseApiUrl = (0, Nr.newBaseUrl)(`https://${o}/api/v4`);
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new Ee.CancellationToken(), n = (0, Nr.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl), r = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) };
    let i;
    try {
      i = await this.httpRequest(n, r, t);
    } catch (g) {
      throw (0, Ee.newError)(`Unable to find latest release on GitLab (${n}): ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (!i)
      throw (0, Ee.newError)("No published releases on GitLab", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let o;
    try {
      o = JSON.parse(i);
    } catch (g) {
      throw (0, Ee.newError)(`Unable to parse latest release response from GitLab (${n}): response was not valid JSON: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (o.upcoming_release)
      throw (0, Ee.newError)("Latest GitLab release is scheduled but not yet published", "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    const s = o.tag_name;
    let a = null, c = "", m = null;
    const l = async (g) => {
      c = (0, Nr.getChannelFilename)(g);
      const _ = o.assets.links.find((T) => T.name === c);
      if (!_)
        throw (0, Ee.newError)(`Cannot find ${c} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      m = new no.URL(_.direct_asset_url);
      const E = this.setAuthHeaderForToken(this.options.token || null), A = Object.keys(E).length ? E : void 0;
      try {
        const T = await this.httpRequest(m, A, t);
        if (!T)
          throw (0, Ee.newError)(`Empty response from ${m}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return T;
      } catch (T) {
        throw T instanceof Ee.HttpError && T.statusCode === 404 ? (0, Ee.newError)(`Cannot find ${c} in the latest release artifacts (${m}): ${T.stack || T.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : T;
      }
    };
    try {
      a = await l(this.channel);
    } catch (g) {
      if (this.channel !== this.getDefaultChannelName())
        a = await l(this.getDefaultChannelName());
      else
        throw g;
    }
    if (!a)
      throw (0, Ee.newError)(`Unable to parse channel data from ${c}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, ro.parseUpdateInfo)(a, c, m);
    f.releaseName == null && (f.releaseName = o.name), f.releaseNotes == null && (f.releaseNotes = o.description || null);
    const h = {
      tag: s,
      assets: this.convertAssetsToMap(o.assets),
      ...f
    };
    return this.cachedLatestVersion = h, h;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const n = /* @__PURE__ */ new Map();
    for (const r of t.links)
      n.set(this.normalizeFilename(r.name), r.direct_asset_url);
    return n;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, n) {
    const r = [`${n}.blockmap`, `${this.normalizeFilename(n)}.blockmap`];
    for (const i of r) {
      const o = t.get(i);
      if (o)
        return new no.URL(o);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const n = new Ee.CancellationToken(), r = [`v${t}`, t];
    for (const i of r) {
      const o = (0, Nr.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const s = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, a = await this.httpRequest(o, s, n);
        if (a)
          return JSON.parse(a);
      } catch (s) {
        if (s instanceof Ee.HttpError && s.statusCode === 404)
          continue;
        throw (0, Ee.newError)(`Unable to find release ${i} on GitLab (${o}): ${s.stack || s.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Ee.newError)(`Unable to find release with version ${t} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const n = {};
    return t != null && (t.startsWith("Bearer") ? n.authorization = t : n["PRIVATE-TOKEN"] = t), n;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const n = await this.fetchReleaseInfoByVersion(t);
    return n && n.assets ? this.convertAssetsToMap(n.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, n, r) {
    let i = null, o = null;
    const s = await this.getVersionInfoForBlockMap(n);
    s && (i = this.findBlockMapInAssets(s, r));
    const a = await this.getVersionInfoForBlockMap(t);
    if (a) {
      const c = r.replace(new RegExp(__(n), "g"), t);
      o = this.findBlockMapInAssets(a, c);
    }
    return [o, i];
  }
  async getBlockMapFiles(t, n, r, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const o = t.pathname.split("/").pop() || "", [s, a] = await this.findBlockMapUrlsFromAssets(n, r, o);
      if (!a)
        throw (0, Ee.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!s)
        throw (0, Ee.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [s, a];
    } else
      return super.getBlockMapFiles(t, n, r, i);
  }
  resolveFiles(t) {
    return (0, ro.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, Ee.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new no.URL(o),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
wi.GitLabProvider = v_;
var _i = {};
Object.defineProperty(_i, "__esModule", { value: !0 });
_i.KeygenProvider = void 0;
const tl = he, io = Xe, oo = ce;
class A_ extends oo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, io.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new tl.CancellationToken(), n = (0, io.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, io.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, oo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, tl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, oo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
_i.KeygenProvider = A_;
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.PrivateGitHubProvider = void 0;
const Xt = he, T_ = we, S_ = Z, nl = Tt, rl = Xe, C_ = vt, b_ = ce;
class O_ extends C_.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new Xt.CancellationToken(), n = (0, rl.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, Xt.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new nl.URL(i.url);
    let s;
    try {
      s = (0, T_.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof Xt.HttpError && a.statusCode === 404 ? (0, Xt.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
    }
    return s.assets = r.assets, s;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const n = this.updater.allowPrerelease;
    let r = this.basePath;
    n || (r = `${r}/latest`);
    const i = (0, rl.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      if (n) {
        const s = o.filter((a) => !a.draft);
        return s.find((a) => a.prerelease) || s[0];
      } else
        return o;
    } catch (o) {
      throw (0, Xt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, b_.getFileList)(t).map((n) => {
      const r = S_.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, Xt.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new nl.URL(i.url),
        info: n
      };
    });
  }
}
vi.PrivateGitHubProvider = O_;
Object.defineProperty(Ei, "__esModule", { value: !0 });
Ei.isUrlProbablySupportMultiRangeRequests = zu;
Ei.createClient = D_;
const Dr = he, $_ = yi, il = lr, I_ = vt, R_ = wi, P_ = _i, N_ = vi;
function zu(e) {
  return !e.includes("s3.amazonaws.com");
}
function D_(e, t, n) {
  if (typeof e == "string")
    throw (0, Dr.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new I_.GitHubProvider(i, t, n) : new N_.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new $_.BitbucketProvider(e, t, n);
    case "gitlab":
      return new R_.GitLabProvider(e, t, n);
    case "keygen":
      return new P_.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new il.GenericProvider({
        provider: "generic",
        url: (0, Dr.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new il.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && zu(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, Dr.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, Dr.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Ai = {}, cr = {}, yn = {}, Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.OperationKind = void 0;
Gt.computeOperations = F_;
var xt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(xt || (Gt.OperationKind = xt = {}));
function F_(e, t, n) {
  const r = sl(e.files), i = sl(t.files);
  let o = null;
  const s = t.files[0], a = [], c = s.name, m = r.get(c);
  if (m == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let f = 0;
  const { checksumToOffset: h, checksumToOldSize: g } = L_(r.get(c), m.offset, n);
  let _ = s.offset;
  for (let E = 0; E < l.checksums.length; _ += l.sizes[E], E++) {
    const A = l.sizes[E], T = l.checksums[E];
    let $ = h.get(T);
    $ != null && g.get(T) !== A && (n.warn(`Checksum ("${T}") matches, but size differs (old: ${g.get(T)}, new: ${A})`), $ = void 0), $ === void 0 ? (f++, o != null && o.kind === xt.DOWNLOAD && o.end === _ ? o.end += A : (o = {
      kind: xt.DOWNLOAD,
      start: _,
      end: _ + A
      // oldBlocks: null,
    }, ol(o, a, T, E))) : o != null && o.kind === xt.COPY && o.end === $ ? o.end += A : (o = {
      kind: xt.COPY,
      start: $,
      end: $ + A
      // oldBlocks: [checksum]
    }, ol(o, a, T, E));
  }
  return f > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${f} changed blocks`), a;
}
const x_ = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function ol(e, t, n, r) {
  if (x_ && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${xt[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function L_(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], c = e.sizes[s], m = i.get(a);
    if (m === void 0)
      r.set(a, o), i.set(a, c);
    else if (n.debug != null) {
      const l = m === c ? "(same size)" : `(size: ${m}, this size: ${c})`;
      n.debug(`${a} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += c;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function sl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.DataSplitter = void 0;
yn.copyData = Xu;
const Fr = he, U_ = At, k_ = Qn, M_ = Gt, al = Buffer.from(`\r
\r
`);
var dt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(dt || (dt = {}));
function Xu(e, t, n, r, i) {
  const o = (0, U_.createReadStream)("", {
    fd: n,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", r), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class B_ extends k_.Writable {
  constructor(t, n, r, i, o, s, a, c) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.grandTotalBytes = a, this.onProgress = c, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = dt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, n, r) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(() => {
      if (this.onProgress) {
        const i = Date.now();
        (i >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (i - this.start) / 1e3 && (this.nextUpdate = i + 1e3, this.onProgress({
          total: this.grandTotalBytes,
          delta: this.delta,
          transferred: this.transferred,
          percent: this.transferred / this.grandTotalBytes * 100,
          bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
        }), this.delta = 0);
      }
      r();
    }).catch(r);
  }
  async handleData(t) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Fr.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === dt.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = dt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === dt.BODY)
          this.readState = dt.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, Fr.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, Fr.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = dt.HEADER;
            return;
          }
        }
        const r = this.partIndexToLength[this.partIndex], i = n + r, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, n, o), this.remainingPartDataCount = r - (o - n), this.remainingPartDataCount > 0)
          return;
        if (n = i + this.boundaryLength, n >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, n) {
    return new Promise((r, i) => {
      const o = () => {
        if (t === n) {
          r();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== M_.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Xu(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = t.indexOf(al, n);
    if (r !== -1)
      return r + al.length;
    const i = n === 0 ? t : t.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Fr.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, n, r);
  }
  processPartData(t, n, r) {
    this.actualPartLength += r - n, this.transferred += r - n, this.delta += r - n;
    const i = this.out;
    return i.write(n === 0 && t.length === r ? t : t.slice(n, r)) ? Promise.resolve() : new Promise((o, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), o();
      });
    });
  }
}
yn.DataSplitter = B_;
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.executeTasksUsingMultipleRangeRequests = H_;
Ti.checkIsRangesSupported = Ro;
const Io = he, ll = yn, cl = Gt;
function H_(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    j_(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function j_(e, t, n, r, i) {
  let o = "bytes=", s = 0, a = 0;
  const c = /* @__PURE__ */ new Map(), m = [];
  for (let h = t.start; h < t.end; h++) {
    const g = t.tasks[h];
    g.kind === cl.OperationKind.DOWNLOAD && (o += `${g.start}-${g.end - 1}, `, c.set(s, h), s++, m.push(g.end - g.start), a += g.end - g.start);
  }
  if (s <= 1) {
    const h = (g) => {
      if (g >= t.end) {
        r();
        return;
      }
      const _ = t.tasks[g++];
      if (_.kind === cl.OperationKind.COPY)
        (0, ll.copyData)(_, n, t.oldFileFd, i, () => h(g));
      else {
        const E = e.createRequestOptions();
        E.headers.Range = `bytes=${_.start}-${_.end - 1}`;
        const A = e.httpExecutor.createRequest(E, (T) => {
          T.on("error", i), Ro(T, i) && (T.pipe(n, {
            end: !1
          }), T.once("end", () => h(g)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(A, i), A.end();
      }
    };
    h(t.start);
    return;
  }
  const l = e.createRequestOptions();
  l.headers.Range = o.substring(0, o.length - 2);
  const f = e.httpExecutor.createRequest(l, (h) => {
    if (!Ro(h, i))
      return;
    const g = (0, Io.safeGetHeader)(h, "content-type"), _ = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(g);
    if (_ == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${g}"`));
      return;
    }
    const E = new ll.DataSplitter(n, t, c, _[1] || _[2], m, r, a, e.options.onProgress);
    E.on("error", i), h.pipe(E), h.on("end", () => {
      setTimeout(() => {
        f.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(f, i), f.end();
}
function Ro(e, t) {
  if (e.statusCode >= 400)
    return t((0, Io.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, Io.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
Si.ProgressDifferentialDownloadCallbackTransform = void 0;
const q_ = Qn;
var sn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(sn || (sn = {}));
class G_ extends q_.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = sn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == sn.COPY) {
      r(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  beginFileCopy() {
    this.operationType = sn.COPY;
  }
  beginRangeDownload() {
    this.operationType = sn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
Si.ProgressDifferentialDownloadCallbackTransform = G_;
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.DifferentialDownloader = void 0;
const In = he, so = St, V_ = At, W_ = yn, Y_ = Tt, xr = Gt, ul = Ti, z_ = Si;
class X_ {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, n, r) {
    this.blockAwareFileInfo = t, this.httpExecutor = n, this.options = r, this.fileMetadataBuffer = null, this.logger = r.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, In.configureRequestUrl)(this.options.newUrl, t), (0, In.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, xr.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const c of i) {
      const m = c.end - c.start;
      c.kind === xr.OperationKind.DOWNLOAD ? o += m : s += m;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${fl(a)}, To download: ${fl(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, so.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, n).then(r).catch((i) => r().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, n) {
    const r = await (0, so.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, so.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, V_.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const c = [];
      let m;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const T = [];
        let $ = 0;
        for (const B of t)
          B.kind === xr.OperationKind.DOWNLOAD && (T.push(B.end - B.start), $ += B.end - B.start);
        const D = {
          expectedByteCounts: T,
          grandTotal: $
        };
        m = new z_.ProgressDifferentialDownloadCallbackTransform(D, this.options.cancellationToken, this.options.onProgress), c.push(m);
      }
      const l = new In.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            l.validate();
          } catch (T) {
            a(T);
            return;
          }
          s(void 0);
        });
      }), c.push(o);
      let f = null;
      for (const T of c)
        T.on("error", a), f == null ? f = T : f = f.pipe(T);
      const h = c[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, ul.executeTasksUsingMultipleRangeRequests)(this, t, h, r, a), g(0);
        return;
      }
      let _ = 0, E = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const A = this.createRequestOptions();
      A.redirect = "manual", g = (T) => {
        var $, D;
        if (T >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const B = t[T++];
        if (B.kind === xr.OperationKind.COPY) {
          m && m.beginFileCopy(), (0, W_.copyData)(B, h, r, a, () => g(T));
          return;
        }
        const q = `bytes=${B.start}-${B.end - 1}`;
        A.headers.range = q, (D = ($ = this.logger) === null || $ === void 0 ? void 0 : $.debug) === null || D === void 0 || D.call($, `download range: ${q}`), m && m.beginRangeDownload();
        const J = this.httpExecutor.createRequest(A, (Q) => {
          Q.on("error", a), Q.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), Q.statusCode >= 400 && a((0, In.createHttpError)(Q)), Q.pipe(h, {
            end: !1
          }), Q.once("end", () => {
            m && m.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => g(T), 1e3)) : g(T);
          });
        });
        J.on("redirect", (Q, oe, U) => {
          this.logger.info(`Redirect to ${K_(U)}`), E = U, (0, In.configureRequestUrl)(new Y_.URL(E), A), J.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(J, a), J.end();
      }, g(0);
    });
  }
  async readRemoteBytes(t, n) {
    const r = Buffer.allocUnsafe(n + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${n}`;
    let o = 0;
    if (await this.request(i, (s) => {
      s.copy(r, o), o += s.length;
    }), o !== r.length)
      throw new Error(`Received data length ${o} is not equal to expected ${r.length}`);
    return r;
  }
  request(t, n) {
    return new Promise((r, i) => {
      const o = this.httpExecutor.createRequest(t, (s) => {
        (0, ul.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
cr.DifferentialDownloader = X_;
function fl(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function K_(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Ai, "__esModule", { value: !0 });
Ai.GenericDifferentialDownloader = void 0;
const J_ = cr;
class Q_ extends J_.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
Ai.GenericDifferentialDownloader = Q_;
var Ct = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = he;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class n {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      r(this.emitter, "login", o);
    }
    progress(o) {
      r(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      r(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      r(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = n;
  function r(i, o, s) {
    i.on(o, s);
  }
})(Ct);
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.NoOpLogger = yt.AppUpdater = void 0;
const be = he, Z_ = Zn, ev = ti, tv = Nl, qe = St, nv = we, ao = ui, ke = Z, Nt = Bu, dl = ar, rv = gi, hl = Hu, iv = lr, lo = Ei, co = Fl, ov = Ai, Kt = Ct;
class ls extends tv.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, be.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, be.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, hl.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Ku();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new ao.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, n) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Kt.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new ao.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new ao.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new rv.ElectronAppAdapter(), this.httpExecutor = new hl.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, Nt.parse)(r);
    if (i == null)
      throw (0, be.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = sv(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](https://www.electron.build/publish#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const n = this.createProviderRuntimeOptions();
    let r;
    typeof t == "string" ? r = new iv.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, lo.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, lo.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const n = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((r) => (n(), r)).catch((r) => {
      throw n(), this.emit("error", r, `Cannot check for updates: ${(r.stack || r).toString()}`), r;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((n) => n != null && n.downloadPromise ? (n.downloadPromise.then(() => {
      const r = ls.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new Ut.Notification(r).show();
    }), n) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), n));
  }
  static formatDownloadNotification(t, n, r) {
    return r == null && (r = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), r = {
      title: r.title.replace("{appName}", n).replace("{version}", t),
      body: r.body.replace("{appName}", n).replace("{version}", t)
    }, r;
  }
  async isStagingMatch(t) {
    const n = t.stagingPercentage;
    let r = n;
    if (r == null)
      return !0;
    if (r = parseInt(r, 10), isNaN(r))
      return this._logger.warn(`Staging percentage is NaN: ${n}`), !0;
    r = r / 100;
    const i = await this.stagingUserIdPromise.value, s = be.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${s}, user id: ${i}`), s < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, Nt.parse)(t.version);
    if (n == null)
      throw (0, be.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, Nt.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, Nt.gt)(n, r), s = (0, Nt.lt)(n, r);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, ev.release)();
    if (n)
      try {
        if ((0, Nt.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, lo.createClient)(r, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, n = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": n })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), n = t.info;
    if (!await this.isUpdateAvailable(n))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${n.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", n), {
        isUpdateAvailable: !1,
        versionInfo: n,
        updateInfo: n
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(n);
    const r = new be.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, be.asArray)(t.files).map((n) => n.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new be.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, be.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof be.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: n,
      requestHeaders: this.computeRequestHeaders(n.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw r(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Kt.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, nv.load)(await (0, qe.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const n = t.fileExtraDownloadHeaders;
    if (n != null) {
      const r = this.requestHeaders;
      return r == null ? n : {
        ...n,
        ...r
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = ke.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, qe.readFile)(t, "utf-8");
      if (be.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = be.UUID.v5((0, Z_.randomBytes)(4096), be.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, qe.outputFile)(t, n);
    } catch (r) {
      this._logger.warn(`Couldn't write out staging user ID: ${r}`);
    }
    return n;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const n of Object.keys(t)) {
      const r = n.toLowerCase();
      if (r === "authorization" || r === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const n = (await this.configOnDisk.value).updaterCacheDirName, r = this._logger;
      n == null && r.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = ke.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new dl.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const n = t.fileInfo, r = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: n.info.sha2,
      sha512: n.info.sha512
    };
    this.listenerCount(Kt.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = ($) => this.emit(Kt.DOWNLOAD_PROGRESS, $));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = n.packageInfo;
    function a() {
      const $ = decodeURIComponent(t.fileInfo.url.pathname);
      return $.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? ke.basename($) : ke.basename(t.fileInfo.info.url);
    }
    const c = await this.getOrCreateDownloadHelper(), m = c.cacheDirForPendingUpdate;
    await (0, qe.mkdir)(m, { recursive: !0 });
    const l = a();
    let f = ke.join(m, l);
    const h = s == null ? null : ke.join(m, `package-${o}${ke.extname(s.path) || ".7z"}`), g = async ($) => {
      await c.setDownloadedFile(f, h, i, n, l, $), await t.done({
        ...i,
        downloadedFile: f
      });
      const D = ke.join(m, "current.blockmap");
      return await (0, qe.pathExists)(D) && await (0, qe.copyFile)(D, ke.join(c.cacheDir, "current.blockmap")), h == null ? [f] : [f, h];
    }, _ = this._logger, E = await c.validateDownloadedPath(f, i, n, _);
    if (E != null)
      return f = E, await g(!1);
    const A = async () => (await c.clear().catch(() => {
    }), await (0, qe.unlink)(f).catch(() => {
    })), T = await (0, dl.createTempUpdateFile)(`temp-${l}`, m, _);
    try {
      await t.task(T, r, h, A), await (0, be.retry)(() => (0, qe.rename)(T, f), {
        retries: 60,
        interval: 500,
        shouldRetry: ($) => $ instanceof Error && /^EBUSY:/.test($.message) ? !0 : (_.warn(`Cannot rename temp file to final file: ${$.message || $.stack}`), !1)
      });
    } catch ($) {
      throw await A(), $ instanceof be.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)), $;
    }
    return _.info(`New version ${o} has been downloaded to ${f}`), await g(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const s = n.updateInfoAndProvider.provider, a = await s.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${a[0]}", new: ${a[1]})`);
      const c = async (_) => {
        const E = await this.httpExecutor.downloadToBuffer(_, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (E == null || E.length === 0)
          throw new Error(`Blockmap "${_.href}" is empty`);
        try {
          return JSON.parse((0, co.gunzipSync)(E).toString());
        } catch (A) {
          throw new Error(`Cannot parse blockmap "${_.href}", error: ${A}`);
        }
      }, m = {
        newUrl: t.url,
        oldFile: ke.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: s.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(Kt.DOWNLOAD_PROGRESS) > 0 && (m.onProgress = (_) => this.emit(Kt.DOWNLOAD_PROGRESS, _));
      const l = async (_, E) => {
        const A = ke.join(E, "current.blockmap");
        await (0, qe.outputFile)(A, (0, co.gzipSync)(JSON.stringify(_)));
      }, f = async (_) => {
        const E = ke.join(_, "current.blockmap");
        try {
          if (await (0, qe.pathExists)(E))
            return JSON.parse((0, co.gunzipSync)(await (0, qe.readFile)(E)).toString());
        } catch (A) {
          this._logger.warn(`Cannot parse blockmap "${E}", error: ${A}`);
        }
        return null;
      }, h = await c(a[1]);
      await l(h, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let g = await f(this.downloadedUpdateHelper.cacheDir);
      return g == null && (g = await c(a[0])), await new ov.GenericDifferentialDownloader(t.info, this.httpExecutor, m).download(g, h), !1;
    } catch (s) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), this._testOnlyOptions != null)
        throw s;
      return !0;
    }
  }
}
yt.AppUpdater = ls;
function sv(e) {
  const t = (0, Nt.prerelease)(e);
  return t != null && t.length > 0;
}
class Ku {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
yt.NoOpLogger = Ku;
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.BaseUpdater = void 0;
const pl = ei, uo = Z, av = yt;
class lv extends av.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Ut.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, n = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const r = this.downloadedUpdateHelper, i = this.installerPath, o = r == null ? null : r.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${n}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: n,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (s) {
      return this.dispatchError(s), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  /**
   * Strips relative-path entries from a PATH string.
   * Prevents PATH-poisoning where a writable directory earlier in PATH shadows
   * a trusted package manager binary.
   */
  sanitizeEnvPath(t) {
    return t.split(uo.delimiter).filter((n) => uo.isAbsolute(n)).join(uo.delimiter);
  }
  spawnSyncLog(t, n = [], r = {}) {
    var i;
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const o = { ...process.env, ...r }, s = (0, pl.spawnSync)(t, n, {
      env: { ...o, PATH: this.sanitizeEnvPath((i = o.PATH) !== null && i !== void 0 ? i : "") },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: c, stdout: m, stderr: l } = s;
    if (a != null)
      throw this._logger.error(l), a;
    if (c != null && c !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${c}`);
    return m.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, n = [], r = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${n}`), new Promise((o, s) => {
      try {
        const a = { stdio: i, env: r, detached: !0 }, c = (0, pl.spawn)(t, n, a);
        c.on("error", (m) => {
          s(m);
        }), c.unref(), c.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
jt.BaseUpdater = lv;
var Wn = {}, ur = {};
Object.defineProperty(ur, "__esModule", { value: !0 });
ur.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Jt = St, cv = cr, uv = Fl;
class fv extends cv.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = Ju(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await dv(this.options.oldFile), i);
  }
}
ur.FileWithEmbeddedBlockMapDifferentialDownloader = fv;
function Ju(e) {
  return JSON.parse((0, uv.inflateRawSync)(e).toString());
}
async function dv(e) {
  const t = await (0, Jt.open)(e, "r");
  try {
    const n = (await (0, Jt.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, Jt.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Jt.read)(t, i, 0, i.length, n - r.length - i.length), await (0, Jt.close)(t), Ju(i);
  } catch (n) {
    throw await (0, Jt.close)(t), n;
  }
}
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.AppImageUpdater = void 0;
const fo = he, ml = ei, hv = St, pv = At, Qt = Z, mv = jt, gv = ur, Ev = ce, gl = Ct;
class yv extends mv.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Ev.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, fo.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, s, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, hv.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, n, r, i, o) {
    try {
      const s = {
        newUrl: t.url,
        oldFile: n,
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(gl.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(gl.DOWNLOAD_PROGRESS, a)), await new gv.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, fo.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    if (!Qt.isAbsolute(n) || n.includes("\0"))
      throw (0, fo.newError)(`APPIMAGE env is not a valid absolute path: "${n}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, pv.unlinkSync)(n);
    let r;
    const i = Qt.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Qt.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = Qt.join(Qt.dirname(n), Qt.basename(o)), (0, ml.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, ml.execFileSync)(r, [], { env: s })), !0;
  }
}
Wn.AppImageUpdater = yv;
var Yn = {}, wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
wn.LinuxUpdater = void 0;
const wv = jt, _v = /^[a-zA-Z0-9_-]+$/;
class vv extends wv.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizes the installer path for use with shell:true spawn calls.
   * Backslash-escapes metacharacters that have special meaning in POSIX shell.
   * Note: paths containing single-quotes (') are not supported.
   */
  get installerPath() {
    const t = super.installerPath;
    return t == null ? null : t.replace(/\\/g, "\\\\").replace(/([`$!" ;|&()<>])/g, "\\$1").replace(/[\n\r]/g, "");
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: n } = this.app, i = `"${n.replace(/["`$\\!\n\r;|&<>(){}*?[\]#~]/g, "")} would like to update"`, o = this.sudoWithArgs(i);
    this._logger.info(`Running as non-root user, using sudo to install: ${o}`);
    let s = '"';
    return (/pkexec/i.test(o[0]) || o[0] === "sudo") && (s = ""), this.spawnSyncLog(o[0], [...o.length > 1 ? o.slice(1) : [], `${s}/bin/bash`, "-c", `'${t.join(" ")}'${s}`]);
  }
  sudoWithArgs(t) {
    const n = this.determineSudoCommand(), r = [n];
    return /kdesudo/i.test(n) ? (r.push("--comment", t), r.push("-c")) : /gksudo/i.test(n) ? r.push("--message", t) : /pkexec/i.test(n) && r.push("--disable-internal-agent"), r;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const n of t)
      if (this.hasCommand(n))
        return n;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var n;
    let r = t;
    const i = (n = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || n === void 0 ? void 0 : n.trim();
    i && (_v.test(i) ? r = [i] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${i}" contains unsafe characters. Ignoring override.`));
    for (const a of r)
      if (this.hasCommand(a))
        return a;
    const o = i ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${i}", ` : "", s = t[0];
    return this._logger.warn(`No package manager found in the list: ${o}${t.join(", ")}. Utilizing default: ${s}`), s;
  }
}
wn.LinuxUpdater = vv;
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.DebUpdater = void 0;
const Av = ce, El = Ct, Tv = wn;
class cs extends Tv.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Av.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(El.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(El.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const r = ["dpkg", "apt"], i = this.detectPackageManager(r);
    try {
      cs.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (o) {
      return this.dispatchError(o), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r, i) {
    var o;
    if (t === "dpkg")
      try {
        r(["dpkg", "-i", n]);
      } catch (s) {
        i.warn((o = s.message) !== null && o !== void 0 ? o : s), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), r(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), r([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        n
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
Yn.DebUpdater = cs;
var zn = {};
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.PacmanUpdater = void 0;
const yl = Ct, Sv = ce, Cv = wn;
class us extends Cv.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Sv.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(yl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(yl.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      us.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (r) {
      return this.dispatchError(r), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r) {
    var i;
    try {
      n(["pacman", "-U", "--noconfirm", t]);
    } catch (o) {
      r.warn((i = o.message) !== null && i !== void 0 ? i : o), r.warn("pacman installation failed, attempting to update package database and retry");
      try {
        n(["pacman", "-Sy", "--noconfirm"]), n(["pacman", "-U", "--noconfirm", t]);
      } catch (s) {
        throw r.error("Retry after pacman -Sy failed"), s;
      }
    }
  }
}
zn.PacmanUpdater = us;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.RpmUpdater = void 0;
const wl = Ct, bv = ce, Ov = wn;
class fs extends Ov.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, bv.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(wl.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(wl.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      fs.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (o) {
      return this.dispatchError(o), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r, i) {
    if (t === "zypper")
      return r(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", n]);
    if (t === "dnf")
      return r(["dnf", "install", "--nogpgcheck", "-y", n]);
    if (t === "yum")
      return r(["yum", "install", "--nogpgcheck", "-y", n]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), r(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", n]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
Xn.RpmUpdater = fs;
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.MacUpdater = void 0;
const _l = he, ho = St, $v = At, vl = Z, Iv = ld, Rv = yt, Pv = ce, Al = ei, Tl = Zn;
class ds extends Rv.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = Ut.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
      this._logger.warn(r), this.emit("error", r);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  /** Filters update files to the appropriate architecture.
   * On arm64 Macs (including Rosetta), arm64 files are preferred when available.
   * On x64 Macs, arm64 files are excluded. */
  static filterFilesForArch(t, n) {
    const r = (i) => {
      var o;
      return i.url.pathname.includes("arm64") || ((o = i.info.url) === null || o === void 0 ? void 0 : o.includes("arm64"));
    };
    return n && t.some(r) ? t.filter((i) => n === r(i)) : t.filter((i) => !r(i));
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let n = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const r = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, Al.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (l) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${l}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const f = (0, Al.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${f}`), s = s || f;
    } catch (l) {
      r.warn(`uname shell command to check for arm64 failed: ${l}`);
    }
    s = s || process.arch === "arm64" || o, n = ds.filterFilesForArch(n, s);
    const a = (0, Pv.findFile)(n, "zip", ["pkg", "dmg"]);
    if (a == null)
      throw (0, _l.newError)(`ZIP file not provided: ${(0, _l.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const c = t.updateInfoAndProvider.provider, m = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: a,
      downloadUpdateOptions: t,
      task: async (l, f) => {
        const h = vl.join(this.downloadedUpdateHelper.cacheDir, m), g = () => (0, ho.pathExistsSync)(h) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let _ = !0;
        g() && (_ = await this.differentialDownloadInstaller(a, t, l, c, m)), _ && await this.httpExecutor.download(a.url, l, f);
      },
      done: async (l) => {
        if (!t.disableDifferentialDownload)
          try {
            const f = vl.join(this.downloadedUpdateHelper.cacheDir, m);
            await (0, ho.copyFile)(l.downloadedFile, f);
          } catch (f) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${f.message}`);
          }
        return this.updateDownloaded(a, l);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, ho.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, Iv.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const c = (m) => {
      const l = m.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((m, l) => {
      const f = (0, Tl.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${f}`, "ascii"), g = `/${(0, Tl.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (_, E) => {
        const A = _.url;
        if (s.info(`${A} requested`), A === "/") {
          if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
            E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), s.warn("No authenthication info");
            return;
          }
          const D = _.headers.authorization.split(" ")[1], B = Buffer.from(D, "base64").toString("ascii"), [q, J] = B.split(":");
          if (q !== "autoupdater" || J !== f) {
            E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const Q = Buffer.from(`{ "url": "${c(this.server)}${g}" }`);
          E.writeHead(200, { "Content-Type": "application/json", "Content-Length": Q.length }), E.end(Q);
          return;
        }
        if (!A.startsWith(g)) {
          s.warn(`${A} requested, but not supported`), E.writeHead(404), E.end();
          return;
        }
        s.info(`${g} requested by Squirrel.Mac, pipe ${i}`);
        let T = !1;
        E.on("finish", () => {
          T || (this.nativeUpdater.removeListener("error", l), m([]));
        });
        const $ = (0, $v.createReadStream)(i);
        $.on("error", (D) => {
          try {
            E.end();
          } catch (B) {
            s.warn(`cannot end response: ${B}`);
          }
          T = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${D}`));
        }), E.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), $.pipe(E);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : m([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Kn.MacUpdater = ds;
var Jn = {}, hs = {};
Object.defineProperty(hs, "__esModule", { value: !0 });
hs.verifySignature = Dv;
const Sl = he, Qu = ei, Nv = ti, Cl = Z;
function Zu(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function Dv(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, Qu.execFile)(...Zu(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, a, c) => {
      var m;
      try {
        if (s != null || c) {
          po(n, s, c, i), r(null);
          return;
        }
        const l = Fv(a);
        if (l.Status === 0) {
          try {
            const _ = Cl.normalize(l.Path), E = Cl.normalize(t);
            if (n.info(`LiteralPath: ${_}. Update Path: ${E}`), _ !== E) {
              po(n, new Error(`LiteralPath of ${_} is different than ${E}`), c, i), r(null);
              return;
            }
          } catch (_) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(m = _.message) !== null && m !== void 0 ? m : _.stack}`);
          }
          const h = (0, Sl.parseDn)(l.SignerCertificate.Subject);
          let g = !1;
          for (const _ of e) {
            const E = (0, Sl.parseDn)(_);
            if (E.size ? g = Array.from(E.keys()).every((T) => E.get(T) === h.get(T)) : _ === h.get("CN") && (n.warn(`Signature validated using only CN ${_}. Please add your full Distinguished Name (DN) to publisherNames configuration`), g = !0), g) {
              r(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (h, g) => h === "RawData" ? void 0 : g, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), r(f);
      } catch (l) {
        po(n, l, null, i), r(null);
        return;
      }
    });
  });
}
function Fv(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function po(e, t, n, r) {
  if (xv()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Qu.execFileSync)(...Zu("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function xv() {
  const e = Nv.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.NsisUpdater = void 0;
const Lr = he, bl = Z, Lv = jt, Uv = ur, Ol = Ct, kv = ce, Mv = St, Bv = hs, $l = Tt;
class Hv extends Lv.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, Bv.verifySignature)(r, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, kv.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, s, a) => {
        const c = r.packageInfo, m = c != null && s != null;
        if (m && t.disableWebInstaller)
          throw (0, Lr.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !m && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (m || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, Lr.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await a(), (0, Lr.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (m && await this.differentialDownloadWebPackage(t, c, s, n))
          try {
            await this.httpExecutor.download(new $l.URL(c.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (f) {
            try {
              await (0, Mv.unlink)(s);
            } catch {
            }
            throw f;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let n;
    try {
      if (n = (await this.configOnDisk.value).publisherName, n == null)
        return null;
    } catch (r) {
      if (r.code === "ENOENT")
        return null;
      throw r;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(n) ? n : [n], t);
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["--updated"];
    t.isSilent && r.push("/S"), t.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && r.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(bl.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? Ut.shell.openPath(n).catch((c) => this.dispatchError(c)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new $l.URL(n.path),
        oldFile: bl.join(this.downloadedUpdateHelper.cacheDir, Lr.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(Ol.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Ol.DOWNLOAD_PROGRESS, s)), await new Uv.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Jn.NsisUpdater = Hv;
(function(e) {
  var t = Oe && Oe.__createBinding || (Object.create ? function(A, T, $, D) {
    D === void 0 && (D = $);
    var B = Object.getOwnPropertyDescriptor(T, $);
    (!B || ("get" in B ? !T.__esModule : B.writable || B.configurable)) && (B = { enumerable: !0, get: function() {
      return T[$];
    } }), Object.defineProperty(A, D, B);
  } : function(A, T, $, D) {
    D === void 0 && (D = $), A[D] = T[$];
  }), n = Oe && Oe.__exportStar || function(A, T) {
    for (var $ in A) $ !== "default" && !Object.prototype.hasOwnProperty.call(T, $) && t(T, A, $);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = St, i = Z;
  var o = jt;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = yt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = ce;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var c = Wn;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var m = Yn;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return m.DebUpdater;
  } });
  var l = zn;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var f = Xn;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var h = Kn;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var g = Jn;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return g.NsisUpdater;
  } }), n(Ct, e);
  let _;
  function E() {
    if (process.platform === "win32")
      _ = new Jn.NsisUpdater();
    else if (process.platform === "darwin")
      _ = new Kn.MacUpdater();
    else {
      _ = new Wn.AppImageUpdater();
      try {
        const A = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(A))
          return _;
        switch ((0, r.readFileSync)(A).toString().trim()) {
          case "deb":
            _ = new Yn.DebUpdater();
            break;
          case "rpm":
            _ = new Xn.RpmUpdater();
            break;
          case "pacman":
            _ = new zn.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (A) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", A.message);
      }
    }
    return _;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => _ || E()
  });
})(un);
un.autoUpdater.logger = console;
rd(import.meta.url);
const ef = gt.dirname(id(import.meta.url));
process.env.APP_ROOT = gt.join(ef, "..");
const Hr = process.env.VITE_DEV_SERVER_URL, fA = gt.join(process.env.APP_ROOT, "dist-electron"), tf = gt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Hr ? gt.join(process.env.APP_ROOT, "public") : tf;
let ae;
function nf() {
  ae = new Rl({
    frame: !1,
    icon: gt.join(process.env.VITE_PUBLIC, "icon.png"),
    height: 500,
    minHeight: 500,
    width: 700,
    minWidth: 700,
    webPreferences: {
      preload: gt.join(ef, "preload.mjs")
    }
  }), ae.removeMenu(), Hr ? ae.loadURL(Hr) : ae.loadFile(gt.join(tf, "index.html")), ae.once("ready-to-show", () => {
    Hr || un.autoUpdater.checkForUpdatesAndNotify();
  });
}
un.autoUpdater.on("update-available", () => {
  Il.showMessageBox(ae, {
    type: "info",
    title: "Atualização Disponível",
    message: "Uma nova versão do Label Printer está sendo baixada em segundo plano.",
    buttons: ["OK"]
  });
});
un.autoUpdater.on("update-downloaded", () => {
  Il.showMessageBox(ae, {
    type: "info",
    title: "Atualização Pronta",
    message: "O download foi concluído. O aplicativo será reiniciado para instalar a atualização.",
    buttons: ["Reiniciar Agora"]
  }).then(() => {
    un.autoUpdater.quitAndInstall();
  });
});
function cn(e, t, n) {
  return new Promise((r, i) => {
    const o = new od.Socket();
    o.setTimeout(5e3), o.connect(t, e, () => {
      o.write(n, "utf-8", () => {
        setTimeout(() => {
          o.end();
        }, 300);
      });
    }), o.on("error", (s) => {
      o.destroy(), i(s);
    }), o.on("timeout", () => {
      o.destroy(), i(
        new Error(
          "Tempo de conexão esgotado. Verifique a rede ou configurações da impressora."
        )
      );
    }), o.on("close", () => {
      r();
    });
  });
}
function jv() {
  const e = String(Date.now() / 1e3), t = sd.createHash("sha256").update(e).digest("hex");
  return BigInt("0x" + t).toString().slice(-5);
}
function rf(e, t, n) {
  const r = String(t).padStart(3, "0"), i = String(t).padStart(2, "0");
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${e.municipality.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${e.expDate}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${e.order}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD${i}/${n}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FDEXP${e.order}${r}ARQ^FS^FT16,325^A0N,45,46^FDEXP${e.order}${r}ARQ^FS^PQ1,0,1,Y^XZ`;
}
function qv(e, t) {
  const n = e.totalLabels + 1, r = String(n).padStart(2, "0"), i = String(n).padStart(3, "0");
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${e.municipality.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${e.expDate}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${e.order}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD${r}/${t}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FDREPACK${e.order}${i}^FS^FT16,325^A0N,45,46^FDREPACK${e.order}${i}^FS^PQ1,0,1,Y^XZ`;
}
function Gv(e, t) {
  return `^XA^MMT^PW783^LL384^LS0^FT339,73^A0N,62,61^FH\\^CI28^FD${e.municipality.toUpperCase()}^FS^CI27^FT16,71^A0N,62,61^FH\\^CI28^FDEXPEDIÇÃO:^FS^CI27^FT16,134^A0N,45,46^FH\\^CI28^FDDATA:^FS^CI27^FT138,134^A0N,45,46^FH\\^CI28^FD${e.expDate}^FS^CI27^FT16,185^A0N,45,46^FH\\^CI28^FDPEDIDO:^FS^CI27^FT183,185^A0N,45,46^FH\\^CI28^FD${e.order}^FS^CI27^FO2,7^GB771,369,4^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYawfd6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUc+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^FT515,177^A0N,102,101^FD00/${t}^FS^BY2,2,70^FO16,215^BCN,70,N,N,N^FD${e.order}^FS^FT16,325^A0N,45,46^FD${e.order}^FS^PQ1,0,1,Y^XZ`;
}
function Vv(e, t, n, r) {
  const i = r === "sequential" ? `REC${e}${String(t).padStart(3, "0")}ARQ` : `REC${n}ARQ`;
  return `^XA^MMT^PW783^LL384^LS0^FO2,7^GB771,369,4^FS^FT300,145^A0N,102,101^FH\\^CI28^FDLPN^FS^CI27^FO105,170^BY3^BCN,100,N,N,N^FD${i}^FS^FT220,320^A0N,48,46^FD${i}^FS^FO659,333^GFA,373,512,16,:Z64:eJxlkD1qxDAQhZ9xDIYUZgvXOUIOsIVcKL0L6z6CbQx7Cd8g7bJFHMhFVPoIZgWezJMES8jDI0v+9Dw/gAc08gq8WAtYard/6w4mylJHiQ+gPvTcOzc2TgVUE7nI8S6qb3TkRD2XAU3ia9GC7pb9WSOaUx+YryK7n9cd3Y4kMvQjnySJAXjdYUI+9+Rq7lljyxK2lskT149MMWhyR26WVMK9/sLqn9xVDo4/WwNbEPGHF3JX+MAb9Aeco/Yf4uWB4h9PJ/KpcLOhlSA/B7KfeZV/ZL5AW9eX+bxlf5V56kLBdpUwzxLeZEeZ38Ao/CxRvMbSxYAyP15Ck9pL8wfr7yQU//SHc/JmvaNO7f/TLySEld0=:7C7C^PQ1,0,1,Y^XZ`;
}
function Wv(e, t) {
  return t ? `~CT~~CD,~CC^~CT~^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ^XA^MMT^PW799^LL719^LS0^FPH,3^FT637,719^A0B,135,134^FB718,1,35,C^FH\\^CI28^FD${e}^FS^CI27^FO103,120^BQN,2,18,H^FDQA,${e}^FS^FO13,34^GB773,673,8^FS^FO703,50^GFA,789,2544,12,:Z64:eJy1lkGO2zAMRWUEQQrMwpt61YUP4oXcG3hhnaaL5ig9RhYDO0cp0AvM0rAGVUmJEr/jBE2L1gMYwsPnJ2WJzBjz++cjrO1Z100P/AJ8BB40oHEa0IUF+Ah6DWicBth5vgB3oC8BzHOA9cEvwB3owzWtj8yHtD7M9LyKyD0TQAnKHp4K4AwXCBgh4KfRgMwrSrAaCMjrVvUxIK+reZ4MBJR1rXpTAT/4+xz1DXDwr8C/hnrwbKD+CvZVw34b4HAC+N1YHr6XTWX7yqs9ytv78ug+aTHlVEBegfxE9ngoAxR/BZ732urt4U0Nhat88ym397/I6TJQMR8y76mmPvH5bGpJ0Tj14v7KLUC8yi1gPW3Np50JH5LenEi/CC9bszPZyx6Ej6LnL/ouvJxXRzx/IuSkL/d5w2du4XQCwt1d/WfhnlKcv66FG9Abq/r4NcTf2GnHH+ipfk6x9/lH/rF+Y9f/5c8fB+p3qv8RVO+U8/0v/pHLeYVbfeLcXsYumY8y7dsHzdtqe214nS+P2Q63A0xP7K9dP+J0mGUd+7pPawsBOAdeKIF/14KyUdQH8HHgT02W80qCKspTAuFDrp/+3kpa4aekX255nfxfhY+NFFTzfCj95cqPYcu1vwS5PwMHJR7eOLmcV89FSX994x+AqXCT+/FK79JfhXdxZHxBnu8bv4GX+8nvaccf6X18r0/r/9C/i7zb+zz2P8H8OcL8aW/mlfavD+uO7+eb9u8z8014nD/b+flX/i3ojzBvD6v5hP8/5OcXll0rCA==:5FF3^PQ1,0,1,Y^XZ` : `~CT~~CD,~CC^~CT~^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ^XA^MMT^PW799^LL719^LS0^FO13,34^GB773,673,8^FS^FO703,50^GFA,789,2544,12,:Z64:eJy1lkGO2zAMRWUEQQrMwpt61YUP4oXcG3hhnaaL5ig9RhYDO0cp0AvM0rAGVUmJEr/jBE2L1gMYwsPnJ2WJzBjz++cjrO1Z100P/AJ8BB40oHEa0IUF+Ah6DWicBth5vgB3oC8BzHOA9cEvwB3owzWtj8yHtD7M9LyKyD0TQAnKHp4K4AwXCBgh4KfRgMwrSrAaCMjrVvUxIK+reZ4MBJR1rXpTAT/4+xz1DXDwr8C/hnrwbKD+CvZVw34b4HAC+N1YHr6XTWX7yqs9ytv78ug+aTHlVEBegfxE9ngoAxR/BZ732urt4U0Nhat88ym397/I6TJQMR8y76mmPvH5bGpJ0Tj14v7KLUC8yi1gPW3Np50JH5LenEi/CC9bszPZyx6Ej6LnL/ouvJxXRzx/IuSkL/d5w2du4XQCwt1d/WfhnlKcv66FG9Abq/r4NcTf2GnHH+ipfk6x9/lH/rF+Y9f/5c8fB+p3qv8RVO+U8/0v/pHLeYVbfeLcXsYumY8y7dsHzdtqe214nS+P2Q63A0xP7K9dP+J0mGUd+7pPawsBOAdeKIF/14KyUdQH8HHgT02W80qCKspTAuFDrp/+3kpa4aekX255nfxfhY+NFFTzfCj95cqPYcu1vwS5PwMHJR7eOLmcV89FSX994x+AqXCT+/FK79JfhXdxZHxBnu8bv4GX+8nvaccf6X18r0/r/9C/i7zb+zz2P8H8OcL8aW/mlfavD+uO7+eb9u8z8014nD/b+flX/i3ojzBvD6v5hP8/5OcXll0rCA==:5FF3^FPH,3^FT450,718^A0B,135,134^FB718,1,35,C^FH^CI28^FD${e}^FS^CI27^PQ1,0,1,Y^XZ`;
}
Mt.handle("print-exp-full-range", async (e, t) => {
  try {
    const n = t.ip || "10.55.22.240", r = t.port || 9100, i = String(t.totalLabels).padStart(2, "0");
    for (let s = 1; s <= t.totalLabels; s++) {
      const a = rf(t, s, i);
      await cn(n, r, a);
    }
    if (t.repack === "Sim") {
      const s = qv(t, i);
      await cn(n, r, s);
    }
    const o = Gv(t, i);
    return await cn(n, r, o), { success: !0 };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
Mt.handle("print-exp-specific-label", async (e, t) => {
  try {
    const n = t.ip || "10.55.22.240", r = t.port || 9100, i = String(t.totalLabels).padStart(2, "0"), o = rf(
      t,
      t.labelToPrint,
      i
    );
    return await cn(n, r, o), { success: !0 };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
Mt.handle("print-rec-labels", async (e, t) => {
  try {
    const n = t.ip || "10.55.22.240", r = t.port || 9100, i = t.mode, o = t.totalLabels || 1, s = t.manualCode || "";
    let a = "";
    i === "sequential" && (a = jv());
    let c = `~CT~~CD,~CC^~CT~
^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR6,6~SD15^JUS^LRN^CI27^PA0,1,1,0^XZ
`;
    for (let m = 1; m <= o; m++)
      c += Vv(a, m, s, i);
    return await cn(n, r, c), { success: !0, uniqueCode: a };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
Mt.handle("print-position-label", async (e, t) => {
  try {
    const n = t.ip || "10.55.22.240", r = t.port || 9100, i = t.position, o = t.hasQR, s = Wv(i, o);
    return await cn(n, r, s), { success: !0 };
  } catch (n) {
    return { success: !1, error: n.message };
  }
});
Mt.on("window-minimize", () => {
  ae == null || ae.minimize();
});
Mt.on("window-maximize", () => {
  ae != null && ae.isMaximized() ? ae.unmaximize() : ae == null || ae.maximize();
});
Mt.on("window-close", () => {
  ae == null || ae.close();
});
jr.on("window-all-closed", () => {
  process.platform !== "darwin" && (jr.quit(), ae = null);
});
jr.on("activate", () => {
  Rl.getAllWindows().length === 0 && nf();
});
jr.whenReady().then(nf);
export {
  fA as MAIN_DIST,
  tf as RENDERER_DIST,
  Hr as VITE_DEV_SERVER_URL
};
