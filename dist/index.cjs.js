'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var group = require('@visx/group');
var axis = require('@visx/axis');
var shape = require('@visx/shape');
var scale = require('@visx/scale');
var tooltip = require('@visx/tooltip');
var event = require('@visx/event');
var responsive = require('@visx/responsive');
var xychart = require('@visx/xychart');
var gradient = require('@visx/gradient');
require('@visx/mock-data');
var text = require('@visx/text');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DrawBarGraph = function DrawBarGraph(_ref) {
  var value = _ref.value,
    parentWidth = _ref.parentWidth,
    parentHeight = _ref.parentHeight,
    parentLeft = _ref.parentLeft,
    parentTop = _ref.parentTop;
  var data = value.data;
  var arr = value.content.xAxisValue && value.content.yAxisValue ? [xAxisValue, yAxisValue] : Object.keys(data[0]);
  var _useTooltip = tooltip.useTooltip(),
    tooltipData = _useTooltip.tooltipData,
    tooltipLeft = _useTooltip.tooltipLeft,
    tooltipTop = _useTooltip.tooltipTop,
    tooltipOpen = _useTooltip.tooltipOpen,
    showTooltip = _useTooltip.showTooltip,
    hideTooltip = _useTooltip.hideTooltip;
  var _useTooltipInPortal = tooltip.useTooltipInPortal({
      detectBounds: true,
      scroll: true
    }),
    containerRef = _useTooltipInPortal.containerRef,
    TooltipInPortal = _useTooltipInPortal.TooltipInPortal;
  var handleMouse = function handleMouse(event$1, datum) {
    console.log("datum - ".concat(datum));
    var coords = event.localPoint(event$1.target.ownerSVGElement, event$1);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum[arr[0]] + " = " + datum[arr[1]]
    });
  };
  var xMax = parentWidth - 5 * parentLeft;
  var yMax = parentHeight - parentTop * 2;
  var x = function x(d) {
    return d[arr[0]];
  };
  var y = function y(d) {
    return +d[arr[1]];
  };
  var xScale = scale.scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4
  });
  var yScale = scale.scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max.apply(Math, _toConsumableArray(data.map(y)))]
  });
  function compose(scale, accessor) {
    return function (data) {
      return scale(accessor(data));
    };
  }
  var xPoint = compose(xScale, x);
  var yPoint = compose(yScale, y);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("svg", {
    ref: containerRef,
    width: parentWidth,
    height: parentHeight
  }, /*#__PURE__*/React__default["default"].createElement(group.Group, {
    left: 70,
    top: -30
  }, /*#__PURE__*/React__default["default"].createElement(axis.AxisLeft, {
    scale: yScale,
    top: 0,
    label: value.content.leftLabel,
    labelOffset: 45,
    tickLabelProps: function tickLabelProps(e) {
      var _yScale;
      return {
        fill: value.style.labelStyle.labelColor,
        fontSize: parentWidth > 450 ? parentWidth / 90 : parentWidth / 50,
        textAnchor: "end",
        x: -10,
        y: (_yScale = yScale(e)) !== null && _yScale !== void 0 ? _yScale : 0
      };
    }
  }), data.map(function (d, i) {
    var barHeight = yMax - yPoint(d);
    var fillBarColor = barHeight < 25 ? value.style.barStyle.lowValueColor : barHeight > 75 ? value.style.barStyle.highValueColor : value.style.barStyle.mediumValueColor;
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(shape.Bar, {
      key: "bar-".concat(barHeight),
      x: xPoint(d),
      y: yMax - barHeight,
      height: barHeight,
      width: xScale.bandwidth(),
      fill: fillBarColor,
      onMouseOver: function onMouseOver(e) {
        return handleMouse(e, d);
      },
      onMouseOut: hideTooltip
    }));
  }), /*#__PURE__*/React__default["default"].createElement(axis.AxisBottom, {
    numTicks: data.length,
    top: yMax,
    scale: xScale,
    label: value.content.bottomLabel,
    tickLabelProps: function tickLabelProps() {
      return {
        fill: value.style.labelStyle.labelColor,
        fontSize: parentWidth > 450 ? parentWidth / 90 : parentWidth / 50,
        textAnchor: "middle"
      };
    }
  }))), tooltipOpen && /*#__PURE__*/React__default["default"].createElement(TooltipInPortal, {
    key: Math.random(),
    top: tooltipTop,
    left: tooltipLeft
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.tooltipStyle
  }, tooltipData)));
};

var BarGraph = function BarGraph(_ref) {
  var value = _ref.value;
  var GraphRender = /*#__PURE__*/React__default["default"].createElement(responsive.ParentSize, null, function (parent) {
    return /*#__PURE__*/React__default["default"].createElement(DrawBarGraph, {
      parentWidth: parent.width,
      parentHeight: value.style.containerStyle.height,
      parentTop: 20,
      parentLeft: 15,
      value: value,
      parentRef: parent.ref,
      resizeParent: parent.resize
    });
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.containerStyle
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.headerStyle
  }, value.content.header), GraphRender);
};

var DrawGraph = function DrawGraph(_ref) {
  var value = _ref.value;
  var data = value.data;
  var arr = value.content.xAxisValue && value.content.yAxisValue ? [xAxisValue, yAxisValue] : Object.keys(data[0][0]);
  var accessors = {
    xAccessor: function xAccessor(d) {
      return d[arr[0]];
    },
    yAccessor: function yAccessor(d) {
      return d[arr[1]];
    }
  };
  return /*#__PURE__*/React__default["default"].createElement(xychart.XYChart, {
    height: 300,
    xScale: {
      type: "band"
    },
    yScale: {
      type: "linear"
    }
  }, /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedAxis, {
    orientation: "left",
    label: value.content.leftLabel,
    left: 72,
    labelOffset: 32,
    stroke: value.style.labelStyle.labelColor
  }), /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedAxis, {
    orientation: "bottom",
    label: value.content.bottomLabel,
    stroke: value.style.labelStyle.labelColor
  }), /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedGrid, {
    columns: true,
    numTicks: value.data[0].length
  }), value.data.map(function (elem, i) {
    return /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedLineSeries, _extends({
      dataKey: value.content.tooltipDataKey[i],
      data: elem,
      stroke: value.style.lineStyle.colorRange[i]
    }, accessors));
  }), /*#__PURE__*/React__default["default"].createElement(xychart.Tooltip, {
    snapTooltipToDatumX: true,
    snapTooltipToDatumY: true,
    showVerticalCrosshair: true,
    showSeriesGlyphs: true,
    renderTooltip: function renderTooltip(_ref2) {
      var tooltipData = _ref2.tooltipData,
        colorScale = _ref2.colorScale;
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          color: colorScale(tooltipData.nearestDatum.key)
        }
      }, tooltipData.nearestDatum.key), accessors.xAccessor(tooltipData.nearestDatum.datum), ", ", accessors.yAccessor(tooltipData.nearestDatum.datum));
    }
  }));
};

var LineGraph = function LineGraph(_ref) {
  var value = _ref.value;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.containerStyle
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.headerStyle
  }, value.content.header), /*#__PURE__*/React__default["default"].createElement(DrawGraph, {
    value: value
  }));
};

var DrawPieGraph = function DrawPieGraph(_ref) {
  var value = _ref.value,
    parentWidth = _ref.parentWidth,
    parentHeight = _ref.parentHeight;
  var letters = value.data;
  var arr = value.content.xAxisValue && value.content.yAxisValue ? [xAxisValue, yAxisValue] : Object.keys(letters[0]);
  var frequency = function frequency(d) {
    return d[arr[1]];
  };
  var getLetterFrequencyColor = scale.scaleOrdinal({
    domain: letters.map(function (l) {
      return l[arr[0]];
    }),
    range: value.style.pieStyle.colorRange
  });
  var _useTooltip = tooltip.useTooltip(),
    tooltipData = _useTooltip.tooltipData,
    tooltipLeft = _useTooltip.tooltipLeft,
    tooltipTop = _useTooltip.tooltipTop,
    tooltipOpen = _useTooltip.tooltipOpen,
    showTooltip = _useTooltip.showTooltip,
    hideTooltip = _useTooltip.hideTooltip;
  var _useTooltipInPortal = tooltip.useTooltipInPortal({
      detectBounds: true,
      scroll: true
    }),
    TooltipInPortal = _useTooltipInPortal.TooltipInPortal;
  var handleMouse = function handleMouse(event$1, datum) {
    var coords = event.localPoint(event$1.target.ownerSVGElement, event$1);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum[arr[0]] + " = " + datum[arr[1]]
    });
  };
  var innerWidth = parentWidth - 40;
  var innerHeight = parentHeight - 40;
  var radius = Math.min(innerWidth, innerHeight) / 2;
  var centerX = innerWidth / 2;
  var centerY = innerHeight / 2;
  var left = centerX + 20;
  var top = centerY + 20;
  var pieSortValues = function pieSortValues(a, b) {
    return a - b;
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("svg", {
    width: parentWidth,
    height: parentHeight,
    className: "pieGraphContainer"
  }, /*#__PURE__*/React__default["default"].createElement(gradient.GradientPinkBlue, {
    id: "visx-pie-gradient"
  }), /*#__PURE__*/React__default["default"].createElement(group.Group, {
    top: top,
    left: left
  }, /*#__PURE__*/React__default["default"].createElement(shape.Pie, {
    data: letters,
    pieSortValues: pieSortValues,
    pieValue: frequency,
    outerRadius: radius - value.style.pieStyle.outerRadius,
    innerRadius: radius - value.style.pieStyle.innerRadius,
    cornerRadius: value.style.pieStyle.cornerRadius,
    padAngle: value.style.pieStyle.padAngle
  }, function (pie) {
    return pie.arcs.map(function (arc, index) {
      var letter = arc.data[arr[0]][0];
      var _pie$path$centroid = pie.path.centroid(arc),
        _pie$path$centroid2 = _slicedToArray(_pie$path$centroid, 2),
        centriodX = _pie$path$centroid2[0],
        centriodY = _pie$path$centroid2[1];
      var arcPath = pie.path(arc);
      var arcFill = getLetterFrequencyColor(letter);
      return /*#__PURE__*/React__default["default"].createElement("g", {
        key: "arc-".concat(letter, "-").concat(index),
        onMouseOut: hideTooltip,
        onMouseOver: function onMouseOver(e) {
          return handleMouse(e, arc.data);
        },
        className: "pieTooltipHolder"
      }, /*#__PURE__*/React__default["default"].createElement("path", {
        d: arcPath,
        fill: arcFill
      }), /*#__PURE__*/React__default["default"].createElement(text.Text, {
        x: centriodX,
        y: centriodY,
        dy: "0.33em",
        fontSize: 14,
        fill: value.style.labelStyle.labelColor,
        textAnchor: "middle",
        pointerEvents: "none"
      }, letter));
    });
  }))), tooltipOpen && /*#__PURE__*/React__default["default"].createElement(TooltipInPortal, {
    key: Math.random(),
    top: tooltipTop + 290,
    left: tooltipLeft - 90
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.tooltipStyle
  }, tooltipData)));
};

var PieGraph = function PieGraph(_ref) {
  var value = _ref.value;
  var PieRender = /*#__PURE__*/React__default["default"].createElement(responsive.ParentSize, null, function (parent) {
    return /*#__PURE__*/React__default["default"].createElement(DrawPieGraph, {
      parentWidth: parent.width,
      parentHeight: value.style.containerStyle.height,
      parentRef: parent.ref,
      resizeParent: parent.resize,
      value: value
    });
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.containerStyle
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: value.style.headerStyle
  }, value.content.header), PieRender);
};

var NewBarLineGraph = function NewBarLineGraph(_ref) {
  var value = _ref.value,
    parentWidth = _ref.parentWidth,
    parentHeight = _ref.parentHeight,
    parentLeft = _ref.parentLeft,
    parentTop = _ref.parentTop;
  var data = value.data;
  var arr = value.content.xAxisValue && value.content.yAxisValue ? [xAxisValue, yAxisValue] : Object.keys(data[0]);
  var accessors = {
    xAccessor: function xAccessor(d) {
      return d[arr[0]];
    },
    yAccessor: function yAccessor(d) {
      return d[arr[1]];
    }
  };
  var _useTooltipInPortal = tooltip.useTooltipInPortal({
      detectBounds: true,
      scroll: true
    }),
    containerRef = _useTooltipInPortal.containerRef;
  var font = parentWidth > 240 ? parentWidth / 80 : "5px";
  var xMax = parentWidth - 5 * parentLeft;
  var yMax = parentHeight - parentTop * 2;
  var x = function x(d) {
    return d[arr[0]];
  };
  var y = function y(d) {
    return +d[arr[1]];
  };
  var xScale = scale.scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4
  });
  var yScale = scale.scaleLinear({
    range: [yMax, 70],
    round: false,
    domain: [0, Math.max.apply(Math, _toConsumableArray(data.map(y)))]
  });
  function compose(scale, accessor) {
    return function (data) {
      return scale(accessor(data));
    };
  }
  var xPoint = compose(xScale, x);
  var yPoint = compose(yScale, y);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 20,
      zIndex: 2
    }
  }, /*#__PURE__*/React__default["default"].createElement(xychart.XYChart, {
    height: parentHeight,
    width: parentWidth,
    xScale: {
      type: "band"
    },
    yScale: {
      type: "linear"
    }
  }, /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedLineSeries, _extends({
    dataKey: value.content.tooltipDataKey[0],
    data: data,
    stroke: value.style.lineStyle.colorRange[0]
  }, accessors)), /*#__PURE__*/React__default["default"].createElement(xychart.Tooltip, {
    snapTooltipToDatumX: true,
    snapTooltipToDatumY: true,
    showVerticalCrosshair: true,
    showSeriesGlyphs: true,
    renderTooltip: function renderTooltip(_ref2) {
      var tooltipData = _ref2.tooltipData,
        colorScale = _ref2.colorScale;
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          color: colorScale(tooltipData.nearestDatum.key)
        }
      }, tooltipData.nearestDatum.key), accessors.xAccessor(tooltipData.nearestDatum.datum), "----", accessors.yAccessor(tooltipData.nearestDatum.datum));
    }
  }))), /*#__PURE__*/React__default["default"].createElement("svg", {
    ref: containerRef,
    style: {
      position: "absolute",
      top: 0,
      left: 0
    },
    width: parentWidth,
    height: parentHeight
  }, /*#__PURE__*/React__default["default"].createElement(group.Group, {
    left: 60,
    top: -20
  }, /*#__PURE__*/React__default["default"].createElement(axis.AxisLeft, {
    scale: yScale,
    top: 0,
    label: value.content.leftLabel,
    tickLabelProps: function tickLabelProps(e) {
      var _yScale;
      return {
        fill: value.style.labelStyle.labelColor,
        fontSize: font,
        textAnchor: "end",
        x: -10,
        y: (_yScale = yScale(e)) !== null && _yScale !== void 0 ? _yScale : 0
      };
    }
  }), data.map(function (d, i) {
    var barHeight = yMax - yPoint(d);
    var fillBarColor = barHeight < 25 ? value.style.barStyle.lowValueColor : barHeight > 75 ? value.style.barStyle.highValueColor : value.style.barStyle.mediumValueColor;
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(shape.Bar, {
      key: "bar-".concat(barHeight),
      x: d === 1 ? 40 : xPoint(d),
      y: yMax - barHeight,
      height: barHeight,
      width: xScale.bandwidth(),
      fill: fillBarColor
    }), /*#__PURE__*/React__default["default"].createElement("circle", {
      key: "circle-".concat(barHeight),
      r: 6,
      cx: xScale(x(d)) + xScale.bandwidth() / 2,
      cy: yScale(y(d)),
      stroke: "rgba(33,133,233,0.9)",
      fill: "black"
    }));
  }), /*#__PURE__*/React__default["default"].createElement(axis.AxisBottom, {
    numTicks: data.length,
    top: yMax,
    scale: xScale,
    label: value.content.bottomLabel,
    tickLabelProps: function tickLabelProps() {
      return {
        fill: value.style.labelStyle.labelColor,
        fontSize: font,
        textAnchor: "middle"
      };
    }
  }))));
};

var MixGraph = function MixGraph(_ref) {
  var value = _ref.value;
  var MixBarGraphRender = /*#__PURE__*/React__default["default"].createElement(responsive.ParentSize, null, function (parent) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React__default["default"].createElement(NewBarLineGraph, {
      parentWidth: parent.width,
      parentHeight: parent.height,
      parentTop: 15,
      parentLeft: 15,
      parentRef: parent.ref,
      resizeParent: parent.resize,
      value: value
    }));
  });
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: _objectSpread2(_objectSpread2({}, value.style.headerStyle), {}, {
      background: value.style.containerStyle.background,
      width: value.style.containerStyle.width
    })
  }, value.content.header), /*#__PURE__*/React__default["default"].createElement("div", {
    style: _objectSpread2({}, value.style.containerStyle)
  }, MixBarGraphRender)));
};

var Graph = function Graph(_ref) {
  var value = _ref.value;
  var valueObj = JSON.parse(value);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      fontFamily: "sans-serif",
      margin: 0,
      boxSizing: "border-box"
    }
  }, function () {
    switch (valueObj.type) {
      case "Bargraph":
        return /*#__PURE__*/React__default["default"].createElement(BarGraph, {
          value: valueObj
        });
      case "Linegraph":
        return /*#__PURE__*/React__default["default"].createElement(LineGraph, {
          value: valueObj
        });
      case "Piegraph":
        return /*#__PURE__*/React__default["default"].createElement(PieGraph, {
          value: valueObj
        });
      case "Mixgraph":
        return /*#__PURE__*/React__default["default"].createElement(MixGraph, {
          value: valueObj
        });
      default:
        return " ";
    }
  }());
};

exports.Graph = Graph;
