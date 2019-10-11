"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _list = _interopRequireDefault(require("./list"));

var _tab = _interopRequireDefault(require("./tab"));

var components = _interopRequireWildcard(require("./components/items"));

var _tabContext = _interopRequireDefault(require("./tab-context"));

var _reactRedux = require("react-redux");

var _skeletonHtml = require("./skeleton-html");

var _reactRouterDom = require("react-router-dom");

var _detail = _interopRequireDefault(require("./detail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TABS = [{
  id: '__all__',
  name: '推荐'
}, {
  id: 'video',
  name: '视频'
}];
var ALL_TAB = [{
  id: '__all__',
  name: '推荐'
}, {
  id: 'video',
  name: '视频'
}, {
  id: 'sport',
  name: '体育'
}, {
  id: 'history',
  name: '历史'
}];

var createThrottle = function createThrottle(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var status = 'START';
  return function () {
    if (status === 'WAITING') {
      return;
    }

    status = 'WAITING';
    setTimeout(function () {
      fn && fn();
      status = 'START';
    }, delay);
  };
};

var Main =
/*#__PURE__*/
function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, props));
    _this.state = {
      list: [],
      showSetting: false,
      loading: true
    };

    _this.reactiveList();

    return _this;
  }

  _createClass(Main, [{
    key: "getList",
    value: function getList() {
      return fetch('//localhost:9000/list').then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "listenScroll",
    value: function listenScroll(func) {
      var THRESHOLD = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
      var throttle = createThrottle(function () {
        func && typeof func === 'function' ? func() : null;
      });
      window.addEventListener('scroll', function () {
        var offsetHeight = document.documentElement.offsetHeight;
        var screenHeight = window.screen.height;
        var scrollY = window.scrollY;
        var gap = offsetHeight - screenHeight - scrollY;

        if (gap < THRESHOLD) {
          throttle();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var html = _skeletonHtml.skeletonHtml ? _skeletonHtml.skeletonHtml : '<div>...loading</div>';
      return _react["default"].createElement("div", {
        className: "container"
      }, _react["default"].createElement(_tabContext["default"].Provider, {
        value: ALL_TAB
      }, _react["default"].createElement(_tab["default"], {
        tabs: TABS
      }), _react["default"].createElement(_list["default"], {
        dataSource: this.props.list,
        renderItem: function renderItem(item) {
          var type = item.type.replace(/^\w/, function (code) {
            return code.toUpperCase();
          });
          var ItemComponent = components[type];
          return _react["default"].createElement(ItemComponent, {
            onClick: _this2.skip.bind(_this2),
            data: item.data
          });
        }
      })));
    }
  }, {
    key: "updateList",
    value: function updateList(dispatch) {
      var _this3 = this;

      return this.getList().then(function (_ref) {
        var data = _ref.data;

        _this3.setState({
          loading: false
        }, function () {
          dispatch({
            type: 'PUSH_LIST',
            data: data
          });
        });
      })["catch"](function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "reactiveList",
    value: function reactiveList() {// this.props.listUpdate(this.updateList.bind(this));
      // 节流
      // this.listenScroll(() => {
      //   this.props.listUpdate(this.updateList.bind(this));
      // });
    }
  }, {
    key: "skip",
    value: function skip() {
      console.log('开始跳转!', this.props.history.push);
      this.props.history.push('/detail/' + 'i672763421225964391' + Math.random() * 10);
    }
  }]);

  return Main;
}(_react.Component);

var App = (0, _reactRedux.connect)(function mapStateToProps(state) {
  return {
    list: state.list
  };
}, function mapDispatchToProps(dispatch) {
  return {
    listUpdate: function listUpdate(task) {
      dispatch(task);
    }
  };
})(Main);

var _default = function _default() {
  var TopBar = function TopBar() {
    return _react["default"].createElement("div", null, "\u6211\u662F404");
  };

  return _react["default"].createElement(_reactRouterDom.Switch, null, _react["default"].createElement(_reactRouterDom.Route, {
    path: "/home",
    component: App
  }), _react["default"].createElement(_reactRouterDom.Route, {
    path: "/detail/:id",
    component: _detail["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    component: TopBar
  }));
};

exports["default"] = _default;