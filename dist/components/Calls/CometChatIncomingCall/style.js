"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thumbnailStyle = exports.nameStyle = exports.incomingCallWrapperStyle = exports.headerWrapperStyle = exports.headerButtonStyle = exports.callTypeStyle = exports.callIconStyle = exports.callDetailStyle = exports.callContainerStyle = exports.ButtonStyle = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const incomingCallWrapperStyle = (props, keyframes) => {
  const slideDown = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    0% { transform: translateY(-50px); }\n    100% { transform: translateY(0px); }\n    "])));
  let positionValue = "absolute";
  let leftPos = "0";
  let rightPos = "0";
  let topPos = "0";
  let bottomPos = "unset";
  let zIndexValue = "998";
  if (props.hasOwnProperty("widgetsettings")) {
    if (props.widgetsettings.hasOwnProperty("dockedview") && props.widgetsettings.dockedview) {
      //if chat window is open
      if (props.widgetsettings.hasOwnProperty("launched") && props.widgetsettings.launched) {
        zIndexValue = "2147483000";
        positionValue = "fixed";
        topPos = "unset";
        bottomPos = "100px";
        if (props.widgetsettings.hasOwnProperty("alignment") && props.widgetsettings.alignment === "left") {
          rightPos = "unset";
          leftPos = "20px";
          if (props.widgetsettings.hasOwnProperty("width")) {
            if (props.widgetsettings.width.includes("px")) {
              const widgetWidth = props.widgetsettings.width.replace("px", "");
              rightPos = parseInt(widgetWidth) - 250 - 15;
              rightPos = rightPos + "px";
            }
          }
          if (props.widgetsettings.hasOwnProperty("height")) {
            if (props.widgetsettings.height.includes("px")) {
              const widgetHeight = props.widgetsettings.height.replace("px", "");
              bottomPos = parseInt(widgetHeight) - 140 + 100;
              bottomPos = bottomPos + "px";
            }
          }
        } else {
          leftPos = "unset";
          rightPos = "20px";
          if (props.widgetsettings.hasOwnProperty("width")) {
            if (props.widgetsettings.width.includes("px")) {
              const widgetWidth = props.widgetsettings.width.replace("px", "");
              rightPos = parseInt(widgetWidth) - 250 - 15;
              rightPos = rightPos + "px";
            }
          }
          if (props.widgetsettings.hasOwnProperty("height")) {
            if (props.widgetsettings.height.includes("px")) {
              const widgetHeight = props.widgetsettings.height.replace("px", "");
              bottomPos = parseInt(widgetHeight) - 140 + 100;
              bottomPos = bottomPos + "px";
            }
          }
        }
      } else {
        leftPos = "unset";
        positionValue = "fixed";
      }
    } else {
      zIndexValue = "2147483000";
    }
  }
  return {
    position: positionValue,
    top: topPos,
    left: leftPos,
    bottom: bottomPos,
    right: rightPos,
    borderRadius: "10px",
    margin: "16px",
    backgroundColor: "".concat(props.theme.backgroundColor.callScreenGrey),
    zIndex: zIndexValue,
    color: "".concat(props.theme.color.white),
    textAlign: "center",
    boxSizing: "border-box",
    fontFamily: "".concat(props.theme.fontFamily),
    animation: "".concat(slideDown, " 250ms ease"),
    width: "248px",
    "*": {
      boxSizing: "border-box",
      fontFamily: "".concat(props.theme.fontFamily)
    }
  };
};
exports.incomingCallWrapperStyle = incomingCallWrapperStyle;
const callContainerStyle = () => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "16px"
  };
};
exports.callContainerStyle = callContainerStyle;
const headerWrapperStyle = () => {
  return {
    width: "100%",
    display: "flex"
  };
};
exports.headerWrapperStyle = headerWrapperStyle;
const callDetailStyle = () => {
  return {
    width: "calc(100% - 36px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left"
  };
};
exports.callDetailStyle = callDetailStyle;
const nameStyle = () => {
  return {
    fontSize: "15px",
    fontWeight: "600",
    display: "block",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    lineHeight: "20px"
  };
};
exports.nameStyle = nameStyle;
const callTypeStyle = props => {
  return {
    fontSize: "13px",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    lineHeight: "20px",
    color: "#8A8A8A",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: "2px 0 0 0px",
    "span": {
      padding: "0 5px"
    }
  };
};
exports.callTypeStyle = callTypeStyle;
const thumbnailStyle = () => {
  return {
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center"
  };
};
exports.thumbnailStyle = thumbnailStyle;
const headerButtonStyle = () => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 0 0"
  };
};
exports.headerButtonStyle = headerButtonStyle;
const ButtonStyle = (props, action) => {
  const backgroundColor = action ? "".concat(props.theme.backgroundColor.blue, "!important") : "".concat(props.theme.backgroundColor.red, "!important");
  return {
    cursor: "pointer",
    padding: "8px 16px",
    backgroundColor: backgroundColor,
    borderRadius: "5px",
    color: "".concat(props.theme.color.white),
    fontSize: "100%",
    outline: "0",
    border: "0",
    width: "49%",
    overflow: "hidden"
  };
};
exports.ButtonStyle = ButtonStyle;
const callIconStyle = (img, context) => {
  return {
    width: "24px",
    height: "24px",
    display: "inline-block",
    cursor: "pointer",
    mask: "url(".concat(img, ") center center no-repeat"),
    backgroundColor: "".concat(context.theme.secondaryTextColor)
  };
};
exports.callIconStyle = callIconStyle;