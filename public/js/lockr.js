// (function(root, factory) {

//     if (typeof exports !== 'undefined') {
//       if (typeof module !== 'undefined' && module.exports) {
//         exports = module.exports = factory(root, exports);
//       }
//     } else if (typeof define === 'function' && define.amd) {
//       define(['exports'], function(exports) {
//         root.Lockr = factory(root, exports);
//       });
//     } else {
//       root.Lockr = factory(root, {});
//     }
  
//   }(this, function(root, Lockr) {
//     'use strict';
  
//     if (!Array.prototype.indexOf) {
//       Array.prototype.indexOf = function(elt /*, from*/)
//       {
//         var len = this.length >>> 0;
  
//         var from = Number(arguments[1]) || 0;
//         from = (from < 0)
//         ? Math.ceil(from)
//         : Math.floor(from);
//         if (from < 0)
//           from += len;
  
//         for (; from < len; from++)
//         {
//           if (from in this &&
//               this[from] === elt)
//             return from;
//         }
//         return -1;
//       };
//     }
  
//     Lockr.prefix = "";
  
//     Lockr._getPrefixedKey = function(key, options) {
//       options = options || {};
  
//       if (options.noPrefix) {
//         return key;
//       } else {
//         return this.prefix + key;
//       }
  
//     };
  
//     Lockr.set = function (key, value, options) {
//       var query_key = this._getPrefixedKey(key, options);
  
//       try {
//         localStorage.setItem(query_key, JSON.stringify({"data": value}));
//       } catch (e) {
//         if (console) console.warn("Lockr didn't successfully save the '{"+ key +": "+ value +"}' pair, because the localStorage is full.");
//       }
//     };
  
//     Lockr.get = function (key, missing, options) {
//       var query_key = this._getPrefixedKey(key, options),
//           value;
  
//       try {
//         value = JSON.parse(localStorage.getItem(query_key));
//       } catch (e) {
//               if(localStorage[query_key]) {
//                 value = {data: localStorage.getItem(query_key)};
//               } else{
//                   value = null;
//               }
//       }
      
//       if(!value) {
//         return missing;
//       }
//       else if (typeof value === 'object' && typeof value.data !== 'undefined') {
//         return value.data;
//       }
//     };
  
//     Lockr.sadd = function(key, value, options) {
//       var query_key = this._getPrefixedKey(key, options),
//           json;
  
//       var values = Lockr.smembers(key);
  
//       if (values.indexOf(value) > -1) {
//         return null;
//       }
  
//       try {
//         values.push(value);
//         json = JSON.stringify({"data": values});
//         localStorage.setItem(query_key, json);
//       } catch (e) {
//         console.log(e);
//         if (console) console.warn("Lockr didn't successfully add the "+ value +" to "+ key +" set, because the localStorage is full.");
//       }
//     };
  
//     Lockr.smembers = function(key, options) {
//       var query_key = this._getPrefixedKey(key, options),
//           value;
  
//       try {
//         value = JSON.parse(localStorage.getItem(query_key));
//       } catch (e) {
//         value = null;
//       }
      
//       return (value && value.data) ? value.data : [];
//     };
  
//     Lockr.sismember = function(key, value, options) {
//       return Lockr.smembers(key).indexOf(value) > -1;
//     };
  
//     Lockr.keys = function() {
//       var keys = [];
//       var allKeys = Object.keys(localStorage);
  
//       if (Lockr.prefix.length === 0) {
//         return allKeys;
//       }
  
//       allKeys.forEach(function (key) {
//         if (key.indexOf(Lockr.prefix) !== -1) {
//           keys.push(key.replace(Lockr.prefix, ''));
//         }
//       });
  
//       return keys;
//     };
  
//     Lockr.getAll = function (includeKeys) {
//       var keys = Lockr.keys();
  
//       if (includeKeys) {
//         return keys.reduce(function (accum, key) {
//           var tempObj = {};
//           tempObj[key] = Lockr.get(key);
//           accum.push(tempObj);
//           return accum;
//         }, []);
//       }
  
//       return keys.map(function (key) {
//         return Lockr.get(key);
//       });
//     };
  
//     Lockr.srem = function(key, value, options) {
//       var query_key = this._getPrefixedKey(key, options),
//           json,
//           index;
  
//       var values = Lockr.smembers(key, value);
  
//       index = values.indexOf(value);
  
//       if (index > -1)
//         values.splice(index, 1);
  
//       json = JSON.stringify({"data": values});
  
//       try {
//         localStorage.setItem(query_key, json);
//       } catch (e) {
//         if (console) console.warn("Lockr couldn't remove the "+ value +" from the set "+ key);
//       }
//     };
  
//     Lockr.rm =  function (key) {
//       var queryKey = this._getPrefixedKey(key);
      
//       localStorage.removeItem(queryKey);
//     };
  
//     Lockr.flush = function () {
//       if (Lockr.prefix.length) {
//         Lockr.keys().forEach(function(key) {
//           localStorage.removeItem(Lockr._getPrefixedKey(key));
//         });
//       } else {
//         localStorage.clear();
//       }
//     };
//     return Lockr;
  
//   }));




//----------------------- cart localstorage -----------------------------------



var cartLS = (function (a) {
  "use strict";
  function b(a, b, c) {
    return (
      b in a
        ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (a[b] = c),
      a
    );
  }
  function c(a, b) {
    var c = Object.keys(a);
    if (Object.getOwnPropertySymbols) {
      var d = Object.getOwnPropertySymbols(a);
      b &&
        (d = d.filter(function (b) {
          return Object.getOwnPropertyDescriptor(a, b).enumerable;
        })),
        c.push.apply(c, d);
    }
    return c;
  }
  function d(a) {
    for (var b, d = 1; d < arguments.length; d++)
      (b = null == arguments[d] ? {} : arguments[d]),
        d % 2
          ? c(b, !0).forEach(function (c) {
              f(a, c, b[c]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b))
          : c(b).forEach(function (c) {
              Object.defineProperty(
                a,
                c,
                Object.getOwnPropertyDescriptor(b, c)
              );
            });
    return a;
  }
  var e = (function (a, b) {
      return (b = { exports: {} }), a(b, b.exports), b.exports;
    })(function (a) {
      function b(a) {
        return (
          (b =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (a) {
                  return typeof a;
                }
              : function (a) {
                  return a &&
                    "function" == typeof Symbol &&
                    a.constructor === Symbol &&
                    a !== Symbol.prototype
                    ? "symbol"
                    : typeof a;
                }),
          b(a)
        );
      }
      function c(d) {
        return (
          (a.exports =
            "function" == typeof Symbol && "symbol" === b(Symbol.iterator)
              ? (c = function (a) {
                  return b(a);
                })
              : (c = function (a) {
                  return a &&
                    "function" == typeof Symbol &&
                    a.constructor === Symbol &&
                    a !== Symbol.prototype
                    ? "symbol"
                    : b(a);
                })),
          c(d)
        );
      }
      a.exports = c;
    }),
    f = b,
    g = "__cart",
    h = null,
    i = function (a) {
      h = a;
    },
    j = function (a) {
      return JSON.parse(localStorage.getItem(a || g)) || [];
    },
    k = function (a, b) {
      localStorage.setItem(b || g, JSON.stringify(a)), h && h(j(b || g));
    },
    l = function (a) {
      localStorage.removeItem(a || g), h && h(j(a || g));
    },
    m = function (a) {
      return j().find(function (b) {
        return b.id === a;
      });
    },
    n = function (a) {
      return !!m(a);
    },
    o = function (a) {
      return k(
        j().filter(function (b) {
          return b.id !== a;
        })
      );
    },
    p = function (a, b, c) {
      return k(
        j().map(function (e) {
          return e.id === a ? d({}, e, f({}, b, c)) : e;
        })
      );
    },
    q = function (a) {
      return a.id && a.price;
    },
    r = function (a) {
      return s(a) ? a.price * a.quantity : 0;
    },
    s = function (a) {
      return a && a.price && a.quantity;
    },
    t = function (a) {
      return a && "function" == typeof a;
    };
  return (
    (a.add = function (a, b) {
      return q(a)
        ? n(a.id)
          ? p(a.id, "quantity", m(a.id).quantity + (b || 1))
          : k(j().concat(d({}, a, { quantity: b || 1 })))
        : null;
    }),
    (a.destroy = function () {
      return l();
    }),
    (a.exists = n),
    (a.get = m),
    (a.list = j),
    (a.onChange = function (a) {
      return t(a) ? i(a) : console.log(e(a));
    }),
    (a.quantity = function (a, b) {
      return n(a) && 0 < m(a).quantity + b
        ? p(a, "quantity", m(a).quantity + b)
        : o(a);
    }),
    (a.remove = o),
    (a.subtotal = r),
    (a.total = function (a) {
      return j().reduce(function (b, c) {
        return t(a) ? a(b, c) : (b += r(c));
      }, 0);
    }),
    (a.update = p),
    a
  );
})({}); //# sourceMappingURL=cart-localstorage.min.js.map
