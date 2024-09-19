import {
  __toESM,
  require_client,
  require_react
} from "./chunk-63ENHFOM.js";

// src/options.js
var import_react2 = __toESM(require_react());
var import_client = __toESM(require_client());

// src/components/Options.js
var import_react = __toESM(require_react());
function Options(props) {
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "container-fluid" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "row" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "col-sm-6" }, /* @__PURE__ */ import_react.default.createElement("h2", null, "Blocked Domains"), /* @__PURE__ */ import_react.default.createElement(
    BlockedDomainsEditor,
    {
      blockedDomains: props.blockedDomains,
      setBlockedDomains: props.setBlockedDomains
    }
  ))));
}
function BlockedDomainsEditor(props) {
  const [saved, setSaved] = (0, import_react.useState)(false);
  const onSubmit = (event) => {
    event.preventDefault();
    setSaved(false);
    const formData = new FormData(event.target);
    props.setBlockedDomains(formData.get("blockedDomains").split("\n"));
    setSaved(true);
  };
  const blockedDomainsText = props.blockedDomains.join("\n");
  return /* @__PURE__ */ import_react.default.createElement("form", { onSubmit }, /* @__PURE__ */ import_react.default.createElement("p", null, "Links from blocked domains will be hidden by default", /* @__PURE__ */ import_react.default.createElement("br", null), " Enter one domain per line", /* @__PURE__ */ import_react.default.createElement("br", null), " Lines starting with ", /* @__PURE__ */ import_react.default.createElement("strong", null, "#"), " will be ignored", /* @__PURE__ */ import_react.default.createElement("br", null), " ", /* @__PURE__ */ import_react.default.createElement("code", null, "example.com"), " will also block ", /* @__PURE__ */ import_react.default.createElement("code", null, "www.example.com")), /* @__PURE__ */ import_react.default.createElement("div", { className: "form-group" }, /* @__PURE__ */ import_react.default.createElement(
    "textarea",
    {
      className: "form-control",
      name: "blockedDomains",
      rows: "15",
      defaultValue: blockedDomainsText
    }
  )), /* @__PURE__ */ import_react.default.createElement("div", { className: "d-flex align-items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-grow-1" }, saved ? /* @__PURE__ */ import_react.default.createElement("div", { className: "text-success" }, "Saved") : null), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-grow-0" }, /* @__PURE__ */ import_react.default.createElement("button", { type: "submit", className: "btn btn-primary" }, "Save"))));
}

// src/options.js
function setBlockedDomains(domains) {
  const next = [];
  for (let domain of domains) {
    domain = domain.trim();
    if (!domain) {
      continue;
    }
    next.push(domain);
  }
  chrome.storage.sync.set({ blockedDomains: next });
}
var root = (0, import_client.createRoot)(document.getElementById("Options"));
function render(storage) {
  root.render(
    /* @__PURE__ */ import_react2.default.createElement(
      Options,
      {
        blockedDomains: storage.blockedDomains,
        setBlockedDomains
      }
    )
  );
}
var stored = {};
chrome.storage.onChanged.addListener((changes, areaName) => {
  for (let key in changes) {
    stored[key] = changes[key].newValue;
  }
  render(stored);
});
chrome.storage.sync.get(null, (items) => {
  stored = items;
  if (stored.blockedDomains == null) {
    stored.blockedDomains = [];
  }
  render(stored);
});
//# sourceMappingURL=options.js.map
