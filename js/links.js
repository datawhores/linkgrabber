import {
  __commonJS,
  __toESM,
  require_client,
  require_react
} from "./chunk-63ENHFOM.js";

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      var nativeCodeString = "[native code]";
      function classNames() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
              classes.push(arg.toString());
              continue;
            }
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/lodash.debounce/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.debounce/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root2 = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root2.Date.now();
    };
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = debounce2;
  }
});

// src/links.js
var import_react5 = __toESM(require_react());
var import_client = __toESM(require_client());

// src/components/LinkList.js
var import_react3 = __toESM(require_react());
var import_react4 = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var import_lodash = __toESM(require_lodash());

// src/components/LinkListEmpty.js
var import_react = __toESM(require_react());
function LinkListEmpty(props) {
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "container-fluid" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "LinkPageHeader" }, props.source), /* @__PURE__ */ import_react.default.createElement("p", null, "No links were found."));
}

// src/components/LinkListExpired.js
var import_react2 = __toESM(require_react());
function LinkListExpired(props) {
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: "container-fluid" }, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "LinkPageHeader" }, "Expired"), /* @__PURE__ */ import_react2.default.createElement("p", null, "Link information has expired and is no longer available. Please close this tab and try again."));
}

// src/components/LinkList.js
function copyLinks(element) {
  const selection = window.getSelection();
  const prevRange = selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
  const tmp = document.createElement("div");
  const links = element.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    const clone = links[i].cloneNode(true);
    delete clone.dataset.reactid;
    tmp.appendChild(clone);
    tmp.appendChild(document.createElement("br"));
  }
  document.body.appendChild(tmp);
  const copyFrom = document.createRange();
  copyFrom.selectNodeContents(tmp);
  selection.removeAllRanges();
  selection.addRange(copyFrom);
  document.execCommand("copy");
  document.body.removeChild(tmp);
  selection.removeAllRanges();
  if (prevRange) {
    selection.addRange(prevRange);
  }
}
function groupLinksByDomain(links) {
  const indexes = new Array(links.length);
  const rh = new Array(links.length);
  for (let i = 0; i < links.length; i++) {
    indexes[i] = i;
    rh[i] = links[i].hostname.toLowerCase().split(".").reverse().join(".");
  }
  indexes.sort((i, j) => {
    if (rh[i] < rh[j]) {
      return -1;
    }
    if (rh[i] > rh[j]) {
      return 1;
    }
    return i - j;
  });
  return indexes.map((i) => links[i]);
}
function mapBlocked(links, blockedDomains) {
  blockedDomains = new Set(blockedDomains);
  return links.map((link) => {
    let hostname = link.hostname.toLowerCase();
    const dots = [];
    for (let i = 0; i < hostname.length; i++) {
      if (hostname[i] === ".") {
        dots.push(i);
      }
    }
    if (blockedDomains.has(hostname)) {
      return true;
    }
    for (const dot of dots) {
      if (blockedDomains.has(hostname.substr(dot + 1))) {
        blockedDomains.add(hostname);
        return true;
      }
    }
    return false;
  });
}
function mapDuplicates(links) {
  const uniq = /* @__PURE__ */ new Set();
  return links.map((link) => {
    if (uniq.has(link.href)) {
      return true;
    }
    uniq.add(link.href);
    return false;
  });
}
function rejectSameOrigin(links, sourceUrl) {
  if (!sourceUrl) {
    return links;
  }
  if (!sourceUrl.startsWith("http://") && !sourceUrl.startsWith("https://")) {
    return links;
  }
  const parser = document.createElement("a");
  parser.href = sourceUrl;
  if (!parser.origin) {
    return links;
  }
  return links.filter((link) => link.origin !== parser.origin);
}
function LinkList(props) {
  const linkListRef = (0, import_react4.useRef)(null);
  const [filter, setFilter] = (0, import_react4.useState)("");
  const [nextFilter, setNextFilter] = (0, import_react4.useState)("");
  const [groupByDomain, setGroupByDomain] = (0, import_react4.useState)(false);
  const [hideBlockedDomains, setHideBlockedDomains] = (0, import_react4.useState)(true);
  const [hideDuplicates, setHideDuplicates] = (0, import_react4.useState)(true);
  const [hideSameOrigin, setHideSameOrigin] = (0, import_react4.useState)(false);
  const applyFilter = (0, import_lodash.default)(() => setFilter(nextFilter), 100, { trailing: true });
  const filterChanged = (event) => setNextFilter(event.target.value);
  const toggleBlockedLinks = () => setHideBlockedDomains((x) => !x);
  const toggleDedup = () => setHideDuplicates((x) => !x);
  const toggleGroupByDomain = () => setGroupByDomain((x) => !x);
  const toggleHideSameOrigin = () => setHideSameOrigin((x) => !x);
  (0, import_react4.useEffect)(() => {
    const h = (event) => {
      const selection = window.getSelection();
      if (selection.type === "None" || selection.type === "Caret") {
        copyLinks();
      }
    };
    window.document.addEventListener("copy", h);
    return () => {
      window.document.removeEventListener("copy", h);
    };
  }, []);
  (0, import_react4.useEffect)(applyFilter, [nextFilter]);
  if (props.expired) {
    return /* @__PURE__ */ import_react3.default.createElement(LinkListExpired, null);
  }
  let links = props.links.slice(0);
  if (links.length === 0) {
    return /* @__PURE__ */ import_react3.default.createElement(LinkListEmpty, { source: props.source });
  }
  if (hideSameOrigin) {
    links = rejectSameOrigin(links, props.source);
  }
  if (groupByDomain) {
    links = groupLinksByDomain(links);
  }
  const blocked = mapBlocked(links, props.blockedDomains);
  const duplicates = mapDuplicates(links);
  const filterLowerCase = filter.trim().toLowerCase();
  const items = links.reduce((memo, link, index) => {
    if (hideDuplicates && duplicates[index]) {
      return memo;
    }
    if (hideBlockedDomains && blocked[index]) {
      return memo;
    }
    if (filterLowerCase) {
      const lowerHref = link.href.toLowerCase();
      if (lowerHref.indexOf(filterLowerCase) < 0) {
        return memo;
      }
    }
    const itemClassName = (0, import_classnames.default)("LinkListItem", {
      "LinkListItem--blocked": blocked[index],
      "LinkListItem--duplicate": duplicates[index]
    });
    memo.push(
      /* @__PURE__ */ import_react3.default.createElement("li", { key: index, className: itemClassName }, /* @__PURE__ */ import_react3.default.createElement("a", { href: link.href, target: "_blank" }, link.href))
    );
    return memo;
  }, []);
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "container-fluid" }, /* @__PURE__ */ import_react3.default.createElement("h1", { className: "LinkPageHeader" }, props.source), /* @__PURE__ */ import_react3.default.createElement("div", { className: "clearfix" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-inline LinkPageOptionsForm" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "checkbox-inline" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: hideDuplicates, onChange: toggleDedup }), " Hide duplicate links"), /* @__PURE__ */ import_react3.default.createElement("label", { className: "checkbox-inline" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: hideBlockedDomains, onChange: toggleBlockedLinks }), " Hide blocked links"), /* @__PURE__ */ import_react3.default.createElement("label", { className: "checkbox-inline" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: hideSameOrigin, onChange: toggleHideSameOrigin }), " Hide same origin"), /* @__PURE__ */ import_react3.default.createElement("label", { className: "checkbox-inline" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "checkbox", checked: groupByDomain, onChange: toggleGroupByDomain }), " Group by domain")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react3.default.createElement("input", { type: "text", className: "form-control", placeholder: "substring filter", autoFocus: true, value: nextFilter, onChange: filterChanged })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "form-group LinkPageStatus" }, /* @__PURE__ */ import_react3.default.createElement("button", { className: "btn btn-default", disabled: items.length === 0, onClick: () => copyLinks(linkListRef.current) }, "Copy ", items.length, " / ", props.links.length)))), /* @__PURE__ */ import_react3.default.createElement("ul", { ref: linkListRef, className: "LinkList" }, items));
}

// src/links.js
var target = document.getElementById("LinkList");
var root = (0, import_client.createRoot)(target);
function blockedDomainsSet(blockedDomains) {
  const set = /* @__PURE__ */ new Set();
  for (let domain of blockedDomains) {
    domain = domain.trim().toLowerCase();
    if (!domain || domain[0] == "#") {
      continue;
    }
    set.add(domain);
  }
  return set;
}
(async function() {
  const queryParams = new URLSearchParams(window.location.search);
  const session = await chrome.storage.session.get("tabData");
  const data = session?.tabData[queryParams.get("tab_id")];
  if (!data) {
    root.render(/* @__PURE__ */ import_react5.default.createElement(LinkList, { expired: true }));
    return;
  }
  const { blockedDomains } = await chrome.storage.sync.get(["blockedDomains"]);
  document.title = "Extracted Links for " + data.source;
  root.render(
    /* @__PURE__ */ import_react5.default.createElement(
      LinkList,
      {
        blockedDomains: blockedDomainsSet(blockedDomains),
        expired: false,
        links: data.links,
        source: data.source
      }
    )
  );
})();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=links.js.map
