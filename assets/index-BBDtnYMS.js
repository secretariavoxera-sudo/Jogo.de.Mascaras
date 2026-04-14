function Ev(o, s) {
  for (var c = 0; c < s.length; c++) {
    const r = s[c];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const f in r)
        if (f !== "default" && !(f in o)) {
          const d = Object.getOwnPropertyDescriptor(r, f);
          d &&
            Object.defineProperty(
              o,
              f,
              d.get ? d : { enumerable: !0, get: () => r[f] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(o, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const f of document.querySelectorAll('link[rel="modulepreload"]')) r(f);
  new MutationObserver(f => {
    for (const d of f)
      if (d.type === "childList")
        for (const g of d.addedNodes)
          g.tagName === "LINK" && g.rel === "modulepreload" && r(g);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(f) {
    const d = {};
    return (
      f.integrity && (d.integrity = f.integrity),
      f.referrerPolicy && (d.referrerPolicy = f.referrerPolicy),
      f.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : f.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function r(f) {
    if (f.ep) return;
    f.ep = !0;
    const d = c(f);
    fetch(f.href, d);
  }
})();
function np(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default")
    ? o.default
    : o;
}
var qc = { exports: {} },
  Bo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dh;
function Cv() {
  if (dh) return Bo;
  dh = 1;
  var o = Symbol.for("react.transitional.element"),
    s = Symbol.for("react.fragment");
  function c(r, f, d) {
    var g = null;
    if (
      (d !== void 0 && (g = "" + d),
      f.key !== void 0 && (g = "" + f.key),
      "key" in f)
    ) {
      d = {};
      for (var x in f) x !== "key" && (d[x] = f[x]);
    } else d = f;
    return (
      (f = d.ref),
      { $$typeof: o, type: r, key: g, ref: f !== void 0 ? f : null, props: d }
    );
  }
  return ((Bo.Fragment = s), (Bo.jsx = c), (Bo.jsxs = c), Bo);
}
var mh;
function Tv() {
  return (mh || ((mh = 1), (qc.exports = Cv())), qc.exports);
}
var y = Tv(),
  Lc = { exports: {} },
  qo = {},
  Yc = { exports: {} },
  Vc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hh;
function wv() {
  return (
    hh ||
      ((hh = 1),
      (function (o) {
        function s(T, U) {
          var _ = T.length;
          T.push(U);
          e: for (; 0 < _; ) {
            var oe = (_ - 1) >>> 1,
              se = T[oe];
            if (0 < f(se, U)) ((T[oe] = U), (T[_] = se), (_ = oe));
            else break e;
          }
        }
        function c(T) {
          return T.length === 0 ? null : T[0];
        }
        function r(T) {
          if (T.length === 0) return null;
          var U = T[0],
            _ = T.pop();
          if (_ !== U) {
            T[0] = _;
            e: for (var oe = 0, se = T.length, E = se >>> 1; oe < E; ) {
              var q = 2 * (oe + 1) - 1,
                G = T[q],
                X = q + 1,
                $ = T[X];
              if (0 > f(G, _))
                X < se && 0 > f($, G)
                  ? ((T[oe] = $), (T[X] = _), (oe = X))
                  : ((T[oe] = G), (T[q] = _), (oe = q));
              else if (X < se && 0 > f($, _))
                ((T[oe] = $), (T[X] = _), (oe = X));
              else break e;
            }
          }
          return U;
        }
        function f(T, U) {
          var _ = T.sortIndex - U.sortIndex;
          return _ !== 0 ? _ : T.id - U.id;
        }
        if (
          ((o.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          o.unstable_now = function () {
            return d.now();
          };
        } else {
          var g = Date,
            x = g.now();
          o.unstable_now = function () {
            return g.now() - x;
          };
        }
        var v = [],
          h = [],
          b = 1,
          m = null,
          w = 3,
          N = !1,
          R = !1,
          B = !1,
          k = !1,
          L = typeof setTimeout == "function" ? setTimeout : null,
          P = typeof clearTimeout == "function" ? clearTimeout : null,
          K = typeof setImmediate < "u" ? setImmediate : null;
        function F(T) {
          for (var U = c(h); U !== null; ) {
            if (U.callback === null) r(h);
            else if (U.startTime <= T)
              (r(h), (U.sortIndex = U.expirationTime), s(v, U));
            else break;
            U = c(h);
          }
        }
        function I(T) {
          if (((B = !1), F(T), !R))
            if (c(v) !== null) ((R = !0), ee || ((ee = !0), ge()));
            else {
              var U = c(h);
              U !== null && Se(I, U.startTime - T);
            }
        }
        var ee = !1,
          Q = -1,
          Z = 5,
          pe = -1;
        function Ce() {
          return k ? !0 : !(o.unstable_now() - pe < Z);
        }
        function we() {
          if (((k = !1), ee)) {
            var T = o.unstable_now();
            pe = T;
            var U = !0;
            try {
              e: {
                ((R = !1), B && ((B = !1), P(Q), (Q = -1)), (N = !0));
                var _ = w;
                try {
                  t: {
                    for (
                      F(T), m = c(v);
                      m !== null && !(m.expirationTime > T && Ce());

                    ) {
                      var oe = m.callback;
                      if (typeof oe == "function") {
                        ((m.callback = null), (w = m.priorityLevel));
                        var se = oe(m.expirationTime <= T);
                        if (((T = o.unstable_now()), typeof se == "function")) {
                          ((m.callback = se), F(T), (U = !0));
                          break t;
                        }
                        (m === c(v) && r(v), F(T));
                      } else r(v);
                      m = c(v);
                    }
                    if (m !== null) U = !0;
                    else {
                      var E = c(h);
                      (E !== null && Se(I, E.startTime - T), (U = !1));
                    }
                  }
                  break e;
                } finally {
                  ((m = null), (w = _), (N = !1));
                }
                U = void 0;
              }
            } finally {
              U ? ge() : (ee = !1);
            }
          }
        }
        var ge;
        if (typeof K == "function")
          ge = function () {
            K(we);
          };
        else if (typeof MessageChannel < "u") {
          var be = new MessageChannel(),
            ve = be.port2;
          ((be.port1.onmessage = we),
            (ge = function () {
              ve.postMessage(null);
            }));
        } else
          ge = function () {
            L(we, 0);
          };
        function Se(T, U) {
          Q = L(function () {
            T(o.unstable_now());
          }, U);
        }
        ((o.unstable_IdlePriority = 5),
          (o.unstable_ImmediatePriority = 1),
          (o.unstable_LowPriority = 4),
          (o.unstable_NormalPriority = 3),
          (o.unstable_Profiling = null),
          (o.unstable_UserBlockingPriority = 2),
          (o.unstable_cancelCallback = function (T) {
            T.callback = null;
          }),
          (o.unstable_forceFrameRate = function (T) {
            0 > T || 125 < T
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (Z = 0 < T ? Math.floor(1e3 / T) : 5);
          }),
          (o.unstable_getCurrentPriorityLevel = function () {
            return w;
          }),
          (o.unstable_next = function (T) {
            switch (w) {
              case 1:
              case 2:
              case 3:
                var U = 3;
                break;
              default:
                U = w;
            }
            var _ = w;
            w = U;
            try {
              return T();
            } finally {
              w = _;
            }
          }),
          (o.unstable_requestPaint = function () {
            k = !0;
          }),
          (o.unstable_runWithPriority = function (T, U) {
            switch (T) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                T = 3;
            }
            var _ = w;
            w = T;
            try {
              return U();
            } finally {
              w = _;
            }
          }),
          (o.unstable_scheduleCallback = function (T, U, _) {
            var oe = o.unstable_now();
            switch (
              (typeof _ == "object" && _ !== null
                ? ((_ = _.delay),
                  (_ = typeof _ == "number" && 0 < _ ? oe + _ : oe))
                : (_ = oe),
              T)
            ) {
              case 1:
                var se = -1;
                break;
              case 2:
                se = 250;
                break;
              case 5:
                se = 1073741823;
                break;
              case 4:
                se = 1e4;
                break;
              default:
                se = 5e3;
            }
            return (
              (se = _ + se),
              (T = {
                id: b++,
                callback: U,
                priorityLevel: T,
                startTime: _,
                expirationTime: se,
                sortIndex: -1,
              }),
              _ > oe
                ? ((T.sortIndex = _),
                  s(h, T),
                  c(v) === null &&
                    T === c(h) &&
                    (B ? (P(Q), (Q = -1)) : (B = !0), Se(I, _ - oe)))
                : ((T.sortIndex = se),
                  s(v, T),
                  R || N || ((R = !0), ee || ((ee = !0), ge()))),
              T
            );
          }),
          (o.unstable_shouldYield = Ce),
          (o.unstable_wrapCallback = function (T) {
            var U = w;
            return function () {
              var _ = w;
              w = U;
              try {
                return T.apply(this, arguments);
              } finally {
                w = _;
              }
            };
          }));
      })(Vc)),
    Vc
  );
}
var ph;
function Av() {
  return (ph || ((ph = 1), (Yc.exports = wv())), Yc.exports);
}
var kc = { exports: {} },
  ye = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var gh;
function Nv() {
  if (gh) return ye;
  gh = 1;
  var o = Symbol.for("react.transitional.element"),
    s = Symbol.for("react.portal"),
    c = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    f = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    g = Symbol.for("react.context"),
    x = Symbol.for("react.forward_ref"),
    v = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    b = Symbol.for("react.lazy"),
    m = Symbol.for("react.activity"),
    w = Symbol.iterator;
  function N(E) {
    return E === null || typeof E != "object"
      ? null
      : ((E = (w && E[w]) || E["@@iterator"]),
        typeof E == "function" ? E : null);
  }
  var R = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    B = Object.assign,
    k = {};
  function L(E, q, G) {
    ((this.props = E),
      (this.context = q),
      (this.refs = k),
      (this.updater = G || R));
  }
  ((L.prototype.isReactComponent = {}),
    (L.prototype.setState = function (E, q) {
      if (typeof E != "object" && typeof E != "function" && E != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, E, q, "setState");
    }),
    (L.prototype.forceUpdate = function (E) {
      this.updater.enqueueForceUpdate(this, E, "forceUpdate");
    }));
  function P() {}
  P.prototype = L.prototype;
  function K(E, q, G) {
    ((this.props = E),
      (this.context = q),
      (this.refs = k),
      (this.updater = G || R));
  }
  var F = (K.prototype = new P());
  ((F.constructor = K), B(F, L.prototype), (F.isPureReactComponent = !0));
  var I = Array.isArray;
  function ee() {}
  var Q = { H: null, A: null, T: null, S: null },
    Z = Object.prototype.hasOwnProperty;
  function pe(E, q, G) {
    var X = G.ref;
    return {
      $$typeof: o,
      type: E,
      key: q,
      ref: X !== void 0 ? X : null,
      props: G,
    };
  }
  function Ce(E, q) {
    return pe(E.type, q, E.props);
  }
  function we(E) {
    return typeof E == "object" && E !== null && E.$$typeof === o;
  }
  function ge(E) {
    var q = { "=": "=0", ":": "=2" };
    return (
      "$" +
      E.replace(/[=:]/g, function (G) {
        return q[G];
      })
    );
  }
  var be = /\/+/g;
  function ve(E, q) {
    return typeof E == "object" && E !== null && E.key != null
      ? ge("" + E.key)
      : q.toString(36);
  }
  function Se(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (
          (typeof E.status == "string"
            ? E.then(ee, ee)
            : ((E.status = "pending"),
              E.then(
                function (q) {
                  E.status === "pending" &&
                    ((E.status = "fulfilled"), (E.value = q));
                },
                function (q) {
                  E.status === "pending" &&
                    ((E.status = "rejected"), (E.reason = q));
                }
              )),
          E.status)
        ) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function T(E, q, G, X, $) {
    var re = typeof E;
    (re === "undefined" || re === "boolean") && (E = null);
    var ne = !1;
    if (E === null) ne = !0;
    else
      switch (re) {
        case "bigint":
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case o:
            case s:
              ne = !0;
              break;
            case b:
              return ((ne = E._init), T(ne(E._payload), q, G, X, $));
          }
      }
    if (ne)
      return (
        ($ = $(E)),
        (ne = X === "" ? "." + ve(E, 0) : X),
        I($)
          ? ((G = ""),
            ne != null && (G = ne.replace(be, "$&/") + "/"),
            T($, q, G, "", function (ot) {
              return ot;
            }))
          : $ != null &&
            (we($) &&
              ($ = Ce(
                $,
                G +
                  ($.key == null || (E && E.key === $.key)
                    ? ""
                    : ("" + $.key).replace(be, "$&/") + "/") +
                  ne
              )),
            q.push($)),
        1
      );
    ne = 0;
    var fe = X === "" ? "." : X + ":";
    if (I(E))
      for (var Ne = 0; Ne < E.length; Ne++)
        ((X = E[Ne]), (re = fe + ve(X, Ne)), (ne += T(X, q, G, re, $)));
    else if (((Ne = N(E)), typeof Ne == "function"))
      for (E = Ne.call(E), Ne = 0; !(X = E.next()).done; )
        ((X = X.value), (re = fe + ve(X, Ne++)), (ne += T(X, q, G, re, $)));
    else if (re === "object") {
      if (typeof E.then == "function") return T(Se(E), q, G, X, $);
      throw (
        (q = String(E)),
        Error(
          "Objects are not valid as a React child (found: " +
            (q === "[object Object]"
              ? "object with keys {" + Object.keys(E).join(", ") + "}"
              : q) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    }
    return ne;
  }
  function U(E, q, G) {
    if (E == null) return E;
    var X = [],
      $ = 0;
    return (
      T(E, X, "", "", function (re) {
        return q.call(G, re, $++);
      }),
      X
    );
  }
  function _(E) {
    if (E._status === -1) {
      var q = E._result;
      ((q = q()),
        q.then(
          function (G) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 1), (E._result = G));
          },
          function (G) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 2), (E._result = G));
          }
        ),
        E._status === -1 && ((E._status = 0), (E._result = q)));
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var oe =
      typeof reportError == "function"
        ? reportError
        : function (E) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var q = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof E == "object" &&
                  E !== null &&
                  typeof E.message == "string"
                    ? String(E.message)
                    : String(E),
                error: E,
              });
              if (!window.dispatchEvent(q)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", E);
              return;
            }
            console.error(E);
          },
    se = {
      map: U,
      forEach: function (E, q, G) {
        U(
          E,
          function () {
            q.apply(this, arguments);
          },
          G
        );
      },
      count: function (E) {
        var q = 0;
        return (
          U(E, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (E) {
        return (
          U(E, function (q) {
            return q;
          }) || []
        );
      },
      only: function (E) {
        if (!we(E))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return E;
      },
    };
  return (
    (ye.Activity = m),
    (ye.Children = se),
    (ye.Component = L),
    (ye.Fragment = c),
    (ye.Profiler = f),
    (ye.PureComponent = K),
    (ye.StrictMode = r),
    (ye.Suspense = v),
    (ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q),
    (ye.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (E) {
        return Q.H.useMemoCache(E);
      },
    }),
    (ye.cache = function (E) {
      return function () {
        return E.apply(null, arguments);
      };
    }),
    (ye.cacheSignal = function () {
      return null;
    }),
    (ye.cloneElement = function (E, q, G) {
      if (E == null)
        throw Error(
          "The argument must be a React element, but you passed " + E + "."
        );
      var X = B({}, E.props),
        $ = E.key;
      if (q != null)
        for (re in (q.key !== void 0 && ($ = "" + q.key), q))
          !Z.call(q, re) ||
            re === "key" ||
            re === "__self" ||
            re === "__source" ||
            (re === "ref" && q.ref === void 0) ||
            (X[re] = q[re]);
      var re = arguments.length - 2;
      if (re === 1) X.children = G;
      else if (1 < re) {
        for (var ne = Array(re), fe = 0; fe < re; fe++)
          ne[fe] = arguments[fe + 2];
        X.children = ne;
      }
      return pe(E.type, $, X);
    }),
    (ye.createContext = function (E) {
      return (
        (E = {
          $$typeof: g,
          _currentValue: E,
          _currentValue2: E,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (E.Provider = E),
        (E.Consumer = { $$typeof: d, _context: E }),
        E
      );
    }),
    (ye.createElement = function (E, q, G) {
      var X,
        $ = {},
        re = null;
      if (q != null)
        for (X in (q.key !== void 0 && (re = "" + q.key), q))
          Z.call(q, X) &&
            X !== "key" &&
            X !== "__self" &&
            X !== "__source" &&
            ($[X] = q[X]);
      var ne = arguments.length - 2;
      if (ne === 1) $.children = G;
      else if (1 < ne) {
        for (var fe = Array(ne), Ne = 0; Ne < ne; Ne++)
          fe[Ne] = arguments[Ne + 2];
        $.children = fe;
      }
      if (E && E.defaultProps)
        for (X in ((ne = E.defaultProps), ne))
          $[X] === void 0 && ($[X] = ne[X]);
      return pe(E, re, $);
    }),
    (ye.createRef = function () {
      return { current: null };
    }),
    (ye.forwardRef = function (E) {
      return { $$typeof: x, render: E };
    }),
    (ye.isValidElement = we),
    (ye.lazy = function (E) {
      return { $$typeof: b, _payload: { _status: -1, _result: E }, _init: _ };
    }),
    (ye.memo = function (E, q) {
      return { $$typeof: h, type: E, compare: q === void 0 ? null : q };
    }),
    (ye.startTransition = function (E) {
      var q = Q.T,
        G = {};
      Q.T = G;
      try {
        var X = E(),
          $ = Q.S;
        ($ !== null && $(G, X),
          typeof X == "object" &&
            X !== null &&
            typeof X.then == "function" &&
            X.then(ee, oe));
      } catch (re) {
        oe(re);
      } finally {
        (q !== null && G.types !== null && (q.types = G.types), (Q.T = q));
      }
    }),
    (ye.unstable_useCacheRefresh = function () {
      return Q.H.useCacheRefresh();
    }),
    (ye.use = function (E) {
      return Q.H.use(E);
    }),
    (ye.useActionState = function (E, q, G) {
      return Q.H.useActionState(E, q, G);
    }),
    (ye.useCallback = function (E, q) {
      return Q.H.useCallback(E, q);
    }),
    (ye.useContext = function (E) {
      return Q.H.useContext(E);
    }),
    (ye.useDebugValue = function () {}),
    (ye.useDeferredValue = function (E, q) {
      return Q.H.useDeferredValue(E, q);
    }),
    (ye.useEffect = function (E, q) {
      return Q.H.useEffect(E, q);
    }),
    (ye.useEffectEvent = function (E) {
      return Q.H.useEffectEvent(E);
    }),
    (ye.useId = function () {
      return Q.H.useId();
    }),
    (ye.useImperativeHandle = function (E, q, G) {
      return Q.H.useImperativeHandle(E, q, G);
    }),
    (ye.useInsertionEffect = function (E, q) {
      return Q.H.useInsertionEffect(E, q);
    }),
    (ye.useLayoutEffect = function (E, q) {
      return Q.H.useLayoutEffect(E, q);
    }),
    (ye.useMemo = function (E, q) {
      return Q.H.useMemo(E, q);
    }),
    (ye.useOptimistic = function (E, q) {
      return Q.H.useOptimistic(E, q);
    }),
    (ye.useReducer = function (E, q, G) {
      return Q.H.useReducer(E, q, G);
    }),
    (ye.useRef = function (E) {
      return Q.H.useRef(E);
    }),
    (ye.useState = function (E) {
      return Q.H.useState(E);
    }),
    (ye.useSyncExternalStore = function (E, q, G) {
      return Q.H.useSyncExternalStore(E, q, G);
    }),
    (ye.useTransition = function () {
      return Q.H.useTransition();
    }),
    (ye.version = "19.2.1"),
    ye
  );
}
var vh;
function vs() {
  return (vh || ((vh = 1), (kc.exports = Nv())), kc.exports);
}
var Xc = { exports: {} },
  xt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var yh;
function zv() {
  if (yh) return xt;
  yh = 1;
  var o = vs();
  function s(v) {
    var h = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return (
      "Minified React error #" +
      v +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c() {}
  var r = {
      d: {
        f: c,
        r: function () {
          throw Error(s(522));
        },
        D: c,
        C: c,
        L: c,
        m: c,
        X: c,
        S: c,
        M: c,
      },
      p: 0,
      findDOMNode: null,
    },
    f = Symbol.for("react.portal");
  function d(v, h, b) {
    var m =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: m == null ? null : "" + m,
      children: v,
      containerInfo: h,
      implementation: b,
    };
  }
  var g = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(v, h) {
    if (v === "font") return "";
    if (typeof h == "string") return h === "use-credentials" ? h : "";
  }
  return (
    (xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (xt.createPortal = function (v, h) {
      var b =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(s(299));
      return d(v, h, null, b);
    }),
    (xt.flushSync = function (v) {
      var h = g.T,
        b = r.p;
      try {
        if (((g.T = null), (r.p = 2), v)) return v();
      } finally {
        ((g.T = h), (r.p = b), r.d.f());
      }
    }),
    (xt.preconnect = function (v, h) {
      typeof v == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        r.d.C(v, h));
    }),
    (xt.prefetchDNS = function (v) {
      typeof v == "string" && r.d.D(v);
    }),
    (xt.preinit = function (v, h) {
      if (typeof v == "string" && h && typeof h.as == "string") {
        var b = h.as,
          m = x(b, h.crossOrigin),
          w = typeof h.integrity == "string" ? h.integrity : void 0,
          N = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        b === "style"
          ? r.d.S(v, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: m,
              integrity: w,
              fetchPriority: N,
            })
          : b === "script" &&
            r.d.X(v, {
              crossOrigin: m,
              integrity: w,
              fetchPriority: N,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
      }
    }),
    (xt.preinitModule = function (v, h) {
      if (typeof v == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var b = x(h.as, h.crossOrigin);
            r.d.M(v, {
              crossOrigin: b,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
          }
        } else h == null && r.d.M(v);
    }),
    (xt.preload = function (v, h) {
      if (
        typeof v == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var b = h.as,
          m = x(b, h.crossOrigin);
        r.d.L(v, b, {
          crossOrigin: m,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        });
      }
    }),
    (xt.preloadModule = function (v, h) {
      if (typeof v == "string")
        if (h) {
          var b = x(h.as, h.crossOrigin);
          r.d.m(v, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          });
        } else r.d.m(v);
    }),
    (xt.requestFormReset = function (v) {
      r.d.r(v);
    }),
    (xt.unstable_batchedUpdates = function (v, h) {
      return v(h);
    }),
    (xt.useFormState = function (v, h, b) {
      return g.H.useFormState(v, h, b);
    }),
    (xt.useFormStatus = function () {
      return g.H.useHostTransitionStatus();
    }),
    (xt.version = "19.2.1"),
    xt
  );
}
var bh;
function ap() {
  if (bh) return Xc.exports;
  bh = 1;
  function o() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return (o(), (Xc.exports = zv()), Xc.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xh;
function Ov() {
  if (xh) return qo;
  xh = 1;
  var o = Av(),
    s = vs(),
    c = ap();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function f(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function d(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function g(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function x(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (d(e) !== e) throw Error(r(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = d(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var i = l.alternate;
      if (i === null) {
        if (((a = l.return), a !== null)) {
          n = a;
          continue;
        }
        break;
      }
      if (l.child === i.child) {
        for (i = l.child; i; ) {
          if (i === n) return (v(l), e);
          if (i === a) return (v(l), t);
          i = i.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== a.return) ((n = l), (a = i));
      else {
        for (var u = !1, p = l.child; p; ) {
          if (p === n) {
            ((u = !0), (n = l), (a = i));
            break;
          }
          if (p === a) {
            ((u = !0), (a = l), (n = i));
            break;
          }
          p = p.sibling;
        }
        if (!u) {
          for (p = i.child; p; ) {
            if (p === n) {
              ((u = !0), (n = i), (a = l));
              break;
            }
            if (p === a) {
              ((u = !0), (a = i), (n = l));
              break;
            }
            p = p.sibling;
          }
          if (!u) throw Error(r(189));
        }
      }
      if (n.alternate !== a) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = b(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var m = Object.assign,
    w = Symbol.for("react.element"),
    N = Symbol.for("react.transitional.element"),
    R = Symbol.for("react.portal"),
    B = Symbol.for("react.fragment"),
    k = Symbol.for("react.strict_mode"),
    L = Symbol.for("react.profiler"),
    P = Symbol.for("react.consumer"),
    K = Symbol.for("react.context"),
    F = Symbol.for("react.forward_ref"),
    I = Symbol.for("react.suspense"),
    ee = Symbol.for("react.suspense_list"),
    Q = Symbol.for("react.memo"),
    Z = Symbol.for("react.lazy"),
    pe = Symbol.for("react.activity"),
    Ce = Symbol.for("react.memo_cache_sentinel"),
    we = Symbol.iterator;
  function ge(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (we && e[we]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var be = Symbol.for("react.client.reference");
  function ve(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === be ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case B:
        return "Fragment";
      case L:
        return "Profiler";
      case k:
        return "StrictMode";
      case I:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case pe:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case K:
          return e.displayName || "Context";
        case P:
          return (e._context.displayName || "Context") + ".Consumer";
        case F:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Q:
          return (
            (t = e.displayName || null),
            t !== null ? t : ve(e.type) || "Memo"
          );
        case Z:
          ((t = e._payload), (e = e._init));
          try {
            return ve(e(t));
          } catch {}
      }
    return null;
  }
  var Se = Array.isArray,
    T = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    U = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    _ = { pending: !1, data: null, method: null, action: null },
    oe = [],
    se = -1;
  function E(e) {
    return { current: e };
  }
  function q(e) {
    0 > se || ((e.current = oe[se]), (oe[se] = null), se--);
  }
  function G(e, t) {
    (se++, (oe[se] = e.current), (e.current = t));
  }
  var X = E(null),
    $ = E(null),
    re = E(null),
    ne = E(null);
  function fe(e, t) {
    switch ((G(re, t), G($, e), G(X, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Gm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = Gm(t)), (e = Um(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (q(X), G(X, e));
  }
  function Ne() {
    (q(X), q($), q(re));
  }
  function ot(e) {
    e.memoizedState !== null && G(ne, e);
    var t = X.current,
      n = Um(t, e.type);
    t !== n && (G($, e), G(X, n));
  }
  function dt(e) {
    ($.current === e && (q(X), q($)),
      ne.current === e && (q(ne), (Do._currentValue = _)));
  }
  var it, tn;
  function Gt(e) {
    if (it === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((it = (t && t[1]) || ""),
          (tn =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      it +
      e +
      tn
    );
  }
  var Jn = !1;
  function Cn(e, t) {
    if (!e || Jn) return "";
    Jn = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var V = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(V.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(V, []);
                } catch (D) {
                  var j = D;
                }
                Reflect.construct(e, [], V);
              } else {
                try {
                  V.call();
                } catch (D) {
                  j = D;
                }
                e.call(V.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (D) {
                j = D;
              }
              (V = e()) &&
                typeof V.catch == "function" &&
                V.catch(function () {});
            }
          } catch (D) {
            if (D && j && typeof D.stack == "string") return [D.stack, j.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      l &&
        l.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var i = a.DetermineComponentFrameRoot(),
        u = i[0],
        p = i[1];
      if (u && p) {
        var S = u.split(`
`),
          M = p.split(`
`);
        for (
          l = a = 0;
          a < S.length && !S[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; l < M.length && !M[l].includes("DetermineComponentFrameRoot"); )
          l++;
        if (a === S.length || l === M.length)
          for (
            a = S.length - 1, l = M.length - 1;
            1 <= a && 0 <= l && S[a] !== M[l];

          )
            l--;
        for (; 1 <= a && 0 <= l; a--, l--)
          if (S[a] !== M[l]) {
            if (a !== 1 || l !== 1)
              do
                if ((a--, l--, 0 > l || S[a] !== M[l])) {
                  var H =
                    `
` + S[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      H.includes("<anonymous>") &&
                      (H = H.replace("<anonymous>", e.displayName)),
                    H
                  );
                }
              while (1 <= a && 0 <= l);
            break;
          }
      }
    } finally {
      ((Jn = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : "") ? Gt(n) : "";
  }
  function W(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Gt(e.type);
      case 16:
        return Gt("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Gt("Suspense Fallback")
          : Gt("Suspense");
      case 19:
        return Gt("SuspenseList");
      case 0:
      case 15:
        return Cn(e.type, !1);
      case 11:
        return Cn(e.type.render, !1);
      case 1:
        return Cn(e.type, !0);
      case 31:
        return Gt("Activity");
      default:
        return "";
    }
  }
  function de(e) {
    try {
      var t = "",
        n = null;
      do ((t += W(e, n)), (n = e), (e = e.return));
      while (e);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var xe = Object.prototype.hasOwnProperty,
    St = o.unstable_scheduleCallback,
    ke = o.unstable_cancelCallback,
    me = o.unstable_shouldYield,
    Ze = o.unstable_requestPaint,
    Ve = o.unstable_now,
    fn = o.unstable_getCurrentPriorityLevel,
    Tn = o.unstable_ImmediatePriority,
    $a = o.unstable_UserBlockingPriority,
    Ta = o.unstable_NormalPriority,
    Zl = o.unstable_LowPriority,
    wn = o.unstable_IdlePriority,
    Jo = o.log,
    $n = o.unstable_setDisableYieldValue,
    wa = null,
    Et = null;
  function nn(e) {
    if (
      (typeof Jo == "function" && $n(e),
      Et && typeof Et.setStrictMode == "function")
    )
      try {
        Et.setStrictMode(wa, e);
      } catch {}
  }
  var yt = Math.clz32 ? Math.clz32 : dn,
    zs = Math.log,
    Kl = Math.LN2;
  function dn(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((zs(e) / Kl) | 0)) | 0);
  }
  var Fa = 256,
    Wa = 262144,
    Aa = 4194304;
  function mn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function he(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var l = 0,
      i = e.suspendedLanes,
      u = e.pingedLanes;
    e = e.warmLanes;
    var p = a & 134217727;
    return (
      p !== 0
        ? ((a = p & ~i),
          a !== 0
            ? (l = mn(a))
            : ((u &= p),
              u !== 0
                ? (l = mn(u))
                : n || ((n = p & ~e), n !== 0 && (l = mn(n)))))
        : ((p = a & ~i),
          p !== 0
            ? (l = mn(p))
            : u !== 0
              ? (l = mn(u))
              : n || ((n = a & ~e), n !== 0 && (l = mn(n)))),
      l === 0
        ? 0
        : t !== 0 &&
            t !== l &&
            (t & i) === 0 &&
            ((i = l & -l),
            (n = t & -t),
            i >= n || (i === 32 && (n & 4194048) !== 0))
          ? t
          : l
    );
  }
  function Ke(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function ct(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function bt() {
    var e = Aa;
    return ((Aa <<= 1), (Aa & 62914560) === 0 && (Aa = 4194304), e);
  }
  function Fn(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function $e(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Tt(e, t, n, a, l, i) {
    var u = e.pendingLanes;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0));
    var p = e.entanglements,
      S = e.expirationTimes,
      M = e.hiddenUpdates;
    for (n = u & ~n; 0 < n; ) {
      var H = 31 - yt(n),
        V = 1 << H;
      ((p[H] = 0), (S[H] = -1));
      var j = M[H];
      if (j !== null)
        for (M[H] = null, H = 0; H < j.length; H++) {
          var D = j[H];
          D !== null && (D.lane &= -536870913);
        }
      n &= ~V;
    }
    (a !== 0 && Na(e, a, 0),
      i !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(u & ~t)));
  }
  function Na(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - yt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (n & 261930)));
  }
  function wt(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
      var a = 31 - yt(n),
        l = 1 << a;
      ((l & t) | (e[a] & t) && (e[a] |= t), (n &= ~l));
    }
  }
  function At(e, t) {
    var n = t & -t;
    return (
      (n = (n & 42) !== 0 ? 1 : Pa(n)),
      (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    );
  }
  function Pa(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function an(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Os() {
    var e = U.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : oh(e.type));
  }
  function xu(e, t) {
    var n = U.p;
    try {
      return ((U.p = e), t());
    } finally {
      U.p = n;
    }
  }
  var Wn = Math.random().toString(36).slice(2),
    mt = "__reactFiber$" + Wn,
    Nt = "__reactProps$" + Wn,
    Ia = "__reactContainer$" + Wn,
    Ms = "__reactEvents$" + Wn,
    fg = "__reactListeners$" + Wn,
    dg = "__reactHandles$" + Wn,
    Su = "__reactResources$" + Wn,
    Jl = "__reactMarker$" + Wn;
  function js(e) {
    (delete e[mt], delete e[Nt], delete e[Ms], delete e[fg], delete e[dg]);
  }
  function el(e) {
    var t = e[mt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Ia] || n[mt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = km(e); e !== null; ) {
            if ((n = e[mt])) return n;
            e = km(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function tl(e) {
    if ((e = e[mt] || e[Ia])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function $l(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function nl(e) {
    var t = e[Su];
    return (
      t ||
        (t = e[Su] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function ut(e) {
    e[Jl] = !0;
  }
  var Eu = new Set(),
    Cu = {};
  function za(e, t) {
    (al(e, t), al(e + "Capture", t));
  }
  function al(e, t) {
    for (Cu[e] = t, e = 0; e < t.length; e++) Eu.add(t[e]);
  }
  var mg = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Tu = {},
    wu = {};
  function hg(e) {
    return xe.call(wu, e)
      ? !0
      : xe.call(Tu, e)
        ? !1
        : mg.test(e)
          ? (wu[e] = !0)
          : ((Tu[e] = !0), !1);
  }
  function $o(e, t, n) {
    if (hg(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Fo(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function An(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  function Qt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Au(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function pg(e, t, n) {
    var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var l = a.get,
        i = a.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this);
          },
          set: function (u) {
            ((n = "" + u), i.call(this, u));
          },
        }),
        Object.defineProperty(e, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (u) {
            n = "" + u;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Rs(e) {
    if (!e._valueTracker) {
      var t = Au(e) ? "checked" : "value";
      e._valueTracker = pg(e, t, "" + e[t]);
    }
  }
  function Nu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      a = "";
    return (
      e && (a = Au(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function Wo(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var gg = /[\n"\\]/g;
  function Zt(e) {
    return e.replace(gg, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function _s(e, t, n, a, l, i, u, p) {
    ((e.name = ""),
      u != null &&
      typeof u != "function" &&
      typeof u != "symbol" &&
      typeof u != "boolean"
        ? (e.type = u)
        : e.removeAttribute("type"),
      t != null
        ? u === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Qt(t))
          : e.value !== "" + Qt(t) && (e.value = "" + Qt(t))
        : (u !== "submit" && u !== "reset") || e.removeAttribute("value"),
      t != null
        ? Ds(e, u, Qt(t))
        : n != null
          ? Ds(e, u, Qt(n))
          : a != null && e.removeAttribute("value"),
      l == null && i != null && (e.defaultChecked = !!i),
      l != null &&
        (e.checked = l && typeof l != "function" && typeof l != "symbol"),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (e.name = "" + Qt(p))
        : e.removeAttribute("name"));
  }
  function zu(e, t, n, a, l, i, u, p) {
    if (
      (i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (e.type = i),
      t != null || n != null)
    ) {
      if (!((i !== "submit" && i !== "reset") || t != null)) {
        Rs(e);
        return;
      }
      ((n = n != null ? "" + Qt(n) : ""),
        (t = t != null ? "" + Qt(t) : n),
        p || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? l),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = p ? e.checked : !!a),
      (e.defaultChecked = !!a),
      u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.name = u),
      Rs(e));
  }
  function Ds(e, t, n) {
    (t === "number" && Wo(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function ll(e, t, n, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        ((l = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && a && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + Qt(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          ((e[l].selected = !0), a && (e[l].defaultSelected = !0));
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ou(e, t, n) {
    if (
      t != null &&
      ((t = "" + Qt(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Qt(n) : "";
  }
  function Mu(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(r(92));
        if (Se(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        n = a;
      }
      (n == null && (n = ""), (t = n));
    }
    ((n = Qt(t)),
      (e.defaultValue = n),
      (a = e.textContent),
      a === n && a !== "" && a !== null && (e.value = a),
      Rs(e));
  }
  function ol(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var vg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ju(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : a
        ? e.setProperty(t, n)
        : typeof n != "number" || n === 0 || vg.has(t)
          ? t === "float"
            ? (e.cssFloat = n)
            : (e[t] = ("" + n).trim())
          : (e[t] = n + "px");
  }
  function Ru(e, t, n) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((e = e.style), n != null)) {
      for (var a in n)
        !n.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
              ? (e.cssFloat = "")
              : (e[a] = ""));
      for (var l in t)
        ((a = t[l]), t.hasOwnProperty(l) && n[l] !== a && ju(e, l, a));
    } else for (var i in t) t.hasOwnProperty(i) && ju(e, i, t[i]);
  }
  function Gs(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var yg = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    bg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Po(e) {
    return bg.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Nn() {}
  var Us = null;
  function Hs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var il = null,
    sl = null;
  function _u(e) {
    var t = tl(e);
    if (t && (e = t.stateNode)) {
      var n = e[Nt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (_s(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + Zt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var l = a[Nt] || null;
                if (!l) throw Error(r(90));
                _s(
                  a,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              ((a = n[t]), a.form === e.form && Nu(a));
          }
          break e;
        case "textarea":
          Ou(e, n.value, n.defaultValue);
          break e;
        case "select":
          ((t = n.value), t != null && ll(e, !!n.multiple, t, !1));
      }
    }
  }
  var Bs = !1;
  function Du(e, t, n) {
    if (Bs) return e(t, n);
    Bs = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Bs = !1),
        (il !== null || sl !== null) &&
          (qi(), il && ((t = il), (e = sl), (sl = il = null), _u(t), e)))
      )
        for (t = 0; t < e.length; t++) _u(e[t]);
    }
  }
  function Fl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[Nt] || null;
    if (a === null) return null;
    n = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(r(231, t, typeof n));
    return n;
  }
  var zn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    qs = !1;
  if (zn)
    try {
      var Wl = {};
      (Object.defineProperty(Wl, "passive", {
        get: function () {
          qs = !0;
        },
      }),
        window.addEventListener("test", Wl, Wl),
        window.removeEventListener("test", Wl, Wl));
    } catch {
      qs = !1;
    }
  var Pn = null,
    Ls = null,
    Io = null;
  function Gu() {
    if (Io) return Io;
    var e,
      t = Ls,
      n = t.length,
      a,
      l = "value" in Pn ? Pn.value : Pn.textContent,
      i = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++);
    var u = n - e;
    for (a = 1; a <= u && t[n - a] === l[i - a]; a++);
    return (Io = l.slice(e, 1 < a ? 1 - a : void 0));
  }
  function ei(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function ti() {
    return !0;
  }
  function Uu() {
    return !1;
  }
  function zt(e) {
    function t(n, a, l, i, u) {
      ((this._reactName = n),
        (this._targetInst = l),
        (this.type = a),
        (this.nativeEvent = i),
        (this.target = u),
        (this.currentTarget = null));
      for (var p in e)
        e.hasOwnProperty(p) && ((n = e[p]), (this[p] = n ? n(i) : i[p]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? ti
          : Uu),
        (this.isPropagationStopped = Uu),
        this
      );
    }
    return (
      m(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = ti));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = ti));
        },
        persist: function () {},
        isPersistent: ti,
      }),
      t
    );
  }
  var Oa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ni = zt(Oa),
    Pl = m({}, Oa, { view: 0, detail: 0 }),
    xg = zt(Pl),
    Ys,
    Vs,
    Il,
    ai = m({}, Pl, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Xs,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Il &&
              (Il && e.type === "mousemove"
                ? ((Ys = e.screenX - Il.screenX), (Vs = e.screenY - Il.screenY))
                : (Vs = Ys = 0),
              (Il = e)),
            Ys);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Vs;
      },
    }),
    Hu = zt(ai),
    Sg = m({}, ai, { dataTransfer: 0 }),
    Eg = zt(Sg),
    Cg = m({}, Pl, { relatedTarget: 0 }),
    ks = zt(Cg),
    Tg = m({}, Oa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    wg = zt(Tg),
    Ag = m({}, Oa, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Ng = zt(Ag),
    zg = m({}, Oa, { data: 0 }),
    Bu = zt(zg),
    Og = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Mg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    jg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Rg(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = jg[e])
        ? !!t[e]
        : !1;
  }
  function Xs() {
    return Rg;
  }
  var _g = m({}, Pl, {
      key: function (e) {
        if (e.key) {
          var t = Og[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = ei(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Mg[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Xs,
      charCode: function (e) {
        return e.type === "keypress" ? ei(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? ei(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Dg = zt(_g),
    Gg = m({}, ai, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    qu = zt(Gg),
    Ug = m({}, Pl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Xs,
    }),
    Hg = zt(Ug),
    Bg = m({}, Oa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qg = zt(Bg),
    Lg = m({}, ai, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Yg = zt(Lg),
    Vg = m({}, Oa, { newState: 0, oldState: 0 }),
    kg = zt(Vg),
    Xg = [9, 13, 27, 32],
    Qs = zn && "CompositionEvent" in window,
    eo = null;
  zn && "documentMode" in document && (eo = document.documentMode);
  var Qg = zn && "TextEvent" in window && !eo,
    Lu = zn && (!Qs || (eo && 8 < eo && 11 >= eo)),
    Yu = " ",
    Vu = !1;
  function ku(e, t) {
    switch (e) {
      case "keyup":
        return Xg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xu(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var rl = !1;
  function Zg(e, t) {
    switch (e) {
      case "compositionend":
        return Xu(t);
      case "keypress":
        return t.which !== 32 ? null : ((Vu = !0), Yu);
      case "textInput":
        return ((e = t.data), e === Yu && Vu ? null : e);
      default:
        return null;
    }
  }
  function Kg(e, t) {
    if (rl)
      return e === "compositionend" || (!Qs && ku(e, t))
        ? ((e = Gu()), (Io = Ls = Pn = null), (rl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Lu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Jg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Qu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Jg[e.type] : t === "textarea";
  }
  function Zu(e, t, n, a) {
    (il ? (sl ? sl.push(a) : (sl = [a])) : (il = a),
      (t = Zi(t, "onChange")),
      0 < t.length &&
        ((n = new ni("onChange", "change", null, n, a)),
        e.push({ event: n, listeners: t })));
  }
  var to = null,
    no = null;
  function $g(e) {
    Om(e, 0);
  }
  function li(e) {
    var t = $l(e);
    if (Nu(t)) return e;
  }
  function Ku(e, t) {
    if (e === "change") return t;
  }
  var Ju = !1;
  if (zn) {
    var Zs;
    if (zn) {
      var Ks = "oninput" in document;
      if (!Ks) {
        var $u = document.createElement("div");
        ($u.setAttribute("oninput", "return;"),
          (Ks = typeof $u.oninput == "function"));
      }
      Zs = Ks;
    } else Zs = !1;
    Ju = Zs && (!document.documentMode || 9 < document.documentMode);
  }
  function Fu() {
    to && (to.detachEvent("onpropertychange", Wu), (no = to = null));
  }
  function Wu(e) {
    if (e.propertyName === "value" && li(no)) {
      var t = [];
      (Zu(t, no, e, Hs(e)), Du($g, t));
    }
  }
  function Fg(e, t, n) {
    e === "focusin"
      ? (Fu(), (to = t), (no = n), to.attachEvent("onpropertychange", Wu))
      : e === "focusout" && Fu();
  }
  function Wg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return li(no);
  }
  function Pg(e, t) {
    if (e === "click") return li(t);
  }
  function Ig(e, t) {
    if (e === "input" || e === "change") return li(t);
  }
  function e0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Ut = typeof Object.is == "function" ? Object.is : e0;
  function ao(e, t) {
    if (Ut(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var l = n[a];
      if (!xe.call(t, l) || !Ut(e[l], t[l])) return !1;
    }
    return !0;
  }
  function Pu(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Iu(e, t) {
    var n = Pu(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (((a = e + n.textContent.length), e <= t && a >= t))
          return { node: n, offset: t - e };
        e = a;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Pu(n);
    }
  }
  function ef(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? ef(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function tf(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Wo(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Wo(e.document);
    }
    return t;
  }
  function Js(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var t0 = zn && "documentMode" in document && 11 >= document.documentMode,
    cl = null,
    $s = null,
    lo = null,
    Fs = !1;
  function nf(e, t, n) {
    var a =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Fs ||
      cl == null ||
      cl !== Wo(a) ||
      ((a = cl),
      "selectionStart" in a && Js(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (lo && ao(lo, a)) ||
        ((lo = a),
        (a = Zi($s, "onSelect")),
        0 < a.length &&
          ((t = new ni("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: a }),
          (t.target = cl))));
  }
  function Ma(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var ul = {
      animationend: Ma("Animation", "AnimationEnd"),
      animationiteration: Ma("Animation", "AnimationIteration"),
      animationstart: Ma("Animation", "AnimationStart"),
      transitionrun: Ma("Transition", "TransitionRun"),
      transitionstart: Ma("Transition", "TransitionStart"),
      transitioncancel: Ma("Transition", "TransitionCancel"),
      transitionend: Ma("Transition", "TransitionEnd"),
    },
    Ws = {},
    af = {};
  zn &&
    ((af = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ul.animationend.animation,
      delete ul.animationiteration.animation,
      delete ul.animationstart.animation),
    "TransitionEvent" in window || delete ul.transitionend.transition);
  function ja(e) {
    if (Ws[e]) return Ws[e];
    if (!ul[e]) return e;
    var t = ul[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in af) return (Ws[e] = t[n]);
    return e;
  }
  var lf = ja("animationend"),
    of = ja("animationiteration"),
    sf = ja("animationstart"),
    n0 = ja("transitionrun"),
    a0 = ja("transitionstart"),
    l0 = ja("transitioncancel"),
    rf = ja("transitionend"),
    cf = new Map(),
    Ps =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Ps.push("scrollEnd");
  function ln(e, t) {
    (cf.set(e, t), za(t, [e]));
  }
  var oi =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    Kt = [],
    fl = 0,
    Is = 0;
  function ii() {
    for (var e = fl, t = (Is = fl = 0); t < e; ) {
      var n = Kt[t];
      Kt[t++] = null;
      var a = Kt[t];
      Kt[t++] = null;
      var l = Kt[t];
      Kt[t++] = null;
      var i = Kt[t];
      if (((Kt[t++] = null), a !== null && l !== null)) {
        var u = a.pending;
        (u === null ? (l.next = l) : ((l.next = u.next), (u.next = l)),
          (a.pending = l));
      }
      i !== 0 && uf(n, l, i);
    }
  }
  function si(e, t, n, a) {
    ((Kt[fl++] = e),
      (Kt[fl++] = t),
      (Kt[fl++] = n),
      (Kt[fl++] = a),
      (Is |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function er(e, t, n, a) {
    return (si(e, t, n, a), ri(e));
  }
  function Ra(e, t) {
    return (si(e, null, null, t), ri(e));
  }
  function uf(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var l = !1, i = e.return; i !== null; )
      ((i.childLanes |= n),
        (a = i.alternate),
        a !== null && (a.childLanes |= n),
        i.tag === 22 &&
          ((e = i.stateNode), e === null || e._visibility & 1 || (l = !0)),
        (e = i),
        (i = i.return));
    return e.tag === 3
      ? ((i = e.stateNode),
        l &&
          t !== null &&
          ((l = 31 - yt(n)),
          (e = i.hiddenUpdates),
          (a = e[l]),
          a === null ? (e[l] = [t]) : a.push(t),
          (t.lane = n | 536870912)),
        i)
      : null;
  }
  function ri(e) {
    if (50 < No) throw ((No = 0), (cc = null), Error(r(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var dl = {};
  function o0(e, t, n, a) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Ht(e, t, n, a) {
    return new o0(e, t, n, a);
  }
  function tr(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function On(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Ht(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function ff(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function ci(e, t, n, a, l, i) {
    var u = 0;
    if (((a = e), typeof e == "function")) tr(e) && (u = 1);
    else if (typeof e == "string")
      u = uv(e, n, X.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case pe:
          return (
            (e = Ht(31, n, t, l)),
            (e.elementType = pe),
            (e.lanes = i),
            e
          );
        case B:
          return _a(n.children, l, i, t);
        case k:
          ((u = 8), (l |= 24));
          break;
        case L:
          return (
            (e = Ht(12, n, t, l | 2)),
            (e.elementType = L),
            (e.lanes = i),
            e
          );
        case I:
          return ((e = Ht(13, n, t, l)), (e.elementType = I), (e.lanes = i), e);
        case ee:
          return (
            (e = Ht(19, n, t, l)),
            (e.elementType = ee),
            (e.lanes = i),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case K:
                u = 10;
                break e;
              case P:
                u = 9;
                break e;
              case F:
                u = 11;
                break e;
              case Q:
                u = 14;
                break e;
              case Z:
                ((u = 16), (a = null));
                break e;
            }
          ((u = 29),
            (n = Error(r(130, e === null ? "null" : typeof e, ""))),
            (a = null));
      }
    return (
      (t = Ht(u, n, t, l)),
      (t.elementType = e),
      (t.type = a),
      (t.lanes = i),
      t
    );
  }
  function _a(e, t, n, a) {
    return ((e = Ht(7, e, a, t)), (e.lanes = n), e);
  }
  function nr(e, t, n) {
    return ((e = Ht(6, e, null, t)), (e.lanes = n), e);
  }
  function df(e) {
    var t = Ht(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function ar(e, t, n) {
    return (
      (t = Ht(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var mf = new WeakMap();
  function Jt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = mf.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: de(t) }), mf.set(e, t), t);
    }
    return { value: e, source: t, stack: de(t) };
  }
  var ml = [],
    hl = 0,
    ui = null,
    oo = 0,
    $t = [],
    Ft = 0,
    In = null,
    hn = 1,
    pn = "";
  function Mn(e, t) {
    ((ml[hl++] = oo), (ml[hl++] = ui), (ui = e), (oo = t));
  }
  function hf(e, t, n) {
    (($t[Ft++] = hn), ($t[Ft++] = pn), ($t[Ft++] = In), (In = e));
    var a = hn;
    e = pn;
    var l = 32 - yt(a) - 1;
    ((a &= ~(1 << l)), (n += 1));
    var i = 32 - yt(t) + l;
    if (30 < i) {
      var u = l - (l % 5);
      ((i = (a & ((1 << u) - 1)).toString(32)),
        (a >>= u),
        (l -= u),
        (hn = (1 << (32 - yt(t) + l)) | (n << l) | a),
        (pn = i + e));
    } else ((hn = (1 << i) | (n << l) | a), (pn = e));
  }
  function lr(e) {
    e.return !== null && (Mn(e, 1), hf(e, 1, 0));
  }
  function or(e) {
    for (; e === ui; )
      ((ui = ml[--hl]), (ml[hl] = null), (oo = ml[--hl]), (ml[hl] = null));
    for (; e === In; )
      ((In = $t[--Ft]),
        ($t[Ft] = null),
        (pn = $t[--Ft]),
        ($t[Ft] = null),
        (hn = $t[--Ft]),
        ($t[Ft] = null));
  }
  function pf(e, t) {
    (($t[Ft++] = hn),
      ($t[Ft++] = pn),
      ($t[Ft++] = In),
      (hn = t.id),
      (pn = t.overflow),
      (In = e));
  }
  var ht = null,
    Xe = null,
    Re = !1,
    ea = null,
    Wt = !1,
    ir = Error(r(519));
  function ta(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (io(Jt(t, e)), ir);
  }
  function gf(e) {
    var t = e.stateNode,
      n = e.type,
      a = e.memoizedProps;
    switch (((t[mt] = e), (t[Nt] = a), n)) {
      case "dialog":
        (Oe("cancel", t), Oe("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Oe("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Oo.length; n++) Oe(Oo[n], t);
        break;
      case "source":
        Oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Oe("error", t), Oe("load", t));
        break;
      case "details":
        Oe("toggle", t);
        break;
      case "input":
        (Oe("invalid", t),
          zu(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ));
        break;
      case "select":
        Oe("invalid", t);
        break;
      case "textarea":
        (Oe("invalid", t), Mu(t, a.value, a.defaultValue, a.children));
    }
    ((n = a.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      a.suppressHydrationWarning === !0 ||
      _m(t.textContent, n)
        ? (a.popover != null && (Oe("beforetoggle", t), Oe("toggle", t)),
          a.onScroll != null && Oe("scroll", t),
          a.onScrollEnd != null && Oe("scrollend", t),
          a.onClick != null && (t.onclick = Nn),
          (t = !0))
        : (t = !1),
      t || ta(e, !0));
  }
  function vf(e) {
    for (ht = e.return; ht; )
      switch (ht.tag) {
        case 5:
        case 31:
        case 13:
          Wt = !1;
          return;
        case 27:
        case 3:
          Wt = !0;
          return;
        default:
          ht = ht.return;
      }
  }
  function pl(e) {
    if (e !== ht) return !1;
    if (!Re) return (vf(e), (Re = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || Tc(e.type, e.memoizedProps))),
        (n = !n)),
      n && Xe && ta(e),
      vf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      Xe = Vm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      Xe = Vm(e);
    } else
      t === 27
        ? ((t = Xe), pa(e.type) ? ((e = Oc), (Oc = null), (Xe = e)) : (Xe = t))
        : (Xe = ht ? It(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Da() {
    ((Xe = ht = null), (Re = !1));
  }
  function sr() {
    var e = ea;
    return (
      e !== null &&
        (Rt === null ? (Rt = e) : Rt.push.apply(Rt, e), (ea = null)),
      e
    );
  }
  function io(e) {
    ea === null ? (ea = [e]) : ea.push(e);
  }
  var rr = E(null),
    Ga = null,
    jn = null;
  function na(e, t, n) {
    (G(rr, t._currentValue), (t._currentValue = n));
  }
  function Rn(e) {
    ((e._currentValue = rr.current), q(rr));
  }
  function cr(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function ur(e, t, n, a) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var i = l.dependencies;
      if (i !== null) {
        var u = l.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var p = i;
          i = l;
          for (var S = 0; S < t.length; S++)
            if (p.context === t[S]) {
              ((i.lanes |= n),
                (p = i.alternate),
                p !== null && (p.lanes |= n),
                cr(i.return, n, e),
                a || (u = null));
              break e;
            }
          i = p.next;
        }
      } else if (l.tag === 18) {
        if (((u = l.return), u === null)) throw Error(r(341));
        ((u.lanes |= n),
          (i = u.alternate),
          i !== null && (i.lanes |= n),
          cr(u, n, e),
          (u = null));
      } else u = l.child;
      if (u !== null) u.return = l;
      else
        for (u = l; u !== null; ) {
          if (u === e) {
            u = null;
            break;
          }
          if (((l = u.sibling), l !== null)) {
            ((l.return = u.return), (u = l));
            break;
          }
          u = u.return;
        }
      l = u;
    }
  }
  function gl(e, t, n, a) {
    e = null;
    for (var l = t, i = !1; l !== null; ) {
      if (!i) {
        if ((l.flags & 524288) !== 0) i = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var u = l.alternate;
        if (u === null) throw Error(r(387));
        if (((u = u.memoizedProps), u !== null)) {
          var p = l.type;
          Ut(l.pendingProps.value, u.value) ||
            (e !== null ? e.push(p) : (e = [p]));
        }
      } else if (l === ne.current) {
        if (((u = l.alternate), u === null)) throw Error(r(387));
        u.memoizedState.memoizedState !== l.memoizedState.memoizedState &&
          (e !== null ? e.push(Do) : (e = [Do]));
      }
      l = l.return;
    }
    (e !== null && ur(t, e, n, a), (t.flags |= 262144));
  }
  function fi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ut(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ua(e) {
    ((Ga = e),
      (jn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function pt(e) {
    return yf(Ga, e);
  }
  function di(e, t) {
    return (Ga === null && Ua(e), yf(e, t));
  }
  function yf(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), jn === null)) {
      if (e === null) throw Error(r(308));
      ((jn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else jn = jn.next = t;
    return n;
  }
  var i0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                }));
            };
          },
    s0 = o.unstable_scheduleCallback,
    r0 = o.unstable_NormalPriority,
    tt = {
      $$typeof: K,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function fr() {
    return { controller: new i0(), data: new Map(), refCount: 0 };
  }
  function so(e) {
    (e.refCount--,
      e.refCount === 0 &&
        s0(r0, function () {
          e.controller.abort();
        }));
  }
  var ro = null,
    dr = 0,
    vl = 0,
    yl = null;
  function c0(e, t) {
    if (ro === null) {
      var n = (ro = []);
      ((dr = 0),
        (vl = pc()),
        (yl = {
          status: "pending",
          value: void 0,
          then: function (a) {
            n.push(a);
          },
        }));
    }
    return (dr++, t.then(bf, bf), t);
  }
  function bf() {
    if (--dr === 0 && ro !== null) {
      yl !== null && (yl.status = "fulfilled");
      var e = ro;
      ((ro = null), (vl = 0), (yl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function u0(e, t) {
    var n = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (l) {
          n.push(l);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var l = 0; l < n.length; l++) (0, n[l])(t);
        },
        function (l) {
          for (a.status = "rejected", a.reason = l, l = 0; l < n.length; l++)
            (0, n[l])(void 0);
        }
      ),
      a
    );
  }
  var xf = T.S;
  T.S = function (e, t) {
    ((am = Ve()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        c0(e, t),
      xf !== null && xf(e, t));
  };
  var Ha = E(null);
  function mr() {
    var e = Ha.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function mi(e, t) {
    t === null ? G(Ha, Ha.current) : G(Ha, t.pool);
  }
  function Sf() {
    var e = mr();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var bl = Error(r(460)),
    hr = Error(r(474)),
    hi = Error(r(542)),
    pi = { then: function () {} };
  function Ef(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Cf(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Nn, Nn), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), wf(e), e);
      default:
        if (typeof t.status == "string") t.then(Nn, Nn);
        else {
          if (((e = Ye), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var l = t;
                  ((l.status = "fulfilled"), (l.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var l = t;
                  ((l.status = "rejected"), (l.reason = a));
                }
              }
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), wf(e), e);
        }
        throw ((qa = t), bl);
    }
  }
  function Ba(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function"
        ? ((qa = n), bl)
        : n;
    }
  }
  var qa = null;
  function Tf() {
    if (qa === null) throw Error(r(459));
    var e = qa;
    return ((qa = null), e);
  }
  function wf(e) {
    if (e === bl || e === hi) throw Error(r(483));
  }
  var xl = null,
    co = 0;
  function gi(e) {
    var t = co;
    return ((co += 1), xl === null && (xl = []), Cf(xl, e, t));
  }
  function uo(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function vi(e, t) {
    throw t.$$typeof === w
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Af(e) {
    function t(A, C) {
      if (e) {
        var O = A.deletions;
        O === null ? ((A.deletions = [C]), (A.flags |= 16)) : O.push(C);
      }
    }
    function n(A, C) {
      if (!e) return null;
      for (; C !== null; ) (t(A, C), (C = C.sibling));
      return null;
    }
    function a(A) {
      for (var C = new Map(); A !== null; )
        (A.key !== null ? C.set(A.key, A) : C.set(A.index, A), (A = A.sibling));
      return C;
    }
    function l(A, C) {
      return ((A = On(A, C)), (A.index = 0), (A.sibling = null), A);
    }
    function i(A, C, O) {
      return (
        (A.index = O),
        e
          ? ((O = A.alternate),
            O !== null
              ? ((O = O.index), O < C ? ((A.flags |= 67108866), C) : O)
              : ((A.flags |= 67108866), C))
          : ((A.flags |= 1048576), C)
      );
    }
    function u(A) {
      return (e && A.alternate === null && (A.flags |= 67108866), A);
    }
    function p(A, C, O, Y) {
      return C === null || C.tag !== 6
        ? ((C = nr(O, A.mode, Y)), (C.return = A), C)
        : ((C = l(C, O)), (C.return = A), C);
    }
    function S(A, C, O, Y) {
      var ce = O.type;
      return ce === B
        ? H(A, C, O.props.children, Y, O.key)
        : C !== null &&
            (C.elementType === ce ||
              (typeof ce == "object" &&
                ce !== null &&
                ce.$$typeof === Z &&
                Ba(ce) === C.type))
          ? ((C = l(C, O.props)), uo(C, O), (C.return = A), C)
          : ((C = ci(O.type, O.key, O.props, null, A.mode, Y)),
            uo(C, O),
            (C.return = A),
            C);
    }
    function M(A, C, O, Y) {
      return C === null ||
        C.tag !== 4 ||
        C.stateNode.containerInfo !== O.containerInfo ||
        C.stateNode.implementation !== O.implementation
        ? ((C = ar(O, A.mode, Y)), (C.return = A), C)
        : ((C = l(C, O.children || [])), (C.return = A), C);
    }
    function H(A, C, O, Y, ce) {
      return C === null || C.tag !== 7
        ? ((C = _a(O, A.mode, Y, ce)), (C.return = A), C)
        : ((C = l(C, O)), (C.return = A), C);
    }
    function V(A, C, O) {
      if (
        (typeof C == "string" && C !== "") ||
        typeof C == "number" ||
        typeof C == "bigint"
      )
        return ((C = nr("" + C, A.mode, O)), (C.return = A), C);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case N:
            return (
              (O = ci(C.type, C.key, C.props, null, A.mode, O)),
              uo(O, C),
              (O.return = A),
              O
            );
          case R:
            return ((C = ar(C, A.mode, O)), (C.return = A), C);
          case Z:
            return ((C = Ba(C)), V(A, C, O));
        }
        if (Se(C) || ge(C))
          return ((C = _a(C, A.mode, O, null)), (C.return = A), C);
        if (typeof C.then == "function") return V(A, gi(C), O);
        if (C.$$typeof === K) return V(A, di(A, C), O);
        vi(A, C);
      }
      return null;
    }
    function j(A, C, O, Y) {
      var ce = C !== null ? C.key : null;
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return ce !== null ? null : p(A, C, "" + O, Y);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case N:
            return O.key === ce ? S(A, C, O, Y) : null;
          case R:
            return O.key === ce ? M(A, C, O, Y) : null;
          case Z:
            return ((O = Ba(O)), j(A, C, O, Y));
        }
        if (Se(O) || ge(O)) return ce !== null ? null : H(A, C, O, Y, null);
        if (typeof O.then == "function") return j(A, C, gi(O), Y);
        if (O.$$typeof === K) return j(A, C, di(A, O), Y);
        vi(A, O);
      }
      return null;
    }
    function D(A, C, O, Y, ce) {
      if (
        (typeof Y == "string" && Y !== "") ||
        typeof Y == "number" ||
        typeof Y == "bigint"
      )
        return ((A = A.get(O) || null), p(C, A, "" + Y, ce));
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case N:
            return (
              (A = A.get(Y.key === null ? O : Y.key) || null),
              S(C, A, Y, ce)
            );
          case R:
            return (
              (A = A.get(Y.key === null ? O : Y.key) || null),
              M(C, A, Y, ce)
            );
          case Z:
            return ((Y = Ba(Y)), D(A, C, O, Y, ce));
        }
        if (Se(Y) || ge(Y))
          return ((A = A.get(O) || null), H(C, A, Y, ce, null));
        if (typeof Y.then == "function") return D(A, C, O, gi(Y), ce);
        if (Y.$$typeof === K) return D(A, C, O, di(C, Y), ce);
        vi(C, Y);
      }
      return null;
    }
    function te(A, C, O, Y) {
      for (
        var ce = null, _e = null, ie = C, Te = (C = 0), je = null;
        ie !== null && Te < O.length;
        Te++
      ) {
        ie.index > Te ? ((je = ie), (ie = null)) : (je = ie.sibling);
        var De = j(A, ie, O[Te], Y);
        if (De === null) {
          ie === null && (ie = je);
          break;
        }
        (e && ie && De.alternate === null && t(A, ie),
          (C = i(De, C, Te)),
          _e === null ? (ce = De) : (_e.sibling = De),
          (_e = De),
          (ie = je));
      }
      if (Te === O.length) return (n(A, ie), Re && Mn(A, Te), ce);
      if (ie === null) {
        for (; Te < O.length; Te++)
          ((ie = V(A, O[Te], Y)),
            ie !== null &&
              ((C = i(ie, C, Te)),
              _e === null ? (ce = ie) : (_e.sibling = ie),
              (_e = ie)));
        return (Re && Mn(A, Te), ce);
      }
      for (ie = a(ie); Te < O.length; Te++)
        ((je = D(ie, A, Te, O[Te], Y)),
          je !== null &&
            (e &&
              je.alternate !== null &&
              ie.delete(je.key === null ? Te : je.key),
            (C = i(je, C, Te)),
            _e === null ? (ce = je) : (_e.sibling = je),
            (_e = je)));
      return (
        e &&
          ie.forEach(function (xa) {
            return t(A, xa);
          }),
        Re && Mn(A, Te),
        ce
      );
    }
    function ue(A, C, O, Y) {
      if (O == null) throw Error(r(151));
      for (
        var ce = null,
          _e = null,
          ie = C,
          Te = (C = 0),
          je = null,
          De = O.next();
        ie !== null && !De.done;
        Te++, De = O.next()
      ) {
        ie.index > Te ? ((je = ie), (ie = null)) : (je = ie.sibling);
        var xa = j(A, ie, De.value, Y);
        if (xa === null) {
          ie === null && (ie = je);
          break;
        }
        (e && ie && xa.alternate === null && t(A, ie),
          (C = i(xa, C, Te)),
          _e === null ? (ce = xa) : (_e.sibling = xa),
          (_e = xa),
          (ie = je));
      }
      if (De.done) return (n(A, ie), Re && Mn(A, Te), ce);
      if (ie === null) {
        for (; !De.done; Te++, De = O.next())
          ((De = V(A, De.value, Y)),
            De !== null &&
              ((C = i(De, C, Te)),
              _e === null ? (ce = De) : (_e.sibling = De),
              (_e = De)));
        return (Re && Mn(A, Te), ce);
      }
      for (ie = a(ie); !De.done; Te++, De = O.next())
        ((De = D(ie, A, Te, De.value, Y)),
          De !== null &&
            (e &&
              De.alternate !== null &&
              ie.delete(De.key === null ? Te : De.key),
            (C = i(De, C, Te)),
            _e === null ? (ce = De) : (_e.sibling = De),
            (_e = De)));
      return (
        e &&
          ie.forEach(function (Sv) {
            return t(A, Sv);
          }),
        Re && Mn(A, Te),
        ce
      );
    }
    function Le(A, C, O, Y) {
      if (
        (typeof O == "object" &&
          O !== null &&
          O.type === B &&
          O.key === null &&
          (O = O.props.children),
        typeof O == "object" && O !== null)
      ) {
        switch (O.$$typeof) {
          case N:
            e: {
              for (var ce = O.key; C !== null; ) {
                if (C.key === ce) {
                  if (((ce = O.type), ce === B)) {
                    if (C.tag === 7) {
                      (n(A, C.sibling),
                        (Y = l(C, O.props.children)),
                        (Y.return = A),
                        (A = Y));
                      break e;
                    }
                  } else if (
                    C.elementType === ce ||
                    (typeof ce == "object" &&
                      ce !== null &&
                      ce.$$typeof === Z &&
                      Ba(ce) === C.type)
                  ) {
                    (n(A, C.sibling),
                      (Y = l(C, O.props)),
                      uo(Y, O),
                      (Y.return = A),
                      (A = Y));
                    break e;
                  }
                  n(A, C);
                  break;
                } else t(A, C);
                C = C.sibling;
              }
              O.type === B
                ? ((Y = _a(O.props.children, A.mode, Y, O.key)),
                  (Y.return = A),
                  (A = Y))
                : ((Y = ci(O.type, O.key, O.props, null, A.mode, Y)),
                  uo(Y, O),
                  (Y.return = A),
                  (A = Y));
            }
            return u(A);
          case R:
            e: {
              for (ce = O.key; C !== null; ) {
                if (C.key === ce)
                  if (
                    C.tag === 4 &&
                    C.stateNode.containerInfo === O.containerInfo &&
                    C.stateNode.implementation === O.implementation
                  ) {
                    (n(A, C.sibling),
                      (Y = l(C, O.children || [])),
                      (Y.return = A),
                      (A = Y));
                    break e;
                  } else {
                    n(A, C);
                    break;
                  }
                else t(A, C);
                C = C.sibling;
              }
              ((Y = ar(O, A.mode, Y)), (Y.return = A), (A = Y));
            }
            return u(A);
          case Z:
            return ((O = Ba(O)), Le(A, C, O, Y));
        }
        if (Se(O)) return te(A, C, O, Y);
        if (ge(O)) {
          if (((ce = ge(O)), typeof ce != "function")) throw Error(r(150));
          return ((O = ce.call(O)), ue(A, C, O, Y));
        }
        if (typeof O.then == "function") return Le(A, C, gi(O), Y);
        if (O.$$typeof === K) return Le(A, C, di(A, O), Y);
        vi(A, O);
      }
      return (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
        ? ((O = "" + O),
          C !== null && C.tag === 6
            ? (n(A, C.sibling), (Y = l(C, O)), (Y.return = A), (A = Y))
            : (n(A, C), (Y = nr(O, A.mode, Y)), (Y.return = A), (A = Y)),
          u(A))
        : n(A, C);
    }
    return function (A, C, O, Y) {
      try {
        co = 0;
        var ce = Le(A, C, O, Y);
        return ((xl = null), ce);
      } catch (ie) {
        if (ie === bl || ie === hi) throw ie;
        var _e = Ht(29, ie, null, A.mode);
        return ((_e.lanes = Y), (_e.return = A), _e);
      } finally {
      }
    };
  }
  var La = Af(!0),
    Nf = Af(!1),
    aa = !1;
  function pr(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function gr(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function la(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function oa(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Ge & 2) !== 0)) {
      var l = a.pending;
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (a.pending = t),
        (t = ri(e)),
        uf(e, null, n),
        t
      );
    }
    return (si(e, a, t, n), ri(e));
  }
  function fo(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (n |= a), (t.lanes = n), wt(e, n));
    }
  }
  function vr(e, t) {
    var n = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), n === a)) {
      var l = null,
        i = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var u = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          (i === null ? (l = i = u) : (i = i.next = u), (n = n.next));
        } while (n !== null);
        i === null ? (l = i = t) : (i = i.next = t);
      } else l = i = t;
      ((n = {
        baseState: a.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: i,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  var yr = !1;
  function mo() {
    if (yr) {
      var e = yl;
      if (e !== null) throw e;
    }
  }
  function ho(e, t, n, a) {
    yr = !1;
    var l = e.updateQueue;
    aa = !1;
    var i = l.firstBaseUpdate,
      u = l.lastBaseUpdate,
      p = l.shared.pending;
    if (p !== null) {
      l.shared.pending = null;
      var S = p,
        M = S.next;
      ((S.next = null), u === null ? (i = M) : (u.next = M), (u = S));
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (p = H.lastBaseUpdate),
        p !== u &&
          (p === null ? (H.firstBaseUpdate = M) : (p.next = M),
          (H.lastBaseUpdate = S)));
    }
    if (i !== null) {
      var V = l.baseState;
      ((u = 0), (H = M = S = null), (p = i));
      do {
        var j = p.lane & -536870913,
          D = j !== p.lane;
        if (D ? (Me & j) === j : (a & j) === j) {
          (j !== 0 && j === vl && (yr = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: p.tag,
                  payload: p.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var te = e,
              ue = p;
            j = t;
            var Le = n;
            switch (ue.tag) {
              case 1:
                if (((te = ue.payload), typeof te == "function")) {
                  V = te.call(Le, V, j);
                  break e;
                }
                V = te;
                break e;
              case 3:
                te.flags = (te.flags & -65537) | 128;
              case 0:
                if (
                  ((te = ue.payload),
                  (j = typeof te == "function" ? te.call(Le, V, j) : te),
                  j == null)
                )
                  break e;
                V = m({}, V, j);
                break e;
              case 2:
                aa = !0;
            }
          }
          ((j = p.callback),
            j !== null &&
              ((e.flags |= 64),
              D && (e.flags |= 8192),
              (D = l.callbacks),
              D === null ? (l.callbacks = [j]) : D.push(j)));
        } else
          ((D = {
            lane: j,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null,
          }),
            H === null ? ((M = H = D), (S = V)) : (H = H.next = D),
            (u |= j));
        if (((p = p.next), p === null)) {
          if (((p = l.shared.pending), p === null)) break;
          ((D = p),
            (p = D.next),
            (D.next = null),
            (l.lastBaseUpdate = D),
            (l.shared.pending = null));
        }
      } while (!0);
      (H === null && (S = V),
        (l.baseState = S),
        (l.firstBaseUpdate = M),
        (l.lastBaseUpdate = H),
        i === null && (l.shared.lanes = 0),
        (ua |= u),
        (e.lanes = u),
        (e.memoizedState = V));
    }
  }
  function zf(e, t) {
    if (typeof e != "function") throw Error(r(191, e));
    e.call(t);
  }
  function Of(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) zf(n[e], t);
  }
  var Sl = E(null),
    yi = E(0);
  function Mf(e, t) {
    ((e = Yn), G(yi, e), G(Sl, t), (Yn = e | t.baseLanes));
  }
  function br() {
    (G(yi, Yn), G(Sl, Sl.current));
  }
  function xr() {
    ((Yn = yi.current), q(Sl), q(yi));
  }
  var Bt = E(null),
    Pt = null;
  function ia(e) {
    var t = e.alternate;
    (G(Ie, Ie.current & 1),
      G(Bt, e),
      Pt === null &&
        (t === null || Sl.current !== null || t.memoizedState !== null) &&
        (Pt = e));
  }
  function Sr(e) {
    (G(Ie, Ie.current), G(Bt, e), Pt === null && (Pt = e));
  }
  function jf(e) {
    e.tag === 22
      ? (G(Ie, Ie.current), G(Bt, e), Pt === null && (Pt = e))
      : sa();
  }
  function sa() {
    (G(Ie, Ie.current), G(Bt, Bt.current));
  }
  function qt(e) {
    (q(Bt), Pt === e && (Pt = null), q(Ie));
  }
  var Ie = E(0);
  function bi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || Nc(n) || zc(n)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var _n = 0,
    Ee = null,
    Be = null,
    nt = null,
    xi = !1,
    El = !1,
    Ya = !1,
    Si = 0,
    po = 0,
    Cl = null,
    f0 = 0;
  function We() {
    throw Error(r(321));
  }
  function Er(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Ut(e[n], t[n])) return !1;
    return !0;
  }
  function Cr(e, t, n, a, l, i) {
    return (
      (_n = i),
      (Ee = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (T.H = e === null || e.memoizedState === null ? hd : Br),
      (Ya = !1),
      (i = n(a, l)),
      (Ya = !1),
      El && (i = _f(t, n, a, l)),
      Rf(e),
      i
    );
  }
  function Rf(e) {
    T.H = yo;
    var t = Be !== null && Be.next !== null;
    if (((_n = 0), (nt = Be = Ee = null), (xi = !1), (po = 0), (Cl = null), t))
      throw Error(r(300));
    e === null ||
      at ||
      ((e = e.dependencies), e !== null && fi(e) && (at = !0));
  }
  function _f(e, t, n, a) {
    Ee = e;
    var l = 0;
    do {
      if ((El && (Cl = null), (po = 0), (El = !1), 25 <= l))
        throw Error(r(301));
      if (((l += 1), (nt = Be = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((T.H = pd), (i = t(n, a)));
    } while (El);
    return i;
  }
  function d0() {
    var e = T.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? go(t) : t),
      (e = e.useState()[0]),
      (Be !== null ? Be.memoizedState : null) !== e && (Ee.flags |= 1024),
      t
    );
  }
  function Tr() {
    var e = Si !== 0;
    return ((Si = 0), e);
  }
  function wr(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function Ar(e) {
    if (xi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      xi = !1;
    }
    ((_n = 0), (nt = Be = Ee = null), (El = !1), (po = Si = 0), (Cl = null));
  }
  function Ct() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (nt === null ? (Ee.memoizedState = nt = e) : (nt = nt.next = e), nt);
  }
  function et() {
    if (Be === null) {
      var e = Ee.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Be.next;
    var t = nt === null ? Ee.memoizedState : nt.next;
    if (t !== null) ((nt = t), (Be = e));
    else {
      if (e === null)
        throw Ee.alternate === null ? Error(r(467)) : Error(r(310));
      ((Be = e),
        (e = {
          memoizedState: Be.memoizedState,
          baseState: Be.baseState,
          baseQueue: Be.baseQueue,
          queue: Be.queue,
          next: null,
        }),
        nt === null ? (Ee.memoizedState = nt = e) : (nt = nt.next = e));
    }
    return nt;
  }
  function Ei() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function go(e) {
    var t = po;
    return (
      (po += 1),
      Cl === null && (Cl = []),
      (e = Cf(Cl, e, t)),
      (t = Ee),
      (nt === null ? t.memoizedState : nt.next) === null &&
        ((t = t.alternate),
        (T.H = t === null || t.memoizedState === null ? hd : Br)),
      e
    );
  }
  function Ci(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return go(e);
      if (e.$$typeof === K) return pt(e);
    }
    throw Error(r(438, String(e)));
  }
  function Nr(e) {
    var t = null,
      n = Ee.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var a = Ee.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (l) {
                return l.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = Ei()), (Ee.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++) n[a] = Ce;
    return (t.index++, n);
  }
  function Dn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ti(e) {
    var t = et();
    return zr(t, Be, e);
  }
  function zr(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var l = e.baseQueue,
      i = a.pending;
    if (i !== null) {
      if (l !== null) {
        var u = l.next;
        ((l.next = i.next), (i.next = u));
      }
      ((t.baseQueue = l = i), (a.pending = null));
    }
    if (((i = e.baseState), l === null)) e.memoizedState = i;
    else {
      t = l.next;
      var p = (u = null),
        S = null,
        M = t,
        H = !1;
      do {
        var V = M.lane & -536870913;
        if (V !== M.lane ? (Me & V) === V : (_n & V) === V) {
          var j = M.revertLane;
          if (j === 0)
            (S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: M.action,
                  hasEagerState: M.hasEagerState,
                  eagerState: M.eagerState,
                  next: null,
                }),
              V === vl && (H = !0));
          else if ((_n & j) === j) {
            ((M = M.next), j === vl && (H = !0));
            continue;
          } else
            ((V = {
              lane: 0,
              revertLane: M.revertLane,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null,
            }),
              S === null ? ((p = S = V), (u = i)) : (S = S.next = V),
              (Ee.lanes |= j),
              (ua |= j));
          ((V = M.action),
            Ya && n(i, V),
            (i = M.hasEagerState ? M.eagerState : n(i, V)));
        } else
          ((j = {
            lane: V,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null,
          }),
            S === null ? ((p = S = j), (u = i)) : (S = S.next = j),
            (Ee.lanes |= V),
            (ua |= V));
        M = M.next;
      } while (M !== null && M !== t);
      if (
        (S === null ? (u = i) : (S.next = p),
        !Ut(i, e.memoizedState) && ((at = !0), H && ((n = yl), n !== null)))
      )
        throw n;
      ((e.memoizedState = i),
        (e.baseState = u),
        (e.baseQueue = S),
        (a.lastRenderedState = i));
    }
    return (l === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function Or(e) {
    var t = et(),
      n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch,
      l = n.pending,
      i = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var u = (l = l.next);
      do ((i = e(i, u.action)), (u = u.next));
      while (u !== l);
      (Ut(i, t.memoizedState) || (at = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (n.lastRenderedState = i));
    }
    return [i, a];
  }
  function Df(e, t, n) {
    var a = Ee,
      l = et(),
      i = Re;
    if (i) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = t();
    var u = !Ut((Be || l).memoizedState, n);
    if (
      (u && ((l.memoizedState = n), (at = !0)),
      (l = l.queue),
      Rr(Hf.bind(null, a, l, e), [e]),
      l.getSnapshot !== t || u || (nt !== null && nt.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Tl(9, { destroy: void 0 }, Uf.bind(null, a, l, n, t), null),
        Ye === null)
      )
        throw Error(r(349));
      i || (_n & 127) !== 0 || Gf(a, t, n);
    }
    return n;
  }
  function Gf(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Ee.updateQueue),
      t === null
        ? ((t = Ei()), (Ee.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Uf(e, t, n, a) {
    ((t.value = n), (t.getSnapshot = a), Bf(t) && qf(e));
  }
  function Hf(e, t, n) {
    return n(function () {
      Bf(t) && qf(e);
    });
  }
  function Bf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Ut(e, n);
    } catch {
      return !0;
    }
  }
  function qf(e) {
    var t = Ra(e, 2);
    t !== null && _t(t, e, 2);
  }
  function Mr(e) {
    var t = Ct();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), Ya)) {
        nn(!0);
        try {
          n();
        } finally {
          nn(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dn,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Lf(e, t, n, a) {
    return ((e.baseState = n), zr(e, Be, typeof a == "function" ? a : Dn));
  }
  function m0(e, t, n, a, l) {
    if (Ni(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var i = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (u) {
          i.listeners.push(u);
        },
      };
      (T.T !== null ? n(!0) : (i.isTransition = !1),
        a(i),
        (n = t.pending),
        n === null
          ? ((i.next = t.pending = i), Yf(t, i))
          : ((i.next = n.next), (t.pending = n.next = i)));
    }
  }
  function Yf(e, t) {
    var n = t.action,
      a = t.payload,
      l = e.state;
    if (t.isTransition) {
      var i = T.T,
        u = {};
      T.T = u;
      try {
        var p = n(l, a),
          S = T.S;
        (S !== null && S(u, p), Vf(e, t, p));
      } catch (M) {
        jr(e, t, M);
      } finally {
        (i !== null && u.types !== null && (i.types = u.types), (T.T = i));
      }
    } else
      try {
        ((i = n(l, a)), Vf(e, t, i));
      } catch (M) {
        jr(e, t, M);
      }
  }
  function Vf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (a) {
            kf(e, t, a);
          },
          function (a) {
            return jr(e, t, a);
          }
        )
      : kf(e, t, n);
  }
  function kf(e, t, n) {
    ((t.status = "fulfilled"),
      (t.value = n),
      Xf(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Yf(e, n))));
  }
  function jr(e, t, n) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = n), Xf(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function Xf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Qf(e, t) {
    return t;
  }
  function Zf(e, t) {
    if (Re) {
      var n = Ye.formState;
      if (n !== null) {
        e: {
          var a = Ee;
          if (Re) {
            if (Xe) {
              t: {
                for (var l = Xe, i = Wt; l.nodeType !== 8; ) {
                  if (!i) {
                    l = null;
                    break t;
                  }
                  if (((l = It(l.nextSibling)), l === null)) {
                    l = null;
                    break t;
                  }
                }
                ((i = l.data), (l = i === "F!" || i === "F" ? l : null));
              }
              if (l) {
                ((Xe = It(l.nextSibling)), (a = l.data === "F!"));
                break e;
              }
            }
            ta(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return (
      (n = Ct()),
      (n.memoizedState = n.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qf,
        lastRenderedState: t,
      }),
      (n.queue = a),
      (n = fd.bind(null, Ee, a)),
      (a.dispatch = n),
      (a = Mr(!1)),
      (i = Hr.bind(null, Ee, !1, a.queue)),
      (a = Ct()),
      (l = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = l),
      (n = m0.bind(null, Ee, l, i, n)),
      (l.dispatch = n),
      (a.memoizedState = e),
      [t, n, !1]
    );
  }
  function Kf(e) {
    var t = et();
    return Jf(t, Be, e);
  }
  function Jf(e, t, n) {
    if (
      ((t = zr(e, t, Qf)[0]),
      (e = Ti(Dn)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = go(t);
      } catch (u) {
        throw u === bl ? hi : u;
      }
    else a = t;
    t = et();
    var l = t.queue,
      i = l.dispatch;
    return (
      n !== t.memoizedState &&
        ((Ee.flags |= 2048),
        Tl(9, { destroy: void 0 }, h0.bind(null, l, n), null)),
      [a, i, e]
    );
  }
  function h0(e, t) {
    e.action = t;
  }
  function $f(e) {
    var t = et(),
      n = Be;
    if (n !== null) return Jf(t, n, e);
    (et(), (t = t.memoizedState), (n = et()));
    var a = n.queue.dispatch;
    return ((n.memoizedState = e), [t, a, !1]);
  }
  function Tl(e, t, n, a) {
    return (
      (e = { tag: e, create: n, deps: a, inst: t, next: null }),
      (t = Ee.updateQueue),
      t === null && ((t = Ei()), (Ee.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((a = n.next), (n.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function Ff() {
    return et().memoizedState;
  }
  function wi(e, t, n, a) {
    var l = Ct();
    ((Ee.flags |= e),
      (l.memoizedState = Tl(
        1 | t,
        { destroy: void 0 },
        n,
        a === void 0 ? null : a
      )));
  }
  function Ai(e, t, n, a) {
    var l = et();
    a = a === void 0 ? null : a;
    var i = l.memoizedState.inst;
    Be !== null && a !== null && Er(a, Be.memoizedState.deps)
      ? (l.memoizedState = Tl(t, i, n, a))
      : ((Ee.flags |= e), (l.memoizedState = Tl(1 | t, i, n, a)));
  }
  function Wf(e, t) {
    wi(8390656, 8, e, t);
  }
  function Rr(e, t) {
    Ai(2048, 8, e, t);
  }
  function p0(e) {
    Ee.flags |= 4;
    var t = Ee.updateQueue;
    if (t === null) ((t = Ei()), (Ee.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function Pf(e) {
    var t = et().memoizedState;
    return (
      p0({ ref: t, nextImpl: e }),
      function () {
        if ((Ge & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function If(e, t) {
    return Ai(4, 2, e, t);
  }
  function ed(e, t) {
    return Ai(4, 4, e, t);
  }
  function td(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function nd(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), Ai(4, 4, td.bind(null, t, e), n));
  }
  function _r() {}
  function ad(e, t) {
    var n = et();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && Er(t, a[1]) ? a[0] : ((n.memoizedState = [e, t]), e);
  }
  function ld(e, t) {
    var n = et();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && Er(t, a[1])) return a[0];
    if (((a = e()), Ya)) {
      nn(!0);
      try {
        e();
      } finally {
        nn(!1);
      }
    }
    return ((n.memoizedState = [a, t]), a);
  }
  function Dr(e, t, n) {
    return n === void 0 || ((_n & 1073741824) !== 0 && (Me & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = om()), (Ee.lanes |= e), (ua |= e), n);
  }
  function od(e, t, n, a) {
    return Ut(n, t)
      ? n
      : Sl.current !== null
        ? ((e = Dr(e, n, a)), Ut(e, t) || (at = !0), e)
        : (_n & 42) === 0 || ((_n & 1073741824) !== 0 && (Me & 261930) === 0)
          ? ((at = !0), (e.memoizedState = n))
          : ((e = om()), (Ee.lanes |= e), (ua |= e), t);
  }
  function id(e, t, n, a, l) {
    var i = U.p;
    U.p = i !== 0 && 8 > i ? i : 8;
    var u = T.T,
      p = {};
    ((T.T = p), Hr(e, !1, t, n));
    try {
      var S = l(),
        M = T.S;
      if (
        (M !== null && M(p, S),
        S !== null && typeof S == "object" && typeof S.then == "function")
      ) {
        var H = u0(S, a);
        vo(e, t, H, Vt(e));
      } else vo(e, t, a, Vt(e));
    } catch (V) {
      vo(e, t, { then: function () {}, status: "rejected", reason: V }, Vt());
    } finally {
      ((U.p = i),
        u !== null && p.types !== null && (u.types = p.types),
        (T.T = u));
    }
  }
  function g0() {}
  function Gr(e, t, n, a) {
    if (e.tag !== 5) throw Error(r(476));
    var l = sd(e).queue;
    id(
      e,
      l,
      t,
      _,
      n === null
        ? g0
        : function () {
            return (rd(e), n(a));
          }
    );
  }
  function sd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: _,
      baseState: _,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Dn,
        lastRenderedState: _,
      },
      next: null,
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Dn,
          lastRenderedState: n,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function rd(e) {
    var t = sd(e);
    (t.next === null && (t = e.alternate.memoizedState),
      vo(e, t.next.queue, {}, Vt()));
  }
  function Ur() {
    return pt(Do);
  }
  function cd() {
    return et().memoizedState;
  }
  function ud() {
    return et().memoizedState;
  }
  function v0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Vt();
          e = la(n);
          var a = oa(t, e, n);
          (a !== null && (_t(a, t, n), fo(a, t, n)),
            (t = { cache: fr() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function y0(e, t, n) {
    var a = Vt();
    ((n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ni(e)
        ? dd(t, n)
        : ((n = er(e, t, n, a)), n !== null && (_t(n, e, a), md(n, t, a))));
  }
  function fd(e, t, n) {
    var a = Vt();
    vo(e, t, n, a);
  }
  function vo(e, t, n, a) {
    var l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ni(e)) dd(t, l);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var u = t.lastRenderedState,
            p = i(u, n);
          if (((l.hasEagerState = !0), (l.eagerState = p), Ut(p, u)))
            return (si(e, t, l, 0), Ye === null && ii(), !1);
        } catch {
        } finally {
        }
      if (((n = er(e, t, l, a)), n !== null))
        return (_t(n, e, a), md(n, t, a), !0);
    }
    return !1;
  }
  function Hr(e, t, n, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: pc(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ni(e))
    ) {
      if (t) throw Error(r(479));
    } else ((t = er(e, n, a, 2)), t !== null && _t(t, e, 2));
  }
  function Ni(e) {
    var t = e.alternate;
    return e === Ee || (t !== null && t === Ee);
  }
  function dd(e, t) {
    El = xi = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function md(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (n |= a), (t.lanes = n), wt(e, n));
    }
  }
  var yo = {
    readContext: pt,
    use: Ci,
    useCallback: We,
    useContext: We,
    useEffect: We,
    useImperativeHandle: We,
    useLayoutEffect: We,
    useInsertionEffect: We,
    useMemo: We,
    useReducer: We,
    useRef: We,
    useState: We,
    useDebugValue: We,
    useDeferredValue: We,
    useTransition: We,
    useSyncExternalStore: We,
    useId: We,
    useHostTransitionStatus: We,
    useFormState: We,
    useActionState: We,
    useOptimistic: We,
    useMemoCache: We,
    useCacheRefresh: We,
  };
  yo.useEffectEvent = We;
  var hd = {
      readContext: pt,
      use: Ci,
      useCallback: function (e, t) {
        return ((Ct().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: pt,
      useEffect: Wf,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null),
          wi(4194308, 4, td.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return wi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        wi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Ct();
        t = t === void 0 ? null : t;
        var a = e();
        if (Ya) {
          nn(!0);
          try {
            e();
          } finally {
            nn(!1);
          }
        }
        return ((n.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, n) {
        var a = Ct();
        if (n !== void 0) {
          var l = n(t);
          if (Ya) {
            nn(!0);
            try {
              n(t);
            } finally {
              nn(!1);
            }
          }
        } else l = t;
        return (
          (a.memoizedState = a.baseState = l),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: l,
          }),
          (a.queue = e),
          (e = e.dispatch = y0.bind(null, Ee, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Ct();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Mr(e);
        var t = e.queue,
          n = fd.bind(null, Ee, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: _r,
      useDeferredValue: function (e, t) {
        var n = Ct();
        return Dr(n, e, t);
      },
      useTransition: function () {
        var e = Mr(!1);
        return (
          (e = id.bind(null, Ee, e.queue, !0, !1)),
          (Ct().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var a = Ee,
          l = Ct();
        if (Re) {
          if (n === void 0) throw Error(r(407));
          n = n();
        } else {
          if (((n = t()), Ye === null)) throw Error(r(349));
          (Me & 127) !== 0 || Gf(a, t, n);
        }
        l.memoizedState = n;
        var i = { value: n, getSnapshot: t };
        return (
          (l.queue = i),
          Wf(Hf.bind(null, a, i, e), [e]),
          (a.flags |= 2048),
          Tl(9, { destroy: void 0 }, Uf.bind(null, a, i, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Ct(),
          t = Ye.identifierPrefix;
        if (Re) {
          var n = pn,
            a = hn;
          ((n = (a & ~(1 << (32 - yt(a) - 1))).toString(32) + n),
            (t = "_" + t + "R_" + n),
            (n = Si++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "_"));
        } else ((n = f0++), (t = "_" + t + "r_" + n.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Ur,
      useFormState: Zf,
      useActionState: Zf,
      useOptimistic: function (e) {
        var t = Ct();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = n),
          (t = Hr.bind(null, Ee, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: Nr,
      useCacheRefresh: function () {
        return (Ct().memoizedState = v0.bind(null, Ee));
      },
      useEffectEvent: function (e) {
        var t = Ct(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((Ge & 2) !== 0) throw Error(r(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Br = {
      readContext: pt,
      use: Ci,
      useCallback: ad,
      useContext: pt,
      useEffect: Rr,
      useImperativeHandle: nd,
      useInsertionEffect: If,
      useLayoutEffect: ed,
      useMemo: ld,
      useReducer: Ti,
      useRef: Ff,
      useState: function () {
        return Ti(Dn);
      },
      useDebugValue: _r,
      useDeferredValue: function (e, t) {
        var n = et();
        return od(n, Be.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Ti(Dn)[0],
          t = et().memoizedState;
        return [typeof e == "boolean" ? e : go(e), t];
      },
      useSyncExternalStore: Df,
      useId: cd,
      useHostTransitionStatus: Ur,
      useFormState: Kf,
      useActionState: Kf,
      useOptimistic: function (e, t) {
        var n = et();
        return Lf(n, Be, e, t);
      },
      useMemoCache: Nr,
      useCacheRefresh: ud,
    };
  Br.useEffectEvent = Pf;
  var pd = {
    readContext: pt,
    use: Ci,
    useCallback: ad,
    useContext: pt,
    useEffect: Rr,
    useImperativeHandle: nd,
    useInsertionEffect: If,
    useLayoutEffect: ed,
    useMemo: ld,
    useReducer: Or,
    useRef: Ff,
    useState: function () {
      return Or(Dn);
    },
    useDebugValue: _r,
    useDeferredValue: function (e, t) {
      var n = et();
      return Be === null ? Dr(n, e, t) : od(n, Be.memoizedState, e, t);
    },
    useTransition: function () {
      var e = Or(Dn)[0],
        t = et().memoizedState;
      return [typeof e == "boolean" ? e : go(e), t];
    },
    useSyncExternalStore: Df,
    useId: cd,
    useHostTransitionStatus: Ur,
    useFormState: $f,
    useActionState: $f,
    useOptimistic: function (e, t) {
      var n = et();
      return Be !== null
        ? Lf(n, Be, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: Nr,
    useCacheRefresh: ud,
  };
  pd.useEffectEvent = Pf;
  function qr(e, t, n, a) {
    ((t = e.memoizedState),
      (n = n(a, t)),
      (n = n == null ? t : m({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Lr = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var a = Vt(),
        l = la(a);
      ((l.payload = t),
        n != null && (l.callback = n),
        (t = oa(e, l, a)),
        t !== null && (_t(t, e, a), fo(t, e, a)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var a = Vt(),
        l = la(a);
      ((l.tag = 1),
        (l.payload = t),
        n != null && (l.callback = n),
        (t = oa(e, l, a)),
        t !== null && (_t(t, e, a), fo(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = Vt(),
        a = la(n);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = oa(e, a, n)),
        t !== null && (_t(t, e, n), fo(t, e, n)));
    },
  };
  function gd(e, t, n, a, l, i, u) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, i, u)
        : t.prototype && t.prototype.isPureReactComponent
          ? !ao(n, a) || !ao(l, i)
          : !0
    );
  }
  function vd(e, t, n, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, a),
      t.state !== e && Lr.enqueueReplaceState(t, t.state, null));
  }
  function Va(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t) a !== "ref" && (n[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = m({}, n));
      for (var l in e) n[l] === void 0 && (n[l] = e[l]);
    }
    return n;
  }
  function yd(e) {
    oi(e);
  }
  function bd(e) {
    console.error(e);
  }
  function xd(e) {
    oi(e);
  }
  function zi(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Sd(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (l) {
      setTimeout(function () {
        throw l;
      });
    }
  }
  function Yr(e, t, n) {
    return (
      (n = la(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        zi(e, t);
      }),
      n
    );
  }
  function Ed(e) {
    return ((e = la(e)), (e.tag = 3), e);
  }
  function Cd(e, t, n, a) {
    var l = n.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var i = a.value;
      ((e.payload = function () {
        return l(i);
      }),
        (e.callback = function () {
          Sd(t, n, a);
        }));
    }
    var u = n.stateNode;
    u !== null &&
      typeof u.componentDidCatch == "function" &&
      (e.callback = function () {
        (Sd(t, n, a),
          typeof l != "function" &&
            (fa === null ? (fa = new Set([this])) : fa.add(this)));
        var p = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: p !== null ? p : "",
        });
      });
  }
  function b0(e, t, n, a, l) {
    if (
      ((n.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && gl(t, n, l, !0),
        (n = Bt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Pt === null ? Li() : n.alternate === null && Pe === 0 && (Pe = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = l),
              a === pi
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([a])) : t.add(a),
                  dc(e, a, l)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              a === pi
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([a])) : n.add(a)),
                  dc(e, a, l)),
              !1
            );
        }
        throw Error(r(435, n.tag));
      }
      return (dc(e, a, l), Li(), !1);
    }
    if (Re)
      return (
        (t = Bt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = l),
            a !== ir && ((e = Error(r(422), { cause: a })), io(Jt(e, n))))
          : (a !== ir && ((t = Error(r(423), { cause: a })), io(Jt(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (l &= -l),
            (e.lanes |= l),
            (a = Jt(a, n)),
            (l = Yr(e.stateNode, a, l)),
            vr(e, l),
            Pe !== 4 && (Pe = 2)),
        !1
      );
    var i = Error(r(520), { cause: a });
    if (
      ((i = Jt(i, n)),
      Ao === null ? (Ao = [i]) : Ao.push(i),
      Pe !== 4 && (Pe = 2),
      t === null)
    )
      return !0;
    ((a = Jt(a, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = l & -l),
            (n.lanes |= e),
            (e = Yr(n.stateNode, a, e)),
            vr(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (i = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (i !== null &&
                  typeof i.componentDidCatch == "function" &&
                  (fa === null || !fa.has(i)))))
          )
            return (
              (n.flags |= 65536),
              (l &= -l),
              (n.lanes |= l),
              (l = Ed(l)),
              Cd(l, e, n, a),
              vr(n, l),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Vr = Error(r(461)),
    at = !1;
  function gt(e, t, n, a) {
    t.child = e === null ? Nf(t, null, n, a) : La(t, e.child, n, a);
  }
  function Td(e, t, n, a, l) {
    n = n.render;
    var i = t.ref;
    if ("ref" in a) {
      var u = {};
      for (var p in a) p !== "ref" && (u[p] = a[p]);
    } else u = a;
    return (
      Ua(t),
      (a = Cr(e, t, n, u, i, l)),
      (p = Tr()),
      e !== null && !at
        ? (wr(e, t, l), Gn(e, t, l))
        : (Re && p && lr(t), (t.flags |= 1), gt(e, t, a, l), t.child)
    );
  }
  function wd(e, t, n, a, l) {
    if (e === null) {
      var i = n.type;
      return typeof i == "function" &&
        !tr(i) &&
        i.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = i), Ad(e, t, i, a, l))
        : ((e = ci(n.type, null, a, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((i = e.child), !Fr(e, l))) {
      var u = i.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : ao), n(u, a) && e.ref === t.ref)
      )
        return Gn(e, t, l);
    }
    return (
      (t.flags |= 1),
      (e = On(i, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ad(e, t, n, a, l) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (ao(i, a) && e.ref === t.ref)
        if (((at = !1), (t.pendingProps = a = i), Fr(e, l)))
          (e.flags & 131072) !== 0 && (at = !0);
        else return ((t.lanes = e.lanes), Gn(e, t, l));
    }
    return kr(e, t, n, a, l);
  }
  function Nd(e, t, n, a) {
    var l = a.children,
      i = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | n : n), e !== null)) {
          for (a = t.child = e.child, l = 0; a !== null; )
            ((l = l | a.lanes | a.childLanes), (a = a.sibling));
          a = l & ~i;
        } else ((a = 0), (t.child = null));
        return zd(e, t, i, n, a);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && mi(t, i !== null ? i.cachePool : null),
          i !== null ? Mf(t, i) : br(),
          jf(t));
      else
        return (
          (a = t.lanes = 536870912),
          zd(e, t, i !== null ? i.baseLanes | n : n, n, a)
        );
    } else
      i !== null
        ? (mi(t, i.cachePool), Mf(t, i), sa(), (t.memoizedState = null))
        : (e !== null && mi(t, null), br(), sa());
    return (gt(e, t, l, n), t.child);
  }
  function bo(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function zd(e, t, n, a, l) {
    var i = mr();
    return (
      (i = i === null ? null : { parent: tt._currentValue, pool: i }),
      (t.memoizedState = { baseLanes: n, cachePool: i }),
      e !== null && mi(t, null),
      br(),
      jf(t),
      e !== null && gl(e, t, a, !0),
      (t.childLanes = l),
      null
    );
  }
  function Oi(e, t) {
    return (
      (t = ji({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Od(e, t, n) {
    return (
      La(t, e.child, null, n),
      (e = Oi(t, t.pendingProps)),
      (e.flags |= 2),
      qt(t),
      (t.memoizedState = null),
      e
    );
  }
  function x0(e, t, n) {
    var a = t.pendingProps,
      l = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Re) {
        if (a.mode === "hidden")
          return ((e = Oi(t, a)), (t.lanes = 536870912), bo(null, e));
        if (
          (Sr(t),
          (e = Xe)
            ? ((e = Ym(e, Wt)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: In !== null ? { id: hn, overflow: pn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = df(e)),
                (n.return = t),
                (t.child = n),
                (ht = t),
                (Xe = null)))
            : (e = null),
          e === null)
        )
          throw ta(t);
        return ((t.lanes = 536870912), null);
      }
      return Oi(t, a);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var u = i.dehydrated;
      if ((Sr(t), l))
        if (t.flags & 256) ((t.flags &= -257), (t = Od(e, t, n)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if (
        (at || gl(e, t, n, !1), (l = (n & e.childLanes) !== 0), at || l)
      ) {
        if (
          ((a = Ye),
          a !== null && ((u = At(a, n)), u !== 0 && u !== i.retryLane))
        )
          throw ((i.retryLane = u), Ra(e, u), _t(a, e, u), Vr);
        (Li(), (t = Od(e, t, n)));
      } else
        ((e = i.treeContext),
          (Xe = It(u.nextSibling)),
          (ht = t),
          (Re = !0),
          (ea = null),
          (Wt = !1),
          e !== null && pf(t, e),
          (t = Oi(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = On(e.child, { mode: a.mode, children: a.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Mi(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(r(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function kr(e, t, n, a, l) {
    return (
      Ua(t),
      (n = Cr(e, t, n, a, void 0, l)),
      (a = Tr()),
      e !== null && !at
        ? (wr(e, t, l), Gn(e, t, l))
        : (Re && a && lr(t), (t.flags |= 1), gt(e, t, n, l), t.child)
    );
  }
  function Md(e, t, n, a, l, i) {
    return (
      Ua(t),
      (t.updateQueue = null),
      (n = _f(t, a, n, l)),
      Rf(e),
      (a = Tr()),
      e !== null && !at
        ? (wr(e, t, i), Gn(e, t, i))
        : (Re && a && lr(t), (t.flags |= 1), gt(e, t, n, i), t.child)
    );
  }
  function jd(e, t, n, a, l) {
    if ((Ua(t), t.stateNode === null)) {
      var i = dl,
        u = n.contextType;
      (typeof u == "object" && u !== null && (i = pt(u)),
        (i = new n(a, i)),
        (t.memoizedState =
          i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = Lr),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = a),
        (i.state = t.memoizedState),
        (i.refs = {}),
        pr(t),
        (u = n.contextType),
        (i.context = typeof u == "object" && u !== null ? pt(u) : dl),
        (i.state = t.memoizedState),
        (u = n.getDerivedStateFromProps),
        typeof u == "function" && (qr(t, n, u, a), (i.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function" ||
          (typeof i.UNSAFE_componentWillMount != "function" &&
            typeof i.componentWillMount != "function") ||
          ((u = i.state),
          typeof i.componentWillMount == "function" && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == "function" &&
            i.UNSAFE_componentWillMount(),
          u !== i.state && Lr.enqueueReplaceState(i, i.state, null),
          ho(t, a, i, l),
          mo(),
          (i.state = t.memoizedState)),
        typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      i = t.stateNode;
      var p = t.memoizedProps,
        S = Va(n, p);
      i.props = S;
      var M = i.context,
        H = n.contextType;
      ((u = dl), typeof H == "object" && H !== null && (u = pt(H)));
      var V = n.getDerivedStateFromProps;
      ((H =
        typeof V == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function"),
        (p = t.pendingProps !== p),
        H ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((p || M !== u) && vd(t, i, a, u)),
        (aa = !1));
      var j = t.memoizedState;
      ((i.state = j),
        ho(t, a, i, l),
        mo(),
        (M = t.memoizedState),
        p || j !== M || aa
          ? (typeof V == "function" && (qr(t, n, V, a), (M = t.memoizedState)),
            (S = aa || gd(t, n, S, a, j, M, u))
              ? (H ||
                  (typeof i.UNSAFE_componentWillMount != "function" &&
                    typeof i.componentWillMount != "function") ||
                  (typeof i.componentWillMount == "function" &&
                    i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == "function" &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof i.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = M)),
            (i.props = a),
            (i.state = M),
            (i.context = u),
            (a = S))
          : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((i = t.stateNode),
        gr(e, t),
        (u = t.memoizedProps),
        (H = Va(n, u)),
        (i.props = H),
        (V = t.pendingProps),
        (j = i.context),
        (M = n.contextType),
        (S = dl),
        typeof M == "object" && M !== null && (S = pt(M)),
        (p = n.getDerivedStateFromProps),
        (M =
          typeof p == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function") ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((u !== V || j !== S) && vd(t, i, a, S)),
        (aa = !1),
        (j = t.memoizedState),
        (i.state = j),
        ho(t, a, i, l),
        mo());
      var D = t.memoizedState;
      u !== V ||
      j !== D ||
      aa ||
      (e !== null && e.dependencies !== null && fi(e.dependencies))
        ? (typeof p == "function" && (qr(t, n, p, a), (D = t.memoizedState)),
          (H =
            aa ||
            gd(t, n, H, a, j, D, S) ||
            (e !== null && e.dependencies !== null && fi(e.dependencies)))
            ? (M ||
                (typeof i.UNSAFE_componentWillUpdate != "function" &&
                  typeof i.componentWillUpdate != "function") ||
                (typeof i.componentWillUpdate == "function" &&
                  i.componentWillUpdate(a, D, S),
                typeof i.UNSAFE_componentWillUpdate == "function" &&
                  i.UNSAFE_componentWillUpdate(a, D, S)),
              typeof i.componentDidUpdate == "function" && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof i.componentDidUpdate != "function" ||
                (u === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                (u === e.memoizedProps && j === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = D)),
          (i.props = a),
          (i.state = D),
          (i.context = S),
          (a = H))
        : (typeof i.componentDidUpdate != "function" ||
            (u === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != "function" ||
            (u === e.memoizedProps && j === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (i = a),
      Mi(e, t),
      (a = (t.flags & 128) !== 0),
      i || a
        ? ((i = t.stateNode),
          (n =
            a && typeof n.getDerivedStateFromError != "function"
              ? null
              : i.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = La(t, e.child, null, l)),
              (t.child = La(t, null, n, l)))
            : gt(e, t, n, l),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = Gn(e, t, l)),
      e
    );
  }
  function Rd(e, t, n, a) {
    return (Da(), (t.flags |= 256), gt(e, t, n, a), t.child);
  }
  var Xr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Qr(e) {
    return { baseLanes: e, cachePool: Sf() };
  }
  function Zr(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= Yt), e);
  }
  function _d(e, t, n) {
    var a = t.pendingProps,
      l = !1,
      i = (t.flags & 128) !== 0,
      u;
    if (
      ((u = i) ||
        (u =
          e !== null && e.memoizedState === null ? !1 : (Ie.current & 2) !== 0),
      u && ((l = !0), (t.flags &= -129)),
      (u = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Re) {
        if (
          (l ? ia(t) : sa(),
          (e = Xe)
            ? ((e = Ym(e, Wt)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: In !== null ? { id: hn, overflow: pn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = df(e)),
                (n.return = t),
                (t.child = n),
                (ht = t),
                (Xe = null)))
            : (e = null),
          e === null)
        )
          throw ta(t);
        return (zc(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var p = a.children;
      return (
        (a = a.fallback),
        l
          ? (sa(),
            (l = t.mode),
            (p = ji({ mode: "hidden", children: p }, l)),
            (a = _a(a, l, n, null)),
            (p.return = t),
            (a.return = t),
            (p.sibling = a),
            (t.child = p),
            (a = t.child),
            (a.memoizedState = Qr(n)),
            (a.childLanes = Zr(e, u, n)),
            (t.memoizedState = Xr),
            bo(null, a))
          : (ia(t), Kr(t, p))
      );
    }
    var S = e.memoizedState;
    if (S !== null && ((p = S.dehydrated), p !== null)) {
      if (i)
        t.flags & 256
          ? (ia(t), (t.flags &= -257), (t = Jr(e, t, n)))
          : t.memoizedState !== null
            ? (sa(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (sa(),
              (p = a.fallback),
              (l = t.mode),
              (a = ji({ mode: "visible", children: a.children }, l)),
              (p = _a(p, l, n, null)),
              (p.flags |= 2),
              (a.return = t),
              (p.return = t),
              (a.sibling = p),
              (t.child = a),
              La(t, e.child, null, n),
              (a = t.child),
              (a.memoizedState = Qr(n)),
              (a.childLanes = Zr(e, u, n)),
              (t.memoizedState = Xr),
              (t = bo(null, a)));
      else if ((ia(t), zc(p))) {
        if (((u = p.nextSibling && p.nextSibling.dataset), u)) var M = u.dgst;
        ((u = M),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = u),
          io({ value: a, source: null, stack: null }),
          (t = Jr(e, t, n)));
      } else if (
        (at || gl(e, t, n, !1), (u = (n & e.childLanes) !== 0), at || u)
      ) {
        if (
          ((u = Ye),
          u !== null && ((a = At(u, n)), a !== 0 && a !== S.retryLane))
        )
          throw ((S.retryLane = a), Ra(e, a), _t(u, e, a), Vr);
        (Nc(p) || Li(), (t = Jr(e, t, n)));
      } else
        Nc(p)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = S.treeContext),
            (Xe = It(p.nextSibling)),
            (ht = t),
            (Re = !0),
            (ea = null),
            (Wt = !1),
            e !== null && pf(t, e),
            (t = Kr(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return l
      ? (sa(),
        (p = a.fallback),
        (l = t.mode),
        (S = e.child),
        (M = S.sibling),
        (a = On(S, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = S.subtreeFlags & 65011712),
        M !== null ? (p = On(M, p)) : ((p = _a(p, l, n, null)), (p.flags |= 2)),
        (p.return = t),
        (a.return = t),
        (a.sibling = p),
        (t.child = a),
        bo(null, a),
        (a = t.child),
        (p = e.child.memoizedState),
        p === null
          ? (p = Qr(n))
          : ((l = p.cachePool),
            l !== null
              ? ((S = tt._currentValue),
                (l = l.parent !== S ? { parent: S, pool: S } : l))
              : (l = Sf()),
            (p = { baseLanes: p.baseLanes | n, cachePool: l })),
        (a.memoizedState = p),
        (a.childLanes = Zr(e, u, n)),
        (t.memoizedState = Xr),
        bo(e.child, a))
      : (ia(t),
        (n = e.child),
        (e = n.sibling),
        (n = On(n, { mode: "visible", children: a.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((u = t.deletions),
          u === null ? ((t.deletions = [e]), (t.flags |= 16)) : u.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Kr(e, t) {
    return (
      (t = ji({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ji(e, t) {
    return ((e = Ht(22, e, null, t)), (e.lanes = 0), e);
  }
  function Jr(e, t, n) {
    return (
      La(t, e.child, null, n),
      (e = Kr(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Dd(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), cr(e.return, t, n));
  }
  function $r(e, t, n, a, l, i) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: n,
          tailMode: l,
          treeForkCount: i,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = a),
        (u.tail = n),
        (u.tailMode = l),
        (u.treeForkCount = i));
  }
  function Gd(e, t, n) {
    var a = t.pendingProps,
      l = a.revealOrder,
      i = a.tail;
    a = a.children;
    var u = Ie.current,
      p = (u & 2) !== 0;
    if (
      (p ? ((u = (u & 1) | 2), (t.flags |= 128)) : (u &= 1),
      G(Ie, u),
      gt(e, t, a, n),
      (a = Re ? oo : 0),
      !p && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Dd(e, n, t);
        else if (e.tag === 19) Dd(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && bi(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          $r(t, !1, l, n, i, a));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && bi(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        $r(t, !0, n, null, i, a);
        break;
      case "together":
        $r(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Gn(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (ua |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((gl(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, n = On(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (n = n.sibling = On(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Fr(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && fi(e)));
  }
  function S0(e, t, n) {
    switch (t.tag) {
      case 3:
        (fe(t, t.stateNode.containerInfo),
          na(t, tt, e.memoizedState.cache),
          Da());
        break;
      case 27:
      case 5:
        ot(t);
        break;
      case 4:
        fe(t, t.stateNode.containerInfo);
        break;
      case 10:
        na(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Sr(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (ia(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? _d(e, t, n)
              : (ia(t), (e = Gn(e, t, n)), e !== null ? e.sibling : null);
        ia(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (
          ((a = (n & t.childLanes) !== 0),
          a || (gl(e, t, n, !1), (a = (n & t.childLanes) !== 0)),
          l)
        ) {
          if (a) return Gd(e, t, n);
          t.flags |= 128;
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          G(Ie, Ie.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Nd(e, t, n, t.pendingProps));
      case 24:
        na(t, tt, e.memoizedState.cache);
    }
    return Gn(e, t, n);
  }
  function Ud(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) at = !0;
      else {
        if (!Fr(e, n) && (t.flags & 128) === 0) return ((at = !1), S0(e, t, n));
        at = (e.flags & 131072) !== 0;
      }
    else ((at = !1), Re && (t.flags & 1048576) !== 0 && hf(t, oo, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (((e = Ba(t.elementType)), (t.type = e), typeof e == "function"))
            tr(e)
              ? ((a = Va(e, a)), (t.tag = 1), (t = jd(null, t, e, a, n)))
              : ((t.tag = 0), (t = kr(null, t, e, a, n)));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === F) {
                ((t.tag = 11), (t = Td(null, t, e, a, n)));
                break e;
              } else if (l === Q) {
                ((t.tag = 14), (t = wd(null, t, e, a, n)));
                break e;
              }
            }
            throw ((t = ve(e) || e), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return kr(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((a = t.type), (l = Va(a, t.pendingProps)), jd(e, t, a, l, n));
      case 3:
        e: {
          if ((fe(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          a = t.pendingProps;
          var i = t.memoizedState;
          ((l = i.element), gr(e, t), ho(t, a, null, n));
          var u = t.memoizedState;
          if (
            ((a = u.cache),
            na(t, tt, a),
            a !== i.cache && ur(t, [tt], n, !0),
            mo(),
            (a = u.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: a, isDehydrated: !1, cache: u.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = Rd(e, t, a, n);
              break e;
            } else if (a !== l) {
              ((l = Jt(Error(r(424)), t)), io(l), (t = Rd(e, t, a, n)));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Xe = It(e.firstChild),
                  ht = t,
                  Re = !0,
                  ea = null,
                  Wt = !0,
                  n = Nf(t, null, a, n),
                  t.child = n;
                n;

              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            }
          else {
            if ((Da(), a === l)) {
              t = Gn(e, t, n);
              break e;
            }
            gt(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Mi(e, t),
          e === null
            ? (n = Km(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : Re ||
                ((n = t.type),
                (e = t.pendingProps),
                (a = Ki(re.current).createElement(n)),
                (a[mt] = t),
                (a[Nt] = e),
                vt(a, n, e),
                ut(a),
                (t.stateNode = a))
            : (t.memoizedState = Km(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          ot(t),
          e === null &&
            Re &&
            ((a = t.stateNode = Xm(t.type, t.pendingProps, re.current)),
            (ht = t),
            (Wt = !0),
            (l = Xe),
            pa(t.type) ? ((Oc = l), (Xe = It(a.firstChild))) : (Xe = l)),
          gt(e, t, t.pendingProps.children, n),
          Mi(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Re &&
            ((l = a = Xe) &&
              ((a = W0(a, t.type, t.pendingProps, Wt)),
              a !== null
                ? ((t.stateNode = a),
                  (ht = t),
                  (Xe = It(a.firstChild)),
                  (Wt = !1),
                  (l = !0))
                : (l = !1)),
            l || ta(t)),
          ot(t),
          (l = t.type),
          (i = t.pendingProps),
          (u = e !== null ? e.memoizedProps : null),
          (a = i.children),
          Tc(l, i) ? (a = null) : u !== null && Tc(l, u) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((l = Cr(e, t, d0, null, null, n)), (Do._currentValue = l)),
          Mi(e, t),
          gt(e, t, a, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            Re &&
            ((e = n = Xe) &&
              ((n = P0(n, t.pendingProps, Wt)),
              n !== null
                ? ((t.stateNode = n), (ht = t), (Xe = null), (e = !0))
                : (e = !1)),
            e || ta(t)),
          null
        );
      case 13:
        return _d(e, t, n);
      case 4:
        return (
          fe(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = La(t, null, a, n)) : gt(e, t, a, n),
          t.child
        );
      case 11:
        return Td(e, t, t.type, t.pendingProps, n);
      case 7:
        return (gt(e, t, t.pendingProps, n), t.child);
      case 8:
        return (gt(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (gt(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          na(t, t.type, a.value),
          gt(e, t, a.children, n),
          t.child
        );
      case 9:
        return (
          (l = t.type._context),
          (a = t.pendingProps.children),
          Ua(t),
          (l = pt(l)),
          (a = a(l)),
          (t.flags |= 1),
          gt(e, t, a, n),
          t.child
        );
      case 14:
        return wd(e, t, t.type, t.pendingProps, n);
      case 15:
        return Ad(e, t, t.type, t.pendingProps, n);
      case 19:
        return Gd(e, t, n);
      case 31:
        return x0(e, t, n);
      case 22:
        return Nd(e, t, n, t.pendingProps);
      case 24:
        return (
          Ua(t),
          (a = pt(tt)),
          e === null
            ? ((l = mr()),
              l === null &&
                ((l = Ye),
                (i = fr()),
                (l.pooledCache = i),
                i.refCount++,
                i !== null && (l.pooledCacheLanes |= n),
                (l = i)),
              (t.memoizedState = { parent: a, cache: l }),
              pr(t),
              na(t, tt, l))
            : ((e.lanes & n) !== 0 && (gr(e, t), ho(t, null, null, n), mo()),
              (l = e.memoizedState),
              (i = t.memoizedState),
              l.parent !== a
                ? ((l = { parent: a, cache: a }),
                  (t.memoizedState = l),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = l),
                  na(t, tt, a))
                : ((a = i.cache),
                  na(t, tt, a),
                  a !== l.cache && ur(t, [tt], n, !0))),
          gt(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Un(e) {
    e.flags |= 4;
  }
  function Wr(e, t, n, a, l) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (l & 335544128) === l))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (cm()) e.flags |= 8192;
        else throw ((qa = pi), hr);
    } else e.flags &= -16777217;
  }
  function Hd(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Pm(t)))
      if (cm()) e.flags |= 8192;
      else throw ((qa = pi), hr);
  }
  function Ri(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? bt() : 536870912), (e.lanes |= t), (zl |= t)));
  }
  function xo(e, t) {
    if (!Re)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            (n.alternate !== null && (a = n), (n = n.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      a = 0;
    if (t)
      for (var l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (a |= l.subtreeFlags & 65011712),
          (a |= l.flags & 65011712),
          (l.return = e),
          (l = l.sibling));
    else
      for (l = e.child; l !== null; )
        ((n |= l.lanes | l.childLanes),
          (a |= l.subtreeFlags),
          (a |= l.flags),
          (l.return = e),
          (l = l.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = n), t);
  }
  function E0(e, t, n) {
    var a = t.pendingProps;
    switch ((or(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Qe(t), null);
      case 1:
        return (Qe(t), null);
      case 3:
        return (
          (n = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Rn(tt),
          Ne(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (pl(t)
              ? Un(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), sr())),
          Qe(t),
          null
        );
      case 26:
        var l = t.type,
          i = t.memoizedState;
        return (
          e === null
            ? (Un(t),
              i !== null ? (Qe(t), Hd(t, i)) : (Qe(t), Wr(t, l, null, a, n)))
            : i
              ? i !== e.memoizedState
                ? (Un(t), Qe(t), Hd(t, i))
                : (Qe(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== a && Un(t),
                Qe(t),
                Wr(t, l, e, a, n)),
          null
        );
      case 27:
        if (
          (dt(t),
          (n = re.current),
          (l = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== a && Un(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (Qe(t), null);
          }
          ((e = X.current),
            pl(t) ? gf(t) : ((e = Xm(l, a, n)), (t.stateNode = e), Un(t)));
        }
        return (Qe(t), null);
      case 5:
        if ((dt(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Un(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (Qe(t), null);
          }
          if (((i = X.current), pl(t))) gf(t);
          else {
            var u = Ki(re.current);
            switch (i) {
              case 1:
                i = u.createElementNS("http://www.w3.org/2000/svg", l);
                break;
              case 2:
                i = u.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                break;
              default:
                switch (l) {
                  case "svg":
                    i = u.createElementNS("http://www.w3.org/2000/svg", l);
                    break;
                  case "math":
                    i = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    ((i = u.createElement("div")),
                      (i.innerHTML = "<script><\/script>"),
                      (i = i.removeChild(i.firstChild)));
                    break;
                  case "select":
                    ((i =
                      typeof a.is == "string"
                        ? u.createElement("select", { is: a.is })
                        : u.createElement("select")),
                      a.multiple
                        ? (i.multiple = !0)
                        : a.size && (i.size = a.size));
                    break;
                  default:
                    i =
                      typeof a.is == "string"
                        ? u.createElement(l, { is: a.is })
                        : u.createElement(l);
                }
            }
            ((i[mt] = t), (i[Nt] = a));
            e: for (u = t.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) i.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                ((u.child.return = u), (u = u.child));
                continue;
              }
              if (u === t) break e;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === t) break e;
                u = u.return;
              }
              ((u.sibling.return = u.return), (u = u.sibling));
            }
            t.stateNode = i;
            e: switch ((vt(i, l, a), l)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Un(t);
          }
        }
        return (
          Qe(t),
          Wr(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Un(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
          if (((e = re.current), pl(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (a = null),
              (l = ht),
              l !== null)
            )
              switch (l.tag) {
                case 27:
                case 5:
                  a = l.memoizedProps;
              }
            ((e[mt] = t),
              (e = !!(
                e.nodeValue === n ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                _m(e.nodeValue, n)
              )),
              e || ta(t, !0));
          } else
            ((e = Ki(e).createTextNode(a)), (e[mt] = t), (t.stateNode = e));
        }
        return (Qe(t), null);
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((a = pl(t)), n !== null)) {
            if (e === null) {
              if (!a) throw Error(r(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(r(557));
              e[mt] = t;
            } else
              (Da(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Qe(t), (e = !1));
          } else
            ((n = sr()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (e = !0));
          if (!e) return t.flags & 256 ? (qt(t), t) : (qt(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (Qe(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((l = pl(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!l) throw Error(r(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(r(317));
              l[mt] = t;
            } else
              (Da(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Qe(t), (l = !1));
          } else
            ((l = sr()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = l),
              (l = !0));
          if (!l) return t.flags & 256 ? (qt(t), t) : (qt(t), null);
        }
        return (
          qt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((n = a !== null),
              (e = e !== null && e.memoizedState !== null),
              n &&
                ((a = t.child),
                (l = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (l = a.alternate.memoizedState.cachePool.pool),
                (i = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (i = a.memoizedState.cachePool.pool),
                i !== l && (a.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              Ri(t, t.updateQueue),
              Qe(t),
              null)
        );
      case 4:
        return (Ne(), e === null && bc(t.stateNode.containerInfo), Qe(t), null);
      case 10:
        return (Rn(t.type), Qe(t), null);
      case 19:
        if ((q(Ie), (a = t.memoizedState), a === null)) return (Qe(t), null);
        if (((l = (t.flags & 128) !== 0), (i = a.rendering), i === null))
          if (l) xo(a, !1);
          else {
            if (Pe !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = bi(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      xo(a, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      Ri(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;

                  )
                    (ff(n, e), (n = n.sibling));
                  return (
                    G(Ie, (Ie.current & 1) | 2),
                    Re && Mn(t, a.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            a.tail !== null &&
              Ve() > Hi &&
              ((t.flags |= 128), (l = !0), xo(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!l)
            if (((e = bi(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (l = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Ri(t, e),
                xo(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !i.alternate &&
                  !Re)
              )
                return (Qe(t), null);
            } else
              2 * Ve() - a.renderingStartTime > Hi &&
                n !== 536870912 &&
                ((t.flags |= 128), (l = !0), xo(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((e = a.last),
              e !== null ? (e.sibling = i) : (t.child = i),
              (a.last = i));
        }
        return a.tail !== null
          ? ((e = a.tail),
            (a.rendering = e),
            (a.tail = e.sibling),
            (a.renderingStartTime = Ve()),
            (e.sibling = null),
            (n = Ie.current),
            G(Ie, l ? (n & 1) | 2 : n & 1),
            Re && Mn(t, a.treeForkCount),
            e)
          : (Qe(t), null);
      case 22:
      case 23:
        return (
          qt(t),
          xr(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Qe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Qe(t),
          (n = t.updateQueue),
          n !== null && Ri(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== n && (t.flags |= 2048),
          e !== null && q(Ha),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Rn(tt),
          Qe(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function C0(e, t) {
    switch ((or(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Rn(tt),
          Ne(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (dt(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((qt(t), t.alternate === null)) throw Error(r(340));
          Da();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (qt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          Da();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (q(Ie), null);
      case 4:
        return (Ne(), null);
      case 10:
        return (Rn(t.type), null);
      case 22:
      case 23:
        return (
          qt(t),
          xr(),
          e !== null && q(Ha),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Rn(tt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Bd(e, t) {
    switch ((or(t), t.tag)) {
      case 3:
        (Rn(tt), Ne());
        break;
      case 26:
      case 27:
      case 5:
        dt(t);
        break;
      case 4:
        Ne();
        break;
      case 31:
        t.memoizedState !== null && qt(t);
        break;
      case 13:
        qt(t);
        break;
      case 19:
        q(Ie);
        break;
      case 10:
        Rn(t.type);
        break;
      case 22:
      case 23:
        (qt(t), xr(), e !== null && q(Ha));
        break;
      case 24:
        Rn(tt);
    }
  }
  function So(e, t) {
    try {
      var n = t.updateQueue,
        a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var l = a.next;
        n = l;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var i = n.create,
              u = n.inst;
            ((a = i()), (u.destroy = a));
          }
          n = n.next;
        } while (n !== l);
      }
    } catch (p) {
      He(t, t.return, p);
    }
  }
  function ra(e, t, n) {
    try {
      var a = t.updateQueue,
        l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var i = l.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            var u = a.inst,
              p = u.destroy;
            if (p !== void 0) {
              ((u.destroy = void 0), (l = t));
              var S = n,
                M = p;
              try {
                M();
              } catch (H) {
                He(l, S, H);
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (H) {
      He(t, t.return, H);
    }
  }
  function qd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Of(t, n);
      } catch (a) {
        He(e, e.return, a);
      }
    }
  }
  function Ld(e, t, n) {
    ((n.props = Va(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (a) {
      He(e, t, a);
    }
  }
  function Eo(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(a)) : (n.current = a);
      }
    } catch (l) {
      He(e, t, l);
    }
  }
  function gn(e, t) {
    var n = e.ref,
      a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (l) {
          He(e, t, l);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (l) {
          He(e, t, l);
        }
      else n.current = null;
  }
  function Yd(e) {
    var t = e.type,
      n = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? (a.src = n.src) : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (l) {
      He(e, e.return, l);
    }
  }
  function Pr(e, t, n) {
    try {
      var a = e.stateNode;
      (Q0(a, e.type, n, t), (a[Nt] = t));
    } catch (l) {
      He(e, e.return, l);
    }
  }
  function Vd(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && pa(e.type)) ||
      e.tag === 4
    );
  }
  function Ir(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Vd(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && pa(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ec(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Nn)));
    else if (
      a !== 4 &&
      (a === 27 && pa(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (ec(e, t, n), e = e.sibling; e !== null; )
        (ec(e, t, n), (e = e.sibling));
  }
  function _i(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (
      a !== 4 &&
      (a === 27 && pa(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (_i(e, t, n), e = e.sibling; e !== null; )
        (_i(e, t, n), (e = e.sibling));
  }
  function kd(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var a = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      (vt(t, a, n), (t[mt] = e), (t[Nt] = n));
    } catch (i) {
      He(e, e.return, i);
    }
  }
  var Hn = !1,
    lt = !1,
    tc = !1,
    Xd = typeof WeakSet == "function" ? WeakSet : Set,
    ft = null;
  function T0(e, t) {
    if (((e = e.containerInfo), (Ec = es), (e = tf(e)), Js(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var l = a.anchorOffset,
              i = a.focusNode;
            a = a.focusOffset;
            try {
              (n.nodeType, i.nodeType);
            } catch {
              n = null;
              break e;
            }
            var u = 0,
              p = -1,
              S = -1,
              M = 0,
              H = 0,
              V = e,
              j = null;
            t: for (;;) {
              for (
                var D;
                V !== n || (l !== 0 && V.nodeType !== 3) || (p = u + l),
                  V !== i || (a !== 0 && V.nodeType !== 3) || (S = u + a),
                  V.nodeType === 3 && (u += V.nodeValue.length),
                  (D = V.firstChild) !== null;

              )
                ((j = V), (V = D));
              for (;;) {
                if (V === e) break t;
                if (
                  (j === n && ++M === l && (p = u),
                  j === i && ++H === a && (S = u),
                  (D = V.nextSibling) !== null)
                )
                  break;
                ((V = j), (j = V.parentNode));
              }
              V = D;
            }
            n = p === -1 || S === -1 ? null : { start: p, end: S };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Cc = { focusedElem: e, selectionRange: n }, es = !1, ft = t;
      ft !== null;

    )
      if (
        ((t = ft), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (ft = e));
      else
        for (; ft !== null; ) {
          switch (((t = ft), (i = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (n = 0; n < e.length; n++)
                  ((l = e[n]), (l.ref.impl = l.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                ((e = void 0),
                  (n = t),
                  (l = i.memoizedProps),
                  (i = i.memoizedState),
                  (a = n.stateNode));
                try {
                  var te = Va(n.type, l);
                  ((e = a.getSnapshotBeforeUpdate(te, i)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ue) {
                  He(n, n.return, ue);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  Ac(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ac(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (ft = e));
            break;
          }
          ft = t.return;
        }
  }
  function Qd(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (qn(e, n), a & 4 && So(5, n));
        break;
      case 1:
        if ((qn(e, n), a & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (u) {
              He(n, n.return, u);
            }
          else {
            var l = Va(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(l, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (u) {
              He(n, n.return, u);
            }
          }
        (a & 64 && qd(n), a & 512 && Eo(n, n.return));
        break;
      case 3:
        if ((qn(e, n), a & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Of(e, t);
          } catch (u) {
            He(n, n.return, u);
          }
        }
        break;
      case 27:
        t === null && a & 4 && kd(n);
      case 26:
      case 5:
        (qn(e, n), t === null && a & 4 && Yd(n), a & 512 && Eo(n, n.return));
        break;
      case 12:
        qn(e, n);
        break;
      case 31:
        (qn(e, n), a & 4 && Jd(e, n));
        break;
      case 13:
        (qn(e, n),
          a & 4 && $d(e, n),
          a & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = _0.bind(null, n)), I0(e, n)))));
        break;
      case 22:
        if (((a = n.memoizedState !== null || Hn), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || lt), (l = Hn));
          var i = lt;
          ((Hn = a),
            (lt = t) && !i ? Ln(e, n, (n.subtreeFlags & 8772) !== 0) : qn(e, n),
            (Hn = l),
            (lt = i));
        }
        break;
      case 30:
        break;
      default:
        qn(e, n);
    }
  }
  function Zd(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Zd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && js(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Je = null,
    Ot = !1;
  function Bn(e, t, n) {
    for (n = n.child; n !== null; ) (Kd(e, t, n), (n = n.sibling));
  }
  function Kd(e, t, n) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(wa, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (lt || gn(n, t),
          Bn(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        lt || gn(n, t);
        var a = Je,
          l = Ot;
        (pa(n.type) && ((Je = n.stateNode), (Ot = !1)),
          Bn(e, t, n),
          jo(n.stateNode),
          (Je = a),
          (Ot = l));
        break;
      case 5:
        lt || gn(n, t);
      case 6:
        if (
          ((a = Je),
          (l = Ot),
          (Je = null),
          Bn(e, t, n),
          (Je = a),
          (Ot = l),
          Je !== null)
        )
          if (Ot)
            try {
              (Je.nodeType === 9
                ? Je.body
                : Je.nodeName === "HTML"
                  ? Je.ownerDocument.body
                  : Je
              ).removeChild(n.stateNode);
            } catch (i) {
              He(n, t, i);
            }
          else
            try {
              Je.removeChild(n.stateNode);
            } catch (i) {
              He(n, t, i);
            }
        break;
      case 18:
        Je !== null &&
          (Ot
            ? ((e = Je),
              qm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                n.stateNode
              ),
              Ul(e))
            : qm(Je, n.stateNode));
        break;
      case 4:
        ((a = Je),
          (l = Ot),
          (Je = n.stateNode.containerInfo),
          (Ot = !0),
          Bn(e, t, n),
          (Je = a),
          (Ot = l));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ra(2, n, t), lt || ra(4, n, t), Bn(e, t, n));
        break;
      case 1:
        (lt ||
          (gn(n, t),
          (a = n.stateNode),
          typeof a.componentWillUnmount == "function" && Ld(n, t, a)),
          Bn(e, t, n));
        break;
      case 21:
        Bn(e, t, n);
        break;
      case 22:
        ((lt = (a = lt) || n.memoizedState !== null), Bn(e, t, n), (lt = a));
        break;
      default:
        Bn(e, t, n);
    }
  }
  function Jd(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        Ul(e);
      } catch (n) {
        He(t, t.return, n);
      }
    }
  }
  function $d(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Ul(e);
      } catch (n) {
        He(t, t.return, n);
      }
  }
  function w0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Xd()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Xd()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Di(e, t) {
    var n = w0(e);
    t.forEach(function (a) {
      if (!n.has(a)) {
        n.add(a);
        var l = D0.bind(null, e, a);
        a.then(l, l);
      }
    });
  }
  function Mt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var l = n[a],
          i = e,
          u = t,
          p = u;
        e: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (pa(p.type)) {
                ((Je = p.stateNode), (Ot = !1));
                break e;
              }
              break;
            case 5:
              ((Je = p.stateNode), (Ot = !1));
              break e;
            case 3:
            case 4:
              ((Je = p.stateNode.containerInfo), (Ot = !0));
              break e;
          }
          p = p.return;
        }
        if (Je === null) throw Error(r(160));
        (Kd(i, u, l),
          (Je = null),
          (Ot = !1),
          (i = l.alternate),
          i !== null && (i.return = null),
          (l.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (Fd(t, e), (t = t.sibling));
  }
  var on = null;
  function Fd(e, t) {
    var n = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Mt(t, e),
          jt(e),
          a & 4 && (ra(3, e, e.return), So(3, e), ra(5, e, e.return)));
        break;
      case 1:
        (Mt(t, e),
          jt(e),
          a & 512 && (lt || n === null || gn(n, n.return)),
          a & 64 &&
            Hn &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? a : n.concat(a))))));
        break;
      case 26:
        var l = on;
        if (
          (Mt(t, e),
          jt(e),
          a & 512 && (lt || n === null || gn(n, n.return)),
          a & 4)
        ) {
          var i = n !== null ? n.memoizedState : null;
          if (((a = e.memoizedState), n === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type),
                    (n = e.memoizedProps),
                    (l = l.ownerDocument || l));
                  t: switch (a) {
                    case "title":
                      ((i = l.getElementsByTagName("title")[0]),
                        (!i ||
                          i[Jl] ||
                          i[mt] ||
                          i.namespaceURI === "http://www.w3.org/2000/svg" ||
                          i.hasAttribute("itemprop")) &&
                          ((i = l.createElement(a)),
                          l.head.insertBefore(
                            i,
                            l.querySelector("head > title")
                          )),
                        vt(i, a, n),
                        (i[mt] = e),
                        ut(i),
                        (a = i));
                      break e;
                    case "link":
                      var u = Fm("link", "href", l).get(a + (n.href || ""));
                      if (u) {
                        for (var p = 0; p < u.length; p++)
                          if (
                            ((i = u[p]),
                            i.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              i.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              i.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              i.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            u.splice(p, 1);
                            break t;
                          }
                      }
                      ((i = l.createElement(a)),
                        vt(i, a, n),
                        l.head.appendChild(i));
                      break;
                    case "meta":
                      if (
                        (u = Fm("meta", "content", l).get(
                          a + (n.content || "")
                        ))
                      ) {
                        for (p = 0; p < u.length; p++)
                          if (
                            ((i = u[p]),
                            i.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              i.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              i.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              i.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              i.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            u.splice(p, 1);
                            break t;
                          }
                      }
                      ((i = l.createElement(a)),
                        vt(i, a, n),
                        l.head.appendChild(i));
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  ((i[mt] = e), ut(i), (a = i));
                }
                e.stateNode = a;
              } else Wm(l, e.type, e.stateNode);
            else e.stateNode = $m(l, a, e.memoizedProps);
          else
            i !== a
              ? (i === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : i.count--,
                a === null
                  ? Wm(l, e.type, e.stateNode)
                  : $m(l, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                Pr(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (Mt(t, e),
          jt(e),
          a & 512 && (lt || n === null || gn(n, n.return)),
          n !== null && a & 4 && Pr(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (Mt(t, e),
          jt(e),
          a & 512 && (lt || n === null || gn(n, n.return)),
          e.flags & 32)
        ) {
          l = e.stateNode;
          try {
            ol(l, "");
          } catch (te) {
            He(e, e.return, te);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((l = e.memoizedProps), Pr(e, l, n !== null ? n.memoizedProps : l)),
          a & 1024 && (tc = !0));
        break;
      case 6:
        if ((Mt(t, e), jt(e), a & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          ((a = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = a;
          } catch (te) {
            He(e, e.return, te);
          }
        }
        break;
      case 3:
        if (
          ((Fi = null),
          (l = on),
          (on = Ji(t.containerInfo)),
          Mt(t, e),
          (on = l),
          jt(e),
          a & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            Ul(t.containerInfo);
          } catch (te) {
            He(e, e.return, te);
          }
        tc && ((tc = !1), Wd(e));
        break;
      case 4:
        ((a = on),
          (on = Ji(e.stateNode.containerInfo)),
          Mt(t, e),
          jt(e),
          (on = a));
        break;
      case 12:
        (Mt(t, e), jt(e));
        break;
      case 31:
        (Mt(t, e),
          jt(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Di(e, a))));
        break;
      case 13:
        (Mt(t, e),
          jt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Ui = Ve()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Di(e, a))));
        break;
      case 22:
        l = e.memoizedState !== null;
        var S = n !== null && n.memoizedState !== null,
          M = Hn,
          H = lt;
        if (
          ((Hn = M || l),
          (lt = H || S),
          Mt(t, e),
          (lt = H),
          (Hn = M),
          jt(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = l ? t._visibility & -2 : t._visibility | 1,
              l && (n === null || S || Hn || lt || ka(e)),
              n = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                S = n = t;
                try {
                  if (((i = S.stateNode), l))
                    ((u = i.style),
                      typeof u.setProperty == "function"
                        ? u.setProperty("display", "none", "important")
                        : (u.display = "none"));
                  else {
                    p = S.stateNode;
                    var V = S.memoizedProps.style,
                      j =
                        V != null && V.hasOwnProperty("display")
                          ? V.display
                          : null;
                    p.style.display =
                      j == null || typeof j == "boolean" ? "" : ("" + j).trim();
                  }
                } catch (te) {
                  He(S, S.return, te);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                S = t;
                try {
                  S.stateNode.nodeValue = l ? "" : S.memoizedProps;
                } catch (te) {
                  He(S, S.return, te);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                S = t;
                try {
                  var D = S.stateNode;
                  l ? Lm(D, !0) : Lm(S.stateNode, !1);
                } catch (te) {
                  He(S, S.return, te);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (n === t && (n = null), (t = t.return));
            }
            (n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((n = a.retryQueue),
            n !== null && ((a.retryQueue = null), Di(e, n))));
        break;
      case 19:
        (Mt(t, e),
          jt(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Di(e, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Mt(t, e), jt(e));
    }
  }
  function jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (Vd(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var l = n.stateNode,
              i = Ir(e);
            _i(e, i, l);
            break;
          case 5:
            var u = n.stateNode;
            n.flags & 32 && (ol(u, ""), (n.flags &= -33));
            var p = Ir(e);
            _i(e, p, u);
            break;
          case 3:
          case 4:
            var S = n.stateNode.containerInfo,
              M = Ir(e);
            ec(e, M, S);
            break;
          default:
            throw Error(r(161));
        }
      } catch (H) {
        He(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Wd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Wd(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function qn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Qd(e, t.alternate, t), (t = t.sibling));
  }
  function ka(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ra(4, t, t.return), ka(t));
          break;
        case 1:
          gn(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == "function" && Ld(t, t.return, n),
            ka(t));
          break;
        case 27:
          jo(t.stateNode);
        case 26:
        case 5:
          (gn(t, t.return), ka(t));
          break;
        case 22:
          t.memoizedState === null && ka(t);
          break;
        case 30:
          ka(t);
          break;
        default:
          ka(t);
      }
      e = e.sibling;
    }
  }
  function Ln(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        l = e,
        i = t,
        u = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (Ln(l, i, n), So(4, i));
          break;
        case 1:
          if (
            (Ln(l, i, n),
            (a = i),
            (l = a.stateNode),
            typeof l.componentDidMount == "function")
          )
            try {
              l.componentDidMount();
            } catch (M) {
              He(a, a.return, M);
            }
          if (((a = i), (l = a.updateQueue), l !== null)) {
            var p = a.stateNode;
            try {
              var S = l.shared.hiddenCallbacks;
              if (S !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < S.length; l++)
                  zf(S[l], p);
            } catch (M) {
              He(a, a.return, M);
            }
          }
          (n && u & 64 && qd(i), Eo(i, i.return));
          break;
        case 27:
          kd(i);
        case 26:
        case 5:
          (Ln(l, i, n), n && a === null && u & 4 && Yd(i), Eo(i, i.return));
          break;
        case 12:
          Ln(l, i, n);
          break;
        case 31:
          (Ln(l, i, n), n && u & 4 && Jd(l, i));
          break;
        case 13:
          (Ln(l, i, n), n && u & 4 && $d(l, i));
          break;
        case 22:
          (i.memoizedState === null && Ln(l, i, n), Eo(i, i.return));
          break;
        case 30:
          break;
        default:
          Ln(l, i, n);
      }
      t = t.sibling;
    }
  }
  function nc(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && so(n)));
  }
  function ac(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && so(e)));
  }
  function sn(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Pd(e, t, n, a), (t = t.sibling));
  }
  function Pd(e, t, n, a) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (sn(e, t, n, a), l & 2048 && So(9, t));
        break;
      case 1:
        sn(e, t, n, a);
        break;
      case 3:
        (sn(e, t, n, a),
          l & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && so(e))));
        break;
      case 12:
        if (l & 2048) {
          (sn(e, t, n, a), (e = t.stateNode));
          try {
            var i = t.memoizedProps,
              u = i.id,
              p = i.onPostCommit;
            typeof p == "function" &&
              p(
                u,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (S) {
            He(t, t.return, S);
          }
        } else sn(e, t, n, a);
        break;
      case 31:
        sn(e, t, n, a);
        break;
      case 13:
        sn(e, t, n, a);
        break;
      case 23:
        break;
      case 22:
        ((i = t.stateNode),
          (u = t.alternate),
          t.memoizedState !== null
            ? i._visibility & 2
              ? sn(e, t, n, a)
              : Co(e, t)
            : i._visibility & 2
              ? sn(e, t, n, a)
              : ((i._visibility |= 2),
                wl(e, t, n, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          l & 2048 && nc(u, t));
        break;
      case 24:
        (sn(e, t, n, a), l & 2048 && ac(t.alternate, t));
        break;
      default:
        sn(e, t, n, a);
    }
  }
  function wl(e, t, n, a, l) {
    for (
      l = l && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;

    ) {
      var i = e,
        u = t,
        p = n,
        S = a,
        M = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (wl(i, u, p, S, l), So(8, u));
          break;
        case 23:
          break;
        case 22:
          var H = u.stateNode;
          (u.memoizedState !== null
            ? H._visibility & 2
              ? wl(i, u, p, S, l)
              : Co(i, u)
            : ((H._visibility |= 2), wl(i, u, p, S, l)),
            l && M & 2048 && nc(u.alternate, u));
          break;
        case 24:
          (wl(i, u, p, S, l), l && M & 2048 && ac(u.alternate, u));
          break;
        default:
          wl(i, u, p, S, l);
      }
      t = t.sibling;
    }
  }
  function Co(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e,
          a = t,
          l = a.flags;
        switch (a.tag) {
          case 22:
            (Co(n, a), l & 2048 && nc(a.alternate, a));
            break;
          case 24:
            (Co(n, a), l & 2048 && ac(a.alternate, a));
            break;
          default:
            Co(n, a);
        }
        t = t.sibling;
      }
  }
  var To = 8192;
  function Al(e, t, n) {
    if (e.subtreeFlags & To)
      for (e = e.child; e !== null; ) (Id(e, t, n), (e = e.sibling));
  }
  function Id(e, t, n) {
    switch (e.tag) {
      case 26:
        (Al(e, t, n),
          e.flags & To &&
            e.memoizedState !== null &&
            fv(n, on, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Al(e, t, n);
        break;
      case 3:
      case 4:
        var a = on;
        ((on = Ji(e.stateNode.containerInfo)), Al(e, t, n), (on = a));
        break;
      case 22:
        e.memoizedState === null &&
          ((a = e.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = To), (To = 16777216), Al(e, t, n), (To = a))
            : Al(e, t, n));
        break;
      default:
        Al(e, t, n);
    }
  }
  function em(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function wo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          ((ft = a), nm(a, e));
        }
      em(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (tm(e), (e = e.sibling));
  }
  function tm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (wo(e), e.flags & 2048 && ra(9, e, e.return));
        break;
      case 3:
        wo(e);
        break;
      case 12:
        wo(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Gi(e))
          : wo(e);
        break;
      default:
        wo(e);
    }
  }
  function Gi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          ((ft = a), nm(a, e));
        }
      em(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (ra(8, t, t.return), Gi(t));
          break;
        case 22:
          ((n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Gi(t)));
          break;
        default:
          Gi(t);
      }
      e = e.sibling;
    }
  }
  function nm(e, t) {
    for (; ft !== null; ) {
      var n = ft;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          so(n.memoizedState.cache);
      }
      if (((a = n.child), a !== null)) ((a.return = n), (ft = a));
      else
        e: for (n = e; ft !== null; ) {
          a = ft;
          var l = a.sibling,
            i = a.return;
          if ((Zd(a), a === n)) {
            ft = null;
            break e;
          }
          if (l !== null) {
            ((l.return = i), (ft = l));
            break e;
          }
          ft = i;
        }
    }
  }
  var A0 = {
      getCacheForType: function (e) {
        var t = pt(tt),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return pt(tt).controller.signal;
      },
    },
    N0 = typeof WeakMap == "function" ? WeakMap : Map,
    Ge = 0,
    Ye = null,
    ze = null,
    Me = 0,
    Ue = 0,
    Lt = null,
    ca = !1,
    Nl = !1,
    lc = !1,
    Yn = 0,
    Pe = 0,
    ua = 0,
    Xa = 0,
    oc = 0,
    Yt = 0,
    zl = 0,
    Ao = null,
    Rt = null,
    ic = !1,
    Ui = 0,
    am = 0,
    Hi = 1 / 0,
    Bi = null,
    fa = null,
    st = 0,
    da = null,
    Ol = null,
    Vn = 0,
    sc = 0,
    rc = null,
    lm = null,
    No = 0,
    cc = null;
  function Vt() {
    return (Ge & 2) !== 0 && Me !== 0 ? Me & -Me : T.T !== null ? pc() : Os();
  }
  function om() {
    if (Yt === 0)
      if ((Me & 536870912) === 0 || Re) {
        var e = Wa;
        ((Wa <<= 1), (Wa & 3932160) === 0 && (Wa = 262144), (Yt = e));
      } else Yt = 536870912;
    return ((e = Bt.current), e !== null && (e.flags |= 32), Yt);
  }
  function _t(e, t, n) {
    (((e === Ye && (Ue === 2 || Ue === 9)) || e.cancelPendingCommit !== null) &&
      (Ml(e, 0), ma(e, Me, Yt, !1)),
      $e(e, n),
      ((Ge & 2) === 0 || e !== Ye) &&
        (e === Ye &&
          ((Ge & 2) === 0 && (Xa |= n), Pe === 4 && ma(e, Me, Yt, !1)),
        vn(e)));
  }
  function im(e, t, n) {
    if ((Ge & 6) !== 0) throw Error(r(327));
    var a = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || Ke(e, t),
      l = a ? M0(e, t) : fc(e, t, !0),
      i = a;
    do {
      if (l === 0) {
        Nl && !a && ma(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), i && !z0(n))) {
          ((l = fc(e, t, !1)), (i = !1));
          continue;
        }
        if (l === 2) {
          if (((i = t), e.errorRecoveryDisabledLanes & i)) var u = 0;
          else
            ((u = e.pendingLanes & -536870913),
              (u = u !== 0 ? u : u & 536870912 ? 536870912 : 0));
          if (u !== 0) {
            t = u;
            e: {
              var p = e;
              l = Ao;
              var S = p.current.memoizedState.isDehydrated;
              if ((S && (Ml(p, u).flags |= 256), (u = fc(p, u, !1)), u !== 2)) {
                if (lc && !S) {
                  ((p.errorRecoveryDisabledLanes |= i), (Xa |= i), (l = 4));
                  break e;
                }
                ((i = Rt),
                  (Rt = l),
                  i !== null &&
                    (Rt === null ? (Rt = i) : Rt.push.apply(Rt, i)));
              }
              l = u;
            }
            if (((i = !1), l !== 2)) continue;
          }
        }
        if (l === 1) {
          (Ml(e, 0), ma(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (i = l), i)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ma(a, t, Yt, !ca);
              break e;
            case 2:
              Rt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((l = Ui + 300 - Ve()), 10 < l)) {
            if ((ma(a, t, Yt, !ca), he(a, 0, !0) !== 0)) break e;
            ((Vn = t),
              (a.timeoutHandle = Hm(
                sm.bind(
                  null,
                  a,
                  n,
                  Rt,
                  Bi,
                  ic,
                  t,
                  Yt,
                  Xa,
                  zl,
                  ca,
                  i,
                  "Throttled",
                  -0,
                  0
                ),
                l
              )));
            break e;
          }
          sm(a, n, Rt, Bi, ic, t, Yt, Xa, zl, ca, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    vn(e);
  }
  function sm(e, t, n, a, l, i, u, p, S, M, H, V, j, D) {
    if (
      ((e.timeoutHandle = -1),
      (V = t.subtreeFlags),
      V & 8192 || (V & 16785408) === 16785408)
    ) {
      ((V = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Nn,
      }),
        Id(t, i, V));
      var te =
        (i & 62914560) === i ? Ui - Ve() : (i & 4194048) === i ? am - Ve() : 0;
      if (((te = dv(V, te)), te !== null)) {
        ((Vn = i),
          (e.cancelPendingCommit = te(
            pm.bind(null, e, t, i, n, a, l, u, p, S, H, V, null, j, D)
          )),
          ma(e, i, u, !M));
        return;
      }
    }
    pm(e, t, i, n, a, l, u, p, S);
  }
  function z0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var a = 0; a < n.length; a++) {
          var l = n[a],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Ut(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function ma(e, t, n, a) {
    ((t &= ~oc),
      (t &= ~Xa),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var l = t; 0 < l; ) {
      var i = 31 - yt(l),
        u = 1 << i;
      ((a[i] = -1), (l &= ~u));
    }
    n !== 0 && Na(e, n, t);
  }
  function qi() {
    return (Ge & 6) === 0 ? (zo(0), !1) : !0;
  }
  function uc() {
    if (ze !== null) {
      if (Ue === 0) var e = ze.return;
      else ((e = ze), (jn = Ga = null), Ar(e), (xl = null), (co = 0), (e = ze));
      for (; e !== null; ) (Bd(e.alternate, e), (e = e.return));
      ze = null;
    }
  }
  function Ml(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), J0(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (Vn = 0),
      uc(),
      (Ye = e),
      (ze = n = On(e.current, null)),
      (Me = t),
      (Ue = 0),
      (Lt = null),
      (ca = !1),
      (Nl = Ke(e, t)),
      (lc = !1),
      (zl = Yt = oc = Xa = ua = Pe = 0),
      (Rt = Ao = null),
      (ic = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - yt(a),
          i = 1 << l;
        ((t |= e[l]), (a &= ~i));
      }
    return ((Yn = t), ii(), n);
  }
  function rm(e, t) {
    ((Ee = null),
      (T.H = yo),
      t === bl || t === hi
        ? ((t = Tf()), (Ue = 3))
        : t === hr
          ? ((t = Tf()), (Ue = 4))
          : (Ue =
              t === Vr
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Lt = t),
      ze === null && ((Pe = 1), zi(e, Jt(t, e.current))));
  }
  function cm() {
    var e = Bt.current;
    return e === null
      ? !0
      : (Me & 4194048) === Me
        ? Pt === null
        : (Me & 62914560) === Me || (Me & 536870912) !== 0
          ? e === Pt
          : !1;
  }
  function um() {
    var e = T.H;
    return ((T.H = yo), e === null ? yo : e);
  }
  function fm() {
    var e = T.A;
    return ((T.A = A0), e);
  }
  function Li() {
    ((Pe = 4),
      ca || ((Me & 4194048) !== Me && Bt.current !== null) || (Nl = !0),
      ((ua & 134217727) === 0 && (Xa & 134217727) === 0) ||
        Ye === null ||
        ma(Ye, Me, Yt, !1));
  }
  function fc(e, t, n) {
    var a = Ge;
    Ge |= 2;
    var l = um(),
      i = fm();
    ((Ye !== e || Me !== t) && ((Bi = null), Ml(e, t)), (t = !1));
    var u = Pe;
    e: do
      try {
        if (Ue !== 0 && ze !== null) {
          var p = ze,
            S = Lt;
          switch (Ue) {
            case 8:
              (uc(), (u = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bt.current === null && (t = !0);
              var M = Ue;
              if (((Ue = 0), (Lt = null), jl(e, p, S, M), n && Nl)) {
                u = 0;
                break e;
              }
              break;
            default:
              ((M = Ue), (Ue = 0), (Lt = null), jl(e, p, S, M));
          }
        }
        (O0(), (u = Pe));
        break;
      } catch (H) {
        rm(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (jn = Ga = null),
      (Ge = a),
      (T.H = l),
      (T.A = i),
      ze === null && ((Ye = null), (Me = 0), ii()),
      u
    );
  }
  function O0() {
    for (; ze !== null; ) dm(ze);
  }
  function M0(e, t) {
    var n = Ge;
    Ge |= 2;
    var a = um(),
      l = fm();
    Ye !== e || Me !== t
      ? ((Bi = null), (Hi = Ve() + 500), Ml(e, t))
      : (Nl = Ke(e, t));
    e: do
      try {
        if (Ue !== 0 && ze !== null) {
          t = ze;
          var i = Lt;
          t: switch (Ue) {
            case 1:
              ((Ue = 0), (Lt = null), jl(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (Ef(i)) {
                ((Ue = 0), (Lt = null), mm(t));
                break;
              }
              ((t = function () {
                ((Ue !== 2 && Ue !== 9) || Ye !== e || (Ue = 7), vn(e));
              }),
                i.then(t, t));
              break e;
            case 3:
              Ue = 7;
              break e;
            case 4:
              Ue = 5;
              break e;
            case 7:
              Ef(i)
                ? ((Ue = 0), (Lt = null), mm(t))
                : ((Ue = 0), (Lt = null), jl(e, t, i, 7));
              break;
            case 5:
              var u = null;
              switch (ze.tag) {
                case 26:
                  u = ze.memoizedState;
                case 5:
                case 27:
                  var p = ze;
                  if (u ? Pm(u) : p.stateNode.complete) {
                    ((Ue = 0), (Lt = null));
                    var S = p.sibling;
                    if (S !== null) ze = S;
                    else {
                      var M = p.return;
                      M !== null ? ((ze = M), Yi(M)) : (ze = null);
                    }
                    break t;
                  }
              }
              ((Ue = 0), (Lt = null), jl(e, t, i, 5));
              break;
            case 6:
              ((Ue = 0), (Lt = null), jl(e, t, i, 6));
              break;
            case 8:
              (uc(), (Pe = 6));
              break e;
            default:
              throw Error(r(462));
          }
        }
        j0();
        break;
      } catch (H) {
        rm(e, H);
      }
    while (!0);
    return (
      (jn = Ga = null),
      (T.H = a),
      (T.A = l),
      (Ge = n),
      ze !== null ? 0 : ((Ye = null), (Me = 0), ii(), Pe)
    );
  }
  function j0() {
    for (; ze !== null && !me(); ) dm(ze);
  }
  function dm(e) {
    var t = Ud(e.alternate, e, Yn);
    ((e.memoizedProps = e.pendingProps), t === null ? Yi(e) : (ze = t));
  }
  function mm(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Md(n, t, t.pendingProps, t.type, void 0, Me);
        break;
      case 11:
        t = Md(n, t, t.pendingProps, t.type.render, t.ref, Me);
        break;
      case 5:
        Ar(t);
      default:
        (Bd(n, t), (t = ze = ff(t, Yn)), (t = Ud(n, t, Yn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Yi(e) : (ze = t));
  }
  function jl(e, t, n, a) {
    ((jn = Ga = null), Ar(t), (xl = null), (co = 0));
    var l = t.return;
    try {
      if (b0(e, l, t, n, Me)) {
        ((Pe = 1), zi(e, Jt(n, e.current)), (ze = null));
        return;
      }
    } catch (i) {
      if (l !== null) throw ((ze = l), i);
      ((Pe = 1), zi(e, Jt(n, e.current)), (ze = null));
      return;
    }
    t.flags & 32768
      ? (Re || a === 1
          ? (e = !0)
          : Nl || (Me & 536870912) !== 0
            ? (e = !1)
            : ((ca = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = Bt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        hm(t, e))
      : Yi(t);
  }
  function Yi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        hm(t, ca);
        return;
      }
      e = t.return;
      var n = E0(t.alternate, t, Yn);
      if (n !== null) {
        ze = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ze = t;
        return;
      }
      ze = t = e;
    } while (t !== null);
    Pe === 0 && (Pe = 5);
  }
  function hm(e, t) {
    do {
      var n = C0(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (ze = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ze = e;
        return;
      }
      ze = e = n;
    } while (e !== null);
    ((Pe = 6), (ze = null));
  }
  function pm(e, t, n, a, l, i, u, p, S) {
    e.cancelPendingCommit = null;
    do Vi();
    while (st !== 0);
    if ((Ge & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= Is),
        Tt(e, n, i, u, p, S),
        e === Ye && ((ze = Ye = null), (Me = 0)),
        (Ol = t),
        (da = e),
        (Vn = n),
        (sc = i),
        (rc = l),
        (lm = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            G0(Ta, function () {
              return (xm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = T.T), (T.T = null), (l = U.p), (U.p = 2), (u = Ge), (Ge |= 4));
        try {
          T0(e, t, n);
        } finally {
          ((Ge = u), (U.p = l), (T.T = a));
        }
      }
      ((st = 1), gm(), vm(), ym());
    }
  }
  function gm() {
    if (st === 1) {
      st = 0;
      var e = da,
        t = Ol,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = T.T), (T.T = null));
        var a = U.p;
        U.p = 2;
        var l = Ge;
        Ge |= 4;
        try {
          Fd(t, e);
          var i = Cc,
            u = tf(e.containerInfo),
            p = i.focusedElem,
            S = i.selectionRange;
          if (
            u !== p &&
            p &&
            p.ownerDocument &&
            ef(p.ownerDocument.documentElement, p)
          ) {
            if (S !== null && Js(p)) {
              var M = S.start,
                H = S.end;
              if ((H === void 0 && (H = M), "selectionStart" in p))
                ((p.selectionStart = M),
                  (p.selectionEnd = Math.min(H, p.value.length)));
              else {
                var V = p.ownerDocument || document,
                  j = (V && V.defaultView) || window;
                if (j.getSelection) {
                  var D = j.getSelection(),
                    te = p.textContent.length,
                    ue = Math.min(S.start, te),
                    Le = S.end === void 0 ? ue : Math.min(S.end, te);
                  !D.extend && ue > Le && ((u = Le), (Le = ue), (ue = u));
                  var A = Iu(p, ue),
                    C = Iu(p, Le);
                  if (
                    A &&
                    C &&
                    (D.rangeCount !== 1 ||
                      D.anchorNode !== A.node ||
                      D.anchorOffset !== A.offset ||
                      D.focusNode !== C.node ||
                      D.focusOffset !== C.offset)
                  ) {
                    var O = V.createRange();
                    (O.setStart(A.node, A.offset),
                      D.removeAllRanges(),
                      ue > Le
                        ? (D.addRange(O), D.extend(C.node, C.offset))
                        : (O.setEnd(C.node, C.offset), D.addRange(O)));
                  }
                }
              }
            }
            for (V = [], D = p; (D = D.parentNode); )
              D.nodeType === 1 &&
                V.push({ element: D, left: D.scrollLeft, top: D.scrollTop });
            for (
              typeof p.focus == "function" && p.focus(), p = 0;
              p < V.length;
              p++
            ) {
              var Y = V[p];
              ((Y.element.scrollLeft = Y.left), (Y.element.scrollTop = Y.top));
            }
          }
          ((es = !!Ec), (Cc = Ec = null));
        } finally {
          ((Ge = l), (U.p = a), (T.T = n));
        }
      }
      ((e.current = t), (st = 2));
    }
  }
  function vm() {
    if (st === 2) {
      st = 0;
      var e = da,
        t = Ol,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = T.T), (T.T = null));
        var a = U.p;
        U.p = 2;
        var l = Ge;
        Ge |= 4;
        try {
          Qd(e, t.alternate, t);
        } finally {
          ((Ge = l), (U.p = a), (T.T = n));
        }
      }
      st = 3;
    }
  }
  function ym() {
    if (st === 4 || st === 3) {
      ((st = 0), Ze());
      var e = da,
        t = Ol,
        n = Vn,
        a = lm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (st = 5)
        : ((st = 0), (Ol = da = null), bm(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (
        (l === 0 && (fa = null),
        an(n),
        (t = t.stateNode),
        Et && typeof Et.onCommitFiberRoot == "function")
      )
        try {
          Et.onCommitFiberRoot(wa, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = T.T), (l = U.p), (U.p = 2), (T.T = null));
        try {
          for (var i = e.onRecoverableError, u = 0; u < a.length; u++) {
            var p = a[u];
            i(p.value, { componentStack: p.stack });
          }
        } finally {
          ((T.T = t), (U.p = l));
        }
      }
      ((Vn & 3) !== 0 && Vi(),
        vn(e),
        (l = e.pendingLanes),
        (n & 261930) !== 0 && (l & 42) !== 0
          ? e === cc
            ? No++
            : ((No = 0), (cc = e))
          : (No = 0),
        zo(0));
    }
  }
  function bm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), so(t)));
  }
  function Vi() {
    return (gm(), vm(), ym(), xm());
  }
  function xm() {
    if (st !== 5) return !1;
    var e = da,
      t = sc;
    sc = 0;
    var n = an(Vn),
      a = T.T,
      l = U.p;
    try {
      ((U.p = 32 > n ? 32 : n), (T.T = null), (n = rc), (rc = null));
      var i = da,
        u = Vn;
      if (((st = 0), (Ol = da = null), (Vn = 0), (Ge & 6) !== 0))
        throw Error(r(331));
      var p = Ge;
      if (
        ((Ge |= 4),
        tm(i.current),
        Pd(i, i.current, u, n),
        (Ge = p),
        zo(0, !1),
        Et && typeof Et.onPostCommitFiberRoot == "function")
      )
        try {
          Et.onPostCommitFiberRoot(wa, i);
        } catch {}
      return !0;
    } finally {
      ((U.p = l), (T.T = a), bm(e, t));
    }
  }
  function Sm(e, t, n) {
    ((t = Jt(n, t)),
      (t = Yr(e.stateNode, t, 2)),
      (e = oa(e, t, 2)),
      e !== null && ($e(e, 2), vn(e)));
  }
  function He(e, t, n) {
    if (e.tag === 3) Sm(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Sm(t, e, n);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (fa === null || !fa.has(a)))
          ) {
            ((e = Jt(n, e)),
              (n = Ed(2)),
              (a = oa(t, n, 2)),
              a !== null && (Cd(n, a, t, e), $e(a, 2), vn(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function dc(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new N0();
      var l = new Set();
      a.set(t, l);
    } else ((l = a.get(t)), l === void 0 && ((l = new Set()), a.set(t, l)));
    l.has(n) ||
      ((lc = !0), l.add(n), (e = R0.bind(null, e, t, n)), t.then(e, e));
  }
  function R0(e, t, n) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      Ye === e &&
        (Me & n) === n &&
        (Pe === 4 || (Pe === 3 && (Me & 62914560) === Me && 300 > Ve() - Ui)
          ? (Ge & 2) === 0 && Ml(e, 0)
          : (oc |= n),
        zl === Me && (zl = 0)),
      vn(e));
  }
  function Em(e, t) {
    (t === 0 && (t = bt()), (e = Ra(e, t)), e !== null && ($e(e, t), vn(e)));
  }
  function _0(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), Em(e, n));
  }
  function D0(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode,
          l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (a !== null && a.delete(t), Em(e, n));
  }
  function G0(e, t) {
    return St(e, t);
  }
  var ki = null,
    Rl = null,
    mc = !1,
    Xi = !1,
    hc = !1,
    ha = 0;
  function vn(e) {
    (e !== Rl &&
      e.next === null &&
      (Rl === null ? (ki = Rl = e) : (Rl = Rl.next = e)),
      (Xi = !0),
      mc || ((mc = !0), H0()));
  }
  function zo(e, t) {
    if (!hc && Xi) {
      hc = !0;
      do
        for (var n = !1, a = ki; a !== null; ) {
          if (e !== 0) {
            var l = a.pendingLanes;
            if (l === 0) var i = 0;
            else {
              var u = a.suspendedLanes,
                p = a.pingedLanes;
              ((i = (1 << (31 - yt(42 | e) + 1)) - 1),
                (i &= l & ~(u & ~p)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((n = !0), Am(a, i));
          } else
            ((i = Me),
              (i = he(
                a,
                a === Ye ? i : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (i & 3) === 0 || Ke(a, i) || ((n = !0), Am(a, i)));
          a = a.next;
        }
      while (n);
      hc = !1;
    }
  }
  function U0() {
    Cm();
  }
  function Cm() {
    Xi = mc = !1;
    var e = 0;
    ha !== 0 && K0() && (e = ha);
    for (var t = Ve(), n = null, a = ki; a !== null; ) {
      var l = a.next,
        i = Tm(a, t);
      (i === 0
        ? ((a.next = null),
          n === null ? (ki = l) : (n.next = l),
          l === null && (Rl = n))
        : ((n = a), (e !== 0 || (i & 3) !== 0) && (Xi = !0)),
        (a = l));
    }
    ((st !== 0 && st !== 5) || zo(e), ha !== 0 && (ha = 0));
  }
  function Tm(e, t) {
    for (
      var n = e.suspendedLanes,
        a = e.pingedLanes,
        l = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;

    ) {
      var u = 31 - yt(i),
        p = 1 << u,
        S = l[u];
      (S === -1
        ? ((p & n) === 0 || (p & a) !== 0) && (l[u] = ct(p, t))
        : S <= t && (e.expiredLanes |= p),
        (i &= ~p));
    }
    if (
      ((t = Ye),
      (n = Me),
      (n = he(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      n === 0 ||
        (e === t && (Ue === 2 || Ue === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && ke(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || Ke(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((a !== null && ke(a), an(n))) {
        case 2:
        case 8:
          n = $a;
          break;
        case 32:
          n = Ta;
          break;
        case 268435456:
          n = wn;
          break;
        default:
          n = Ta;
      }
      return (
        (a = wm.bind(null, e)),
        (n = St(n, a)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      a !== null && a !== null && ke(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function wm(e, t) {
    if (st !== 0 && st !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Vi() && e.callbackNode !== n) return null;
    var a = Me;
    return (
      (a = he(
        e,
        e === Ye ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (im(e, a, t),
          Tm(e, Ve()),
          e.callbackNode != null && e.callbackNode === n
            ? wm.bind(null, e)
            : null)
    );
  }
  function Am(e, t) {
    if (Vi()) return null;
    im(e, t, !0);
  }
  function H0() {
    $0(function () {
      (Ge & 6) !== 0 ? St(Tn, U0) : Cm();
    });
  }
  function pc() {
    if (ha === 0) {
      var e = vl;
      (e === 0 && ((e = Fa), (Fa <<= 1), (Fa & 261888) === 0 && (Fa = 256)),
        (ha = e));
    }
    return ha;
  }
  function Nm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Po("" + e);
  }
  function zm(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function B0(e, t, n, a, l) {
    if (t === "submit" && n && n.stateNode === l) {
      var i = Nm((l[Nt] || null).action),
        u = a.submitter;
      u &&
        ((t = (t = u[Nt] || null)
          ? Nm(t.formAction)
          : u.getAttribute("formAction")),
        t !== null && ((i = t), (u = null)));
      var p = new ni("action", "action", null, a, l);
      e.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (ha !== 0) {
                  var S = u ? zm(l, u) : new FormData(l);
                  Gr(
                    n,
                    { pending: !0, data: S, method: l.method, action: i },
                    null,
                    S
                  );
                }
              } else
                typeof i == "function" &&
                  (p.preventDefault(),
                  (S = u ? zm(l, u) : new FormData(l)),
                  Gr(
                    n,
                    { pending: !0, data: S, method: l.method, action: i },
                    i,
                    S
                  ));
            },
            currentTarget: l,
          },
        ],
      });
    }
  }
  for (var gc = 0; gc < Ps.length; gc++) {
    var vc = Ps[gc],
      q0 = vc.toLowerCase(),
      L0 = vc[0].toUpperCase() + vc.slice(1);
    ln(q0, "on" + L0);
  }
  (ln(lf, "onAnimationEnd"),
    ln(of, "onAnimationIteration"),
    ln(sf, "onAnimationStart"),
    ln("dblclick", "onDoubleClick"),
    ln("focusin", "onFocus"),
    ln("focusout", "onBlur"),
    ln(n0, "onTransitionRun"),
    ln(a0, "onTransitionStart"),
    ln(l0, "onTransitionCancel"),
    ln(rf, "onTransitionEnd"),
    al("onMouseEnter", ["mouseout", "mouseover"]),
    al("onMouseLeave", ["mouseout", "mouseover"]),
    al("onPointerEnter", ["pointerout", "pointerover"]),
    al("onPointerLeave", ["pointerout", "pointerover"]),
    za(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    za(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    za("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    za(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    za(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    za(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var Oo =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Y0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Oo)
    );
  function Om(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n],
        l = a.event;
      a = a.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var u = a.length - 1; 0 <= u; u--) {
            var p = a[u],
              S = p.instance,
              M = p.currentTarget;
            if (((p = p.listener), S !== i && l.isPropagationStopped()))
              break e;
            ((i = p), (l.currentTarget = M));
            try {
              i(l);
            } catch (H) {
              oi(H);
            }
            ((l.currentTarget = null), (i = S));
          }
        else
          for (u = 0; u < a.length; u++) {
            if (
              ((p = a[u]),
              (S = p.instance),
              (M = p.currentTarget),
              (p = p.listener),
              S !== i && l.isPropagationStopped())
            )
              break e;
            ((i = p), (l.currentTarget = M));
            try {
              i(l);
            } catch (H) {
              oi(H);
            }
            ((l.currentTarget = null), (i = S));
          }
      }
    }
  }
  function Oe(e, t) {
    var n = t[Ms];
    n === void 0 && (n = t[Ms] = new Set());
    var a = e + "__bubble";
    n.has(a) || (Mm(t, e, 2, !1), n.add(a));
  }
  function yc(e, t, n) {
    var a = 0;
    (t && (a |= 4), Mm(n, e, a, t));
  }
  var Qi = "_reactListening" + Math.random().toString(36).slice(2);
  function bc(e) {
    if (!e[Qi]) {
      ((e[Qi] = !0),
        Eu.forEach(function (n) {
          n !== "selectionchange" && (Y0.has(n) || yc(n, !1, e), yc(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Qi] || ((t[Qi] = !0), yc("selectionchange", !1, t));
    }
  }
  function Mm(e, t, n, a) {
    switch (oh(t)) {
      case 2:
        var l = pv;
        break;
      case 8:
        l = gv;
        break;
      default:
        l = Dc;
    }
    ((n = l.bind(null, t, n, e)),
      (l = void 0),
      !qs ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (l = !0),
      a
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
          ? e.addEventListener(t, n, { passive: l })
          : e.addEventListener(t, n, !1));
  }
  function xc(e, t, n, a, l) {
    var i = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var u = a.tag;
        if (u === 3 || u === 4) {
          var p = a.stateNode.containerInfo;
          if (p === l) break;
          if (u === 4)
            for (u = a.return; u !== null; ) {
              var S = u.tag;
              if ((S === 3 || S === 4) && u.stateNode.containerInfo === l)
                return;
              u = u.return;
            }
          for (; p !== null; ) {
            if (((u = el(p)), u === null)) return;
            if (((S = u.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              a = i = u;
              continue e;
            }
            p = p.parentNode;
          }
        }
        a = a.return;
      }
    Du(function () {
      var M = i,
        H = Hs(n),
        V = [];
      e: {
        var j = cf.get(e);
        if (j !== void 0) {
          var D = ni,
            te = e;
          switch (e) {
            case "keypress":
              if (ei(n) === 0) break e;
            case "keydown":
            case "keyup":
              D = Dg;
              break;
            case "focusin":
              ((te = "focus"), (D = ks));
              break;
            case "focusout":
              ((te = "blur"), (D = ks));
              break;
            case "beforeblur":
            case "afterblur":
              D = ks;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              D = Hu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              D = Eg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              D = Hg;
              break;
            case lf:
            case of:
            case sf:
              D = wg;
              break;
            case rf:
              D = qg;
              break;
            case "scroll":
            case "scrollend":
              D = xg;
              break;
            case "wheel":
              D = Yg;
              break;
            case "copy":
            case "cut":
            case "paste":
              D = Ng;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              D = qu;
              break;
            case "toggle":
            case "beforetoggle":
              D = kg;
          }
          var ue = (t & 4) !== 0,
            Le = !ue && (e === "scroll" || e === "scrollend"),
            A = ue ? (j !== null ? j + "Capture" : null) : j;
          ue = [];
          for (var C = M, O; C !== null; ) {
            var Y = C;
            if (
              ((O = Y.stateNode),
              (Y = Y.tag),
              (Y !== 5 && Y !== 26 && Y !== 27) ||
                O === null ||
                A === null ||
                ((Y = Fl(C, A)), Y != null && ue.push(Mo(C, Y, O))),
              Le)
            )
              break;
            C = C.return;
          }
          0 < ue.length &&
            ((j = new D(j, te, null, n, H)),
            V.push({ event: j, listeners: ue }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((j = e === "mouseover" || e === "pointerover"),
            (D = e === "mouseout" || e === "pointerout"),
            j &&
              n !== Us &&
              (te = n.relatedTarget || n.fromElement) &&
              (el(te) || te[Ia]))
          )
            break e;
          if (
            (D || j) &&
            ((j =
              H.window === H
                ? H
                : (j = H.ownerDocument)
                  ? j.defaultView || j.parentWindow
                  : window),
            D
              ? ((te = n.relatedTarget || n.toElement),
                (D = M),
                (te = te ? el(te) : null),
                te !== null &&
                  ((Le = d(te)),
                  (ue = te.tag),
                  te !== Le || (ue !== 5 && ue !== 27 && ue !== 6)) &&
                  (te = null))
              : ((D = null), (te = M)),
            D !== te)
          ) {
            if (
              ((ue = Hu),
              (Y = "onMouseLeave"),
              (A = "onMouseEnter"),
              (C = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ue = qu),
                (Y = "onPointerLeave"),
                (A = "onPointerEnter"),
                (C = "pointer")),
              (Le = D == null ? j : $l(D)),
              (O = te == null ? j : $l(te)),
              (j = new ue(Y, C + "leave", D, n, H)),
              (j.target = Le),
              (j.relatedTarget = O),
              (Y = null),
              el(H) === M &&
                ((ue = new ue(A, C + "enter", te, n, H)),
                (ue.target = O),
                (ue.relatedTarget = Le),
                (Y = ue)),
              (Le = Y),
              D && te)
            )
              t: {
                for (ue = V0, A = D, C = te, O = 0, Y = A; Y; Y = ue(Y)) O++;
                Y = 0;
                for (var ce = C; ce; ce = ue(ce)) Y++;
                for (; 0 < O - Y; ) ((A = ue(A)), O--);
                for (; 0 < Y - O; ) ((C = ue(C)), Y--);
                for (; O--; ) {
                  if (A === C || (C !== null && A === C.alternate)) {
                    ue = A;
                    break t;
                  }
                  ((A = ue(A)), (C = ue(C)));
                }
                ue = null;
              }
            else ue = null;
            (D !== null && jm(V, j, D, ue, !1),
              te !== null && Le !== null && jm(V, Le, te, ue, !0));
          }
        }
        e: {
          if (
            ((j = M ? $l(M) : window),
            (D = j.nodeName && j.nodeName.toLowerCase()),
            D === "select" || (D === "input" && j.type === "file"))
          )
            var _e = Ku;
          else if (Qu(j))
            if (Ju) _e = Ig;
            else {
              _e = Wg;
              var ie = Fg;
            }
          else
            ((D = j.nodeName),
              !D ||
              D.toLowerCase() !== "input" ||
              (j.type !== "checkbox" && j.type !== "radio")
                ? M && Gs(M.elementType) && (_e = Ku)
                : (_e = Pg));
          if (_e && (_e = _e(e, M))) {
            Zu(V, _e, n, H);
            break e;
          }
          (ie && ie(e, j, M),
            e === "focusout" &&
              M &&
              j.type === "number" &&
              M.memoizedProps.value != null &&
              Ds(j, "number", j.value));
        }
        switch (((ie = M ? $l(M) : window), e)) {
          case "focusin":
            (Qu(ie) || ie.contentEditable === "true") &&
              ((cl = ie), ($s = M), (lo = null));
            break;
          case "focusout":
            lo = $s = cl = null;
            break;
          case "mousedown":
            Fs = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Fs = !1), nf(V, n, H));
            break;
          case "selectionchange":
            if (t0) break;
          case "keydown":
          case "keyup":
            nf(V, n, H);
        }
        var Te;
        if (Qs)
          e: {
            switch (e) {
              case "compositionstart":
                var je = "onCompositionStart";
                break e;
              case "compositionend":
                je = "onCompositionEnd";
                break e;
              case "compositionupdate":
                je = "onCompositionUpdate";
                break e;
            }
            je = void 0;
          }
        else
          rl
            ? ku(e, n) && (je = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (je = "onCompositionStart");
        (je &&
          (Lu &&
            n.locale !== "ko" &&
            (rl || je !== "onCompositionStart"
              ? je === "onCompositionEnd" && rl && (Te = Gu())
              : ((Pn = H),
                (Ls = "value" in Pn ? Pn.value : Pn.textContent),
                (rl = !0))),
          (ie = Zi(M, je)),
          0 < ie.length &&
            ((je = new Bu(je, e, null, n, H)),
            V.push({ event: je, listeners: ie }),
            Te
              ? (je.data = Te)
              : ((Te = Xu(n)), Te !== null && (je.data = Te)))),
          (Te = Qg ? Zg(e, n) : Kg(e, n)) &&
            ((je = Zi(M, "onBeforeInput")),
            0 < je.length &&
              ((ie = new Bu("onBeforeInput", "beforeinput", null, n, H)),
              V.push({ event: ie, listeners: je }),
              (ie.data = Te))),
          B0(V, e, M, n, H));
      }
      Om(V, t);
    });
  }
  function Mo(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Zi(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var l = e,
        i = l.stateNode;
      if (
        ((l = l.tag),
        (l !== 5 && l !== 26 && l !== 27) ||
          i === null ||
          ((l = Fl(e, n)),
          l != null && a.unshift(Mo(e, l, i)),
          (l = Fl(e, t)),
          l != null && a.push(Mo(e, l, i))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function V0(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function jm(e, t, n, a, l) {
    for (var i = t._reactName, u = []; n !== null && n !== a; ) {
      var p = n,
        S = p.alternate,
        M = p.stateNode;
      if (((p = p.tag), S !== null && S === a)) break;
      ((p !== 5 && p !== 26 && p !== 27) ||
        M === null ||
        ((S = M),
        l
          ? ((M = Fl(n, i)), M != null && u.unshift(Mo(n, M, S)))
          : l || ((M = Fl(n, i)), M != null && u.push(Mo(n, M, S)))),
        (n = n.return));
    }
    u.length !== 0 && e.push({ event: t, listeners: u });
  }
  var k0 = /\r\n?/g,
    X0 = /\u0000|\uFFFD/g;
  function Rm(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        k0,
        `
`
      )
      .replace(X0, "");
  }
  function _m(e, t) {
    return ((t = Rm(t)), Rm(e) === t);
  }
  function qe(e, t, n, a, l, i) {
    switch (n) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || ol(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            ol(e, "" + a);
        break;
      case "className":
        Fo(e, "class", a);
        break;
      case "tabIndex":
        Fo(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Fo(e, n, a);
        break;
      case "style":
        Ru(e, a, i);
        break;
      case "data":
        if (t !== "object") {
          Fo(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        ((a = Po("" + a)), e.setAttribute(n, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" &&
            (n === "formAction"
              ? (t !== "input" && qe(e, t, "name", l.name, l, null),
                qe(e, t, "formEncType", l.formEncType, l, null),
                qe(e, t, "formMethod", l.formMethod, l, null),
                qe(e, t, "formTarget", l.formTarget, l, null))
              : (qe(e, t, "encType", l.encType, l, null),
                qe(e, t, "method", l.method, l, null),
                qe(e, t, "target", l.target, l, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        ((a = Po("" + a)), e.setAttribute(n, a));
        break;
      case "onClick":
        a != null && (e.onclick = Nn);
        break;
      case "onScroll":
        a != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((n = a.__html), n != null)) {
            if (l.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((n = Po("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(n, "" + a)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(n, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? e.setAttribute(n, a)
            : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(n, a)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(n)
          : e.setAttribute(n, a);
        break;
      case "popover":
        (Oe("beforetoggle", e), Oe("toggle", e), $o(e, "popover", a));
        break;
      case "xlinkActuate":
        An(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        An(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        An(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        An(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        An(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        An(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        An(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        An(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        An(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        $o(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = yg.get(n) || n), $o(e, n, a));
    }
  }
  function Sc(e, t, n, a, l, i) {
    switch (n) {
      case "style":
        Ru(e, a, i);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((n = a.__html), n != null)) {
            if (l.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? ol(e, a)
          : (typeof a == "number" || typeof a == "bigint") && ol(e, "" + a);
        break;
      case "onScroll":
        a != null && Oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && Oe("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Nn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Cu.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((l = n.endsWith("Capture")),
              (t = n.slice(2, l ? n.length - 7 : void 0)),
              (i = e[Nt] || null),
              (i = i != null ? i[n] : null),
              typeof i == "function" && e.removeEventListener(t, i, l),
              typeof a == "function")
            ) {
              (typeof i != "function" &&
                i !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, a, l));
              break e;
            }
            n in e
              ? (e[n] = a)
              : a === !0
                ? e.setAttribute(n, "")
                : $o(e, n, a);
          }
    }
  }
  function vt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Oe("error", e), Oe("load", e));
        var a = !1,
          l = !1,
          i;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var u = n[i];
            if (u != null)
              switch (i) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  l = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  qe(e, t, i, u, n, null);
              }
          }
        (l && qe(e, t, "srcSet", n.srcSet, n, null),
          a && qe(e, t, "src", n.src, n, null));
        return;
      case "input":
        Oe("invalid", e);
        var p = (i = u = l = null),
          S = null,
          M = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var H = n[a];
            if (H != null)
              switch (a) {
                case "name":
                  l = H;
                  break;
                case "type":
                  u = H;
                  break;
                case "checked":
                  S = H;
                  break;
                case "defaultChecked":
                  M = H;
                  break;
                case "value":
                  i = H;
                  break;
                case "defaultValue":
                  p = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null) throw Error(r(137, t));
                  break;
                default:
                  qe(e, t, a, H, n, null);
              }
          }
        zu(e, i, p, S, M, u, l, !1);
        return;
      case "select":
        (Oe("invalid", e), (a = u = i = null));
        for (l in n)
          if (n.hasOwnProperty(l) && ((p = n[l]), p != null))
            switch (l) {
              case "value":
                i = p;
                break;
              case "defaultValue":
                u = p;
                break;
              case "multiple":
                a = p;
              default:
                qe(e, t, l, p, n, null);
            }
        ((t = i),
          (n = u),
          (e.multiple = !!a),
          t != null ? ll(e, !!a, t, !1) : n != null && ll(e, !!a, n, !0));
        return;
      case "textarea":
        (Oe("invalid", e), (i = l = a = null));
        for (u in n)
          if (n.hasOwnProperty(u) && ((p = n[u]), p != null))
            switch (u) {
              case "value":
                a = p;
                break;
              case "defaultValue":
                l = p;
                break;
              case "children":
                i = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(r(91));
                break;
              default:
                qe(e, t, u, p, n, null);
            }
        Mu(e, a, l, i);
        return;
      case "option":
        for (S in n)
          if (n.hasOwnProperty(S) && ((a = n[S]), a != null))
            switch (S) {
              case "selected":
                e.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                qe(e, t, S, a, n, null);
            }
        return;
      case "dialog":
        (Oe("beforetoggle", e),
          Oe("toggle", e),
          Oe("cancel", e),
          Oe("close", e));
        break;
      case "iframe":
      case "object":
        Oe("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Oo.length; a++) Oe(Oo[a], e);
        break;
      case "image":
        (Oe("error", e), Oe("load", e));
        break;
      case "details":
        Oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Oe("error", e), Oe("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (M in n)
          if (n.hasOwnProperty(M) && ((a = n[M]), a != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                qe(e, t, M, a, n, null);
            }
        return;
      default:
        if (Gs(t)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((a = n[H]), a !== void 0 && Sc(e, t, H, a, n, void 0));
          return;
        }
    }
    for (p in n)
      n.hasOwnProperty(p) && ((a = n[p]), a != null && qe(e, t, p, a, n, null));
  }
  function Q0(e, t, n, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var l = null,
          i = null,
          u = null,
          p = null,
          S = null,
          M = null,
          H = null;
        for (D in n) {
          var V = n[D];
          if (n.hasOwnProperty(D) && V != null)
            switch (D) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = V;
              default:
                a.hasOwnProperty(D) || qe(e, t, D, null, a, V);
            }
        }
        for (var j in a) {
          var D = a[j];
          if (((V = n[j]), a.hasOwnProperty(j) && (D != null || V != null)))
            switch (j) {
              case "type":
                i = D;
                break;
              case "name":
                l = D;
                break;
              case "checked":
                M = D;
                break;
              case "defaultChecked":
                H = D;
                break;
              case "value":
                u = D;
                break;
              case "defaultValue":
                p = D;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (D != null) throw Error(r(137, t));
                break;
              default:
                D !== V && qe(e, t, j, D, a, V);
            }
        }
        _s(e, u, p, S, M, H, i, l);
        return;
      case "select":
        D = u = p = j = null;
        for (i in n)
          if (((S = n[i]), n.hasOwnProperty(i) && S != null))
            switch (i) {
              case "value":
                break;
              case "multiple":
                D = S;
              default:
                a.hasOwnProperty(i) || qe(e, t, i, null, a, S);
            }
        for (l in a)
          if (
            ((i = a[l]),
            (S = n[l]),
            a.hasOwnProperty(l) && (i != null || S != null))
          )
            switch (l) {
              case "value":
                j = i;
                break;
              case "defaultValue":
                p = i;
                break;
              case "multiple":
                u = i;
              default:
                i !== S && qe(e, t, l, i, a, S);
            }
        ((t = p),
          (n = u),
          (a = D),
          j != null
            ? ll(e, !!n, j, !1)
            : !!a != !!n &&
              (t != null ? ll(e, !!n, t, !0) : ll(e, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        D = j = null;
        for (p in n)
          if (
            ((l = n[p]),
            n.hasOwnProperty(p) && l != null && !a.hasOwnProperty(p))
          )
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                qe(e, t, p, null, a, l);
            }
        for (u in a)
          if (
            ((l = a[u]),
            (i = n[u]),
            a.hasOwnProperty(u) && (l != null || i != null))
          )
            switch (u) {
              case "value":
                j = l;
                break;
              case "defaultValue":
                D = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(r(91));
                break;
              default:
                l !== i && qe(e, t, u, l, a, i);
            }
        Ou(e, j, D);
        return;
      case "option":
        for (var te in n)
          if (
            ((j = n[te]),
            n.hasOwnProperty(te) && j != null && !a.hasOwnProperty(te))
          )
            switch (te) {
              case "selected":
                e.selected = !1;
                break;
              default:
                qe(e, t, te, null, a, j);
            }
        for (S in a)
          if (
            ((j = a[S]),
            (D = n[S]),
            a.hasOwnProperty(S) && j !== D && (j != null || D != null))
          )
            switch (S) {
              case "selected":
                e.selected =
                  j && typeof j != "function" && typeof j != "symbol";
                break;
              default:
                qe(e, t, S, j, a, D);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ue in n)
          ((j = n[ue]),
            n.hasOwnProperty(ue) &&
              j != null &&
              !a.hasOwnProperty(ue) &&
              qe(e, t, ue, null, a, j));
        for (M in a)
          if (
            ((j = a[M]),
            (D = n[M]),
            a.hasOwnProperty(M) && j !== D && (j != null || D != null))
          )
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(r(137, t));
                break;
              default:
                qe(e, t, M, j, a, D);
            }
        return;
      default:
        if (Gs(t)) {
          for (var Le in n)
            ((j = n[Le]),
              n.hasOwnProperty(Le) &&
                j !== void 0 &&
                !a.hasOwnProperty(Le) &&
                Sc(e, t, Le, void 0, a, j));
          for (H in a)
            ((j = a[H]),
              (D = n[H]),
              !a.hasOwnProperty(H) ||
                j === D ||
                (j === void 0 && D === void 0) ||
                Sc(e, t, H, j, a, D));
          return;
        }
    }
    for (var A in n)
      ((j = n[A]),
        n.hasOwnProperty(A) &&
          j != null &&
          !a.hasOwnProperty(A) &&
          qe(e, t, A, null, a, j));
    for (V in a)
      ((j = a[V]),
        (D = n[V]),
        !a.hasOwnProperty(V) ||
          j === D ||
          (j == null && D == null) ||
          qe(e, t, V, j, a, D));
  }
  function Dm(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Z0() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0;
        a < n.length;
        a++
      ) {
        var l = n[a],
          i = l.transferSize,
          u = l.initiatorType,
          p = l.duration;
        if (i && p && Dm(u)) {
          for (u = 0, p = l.responseEnd, a += 1; a < n.length; a++) {
            var S = n[a],
              M = S.startTime;
            if (M > p) break;
            var H = S.transferSize,
              V = S.initiatorType;
            H &&
              Dm(V) &&
              ((S = S.responseEnd), (u += H * (S < p ? 1 : (p - M) / (S - M))));
          }
          if ((--a, (t += (8 * (i + u)) / (l.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var Ec = null,
    Cc = null;
  function Ki(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Gm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Um(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Tc(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var wc = null;
  function K0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === wc
        ? !1
        : ((wc = e), !0)
      : ((wc = null), !1);
  }
  var Hm = typeof setTimeout == "function" ? setTimeout : void 0,
    J0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Bm = typeof Promise == "function" ? Promise : void 0,
    $0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Bm < "u"
          ? function (e) {
              return Bm.resolve(null).then(e).catch(F0);
            }
          : Hm;
  function F0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function pa(e) {
    return e === "head";
  }
  function qm(e, t) {
    var n = t,
      a = 0;
    do {
      var l = n.nextSibling;
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === "/$" || n === "/&")) {
          if (a === 0) {
            (e.removeChild(l), Ul(t));
            return;
          }
          a--;
        } else if (
          n === "$" ||
          n === "$?" ||
          n === "$~" ||
          n === "$!" ||
          n === "&"
        )
          a++;
        else if (n === "html") jo(e.ownerDocument.documentElement);
        else if (n === "head") {
          ((n = e.ownerDocument.head), jo(n));
          for (var i = n.firstChild; i; ) {
            var u = i.nextSibling,
              p = i.nodeName;
            (i[Jl] ||
              p === "SCRIPT" ||
              p === "STYLE" ||
              (p === "LINK" && i.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(i),
              (i = u));
          }
        } else n === "body" && jo(e.ownerDocument.body);
      n = l;
    } while (n);
    Ul(t);
  }
  function Lm(e, t) {
    var n = e;
    e = 0;
    do {
      var a = n.nextSibling;
      if (
        (n.nodeType === 1
          ? t
            ? ((n._stashedDisplay = n.style.display),
              (n.style.display = "none"))
            : ((n.style.display = n._stashedDisplay || ""),
              n.getAttribute("style") === "" && n.removeAttribute("style"))
          : n.nodeType === 3 &&
            (t
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
              : (n.nodeValue = n._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((n = a.data), n === "/$")) {
          if (e === 0) break;
          e--;
        } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || e++;
      n = a;
    } while (n);
  }
  function Ac(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Ac(n), js(n));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function W0(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var l = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Jl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((i = e.getAttribute("rel")),
                i === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                i !== l.rel ||
                e.getAttribute("href") !==
                  (l.href == null || l.href === "" ? null : l.href) ||
                e.getAttribute("crossorigin") !==
                  (l.crossOrigin == null ? null : l.crossOrigin) ||
                e.getAttribute("title") !== (l.title == null ? null : l.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((i = e.getAttribute("src")),
                (i !== (l.src == null ? null : l.src) ||
                  e.getAttribute("type") !== (l.type == null ? null : l.type) ||
                  e.getAttribute("crossorigin") !==
                    (l.crossOrigin == null ? null : l.crossOrigin)) &&
                  i &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = l.name == null ? null : "" + l.name;
        if (l.type === "hidden" && e.getAttribute("name") === i) return e;
      } else return e;
      if (((e = It(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function P0(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = It(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Ym(e, t) {
    for (; e.nodeType !== 8; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = It(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Nc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function zc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function I0(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading") t();
    else {
      var a = function () {
        (t(), n.removeEventListener("DOMContentLoaded", a));
      };
      (n.addEventListener("DOMContentLoaded", a), (e._reactRetry = a));
    }
  }
  function It(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Oc = null;
  function Vm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return It(e.nextSibling);
          t--;
        } else
          (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function km(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else (n !== "/$" && n !== "/&") || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Xm(e, t, n) {
    switch (((t = Ki(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function jo(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    js(e);
  }
  var en = new Map(),
    Qm = new Set();
  function Ji(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var kn = U.d;
  U.d = { f: ev, r: tv, D: nv, C: av, L: lv, m: ov, X: sv, S: iv, M: rv };
  function ev() {
    var e = kn.f(),
      t = qi();
    return e || t;
  }
  function tv(e) {
    var t = tl(e);
    t !== null && t.tag === 5 && t.type === "form" ? rd(t) : kn.r(e);
  }
  var _l = typeof document > "u" ? null : document;
  function Zm(e, t, n) {
    var a = _l;
    if (a && typeof t == "string" && t) {
      var l = Zt(t);
      ((l = 'link[rel="' + e + '"][href="' + l + '"]'),
        typeof n == "string" && (l += '[crossorigin="' + n + '"]'),
        Qm.has(l) ||
          (Qm.add(l),
          (e = { rel: e, crossOrigin: n, href: t }),
          a.querySelector(l) === null &&
            ((t = a.createElement("link")),
            vt(t, "link", e),
            ut(t),
            a.head.appendChild(t))));
    }
  }
  function nv(e) {
    (kn.D(e), Zm("dns-prefetch", e, null));
  }
  function av(e, t) {
    (kn.C(e, t), Zm("preconnect", e, t));
  }
  function lv(e, t, n) {
    kn.L(e, t, n);
    var a = _l;
    if (a && e && t) {
      var l = 'link[rel="preload"][as="' + Zt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((l += '[imagesrcset="' + Zt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (l += '[imagesizes="' + Zt(n.imageSizes) + '"]'))
        : (l += '[href="' + Zt(e) + '"]');
      var i = l;
      switch (t) {
        case "style":
          i = Dl(e);
          break;
        case "script":
          i = Gl(e);
      }
      en.has(i) ||
        ((e = m(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t,
          },
          n
        )),
        en.set(i, e),
        a.querySelector(l) !== null ||
          (t === "style" && a.querySelector(Ro(i))) ||
          (t === "script" && a.querySelector(_o(i))) ||
          ((t = a.createElement("link")),
          vt(t, "link", e),
          ut(t),
          a.head.appendChild(t)));
    }
  }
  function ov(e, t) {
    kn.m(e, t);
    var n = _l;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        l =
          'link[rel="modulepreload"][as="' + Zt(a) + '"][href="' + Zt(e) + '"]',
        i = l;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Gl(e);
      }
      if (
        !en.has(i) &&
        ((e = m({ rel: "modulepreload", href: e }, t)),
        en.set(i, e),
        n.querySelector(l) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(_o(i))) return;
        }
        ((a = n.createElement("link")),
          vt(a, "link", e),
          ut(a),
          n.head.appendChild(a));
      }
    }
  }
  function iv(e, t, n) {
    kn.S(e, t, n);
    var a = _l;
    if (a && e) {
      var l = nl(a).hoistableStyles,
        i = Dl(e);
      t = t || "default";
      var u = l.get(i);
      if (!u) {
        var p = { loading: 0, preload: null };
        if ((u = a.querySelector(Ro(i)))) p.loading = 5;
        else {
          ((e = m({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = en.get(i)) && Mc(e, n));
          var S = (u = a.createElement("link"));
          (ut(S),
            vt(S, "link", e),
            (S._p = new Promise(function (M, H) {
              ((S.onload = M), (S.onerror = H));
            })),
            S.addEventListener("load", function () {
              p.loading |= 1;
            }),
            S.addEventListener("error", function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            $i(u, t, a));
        }
        ((u = { type: "stylesheet", instance: u, count: 1, state: p }),
          l.set(i, u));
      }
    }
  }
  function sv(e, t) {
    kn.X(e, t);
    var n = _l;
    if (n && e) {
      var a = nl(n).hoistableScripts,
        l = Gl(e),
        i = a.get(l);
      i ||
        ((i = n.querySelector(_o(l))),
        i ||
          ((e = m({ src: e, async: !0 }, t)),
          (t = en.get(l)) && jc(e, t),
          (i = n.createElement("script")),
          ut(i),
          vt(i, "link", e),
          n.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        a.set(l, i));
    }
  }
  function rv(e, t) {
    kn.M(e, t);
    var n = _l;
    if (n && e) {
      var a = nl(n).hoistableScripts,
        l = Gl(e),
        i = a.get(l);
      i ||
        ((i = n.querySelector(_o(l))),
        i ||
          ((e = m({ src: e, async: !0, type: "module" }, t)),
          (t = en.get(l)) && jc(e, t),
          (i = n.createElement("script")),
          ut(i),
          vt(i, "link", e),
          n.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        a.set(l, i));
    }
  }
  function Km(e, t, n, a) {
    var l = (l = re.current) ? Ji(l) : null;
    if (!l) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = Dl(n.href)),
            (n = nl(l).hoistableStyles),
            (a = n.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = Dl(n.href);
          var i = nl(l).hoistableStyles,
            u = i.get(e);
          if (
            (u ||
              ((l = l.ownerDocument || l),
              (u = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(e, u),
              (i = l.querySelector(Ro(e))) &&
                !i._p &&
                ((u.instance = i), (u.state.loading = 5)),
              en.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                en.set(e, n),
                i || cv(l, e, n, u.state))),
            t && a === null)
          )
            throw Error(r(528, ""));
          return u;
        }
        if (t && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Gl(n)),
              (n = nl(l).hoistableScripts),
              (a = n.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function Dl(e) {
    return 'href="' + Zt(e) + '"';
  }
  function Ro(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Jm(e) {
    return m({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function cv(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        vt(t, "link", n),
        ut(t),
        e.head.appendChild(t));
  }
  function Gl(e) {
    return '[src="' + Zt(e) + '"]';
  }
  function _o(e) {
    return "script[async]" + e;
  }
  function $m(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + Zt(n.href) + '"]');
          if (a) return ((t.instance = a), ut(a), a);
          var l = m({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            ut(a),
            vt(a, "style", l),
            $i(a, n.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          l = Dl(n.href);
          var i = e.querySelector(Ro(l));
          if (i) return ((t.state.loading |= 4), (t.instance = i), ut(i), i);
          ((a = Jm(n)),
            (l = en.get(l)) && Mc(a, l),
            (i = (e.ownerDocument || e).createElement("link")),
            ut(i));
          var u = i;
          return (
            (u._p = new Promise(function (p, S) {
              ((u.onload = p), (u.onerror = S));
            })),
            vt(i, "link", a),
            (t.state.loading |= 4),
            $i(i, n.precedence, e),
            (t.instance = i)
          );
        case "script":
          return (
            (i = Gl(n.src)),
            (l = e.querySelector(_o(i)))
              ? ((t.instance = l), ut(l), l)
              : ((a = n),
                (l = en.get(i)) && ((a = m({}, n)), jc(a, l)),
                (e = e.ownerDocument || e),
                (l = e.createElement("script")),
                ut(l),
                vt(l, "link", a),
                e.head.appendChild(l),
                (t.instance = l))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), $i(a, n.precedence, e));
    return t.instance;
  }
  function $i(e, t, n) {
    for (
      var a = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        l = a.length ? a[a.length - 1] : null,
        i = l,
        u = 0;
      u < a.length;
      u++
    ) {
      var p = a[u];
      if (p.dataset.precedence === t) i = p;
      else if (i !== l) break;
    }
    i
      ? i.parentNode.insertBefore(e, i.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function Mc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function jc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Fi = null;
  function Fm(e, t, n) {
    if (Fi === null) {
      var a = new Map(),
        l = (Fi = new Map());
      l.set(n, a);
    } else ((l = Fi), (a = l.get(n)), a || ((a = new Map()), l.set(n, a)));
    if (a.has(e)) return a;
    for (
      a.set(e, null), n = n.getElementsByTagName(e), l = 0;
      l < n.length;
      l++
    ) {
      var i = n[l];
      if (
        !(
          i[Jl] ||
          i[mt] ||
          (e === "link" && i.getAttribute("rel") === "stylesheet")
        ) &&
        i.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var u = i.getAttribute(t) || "";
        u = e + u;
        var p = a.get(u);
        p ? p.push(i) : a.set(u, [i]);
      }
    }
    return a;
  }
  function Wm(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      ));
  }
  function uv(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled),
              typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Pm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function fv(e, t, n, a) {
    if (
      n.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var l = Dl(a.href),
          i = t.querySelector(Ro(l));
        if (i) {
          ((t = i._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = Wi.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = i),
            ut(i));
          return;
        }
        ((i = t.ownerDocument || t),
          (a = Jm(a)),
          (l = en.get(l)) && Mc(a, l),
          (i = i.createElement("link")),
          ut(i));
        var u = i;
        ((u._p = new Promise(function (p, S) {
          ((u.onload = p), (u.onerror = S));
        })),
          vt(i, "link", a),
          (n.instance = i));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = Wi.bind(e)),
          t.addEventListener("load", n),
          t.addEventListener("error", n)));
    }
  }
  var Rc = 0;
  function dv(e, t) {
    return (
      e.stylesheets && e.count === 0 && Ii(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var a = setTimeout(function () {
              if ((e.stylesheets && Ii(e, e.stylesheets), e.unsuspend)) {
                var i = e.unsuspend;
                ((e.unsuspend = null), i());
              }
            }, 6e4 + t);
            0 < e.imgBytes && Rc === 0 && (Rc = 62500 * Z0());
            var l = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && Ii(e, e.stylesheets), e.unsuspend))
                ) {
                  var i = e.unsuspend;
                  ((e.unsuspend = null), i());
                }
              },
              (e.imgBytes > Rc ? 50 : 800) + t
            );
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(a), clearTimeout(l));
              }
            );
          }
        : null
    );
  }
  function Wi() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Ii(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Pi = null;
  function Ii(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Pi = new Map()),
        t.forEach(mv, e),
        (Pi = null),
        Wi.call(e)));
  }
  function mv(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Pi.get(e);
      if (n) var a = n.get(null);
      else {
        ((n = new Map()), Pi.set(e, n));
        for (
          var l = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            i = 0;
          i < l.length;
          i++
        ) {
          var u = l[i];
          (u.nodeName === "LINK" || u.getAttribute("media") !== "not all") &&
            (n.set(u.dataset.precedence, u), (a = u));
        }
        a && n.set(null, a);
      }
      ((l = t.instance),
        (u = l.getAttribute("data-precedence")),
        (i = n.get(u) || a),
        i === a && n.set(null, l),
        n.set(u, l),
        this.count++,
        (a = Wi.bind(this)),
        l.addEventListener("load", a),
        l.addEventListener("error", a),
        i
          ? i.parentNode.insertBefore(l, i.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(l, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Do = {
    $$typeof: K,
    Provider: null,
    Consumer: null,
    _currentValue: _,
    _currentValue2: _,
    _threadCount: 0,
  };
  function hv(e, t, n, a, l, i, u, p, S) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Fn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Fn(0)),
      (this.hiddenUpdates = Fn(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = l),
      (this.onCaughtError = i),
      (this.onRecoverableError = u),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map()));
  }
  function Im(e, t, n, a, l, i, u, p, S, M, H, V) {
    return (
      (e = new hv(e, t, n, u, S, M, H, V, p)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = Ht(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = fr()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: a, isDehydrated: n, cache: t }),
      pr(i),
      e
    );
  }
  function eh(e) {
    return e ? ((e = dl), e) : dl;
  }
  function th(e, t, n, a, l, i) {
    ((l = eh(l)),
      a.context === null ? (a.context = l) : (a.pendingContext = l),
      (a = la(t)),
      (a.payload = { element: n }),
      (i = i === void 0 ? null : i),
      i !== null && (a.callback = i),
      (n = oa(e, a, t)),
      n !== null && (_t(n, e, t), fo(n, e, t)));
  }
  function nh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function _c(e, t) {
    (nh(e, t), (e = e.alternate) && nh(e, t));
  }
  function ah(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ra(e, 67108864);
      (t !== null && _t(t, e, 67108864), _c(e, 67108864));
    }
  }
  function lh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Vt();
      t = Pa(t);
      var n = Ra(e, t);
      (n !== null && _t(n, e, t), _c(e, t));
    }
  }
  var es = !0;
  function pv(e, t, n, a) {
    var l = T.T;
    T.T = null;
    var i = U.p;
    try {
      ((U.p = 2), Dc(e, t, n, a));
    } finally {
      ((U.p = i), (T.T = l));
    }
  }
  function gv(e, t, n, a) {
    var l = T.T;
    T.T = null;
    var i = U.p;
    try {
      ((U.p = 8), Dc(e, t, n, a));
    } finally {
      ((U.p = i), (T.T = l));
    }
  }
  function Dc(e, t, n, a) {
    if (es) {
      var l = Gc(a);
      if (l === null) (xc(e, t, a, ts, n), ih(e, a));
      else if (yv(l, e, t, n, a)) a.stopPropagation();
      else if ((ih(e, a), t & 4 && -1 < vv.indexOf(e))) {
        for (; l !== null; ) {
          var i = tl(l);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var u = mn(i.pendingLanes);
                  if (u !== 0) {
                    var p = i;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; u; ) {
                      var S = 1 << (31 - yt(u));
                      ((p.entanglements[1] |= S), (u &= ~S));
                    }
                    (vn(i), (Ge & 6) === 0 && ((Hi = Ve() + 500), zo(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((p = Ra(i, 2)), p !== null && _t(p, i, 2), qi(), _c(i, 2));
            }
          if (((i = Gc(a)), i === null && xc(e, t, a, ts, n), i === l)) break;
          l = i;
        }
        l !== null && a.stopPropagation();
      } else xc(e, t, a, null, n);
    }
  }
  function Gc(e) {
    return ((e = Hs(e)), Uc(e));
  }
  var ts = null;
  function Uc(e) {
    if (((ts = null), (e = el(e)), e !== null)) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = g(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = x(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((ts = e), null);
  }
  function oh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (fn()) {
          case Tn:
            return 2;
          case $a:
            return 8;
          case Ta:
          case Zl:
            return 32;
          case wn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Hc = !1,
    ga = null,
    va = null,
    ya = null,
    Go = new Map(),
    Uo = new Map(),
    ba = [],
    vv =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function ih(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ga = null;
        break;
      case "dragenter":
      case "dragleave":
        va = null;
        break;
      case "mouseover":
      case "mouseout":
        ya = null;
        break;
      case "pointerover":
      case "pointerout":
        Go.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Uo.delete(t.pointerId);
    }
  }
  function Ho(e, t, n, a, l, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: a,
          nativeEvent: i,
          targetContainers: [l],
        }),
        t !== null && ((t = tl(t)), t !== null && ah(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e);
  }
  function yv(e, t, n, a, l) {
    switch (t) {
      case "focusin":
        return ((ga = Ho(ga, e, t, n, a, l)), !0);
      case "dragenter":
        return ((va = Ho(va, e, t, n, a, l)), !0);
      case "mouseover":
        return ((ya = Ho(ya, e, t, n, a, l)), !0);
      case "pointerover":
        var i = l.pointerId;
        return (Go.set(i, Ho(Go.get(i) || null, e, t, n, a, l)), !0);
      case "gotpointercapture":
        return (
          (i = l.pointerId),
          Uo.set(i, Ho(Uo.get(i) || null, e, t, n, a, l)),
          !0
        );
    }
    return !1;
  }
  function sh(e) {
    var t = el(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = g(n)), t !== null)) {
            ((e.blockedOn = t),
              xu(e.priority, function () {
                lh(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = x(n)), t !== null)) {
            ((e.blockedOn = t),
              xu(e.priority, function () {
                lh(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ns(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Gc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(n.type, n);
        ((Us = a), n.target.dispatchEvent(a), (Us = null));
      } else return ((t = tl(n)), t !== null && ah(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function rh(e, t, n) {
    ns(e) && n.delete(t);
  }
  function bv() {
    ((Hc = !1),
      ga !== null && ns(ga) && (ga = null),
      va !== null && ns(va) && (va = null),
      ya !== null && ns(ya) && (ya = null),
      Go.forEach(rh),
      Uo.forEach(rh));
  }
  function as(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Hc ||
        ((Hc = !0),
        o.unstable_scheduleCallback(o.unstable_NormalPriority, bv)));
  }
  var ls = null;
  function ch(e) {
    ls !== e &&
      ((ls = e),
      o.unstable_scheduleCallback(o.unstable_NormalPriority, function () {
        ls === e && (ls = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            a = e[t + 1],
            l = e[t + 2];
          if (typeof a != "function") {
            if (Uc(a || n) === null) continue;
            break;
          }
          var i = tl(n);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Gr(i, { pending: !0, data: l, method: n.method, action: a }, a, l));
        }
      }));
  }
  function Ul(e) {
    function t(S) {
      return as(S, e);
    }
    (ga !== null && as(ga, e),
      va !== null && as(va, e),
      ya !== null && as(ya, e),
      Go.forEach(t),
      Uo.forEach(t));
    for (var n = 0; n < ba.length; n++) {
      var a = ba[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < ba.length && ((n = ba[0]), n.blockedOn === null); )
      (sh(n), n.blockedOn === null && ba.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (a = 0; a < n.length; a += 3) {
        var l = n[a],
          i = n[a + 1],
          u = l[Nt] || null;
        if (typeof i == "function") u || ch(n);
        else if (u) {
          var p = null;
          if (i && i.hasAttribute("formAction")) {
            if (((l = i), (u = i[Nt] || null))) p = u.formAction;
            else if (Uc(l) !== null) continue;
          } else p = u.action;
          (typeof p == "function" ? (n[a + 1] = p) : (n.splice(a, 3), (a -= 3)),
            ch(n));
        }
      }
  }
  function uh() {
    function e(i) {
      i.canIntercept &&
        i.info === "react-transition" &&
        i.intercept({
          handler: function () {
            return new Promise(function (u) {
              return (l = u);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (l !== null && (l(), (l = null)), a || setTimeout(n, 20));
    }
    function n() {
      if (!a && !navigation.transition) {
        var i = navigation.currentEntry;
        i &&
          i.url != null &&
          navigation.navigate(i.url, {
            state: i.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        l = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(n, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            l !== null && (l(), (l = null)));
        }
      );
    }
  }
  function Bc(e) {
    this._internalRoot = e;
  }
  ((os.prototype.render = Bc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var n = t.current,
        a = Vt();
      th(n, a, e, t, null, null);
    }),
    (os.prototype.unmount = Bc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (th(e.current, 2, null, e, null, null), qi(), (t[Ia] = null));
        }
      }));
  function os(e) {
    this._internalRoot = e;
  }
  os.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Os();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < ba.length && t !== 0 && t < ba[n].priority; n++);
      (ba.splice(n, 0, e), n === 0 && sh(e));
    }
  };
  var fh = s.version;
  if (fh !== "19.2.1") throw Error(r(527, fh, "19.2.1"));
  U.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)));
    return (
      (e = h(t)),
      (e = e !== null ? b(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var xv = {
    bundleType: 0,
    version: "19.2.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var is = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!is.isDisabled && is.supportsFiber)
      try {
        ((wa = is.inject(xv)), (Et = is));
      } catch {}
  }
  return (
    (qo.createRoot = function (e, t) {
      if (!f(e)) throw Error(r(299));
      var n = !1,
        a = "",
        l = yd,
        i = bd,
        u = xd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (l = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
        (t = Im(e, 1, !1, null, null, n, a, null, l, i, u, uh)),
        (e[Ia] = t.current),
        bc(e),
        new Bc(t)
      );
    }),
    (qo.hydrateRoot = function (e, t, n) {
      if (!f(e)) throw Error(r(299));
      var a = !1,
        l = "",
        i = yd,
        u = bd,
        p = xd,
        S = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (i = n.onUncaughtError),
          n.onCaughtError !== void 0 && (u = n.onCaughtError),
          n.onRecoverableError !== void 0 && (p = n.onRecoverableError),
          n.formState !== void 0 && (S = n.formState)),
        (t = Im(e, 1, !0, t, n ?? null, a, l, S, i, u, p, uh)),
        (t.context = eh(null)),
        (n = t.current),
        (a = Vt()),
        (a = Pa(a)),
        (l = la(a)),
        (l.callback = null),
        oa(n, l, a),
        (n = a),
        (t.current.lanes = n),
        $e(t, n),
        vn(t),
        (e[Ia] = t.current),
        bc(e),
        new os(t)
      );
    }),
    (qo.version = "19.2.1"),
    qo
  );
}
var Sh;
function Mv() {
  if (Sh) return Lc.exports;
  Sh = 1;
  function o() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (s) {
        console.error(s);
      }
  }
  return (o(), (Lc.exports = Ov()), Lc.exports);
}
var jv = Mv(),
  z = vs();
const J = np(z),
  Rv = Ev({ __proto__: null, default: J }, [z]);
var _v = (o, s, c, r, f, d, g, x) => {
    let v = document.documentElement,
      h = ["light", "dark"];
    function b(N) {
      ((Array.isArray(o) ? o : [o]).forEach(R => {
        let B = R === "class",
          k = B && d ? f.map(L => d[L] || L) : f;
        B
          ? (v.classList.remove(...k), v.classList.add(d && d[N] ? d[N] : N))
          : v.setAttribute(R, N);
      }),
        m(N));
    }
    function m(N) {
      x && h.includes(N) && (v.style.colorScheme = N);
    }
    function w() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (r) b(r);
    else
      try {
        let N = localStorage.getItem(s) || c,
          R = g && N === "system" ? w() : N;
        b(R);
      } catch {}
  },
  Dv = z.createContext(void 0),
  Gv = { setTheme: o => {}, themes: [] },
  Uv = () => {
    var o;
    return (o = z.useContext(Dv)) != null ? o : Gv;
  };
z.memo(
  ({
    forcedTheme: o,
    storageKey: s,
    attribute: c,
    enableSystem: r,
    enableColorScheme: f,
    defaultTheme: d,
    value: g,
    themes: x,
    nonce: v,
    scriptProps: h,
  }) => {
    let b = JSON.stringify([c, s, d, o, x, g, r, f]).slice(1, -1);
    return z.createElement("script", {
      ...h,
      suppressHydrationWarning: !0,
      nonce: typeof window > "u" ? v : "",
      dangerouslySetInnerHTML: { __html: `(${_v.toString()})(${b})` },
    });
  }
);
var ru = ap();
const Hv = np(ru);
function Bv(o) {
  if (typeof document > "u") return;
  let s = document.head || document.getElementsByTagName("head")[0],
    c = document.createElement("style");
  ((c.type = "text/css"),
    s.appendChild(c),
    c.styleSheet
      ? (c.styleSheet.cssText = o)
      : c.appendChild(document.createTextNode(o)));
}
const qv = o => {
    switch (o) {
      case "success":
        return Vv;
      case "info":
        return Xv;
      case "warning":
        return kv;
      case "error":
        return Qv;
      default:
        return null;
    }
  },
  Lv = Array(12).fill(0),
  Yv = ({ visible: o, className: s }) =>
    J.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", s].filter(Boolean).join(" "),
        "data-visible": o,
      },
      J.createElement(
        "div",
        { className: "sonner-spinner" },
        Lv.map((c, r) =>
          J.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${r}`,
          })
        )
      )
    ),
  Vv = J.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    J.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    })
  ),
  kv = J.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    J.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    })
  ),
  Xv = J.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    J.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    })
  ),
  Qv = J.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    J.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    })
  ),
  Zv = J.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    J.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    J.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ),
  Kv = () => {
    const [o, s] = J.useState(document.hidden);
    return (
      J.useEffect(() => {
        const c = () => {
          s(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", c),
          () => window.removeEventListener("visibilitychange", c)
        );
      }, []),
      o
    );
  };
let Pc = 1;
class Jv {
  constructor() {
    ((this.subscribe = s => (
      this.subscribers.push(s),
      () => {
        const c = this.subscribers.indexOf(s);
        this.subscribers.splice(c, 1);
      }
    )),
      (this.publish = s => {
        this.subscribers.forEach(c => c(s));
      }),
      (this.addToast = s => {
        (this.publish(s), (this.toasts = [...this.toasts, s]));
      }),
      (this.create = s => {
        var c;
        const { message: r, ...f } = s,
          d =
            typeof s?.id == "number" ||
            ((c = s.id) == null ? void 0 : c.length) > 0
              ? s.id
              : Pc++,
          g = this.toasts.find(v => v.id === d),
          x = s.dismissible === void 0 ? !0 : s.dismissible;
        return (
          this.dismissedToasts.has(d) && this.dismissedToasts.delete(d),
          g
            ? (this.toasts = this.toasts.map(v =>
                v.id === d
                  ? (this.publish({ ...v, ...s, id: d, title: r }),
                    { ...v, ...s, id: d, dismissible: x, title: r })
                  : v
              ))
            : this.addToast({ title: r, ...f, dismissible: x, id: d }),
          d
        );
      }),
      (this.dismiss = s => (
        s
          ? (this.dismissedToasts.add(s),
            requestAnimationFrame(() =>
              this.subscribers.forEach(c => c({ id: s, dismiss: !0 }))
            ))
          : this.toasts.forEach(c => {
              this.subscribers.forEach(r => r({ id: c.id, dismiss: !0 }));
            }),
        s
      )),
      (this.message = (s, c) => this.create({ ...c, message: s })),
      (this.error = (s, c) => this.create({ ...c, message: s, type: "error" })),
      (this.success = (s, c) =>
        this.create({ ...c, type: "success", message: s })),
      (this.info = (s, c) => this.create({ ...c, type: "info", message: s })),
      (this.warning = (s, c) =>
        this.create({ ...c, type: "warning", message: s })),
      (this.loading = (s, c) =>
        this.create({ ...c, type: "loading", message: s })),
      (this.promise = (s, c) => {
        if (!c) return;
        let r;
        c.loading !== void 0 &&
          (r = this.create({
            ...c,
            promise: s,
            type: "loading",
            message: c.loading,
            description:
              typeof c.description != "function" ? c.description : void 0,
          }));
        const f = Promise.resolve(s instanceof Function ? s() : s);
        let d = r !== void 0,
          g;
        const x = f
            .then(async h => {
              if (((g = ["resolve", h]), J.isValidElement(h)))
                ((d = !1), this.create({ id: r, type: "default", message: h }));
              else if (Fv(h) && !h.ok) {
                d = !1;
                const m =
                    typeof c.error == "function"
                      ? await c.error(`HTTP error! status: ${h.status}`)
                      : c.error,
                  w =
                    typeof c.description == "function"
                      ? await c.description(`HTTP error! status: ${h.status}`)
                      : c.description,
                  R =
                    typeof m == "object" && !J.isValidElement(m)
                      ? m
                      : { message: m };
                this.create({ id: r, type: "error", description: w, ...R });
              } else if (h instanceof Error) {
                d = !1;
                const m =
                    typeof c.error == "function" ? await c.error(h) : c.error,
                  w =
                    typeof c.description == "function"
                      ? await c.description(h)
                      : c.description,
                  R =
                    typeof m == "object" && !J.isValidElement(m)
                      ? m
                      : { message: m };
                this.create({ id: r, type: "error", description: w, ...R });
              } else if (c.success !== void 0) {
                d = !1;
                const m =
                    typeof c.success == "function"
                      ? await c.success(h)
                      : c.success,
                  w =
                    typeof c.description == "function"
                      ? await c.description(h)
                      : c.description,
                  R =
                    typeof m == "object" && !J.isValidElement(m)
                      ? m
                      : { message: m };
                this.create({ id: r, type: "success", description: w, ...R });
              }
            })
            .catch(async h => {
              if (((g = ["reject", h]), c.error !== void 0)) {
                d = !1;
                const b =
                    typeof c.error == "function" ? await c.error(h) : c.error,
                  m =
                    typeof c.description == "function"
                      ? await c.description(h)
                      : c.description,
                  N =
                    typeof b == "object" && !J.isValidElement(b)
                      ? b
                      : { message: b };
                this.create({ id: r, type: "error", description: m, ...N });
              }
            })
            .finally(() => {
              (d && (this.dismiss(r), (r = void 0)),
                c.finally == null || c.finally.call(c));
            }),
          v = () =>
            new Promise((h, b) =>
              x.then(() => (g[0] === "reject" ? b(g[1]) : h(g[1]))).catch(b)
            );
        return typeof r != "string" && typeof r != "number"
          ? { unwrap: v }
          : Object.assign(r, { unwrap: v });
      }),
      (this.custom = (s, c) => {
        const r = c?.id || Pc++;
        return (this.create({ jsx: s(r), id: r, ...c }), r);
      }),
      (this.getActiveToasts = () =>
        this.toasts.filter(s => !this.dismissedToasts.has(s.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set()));
  }
}
const Dt = new Jv(),
  $v = (o, s) => {
    const c = s?.id || Pc++;
    return (Dt.addToast({ title: o, ...s, id: c }), c);
  },
  Fv = o =>
    o &&
    typeof o == "object" &&
    "ok" in o &&
    typeof o.ok == "boolean" &&
    "status" in o &&
    typeof o.status == "number",
  Wv = $v,
  Pv = () => Dt.toasts,
  Iv = () => Dt.getActiveToasts();
Object.assign(
  Wv,
  {
    success: Dt.success,
    info: Dt.info,
    warning: Dt.warning,
    error: Dt.error,
    custom: Dt.custom,
    message: Dt.message,
    promise: Dt.promise,
    dismiss: Dt.dismiss,
    loading: Dt.loading,
  },
  { getHistory: Pv, getToasts: Iv }
);
Bv(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}"
);
function ss(o) {
  return o.label !== void 0;
}
const ey = 3,
  ty = "24px",
  ny = "16px",
  Eh = 4e3,
  ay = 356,
  ly = 14,
  oy = 45,
  iy = 200;
function yn(...o) {
  return o.filter(Boolean).join(" ");
}
function sy(o) {
  const [s, c] = o.split("-"),
    r = [];
  return (s && r.push(s), c && r.push(c), r);
}
const ry = o => {
  var s, c, r, f, d, g, x, v, h;
  const {
      invert: b,
      toast: m,
      unstyled: w,
      interacting: N,
      setHeights: R,
      visibleToasts: B,
      heights: k,
      index: L,
      toasts: P,
      expanded: K,
      removeToast: F,
      defaultRichColors: I,
      closeButton: ee,
      style: Q,
      cancelButtonStyle: Z,
      actionButtonStyle: pe,
      className: Ce = "",
      descriptionClassName: we = "",
      duration: ge,
      position: be,
      gap: ve,
      expandByDefault: Se,
      classNames: T,
      icons: U,
      closeButtonAriaLabel: _ = "Close toast",
    } = o,
    [oe, se] = J.useState(null),
    [E, q] = J.useState(null),
    [G, X] = J.useState(!1),
    [$, re] = J.useState(!1),
    [ne, fe] = J.useState(!1),
    [Ne, ot] = J.useState(!1),
    [dt, it] = J.useState(!1),
    [tn, Gt] = J.useState(0),
    [Jn, Cn] = J.useState(0),
    W = J.useRef(m.duration || ge || Eh),
    de = J.useRef(null),
    xe = J.useRef(null),
    St = L === 0,
    ke = L + 1 <= B,
    me = m.type,
    Ze = m.dismissible !== !1,
    Ve = m.className || "",
    fn = m.descriptionClassName || "",
    Tn = J.useMemo(
      () => k.findIndex(he => he.toastId === m.id) || 0,
      [k, m.id]
    ),
    $a = J.useMemo(() => {
      var he;
      return (he = m.closeButton) != null ? he : ee;
    }, [m.closeButton, ee]),
    Ta = J.useMemo(() => m.duration || ge || Eh, [m.duration, ge]),
    Zl = J.useRef(0),
    wn = J.useRef(0),
    Jo = J.useRef(0),
    $n = J.useRef(null),
    [wa, Et] = be.split("-"),
    nn = J.useMemo(
      () => k.reduce((he, Ke, ct) => (ct >= Tn ? he : he + Ke.height), 0),
      [k, Tn]
    ),
    yt = Kv(),
    zs = m.invert || b,
    Kl = me === "loading";
  ((wn.current = J.useMemo(() => Tn * ve + nn, [Tn, nn])),
    J.useEffect(() => {
      W.current = Ta;
    }, [Ta]),
    J.useEffect(() => {
      X(!0);
    }, []),
    J.useEffect(() => {
      const he = xe.current;
      if (he) {
        const Ke = he.getBoundingClientRect().height;
        return (
          Cn(Ke),
          R(ct => [{ toastId: m.id, height: Ke, position: m.position }, ...ct]),
          () => R(ct => ct.filter(bt => bt.toastId !== m.id))
        );
      }
    }, [R, m.id]),
    J.useLayoutEffect(() => {
      if (!G) return;
      const he = xe.current,
        Ke = he.style.height;
      he.style.height = "auto";
      const ct = he.getBoundingClientRect().height;
      ((he.style.height = Ke),
        Cn(ct),
        R(bt =>
          bt.find($e => $e.toastId === m.id)
            ? bt.map($e => ($e.toastId === m.id ? { ...$e, height: ct } : $e))
            : [{ toastId: m.id, height: ct, position: m.position }, ...bt]
        ));
    }, [G, m.title, m.description, R, m.id, m.jsx, m.action, m.cancel]));
  const dn = J.useCallback(() => {
    (re(!0),
      Gt(wn.current),
      R(he => he.filter(Ke => Ke.toastId !== m.id)),
      setTimeout(() => {
        F(m);
      }, iy));
  }, [m, F, R, wn]);
  (J.useEffect(() => {
    if (
      (m.promise && me === "loading") ||
      m.duration === 1 / 0 ||
      m.type === "loading"
    )
      return;
    let he;
    return (
      K || N || yt
        ? (() => {
            if (Jo.current < Zl.current) {
              const bt = new Date().getTime() - Zl.current;
              W.current = W.current - bt;
            }
            Jo.current = new Date().getTime();
          })()
        : (() => {
            W.current !== 1 / 0 &&
              ((Zl.current = new Date().getTime()),
              (he = setTimeout(() => {
                (m.onAutoClose == null || m.onAutoClose.call(m, m), dn());
              }, W.current)));
          })(),
      () => clearTimeout(he)
    );
  }, [K, N, m, me, yt, dn]),
    J.useEffect(() => {
      m.delete && (dn(), m.onDismiss == null || m.onDismiss.call(m, m));
    }, [dn, m.delete]));
  function Fa() {
    var he;
    if (U?.loading) {
      var Ke;
      return J.createElement(
        "div",
        {
          className: yn(
            T?.loader,
            m == null || (Ke = m.classNames) == null ? void 0 : Ke.loader,
            "sonner-loader"
          ),
          "data-visible": me === "loading",
        },
        U.loading
      );
    }
    return J.createElement(Yv, {
      className: yn(
        T?.loader,
        m == null || (he = m.classNames) == null ? void 0 : he.loader
      ),
      visible: me === "loading",
    });
  }
  const Wa = m.icon || U?.[me] || qv(me);
  var Aa, mn;
  return J.createElement(
    "li",
    {
      tabIndex: 0,
      ref: xe,
      className: yn(
        Ce,
        Ve,
        T?.toast,
        m == null || (s = m.classNames) == null ? void 0 : s.toast,
        T?.default,
        T?.[me],
        m == null || (c = m.classNames) == null ? void 0 : c[me]
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (Aa = m.richColors) != null ? Aa : I,
      "data-styled": !(m.jsx || m.unstyled || w),
      "data-mounted": G,
      "data-promise": !!m.promise,
      "data-swiped": dt,
      "data-removed": $,
      "data-visible": ke,
      "data-y-position": wa,
      "data-x-position": Et,
      "data-index": L,
      "data-front": St,
      "data-swiping": ne,
      "data-dismissible": Ze,
      "data-type": me,
      "data-invert": zs,
      "data-swipe-out": Ne,
      "data-swipe-direction": E,
      "data-expanded": !!(K || (Se && G)),
      "data-testid": m.testId,
      style: {
        "--index": L,
        "--toasts-before": L,
        "--z-index": P.length - L,
        "--offset": `${$ ? tn : wn.current}px`,
        "--initial-height": Se ? "auto" : `${Jn}px`,
        ...Q,
        ...m.style,
      },
      onDragEnd: () => {
        (fe(!1), se(null), ($n.current = null));
      },
      onPointerDown: he => {
        he.button !== 2 &&
          (Kl ||
            !Ze ||
            ((de.current = new Date()),
            Gt(wn.current),
            he.target.setPointerCapture(he.pointerId),
            he.target.tagName !== "BUTTON" &&
              (fe(!0), ($n.current = { x: he.clientX, y: he.clientY }))));
      },
      onPointerUp: () => {
        var he, Ke, ct;
        if (Ne || !Ze) return;
        $n.current = null;
        const bt = Number(
            ((he = xe.current) == null
              ? void 0
              : he.style
                  .getPropertyValue("--swipe-amount-x")
                  .replace("px", "")) || 0
          ),
          Fn = Number(
            ((Ke = xe.current) == null
              ? void 0
              : Ke.style
                  .getPropertyValue("--swipe-amount-y")
                  .replace("px", "")) || 0
          ),
          $e =
            new Date().getTime() -
            ((ct = de.current) == null ? void 0 : ct.getTime()),
          Tt = oe === "x" ? bt : Fn,
          Na = Math.abs(Tt) / $e;
        if (Math.abs(Tt) >= oy || Na > 0.11) {
          (Gt(wn.current),
            m.onDismiss == null || m.onDismiss.call(m, m),
            q(
              oe === "x" ? (bt > 0 ? "right" : "left") : Fn > 0 ? "down" : "up"
            ),
            dn(),
            ot(!0));
          return;
        } else {
          var wt, At;
          ((wt = xe.current) == null ||
            wt.style.setProperty("--swipe-amount-x", "0px"),
            (At = xe.current) == null ||
              At.style.setProperty("--swipe-amount-y", "0px"));
        }
        (it(!1), fe(!1), se(null));
      },
      onPointerMove: he => {
        var Ke, ct, bt;
        if (
          !$n.current ||
          !Ze ||
          ((Ke = window.getSelection()) == null
            ? void 0
            : Ke.toString().length) > 0
        )
          return;
        const $e = he.clientY - $n.current.y,
          Tt = he.clientX - $n.current.x;
        var Na;
        const wt = (Na = o.swipeDirections) != null ? Na : sy(be);
        !oe &&
          (Math.abs(Tt) > 1 || Math.abs($e) > 1) &&
          se(Math.abs(Tt) > Math.abs($e) ? "x" : "y");
        let At = { x: 0, y: 0 };
        const Pa = an => 1 / (1.5 + Math.abs(an) / 20);
        if (oe === "y") {
          if (wt.includes("top") || wt.includes("bottom"))
            if (
              (wt.includes("top") && $e < 0) ||
              (wt.includes("bottom") && $e > 0)
            )
              At.y = $e;
            else {
              const an = $e * Pa($e);
              At.y = Math.abs(an) < Math.abs($e) ? an : $e;
            }
        } else if (oe === "x" && (wt.includes("left") || wt.includes("right")))
          if (
            (wt.includes("left") && Tt < 0) ||
            (wt.includes("right") && Tt > 0)
          )
            At.x = Tt;
          else {
            const an = Tt * Pa(Tt);
            At.x = Math.abs(an) < Math.abs(Tt) ? an : Tt;
          }
        ((Math.abs(At.x) > 0 || Math.abs(At.y) > 0) && it(!0),
          (ct = xe.current) == null ||
            ct.style.setProperty("--swipe-amount-x", `${At.x}px`),
          (bt = xe.current) == null ||
            bt.style.setProperty("--swipe-amount-y", `${At.y}px`));
      },
    },
    $a && !m.jsx && me !== "loading"
      ? J.createElement(
          "button",
          {
            "aria-label": _,
            "data-disabled": Kl,
            "data-close-button": !0,
            onClick:
              Kl || !Ze
                ? () => {}
                : () => {
                    (dn(), m.onDismiss == null || m.onDismiss.call(m, m));
                  },
            className: yn(
              T?.closeButton,
              m == null || (r = m.classNames) == null ? void 0 : r.closeButton
            ),
          },
          (mn = U?.close) != null ? mn : Zv
        )
      : null,
    (me || m.icon || m.promise) &&
      m.icon !== null &&
      (U?.[me] !== null || m.icon)
      ? J.createElement(
          "div",
          {
            "data-icon": "",
            className: yn(
              T?.icon,
              m == null || (f = m.classNames) == null ? void 0 : f.icon
            ),
          },
          m.promise || (m.type === "loading" && !m.icon)
            ? m.icon || Fa()
            : null,
          m.type !== "loading" ? Wa : null
        )
      : null,
    J.createElement(
      "div",
      {
        "data-content": "",
        className: yn(
          T?.content,
          m == null || (d = m.classNames) == null ? void 0 : d.content
        ),
      },
      J.createElement(
        "div",
        {
          "data-title": "",
          className: yn(
            T?.title,
            m == null || (g = m.classNames) == null ? void 0 : g.title
          ),
        },
        m.jsx ? m.jsx : typeof m.title == "function" ? m.title() : m.title
      ),
      m.description
        ? J.createElement(
            "div",
            {
              "data-description": "",
              className: yn(
                we,
                fn,
                T?.description,
                m == null || (x = m.classNames) == null ? void 0 : x.description
              ),
            },
            typeof m.description == "function" ? m.description() : m.description
          )
        : null
    ),
    J.isValidElement(m.cancel)
      ? m.cancel
      : m.cancel && ss(m.cancel)
        ? J.createElement(
            "button",
            {
              "data-button": !0,
              "data-cancel": !0,
              style: m.cancelButtonStyle || Z,
              onClick: he => {
                ss(m.cancel) &&
                  Ze &&
                  (m.cancel.onClick == null ||
                    m.cancel.onClick.call(m.cancel, he),
                  dn());
              },
              className: yn(
                T?.cancelButton,
                m == null || (v = m.classNames) == null
                  ? void 0
                  : v.cancelButton
              ),
            },
            m.cancel.label
          )
        : null,
    J.isValidElement(m.action)
      ? m.action
      : m.action && ss(m.action)
        ? J.createElement(
            "button",
            {
              "data-button": !0,
              "data-action": !0,
              style: m.actionButtonStyle || pe,
              onClick: he => {
                ss(m.action) &&
                  (m.action.onClick == null ||
                    m.action.onClick.call(m.action, he),
                  !he.defaultPrevented && dn());
              },
              className: yn(
                T?.actionButton,
                m == null || (h = m.classNames) == null
                  ? void 0
                  : h.actionButton
              ),
            },
            m.action.label
          )
        : null
  );
};
function Ch() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const o = document.documentElement.getAttribute("dir");
  return o === "auto" || !o
    ? window.getComputedStyle(document.documentElement).direction
    : o;
}
function cy(o, s) {
  const c = {};
  return (
    [o, s].forEach((r, f) => {
      const d = f === 1,
        g = d ? "--mobile-offset" : "--offset",
        x = d ? ny : ty;
      function v(h) {
        ["top", "right", "bottom", "left"].forEach(b => {
          c[`${g}-${b}`] = typeof h == "number" ? `${h}px` : h;
        });
      }
      typeof r == "number" || typeof r == "string"
        ? v(r)
        : typeof r == "object"
          ? ["top", "right", "bottom", "left"].forEach(h => {
              r[h] === void 0
                ? (c[`${g}-${h}`] = x)
                : (c[`${g}-${h}`] =
                    typeof r[h] == "number" ? `${r[h]}px` : r[h]);
            })
          : v(x);
    }),
    c
  );
}
const uy = J.forwardRef(function (s, c) {
    const {
        id: r,
        invert: f,
        position: d = "bottom-right",
        hotkey: g = ["altKey", "KeyT"],
        expand: x,
        closeButton: v,
        className: h,
        offset: b,
        mobileOffset: m,
        theme: w = "light",
        richColors: N,
        duration: R,
        style: B,
        visibleToasts: k = ey,
        toastOptions: L,
        dir: P = Ch(),
        gap: K = ly,
        icons: F,
        containerAriaLabel: I = "Notifications",
      } = s,
      [ee, Q] = J.useState([]),
      Z = J.useMemo(
        () =>
          r ? ee.filter(G => G.toasterId === r) : ee.filter(G => !G.toasterId),
        [ee, r]
      ),
      pe = J.useMemo(
        () =>
          Array.from(
            new Set([d].concat(Z.filter(G => G.position).map(G => G.position)))
          ),
        [Z, d]
      ),
      [Ce, we] = J.useState([]),
      [ge, be] = J.useState(!1),
      [ve, Se] = J.useState(!1),
      [T, U] = J.useState(
        w !== "system"
          ? w
          : typeof window < "u" &&
              window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
      ),
      _ = J.useRef(null),
      oe = g.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      se = J.useRef(null),
      E = J.useRef(!1),
      q = J.useCallback(G => {
        Q(X => {
          var $;
          return (
            (($ = X.find(re => re.id === G.id)) != null && $.delete) ||
              Dt.dismiss(G.id),
            X.filter(({ id: re }) => re !== G.id)
          );
        });
      }, []);
    return (
      J.useEffect(
        () =>
          Dt.subscribe(G => {
            if (G.dismiss) {
              requestAnimationFrame(() => {
                Q(X => X.map($ => ($.id === G.id ? { ...$, delete: !0 } : $)));
              });
              return;
            }
            setTimeout(() => {
              Hv.flushSync(() => {
                Q(X => {
                  const $ = X.findIndex(re => re.id === G.id);
                  return $ !== -1
                    ? [...X.slice(0, $), { ...X[$], ...G }, ...X.slice($ + 1)]
                    : [G, ...X];
                });
              });
            });
          }),
        [ee]
      ),
      J.useEffect(() => {
        if (w !== "system") {
          U(w);
          return;
        }
        if (
          (w === "system" &&
            (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? U("dark")
              : U("light")),
          typeof window > "u")
        )
          return;
        const G = window.matchMedia("(prefers-color-scheme: dark)");
        try {
          G.addEventListener("change", ({ matches: X }) => {
            U(X ? "dark" : "light");
          });
        } catch {
          G.addListener(({ matches: $ }) => {
            try {
              U($ ? "dark" : "light");
            } catch (re) {
              console.error(re);
            }
          });
        }
      }, [w]),
      J.useEffect(() => {
        ee.length <= 1 && be(!1);
      }, [ee]),
      J.useEffect(() => {
        const G = X => {
          var $;
          if (g.every(fe => X[fe] || X.code === fe)) {
            var ne;
            (be(!0), (ne = _.current) == null || ne.focus());
          }
          X.code === "Escape" &&
            (document.activeElement === _.current ||
              (($ = _.current) != null &&
                $.contains(document.activeElement))) &&
            be(!1);
        };
        return (
          document.addEventListener("keydown", G),
          () => document.removeEventListener("keydown", G)
        );
      }, [g]),
      J.useEffect(() => {
        if (_.current)
          return () => {
            se.current &&
              (se.current.focus({ preventScroll: !0 }),
              (se.current = null),
              (E.current = !1));
          };
      }, [_.current]),
      J.createElement(
        "section",
        {
          ref: c,
          "aria-label": `${I} ${oe}`,
          tabIndex: -1,
          "aria-live": "polite",
          "aria-relevant": "additions text",
          "aria-atomic": "false",
          suppressHydrationWarning: !0,
        },
        pe.map((G, X) => {
          var $;
          const [re, ne] = G.split("-");
          return Z.length
            ? J.createElement(
                "ol",
                {
                  key: G,
                  dir: P === "auto" ? Ch() : P,
                  tabIndex: -1,
                  ref: _,
                  className: h,
                  "data-sonner-toaster": !0,
                  "data-sonner-theme": T,
                  "data-y-position": re,
                  "data-x-position": ne,
                  style: {
                    "--front-toast-height": `${(($ = Ce[0]) == null ? void 0 : $.height) || 0}px`,
                    "--width": `${ay}px`,
                    "--gap": `${K}px`,
                    ...B,
                    ...cy(b, m),
                  },
                  onBlur: fe => {
                    E.current &&
                      !fe.currentTarget.contains(fe.relatedTarget) &&
                      ((E.current = !1),
                      se.current &&
                        (se.current.focus({ preventScroll: !0 }),
                        (se.current = null)));
                  },
                  onFocus: fe => {
                    (fe.target instanceof HTMLElement &&
                      fe.target.dataset.dismissible === "false") ||
                      E.current ||
                      ((E.current = !0), (se.current = fe.relatedTarget));
                  },
                  onMouseEnter: () => be(!0),
                  onMouseMove: () => be(!0),
                  onMouseLeave: () => {
                    ve || be(!1);
                  },
                  onDragEnd: () => be(!1),
                  onPointerDown: fe => {
                    (fe.target instanceof HTMLElement &&
                      fe.target.dataset.dismissible === "false") ||
                      Se(!0);
                  },
                  onPointerUp: () => Se(!1),
                },
                Z.filter(
                  fe => (!fe.position && X === 0) || fe.position === G
                ).map((fe, Ne) => {
                  var ot, dt;
                  return J.createElement(ry, {
                    key: fe.id,
                    icons: F,
                    index: Ne,
                    toast: fe,
                    defaultRichColors: N,
                    duration: (ot = L?.duration) != null ? ot : R,
                    className: L?.className,
                    descriptionClassName: L?.descriptionClassName,
                    invert: f,
                    visibleToasts: k,
                    closeButton: (dt = L?.closeButton) != null ? dt : v,
                    interacting: ve,
                    position: G,
                    style: L?.style,
                    unstyled: L?.unstyled,
                    classNames: L?.classNames,
                    cancelButtonStyle: L?.cancelButtonStyle,
                    actionButtonStyle: L?.actionButtonStyle,
                    closeButtonAriaLabel: L?.closeButtonAriaLabel,
                    removeToast: q,
                    toasts: Z.filter(it => it.position == fe.position),
                    heights: Ce.filter(it => it.position == fe.position),
                    setHeights: we,
                    expandByDefault: x,
                    gap: K,
                    expanded: ge,
                    swipeDirections: s.swipeDirections,
                  });
                })
              )
            : null;
        })
      )
    );
  }),
  fy = ({ ...o }) => {
    const { theme: s = "system" } = Uv();
    return y.jsx(uy, {
      "data-loc": "client/src/components/ui/sonner.tsx:8",
      theme: s,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      },
      ...o,
    });
  };
function Qn(o, s, { checkForDefaultPrevented: c = !0 } = {}) {
  return function (f) {
    if ((o?.(f), c === !1 || !f.defaultPrevented)) return s?.(f);
  };
}
function Th(o, s) {
  if (typeof o == "function") return o(s);
  o != null && (o.current = s);
}
function lp(...o) {
  return s => {
    let c = !1;
    const r = o.map(f => {
      const d = Th(f, s);
      return (!c && typeof d == "function" && (c = !0), d);
    });
    if (c)
      return () => {
        for (let f = 0; f < r.length; f++) {
          const d = r[f];
          typeof d == "function" ? d() : Th(o[f], null);
        }
      };
  };
}
function Ka(...o) {
  return z.useCallback(lp(...o), o);
}
function op(o, s = []) {
  let c = [];
  function r(d, g) {
    const x = z.createContext(g),
      v = c.length;
    c = [...c, g];
    const h = m => {
      const { scope: w, children: N, ...R } = m,
        B = w?.[o]?.[v] || x,
        k = z.useMemo(() => R, Object.values(R));
      return y.jsx(B.Provider, { value: k, children: N });
    };
    h.displayName = d + "Provider";
    function b(m, w) {
      const N = w?.[o]?.[v] || x,
        R = z.useContext(N);
      if (R) return R;
      if (g !== void 0) return g;
      throw new Error(`\`${m}\` must be used within \`${d}\``);
    }
    return [h, b];
  }
  const f = () => {
    const d = c.map(g => z.createContext(g));
    return function (x) {
      const v = x?.[o] || d;
      return z.useMemo(() => ({ [`__scope${o}`]: { ...x, [o]: v } }), [x, v]);
    };
  };
  return ((f.scopeName = o), [r, dy(f, ...s)]);
}
function dy(...o) {
  const s = o[0];
  if (o.length === 1) return s;
  const c = () => {
    const r = o.map(f => ({ useScope: f(), scopeName: f.scopeName }));
    return function (d) {
      const g = r.reduce((x, { useScope: v, scopeName: h }) => {
        const m = v(d)[`__scope${h}`];
        return { ...x, ...m };
      }, {});
      return z.useMemo(() => ({ [`__scope${s.scopeName}`]: g }), [g]);
    };
  };
  return ((c.scopeName = s.scopeName), c);
}
function ip(o) {
  const s = hy(o),
    c = z.forwardRef((r, f) => {
      const { children: d, ...g } = r,
        x = z.Children.toArray(d),
        v = x.find(gy);
      if (v) {
        const h = v.props.children,
          b = x.map(m =>
            m === v
              ? z.Children.count(h) > 1
                ? z.Children.only(null)
                : z.isValidElement(h)
                  ? h.props.children
                  : null
              : m
          );
        return y.jsx(s, {
          ...g,
          ref: f,
          children: z.isValidElement(h) ? z.cloneElement(h, void 0, b) : null,
        });
      }
      return y.jsx(s, { ...g, ref: f, children: d });
    });
  return ((c.displayName = `${o}.Slot`), c);
}
var my = ip("Slot");
function hy(o) {
  const s = z.forwardRef((c, r) => {
    const { children: f, ...d } = c;
    if (z.isValidElement(f)) {
      const g = yy(f),
        x = vy(d, f.props);
      return (
        f.type !== z.Fragment && (x.ref = r ? lp(r, g) : g),
        z.cloneElement(f, x)
      );
    }
    return z.Children.count(f) > 1 ? z.Children.only(null) : null;
  });
  return ((s.displayName = `${o}.SlotClone`), s);
}
var sp = Symbol("radix.slottable");
function py(o) {
  const s = ({ children: c }) => y.jsx(y.Fragment, { children: c });
  return ((s.displayName = `${o}.Slottable`), (s.__radixId = sp), s);
}
function gy(o) {
  return (
    z.isValidElement(o) &&
    typeof o.type == "function" &&
    "__radixId" in o.type &&
    o.type.__radixId === sp
  );
}
function vy(o, s) {
  const c = { ...s };
  for (const r in s) {
    const f = o[r],
      d = s[r];
    /^on[A-Z]/.test(r)
      ? f && d
        ? (c[r] = (...x) => {
            const v = d(...x);
            return (f(...x), v);
          })
        : f && (c[r] = f)
      : r === "style"
        ? (c[r] = { ...f, ...d })
        : r === "className" && (c[r] = [f, d].filter(Boolean).join(" "));
  }
  return { ...o, ...c };
}
function yy(o) {
  let s = Object.getOwnPropertyDescriptor(o.props, "ref")?.get,
    c = s && "isReactWarning" in s && s.isReactWarning;
  return c
    ? o.ref
    : ((s = Object.getOwnPropertyDescriptor(o, "ref")?.get),
      (c = s && "isReactWarning" in s && s.isReactWarning),
      c ? o.props.ref : o.props.ref || o.ref);
}
var by = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  Ja = by.reduce((o, s) => {
    const c = ip(`Primitive.${s}`),
      r = z.forwardRef((f, d) => {
        const { asChild: g, ...x } = f,
          v = g ? c : s;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          y.jsx(v, { ...x, ref: d })
        );
      });
    return ((r.displayName = `Primitive.${s}`), { ...o, [s]: r });
  }, {});
function xy(o, s) {
  o && ru.flushSync(() => o.dispatchEvent(s));
}
function ys(o) {
  const s = z.useRef(o);
  return (
    z.useEffect(() => {
      s.current = o;
    }),
    z.useMemo(
      () =>
        (...c) =>
          s.current?.(...c),
      []
    )
  );
}
function Sy(o, s = globalThis?.document) {
  const c = ys(o);
  z.useEffect(() => {
    const r = f => {
      f.key === "Escape" && c(f);
    };
    return (
      s.addEventListener("keydown", r, { capture: !0 }),
      () => s.removeEventListener("keydown", r, { capture: !0 })
    );
  }, [c, s]);
}
var Ey = "DismissableLayer",
  Ic = "dismissableLayer.update",
  Cy = "dismissableLayer.pointerDownOutside",
  Ty = "dismissableLayer.focusOutside",
  wh,
  rp = z.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  cp = z.forwardRef((o, s) => {
    const {
        disableOutsidePointerEvents: c = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: f,
        onFocusOutside: d,
        onInteractOutside: g,
        onDismiss: x,
        ...v
      } = o,
      h = z.useContext(rp),
      [b, m] = z.useState(null),
      w = b?.ownerDocument ?? globalThis?.document,
      [, N] = z.useState({}),
      R = Ka(s, Q => m(Q)),
      B = Array.from(h.layers),
      [k] = [...h.layersWithOutsidePointerEventsDisabled].slice(-1),
      L = B.indexOf(k),
      P = b ? B.indexOf(b) : -1,
      K = h.layersWithOutsidePointerEventsDisabled.size > 0,
      F = P >= L,
      I = Ny(Q => {
        const Z = Q.target,
          pe = [...h.branches].some(Ce => Ce.contains(Z));
        !F || pe || (f?.(Q), g?.(Q), Q.defaultPrevented || x?.());
      }, w),
      ee = zy(Q => {
        const Z = Q.target;
        [...h.branches].some(Ce => Ce.contains(Z)) ||
          (d?.(Q), g?.(Q), Q.defaultPrevented || x?.());
      }, w);
    return (
      Sy(Q => {
        P === h.layers.size - 1 &&
          (r?.(Q), !Q.defaultPrevented && x && (Q.preventDefault(), x()));
      }, w),
      z.useEffect(() => {
        if (b)
          return (
            c &&
              (h.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((wh = w.body.style.pointerEvents),
                (w.body.style.pointerEvents = "none")),
              h.layersWithOutsidePointerEventsDisabled.add(b)),
            h.layers.add(b),
            Ah(),
            () => {
              c &&
                h.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (w.body.style.pointerEvents = wh);
            }
          );
      }, [b, w, c, h]),
      z.useEffect(
        () => () => {
          b &&
            (h.layers.delete(b),
            h.layersWithOutsidePointerEventsDisabled.delete(b),
            Ah());
        },
        [b, h]
      ),
      z.useEffect(() => {
        const Q = () => N({});
        return (
          document.addEventListener(Ic, Q),
          () => document.removeEventListener(Ic, Q)
        );
      }, []),
      y.jsx(Ja.div, {
        ...v,
        ref: R,
        style: {
          pointerEvents: K ? (F ? "auto" : "none") : void 0,
          ...o.style,
        },
        onFocusCapture: Qn(o.onFocusCapture, ee.onFocusCapture),
        onBlurCapture: Qn(o.onBlurCapture, ee.onBlurCapture),
        onPointerDownCapture: Qn(
          o.onPointerDownCapture,
          I.onPointerDownCapture
        ),
      })
    );
  });
cp.displayName = Ey;
var wy = "DismissableLayerBranch",
  Ay = z.forwardRef((o, s) => {
    const c = z.useContext(rp),
      r = z.useRef(null),
      f = Ka(s, r);
    return (
      z.useEffect(() => {
        const d = r.current;
        if (d)
          return (
            c.branches.add(d),
            () => {
              c.branches.delete(d);
            }
          );
      }, [c.branches]),
      y.jsx(Ja.div, { ...o, ref: f })
    );
  });
Ay.displayName = wy;
function Ny(o, s = globalThis?.document) {
  const c = ys(o),
    r = z.useRef(!1),
    f = z.useRef(() => {});
  return (
    z.useEffect(() => {
      const d = x => {
          if (x.target && !r.current) {
            let v = function () {
              up(Cy, c, h, { discrete: !0 });
            };
            const h = { originalEvent: x };
            x.pointerType === "touch"
              ? (s.removeEventListener("click", f.current),
                (f.current = v),
                s.addEventListener("click", f.current, { once: !0 }))
              : v();
          } else s.removeEventListener("click", f.current);
          r.current = !1;
        },
        g = window.setTimeout(() => {
          s.addEventListener("pointerdown", d);
        }, 0);
      return () => {
        (window.clearTimeout(g),
          s.removeEventListener("pointerdown", d),
          s.removeEventListener("click", f.current));
      };
    }, [s, c]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function zy(o, s = globalThis?.document) {
  const c = ys(o),
    r = z.useRef(!1);
  return (
    z.useEffect(() => {
      const f = d => {
        d.target &&
          !r.current &&
          up(Ty, c, { originalEvent: d }, { discrete: !1 });
      };
      return (
        s.addEventListener("focusin", f),
        () => s.removeEventListener("focusin", f)
      );
    }, [s, c]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function Ah() {
  const o = new CustomEvent(Ic);
  document.dispatchEvent(o);
}
function up(o, s, c, { discrete: r }) {
  const f = c.originalEvent.target,
    d = new CustomEvent(o, { bubbles: !1, cancelable: !0, detail: c });
  (s && f.addEventListener(o, s, { once: !0 }),
    r ? xy(f, d) : f.dispatchEvent(d));
}
var ko = globalThis?.document ? z.useLayoutEffect : () => {};
const Oy = ["top", "right", "bottom", "left"],
  Ea = Math.min,
  kt = Math.max,
  ms = Math.round,
  rs = Math.floor,
  xn = o => ({ x: o, y: o }),
  My = { left: "right", right: "left", bottom: "top", top: "bottom" },
  jy = { start: "end", end: "start" };
function eu(o, s, c) {
  return kt(o, Ea(s, c));
}
function Zn(o, s) {
  return typeof o == "function" ? o(s) : o;
}
function Kn(o) {
  return o.split("-")[0];
}
function Vl(o) {
  return o.split("-")[1];
}
function cu(o) {
  return o === "x" ? "y" : "x";
}
function uu(o) {
  return o === "y" ? "height" : "width";
}
const Ry = new Set(["top", "bottom"]);
function bn(o) {
  return Ry.has(Kn(o)) ? "y" : "x";
}
function fu(o) {
  return cu(bn(o));
}
function _y(o, s, c) {
  c === void 0 && (c = !1);
  const r = Vl(o),
    f = fu(o),
    d = uu(f);
  let g =
    f === "x"
      ? r === (c ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
        ? "bottom"
        : "top";
  return (s.reference[d] > s.floating[d] && (g = hs(g)), [g, hs(g)]);
}
function Dy(o) {
  const s = hs(o);
  return [tu(o), s, tu(s)];
}
function tu(o) {
  return o.replace(/start|end/g, s => jy[s]);
}
const Nh = ["left", "right"],
  zh = ["right", "left"],
  Gy = ["top", "bottom"],
  Uy = ["bottom", "top"];
function Hy(o, s, c) {
  switch (o) {
    case "top":
    case "bottom":
      return c ? (s ? zh : Nh) : s ? Nh : zh;
    case "left":
    case "right":
      return s ? Gy : Uy;
    default:
      return [];
  }
}
function By(o, s, c, r) {
  const f = Vl(o);
  let d = Hy(Kn(o), c === "start", r);
  return (
    f && ((d = d.map(g => g + "-" + f)), s && (d = d.concat(d.map(tu)))),
    d
  );
}
function hs(o) {
  return o.replace(/left|right|bottom|top/g, s => My[s]);
}
function qy(o) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...o };
}
function fp(o) {
  return typeof o != "number"
    ? qy(o)
    : { top: o, right: o, bottom: o, left: o };
}
function ps(o) {
  const { x: s, y: c, width: r, height: f } = o;
  return {
    width: r,
    height: f,
    top: c,
    left: s,
    right: s + r,
    bottom: c + f,
    x: s,
    y: c,
  };
}
function Oh(o, s, c) {
  let { reference: r, floating: f } = o;
  const d = bn(s),
    g = fu(s),
    x = uu(g),
    v = Kn(s),
    h = d === "y",
    b = r.x + r.width / 2 - f.width / 2,
    m = r.y + r.height / 2 - f.height / 2,
    w = r[x] / 2 - f[x] / 2;
  let N;
  switch (v) {
    case "top":
      N = { x: b, y: r.y - f.height };
      break;
    case "bottom":
      N = { x: b, y: r.y + r.height };
      break;
    case "right":
      N = { x: r.x + r.width, y: m };
      break;
    case "left":
      N = { x: r.x - f.width, y: m };
      break;
    default:
      N = { x: r.x, y: r.y };
  }
  switch (Vl(s)) {
    case "start":
      N[g] -= w * (c && h ? -1 : 1);
      break;
    case "end":
      N[g] += w * (c && h ? -1 : 1);
      break;
  }
  return N;
}
const Ly = async (o, s, c) => {
  const {
      placement: r = "bottom",
      strategy: f = "absolute",
      middleware: d = [],
      platform: g,
    } = c,
    x = d.filter(Boolean),
    v = await (g.isRTL == null ? void 0 : g.isRTL(s));
  let h = await g.getElementRects({ reference: o, floating: s, strategy: f }),
    { x: b, y: m } = Oh(h, r, v),
    w = r,
    N = {},
    R = 0;
  for (let B = 0; B < x.length; B++) {
    const { name: k, fn: L } = x[B],
      {
        x: P,
        y: K,
        data: F,
        reset: I,
      } = await L({
        x: b,
        y: m,
        initialPlacement: r,
        placement: w,
        strategy: f,
        middlewareData: N,
        rects: h,
        platform: g,
        elements: { reference: o, floating: s },
      });
    ((b = P ?? b),
      (m = K ?? m),
      (N = { ...N, [k]: { ...N[k], ...F } }),
      I &&
        R <= 50 &&
        (R++,
        typeof I == "object" &&
          (I.placement && (w = I.placement),
          I.rects &&
            (h =
              I.rects === !0
                ? await g.getElementRects({
                    reference: o,
                    floating: s,
                    strategy: f,
                  })
                : I.rects),
          ({ x: b, y: m } = Oh(h, w, v))),
        (B = -1)));
  }
  return { x: b, y: m, placement: w, strategy: f, middlewareData: N };
};
async function Xo(o, s) {
  var c;
  s === void 0 && (s = {});
  const { x: r, y: f, platform: d, rects: g, elements: x, strategy: v } = o,
    {
      boundary: h = "clippingAncestors",
      rootBoundary: b = "viewport",
      elementContext: m = "floating",
      altBoundary: w = !1,
      padding: N = 0,
    } = Zn(s, o),
    R = fp(N),
    k = x[w ? (m === "floating" ? "reference" : "floating") : m],
    L = ps(
      await d.getClippingRect({
        element:
          (c = await (d.isElement == null ? void 0 : d.isElement(k))) == null ||
          c
            ? k
            : k.contextElement ||
              (await (d.getDocumentElement == null
                ? void 0
                : d.getDocumentElement(x.floating))),
        boundary: h,
        rootBoundary: b,
        strategy: v,
      })
    ),
    P =
      m === "floating"
        ? { x: r, y: f, width: g.floating.width, height: g.floating.height }
        : g.reference,
    K = await (d.getOffsetParent == null
      ? void 0
      : d.getOffsetParent(x.floating)),
    F = (await (d.isElement == null ? void 0 : d.isElement(K)))
      ? (await (d.getScale == null ? void 0 : d.getScale(K))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    I = ps(
      d.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await d.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: x,
            rect: P,
            offsetParent: K,
            strategy: v,
          })
        : P
    );
  return {
    top: (L.top - I.top + R.top) / F.y,
    bottom: (I.bottom - L.bottom + R.bottom) / F.y,
    left: (L.left - I.left + R.left) / F.x,
    right: (I.right - L.right + R.right) / F.x,
  };
}
const Yy = o => ({
    name: "arrow",
    options: o,
    async fn(s) {
      const {
          x: c,
          y: r,
          placement: f,
          rects: d,
          platform: g,
          elements: x,
          middlewareData: v,
        } = s,
        { element: h, padding: b = 0 } = Zn(o, s) || {};
      if (h == null) return {};
      const m = fp(b),
        w = { x: c, y: r },
        N = fu(f),
        R = uu(N),
        B = await g.getDimensions(h),
        k = N === "y",
        L = k ? "top" : "left",
        P = k ? "bottom" : "right",
        K = k ? "clientHeight" : "clientWidth",
        F = d.reference[R] + d.reference[N] - w[N] - d.floating[R],
        I = w[N] - d.reference[N],
        ee = await (g.getOffsetParent == null ? void 0 : g.getOffsetParent(h));
      let Q = ee ? ee[K] : 0;
      (!Q || !(await (g.isElement == null ? void 0 : g.isElement(ee)))) &&
        (Q = x.floating[K] || d.floating[R]);
      const Z = F / 2 - I / 2,
        pe = Q / 2 - B[R] / 2 - 1,
        Ce = Ea(m[L], pe),
        we = Ea(m[P], pe),
        ge = Ce,
        be = Q - B[R] - we,
        ve = Q / 2 - B[R] / 2 + Z,
        Se = eu(ge, ve, be),
        T =
          !v.arrow &&
          Vl(f) != null &&
          ve !== Se &&
          d.reference[R] / 2 - (ve < ge ? Ce : we) - B[R] / 2 < 0,
        U = T ? (ve < ge ? ve - ge : ve - be) : 0;
      return {
        [N]: w[N] + U,
        data: {
          [N]: Se,
          centerOffset: ve - Se - U,
          ...(T && { alignmentOffset: U }),
        },
        reset: T,
      };
    },
  }),
  Vy = function (o) {
    return (
      o === void 0 && (o = {}),
      {
        name: "flip",
        options: o,
        async fn(s) {
          var c, r;
          const {
              placement: f,
              middlewareData: d,
              rects: g,
              initialPlacement: x,
              platform: v,
              elements: h,
            } = s,
            {
              mainAxis: b = !0,
              crossAxis: m = !0,
              fallbackPlacements: w,
              fallbackStrategy: N = "bestFit",
              fallbackAxisSideDirection: R = "none",
              flipAlignment: B = !0,
              ...k
            } = Zn(o, s);
          if ((c = d.arrow) != null && c.alignmentOffset) return {};
          const L = Kn(f),
            P = bn(x),
            K = Kn(x) === x,
            F = await (v.isRTL == null ? void 0 : v.isRTL(h.floating)),
            I = w || (K || !B ? [hs(x)] : Dy(x)),
            ee = R !== "none";
          !w && ee && I.push(...By(x, B, R, F));
          const Q = [x, ...I],
            Z = await Xo(s, k),
            pe = [];
          let Ce = ((r = d.flip) == null ? void 0 : r.overflows) || [];
          if ((b && pe.push(Z[L]), m)) {
            const ve = _y(f, g, F);
            pe.push(Z[ve[0]], Z[ve[1]]);
          }
          if (
            ((Ce = [...Ce, { placement: f, overflows: pe }]),
            !pe.every(ve => ve <= 0))
          ) {
            var we, ge;
            const ve = (((we = d.flip) == null ? void 0 : we.index) || 0) + 1,
              Se = Q[ve];
            if (
              Se &&
              (!(m === "alignment" ? P !== bn(Se) : !1) ||
                Ce.every(_ =>
                  bn(_.placement) === P ? _.overflows[0] > 0 : !0
                ))
            )
              return {
                data: { index: ve, overflows: Ce },
                reset: { placement: Se },
              };
            let T =
              (ge = Ce.filter(U => U.overflows[0] <= 0).sort(
                (U, _) => U.overflows[1] - _.overflows[1]
              )[0]) == null
                ? void 0
                : ge.placement;
            if (!T)
              switch (N) {
                case "bestFit": {
                  var be;
                  const U =
                    (be = Ce.filter(_ => {
                      if (ee) {
                        const oe = bn(_.placement);
                        return oe === P || oe === "y";
                      }
                      return !0;
                    })
                      .map(_ => [
                        _.placement,
                        _.overflows
                          .filter(oe => oe > 0)
                          .reduce((oe, se) => oe + se, 0),
                      ])
                      .sort((_, oe) => _[1] - oe[1])[0]) == null
                      ? void 0
                      : be[0];
                  U && (T = U);
                  break;
                }
                case "initialPlacement":
                  T = x;
                  break;
              }
            if (f !== T) return { reset: { placement: T } };
          }
          return {};
        },
      }
    );
  };
function Mh(o, s) {
  return {
    top: o.top - s.height,
    right: o.right - s.width,
    bottom: o.bottom - s.height,
    left: o.left - s.width,
  };
}
function jh(o) {
  return Oy.some(s => o[s] >= 0);
}
const ky = function (o) {
    return (
      o === void 0 && (o = {}),
      {
        name: "hide",
        options: o,
        async fn(s) {
          const { rects: c } = s,
            { strategy: r = "referenceHidden", ...f } = Zn(o, s);
          switch (r) {
            case "referenceHidden": {
              const d = await Xo(s, { ...f, elementContext: "reference" }),
                g = Mh(d, c.reference);
              return {
                data: { referenceHiddenOffsets: g, referenceHidden: jh(g) },
              };
            }
            case "escaped": {
              const d = await Xo(s, { ...f, altBoundary: !0 }),
                g = Mh(d, c.floating);
              return { data: { escapedOffsets: g, escaped: jh(g) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  dp = new Set(["left", "top"]);
async function Xy(o, s) {
  const { placement: c, platform: r, elements: f } = o,
    d = await (r.isRTL == null ? void 0 : r.isRTL(f.floating)),
    g = Kn(c),
    x = Vl(c),
    v = bn(c) === "y",
    h = dp.has(g) ? -1 : 1,
    b = d && v ? -1 : 1,
    m = Zn(s, o);
  let {
    mainAxis: w,
    crossAxis: N,
    alignmentAxis: R,
  } = typeof m == "number"
    ? { mainAxis: m, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: m.mainAxis || 0,
        crossAxis: m.crossAxis || 0,
        alignmentAxis: m.alignmentAxis,
      };
  return (
    x && typeof R == "number" && (N = x === "end" ? R * -1 : R),
    v ? { x: N * b, y: w * h } : { x: w * h, y: N * b }
  );
}
const Qy = function (o) {
    return (
      o === void 0 && (o = 0),
      {
        name: "offset",
        options: o,
        async fn(s) {
          var c, r;
          const { x: f, y: d, placement: g, middlewareData: x } = s,
            v = await Xy(s, o);
          return g === ((c = x.offset) == null ? void 0 : c.placement) &&
            (r = x.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: f + v.x, y: d + v.y, data: { ...v, placement: g } };
        },
      }
    );
  },
  Zy = function (o) {
    return (
      o === void 0 && (o = {}),
      {
        name: "shift",
        options: o,
        async fn(s) {
          const { x: c, y: r, placement: f } = s,
            {
              mainAxis: d = !0,
              crossAxis: g = !1,
              limiter: x = {
                fn: k => {
                  let { x: L, y: P } = k;
                  return { x: L, y: P };
                },
              },
              ...v
            } = Zn(o, s),
            h = { x: c, y: r },
            b = await Xo(s, v),
            m = bn(Kn(f)),
            w = cu(m);
          let N = h[w],
            R = h[m];
          if (d) {
            const k = w === "y" ? "top" : "left",
              L = w === "y" ? "bottom" : "right",
              P = N + b[k],
              K = N - b[L];
            N = eu(P, N, K);
          }
          if (g) {
            const k = m === "y" ? "top" : "left",
              L = m === "y" ? "bottom" : "right",
              P = R + b[k],
              K = R - b[L];
            R = eu(P, R, K);
          }
          const B = x.fn({ ...s, [w]: N, [m]: R });
          return {
            ...B,
            data: { x: B.x - c, y: B.y - r, enabled: { [w]: d, [m]: g } },
          };
        },
      }
    );
  },
  Ky = function (o) {
    return (
      o === void 0 && (o = {}),
      {
        options: o,
        fn(s) {
          const { x: c, y: r, placement: f, rects: d, middlewareData: g } = s,
            { offset: x = 0, mainAxis: v = !0, crossAxis: h = !0 } = Zn(o, s),
            b = { x: c, y: r },
            m = bn(f),
            w = cu(m);
          let N = b[w],
            R = b[m];
          const B = Zn(x, s),
            k =
              typeof B == "number"
                ? { mainAxis: B, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...B };
          if (v) {
            const K = w === "y" ? "height" : "width",
              F = d.reference[w] - d.floating[K] + k.mainAxis,
              I = d.reference[w] + d.reference[K] - k.mainAxis;
            N < F ? (N = F) : N > I && (N = I);
          }
          if (h) {
            var L, P;
            const K = w === "y" ? "width" : "height",
              F = dp.has(Kn(f)),
              I =
                d.reference[m] -
                d.floating[K] +
                ((F && ((L = g.offset) == null ? void 0 : L[m])) || 0) +
                (F ? 0 : k.crossAxis),
              ee =
                d.reference[m] +
                d.reference[K] +
                (F ? 0 : ((P = g.offset) == null ? void 0 : P[m]) || 0) -
                (F ? k.crossAxis : 0);
            R < I ? (R = I) : R > ee && (R = ee);
          }
          return { [w]: N, [m]: R };
        },
      }
    );
  },
  Jy = function (o) {
    return (
      o === void 0 && (o = {}),
      {
        name: "size",
        options: o,
        async fn(s) {
          var c, r;
          const { placement: f, rects: d, platform: g, elements: x } = s,
            { apply: v = () => {}, ...h } = Zn(o, s),
            b = await Xo(s, h),
            m = Kn(f),
            w = Vl(f),
            N = bn(f) === "y",
            { width: R, height: B } = d.floating;
          let k, L;
          m === "top" || m === "bottom"
            ? ((k = m),
              (L =
                w ===
                ((await (g.isRTL == null ? void 0 : g.isRTL(x.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((L = m), (k = w === "end" ? "top" : "bottom"));
          const P = B - b.top - b.bottom,
            K = R - b.left - b.right,
            F = Ea(B - b[k], P),
            I = Ea(R - b[L], K),
            ee = !s.middlewareData.shift;
          let Q = F,
            Z = I;
          if (
            ((c = s.middlewareData.shift) != null && c.enabled.x && (Z = K),
            (r = s.middlewareData.shift) != null && r.enabled.y && (Q = P),
            ee && !w)
          ) {
            const Ce = kt(b.left, 0),
              we = kt(b.right, 0),
              ge = kt(b.top, 0),
              be = kt(b.bottom, 0);
            N
              ? (Z =
                  R -
                  2 * (Ce !== 0 || we !== 0 ? Ce + we : kt(b.left, b.right)))
              : (Q =
                  B -
                  2 * (ge !== 0 || be !== 0 ? ge + be : kt(b.top, b.bottom)));
          }
          await v({ ...s, availableWidth: Z, availableHeight: Q });
          const pe = await g.getDimensions(x.floating);
          return R !== pe.width || B !== pe.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function bs() {
  return typeof window < "u";
}
function kl(o) {
  return mp(o) ? (o.nodeName || "").toLowerCase() : "#document";
}
function Xt(o) {
  var s;
  return (
    (o == null || (s = o.ownerDocument) == null ? void 0 : s.defaultView) ||
    window
  );
}
function En(o) {
  var s;
  return (s = (mp(o) ? o.ownerDocument : o.document) || window.document) == null
    ? void 0
    : s.documentElement;
}
function mp(o) {
  return bs() ? o instanceof Node || o instanceof Xt(o).Node : !1;
}
function cn(o) {
  return bs() ? o instanceof Element || o instanceof Xt(o).Element : !1;
}
function Sn(o) {
  return bs() ? o instanceof HTMLElement || o instanceof Xt(o).HTMLElement : !1;
}
function Rh(o) {
  return !bs() || typeof ShadowRoot > "u"
    ? !1
    : o instanceof ShadowRoot || o instanceof Xt(o).ShadowRoot;
}
const $y = new Set(["inline", "contents"]);
function Zo(o) {
  const { overflow: s, overflowX: c, overflowY: r, display: f } = un(o);
  return /auto|scroll|overlay|hidden|clip/.test(s + r + c) && !$y.has(f);
}
const Fy = new Set(["table", "td", "th"]);
function Wy(o) {
  return Fy.has(kl(o));
}
const Py = [":popover-open", ":modal"];
function xs(o) {
  return Py.some(s => {
    try {
      return o.matches(s);
    } catch {
      return !1;
    }
  });
}
const Iy = ["transform", "translate", "scale", "rotate", "perspective"],
  eb = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  tb = ["paint", "layout", "strict", "content"];
function du(o) {
  const s = mu(),
    c = cn(o) ? un(o) : o;
  return (
    Iy.some(r => (c[r] ? c[r] !== "none" : !1)) ||
    (c.containerType ? c.containerType !== "normal" : !1) ||
    (!s && (c.backdropFilter ? c.backdropFilter !== "none" : !1)) ||
    (!s && (c.filter ? c.filter !== "none" : !1)) ||
    eb.some(r => (c.willChange || "").includes(r)) ||
    tb.some(r => (c.contain || "").includes(r))
  );
}
function nb(o) {
  let s = Ca(o);
  for (; Sn(s) && !Ll(s); ) {
    if (du(s)) return s;
    if (xs(s)) return null;
    s = Ca(s);
  }
  return null;
}
function mu() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const ab = new Set(["html", "body", "#document"]);
function Ll(o) {
  return ab.has(kl(o));
}
function un(o) {
  return Xt(o).getComputedStyle(o);
}
function Ss(o) {
  return cn(o)
    ? { scrollLeft: o.scrollLeft, scrollTop: o.scrollTop }
    : { scrollLeft: o.scrollX, scrollTop: o.scrollY };
}
function Ca(o) {
  if (kl(o) === "html") return o;
  const s = o.assignedSlot || o.parentNode || (Rh(o) && o.host) || En(o);
  return Rh(s) ? s.host : s;
}
function hp(o) {
  const s = Ca(o);
  return Ll(s)
    ? o.ownerDocument
      ? o.ownerDocument.body
      : o.body
    : Sn(s) && Zo(s)
      ? s
      : hp(s);
}
function Qo(o, s, c) {
  var r;
  (s === void 0 && (s = []), c === void 0 && (c = !0));
  const f = hp(o),
    d = f === ((r = o.ownerDocument) == null ? void 0 : r.body),
    g = Xt(f);
  if (d) {
    const x = nu(g);
    return s.concat(
      g,
      g.visualViewport || [],
      Zo(f) ? f : [],
      x && c ? Qo(x) : []
    );
  }
  return s.concat(f, Qo(f, [], c));
}
function nu(o) {
  return o.parent && Object.getPrototypeOf(o.parent) ? o.frameElement : null;
}
function pp(o) {
  const s = un(o);
  let c = parseFloat(s.width) || 0,
    r = parseFloat(s.height) || 0;
  const f = Sn(o),
    d = f ? o.offsetWidth : c,
    g = f ? o.offsetHeight : r,
    x = ms(c) !== d || ms(r) !== g;
  return (x && ((c = d), (r = g)), { width: c, height: r, $: x });
}
function hu(o) {
  return cn(o) ? o : o.contextElement;
}
function ql(o) {
  const s = hu(o);
  if (!Sn(s)) return xn(1);
  const c = s.getBoundingClientRect(),
    { width: r, height: f, $: d } = pp(s);
  let g = (d ? ms(c.width) : c.width) / r,
    x = (d ? ms(c.height) : c.height) / f;
  return (
    (!g || !Number.isFinite(g)) && (g = 1),
    (!x || !Number.isFinite(x)) && (x = 1),
    { x: g, y: x }
  );
}
const lb = xn(0);
function gp(o) {
  const s = Xt(o);
  return !mu() || !s.visualViewport
    ? lb
    : { x: s.visualViewport.offsetLeft, y: s.visualViewport.offsetTop };
}
function ob(o, s, c) {
  return (s === void 0 && (s = !1), !c || (s && c !== Xt(o)) ? !1 : s);
}
function Za(o, s, c, r) {
  (s === void 0 && (s = !1), c === void 0 && (c = !1));
  const f = o.getBoundingClientRect(),
    d = hu(o);
  let g = xn(1);
  s && (r ? cn(r) && (g = ql(r)) : (g = ql(o)));
  const x = ob(d, c, r) ? gp(d) : xn(0);
  let v = (f.left + x.x) / g.x,
    h = (f.top + x.y) / g.y,
    b = f.width / g.x,
    m = f.height / g.y;
  if (d) {
    const w = Xt(d),
      N = r && cn(r) ? Xt(r) : r;
    let R = w,
      B = nu(R);
    for (; B && r && N !== R; ) {
      const k = ql(B),
        L = B.getBoundingClientRect(),
        P = un(B),
        K = L.left + (B.clientLeft + parseFloat(P.paddingLeft)) * k.x,
        F = L.top + (B.clientTop + parseFloat(P.paddingTop)) * k.y;
      ((v *= k.x),
        (h *= k.y),
        (b *= k.x),
        (m *= k.y),
        (v += K),
        (h += F),
        (R = Xt(B)),
        (B = nu(R)));
    }
  }
  return ps({ width: b, height: m, x: v, y: h });
}
function Es(o, s) {
  const c = Ss(o).scrollLeft;
  return s ? s.left + c : Za(En(o)).left + c;
}
function vp(o, s) {
  const c = o.getBoundingClientRect(),
    r = c.left + s.scrollLeft - Es(o, c),
    f = c.top + s.scrollTop;
  return { x: r, y: f };
}
function ib(o) {
  let { elements: s, rect: c, offsetParent: r, strategy: f } = o;
  const d = f === "fixed",
    g = En(r),
    x = s ? xs(s.floating) : !1;
  if (r === g || (x && d)) return c;
  let v = { scrollLeft: 0, scrollTop: 0 },
    h = xn(1);
  const b = xn(0),
    m = Sn(r);
  if (
    (m || (!m && !d)) &&
    ((kl(r) !== "body" || Zo(g)) && (v = Ss(r)), Sn(r))
  ) {
    const N = Za(r);
    ((h = ql(r)), (b.x = N.x + r.clientLeft), (b.y = N.y + r.clientTop));
  }
  const w = g && !m && !d ? vp(g, v) : xn(0);
  return {
    width: c.width * h.x,
    height: c.height * h.y,
    x: c.x * h.x - v.scrollLeft * h.x + b.x + w.x,
    y: c.y * h.y - v.scrollTop * h.y + b.y + w.y,
  };
}
function sb(o) {
  return Array.from(o.getClientRects());
}
function rb(o) {
  const s = En(o),
    c = Ss(o),
    r = o.ownerDocument.body,
    f = kt(s.scrollWidth, s.clientWidth, r.scrollWidth, r.clientWidth),
    d = kt(s.scrollHeight, s.clientHeight, r.scrollHeight, r.clientHeight);
  let g = -c.scrollLeft + Es(o);
  const x = -c.scrollTop;
  return (
    un(r).direction === "rtl" && (g += kt(s.clientWidth, r.clientWidth) - f),
    { width: f, height: d, x: g, y: x }
  );
}
const _h = 25;
function cb(o, s) {
  const c = Xt(o),
    r = En(o),
    f = c.visualViewport;
  let d = r.clientWidth,
    g = r.clientHeight,
    x = 0,
    v = 0;
  if (f) {
    ((d = f.width), (g = f.height));
    const b = mu();
    (!b || (b && s === "fixed")) && ((x = f.offsetLeft), (v = f.offsetTop));
  }
  const h = Es(r);
  if (h <= 0) {
    const b = r.ownerDocument,
      m = b.body,
      w = getComputedStyle(m),
      N =
        (b.compatMode === "CSS1Compat" &&
          parseFloat(w.marginLeft) + parseFloat(w.marginRight)) ||
        0,
      R = Math.abs(r.clientWidth - m.clientWidth - N);
    R <= _h && (d -= R);
  } else h <= _h && (d += h);
  return { width: d, height: g, x, y: v };
}
const ub = new Set(["absolute", "fixed"]);
function fb(o, s) {
  const c = Za(o, !0, s === "fixed"),
    r = c.top + o.clientTop,
    f = c.left + o.clientLeft,
    d = Sn(o) ? ql(o) : xn(1),
    g = o.clientWidth * d.x,
    x = o.clientHeight * d.y,
    v = f * d.x,
    h = r * d.y;
  return { width: g, height: x, x: v, y: h };
}
function Dh(o, s, c) {
  let r;
  if (s === "viewport") r = cb(o, c);
  else if (s === "document") r = rb(En(o));
  else if (cn(s)) r = fb(s, c);
  else {
    const f = gp(o);
    r = { x: s.x - f.x, y: s.y - f.y, width: s.width, height: s.height };
  }
  return ps(r);
}
function yp(o, s) {
  const c = Ca(o);
  return c === s || !cn(c) || Ll(c)
    ? !1
    : un(c).position === "fixed" || yp(c, s);
}
function db(o, s) {
  const c = s.get(o);
  if (c) return c;
  let r = Qo(o, [], !1).filter(x => cn(x) && kl(x) !== "body"),
    f = null;
  const d = un(o).position === "fixed";
  let g = d ? Ca(o) : o;
  for (; cn(g) && !Ll(g); ) {
    const x = un(g),
      v = du(g);
    (!v && x.position === "fixed" && (f = null),
      (
        d
          ? !v && !f
          : (!v && x.position === "static" && !!f && ub.has(f.position)) ||
            (Zo(g) && !v && yp(o, g))
      )
        ? (r = r.filter(b => b !== g))
        : (f = x),
      (g = Ca(g)));
  }
  return (s.set(o, r), r);
}
function mb(o) {
  let { element: s, boundary: c, rootBoundary: r, strategy: f } = o;
  const g = [
      ...(c === "clippingAncestors"
        ? xs(s)
          ? []
          : db(s, this._c)
        : [].concat(c)),
      r,
    ],
    x = g[0],
    v = g.reduce(
      (h, b) => {
        const m = Dh(s, b, f);
        return (
          (h.top = kt(m.top, h.top)),
          (h.right = Ea(m.right, h.right)),
          (h.bottom = Ea(m.bottom, h.bottom)),
          (h.left = kt(m.left, h.left)),
          h
        );
      },
      Dh(s, x, f)
    );
  return {
    width: v.right - v.left,
    height: v.bottom - v.top,
    x: v.left,
    y: v.top,
  };
}
function hb(o) {
  const { width: s, height: c } = pp(o);
  return { width: s, height: c };
}
function pb(o, s, c) {
  const r = Sn(s),
    f = En(s),
    d = c === "fixed",
    g = Za(o, !0, d, s);
  let x = { scrollLeft: 0, scrollTop: 0 };
  const v = xn(0);
  function h() {
    v.x = Es(f);
  }
  if (r || (!r && !d))
    if (((kl(s) !== "body" || Zo(f)) && (x = Ss(s)), r)) {
      const N = Za(s, !0, d, s);
      ((v.x = N.x + s.clientLeft), (v.y = N.y + s.clientTop));
    } else f && h();
  d && !r && f && h();
  const b = f && !r && !d ? vp(f, x) : xn(0),
    m = g.left + x.scrollLeft - v.x - b.x,
    w = g.top + x.scrollTop - v.y - b.y;
  return { x: m, y: w, width: g.width, height: g.height };
}
function Qc(o) {
  return un(o).position === "static";
}
function Gh(o, s) {
  if (!Sn(o) || un(o).position === "fixed") return null;
  if (s) return s(o);
  let c = o.offsetParent;
  return (En(o) === c && (c = c.ownerDocument.body), c);
}
function bp(o, s) {
  const c = Xt(o);
  if (xs(o)) return c;
  if (!Sn(o)) {
    let f = Ca(o);
    for (; f && !Ll(f); ) {
      if (cn(f) && !Qc(f)) return f;
      f = Ca(f);
    }
    return c;
  }
  let r = Gh(o, s);
  for (; r && Wy(r) && Qc(r); ) r = Gh(r, s);
  return r && Ll(r) && Qc(r) && !du(r) ? c : r || nb(o) || c;
}
const gb = async function (o) {
  const s = this.getOffsetParent || bp,
    c = this.getDimensions,
    r = await c(o.floating);
  return {
    reference: pb(o.reference, await s(o.floating), o.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function vb(o) {
  return un(o).direction === "rtl";
}
const yb = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ib,
  getDocumentElement: En,
  getClippingRect: mb,
  getOffsetParent: bp,
  getElementRects: gb,
  getClientRects: sb,
  getDimensions: hb,
  getScale: ql,
  isElement: cn,
  isRTL: vb,
};
function xp(o, s) {
  return (
    o.x === s.x && o.y === s.y && o.width === s.width && o.height === s.height
  );
}
function bb(o, s) {
  let c = null,
    r;
  const f = En(o);
  function d() {
    var x;
    (clearTimeout(r), (x = c) == null || x.disconnect(), (c = null));
  }
  function g(x, v) {
    (x === void 0 && (x = !1), v === void 0 && (v = 1), d());
    const h = o.getBoundingClientRect(),
      { left: b, top: m, width: w, height: N } = h;
    if ((x || s(), !w || !N)) return;
    const R = rs(m),
      B = rs(f.clientWidth - (b + w)),
      k = rs(f.clientHeight - (m + N)),
      L = rs(b),
      K = {
        rootMargin: -R + "px " + -B + "px " + -k + "px " + -L + "px",
        threshold: kt(0, Ea(1, v)) || 1,
      };
    let F = !0;
    function I(ee) {
      const Q = ee[0].intersectionRatio;
      if (Q !== v) {
        if (!F) return g();
        Q
          ? g(!1, Q)
          : (r = setTimeout(() => {
              g(!1, 1e-7);
            }, 1e3));
      }
      (Q === 1 && !xp(h, o.getBoundingClientRect()) && g(), (F = !1));
    }
    try {
      c = new IntersectionObserver(I, { ...K, root: f.ownerDocument });
    } catch {
      c = new IntersectionObserver(I, K);
    }
    c.observe(o);
  }
  return (g(!0), d);
}
function xb(o, s, c, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: f = !0,
      ancestorResize: d = !0,
      elementResize: g = typeof ResizeObserver == "function",
      layoutShift: x = typeof IntersectionObserver == "function",
      animationFrame: v = !1,
    } = r,
    h = hu(o),
    b = f || d ? [...(h ? Qo(h) : []), ...Qo(s)] : [];
  b.forEach(L => {
    (f && L.addEventListener("scroll", c, { passive: !0 }),
      d && L.addEventListener("resize", c));
  });
  const m = h && x ? bb(h, c) : null;
  let w = -1,
    N = null;
  g &&
    ((N = new ResizeObserver(L => {
      let [P] = L;
      (P &&
        P.target === h &&
        N &&
        (N.unobserve(s),
        cancelAnimationFrame(w),
        (w = requestAnimationFrame(() => {
          var K;
          (K = N) == null || K.observe(s);
        }))),
        c());
    })),
    h && !v && N.observe(h),
    N.observe(s));
  let R,
    B = v ? Za(o) : null;
  v && k();
  function k() {
    const L = Za(o);
    (B && !xp(B, L) && c(), (B = L), (R = requestAnimationFrame(k)));
  }
  return (
    c(),
    () => {
      var L;
      (b.forEach(P => {
        (f && P.removeEventListener("scroll", c),
          d && P.removeEventListener("resize", c));
      }),
        m?.(),
        (L = N) == null || L.disconnect(),
        (N = null),
        v && cancelAnimationFrame(R));
    }
  );
}
const Sb = Qy,
  Eb = Zy,
  Cb = Vy,
  Tb = Jy,
  wb = ky,
  Uh = Yy,
  Ab = Ky,
  Nb = (o, s, c) => {
    const r = new Map(),
      f = { platform: yb, ...c },
      d = { ...f.platform, _c: r };
    return Ly(o, s, { ...f, platform: d });
  };
var zb = typeof document < "u",
  Ob = function () {},
  ds = zb ? z.useLayoutEffect : Ob;
function gs(o, s) {
  if (o === s) return !0;
  if (typeof o != typeof s) return !1;
  if (typeof o == "function" && o.toString() === s.toString()) return !0;
  let c, r, f;
  if (o && s && typeof o == "object") {
    if (Array.isArray(o)) {
      if (((c = o.length), c !== s.length)) return !1;
      for (r = c; r-- !== 0; ) if (!gs(o[r], s[r])) return !1;
      return !0;
    }
    if (((f = Object.keys(o)), (c = f.length), c !== Object.keys(s).length))
      return !1;
    for (r = c; r-- !== 0; ) if (!{}.hasOwnProperty.call(s, f[r])) return !1;
    for (r = c; r-- !== 0; ) {
      const d = f[r];
      if (!(d === "_owner" && o.$$typeof) && !gs(o[d], s[d])) return !1;
    }
    return !0;
  }
  return o !== o && s !== s;
}
function Sp(o) {
  return typeof window > "u"
    ? 1
    : (o.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Hh(o, s) {
  const c = Sp(o);
  return Math.round(s * c) / c;
}
function Zc(o) {
  const s = z.useRef(o);
  return (
    ds(() => {
      s.current = o;
    }),
    s
  );
}
function Mb(o) {
  o === void 0 && (o = {});
  const {
      placement: s = "bottom",
      strategy: c = "absolute",
      middleware: r = [],
      platform: f,
      elements: { reference: d, floating: g } = {},
      transform: x = !0,
      whileElementsMounted: v,
      open: h,
    } = o,
    [b, m] = z.useState({
      x: 0,
      y: 0,
      strategy: c,
      placement: s,
      middlewareData: {},
      isPositioned: !1,
    }),
    [w, N] = z.useState(r);
  gs(w, r) || N(r);
  const [R, B] = z.useState(null),
    [k, L] = z.useState(null),
    P = z.useCallback(_ => {
      _ !== ee.current && ((ee.current = _), B(_));
    }, []),
    K = z.useCallback(_ => {
      _ !== Q.current && ((Q.current = _), L(_));
    }, []),
    F = d || R,
    I = g || k,
    ee = z.useRef(null),
    Q = z.useRef(null),
    Z = z.useRef(b),
    pe = v != null,
    Ce = Zc(v),
    we = Zc(f),
    ge = Zc(h),
    be = z.useCallback(() => {
      if (!ee.current || !Q.current) return;
      const _ = { placement: s, strategy: c, middleware: w };
      (we.current && (_.platform = we.current),
        Nb(ee.current, Q.current, _).then(oe => {
          const se = { ...oe, isPositioned: ge.current !== !1 };
          ve.current &&
            !gs(Z.current, se) &&
            ((Z.current = se),
            ru.flushSync(() => {
              m(se);
            }));
        }));
    }, [w, s, c, we, ge]);
  ds(() => {
    h === !1 &&
      Z.current.isPositioned &&
      ((Z.current.isPositioned = !1), m(_ => ({ ..._, isPositioned: !1 })));
  }, [h]);
  const ve = z.useRef(!1);
  (ds(
    () => (
      (ve.current = !0),
      () => {
        ve.current = !1;
      }
    ),
    []
  ),
    ds(() => {
      if ((F && (ee.current = F), I && (Q.current = I), F && I)) {
        if (Ce.current) return Ce.current(F, I, be);
        be();
      }
    }, [F, I, be, Ce, pe]));
  const Se = z.useMemo(
      () => ({ reference: ee, floating: Q, setReference: P, setFloating: K }),
      [P, K]
    ),
    T = z.useMemo(() => ({ reference: F, floating: I }), [F, I]),
    U = z.useMemo(() => {
      const _ = { position: c, left: 0, top: 0 };
      if (!T.floating) return _;
      const oe = Hh(T.floating, b.x),
        se = Hh(T.floating, b.y);
      return x
        ? {
            ..._,
            transform: "translate(" + oe + "px, " + se + "px)",
            ...(Sp(T.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: c, left: oe, top: se };
    }, [c, x, T.floating, b.x, b.y]);
  return z.useMemo(
    () => ({ ...b, update: be, refs: Se, elements: T, floatingStyles: U }),
    [b, be, Se, T, U]
  );
}
const jb = o => {
    function s(c) {
      return {}.hasOwnProperty.call(c, "current");
    }
    return {
      name: "arrow",
      options: o,
      fn(c) {
        const { element: r, padding: f } = typeof o == "function" ? o(c) : o;
        return r && s(r)
          ? r.current != null
            ? Uh({ element: r.current, padding: f }).fn(c)
            : {}
          : r
            ? Uh({ element: r, padding: f }).fn(c)
            : {};
      },
    };
  },
  Rb = (o, s) => ({ ...Sb(o), options: [o, s] }),
  _b = (o, s) => ({ ...Eb(o), options: [o, s] }),
  Db = (o, s) => ({ ...Ab(o), options: [o, s] }),
  Gb = (o, s) => ({ ...Cb(o), options: [o, s] }),
  Ub = (o, s) => ({ ...Tb(o), options: [o, s] }),
  Hb = (o, s) => ({ ...wb(o), options: [o, s] }),
  Bb = (o, s) => ({ ...jb(o), options: [o, s] });
var qb = "Arrow",
  Ep = z.forwardRef((o, s) => {
    const { children: c, width: r = 10, height: f = 5, ...d } = o;
    return y.jsx(Ja.svg, {
      ...d,
      ref: s,
      width: r,
      height: f,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: o.asChild ? c : y.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Ep.displayName = qb;
var Lb = Ep;
function Yb(o) {
  const [s, c] = z.useState(void 0);
  return (
    ko(() => {
      if (o) {
        c({ width: o.offsetWidth, height: o.offsetHeight });
        const r = new ResizeObserver(f => {
          if (!Array.isArray(f) || !f.length) return;
          const d = f[0];
          let g, x;
          if ("borderBoxSize" in d) {
            const v = d.borderBoxSize,
              h = Array.isArray(v) ? v[0] : v;
            ((g = h.inlineSize), (x = h.blockSize));
          } else ((g = o.offsetWidth), (x = o.offsetHeight));
          c({ width: g, height: x });
        });
        return (r.observe(o, { box: "border-box" }), () => r.unobserve(o));
      } else c(void 0);
    }, [o]),
    s
  );
}
var Cp = "Popper",
  [Tp, wp] = op(Cp),
  [$1, Ap] = Tp(Cp),
  Np = "PopperAnchor",
  zp = z.forwardRef((o, s) => {
    const { __scopePopper: c, virtualRef: r, ...f } = o,
      d = Ap(Np, c),
      g = z.useRef(null),
      x = Ka(s, g),
      v = z.useRef(null);
    return (
      z.useEffect(() => {
        const h = v.current;
        ((v.current = r?.current || g.current),
          h !== v.current && d.onAnchorChange(v.current));
      }),
      r ? null : y.jsx(Ja.div, { ...f, ref: x })
    );
  });
zp.displayName = Np;
var pu = "PopperContent",
  [Vb, kb] = Tp(pu),
  Op = z.forwardRef((o, s) => {
    const {
        __scopePopper: c,
        side: r = "bottom",
        sideOffset: f = 0,
        align: d = "center",
        alignOffset: g = 0,
        arrowPadding: x = 0,
        avoidCollisions: v = !0,
        collisionBoundary: h = [],
        collisionPadding: b = 0,
        sticky: m = "partial",
        hideWhenDetached: w = !1,
        updatePositionStrategy: N = "optimized",
        onPlaced: R,
        ...B
      } = o,
      k = Ap(pu, c),
      [L, P] = z.useState(null),
      K = Ka(s, ne => P(ne)),
      [F, I] = z.useState(null),
      ee = Yb(F),
      Q = ee?.width ?? 0,
      Z = ee?.height ?? 0,
      pe = r + (d !== "center" ? "-" + d : ""),
      Ce =
        typeof b == "number"
          ? b
          : { top: 0, right: 0, bottom: 0, left: 0, ...b },
      we = Array.isArray(h) ? h : [h],
      ge = we.length > 0,
      be = { padding: Ce, boundary: we.filter(Qb), altBoundary: ge },
      {
        refs: ve,
        floatingStyles: Se,
        placement: T,
        isPositioned: U,
        middlewareData: _,
      } = Mb({
        strategy: "fixed",
        placement: pe,
        whileElementsMounted: (...ne) =>
          xb(...ne, { animationFrame: N === "always" }),
        elements: { reference: k.anchor },
        middleware: [
          Rb({ mainAxis: f + Z, alignmentAxis: g }),
          v &&
            _b({
              mainAxis: !0,
              crossAxis: !1,
              limiter: m === "partial" ? Db() : void 0,
              ...be,
            }),
          v && Gb({ ...be }),
          Ub({
            ...be,
            apply: ({
              elements: ne,
              rects: fe,
              availableWidth: Ne,
              availableHeight: ot,
            }) => {
              const { width: dt, height: it } = fe.reference,
                tn = ne.floating.style;
              (tn.setProperty("--radix-popper-available-width", `${Ne}px`),
                tn.setProperty("--radix-popper-available-height", `${ot}px`),
                tn.setProperty("--radix-popper-anchor-width", `${dt}px`),
                tn.setProperty("--radix-popper-anchor-height", `${it}px`));
            },
          }),
          F && Bb({ element: F, padding: x }),
          Zb({ arrowWidth: Q, arrowHeight: Z }),
          w && Hb({ strategy: "referenceHidden", ...be }),
        ],
      }),
      [oe, se] = Rp(T),
      E = ys(R);
    ko(() => {
      U && E?.();
    }, [U, E]);
    const q = _.arrow?.x,
      G = _.arrow?.y,
      X = _.arrow?.centerOffset !== 0,
      [$, re] = z.useState();
    return (
      ko(() => {
        L && re(window.getComputedStyle(L).zIndex);
      }, [L]),
      y.jsx("div", {
        ref: ve.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Se,
          transform: U ? Se.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: $,
          "--radix-popper-transform-origin": [
            _.transformOrigin?.x,
            _.transformOrigin?.y,
          ].join(" "),
          ...(_.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: o.dir,
        children: y.jsx(Vb, {
          scope: c,
          placedSide: oe,
          onArrowChange: I,
          arrowX: q,
          arrowY: G,
          shouldHideArrow: X,
          children: y.jsx(Ja.div, {
            "data-side": oe,
            "data-align": se,
            ...B,
            ref: K,
            style: { ...B.style, animation: U ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Op.displayName = pu;
var Mp = "PopperArrow",
  Xb = { top: "bottom", right: "left", bottom: "top", left: "right" },
  jp = z.forwardRef(function (s, c) {
    const { __scopePopper: r, ...f } = s,
      d = kb(Mp, r),
      g = Xb[d.placedSide];
    return y.jsx("span", {
      ref: d.onArrowChange,
      style: {
        position: "absolute",
        left: d.arrowX,
        top: d.arrowY,
        [g]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[d.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[d.placedSide],
        visibility: d.shouldHideArrow ? "hidden" : void 0,
      },
      children: y.jsx(Lb, {
        ...f,
        ref: c,
        style: { ...f.style, display: "block" },
      }),
    });
  });
jp.displayName = Mp;
function Qb(o) {
  return o !== null;
}
var Zb = o => ({
  name: "transformOrigin",
  options: o,
  fn(s) {
    const { placement: c, rects: r, middlewareData: f } = s,
      g = f.arrow?.centerOffset !== 0,
      x = g ? 0 : o.arrowWidth,
      v = g ? 0 : o.arrowHeight,
      [h, b] = Rp(c),
      m = { start: "0%", center: "50%", end: "100%" }[b],
      w = (f.arrow?.x ?? 0) + x / 2,
      N = (f.arrow?.y ?? 0) + v / 2;
    let R = "",
      B = "";
    return (
      h === "bottom"
        ? ((R = g ? m : `${w}px`), (B = `${-v}px`))
        : h === "top"
          ? ((R = g ? m : `${w}px`), (B = `${r.floating.height + v}px`))
          : h === "right"
            ? ((R = `${-v}px`), (B = g ? m : `${N}px`))
            : h === "left" &&
              ((R = `${r.floating.width + v}px`), (B = g ? m : `${N}px`)),
      { data: { x: R, y: B } }
    );
  },
});
function Rp(o) {
  const [s, c = "center"] = o.split("-");
  return [s, c];
}
var Kb = zp,
  Jb = Op,
  $b = jp;
function Fb(o, s) {
  return z.useReducer((c, r) => s[c][r] ?? c, o);
}
var _p = o => {
  const { present: s, children: c } = o,
    r = Wb(s),
    f =
      typeof c == "function" ? c({ present: r.isPresent }) : z.Children.only(c),
    d = Ka(r.ref, Pb(f));
  return typeof c == "function" || r.isPresent
    ? z.cloneElement(f, { ref: d })
    : null;
};
_p.displayName = "Presence";
function Wb(o) {
  const [s, c] = z.useState(),
    r = z.useRef(null),
    f = z.useRef(o),
    d = z.useRef("none"),
    g = o ? "mounted" : "unmounted",
    [x, v] = Fb(g, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    z.useEffect(() => {
      const h = cs(r.current);
      d.current = x === "mounted" ? h : "none";
    }, [x]),
    ko(() => {
      const h = r.current,
        b = f.current;
      if (b !== o) {
        const w = d.current,
          N = cs(h);
        (o
          ? v("MOUNT")
          : N === "none" || h?.display === "none"
            ? v("UNMOUNT")
            : v(b && w !== N ? "ANIMATION_OUT" : "UNMOUNT"),
          (f.current = o));
      }
    }, [o, v]),
    ko(() => {
      if (s) {
        let h;
        const b = s.ownerDocument.defaultView ?? window,
          m = N => {
            const B = cs(r.current).includes(CSS.escape(N.animationName));
            if (N.target === s && B && (v("ANIMATION_END"), !f.current)) {
              const k = s.style.animationFillMode;
              ((s.style.animationFillMode = "forwards"),
                (h = b.setTimeout(() => {
                  s.style.animationFillMode === "forwards" &&
                    (s.style.animationFillMode = k);
                })));
            }
          },
          w = N => {
            N.target === s && (d.current = cs(r.current));
          };
        return (
          s.addEventListener("animationstart", w),
          s.addEventListener("animationcancel", m),
          s.addEventListener("animationend", m),
          () => {
            (b.clearTimeout(h),
              s.removeEventListener("animationstart", w),
              s.removeEventListener("animationcancel", m),
              s.removeEventListener("animationend", m));
          }
        );
      } else v("ANIMATION_END");
    }, [s, v]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(x),
      ref: z.useCallback(h => {
        ((r.current = h ? getComputedStyle(h) : null), c(h));
      }, []),
    }
  );
}
function cs(o) {
  return o?.animationName || "none";
}
function Pb(o) {
  let s = Object.getOwnPropertyDescriptor(o.props, "ref")?.get,
    c = s && "isReactWarning" in s && s.isReactWarning;
  return c
    ? o.ref
    : ((s = Object.getOwnPropertyDescriptor(o, "ref")?.get),
      (c = s && "isReactWarning" in s && s.isReactWarning),
      c ? o.props.ref : o.props.ref || o.ref);
}
var Ib = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  ex = "VisuallyHidden",
  Dp = z.forwardRef((o, s) =>
    y.jsx(Ja.span, { ...o, ref: s, style: { ...Ib, ...o.style } })
  );
Dp.displayName = ex;
var tx = Dp,
  [Cs] = op("Tooltip", [wp]),
  gu = wp(),
  Gp = "TooltipProvider",
  nx = 700,
  Bh = "tooltip.open",
  [ax, Up] = Cs(Gp),
  Hp = o => {
    const {
        __scopeTooltip: s,
        delayDuration: c = nx,
        skipDelayDuration: r = 300,
        disableHoverableContent: f = !1,
        children: d,
      } = o,
      g = z.useRef(!0),
      x = z.useRef(!1),
      v = z.useRef(0);
    return (
      z.useEffect(() => {
        const h = v.current;
        return () => window.clearTimeout(h);
      }, []),
      y.jsx(ax, {
        scope: s,
        isOpenDelayedRef: g,
        delayDuration: c,
        onOpen: z.useCallback(() => {
          (window.clearTimeout(v.current), (g.current = !1));
        }, []),
        onClose: z.useCallback(() => {
          (window.clearTimeout(v.current),
            (v.current = window.setTimeout(() => (g.current = !0), r)));
        }, [r]),
        isPointerInTransitRef: x,
        onPointerInTransitChange: z.useCallback(h => {
          x.current = h;
        }, []),
        disableHoverableContent: f,
        children: d,
      })
    );
  };
Hp.displayName = Gp;
var Bp = "Tooltip",
  [F1, Ts] = Cs(Bp),
  au = "TooltipTrigger",
  lx = z.forwardRef((o, s) => {
    const { __scopeTooltip: c, ...r } = o,
      f = Ts(au, c),
      d = Up(au, c),
      g = gu(c),
      x = z.useRef(null),
      v = Ka(s, x, f.onTriggerChange),
      h = z.useRef(!1),
      b = z.useRef(!1),
      m = z.useCallback(() => (h.current = !1), []);
    return (
      z.useEffect(
        () => () => document.removeEventListener("pointerup", m),
        [m]
      ),
      y.jsx(Kb, {
        asChild: !0,
        ...g,
        children: y.jsx(Ja.button, {
          "aria-describedby": f.open ? f.contentId : void 0,
          "data-state": f.stateAttribute,
          ...r,
          ref: v,
          onPointerMove: Qn(o.onPointerMove, w => {
            w.pointerType !== "touch" &&
              !b.current &&
              !d.isPointerInTransitRef.current &&
              (f.onTriggerEnter(), (b.current = !0));
          }),
          onPointerLeave: Qn(o.onPointerLeave, () => {
            (f.onTriggerLeave(), (b.current = !1));
          }),
          onPointerDown: Qn(o.onPointerDown, () => {
            (f.open && f.onClose(),
              (h.current = !0),
              document.addEventListener("pointerup", m, { once: !0 }));
          }),
          onFocus: Qn(o.onFocus, () => {
            h.current || f.onOpen();
          }),
          onBlur: Qn(o.onBlur, f.onClose),
          onClick: Qn(o.onClick, f.onClose),
        }),
      })
    );
  });
lx.displayName = au;
var ox = "TooltipPortal",
  [W1, ix] = Cs(ox, { forceMount: void 0 }),
  Yl = "TooltipContent",
  sx = z.forwardRef((o, s) => {
    const c = ix(Yl, o.__scopeTooltip),
      { forceMount: r = c.forceMount, side: f = "top", ...d } = o,
      g = Ts(Yl, o.__scopeTooltip);
    return y.jsx(_p, {
      present: r || g.open,
      children: g.disableHoverableContent
        ? y.jsx(qp, { side: f, ...d, ref: s })
        : y.jsx(rx, { side: f, ...d, ref: s }),
    });
  }),
  rx = z.forwardRef((o, s) => {
    const c = Ts(Yl, o.__scopeTooltip),
      r = Up(Yl, o.__scopeTooltip),
      f = z.useRef(null),
      d = Ka(s, f),
      [g, x] = z.useState(null),
      { trigger: v, onClose: h } = c,
      b = f.current,
      { onPointerInTransitChange: m } = r,
      w = z.useCallback(() => {
        (x(null), m(!1));
      }, [m]),
      N = z.useCallback(
        (R, B) => {
          const k = R.currentTarget,
            L = { x: R.clientX, y: R.clientY },
            P = mx(L, k.getBoundingClientRect()),
            K = hx(L, P),
            F = px(B.getBoundingClientRect()),
            I = vx([...K, ...F]);
          (x(I), m(!0));
        },
        [m]
      );
    return (
      z.useEffect(() => () => w(), [w]),
      z.useEffect(() => {
        if (v && b) {
          const R = k => N(k, b),
            B = k => N(k, v);
          return (
            v.addEventListener("pointerleave", R),
            b.addEventListener("pointerleave", B),
            () => {
              (v.removeEventListener("pointerleave", R),
                b.removeEventListener("pointerleave", B));
            }
          );
        }
      }, [v, b, N, w]),
      z.useEffect(() => {
        if (g) {
          const R = B => {
            const k = B.target,
              L = { x: B.clientX, y: B.clientY },
              P = v?.contains(k) || b?.contains(k),
              K = !gx(L, g);
            P ? w() : K && (w(), h());
          };
          return (
            document.addEventListener("pointermove", R),
            () => document.removeEventListener("pointermove", R)
          );
        }
      }, [v, b, g, h, w]),
      y.jsx(qp, { ...o, ref: d })
    );
  }),
  [cx, ux] = Cs(Bp, { isInside: !1 }),
  fx = py("TooltipContent"),
  qp = z.forwardRef((o, s) => {
    const {
        __scopeTooltip: c,
        children: r,
        "aria-label": f,
        onEscapeKeyDown: d,
        onPointerDownOutside: g,
        ...x
      } = o,
      v = Ts(Yl, c),
      h = gu(c),
      { onClose: b } = v;
    return (
      z.useEffect(
        () => (
          document.addEventListener(Bh, b),
          () => document.removeEventListener(Bh, b)
        ),
        [b]
      ),
      z.useEffect(() => {
        if (v.trigger) {
          const m = w => {
            w.target?.contains(v.trigger) && b();
          };
          return (
            window.addEventListener("scroll", m, { capture: !0 }),
            () => window.removeEventListener("scroll", m, { capture: !0 })
          );
        }
      }, [v.trigger, b]),
      y.jsx(cp, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: d,
        onPointerDownOutside: g,
        onFocusOutside: m => m.preventDefault(),
        onDismiss: b,
        children: y.jsxs(Jb, {
          "data-state": v.stateAttribute,
          ...h,
          ...x,
          ref: s,
          style: {
            ...x.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            y.jsx(fx, { children: r }),
            y.jsx(cx, {
              scope: c,
              isInside: !0,
              children: y.jsx(tx, {
                id: v.contentId,
                role: "tooltip",
                children: f || r,
              }),
            }),
          ],
        }),
      })
    );
  });
sx.displayName = Yl;
var Lp = "TooltipArrow",
  dx = z.forwardRef((o, s) => {
    const { __scopeTooltip: c, ...r } = o,
      f = gu(c);
    return ux(Lp, c).isInside ? null : y.jsx($b, { ...f, ...r, ref: s });
  });
dx.displayName = Lp;
function mx(o, s) {
  const c = Math.abs(s.top - o.y),
    r = Math.abs(s.bottom - o.y),
    f = Math.abs(s.right - o.x),
    d = Math.abs(s.left - o.x);
  switch (Math.min(c, r, f, d)) {
    case d:
      return "left";
    case f:
      return "right";
    case c:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function hx(o, s, c = 5) {
  const r = [];
  switch (s) {
    case "top":
      r.push({ x: o.x - c, y: o.y + c }, { x: o.x + c, y: o.y + c });
      break;
    case "bottom":
      r.push({ x: o.x - c, y: o.y - c }, { x: o.x + c, y: o.y - c });
      break;
    case "left":
      r.push({ x: o.x + c, y: o.y - c }, { x: o.x + c, y: o.y + c });
      break;
    case "right":
      r.push({ x: o.x - c, y: o.y - c }, { x: o.x - c, y: o.y + c });
      break;
  }
  return r;
}
function px(o) {
  const { top: s, right: c, bottom: r, left: f } = o;
  return [
    { x: f, y: s },
    { x: c, y: s },
    { x: c, y: r },
    { x: f, y: r },
  ];
}
function gx(o, s) {
  const { x: c, y: r } = o;
  let f = !1;
  for (let d = 0, g = s.length - 1; d < s.length; g = d++) {
    const x = s[d],
      v = s[g],
      h = x.x,
      b = x.y,
      m = v.x,
      w = v.y;
    b > r != w > r && c < ((m - h) * (r - b)) / (w - b) + h && (f = !f);
  }
  return f;
}
function vx(o) {
  const s = o.slice();
  return (
    s.sort((c, r) =>
      c.x < r.x ? -1 : c.x > r.x ? 1 : c.y < r.y ? -1 : c.y > r.y ? 1 : 0
    ),
    yx(s)
  );
}
function yx(o) {
  if (o.length <= 1) return o.slice();
  const s = [];
  for (let r = 0; r < o.length; r++) {
    const f = o[r];
    for (; s.length >= 2; ) {
      const d = s[s.length - 1],
        g = s[s.length - 2];
      if ((d.x - g.x) * (f.y - g.y) >= (d.y - g.y) * (f.x - g.x)) s.pop();
      else break;
    }
    s.push(f);
  }
  s.pop();
  const c = [];
  for (let r = o.length - 1; r >= 0; r--) {
    const f = o[r];
    for (; c.length >= 2; ) {
      const d = c[c.length - 1],
        g = c[c.length - 2];
      if ((d.x - g.x) * (f.y - g.y) >= (d.y - g.y) * (f.x - g.x)) c.pop();
      else break;
    }
    c.push(f);
  }
  return (
    c.pop(),
    s.length === 1 && c.length === 1 && s[0].x === c[0].x && s[0].y === c[0].y
      ? s
      : s.concat(c)
  );
}
var bx = Hp;
function Yp(o) {
  var s,
    c,
    r = "";
  if (typeof o == "string" || typeof o == "number") r += o;
  else if (typeof o == "object")
    if (Array.isArray(o)) {
      var f = o.length;
      for (s = 0; s < f; s++)
        o[s] && (c = Yp(o[s])) && (r && (r += " "), (r += c));
    } else for (c in o) o[c] && (r && (r += " "), (r += c));
  return r;
}
function Vp() {
  for (var o, s, c = 0, r = "", f = arguments.length; c < f; c++)
    (o = arguments[c]) && (s = Yp(o)) && (r && (r += " "), (r += s));
  return r;
}
const vu = "-",
  xx = o => {
    const s = Ex(o),
      { conflictingClassGroups: c, conflictingClassGroupModifiers: r } = o;
    return {
      getClassGroupId: g => {
        const x = g.split(vu);
        return (x[0] === "" && x.length !== 1 && x.shift(), kp(x, s) || Sx(g));
      },
      getConflictingClassGroupIds: (g, x) => {
        const v = c[g] || [];
        return x && r[g] ? [...v, ...r[g]] : v;
      },
    };
  },
  kp = (o, s) => {
    if (o.length === 0) return s.classGroupId;
    const c = o[0],
      r = s.nextPart.get(c),
      f = r ? kp(o.slice(1), r) : void 0;
    if (f) return f;
    if (s.validators.length === 0) return;
    const d = o.join(vu);
    return s.validators.find(({ validator: g }) => g(d))?.classGroupId;
  },
  qh = /^\[(.+)\]$/,
  Sx = o => {
    if (qh.test(o)) {
      const s = qh.exec(o)[1],
        c = s?.substring(0, s.indexOf(":"));
      if (c) return "arbitrary.." + c;
    }
  },
  Ex = o => {
    const { theme: s, classGroups: c } = o,
      r = { nextPart: new Map(), validators: [] };
    for (const f in c) lu(c[f], r, f, s);
    return r;
  },
  lu = (o, s, c, r) => {
    o.forEach(f => {
      if (typeof f == "string") {
        const d = f === "" ? s : Lh(s, f);
        d.classGroupId = c;
        return;
      }
      if (typeof f == "function") {
        if (Cx(f)) {
          lu(f(r), s, c, r);
          return;
        }
        s.validators.push({ validator: f, classGroupId: c });
        return;
      }
      Object.entries(f).forEach(([d, g]) => {
        lu(g, Lh(s, d), c, r);
      });
    });
  },
  Lh = (o, s) => {
    let c = o;
    return (
      s.split(vu).forEach(r => {
        (c.nextPart.has(r) ||
          c.nextPart.set(r, { nextPart: new Map(), validators: [] }),
          (c = c.nextPart.get(r)));
      }),
      c
    );
  },
  Cx = o => o.isThemeGetter,
  Tx = o => {
    if (o < 1) return { get: () => {}, set: () => {} };
    let s = 0,
      c = new Map(),
      r = new Map();
    const f = (d, g) => {
      (c.set(d, g), s++, s > o && ((s = 0), (r = c), (c = new Map())));
    };
    return {
      get(d) {
        let g = c.get(d);
        if (g !== void 0) return g;
        if ((g = r.get(d)) !== void 0) return (f(d, g), g);
      },
      set(d, g) {
        c.has(d) ? c.set(d, g) : f(d, g);
      },
    };
  },
  ou = "!",
  iu = ":",
  wx = iu.length,
  Ax = o => {
    const { prefix: s, experimentalParseClassName: c } = o;
    let r = f => {
      const d = [];
      let g = 0,
        x = 0,
        v = 0,
        h;
      for (let R = 0; R < f.length; R++) {
        let B = f[R];
        if (g === 0 && x === 0) {
          if (B === iu) {
            (d.push(f.slice(v, R)), (v = R + wx));
            continue;
          }
          if (B === "/") {
            h = R;
            continue;
          }
        }
        B === "[" ? g++ : B === "]" ? g-- : B === "(" ? x++ : B === ")" && x--;
      }
      const b = d.length === 0 ? f : f.substring(v),
        m = Nx(b),
        w = m !== b,
        N = h && h > v ? h - v : void 0;
      return {
        modifiers: d,
        hasImportantModifier: w,
        baseClassName: m,
        maybePostfixModifierPosition: N,
      };
    };
    if (s) {
      const f = s + iu,
        d = r;
      r = g =>
        g.startsWith(f)
          ? d(g.substring(f.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: g,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (c) {
      const f = r;
      r = d => c({ className: d, parseClassName: f });
    }
    return r;
  },
  Nx = o =>
    o.endsWith(ou)
      ? o.substring(0, o.length - 1)
      : o.startsWith(ou)
        ? o.substring(1)
        : o,
  zx = o => {
    const s = Object.fromEntries(o.orderSensitiveModifiers.map(r => [r, !0]));
    return r => {
      if (r.length <= 1) return r;
      const f = [];
      let d = [];
      return (
        r.forEach(g => {
          g[0] === "[" || s[g] ? (f.push(...d.sort(), g), (d = [])) : d.push(g);
        }),
        f.push(...d.sort()),
        f
      );
    };
  },
  Ox = o => ({
    cache: Tx(o.cacheSize),
    parseClassName: Ax(o),
    sortModifiers: zx(o),
    ...xx(o),
  }),
  Mx = /\s+/,
  jx = (o, s) => {
    const {
        parseClassName: c,
        getClassGroupId: r,
        getConflictingClassGroupIds: f,
        sortModifiers: d,
      } = s,
      g = [],
      x = o.trim().split(Mx);
    let v = "";
    for (let h = x.length - 1; h >= 0; h -= 1) {
      const b = x[h],
        {
          isExternal: m,
          modifiers: w,
          hasImportantModifier: N,
          baseClassName: R,
          maybePostfixModifierPosition: B,
        } = c(b);
      if (m) {
        v = b + (v.length > 0 ? " " + v : v);
        continue;
      }
      let k = !!B,
        L = r(k ? R.substring(0, B) : R);
      if (!L) {
        if (!k) {
          v = b + (v.length > 0 ? " " + v : v);
          continue;
        }
        if (((L = r(R)), !L)) {
          v = b + (v.length > 0 ? " " + v : v);
          continue;
        }
        k = !1;
      }
      const P = d(w).join(":"),
        K = N ? P + ou : P,
        F = K + L;
      if (g.includes(F)) continue;
      g.push(F);
      const I = f(L, k);
      for (let ee = 0; ee < I.length; ++ee) {
        const Q = I[ee];
        g.push(K + Q);
      }
      v = b + (v.length > 0 ? " " + v : v);
    }
    return v;
  };
function Rx() {
  let o = 0,
    s,
    c,
    r = "";
  for (; o < arguments.length; )
    (s = arguments[o++]) && (c = Xp(s)) && (r && (r += " "), (r += c));
  return r;
}
const Xp = o => {
  if (typeof o == "string") return o;
  let s,
    c = "";
  for (let r = 0; r < o.length; r++)
    o[r] && (s = Xp(o[r])) && (c && (c += " "), (c += s));
  return c;
};
function _x(o, ...s) {
  let c,
    r,
    f,
    d = g;
  function g(v) {
    const h = s.reduce((b, m) => m(b), o());
    return ((c = Ox(h)), (r = c.cache.get), (f = c.cache.set), (d = x), x(v));
  }
  function x(v) {
    const h = r(v);
    if (h) return h;
    const b = jx(v, c);
    return (f(v, b), b);
  }
  return function () {
    return d(Rx.apply(null, arguments));
  };
}
const rt = o => {
    const s = c => c[o] || [];
    return ((s.isThemeGetter = !0), s);
  },
  Qp = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Zp = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Dx = /^\d+\/\d+$/,
  Gx = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Ux =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Hx = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Bx = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  qx =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Hl = o => Dx.test(o),
  Ae = o => !!o && !Number.isNaN(Number(o)),
  Sa = o => !!o && Number.isInteger(Number(o)),
  Kc = o => o.endsWith("%") && Ae(o.slice(0, -1)),
  Xn = o => Gx.test(o),
  Lx = () => !0,
  Yx = o => Ux.test(o) && !Hx.test(o),
  Kp = () => !1,
  Vx = o => Bx.test(o),
  kx = o => qx.test(o),
  Xx = o => !ae(o) && !le(o),
  Qx = o => Xl(o, Fp, Kp),
  ae = o => Qp.test(o),
  Qa = o => Xl(o, Wp, Yx),
  Jc = o => Xl(o, Fx, Ae),
  Yh = o => Xl(o, Jp, Kp),
  Zx = o => Xl(o, $p, kx),
  us = o => Xl(o, Pp, Vx),
  le = o => Zp.test(o),
  Lo = o => Ql(o, Wp),
  Kx = o => Ql(o, Wx),
  Vh = o => Ql(o, Jp),
  Jx = o => Ql(o, Fp),
  $x = o => Ql(o, $p),
  fs = o => Ql(o, Pp, !0),
  Xl = (o, s, c) => {
    const r = Qp.exec(o);
    return r ? (r[1] ? s(r[1]) : c(r[2])) : !1;
  },
  Ql = (o, s, c = !1) => {
    const r = Zp.exec(o);
    return r ? (r[1] ? s(r[1]) : c) : !1;
  },
  Jp = o => o === "position" || o === "percentage",
  $p = o => o === "image" || o === "url",
  Fp = o => o === "length" || o === "size" || o === "bg-size",
  Wp = o => o === "length",
  Fx = o => o === "number",
  Wx = o => o === "family-name",
  Pp = o => o === "shadow",
  Px = () => {
    const o = rt("color"),
      s = rt("font"),
      c = rt("text"),
      r = rt("font-weight"),
      f = rt("tracking"),
      d = rt("leading"),
      g = rt("breakpoint"),
      x = rt("container"),
      v = rt("spacing"),
      h = rt("radius"),
      b = rt("shadow"),
      m = rt("inset-shadow"),
      w = rt("text-shadow"),
      N = rt("drop-shadow"),
      R = rt("blur"),
      B = rt("perspective"),
      k = rt("aspect"),
      L = rt("ease"),
      P = rt("animate"),
      K = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      F = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      I = () => [...F(), le, ae],
      ee = () => ["auto", "hidden", "clip", "visible", "scroll"],
      Q = () => ["auto", "contain", "none"],
      Z = () => [le, ae, v],
      pe = () => [Hl, "full", "auto", ...Z()],
      Ce = () => [Sa, "none", "subgrid", le, ae],
      we = () => ["auto", { span: ["full", Sa, le, ae] }, Sa, le, ae],
      ge = () => [Sa, "auto", le, ae],
      be = () => ["auto", "min", "max", "fr", le, ae],
      ve = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      Se = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      T = () => ["auto", ...Z()],
      U = () => [
        Hl,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...Z(),
      ],
      _ = () => [o, le, ae],
      oe = () => [...F(), Vh, Yh, { position: [le, ae] }],
      se = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      E = () => ["auto", "cover", "contain", Jx, Qx, { size: [le, ae] }],
      q = () => [Kc, Lo, Qa],
      G = () => ["", "none", "full", h, le, ae],
      X = () => ["", Ae, Lo, Qa],
      $ = () => ["solid", "dashed", "dotted", "double"],
      re = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      ne = () => [Ae, Kc, Vh, Yh],
      fe = () => ["", "none", R, le, ae],
      Ne = () => ["none", Ae, le, ae],
      ot = () => ["none", Ae, le, ae],
      dt = () => [Ae, le, ae],
      it = () => [Hl, "full", ...Z()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Xn],
        breakpoint: [Xn],
        color: [Lx],
        container: [Xn],
        "drop-shadow": [Xn],
        ease: ["in", "out", "in-out"],
        font: [Xx],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Xn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [Xn],
        shadow: [Xn],
        spacing: ["px", Ae],
        text: [Xn],
        "text-shadow": [Xn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Hl, ae, le, k] }],
        container: ["container"],
        columns: [{ columns: [Ae, ae, le, x] }],
        "break-after": [{ "break-after": K() }],
        "break-before": [{ "break-before": K() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: I() }],
        overflow: [{ overflow: ee() }],
        "overflow-x": [{ "overflow-x": ee() }],
        "overflow-y": [{ "overflow-y": ee() }],
        overscroll: [{ overscroll: Q() }],
        "overscroll-x": [{ "overscroll-x": Q() }],
        "overscroll-y": [{ "overscroll-y": Q() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: pe() }],
        "inset-x": [{ "inset-x": pe() }],
        "inset-y": [{ "inset-y": pe() }],
        start: [{ start: pe() }],
        end: [{ end: pe() }],
        top: [{ top: pe() }],
        right: [{ right: pe() }],
        bottom: [{ bottom: pe() }],
        left: [{ left: pe() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Sa, "auto", le, ae] }],
        basis: [{ basis: [Hl, "full", "auto", x, ...Z()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Ae, Hl, "auto", "initial", "none", ae] }],
        grow: [{ grow: ["", Ae, le, ae] }],
        shrink: [{ shrink: ["", Ae, le, ae] }],
        order: [{ order: [Sa, "first", "last", "none", le, ae] }],
        "grid-cols": [{ "grid-cols": Ce() }],
        "col-start-end": [{ col: we() }],
        "col-start": [{ "col-start": ge() }],
        "col-end": [{ "col-end": ge() }],
        "grid-rows": [{ "grid-rows": Ce() }],
        "row-start-end": [{ row: we() }],
        "row-start": [{ "row-start": ge() }],
        "row-end": [{ "row-end": ge() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": be() }],
        "auto-rows": [{ "auto-rows": be() }],
        gap: [{ gap: Z() }],
        "gap-x": [{ "gap-x": Z() }],
        "gap-y": [{ "gap-y": Z() }],
        "justify-content": [{ justify: [...ve(), "normal"] }],
        "justify-items": [{ "justify-items": [...Se(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...Se()] }],
        "align-content": [{ content: ["normal", ...ve()] }],
        "align-items": [{ items: [...Se(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...Se(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": ve() }],
        "place-items": [{ "place-items": [...Se(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...Se()] }],
        p: [{ p: Z() }],
        px: [{ px: Z() }],
        py: [{ py: Z() }],
        ps: [{ ps: Z() }],
        pe: [{ pe: Z() }],
        pt: [{ pt: Z() }],
        pr: [{ pr: Z() }],
        pb: [{ pb: Z() }],
        pl: [{ pl: Z() }],
        m: [{ m: T() }],
        mx: [{ mx: T() }],
        my: [{ my: T() }],
        ms: [{ ms: T() }],
        me: [{ me: T() }],
        mt: [{ mt: T() }],
        mr: [{ mr: T() }],
        mb: [{ mb: T() }],
        ml: [{ ml: T() }],
        "space-x": [{ "space-x": Z() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": Z() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: U() }],
        w: [{ w: [x, "screen", ...U()] }],
        "min-w": [{ "min-w": [x, "screen", "none", ...U()] }],
        "max-w": [
          { "max-w": [x, "screen", "none", "prose", { screen: [g] }, ...U()] },
        ],
        h: [{ h: ["screen", "lh", ...U()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...U()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...U()] }],
        "font-size": [{ text: ["base", c, Lo, Qa] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [r, le, Jc] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Kc,
              ae,
            ],
          },
        ],
        "font-family": [{ font: [Kx, ae, s] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [f, le, ae] }],
        "line-clamp": [{ "line-clamp": [Ae, "none", le, Jc] }],
        leading: [{ leading: [d, ...Z()] }],
        "list-image": [{ "list-image": ["none", le, ae] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", le, ae] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: _() }],
        "text-color": [{ text: _() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...$(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [Ae, "from-font", "auto", le, Qa] },
        ],
        "text-decoration-color": [{ decoration: _() }],
        "underline-offset": [{ "underline-offset": [Ae, "auto", le, ae] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: Z() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              le,
              ae,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", le, ae] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: oe() }],
        "bg-repeat": [{ bg: se() }],
        "bg-size": [{ bg: E() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  Sa,
                  le,
                  ae,
                ],
                radial: ["", le, ae],
                conic: [Sa, le, ae],
              },
              $x,
              Zx,
            ],
          },
        ],
        "bg-color": [{ bg: _() }],
        "gradient-from-pos": [{ from: q() }],
        "gradient-via-pos": [{ via: q() }],
        "gradient-to-pos": [{ to: q() }],
        "gradient-from": [{ from: _() }],
        "gradient-via": [{ via: _() }],
        "gradient-to": [{ to: _() }],
        rounded: [{ rounded: G() }],
        "rounded-s": [{ "rounded-s": G() }],
        "rounded-e": [{ "rounded-e": G() }],
        "rounded-t": [{ "rounded-t": G() }],
        "rounded-r": [{ "rounded-r": G() }],
        "rounded-b": [{ "rounded-b": G() }],
        "rounded-l": [{ "rounded-l": G() }],
        "rounded-ss": [{ "rounded-ss": G() }],
        "rounded-se": [{ "rounded-se": G() }],
        "rounded-ee": [{ "rounded-ee": G() }],
        "rounded-es": [{ "rounded-es": G() }],
        "rounded-tl": [{ "rounded-tl": G() }],
        "rounded-tr": [{ "rounded-tr": G() }],
        "rounded-br": [{ "rounded-br": G() }],
        "rounded-bl": [{ "rounded-bl": G() }],
        "border-w": [{ border: X() }],
        "border-w-x": [{ "border-x": X() }],
        "border-w-y": [{ "border-y": X() }],
        "border-w-s": [{ "border-s": X() }],
        "border-w-e": [{ "border-e": X() }],
        "border-w-t": [{ "border-t": X() }],
        "border-w-r": [{ "border-r": X() }],
        "border-w-b": [{ "border-b": X() }],
        "border-w-l": [{ "border-l": X() }],
        "divide-x": [{ "divide-x": X() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": X() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...$(), "hidden", "none"] }],
        "divide-style": [{ divide: [...$(), "hidden", "none"] }],
        "border-color": [{ border: _() }],
        "border-color-x": [{ "border-x": _() }],
        "border-color-y": [{ "border-y": _() }],
        "border-color-s": [{ "border-s": _() }],
        "border-color-e": [{ "border-e": _() }],
        "border-color-t": [{ "border-t": _() }],
        "border-color-r": [{ "border-r": _() }],
        "border-color-b": [{ "border-b": _() }],
        "border-color-l": [{ "border-l": _() }],
        "divide-color": [{ divide: _() }],
        "outline-style": [{ outline: [...$(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Ae, le, ae] }],
        "outline-w": [{ outline: ["", Ae, Lo, Qa] }],
        "outline-color": [{ outline: _() }],
        shadow: [{ shadow: ["", "none", b, fs, us] }],
        "shadow-color": [{ shadow: _() }],
        "inset-shadow": [{ "inset-shadow": ["none", m, fs, us] }],
        "inset-shadow-color": [{ "inset-shadow": _() }],
        "ring-w": [{ ring: X() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: _() }],
        "ring-offset-w": [{ "ring-offset": [Ae, Qa] }],
        "ring-offset-color": [{ "ring-offset": _() }],
        "inset-ring-w": [{ "inset-ring": X() }],
        "inset-ring-color": [{ "inset-ring": _() }],
        "text-shadow": [{ "text-shadow": ["none", w, fs, us] }],
        "text-shadow-color": [{ "text-shadow": _() }],
        opacity: [{ opacity: [Ae, le, ae] }],
        "mix-blend": [
          { "mix-blend": [...re(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": re() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [Ae] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": ne() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": ne() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": _() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": _() }],
        "mask-image-t-from-pos": [{ "mask-t-from": ne() }],
        "mask-image-t-to-pos": [{ "mask-t-to": ne() }],
        "mask-image-t-from-color": [{ "mask-t-from": _() }],
        "mask-image-t-to-color": [{ "mask-t-to": _() }],
        "mask-image-r-from-pos": [{ "mask-r-from": ne() }],
        "mask-image-r-to-pos": [{ "mask-r-to": ne() }],
        "mask-image-r-from-color": [{ "mask-r-from": _() }],
        "mask-image-r-to-color": [{ "mask-r-to": _() }],
        "mask-image-b-from-pos": [{ "mask-b-from": ne() }],
        "mask-image-b-to-pos": [{ "mask-b-to": ne() }],
        "mask-image-b-from-color": [{ "mask-b-from": _() }],
        "mask-image-b-to-color": [{ "mask-b-to": _() }],
        "mask-image-l-from-pos": [{ "mask-l-from": ne() }],
        "mask-image-l-to-pos": [{ "mask-l-to": ne() }],
        "mask-image-l-from-color": [{ "mask-l-from": _() }],
        "mask-image-l-to-color": [{ "mask-l-to": _() }],
        "mask-image-x-from-pos": [{ "mask-x-from": ne() }],
        "mask-image-x-to-pos": [{ "mask-x-to": ne() }],
        "mask-image-x-from-color": [{ "mask-x-from": _() }],
        "mask-image-x-to-color": [{ "mask-x-to": _() }],
        "mask-image-y-from-pos": [{ "mask-y-from": ne() }],
        "mask-image-y-to-pos": [{ "mask-y-to": ne() }],
        "mask-image-y-from-color": [{ "mask-y-from": _() }],
        "mask-image-y-to-color": [{ "mask-y-to": _() }],
        "mask-image-radial": [{ "mask-radial": [le, ae] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": ne() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": ne() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": _() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": _() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": F() }],
        "mask-image-conic-pos": [{ "mask-conic": [Ae] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": ne() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": ne() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": _() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": _() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: oe() }],
        "mask-repeat": [{ mask: se() }],
        "mask-size": [{ mask: E() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", le, ae] }],
        filter: [{ filter: ["", "none", le, ae] }],
        blur: [{ blur: fe() }],
        brightness: [{ brightness: [Ae, le, ae] }],
        contrast: [{ contrast: [Ae, le, ae] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", N, fs, us] }],
        "drop-shadow-color": [{ "drop-shadow": _() }],
        grayscale: [{ grayscale: ["", Ae, le, ae] }],
        "hue-rotate": [{ "hue-rotate": [Ae, le, ae] }],
        invert: [{ invert: ["", Ae, le, ae] }],
        saturate: [{ saturate: [Ae, le, ae] }],
        sepia: [{ sepia: ["", Ae, le, ae] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", le, ae] }],
        "backdrop-blur": [{ "backdrop-blur": fe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Ae, le, ae] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Ae, le, ae] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Ae, le, ae] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Ae, le, ae] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Ae, le, ae] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Ae, le, ae] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Ae, le, ae] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Ae, le, ae] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": Z() }],
        "border-spacing-x": [{ "border-spacing-x": Z() }],
        "border-spacing-y": [{ "border-spacing-y": Z() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              le,
              ae,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Ae, "initial", le, ae] }],
        ease: [{ ease: ["linear", "initial", L, le, ae] }],
        delay: [{ delay: [Ae, le, ae] }],
        animate: [{ animate: ["none", P, le, ae] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [B, le, ae] }],
        "perspective-origin": [{ "perspective-origin": I() }],
        rotate: [{ rotate: Ne() }],
        "rotate-x": [{ "rotate-x": Ne() }],
        "rotate-y": [{ "rotate-y": Ne() }],
        "rotate-z": [{ "rotate-z": Ne() }],
        scale: [{ scale: ot() }],
        "scale-x": [{ "scale-x": ot() }],
        "scale-y": [{ "scale-y": ot() }],
        "scale-z": [{ "scale-z": ot() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: dt() }],
        "skew-x": [{ "skew-x": dt() }],
        "skew-y": [{ "skew-y": dt() }],
        transform: [{ transform: [le, ae, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: I() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: it() }],
        "translate-x": [{ "translate-x": it() }],
        "translate-y": [{ "translate-y": it() }],
        "translate-z": [{ "translate-z": it() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: _() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: _() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              le,
              ae,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": Z() }],
        "scroll-mx": [{ "scroll-mx": Z() }],
        "scroll-my": [{ "scroll-my": Z() }],
        "scroll-ms": [{ "scroll-ms": Z() }],
        "scroll-me": [{ "scroll-me": Z() }],
        "scroll-mt": [{ "scroll-mt": Z() }],
        "scroll-mr": [{ "scroll-mr": Z() }],
        "scroll-mb": [{ "scroll-mb": Z() }],
        "scroll-ml": [{ "scroll-ml": Z() }],
        "scroll-p": [{ "scroll-p": Z() }],
        "scroll-px": [{ "scroll-px": Z() }],
        "scroll-py": [{ "scroll-py": Z() }],
        "scroll-ps": [{ "scroll-ps": Z() }],
        "scroll-pe": [{ "scroll-pe": Z() }],
        "scroll-pt": [{ "scroll-pt": Z() }],
        "scroll-pr": [{ "scroll-pr": Z() }],
        "scroll-pb": [{ "scroll-pb": Z() }],
        "scroll-pl": [{ "scroll-pl": Z() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", le, ae],
          },
        ],
        fill: [{ fill: ["none", ..._()] }],
        "stroke-w": [{ stroke: [Ae, Lo, Qa, Jc] }],
        stroke: [{ stroke: ["none", ..._()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Ix = _x(Px);
function ws(...o) {
  return Ix(Vp(o));
}
function e1({ delayDuration: o = 0, ...s }) {
  return y.jsx(bx, {
    "data-loc": "client/src/components/ui/tooltip.tsx:11",
    "data-slot": "tooltip-provider",
    delayDuration: o,
    ...s,
  });
}
const kh = o => (typeof o == "boolean" ? `${o}` : o === 0 ? "0" : o),
  Xh = Vp,
  t1 = (o, s) => c => {
    var r;
    if (s?.variants == null) return Xh(o, c?.class, c?.className);
    const { variants: f, defaultVariants: d } = s,
      g = Object.keys(f).map(h => {
        const b = c?.[h],
          m = d?.[h];
        if (b === null) return null;
        const w = kh(b) || kh(m);
        return f[h][w];
      }),
      x =
        c &&
        Object.entries(c).reduce((h, b) => {
          let [m, w] = b;
          return (w === void 0 || (h[m] = w), h);
        }, {}),
      v =
        s == null || (r = s.compoundVariants) === null || r === void 0
          ? void 0
          : r.reduce((h, b) => {
              let { class: m, className: w, ...N } = b;
              return Object.entries(N).every(R => {
                let [B, k] = R;
                return Array.isArray(k)
                  ? k.includes({ ...d, ...x }[B])
                  : { ...d, ...x }[B] === k;
              })
                ? [...h, m, w]
                : h;
            }, []);
    return Xh(o, g, v, c?.class, c?.className);
  },
  n1 = t1(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
          outline:
            "border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent dark:hover:bg-accent/50",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2 has-[>svg]:px-3",
          sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
          lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
          icon: "size-9",
          "icon-sm": "size-8",
          "icon-lg": "size-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    }
  );
function Fe({ className: o, variant: s, size: c, asChild: r = !1, ...f }) {
  const d = r ? my : "button";
  return y.jsx(d, {
    "data-loc": "client/src/components/ui/button.tsx:52",
    "data-slot": "button",
    className: ws(n1({ variant: s, size: c, className: o })),
    ...f,
  });
}
function rn({ className: o, ...s }) {
  return y.jsx("div", {
    "data-loc": "client/src/components/ui/card.tsx:7",
    "data-slot": "card",
    className: ws(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      o
    ),
    ...s,
  });
}
function a1({ className: o, ...s }) {
  return y.jsx("div", {
    "data-loc": "client/src/components/ui/card.tsx:66",
    "data-slot": "card-content",
    className: ws("px-6", o),
    ...s,
  });
}
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const l1 = o => o.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Ip = (...o) => o.filter((s, c, r) => !!s && r.indexOf(s) === c).join(" ");
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var o1 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const i1 = z.forwardRef(
  (
    {
      color: o = "currentColor",
      size: s = 24,
      strokeWidth: c = 2,
      absoluteStrokeWidth: r,
      className: f = "",
      children: d,
      iconNode: g,
      ...x
    },
    v
  ) =>
    z.createElement(
      "svg",
      {
        ref: v,
        ...o1,
        width: s,
        height: s,
        stroke: o,
        strokeWidth: r ? (Number(c) * 24) / Number(s) : c,
        className: Ip("lucide", f),
        ...x,
      },
      [
        ...g.map(([h, b]) => z.createElement(h, b)),
        ...(Array.isArray(d) ? d : [d]),
      ]
    )
);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const As = (o, s) => {
  const c = z.forwardRef(({ className: r, ...f }, d) =>
    z.createElement(i1, {
      ref: d,
      iconNode: s,
      className: Ip(`lucide-${l1(o)}`, r),
      ...f,
    })
  );
  return ((c.displayName = `${o}`), c);
};
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const s1 = As("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const r1 = As("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const c1 = As("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const u1 = As("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq",
    },
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
]);
function f1(o, s) {
  if (o instanceof RegExp) return { keys: !1, pattern: o };
  var c,
    r,
    f,
    d,
    g = [],
    x = "",
    v = o.split("/");
  for (v[0] || v.shift(); (f = v.shift()); )
    ((c = f[0]),
      c === "*"
        ? (g.push(c), (x += f[1] === "?" ? "(?:/(.*))?" : "/(.*)"))
        : c === ":"
          ? ((r = f.indexOf("?", 1)),
            (d = f.indexOf(".", 1)),
            g.push(f.substring(1, ~r ? r : ~d ? d : f.length)),
            (x += ~r && !~d ? "(?:/([^/]+?))?" : "/([^/]+?)"),
            ~d && (x += (~r ? "?" : "") + "\\" + f.substring(d)))
          : (x += "/" + f));
  return {
    keys: g,
    pattern: new RegExp("^" + x + (s ? "(?=$|/)" : "/?$"), "i"),
  };
}
var $c = { exports: {} },
  Fc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qh;
function d1() {
  if (Qh) return Fc;
  Qh = 1;
  var o = vs();
  function s(m, w) {
    return (m === w && (m !== 0 || 1 / m === 1 / w)) || (m !== m && w !== w);
  }
  var c = typeof Object.is == "function" ? Object.is : s,
    r = o.useState,
    f = o.useEffect,
    d = o.useLayoutEffect,
    g = o.useDebugValue;
  function x(m, w) {
    var N = w(),
      R = r({ inst: { value: N, getSnapshot: w } }),
      B = R[0].inst,
      k = R[1];
    return (
      d(
        function () {
          ((B.value = N), (B.getSnapshot = w), v(B) && k({ inst: B }));
        },
        [m, N, w]
      ),
      f(
        function () {
          return (
            v(B) && k({ inst: B }),
            m(function () {
              v(B) && k({ inst: B });
            })
          );
        },
        [m]
      ),
      g(N),
      N
    );
  }
  function v(m) {
    var w = m.getSnapshot;
    m = m.value;
    try {
      var N = w();
      return !c(m, N);
    } catch {
      return !0;
    }
  }
  function h(m, w) {
    return w();
  }
  var b =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? h
      : x;
  return (
    (Fc.useSyncExternalStore =
      o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : b),
    Fc
  );
}
var Zh;
function m1() {
  return (Zh || ((Zh = 1), ($c.exports = d1())), $c.exports);
}
var eg = m1();
const h1 = Rv.useInsertionEffect,
  p1 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  g1 = p1 ? z.useLayoutEffect : z.useEffect,
  v1 = h1 || g1,
  tg = o => {
    const s = z.useRef([o, (...c) => s[0](...c)]).current;
    return (
      v1(() => {
        s[0] = o;
      }),
      s[1]
    );
  },
  y1 = "popstate",
  yu = "pushState",
  bu = "replaceState",
  b1 = "hashchange",
  Kh = [y1, yu, bu, b1],
  x1 = o => {
    for (const s of Kh) addEventListener(s, o);
    return () => {
      for (const s of Kh) removeEventListener(s, o);
    };
  },
  ng = (o, s) => eg.useSyncExternalStore(x1, o, s),
  S1 = () => location.search,
  E1 = ({ ssrSearch: o = "" } = {}) => ng(S1, () => o),
  Jh = () => location.pathname,
  C1 = ({ ssrPath: o } = {}) => ng(Jh, o ? () => o : Jh),
  T1 = (o, { replace: s = !1, state: c = null } = {}) =>
    history[s ? bu : yu](c, "", o),
  w1 = (o = {}) => [C1(o), T1],
  $h = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[$h] > "u") {
  for (const o of [yu, bu]) {
    const s = history[o];
    history[o] = function () {
      const c = s.apply(this, arguments),
        r = new Event(o);
      return ((r.arguments = arguments), dispatchEvent(r), c);
    };
  }
  Object.defineProperty(window, $h, { value: !0 });
}
const A1 = (o, s) =>
    s.toLowerCase().indexOf(o.toLowerCase())
      ? "~" + s
      : s.slice(o.length) || "/",
  ag = (o = "") => (o === "/" ? "" : o),
  N1 = (o, s) => (o[0] === "~" ? o.slice(1) : ag(s) + o),
  z1 = (o = "", s) => A1(Fh(ag(o)), Fh(s)),
  Fh = o => {
    try {
      return decodeURI(o);
    } catch {
      return o;
    }
  },
  lg = {
    hook: w1,
    searchHook: E1,
    parser: f1,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    ssrContext: void 0,
    hrefs: o => o,
  },
  og = z.createContext(lg),
  Ko = () => z.useContext(og),
  ig = {},
  sg = z.createContext(ig),
  O1 = () => z.useContext(sg),
  Ns = o => {
    const [s, c] = o.hook(o);
    return [z1(o.base, s), tg((r, f) => c(N1(r, o.base), f))];
  },
  M1 = () => Ns(Ko()),
  rg = (o, s, c, r) => {
    const { pattern: f, keys: d } =
        s instanceof RegExp ? { keys: !1, pattern: s } : o(s || "*", r),
      g = f.exec(c) || [],
      [x, ...v] = g;
    return x !== void 0
      ? [
          !0,
          (() => {
            const h =
              d !== !1
                ? Object.fromEntries(d.map((m, w) => [m, v[w]]))
                : g.groups;
            let b = { ...v };
            return (h && Object.assign(b, h), b);
          })(),
          ...(r ? [x] : []),
        ]
      : [!1, null];
  },
  cg = ({ children: o, ...s }) => {
    const c = Ko(),
      r = s.hook ? lg : c;
    let f = r;
    const [d, g] = s.ssrPath?.split("?") ?? [];
    (g && ((s.ssrSearch = g), (s.ssrPath = d)),
      (s.hrefs = s.hrefs ?? s.hook?.hrefs));
    let x = z.useRef({}),
      v = x.current,
      h = v;
    for (let b in r) {
      const m = b === "base" ? r[b] + (s[b] || "") : s[b] || r[b];
      (v === h && m !== h[b] && (x.current = h = { ...h }),
        (h[b] = m),
        (m !== r[b] || m !== f[b]) && (f = h));
    }
    return z.createElement(og.Provider, { value: f, children: o });
  },
  Wh = ({ children: o, component: s }, c) =>
    s ? z.createElement(s, { params: c }) : typeof o == "function" ? o(c) : o,
  j1 = o => {
    let s = z.useRef(ig);
    const c = s.current;
    return (s.current =
      Object.keys(o).length !== Object.keys(c).length ||
      Object.entries(o).some(([r, f]) => f !== c[r])
        ? o
        : c);
  },
  Wc = ({ path: o, nest: s, match: c, ...r }) => {
    const f = Ko(),
      [d] = Ns(f),
      [g, x, v] = c ?? rg(f.parser, o, d, s),
      h = j1({ ...O1(), ...x });
    if (!g) return null;
    const b = v ? z.createElement(cg, { base: v }, Wh(r, h)) : Wh(r, h);
    return z.createElement(sg.Provider, { value: h, children: b });
  };
z.forwardRef((o, s) => {
  const c = Ko(),
    [r, f] = Ns(c),
    {
      to: d = "",
      href: g = d,
      onClick: x,
      asChild: v,
      children: h,
      className: b,
      replace: m,
      state: w,
      ...N
    } = o,
    R = tg(k => {
      k.ctrlKey ||
        k.metaKey ||
        k.altKey ||
        k.shiftKey ||
        k.button !== 0 ||
        (x?.(k), k.defaultPrevented || (k.preventDefault(), f(g, o)));
    }),
    B = c.hrefs(g[0] === "~" ? g.slice(1) : c.base + g, c);
  return v && z.isValidElement(h)
    ? z.cloneElement(h, { onClick: R, href: B })
    : z.createElement("a", {
        ...N,
        onClick: R,
        href: B,
        className: b?.call ? b(r === g) : b,
        children: h,
        ref: s,
      });
});
const su = o =>
    Array.isArray(o)
      ? o.flatMap(s => su(s && s.type === z.Fragment ? s.props.children : s))
      : [o],
  R1 = ({ children: o, location: s }) => {
    const c = Ko(),
      [r] = Ns(c);
    typeof window < "u" &&
      (window.__WOUTER_ROUTES__ || (window.__WOUTER_ROUTES__ = []),
      su(o).forEach(d => {
        if (z.isValidElement(d) && d.props.path) {
          const g = d.props.path;
          window.__WOUTER_ROUTES__.includes(g) ||
            window.__WOUTER_ROUTES__.push(g);
        }
      }));
    for (const f of su(o)) {
      let d = 0;
      if (
        z.isValidElement(f) &&
        (d = rg(c.parser, f.props.path, s || r, f.props.nest))[0]
      )
        return z.cloneElement(f, { match: d });
    }
    return null;
  };
function Ph() {
  const [, o] = M1(),
    s = () => {
      o("/");
    };
  return y.jsx("div", {
    "data-loc": "client/src/pages/NotFound.tsx:14",
    className:
      "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100",
    children: y.jsx(rn, {
      "data-loc": "client/src/pages/NotFound.tsx:15",
      className:
        "w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm",
      children: y.jsxs(a1, {
        "data-loc": "client/src/pages/NotFound.tsx:16",
        className: "pt-8 pb-8 text-center",
        children: [
          y.jsx("div", {
            "data-loc": "client/src/pages/NotFound.tsx:17",
            className: "flex justify-center mb-6",
            children: y.jsxs("div", {
              "data-loc": "client/src/pages/NotFound.tsx:18",
              className: "relative",
              children: [
                y.jsx("div", {
                  "data-loc": "client/src/pages/NotFound.tsx:19",
                  className:
                    "absolute inset-0 bg-red-100 rounded-full animate-pulse",
                }),
                y.jsx(s1, {
                  "data-loc": "client/src/pages/NotFound.tsx:20",
                  className: "relative h-16 w-16 text-red-500",
                }),
              ],
            }),
          }),
          y.jsx("h1", {
            "data-loc": "client/src/pages/NotFound.tsx:24",
            className: "text-4xl font-bold text-slate-900 mb-2",
            children: "404",
          }),
          y.jsx("h2", {
            "data-loc": "client/src/pages/NotFound.tsx:26",
            className: "text-xl font-semibold text-slate-700 mb-4",
            children: "Page Not Found",
          }),
          y.jsxs("p", {
            "data-loc": "client/src/pages/NotFound.tsx:30",
            className: "text-slate-600 mb-8 leading-relaxed",
            children: [
              "Sorry, the page you are looking for doesn't exist.",
              y.jsx("br", { "data-loc": "client/src/pages/NotFound.tsx:32" }),
              "It may have been moved or deleted.",
            ],
          }),
          y.jsx("div", {
            "data-loc": "client/src/pages/NotFound.tsx:36",
            className: "flex flex-col sm:flex-row gap-3 justify-center",
            children: y.jsxs(Fe, {
              "data-loc": "client/src/pages/NotFound.tsx:37",
              onClick: s,
              className:
                "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
              children: [
                y.jsx(r1, {
                  "data-loc": "client/src/pages/NotFound.tsx:41",
                  className: "w-4 h-4 mr-2",
                }),
                "Go Home",
              ],
            }),
          }),
        ],
      }),
    }),
  });
}
const Vo = { v: [] },
  Ih = () => Vo.v.forEach(o => o()),
  _1 = o => (
    Vo.v.push(o) === 1 && addEventListener("hashchange", Ih),
    () => {
      ((Vo.v = Vo.v.filter(s => s !== o)),
        Vo.v.length || removeEventListener("hashchange", Ih));
    }
  ),
  D1 = () => "/" + location.hash.replace(/^#?\/?/, ""),
  G1 = (o, { state: s = null, replace: c = !1 } = {}) => {
    const [r, f] = o.replace(/^#?\/?/, "").split("?"),
      d = location.pathname + (f ? `?${f}` : location.search) + `#/${r}`,
      g = location.href,
      x = new URL(d, location.origin).href;
    c ? history.replaceState(s, "", d) : history.pushState(s, "", d);
    const v =
      typeof HashChangeEvent < "u"
        ? new HashChangeEvent("hashchange", { oldURL: g, newURL: x })
        : new Event("hashchange", { detail: { oldURL: g, newURL: x } });
    dispatchEvent(v);
  },
  ug = ({ ssrPath: o = "/" } = {}) => [
    eg.useSyncExternalStore(_1, D1, () => o),
    G1,
  ];
ug.hrefs = o => "#" + o;
class U1 extends z.Component {
  constructor(s) {
    (super(s), (this.state = { hasError: !1, error: null }));
  }
  static getDerivedStateFromError(s) {
    return { hasError: !0, error: s };
  }
  render() {
    return this.state.hasError
      ? y.jsx("div", {
          "data-loc": "client/src/components/ErrorBoundary.tsx:27",
          className:
            "flex items-center justify-center min-h-screen p-8 bg-background",
          children: y.jsxs("div", {
            "data-loc": "client/src/components/ErrorBoundary.tsx:28",
            className: "flex flex-col items-center w-full max-w-2xl p-8",
            children: [
              y.jsx(u1, {
                "data-loc": "client/src/components/ErrorBoundary.tsx:29",
                size: 48,
                className: "text-destructive mb-6 flex-shrink-0",
              }),
              y.jsx("h2", {
                "data-loc": "client/src/components/ErrorBoundary.tsx:34",
                className: "text-xl mb-4",
                children: "An unexpected error occurred.",
              }),
              y.jsx("div", {
                "data-loc": "client/src/components/ErrorBoundary.tsx:36",
                className: "p-4 w-full rounded bg-muted overflow-auto mb-6",
                children: y.jsx("pre", {
                  "data-loc": "client/src/components/ErrorBoundary.tsx:37",
                  className:
                    "text-sm text-muted-foreground whitespace-break-spaces",
                  children: this.state.error?.stack,
                }),
              }),
              y.jsxs("button", {
                "data-loc": "client/src/components/ErrorBoundary.tsx:42",
                onClick: () => window.location.reload(),
                className: ws(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer"
                ),
                children: [
                  y.jsx(c1, {
                    "data-loc": "client/src/components/ErrorBoundary.tsx:50",
                    size: 16,
                  }),
                  "Reload Page",
                ],
              }),
            ],
          }),
        })
      : this.props.children;
  }
}
const H1 = z.createContext(void 0);
function B1({ children: o, defaultTheme: s = "light", switchable: c = !1 }) {
  const [r, f] = z.useState(() => (c && localStorage.getItem("theme")) || s);
  z.useEffect(() => {
    const g = document.documentElement;
    (r === "dark" ? g.classList.add("dark") : g.classList.remove("dark"),
      c && localStorage.setItem("theme", r));
  }, [r, c]);
  const d = c
    ? () => {
        f(g => (g === "light" ? "dark" : "light"));
      }
    : void 0;
  return y.jsx(H1.Provider, {
    "data-loc": "client/src/contexts/ThemeContext.tsx:52",
    value: { theme: r, toggleTheme: d, switchable: c },
    children: o,
  });
}
function q1() {
  const o = z.useCallback(() => {
      try {
        const r = new (window.AudioContext || window.webkitAudioContext)(),
          f = r.currentTime,
          d = 1.5;
        for (let m = 0; m < 5; m++) {
          const w = r.createOscillator(),
            N = r.createGain();
          (w.connect(N),
            N.connect(r.destination),
            (w.frequency.value = 200 + Math.random() * 300),
            (w.type = "sine"),
            N.gain.setValueAtTime(0.1, f),
            N.gain.linearRampToValueAtTime(0.2, f + 0.1),
            N.gain.exponentialRampToValueAtTime(0.01, f + d),
            w.start(f + m * 0.1),
            w.stop(f + d + m * 0.1));
        }
        const g = r.sampleRate * d,
          x = r.createBuffer(1, g, r.sampleRate),
          v = x.getChannelData(0);
        for (let m = 0; m < g; m++) v[m] = Math.random() * 2 - 1;
        const h = r.createBufferSource(),
          b = r.createGain();
        ((h.buffer = x),
          h.connect(b),
          b.connect(r.destination),
          b.gain.setValueAtTime(0.05, f),
          b.gain.exponentialRampToValueAtTime(0.01, f + d),
          h.start(f),
          h.stop(f + d));
      } catch (r) {
        console.warn("Erro ao reproduzir som de aplausos:", r);
      }
    }, []),
    s = z.useCallback(() => {
      try {
        const r = new (window.AudioContext || window.webkitAudioContext)(),
          f = r.currentTime,
          d = 1.2;
        for (let m = 0; m < 3; m++) {
          const w = r.createOscillator(),
            N = r.createGain();
          (w.connect(N),
            N.connect(r.destination),
            (w.frequency.value = 80 + Math.random() * 120),
            (w.type = "sine"),
            N.gain.setValueAtTime(0.15, f),
            N.gain.linearRampToValueAtTime(0.25, f + 0.2),
            N.gain.exponentialRampToValueAtTime(0.02, f + d),
            w.start(f + m * 0.15),
            w.stop(f + d + m * 0.15));
        }
        const g = r.sampleRate * d,
          x = r.createBuffer(1, g, r.sampleRate),
          v = x.getChannelData(0);
        for (let m = 0; m < g; m++) v[m] = Math.random() * 2 - 1;
        const h = r.createBufferSource(),
          b = r.createGain();
        ((h.buffer = x),
          h.connect(b),
          b.connect(r.destination),
          b.gain.setValueAtTime(0.08, f),
          b.gain.exponentialRampToValueAtTime(0.02, f + d),
          h.start(f),
          h.stop(f + d));
      } catch (r) {
        console.warn("Erro ao reproduzir som de vaias:", r);
      }
    }, []),
    c = z.useCallback(() => {
      try {
        const r = new (window.AudioContext || window.webkitAudioContext)(),
          f = r.currentTime;
        [800, 1200].forEach((g, x) => {
          const v = r.createOscillator(),
            h = r.createGain();
          (v.connect(h),
            h.connect(r.destination),
            (v.frequency.value = g),
            (v.type = "sine"));
          const b = f + x * 0.1;
          (h.gain.setValueAtTime(0.2, b),
            h.gain.exponentialRampToValueAtTime(0.01, b + 0.3),
            v.start(b),
            v.stop(b + 0.3));
        });
      } catch (r) {
        console.warn("Erro ao reproduzir som de confirmação:", r);
      }
    }, []);
  return { playApplause: o, playBoo: s, playVoteConfirm: c };
}
const L1 = [
    {
      id: "casual",
      name: "Pack Casual",
      description: "Diversão leve e social para qualquer grupo",
      emoji: "🎉",
      color: "from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/50",
      topics: [
        "Trair é justificável em certas situações?",
        "Dinheiro traz felicidade verdadeira?",
        "O telemóvel estraga as relações?",
        "Mentir é aceitável para proteger alguém?",
        "Amizade entre ex-namorados funciona?",
        "Ciúmes é sinal de amor?",
        "Perdoar tudo numa relação é saudável?",
        "Segredos devem ser sempre revelados?",
        "Trabalho é mais importante que família?",
        "Tecnologia torna-nos mais felizes?",
        "Amigos de infância são os melhores amigos?",
        "Redes sociais fazem mais mal do que bem?",
        "É possível ter demasiados amigos?",
        "Férias em família são sempre divertidas?",
        "Animais de estimação melhoram a vida?",
        "Música ao vivo é melhor que gravada?",
        "Jogos de tabuleiro são mais divertidos que videojogos?",
        "Cozinhar em casa é melhor que comer fora?",
        "Viajar sozinho é mais enriquecedor?",
        "Ler livros é melhor que ver filmes?",
        "Acordar cedo torna as pessoas mais produtivas?",
        "O humor é a melhor forma de lidar com problemas?",
        "Surpresas são sempre bem-vindas?",
        "Festas de aniversário devem ser celebradas?",
        "Desporto em equipa é melhor que individual?",
        "Ter rotinas torna a vida mais feliz?",
        "Presentear é mais importante que receber?",
        "Viver na cidade é melhor que no campo?",
        "Ter poucos amigos próximos é melhor que muitos?",
        "A primeira impressão é sempre a que fica?",
        "Pedir desculpa é sempre necessário?",
        "Competição saudável melhora as relações?",
        "Guardar rancor faz mal à saúde?",
        "Partilhar tudo com o parceiro é essencial?",
        "Hobbies individuais fortalecem relacionamentos?",
        "Viagens em casal aproximam as pessoas?",
        "Ter filhos é necessário para ser feliz?",
        "Casamento é uma instituição ultrapassada?",
        "Amizades online são tão válidas quanto presenciais?",
        "Pedir ajuda é sinal de fraqueza?",
        "Ser organizado torna a vida mais fácil?",
        "Dormir tarde é prejudicial para a saúde?",
        "Comer saudável exige muito esforço?",
        "Fazer exercício diário é obrigatório?",
        "Meditar muda realmente a vida?",
        "Aprender uma língua nova vale o esforço?",
        "Viver no estrangeiro enriquece a personalidade?",
        "Ter um emprego estável é mais importante que seguir sonhos?",
        "Poupar dinheiro deve ser prioridade?",
        "Ajudar estranhos é sempre a coisa certa?",
      ],
    },
    {
      id: "profissional",
      name: "Pack Profissional",
      description: "Ambiente de trabalho e dinâmicas corporativas",
      emoji: "💼",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/50",
      topics: [
        "O salário é o fator mais importante num emprego?",
        "Trabalhar em equipa é sempre mais eficiente?",
        "O chefe tem sempre razão?",
        "Horas extra devem ser sempre pagas?",
        "Trabalho remoto é mais produtivo que presencial?",
        "A experiência vale mais que a formação académica?",
        "Networking é essencial para o sucesso profissional?",
        "Mudar de emprego frequentemente é prejudicial?",
        "O ambiente de trabalho afeta a produtividade?",
        "Liderança é uma qualidade inata?",
        "Reuniões de trabalho são sempre necessárias?",
        "Feedback negativo deve ser dado em público?",
        "Amizades no trabalho complicam as relações profissionais?",
        "Empreender é mais arriscado do que trabalhar por conta de outrem?",
        "A inteligência emocional é mais importante que o QI?",
        "Delegar tarefas é sinal de fraqueza?",
        "Trabalhar sob pressão melhora o desempenho?",
        "A formação contínua é responsabilidade do empregador?",
        "Conflitos no trabalho devem ser evitados?",
        "A cultura da empresa é mais importante que o salário?",
        "Pausas frequentes aumentam a produtividade?",
        "O dress code no trabalho é importante?",
        "Metas ambiciosas motivam mais que realistas?",
        "Reconhecimento público é mais valioso que bónus?",
        "Hierarquias rígidas prejudicam a inovação?",
        "Erros devem ser sempre assumidos perante a equipa?",
        "Mentoring acelera o crescimento profissional?",
        "Trabalhar num setor apaixonante compensa salário baixo?",
        "Diversidade nas equipas melhora os resultados?",
        "Automatização vai eliminar mais empregos do que cria?",
        "Ter um plano de carreira é essencial?",
        "Críticas construtivas são sempre bem-vindas?",
        "Trabalhar para uma grande empresa é melhor que para uma startup?",
        "A motivação intrínseca supera a extrínseca?",
        "Reuniões de pé são mais eficientes?",
        "O open space prejudica a concentração?",
        "Políticas de empresa devem ser flexíveis?",
        "Avaliações de desempenho são justas?",
        "O equilíbrio trabalho-vida é responsabilidade do empregado?",
        "Inovar implica sempre correr riscos?",
        "Competição interna motiva as equipas?",
        "Transparência total numa empresa é possível?",
        "Líderes devem ser amigos dos colaboradores?",
        "Trabalhar menos horas aumenta a produtividade?",
        "O sucesso profissional exige sacrifícios pessoais?",
        "Empresas devem ter responsabilidade social?",
        "Inteligência artificial vai substituir gestores?",
        "Contratos a prazo prejudicam os trabalhadores?",
        "Sindicatos são ainda relevantes?",
        "O futuro do trabalho é totalmente remoto?",
      ],
    },
    {
      id: "autoconhecimento",
      name: "Pack Autoconhecimento",
      description: "Reflexão, valores pessoais e descobertas sobre si mesmo",
      emoji: "🧠",
      color: "from-violet-500/20 to-indigo-500/20",
      borderColor: "border-violet-500/50",
      isAdult: !1,
      topics: [
        "Conheces verdadeiramente os teus pontos fracos?",
        "As tuas escolhas refletem os teus valores reais?",
        "Tens medo de ficar sozinho com os teus pensamentos?",
        "Já perdoaste completamente alguém que te magoou?",
        "O teu maior crítico és tu mesmo?",
        "Vives de acordo com as tuas prioridades?",
        "Tens clareza sobre o que queres para o futuro?",
        "Consegues pedir ajuda sem sentir vergonha?",
        "As tuas reações emocionais são proporcionais?",
        "Sabes distinguir o que controlas do que não controlas?",
        "Os teus medos limitam as tuas decisões?",
        "Já te arrependeste de uma escolha que parecia certa?",
        "Consegues aceitar críticas sem te defender?",
        "A tua autoestima depende da opinião dos outros?",
        "Tens hábitos que contradizem os teus valores?",
        "Já agiste contra a tua consciência por pressão social?",
        "Sabes qual é o teu propósito de vida?",
        "Tens dificuldade em estabelecer limites com os outros?",
        "O teu passado define quem és hoje?",
        "Consegues ser feliz sem aprovação externa?",
        "Já te perdoaste por erros do passado?",
        "A tua identidade mudou muito nos últimos anos?",
        "Tens clareza sobre os teus valores fundamentais?",
        "Consegues distinguir necessidades de desejos?",
        "A tua intuição é mais fiável que a razão?",
        "Já sacrificaste a tua felicidade pelos outros?",
        "Tens consciência dos teus padrões relacionais?",
        "O sucesso que persegues é realmente o teu?",
        "Consegues viver o presente sem ansiedade?",
        "Já mudaste de opinião sobre algo importante?",
        "Os teus sonhos refletem quem és de verdade?",
        "Tens medo de decepcionar as pessoas que amas?",
        "Sabes o que te faz genuinamente feliz?",
        "Já agiste por medo em vez de por escolha?",
        "Consegues aceitar que não és perfeito?",
        "A tua vida atual é a que escolherias?",
        "Tens clareza sobre o que não queres na vida?",
        "Já te perdeste tentando agradar a todos?",
        "Consegues ser vulnerável com as pessoas próximas?",
        "O teu maior medo é o fracasso ou o sucesso?",
        "Já questionaste crenças que herdaste da família?",
        "Tens padrões de comportamento que queres mudar?",
        "Sabes reconhecer quando estás a evitar algo?",
        "A tua felicidade depende de circunstâncias externas?",
        "Já te surpreendeste com a tua própria resiliência?",
        "Consegues dizer não sem sentir culpa?",
        "Tens consciência do impacto que tens nos outros?",
        "Já viveste uma experiência que te transformou?",
        "O teu eu de 10 anos atrás ficaria orgulhoso de ti?",
        "Consegues aceitar incerteza sem ansiedade?",
      ],
    },
    {
      id: "tematico",
      name: "Pack Temático",
      description: "Filmes, séries, cultura pop e entretenimento",
      emoji: "🎬",
      color: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/50",
      topics: [
        "Marvel é melhor que DC?",
        "Game of Thrones teve o final que merecia?",
        "Filmes são melhores que as séries?",
        "Streaming acabou com o cinema?",
        "Harry Potter é a melhor saga literária?",
        "Remakes arruínam os originais?",
        "Música dos anos 80/90 é melhor que a atual?",
        "Vilões são mais interessantes que heróis?",
        "Spoilers arruínam a experiência?",
        "Dublagem é melhor que legendas?",
        "Breaking Bad é a melhor série de sempre?",
        "Star Wars perdeu a magia após os originais?",
        "Livros são sempre melhores que as adaptações?",
        "Reality shows são entretenimento legítimo?",
        "Jogos de videojogo são uma forma de arte?",
        "Inteligência artificial vai substituir atores?",
        "Animação japonesa (anime) é superior à ocidental?",
        "Filmes de super-heróis estão saturados?",
        "Música clássica é mais complexa que o pop?",
        "Séries turcas são melhores que as americanas?",
        "TikTok está a matar a criatividade?",
        "Influencers são artistas legítimos?",
        "Podcasts vão substituir a rádio?",
        "Videojogos causam violência?",
        "Cinema de autor é inacessível para o grande público?",
        "Nostalgia prejudica a avaliação de obras antigas?",
        "Prémios como os Óscares são relevantes?",
        "Música sem letra é menos impactante?",
        "Séries de true crime glorificam o crime?",
        "Crossovers entre universos cinematográficos funcionam?",
        "Documentários são mais impactantes que ficção?",
        "Comédias são subvalorizadas pela crítica?",
        "Terror psicológico é mais eficaz que gore?",
        "Finais abertos são frustrantes?",
        "Personagens femininas fortes são forçadas nos filmes modernos?",
        "Sequelas raramente superam o original?",
        "Música ao vivo é sempre superior ao estúdio?",
        "Festivais de música perderam a essência?",
        "Cultura pop é efémera por natureza?",
        "Adaptações de videojogos para cinema falham sempre?",
        "Séries limitadas são melhores que as longas?",
        "Redes sociais mataram a crítica cinematográfica?",
        "Bandas sonoras definem a qualidade de um filme?",
        "Efeitos especiais excessivos prejudicam a narrativa?",
        "Comédia stand-up é a forma mais honesta de arte?",
        "Séries de época são mais cuidadas que as contemporâneas?",
        "Fandom tóxico arruína franchises?",
        "Censura em arte é sempre errada?",
        "Cultura pop americana domina de forma prejudicial?",
        "Inteligência artificial pode criar arte verdadeira?",
      ],
    },
  ],
  ep = {
    "🎤 Defensor":
      "Defende a verdade secreta. Sabe qual é a resposta correta e deve defendê-la durante o debate.",
    "🎤 Contestador":
      "Questiona tudo. Tenta descobrir quem está a mentir através de perguntas inteligentes.",
    "🤐 Mediador":
      "Neutro e observador. Conhece a verdade secreta e vota com base na lógica.",
    "🎭 Infiltrado":
      "O impostor! Finge ser Defensor mas defende o oposto da verdade. Engana todos!",
  },
  Yo = 4,
  Bl = 6,
  Y1 = () => {
    try {
      const o = localStorage.getItem("jogoMascarasScores");
      return o ? JSON.parse(o) : {};
    } catch {
      return {};
    }
  },
  V1 = () => {
    try {
      const o = localStorage.getItem("jogoMascarasPlayers");
      return o ? JSON.parse(o) : [];
    } catch {
      return [];
    }
  },
  k1 = o => {
    localStorage.setItem("jogoMascarasScores", JSON.stringify(o));
  },
  X1 = o => {
    localStorage.setItem("jogoMascarasPlayers", JSON.stringify(o));
  };
function tp({ onClose: o }) {
  return y.jsx("div", {
    "data-loc": "client/src/components/GameContainer.tsx:72",
    className:
      "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto",
    children: y.jsxs(rn, {
      "data-loc": "client/src/components/GameContainer.tsx:73",
      className: "bg-card border-orange-500/50 p-8 max-w-2xl w-full my-4",
      children: [
        y.jsx("h2", {
          "data-loc": "client/src/components/GameContainer.tsx:74",
          className: "text-3xl font-bold mb-6 text-orange-400 text-center",
          style: { fontFamily: "Playfair Display" },
          children: "📖 Como Jogar",
        }),
        y.jsxs("div", {
          "data-loc": "client/src/components/GameContainer.tsx:77",
          className: "space-y-4 text-sm text-foreground",
          children: [
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:78",
              className: "p-4 bg-background rounded-lg border border-border",
              children: [
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:79",
                  className: "font-bold text-orange-400 mb-2",
                  children: "🎯 Objetivo",
                }),
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:80",
                  children:
                    "Descobrir quem é o Infiltrado antes que ele engane toda a gente!",
                }),
              ],
            }),
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:82",
              className: "p-4 bg-background rounded-lg border border-border",
              children: [
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:83",
                  className: "font-bold text-orange-400 mb-2",
                  children: "👥 Jogadores",
                }),
                y.jsxs("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:84",
                  children: [
                    "De ",
                    y.jsx("strong", {
                      "data-loc": "client/src/components/GameContainer.tsx:84",
                      children: "4 a 6 jogadores",
                    }),
                    ". Um deles será o Defensor (escolhido aleatoriamente).",
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:86",
              className: "p-4 bg-background rounded-lg border border-border",
              children: [
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:87",
                  className: "font-bold text-orange-400 mb-2",
                  children: "🎭 Os Papéis",
                }),
                y.jsxs("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:88",
                  className: "space-y-2 mt-2",
                  children: [
                    y.jsxs("p", {
                      "data-loc": "client/src/components/GameContainer.tsx:89",
                      children: [
                        y.jsx("strong", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:89",
                          children: "🎤 Defensor",
                        }),
                        " — Escolhe o tema e a verdade secreta (SIM ou NÃO). Deve defendê-la.",
                      ],
                    }),
                    y.jsxs("p", {
                      "data-loc": "client/src/components/GameContainer.tsx:90",
                      children: [
                        y.jsx("strong", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:90",
                          children: "🎭 Infiltrado",
                        }),
                        " — Não sabe a verdade. Finge saber e tenta enganar todos.",
                      ],
                    }),
                    y.jsxs("p", {
                      "data-loc": "client/src/components/GameContainer.tsx:91",
                      children: [
                        y.jsx("strong", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:91",
                          children: "🎤 Contestador",
                        }),
                        " — Questiona e tenta descobrir quem mente.",
                      ],
                    }),
                    y.jsxs("p", {
                      "data-loc": "client/src/components/GameContainer.tsx:92",
                      children: [
                        y.jsx("strong", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:92",
                          children: "🤐 Mediador",
                        }),
                        " — Conhece a verdade secreta. Observa e vota com lógica.",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:95",
              className: "p-4 bg-background rounded-lg border border-border",
              children: [
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:96",
                  className: "font-bold text-orange-400 mb-2",
                  children: "🔄 Fluxo do Jogo",
                }),
                y.jsxs("ol", {
                  "data-loc": "client/src/components/GameContainer.tsx:97",
                  className: "list-decimal list-inside space-y-1",
                  children: [
                    y.jsx("li", {
                      "data-loc": "client/src/components/GameContainer.tsx:98",
                      children: "O Defensor escolhe um Pack e um tema",
                    }),
                    y.jsx("li", {
                      "data-loc": "client/src/components/GameContainer.tsx:99",
                      children:
                        "O Defensor escolhe a verdade secreta (SIM ou NÃO) — em privado",
                    }),
                    y.jsx("li", {
                      "data-loc": "client/src/components/GameContainer.tsx:100",
                      children: "Cada jogador recebe o seu papel em privado",
                    }),
                    y.jsx("li", {
                      "data-loc": "client/src/components/GameContainer.tsx:101",
                      children: "Debate aberto — todos discutem o tema",
                    }),
                    y.jsx("li", {
                      "data-loc": "client/src/components/GameContainer.tsx:102",
                      children:
                        "Votação — cada jogador vota em quem acha ser o Infiltrado",
                    }),
                    y.jsx("li", {
                      "data-loc": "client/src/components/GameContainer.tsx:103",
                      children: "Resultados e pontuação",
                    }),
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:106",
              className: "p-4 bg-background rounded-lg border border-border",
              children: [
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:107",
                  className: "font-bold text-orange-400 mb-2",
                  children: "🏆 Pontuação",
                }),
                y.jsxs("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:108",
                  children: [
                    "Se o Infiltrado for descoberto, todos os outros ganham ",
                    y.jsx("strong", {
                      "data-loc": "client/src/components/GameContainer.tsx:108",
                      children: "1 ponto",
                    }),
                    ".",
                  ],
                }),
                y.jsxs("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:109",
                  className: "mt-1",
                  children: [
                    "Se o Infiltrado escapar, ganha ",
                    y.jsx("strong", {
                      "data-loc": "client/src/components/GameContainer.tsx:109",
                      children: "2 pontos",
                    }),
                    " + ",
                    y.jsx("strong", {
                      "data-loc": "client/src/components/GameContainer.tsx:109",
                      children: "1 bónus",
                    }),
                    " se ninguém votou nele.",
                  ],
                }),
              ],
            }),
          ],
        }),
        y.jsx(Fe, {
          "data-loc": "client/src/components/GameContainer.tsx:112",
          onClick: o,
          className: "w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white",
          children: "✓ Entendido!",
        }),
      ],
    }),
  });
}
function Q1() {
  const { playApplause: o, playBoo: s, playVoteConfirm: c } = q1(),
    [r, f] = z.useState("landing"),
    [d, g] = z.useState(() => V1()),
    [x, v] = z.useState(""),
    [h, b] = z.useState(""),
    [m, w] = z.useState(null),
    [N, R] = z.useState(""),
    [B, k] = z.useState(""),
    [L, P] = z.useState([]),
    [K, F] = z.useState(() => Y1()),
    [I, ee] = z.useState(!1),
    [Q, Z] = z.useState(!1),
    [pe, Ce] = z.useState(null),
    [we, ge] = z.useState(0),
    [be, ve] = z.useState(!1),
    [Se, T] = z.useState([]),
    [U, _] = z.useState(0),
    [oe, se] = z.useState("");
  (z.useEffect(() => {
    k1(K);
  }, [K]),
    z.useEffect(() => {
      X1(d);
    }, [d]));
  const E = () => {
      if (x.trim() && d.length < Bl) {
        const W = { name: x.trim() };
        (g([...d, W]), K[x.trim()] || F({ ...K, [x.trim()]: 0 }), v(""));
      }
    },
    q = W => {
      g(d.filter((de, xe) => xe !== W));
    },
    G = () => {
      if (d.length < Yo || d.length > Bl) return;
      const W = Math.floor(Math.random() * d.length);
      (k(d[W].name), f("selectPack"));
    },
    X = W => {
      W.isAdult ? (Ce(W), Z(!0)) : (w(W), f("selectTopic"));
    },
    $ = () => {
      (pe && (w(pe), f("selectTopic")), Z(!1), Ce(null));
    },
    re = () => {
      (Z(!1), Ce(null));
    },
    ne = W => {
      (b(W), f("chooseAnswer"));
    },
    fe = W => {
      (R(W), Ne());
    },
    Ne = W => {
      const de = [...d].sort(() => Math.random() - 0.5),
        xe = [];
      xe.push({ name: B, role: "🎤 Defensor" });
      const St = de.find(Ve => Ve.name !== B);
      St && xe.push({ name: St.name, role: "🤐 Mediador" });
      const ke = de.filter(Ve => !xe.some(fn => fn.name === Ve.name));
      (ke.length > 0 && xe.push({ name: ke[0].name, role: "🎭 Infiltrado" }),
        de
          .filter(Ve => !xe.some(fn => fn.name === Ve.name))
          .forEach(Ve => {
            xe.push({ name: Ve.name, role: "🎤 Contestador" });
          }));
      const Ze = [...xe].sort(() => Math.random() - 0.5);
      (P(Ze), f("showRoles"), ge(0), ve(!1));
    },
    ot = () => ve(!0),
    dt = () => {
      we < L.length - 1 ? (ge(we + 1), ve(!1)) : f("discussion");
    },
    it = () => {
      (f("voting"), _(0), se(""), T([]));
    },
    tn = W => {
      c();
      const de = L[U],
        xe = [...Se, { voter: de.name, target: W, role: de.role }];
      (T(xe), U < L.length - 1 ? (_(U + 1), se("")) : Gt(xe));
    },
    Gt = W => {
      const de = { ...K };
      d.forEach(ke => {
        de[ke.name] === void 0 && (de[ke.name] = 0);
      });
      const xe = {};
      W.forEach(ke => {
        xe[ke.target] = (xe[ke.target] || 0) + 1;
      });
      const St = Object.entries(xe).sort(([, ke], [, me]) => me - ke)[0];
      if (St)
        if ((L.find(me => me.name === St[0])?.role || "") === "🎭 Infiltrado")
          (W.forEach(me => {
            me.voter !== St[0] && (de[me.voter] = (de[me.voter] || 0) + 1);
          }),
            o());
        else {
          const me = L.find(Ze => Ze.role === "🎭 Infiltrado");
          me && ((de[me.name] = (de[me.name] || 0) + 2), s());
        }
      (L.forEach(ke => {
        ke.role === "🎭 Infiltrado" &&
          (W.some(Ze => Ze.target === ke.name) ||
            (de[ke.name] = (de[ke.name] || 0) + 1));
      }),
        F(de),
        f("results"));
    },
    Jn = () => {
      (f("setup"),
        b(""),
        w(null),
        R(""),
        k(""),
        P([]),
        ge(0),
        ve(!1),
        T([]),
        _(0),
        se(""));
    },
    Cn = () => {
      (Jn(), f("landing"));
    };
  if (r === "landing")
    return y.jsxs(y.Fragment, {
      children: [
        I &&
          y.jsx(tp, {
            "data-loc": "client/src/components/GameContainer.tsx:323",
            onClose: () => ee(!1),
          }),
        y.jsxs("div", {
          "data-loc": "client/src/components/GameContainer.tsx:324",
          className:
            "min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4",
          style: {
            background:
              "linear-gradient(135deg, #0a0a0a 0%, rgba(255,107,53,0.08) 100%)",
          },
          children: [
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:326",
              className: "absolute inset-0 overflow-hidden pointer-events-none",
              children: [
                y.jsx("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:327",
                  className:
                    "absolute top-16 left-8 text-9xl opacity-5 select-none",
                  children: "🎭",
                }),
                y.jsx("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:328",
                  className:
                    "absolute bottom-16 right-8 text-9xl opacity-5 select-none",
                  children: "🎭",
                }),
              ],
            }),
            y.jsxs("div", {
              "data-loc": "client/src/components/GameContainer.tsx:330",
              className: "text-center max-w-2xl mx-auto relative z-10",
              children: [
                y.jsx("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:331",
                  className: "text-7xl mb-6",
                  children: "🎭",
                }),
                y.jsxs("h1", {
                  "data-loc": "client/src/components/GameContainer.tsx:332",
                  className: "text-6xl md:text-7xl font-bold text-white mb-3",
                  style: { fontFamily: "Playfair Display" },
                  children: [
                    "Jogo de ",
                    y.jsx("span", {
                      "data-loc": "client/src/components/GameContainer.tsx:333",
                      className: "text-orange-400",
                      children: "Máscaras",
                    }),
                  ],
                }),
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:335",
                  className: "text-xl text-orange-300 mb-2",
                  children: "Debate. Engano. Verdade.",
                }),
                y.jsx("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:336",
                  className: "text-muted-foreground mb-10 text-sm",
                  children: "Um jogo de dedução social para 4 a 6 jogadores",
                }),
                y.jsxs("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:337",
                  className:
                    "flex flex-col sm:flex-row gap-4 justify-center mb-10",
                  children: [
                    y.jsx(Fe, {
                      "data-loc": "client/src/components/GameContainer.tsx:338",
                      onClick: () => f("setup"),
                      className:
                        "bg-orange-500 hover:bg-orange-600 text-white text-lg px-10 py-6 rounded-xl shadow-lg shadow-orange-500/20",
                      children: "▶️ Jogar Agora",
                    }),
                    y.jsx(Fe, {
                      "data-loc": "client/src/components/GameContainer.tsx:342",
                      onClick: () => ee(!0),
                      variant: "outline",
                      className:
                        "border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-lg px-10 py-6 rounded-xl",
                      children: "📖 Ver Instruções",
                    }),
                  ],
                }),
                y.jsx("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:347",
                  className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                  children: Object.entries(ep).map(([W, de]) =>
                    y.jsxs(
                      "div",
                      {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:349",
                        className:
                          "p-3 bg-card/50 border border-border rounded-lg text-center",
                        children: [
                          y.jsx("p", {
                            "data-loc":
                              "client/src/components/GameContainer.tsx:350",
                            className: "text-2xl mb-1",
                            children: W.split(" ")[0],
                          }),
                          y.jsx("p", {
                            "data-loc":
                              "client/src/components/GameContainer.tsx:351",
                            className: "text-xs font-bold text-orange-400",
                            children: W.split(" ").slice(1).join(" "),
                          }),
                          y.jsxs("p", {
                            "data-loc":
                              "client/src/components/GameContainer.tsx:352",
                            className: "text-xs text-muted-foreground mt-1",
                            children: [de.split(".")[0], "."],
                          }),
                        ],
                      },
                      W
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  if (r === "setup")
    return y.jsxs(y.Fragment, {
      children: [
        I &&
          y.jsx(tp, {
            "data-loc": "client/src/components/GameContainer.tsx:366",
            onClose: () => ee(!1),
          }),
        y.jsxs("div", {
          "data-loc": "client/src/components/GameContainer.tsx:367",
          className: "min-h-screen bg-background text-foreground flex flex-col",
          children: [
            y.jsx("div", {
              "data-loc": "client/src/components/GameContainer.tsx:368",
              className: "h-40 flex items-center justify-center",
              style: {
                background:
                  "linear-gradient(135deg, rgba(10,10,10,0.95), rgba(255,107,53,0.2))",
              },
              children: y.jsxs("div", {
                "data-loc": "client/src/components/GameContainer.tsx:370",
                className: "text-center",
                children: [
                  y.jsx("h1", {
                    "data-loc": "client/src/components/GameContainer.tsx:371",
                    className: "text-4xl font-bold text-white",
                    style: { fontFamily: "Playfair Display" },
                    children: "Jogo de Máscaras",
                  }),
                  y.jsx("p", {
                    "data-loc": "client/src/components/GameContainer.tsx:372",
                    className: "text-orange-300 text-sm mt-1",
                    children: "Debate, Engano e Verdade",
                  }),
                ],
              }),
            }),
            y.jsx("div", {
              "data-loc": "client/src/components/GameContainer.tsx:375",
              className: "container py-8 flex-1",
              children: y.jsxs("div", {
                "data-loc": "client/src/components/GameContainer.tsx:376",
                className: "max-w-2xl mx-auto",
                children: [
                  y.jsxs("div", {
                    "data-loc": "client/src/components/GameContainer.tsx:377",
                    className: "flex gap-2 mb-4",
                    children: [
                      y.jsx(Fe, {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:378",
                        onClick: Cn,
                        variant: "outline",
                        className:
                          "border-border text-muted-foreground hover:text-foreground",
                        children: "← Voltar Atrás",
                      }),
                      y.jsx(Fe, {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:382",
                        onClick: () => ee(!0),
                        variant: "outline",
                        size: "sm",
                        className:
                          "border-orange-500/50 text-orange-400 hover:bg-orange-500/10 ml-auto",
                        children: "📖 Ver Instruções",
                      }),
                    ],
                  }),
                  y.jsxs(rn, {
                    "data-loc": "client/src/components/GameContainer.tsx:387",
                    className: "bg-card border-border p-8",
                    children: [
                      y.jsxs("div", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:388",
                        className: "flex items-center gap-3 mb-2",
                        children: [
                          y.jsx("span", {
                            "data-loc":
                              "client/src/components/GameContainer.tsx:389",
                            className: "text-2xl",
                            children: "👥",
                          }),
                          y.jsx("h2", {
                            "data-loc":
                              "client/src/components/GameContainer.tsx:390",
                            className: "text-3xl font-bold",
                            style: { fontFamily: "Playfair Display" },
                            children: "Jogadores",
                          }),
                        ],
                      }),
                      y.jsxs("p", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:392",
                        className: "text-sm text-muted-foreground mb-6",
                        children: ["Adiciona de ", Yo, " a ", Bl, " jogadores"],
                      }),
                      d.length < Bl &&
                        y.jsxs("div", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:395",
                          className: "flex flex-col gap-2 mb-6",
                          children: [
                            y.jsx("input", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:396",
                              type: "text",
                              placeholder: "Nome do jogador...",
                              value: x,
                              onChange: W => v(W.target.value),
                              onKeyDown: W => W.key === "Enter" && E(),
                              className:
                                "w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-orange-500",
                            }),
                            y.jsx(Fe, {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:401",
                              onClick: E,
                              disabled: !x.trim(),
                              className:
                                "w-full bg-orange-500 hover:bg-orange-600",
                              children: "+ Adicionar",
                            }),
                          ],
                        }),
                      d.length > 0 &&
                        y.jsxs("div", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:407",
                          className: "mb-6 p-4 bg-background rounded-lg",
                          children: [
                            y.jsxs("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:408",
                              className: "text-sm text-muted-foreground mb-3",
                              children: ["Jogadores (", d.length, "/", Bl, ")"],
                            }),
                            y.jsx("div", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:409",
                              className: "space-y-2",
                              children: d.map((W, de) =>
                                y.jsxs(
                                  "div",
                                  {
                                    "data-loc":
                                      "client/src/components/GameContainer.tsx:411",
                                    className:
                                      "flex justify-between items-center p-2 bg-card rounded border border-border",
                                    children: [
                                      y.jsxs("span", {
                                        "data-loc":
                                          "client/src/components/GameContainer.tsx:412",
                                        className: "font-medium",
                                        children: [de + 1, ". ", W.name],
                                      }),
                                      y.jsx(Fe, {
                                        "data-loc":
                                          "client/src/components/GameContainer.tsx:413",
                                        onClick: () => q(de),
                                        variant: "destructive",
                                        size: "sm",
                                        className: "text-xs",
                                        children: "Remover",
                                      }),
                                    ],
                                  },
                                  de
                                )
                              ),
                            }),
                          ],
                        }),
                      Object.keys(K).length > 0 &&
                        y.jsxs("div", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:421",
                          className:
                            "mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg",
                          children: [
                            y.jsx("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:422",
                              className:
                                "text-sm font-bold text-orange-400 mb-3",
                              children: "🏆 Ranking Geral",
                            }),
                            y.jsx("div", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:423",
                              className: "space-y-2",
                              children: Object.entries(K)
                                .sort(([, W], [, de]) => de - W)
                                .slice(0, 5)
                                .map(([W, de], xe) =>
                                  y.jsxs(
                                    "div",
                                    {
                                      "data-loc":
                                        "client/src/components/GameContainer.tsx:425",
                                      className:
                                        "flex justify-between items-center text-sm",
                                      children: [
                                        y.jsxs("span", {
                                          "data-loc":
                                            "client/src/components/GameContainer.tsx:426",
                                          children: [xe + 1, ". ", W],
                                        }),
                                        y.jsxs("span", {
                                          "data-loc":
                                            "client/src/components/GameContainer.tsx:427",
                                          className:
                                            "font-bold text-orange-400",
                                          children: [de, " pts"],
                                        }),
                                      ],
                                    },
                                    xe
                                  )
                                ),
                            }),
                          ],
                        }),
                      y.jsx(Fe, {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:434",
                        onClick: G,
                        disabled: d.length < Yo || d.length > Bl,
                        className:
                          "w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6",
                        children: "▶️ Começar Jogo",
                      }),
                      d.length < Yo &&
                        y.jsxs("p", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:440",
                          className:
                            "mt-4 p-3 bg-orange-500/20 border border-orange-500/50 rounded text-sm text-orange-300 text-center",
                          children: [
                            "ℹ️ Precisas de pelo menos ",
                            Yo,
                            " jogadores para começar",
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  if (r === "selectPack")
    return y.jsxs(y.Fragment, {
      children: [
        Q &&
          y.jsx("div", {
            "data-loc": "client/src/components/GameContainer.tsx:458",
            className:
              "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4",
            children: y.jsxs(rn, {
              "data-loc": "client/src/components/GameContainer.tsx:459",
              className:
                "bg-card border-red-500/50 p-8 max-w-sm w-full text-center",
              children: [
                y.jsx("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:460",
                  className: "text-5xl mb-4",
                  children: "🔞",
                }),
                y.jsx("h2", {
                  "data-loc": "client/src/components/GameContainer.tsx:461",
                  className: "text-2xl font-bold mb-3 text-red-400",
                  style: { fontFamily: "Playfair Display" },
                  children: "Conteúdo +18",
                }),
                y.jsxs("p", {
                  "data-loc": "client/src/components/GameContainer.tsx:462",
                  className: "text-sm text-muted-foreground mb-6",
                  children: [
                    "O ",
                    y.jsx("strong", {
                      "data-loc": "client/src/components/GameContainer.tsx:463",
                      className: "text-foreground",
                      children: "Pack Ousado",
                    }),
                    " contém temas de natureza adulta e atrevida. Confirmas que tens ",
                    y.jsx("strong", {
                      "data-loc": "client/src/components/GameContainer.tsx:464",
                      className: "text-red-400",
                      children: "18 anos ou mais",
                    }),
                    "?",
                  ],
                }),
                y.jsxs("div", {
                  "data-loc": "client/src/components/GameContainer.tsx:466",
                  className: "flex gap-3",
                  children: [
                    y.jsx(Fe, {
                      "data-loc": "client/src/components/GameContainer.tsx:467",
                      onClick: re,
                      variant: "outline",
                      className:
                        "flex-1 border-border text-muted-foreground hover:text-foreground",
                      children: "✗ Não, voltar",
                    }),
                    y.jsx(Fe, {
                      "data-loc": "client/src/components/GameContainer.tsx:471",
                      onClick: $,
                      className:
                        "flex-1 bg-red-600 hover:bg-red-700 text-white font-bold",
                      children: "✓ Tenho +18",
                    }),
                  ],
                }),
              ],
            }),
          }),
        y.jsx("div", {
          "data-loc": "client/src/components/GameContainer.tsx:479",
          className:
            "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
          children: y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:480",
            className: "max-w-2xl w-full",
            children: [
              y.jsx(Fe, {
                "data-loc": "client/src/components/GameContainer.tsx:481",
                onClick: () => f("setup"),
                variant: "outline",
                className:
                  "mb-4 border-border text-muted-foreground hover:text-foreground",
                children: "← Voltar Atrás",
              }),
              y.jsxs(rn, {
                "data-loc": "client/src/components/GameContainer.tsx:485",
                className: "bg-card border-border p-8",
                children: [
                  y.jsxs("h2", {
                    "data-loc": "client/src/components/GameContainer.tsx:486",
                    className: "text-4xl font-bold mb-2 text-center",
                    style: { fontFamily: "Playfair Display" },
                    children: [B, ", Escolhe o Pack"],
                  }),
                  y.jsx("p", {
                    "data-loc": "client/src/components/GameContainer.tsx:489",
                    className: "text-center text-orange-400 mb-8 text-sm",
                    children:
                      "Tu és o Defensor! 🎤 Escolhe a categoria de temas",
                  }),
                  y.jsx("div", {
                    "data-loc": "client/src/components/GameContainer.tsx:490",
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: L1.map(W =>
                      y.jsxs(
                        "button",
                        {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:492",
                          onClick: () => X(W),
                          className: `p-5 rounded-xl border-2 ${W.borderColor} bg-gradient-to-br ${W.color} text-left transition-all hover:scale-105 hover:shadow-lg`,
                          children: [
                            y.jsxs("div", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:494",
                              className: "flex items-center gap-3 mb-2",
                              children: [
                                y.jsx("span", {
                                  "data-loc":
                                    "client/src/components/GameContainer.tsx:495",
                                  className: "text-3xl",
                                  children: W.emoji,
                                }),
                                y.jsxs("div", {
                                  "data-loc":
                                    "client/src/components/GameContainer.tsx:496",
                                  children: [
                                    y.jsx("p", {
                                      "data-loc":
                                        "client/src/components/GameContainer.tsx:497",
                                      className:
                                        "font-bold text-foreground text-lg",
                                      children: W.name,
                                    }),
                                    W.isAdult &&
                                      y.jsx("span", {
                                        "data-loc":
                                          "client/src/components/GameContainer.tsx:499",
                                        className:
                                          "text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full",
                                        children: "🔞 +18",
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            y.jsx("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:503",
                              className: "text-sm text-muted-foreground",
                              children: W.description,
                            }),
                            y.jsxs("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:504",
                              className: "text-xs text-green-400 mt-2",
                              children: [
                                "✓ ",
                                W.topics.length,
                                " temas disponíveis",
                              ],
                            }),
                          ],
                        },
                        W.id
                      )
                    ),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  if (r === "selectTopic" && m) {
    const W = m.topics;
    return y.jsx("div", {
      "data-loc": "client/src/components/GameContainer.tsx:519",
      className:
        "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
      children: y.jsxs("div", {
        "data-loc": "client/src/components/GameContainer.tsx:520",
        className: "max-w-2xl w-full",
        children: [
          y.jsx(Fe, {
            "data-loc": "client/src/components/GameContainer.tsx:521",
            onClick: () => f("selectPack"),
            variant: "outline",
            className:
              "mb-4 border-border text-muted-foreground hover:text-foreground",
            children: "← Voltar Atrás",
          }),
          y.jsxs(rn, {
            "data-loc": "client/src/components/GameContainer.tsx:525",
            className: "bg-card border-border p-8",
            children: [
              y.jsxs("div", {
                "data-loc": "client/src/components/GameContainer.tsx:526",
                className: "flex items-center gap-3 mb-2",
                children: [
                  y.jsx("span", {
                    "data-loc": "client/src/components/GameContainer.tsx:527",
                    className: "text-3xl",
                    children: m.emoji,
                  }),
                  y.jsx("h2", {
                    "data-loc": "client/src/components/GameContainer.tsx:528",
                    className: "text-3xl font-bold",
                    style: { fontFamily: "Playfair Display" },
                    children: m.name,
                  }),
                ],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:530",
                className: "text-orange-400 mb-6 text-sm text-center",
                children: [B, ", escolhe o tema do debate 🎤"],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:531",
                className:
                  "text-xs text-green-400 font-bold mb-3 uppercase tracking-wider",
                children: ["✓ ", W.length, " Temas Disponíveis"],
              }),
              y.jsx("div", {
                "data-loc": "client/src/components/GameContainer.tsx:532",
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6",
                children: W.map((de, xe) =>
                  y.jsx(
                    Fe,
                    {
                      "data-loc": "client/src/components/GameContainer.tsx:534",
                      onClick: () => ne(de),
                      className:
                        "bg-orange-500 hover:bg-orange-600 text-white p-4 h-auto text-left whitespace-normal break-words leading-snug",
                      children: de,
                    },
                    xe
                  )
                ),
              }),
            ],
          }),
        ],
      }),
    });
  }
  if (r === "chooseAnswer")
    return y.jsx("div", {
      "data-loc": "client/src/components/GameContainer.tsx:550",
      className:
        "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
      children: y.jsxs(rn, {
        "data-loc": "client/src/components/GameContainer.tsx:551",
        className: "bg-card border-border p-8 max-w-md w-full text-center",
        children: [
          y.jsx("h2", {
            "data-loc": "client/src/components/GameContainer.tsx:552",
            className: "text-3xl font-bold mb-6",
            style: { fontFamily: "Playfair Display" },
            children: "⭐ Verdade Secreta",
          }),
          y.jsx("p", {
            "data-loc": "client/src/components/GameContainer.tsx:553",
            className: "text-xl text-orange-400 mb-4 font-medium",
            children: h,
          }),
          y.jsxs("p", {
            "data-loc": "client/src/components/GameContainer.tsx:554",
            className: "text-sm text-muted-foreground mb-8",
            children: [
              B,
              ", escolhe a verdade secreta. ",
              y.jsx("strong", {
                "data-loc": "client/src/components/GameContainer.tsx:555",
                children: "Só tu e o Mediador saberão.",
              }),
            ],
          }),
          y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:557",
            className: "flex gap-4",
            children: [
              y.jsx(Fe, {
                "data-loc": "client/src/components/GameContainer.tsx:558",
                onClick: () => fe("SIM"),
                className:
                  "flex-1 bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-8 rounded-xl",
                children: "✓ SIM",
              }),
              y.jsx(Fe, {
                "data-loc": "client/src/components/GameContainer.tsx:562",
                onClick: () => fe("NÃO"),
                className:
                  "flex-1 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-8 rounded-xl",
                children: "✗ NÃO",
              }),
            ],
          }),
        ],
      }),
    });
  if (r === "showRoles") {
    const W = L[we];
    if (!W) return null;
    const de = W.role === "🎤 Defensor" || W.role === "🤐 Mediador",
      xe = W.role === "🎭 Infiltrado";
    return y.jsx("div", {
      "data-loc": "client/src/components/GameContainer.tsx:579",
      className:
        "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
      children: y.jsxs(rn, {
        "data-loc": "client/src/components/GameContainer.tsx:580",
        className: "bg-card border-border p-8 max-w-md w-full text-center",
        children: [
          y.jsxs("p", {
            "data-loc": "client/src/components/GameContainer.tsx:581",
            className: "text-sm text-muted-foreground mb-2",
            children: ["Papel ", we + 1, " de ", L.length],
          }),
          y.jsx("h2", {
            "data-loc": "client/src/components/GameContainer.tsx:582",
            className: "text-3xl font-bold mb-4",
            style: { fontFamily: "Playfair Display" },
            children: W.name,
          }),
          y.jsxs("p", {
            "data-loc": "client/src/components/GameContainer.tsx:583",
            className: "text-sm text-muted-foreground mb-6",
            children: [
              "Passa o telemóvel a ",
              y.jsx("strong", {
                "data-loc": "client/src/components/GameContainer.tsx:584",
                children: W.name,
              }),
              " para ver o seu papel em privado.",
            ],
          }),
          be
            ? y.jsxs("div", {
                "data-loc": "client/src/components/GameContainer.tsx:594",
                className: "mb-6",
                children: [
                  y.jsxs("div", {
                    "data-loc": "client/src/components/GameContainer.tsx:595",
                    className:
                      "p-6 border-2 border-orange-500 rounded-xl bg-background mb-4",
                    children: [
                      y.jsx("p", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:596",
                        className: "text-3xl font-bold text-orange-400 mb-3",
                        children: W.role,
                      }),
                      y.jsx("p", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:597",
                        className: "text-sm text-foreground mb-4",
                        children: ep[W.role],
                      }),
                      de &&
                        y.jsxs("div", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:599",
                          className:
                            "mt-3 p-3 bg-card rounded-lg border border-border text-left",
                          children: [
                            y.jsx("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:600",
                              className: "text-xs text-muted-foreground mb-1",
                              children: "Tema em debate",
                            }),
                            y.jsx("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:601",
                              className:
                                "text-sm font-medium text-foreground mb-2",
                              children: h,
                            }),
                            y.jsx("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:602",
                              className: "text-xs text-muted-foreground mb-1",
                              children: "Verdade Secreta",
                            }),
                            y.jsx("p", {
                              "data-loc":
                                "client/src/components/GameContainer.tsx:603",
                              className: `text-2xl font-bold ${N === "SIM" ? "text-green-400" : "text-red-400"}`,
                              children: N,
                            }),
                          ],
                        }),
                      xe &&
                        y.jsx("div", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:609",
                          className:
                            "mt-3 p-3 bg-red-500/10 rounded-lg border border-red-500/30",
                          children: y.jsx("p", {
                            "data-loc":
                              "client/src/components/GameContainer.tsx:610",
                            className: "text-sm text-red-400 font-medium",
                            children:
                              "⚠️ Não sabes a verdade secreta! Finge que sabes e engana todos.",
                          }),
                        }),
                    ],
                  }),
                  y.jsx(Fe, {
                    "data-loc": "client/src/components/GameContainer.tsx:616",
                    onClick: dt,
                    className:
                      "w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6",
                    children:
                      we < L.length - 1
                        ? "→ Passar ao Seguinte"
                        : "🎬 Começar Debate",
                  }),
                ],
              })
            : y.jsxs("div", {
                "data-loc": "client/src/components/GameContainer.tsx:587",
                className: "mb-6",
                children: [
                  y.jsx("div", {
                    "data-loc": "client/src/components/GameContainer.tsx:588",
                    className: "text-7xl mb-6",
                    children: "🎭",
                  }),
                  y.jsx(Fe, {
                    "data-loc": "client/src/components/GameContainer.tsx:589",
                    onClick: ot,
                    className:
                      "w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6",
                    children: "👁️ Revelar Papel",
                  }),
                ],
              }),
        ],
      }),
    });
  }
  if (r === "discussion")
    return y.jsx("div", {
      "data-loc": "client/src/components/GameContainer.tsx:629",
      className:
        "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
      children: y.jsxs(rn, {
        "data-loc": "client/src/components/GameContainer.tsx:630",
        className: "bg-card border-border p-8 max-w-2xl w-full text-center",
        children: [
          y.jsx("h2", {
            "data-loc": "client/src/components/GameContainer.tsx:631",
            className: "text-4xl font-bold mb-4",
            style: { fontFamily: "Playfair Display" },
            children: "💬 Fase de Debate",
          }),
          y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:632",
            className:
              "p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl mb-6",
            children: [
              y.jsx("p", {
                "data-loc": "client/src/components/GameContainer.tsx:633",
                className:
                  "text-xs text-orange-400 uppercase tracking-wider mb-1",
                children: "Tema em debate",
              }),
              y.jsx("p", {
                "data-loc": "client/src/components/GameContainer.tsx:634",
                className: "text-xl font-bold text-foreground",
                children: h,
              }),
            ],
          }),
          y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:636",
            className: "text-left space-y-3 mb-8",
            children: [
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:637",
                className: "text-sm text-muted-foreground",
                children: [
                  y.jsx("strong", {
                    "data-loc": "client/src/components/GameContainer.tsx:637",
                    className: "text-orange-400",
                    children: "🎤 Defensor",
                  }),
                  " — Defende a verdade secreta com convicção.",
                ],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:638",
                className: "text-sm text-muted-foreground",
                children: [
                  y.jsx("strong", {
                    "data-loc": "client/src/components/GameContainer.tsx:638",
                    className: "text-purple-400",
                    children: "🎭 Infiltrado",
                  }),
                  " — Finge saber a verdade. Engana todos!",
                ],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:639",
                className: "text-sm text-muted-foreground",
                children: [
                  y.jsx("strong", {
                    "data-loc": "client/src/components/GameContainer.tsx:639",
                    className: "text-blue-400",
                    children: "🎤 Contestador(es)",
                  }),
                  " — Questionam e tentam descobrir quem mente.",
                ],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:640",
                className: "text-sm text-muted-foreground",
                children: [
                  y.jsx("strong", {
                    "data-loc": "client/src/components/GameContainer.tsx:640",
                    className: "text-cyan-400",
                    children: "🤐 Mediador",
                  }),
                  " — Observa e vota com base na lógica.",
                ],
              }),
            ],
          }),
          y.jsx(Fe, {
            "data-loc": "client/src/components/GameContainer.tsx:642",
            onClick: it,
            className:
              "w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6",
            children: "🗳️ Ir para Votação",
          }),
        ],
      }),
    });
  if (r === "voting") {
    const W = L[U];
    return W
      ? y.jsx("div", {
          "data-loc": "client/src/components/GameContainer.tsx:655",
          className:
            "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
          children: y.jsxs(rn, {
            "data-loc": "client/src/components/GameContainer.tsx:656",
            className: "bg-card border-border p-8 max-w-2xl w-full",
            children: [
              y.jsxs("h2", {
                "data-loc": "client/src/components/GameContainer.tsx:657",
                className: "text-3xl font-bold mb-2 text-center",
                style: { fontFamily: "Playfair Display" },
                children: [W.name, ", em quem votas?"],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:660",
                className: "text-center text-muted-foreground mb-2",
                children: ["Voto ", U + 1, " de ", L.length],
              }),
              y.jsx("p", {
                "data-loc": "client/src/components/GameContainer.tsx:661",
                className: "text-center text-xs text-orange-400 mb-6",
                children: "Quem achas que é o Infiltrado?",
              }),
              oe
                ? y.jsxs("div", {
                    "data-loc": "client/src/components/GameContainer.tsx:672",
                    className:
                      "mb-6 p-5 bg-blue-500/20 border border-blue-500/50 rounded-xl text-center",
                    children: [
                      y.jsx("p", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:673",
                        className: "text-sm text-blue-400 mb-1",
                        children: "Vais votar em:",
                      }),
                      y.jsx("p", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:674",
                        className: "text-2xl font-bold text-blue-300",
                        children: oe,
                      }),
                      y.jsx("button", {
                        "data-loc":
                          "client/src/components/GameContainer.tsx:675",
                        onClick: () => se(""),
                        className:
                          "text-xs text-muted-foreground mt-2 underline",
                        children: "Mudar voto",
                      }),
                    ],
                  })
                : y.jsx("div", {
                    "data-loc": "client/src/components/GameContainer.tsx:663",
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6",
                    children: L.filter(de => de.name !== W.name).map((de, xe) =>
                      y.jsx(
                        Fe,
                        {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:665",
                          onClick: () => se(de.name),
                          className:
                            "bg-blue-600 hover:bg-blue-700 text-white p-5 h-auto text-lg font-bold",
                          children: de.name,
                        },
                        xe
                      )
                    ),
                  }),
              y.jsx(Fe, {
                "data-loc": "client/src/components/GameContainer.tsx:680",
                onClick: () => tn(oe),
                disabled: !oe,
                className:
                  "w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 disabled:opacity-50",
                children: "✓ Confirmar Voto",
              }),
            ],
          }),
        })
      : null;
  }
  if (r === "results") {
    const W = Object.entries(K)
        .filter(([me]) => d.some(Ze => Ze.name === me))
        .sort(([, me], [, Ze]) => Ze - me),
      de = L.find(me => me.role === "🎭 Infiltrado"),
      xe = {};
    Se.forEach(me => {
      xe[me.target] = (xe[me.target] || 0) + 1;
    });
    const St = Object.entries(xe).sort(([, me], [, Ze]) => Ze - me)[0],
      ke = St && de && St[0] === de.name;
    return y.jsx("div", {
      "data-loc": "client/src/components/GameContainer.tsx:700",
      className:
        "min-h-screen bg-background text-foreground flex items-center justify-center p-4",
      children: y.jsxs(rn, {
        "data-loc": "client/src/components/GameContainer.tsx:701",
        className: "bg-card border-border p-8 max-w-2xl w-full",
        children: [
          y.jsx("h2", {
            "data-loc": "client/src/components/GameContainer.tsx:702",
            className: "text-4xl font-bold mb-4 text-center text-orange-400",
            style: { fontFamily: "Playfair Display" },
            children: "🏆 Resultados",
          }),
          y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:705",
            className: `mb-6 p-4 rounded-xl border text-center ${ke ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`,
            children: [
              y.jsx("p", {
                "data-loc": "client/src/components/GameContainer.tsx:706",
                className: "text-lg font-bold mb-1",
                children: ke
                  ? "✅ Infiltrado Descoberto!"
                  : "❌ O Infiltrado Escapou!",
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:707",
                className: "text-sm text-muted-foreground",
                children: [
                  "O Infiltrado era: ",
                  y.jsx("strong", {
                    "data-loc": "client/src/components/GameContainer.tsx:707",
                    className: "text-orange-400",
                    children: de?.name,
                  }),
                ],
              }),
              y.jsxs("p", {
                "data-loc": "client/src/components/GameContainer.tsx:708",
                className: "text-xs text-muted-foreground mt-1",
                children: [
                  "Tema: ",
                  y.jsx("em", {
                    "data-loc": "client/src/components/GameContainer.tsx:709",
                    children: h,
                  }),
                  " — Verdade Secreta: ",
                  y.jsx("strong", {
                    "data-loc": "client/src/components/GameContainer.tsx:709",
                    className: N === "SIM" ? "text-green-400" : "text-red-400",
                    children: N,
                  }),
                ],
              }),
            ],
          }),
          y.jsx("div", {
            "data-loc": "client/src/components/GameContainer.tsx:712",
            className: "mb-6 space-y-3",
            children: W.map(([me, Ze], Ve) => {
              const fn = L.find($a => $a.name === me),
                Tn = fn?.role === "🎭 Infiltrado";
              return y.jsxs(
                "div",
                {
                  "data-loc": "client/src/components/GameContainer.tsx:717",
                  className: `p-4 rounded-lg border flex justify-between items-center ${Tn ? "bg-purple-500/10 border-purple-500/30" : "bg-background border-border"}`,
                  children: [
                    y.jsxs("div", {
                      "data-loc": "client/src/components/GameContainer.tsx:718",
                      children: [
                        y.jsxs("p", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:719",
                          className: "font-bold text-lg",
                          children: [Ve + 1, ". ", me],
                        }),
                        y.jsx("p", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:720",
                          className: "text-sm text-muted-foreground",
                          children: fn?.role,
                        }),
                      ],
                    }),
                    y.jsxs("p", {
                      "data-loc": "client/src/components/GameContainer.tsx:722",
                      className: "text-2xl font-bold text-orange-400",
                      children: [Ze, " pts"],
                    }),
                  ],
                },
                Ve
              );
            }),
          }),
          y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:727",
            className: "mb-6 p-4 bg-background rounded-lg border border-border",
            children: [
              y.jsx("p", {
                "data-loc": "client/src/components/GameContainer.tsx:728",
                className: "text-sm font-bold text-muted-foreground mb-3",
                children: "🗳️ Votos desta ronda",
              }),
              y.jsx("div", {
                "data-loc": "client/src/components/GameContainer.tsx:729",
                className: "space-y-1",
                children: Se.map((me, Ze) =>
                  y.jsxs(
                    "p",
                    {
                      "data-loc": "client/src/components/GameContainer.tsx:731",
                      className: "text-xs text-muted-foreground",
                      children: [
                        y.jsx("strong", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:732",
                          children: me.voter,
                        }),
                        " votou em ",
                        y.jsx("strong", {
                          "data-loc":
                            "client/src/components/GameContainer.tsx:732",
                          children: me.target,
                        }),
                      ],
                    },
                    Ze
                  )
                ),
              }),
            ],
          }),
          y.jsxs("div", {
            "data-loc": "client/src/components/GameContainer.tsx:737",
            className: "flex gap-3",
            children: [
              y.jsx(Fe, {
                "data-loc": "client/src/components/GameContainer.tsx:738",
                onClick: Jn,
                className:
                  "flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6",
                children: "▶️ Próxima Ronda",
              }),
              y.jsx(Fe, {
                "data-loc": "client/src/components/GameContainer.tsx:741",
                onClick: Cn,
                variant: "outline",
                className:
                  "border-border text-muted-foreground hover:text-foreground py-6 px-6",
                children: "🏠 Início",
              }),
            ],
          }),
        ],
      }),
    });
  }
  return null;
}
function Z1() {
  return y.jsx(Q1, { "data-loc": "client/src/pages/Home.tsx:9" });
}
function K1() {
  return y.jsx(cg, {
    "data-loc": "client/src/App.tsx:13",
    hook: ug,
    children: y.jsxs(R1, {
      "data-loc": "client/src/App.tsx:14",
      children: [
        y.jsx(Wc, {
          "data-loc": "client/src/App.tsx:15",
          path: "/",
          component: Z1,
        }),
        y.jsx(Wc, {
          "data-loc": "client/src/App.tsx:16",
          path: "/404",
          component: Ph,
        }),
        y.jsx(Wc, { "data-loc": "client/src/App.tsx:17", component: Ph }),
      ],
    }),
  });
}
function J1() {
  return y.jsx(U1, {
    "data-loc": "client/src/App.tsx:25",
    children: y.jsx(B1, {
      "data-loc": "client/src/App.tsx:26",
      defaultTheme: "dark",
      children: y.jsxs(e1, {
        "data-loc": "client/src/App.tsx:27",
        children: [
          y.jsx(fy, { "data-loc": "client/src/App.tsx:28" }),
          y.jsx(K1, { "data-loc": "client/src/App.tsx:29" }),
        ],
      }),
    }),
  });
}
jv.createRoot(document.getElementById("root")).render(
  y.jsx(J1, { "data-loc": "client/src/main.tsx:5" })
);
