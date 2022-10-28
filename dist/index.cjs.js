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
var mockData = require('@visx/mock-data');
var text = require('@visx/text');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var parentWidth = _ref.parentWidth,
    data0 = _ref.data0,
    parentHeight = _ref.parentHeight,
    parentLeft = _ref.parentLeft,
    parentTop = _ref.parentTop,
    xAxisData = _ref.xAxisData,
    yAxisData = _ref.yAxisData;
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
      tooltipData: datum[xAxisData] + " = " + datum[yAxisData]
    });
  };
  var data2 = JSON.parse(data0);
  var font = parentWidth > 240 ? parentWidth / 80 : "5px";
  var xMax = parentWidth - 5 * parentLeft;
  var yMax = parentHeight - parentTop * 2;
  var x = function x(d) {
    return d[xAxisData];
  };
  var y = function y(d) {
    return +d[yAxisData];
  };
  var xScale = scale.scaleBand({
    range: [0, xMax],
    round: true,
    domain: data2.map(x),
    padding: 0.4
  });
  var yScale = scale.scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max.apply(Math, _toConsumableArray(data2.map(y)))]
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
    className: "BarGraphContainer",
    width: parentWidth,
    height: parentHeight
  }, /*#__PURE__*/React__default["default"].createElement(group.Group, {
    left: 70,
    top: -35
  }, /*#__PURE__*/React__default["default"].createElement(axis.AxisLeft, {
    scale: yScale,
    top: 0,
    label: "Spend Hours",
    tickLabelProps: function tickLabelProps(e) {
      var _yScale;
      return {
        fill: "#ff0b3b",
        fontSize: font,
        textAnchor: "end",
        x: -10,
        y: (_yScale = yScale(e)) !== null && _yScale !== void 0 ? _yScale : 0
      };
    }
  }), data2.map(function (d, i) {
    var barHeight = yMax - yPoint(d);
    var fillBarColor = barHeight < 40 ? "red" : "green";
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
    numTicks: data2.length,
    top: yMax,
    scale: xScale,
    label: "Name of Employee",
    tickLabelProps: function tickLabelProps() {
      return {
        fill: "blacks",
        fontSize: font,
        textAnchor: "middle"
      };
    }
  }))), tooltipOpen && /*#__PURE__*/React__default["default"].createElement(TooltipInPortal, {
    key: Math.random(),
    top: tooltipTop,
    left: tooltipLeft
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      backgroundColor: "black",
      color: "white",
      padding: "10px"
    }
  }, tooltipData)));
};

var BarGraph = function BarGraph(_ref) {
  var data0 = _ref.data0,
    xAxisData = _ref.xAxisData,
    yAxisData = _ref.yAxisData;
  var GraphRender = /*#__PURE__*/React__default["default"].createElement(responsive.ParentSize, null, function (parent) {
    return /*#__PURE__*/React__default["default"].createElement(DrawBarGraph, {
      parentWidth: parent.width,
      parentHeight: 400,
      parentTop: 20,
      parentLeft: 15,
      data0: data0,
      xAxisData: xAxisData,
      yAxisData: yAxisData
      // this is the referer to the wrapper component
      ,
      parentRef: parent.ref
      // this function can be called inside MySuperCoolVisxChart to cause a resize of the wrapper component
      ,
      resizeParent: parent.resize
    });
  });
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "App"
  }, /*#__PURE__*/React__default["default"].createElement("h1", {
    style: {
      textAlign: "center",
      textDecoration: "underline"
    }
  }, "Bar graph By Visx"), GraphRender);
};

var accessors = {
  xAccessor: function xAccessor(d) {
    return d.x;
  },
  yAccessor: function yAccessor(d) {
    return d.y;
  }
};
var Product1 = [{
  x: "2015",
  y: 200
}, {
  x: "2016",
  y: 1200
}, {
  x: "2017",
  y: 1500
}, {
  x: "2018",
  y: 500
}];
var Product2 = [{
  x: "2015",
  y: 700
}, {
  x: "2016",
  y: 1000
}, {
  x: "2017",
  y: 450
}, {
  x: "2018",
  y: 3600
}];
var Product3 = [{
  x: "2015",
  y: 200
}, {
  x: "2016",
  y: 700
}, {
  x: "2017",
  y: 1000
}, {
  x: "2018",
  y: 500
}];
var DrawGraph = function DrawGraph() {
  return /*#__PURE__*/React__default["default"].createElement(xychart.XYChart, {
    height: 300,
    xScale: {
      type: "band"
    },
    yScale: {
      type: "linear"
    }
  }, /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedAxis, {
    orientation: "left"
  }), /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedAxis, {
    orientation: "bottom"
  }), /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedLineSeries, _extends({
    dataKey: "Kotak Project",
    data: Product1
  }, accessors)), /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedLineSeries, _extends({
    dataKey: "HDFC Project",
    data: Product2
  }, accessors)), /*#__PURE__*/React__default["default"].createElement(xychart.AnimatedLineSeries, _extends({
    dataKey: "MAMA New Project",
    data: Product3
  }, accessors)), /*#__PURE__*/React__default["default"].createElement(xychart.Tooltip, {
    snapTooltipToDatumX: true,
    snapTooltipToDatumY: true,
    showVerticalCrosshair: true,
    showSeriesGlyphs: true,
    renderTooltip: function renderTooltip(_ref) {
      var tooltipData = _ref.tooltipData,
        colorScale = _ref.colorScale;
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          color: colorScale(tooltipData.nearestDatum.key)
        }
      }, tooltipData.nearestDatum.key), accessors.xAccessor(tooltipData.nearestDatum.datum), ", ", accessors.yAccessor(tooltipData.nearestDatum.datum));
    }
  }));
};

var LineGraph = function LineGraph() {
  console.log("Satendra Raghav");
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(DrawGraph, null));
};

var letters = mockData.letterFrequency.slice(0, 3);
var frequency = function frequency(d) {
  return d.frequency;
};
var getLetterFrequencyColor = scale.scaleOrdinal({
  domain: letters.map(function (l) {
    return l.letter;
  }),
  range: ["rgba(0,250,41,1)", "rgba(200,0,31,0.9)", "rgba(25,200,205,0.6)"]
});
var defaultMargin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
var DrawPieGraph = function DrawPieGraph(_ref) {
  var parentWidth = _ref.parentWidth,
    parentHeight = _ref.parentHeight;
    _ref.parentLeft;
    _ref.parentTop;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hover = _useState2[0],
    setHover = _useState2[1];
  var innerWidth = parentWidth - defaultMargin.left - defaultMargin.right;
  var innerHeight = parentHeight - defaultMargin.top - defaultMargin.bottom;
  var radius = Math.min(innerHeight, innerHeight) / 2;
  var centerX = innerWidth / 2;
  var centerY = innerHeight / 2;
  var left = centerX + defaultMargin.left;
  var top = centerY + defaultMargin.top;
  var pieSortValues = function pieSortValues(a, b) {
    return a - b;
  };
  var mouseOverHandler = function mouseOverHandler(arc) {
    setHover(true);
  };
  var mouseOutHandler = function mouseOutHandler(arc) {
    setHover(false);
  };
  return /*#__PURE__*/React__default["default"].createElement("svg", {
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
    outerRadius: radius,
    innerRadius: radius - 50,
    cornerRadius: 6,
    padAngle: 0.005
  }, function (pie) {
    return pie.arcs.map(function (arc, index) {
      console.log(arc);
      var letter = arc.data.letter;
      var _pie$path$centroid = pie.path.centroid(arc),
        _pie$path$centroid2 = _slicedToArray(_pie$path$centroid, 2),
        centriodX = _pie$path$centroid2[0],
        centriodY = _pie$path$centroid2[1];
      // const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.5;
      var arcPath = pie.path(arc);
      var arcFill = getLetterFrequencyColor(letter);
      var value = arc.value;
      return /*#__PURE__*/React__default["default"].createElement("g", {
        key: "arc-".concat(letter, "-").concat(index),
        onMouseOut: function onMouseOut() {
          return mouseOutHandler();
        },
        onMouseOver: function onMouseOver() {
          return mouseOverHandler();
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
        fill: "rgba(250,250,250,0.9)",
        textAnchor: "middle",
        pointerEvents: "none"
      }, letter), hover && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.Text, {
        x: centriodX + 1,
        y: centriodY + 15,
        dy: "0.33em",
        fontSize: 14,
        fill: "yellow",
        textAnchor: "middle",
        pointerEvents: "none"
      }, value.toFixed(2))));
    });
  })));
};

var PieRender = /*#__PURE__*/React__default["default"].createElement(responsive.ParentSize, null, function (parent) {
  return /*#__PURE__*/React__default["default"].createElement(DrawPieGraph, {
    parentWidth: parent.width,
    parentHeight: 200,
    parentTop: 15,
    parentLeft: 15
    // this is the referer to the wrapper component
    ,
    parentRef: parent.ref
    // this function can be called inside MySuperCoolVisxChart to cause a resize of the wrapper component
    ,
    resizeParent: parent.resize
  });
});
var PieGraph = function PieGraph() {
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("h1", {
    style: {
      textAlign: "center",
      textDecoration: "underline"
    }
  }, "Pie Chart By Visx"), PieRender);
};

var NewBarLineGraph = function NewBarLineGraph(_ref) {
  var parentWidth = _ref.parentWidth,
    parentHeight = _ref.parentHeight,
    parentLeft = _ref.parentLeft,
    parentTop = _ref.parentTop;
  var _useTooltip = tooltip.useTooltip();
    _useTooltip.showTooltip;
    _useTooltip.hideTooltip;
  var _useTooltipInPortal = tooltip.useTooltipInPortal({
      detectBounds: true,
      scroll: true
    }),
    containerRef = _useTooltipInPortal.containerRef;
  var data = mockData.letterFrequency.slice(0, 26);
  var data2 = mockData.letterFrequency.map(function (elem) {
    return {
      x: elem.letter,
      y: elem.frequency * 100
    };
  });
  var accessors = {
    xAccessor: function xAccessor(d) {
      return d.x;
    },
    yAccessor: function yAccessor(d) {
      return d.y;
    }
  };
  var font = parentWidth > 240 ? parentWidth / 80 : "5px";
  var xMax = parentWidth - 5 * parentLeft;
  var yMax = parentHeight - parentTop * 2;
  var x = function x(d) {
    return d.letter;
  };
  var y = function y(d) {
    return +d.frequency * 100;
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
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
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
    dataKey: "MAMA New Project",
    data: data2,
    stroke: "tomato"
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
    left: 40,
    top: -20
  }, /*#__PURE__*/React__default["default"].createElement(axis.AxisLeft, {
    scale: yScale,
    numTicks: 10,
    top: 0,
    label: "Spend Hours",
    tickLabelProps: function tickLabelProps(e) {
      var _yScale;
      return {
        fill: "#ff0b3b",
        fontSize: font,
        textAnchor: "end",
        x: -10,
        y: (_yScale = yScale(e)) !== null && _yScale !== void 0 ? _yScale : 0
      };
    }
  }), data.map(function (d, i) {
    var barHeight = yMax - yPoint(d);
    var fillBarColor = barHeight < 40 ? "red" : barHeight > 100 ? "green" : "royalblue";
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
    label: "Name of Employee",
    tickLabelProps: function tickLabelProps() {
      return {
        fill: "#ff0b3b",
        fontSize: font,
        textAnchor: "middle"
      };
    }
  }))));
};

var MixGraph = function MixGraph() {
  var _useState = React.useState(),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    _useState2[1];
  var MixBarGraphRender = /*#__PURE__*/React__default["default"].createElement(responsive.ParentSize, null, function (parent) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "MixgraphContaine"
    }, /*#__PURE__*/React__default["default"].createElement(NewBarLineGraph, {
      parentWidth: parent.width,
      parentHeight: 400,
      parentTop: 15,
      parentLeft: 15,
      parentRef: parent.ref,
      resizeParent: parent.resize
    }));
  });
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {}
  }, /*#__PURE__*/React__default["default"].createElement("h1", {
    style: {
      textAlign: "center",
      textDecoration: "underline"
    }
  }, "Mix Line-Bar graph By Visx"), /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      position: "relative"
    }
  }, MixBarGraphRender)));
};

var Graph = function Graph(_ref) {
  var type = _ref.type,
    data0 = _ref.data0,
    xAxisData = _ref.xAxisData,
    yAxisData = _ref.yAxisData;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      fontFamily: "sans-serif",
      margin: 0,
      boxSizing: "border-box"
    }
  }, function () {
    switch (type) {
      case "BarGraph":
        return /*#__PURE__*/React__default["default"].createElement(BarGraph, {
          data0: data0,
          xAxisData: xAxisData,
          yAxisData: yAxisData
        });
      case "LineGraph":
        return /*#__PURE__*/React__default["default"].createElement(LineGraph, {
          data0: data0,
          xAxisData: xAxisData,
          yAxisData: yAxisData
        });
      case "PieGraph":
        return /*#__PURE__*/React__default["default"].createElement(PieGraph, {
          data0: data0
        });
      case "MixGraph":
        return /*#__PURE__*/React__default["default"].createElement(MixGraph, {
          data0: data0,
          xAxisData: xAxisData,
          yAxisData: yAxisData
        });
      default:
        return /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }
        }, /*#__PURE__*/React__default["default"].createElement("h1", null, "Please select type of graph"));
    }
  }());
};

exports.Graph = Graph;
