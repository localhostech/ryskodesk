/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _forms = __webpack_require__(1);

var _desk = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouterDOM = ReactRouterDOM,
    HashRouter = _ReactRouterDOM.HashRouter,
    Switch = _ReactRouterDOM.Switch,
    Route = _ReactRouterDOM.Route,
    Link = _ReactRouterDOM.Link,
    NavLink = _ReactRouterDOM.NavLink,
    BrowserRouter = _ReactRouterDOM.BrowserRouter;

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          Switch,
          null,
          React.createElement(Route, { exact: true, path: "/", component: _forms.LoginForm }),
          React.createElement(Route, { path: "/register", component: _forms.RegisterForm }),
          React.createElement(Route, { path: "/desk", component: _desk.DeskMain })
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(
  BrowserRouter,
  null,
  React.createElement(App, null)
), document.querySelector('#app'));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouterDOM = ReactRouterDOM,
    HashRouter = _ReactRouterDOM.HashRouter,
    Switch = _ReactRouterDOM.Switch,
    Route = _ReactRouterDOM.Route,
    Link = _ReactRouterDOM.Link,
    NavLink = _ReactRouterDOM.NavLink,
    BrowserRouter = _ReactRouterDOM.BrowserRouter,
    Redirect = _ReactRouterDOM.Redirect;

var RegisterForm = function (_React$Component) {
  _inherits(RegisterForm, _React$Component);

  function RegisterForm(props) {
    _classCallCheck(this, RegisterForm);

    var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

    _this.state = {
      login: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      status: 'manager',
      spec: 'posting',
      fireRedirect: false
    };

    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(RegisterForm, [{
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      console.log(this.state);
      var context = this;
      var data = new FormData();
      data.append("json", JSON.stringify(this.state));

      fetch("/register", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        var result = data.result;
        console.log(result);
        if (result.success) {
          context.setState({ fireRedirect: true });
        } else {
          alert(result.message.message);
        }
      });
      //alert('A login was submitted: ' + this.state.login + ', a password: ' + this.state.password);
      event.preventDefault();
    }
  }, {
    key: 'renderLoginForm',
    value: function renderLoginForm() {
      ReactDOM.render(React.createElement(LoginForm, null), document.getElementById('app'));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.props.location.state || '/',
          from = _ref.from;

      var fireRedirect = this.state.fireRedirect;

      return React.createElement(
        'div',
        { className: 'login-form' },
        React.createElement(
          'h4',
          null,
          '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F'
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.login, name: 'login', onChange: this.handleInputChange, type: 'text', placeholder: '\u041B\u043E\u0433\u0438\u043D' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.email, name: 'email', onChange: this.handleInputChange, type: 'text', placeholder: 'Email' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.firstname, name: 'firstname', onChange: this.handleInputChange, type: 'text', placeholder: '\u0418\u043C\u044F' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.lastname, name: 'lastname', onChange: this.handleInputChange, type: 'text', placeholder: '\u0424\u0430\u043C\u0438\u043B\u0438\u044F' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'label',
              null,
              '\u0421\u0442\u0430\u0442\u0443\u0441'
            ),
            React.createElement(
              'select',
              { className: 'form-control', value: this.state.status, name: 'status', onChange: this.handleInputChange, type: 'text' },
              React.createElement(
                'option',
                { value: 'manager' },
                '\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'
              ),
              React.createElement(
                'option',
                { value: 'admin' },
                '\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'label',
              null,
              '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
            ),
            React.createElement(
              'select',
              { className: 'form-control', value: this.state.spec, name: 'spec', onChange: this.handleInputChange, type: 'text' },
              React.createElement(
                'option',
                { value: 'posting' },
                '\u041F\u043E\u0441\u0442\u044B'
              ),
              React.createElement(
                'option',
                { value: 'copyright' },
                '\u041A\u043E\u043F\u0438\u0440\u0430\u0439\u0442'
              ),
              React.createElement(
                'option',
                { value: 'all' },
                '\u0412\u0441\u0435'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.password, onChange: this.handleInputChange, name: 'password', type: 'password', placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'btn btn-primary', type: 'submit', value: '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              NavLink,
              { exact: true, to: '/' },
              '\u0412\u043E\u0439\u0442\u0438'
            )
          )
        ),
        fireRedirect && React.createElement(Redirect, { to: from || '/' })
      );
    }
  }]);

  return RegisterForm;
}(React.Component);

var LoginForm = function (_React$Component2) {
  _inherits(LoginForm, _React$Component2);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this2 = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this2.state = {
      username: '',
      password: '',
      fireRedirect: false
    };

    _this2.handleInputChange = _this2.handleInputChange.bind(_this2);
    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(LoginForm, [{
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var target = event.target;
      var value = target.type === 'checkbox' ? target.checked : target.value;
      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      console.log(this.state);
      var context = this;
      var data = new FormData();
      data.append("json", JSON.stringify(this.state));

      fetch("/login", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: "same-origin"
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        var result = data.result;
        console.log(result);
        if (result.success) {
          context.setState({ fireRedirect: true });
        } else {
          alert(result.message.message);
        }
      });
      event.preventDefault();
    }
  }, {
    key: 'renderRegisterForm',
    value: function renderRegisterForm() {
      ReactDOM.render(React.createElement(RegisterForm, null), document.getElementById('app'));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref2 = this.props.location.state || '/',
          from = _ref2.from;

      var fireRedirect = this.state.fireRedirect;

      return React.createElement(
        'div',
        { className: 'login-form' },
        React.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.username, name: 'username', onChange: this.handleInputChange, type: 'text', placeholder: '\u041B\u043E\u0433\u0438\u043D' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'form-control', value: this.state.password, onChange: this.handleInputChange, name: 'password', type: 'password', placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { autoComplete: 'off', className: 'btn btn-primary', type: 'submit', value: '\u0412\u043E\u0439\u0442\u0438' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              NavLink,
              { exact: true, to: '/register' },
              '\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F'
            )
          )
        ),
        fireRedirect && React.createElement(Redirect, { to: from || '/desk' })
      );
    }
  }]);

  return LoginForm;
}(React.Component);

exports.RegisterForm = RegisterForm;
exports.LoginForm = LoginForm;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouterDOM = ReactRouterDOM,
    HashRouter = _ReactRouterDOM.HashRouter,
    Switch = _ReactRouterDOM.Switch,
    Route = _ReactRouterDOM.Route,
    Link = _ReactRouterDOM.Link,
    NavLink = _ReactRouterDOM.NavLink,
    BrowserRouter = _ReactRouterDOM.BrowserRouter,
    Redirect = _ReactRouterDOM.Redirect;

var DeskMain = function (_React$Component) {
  _inherits(DeskMain, _React$Component);

  function DeskMain() {
    _classCallCheck(this, DeskMain);

    return _possibleConstructorReturn(this, (DeskMain.__proto__ || Object.getPrototypeOf(DeskMain)).apply(this, arguments));
  }

  _createClass(DeskMain, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "nav",
        { className: "navbar navbar-toggleable-md navbar-inverse bg-primary" },
        React.createElement(
          "button",
          { className: "navbar-toggler navbar-toggler-right", type: "button", "data-toggle": "collapse", "data-target": "#navbarNavAltMarkup", "aria-controls": "navbarNavAltMarkup", "aria-expanded": "false", "aria-label": "Toggle navigation" },
          React.createElement("span", { className: "navbar-toggler-icon" })
        ),
        React.createElement(
          "a",
          { className: "navbar-brand", href: "#" },
          "RYSKO Desk"
        ),
        React.createElement(
          "div",
          { className: "collapse navbar-collapse", id: "navbarNavAltMarkup" },
          React.createElement(
            "div",
            { className: "navbar-nav mr-auto" },
            React.createElement(
              "a",
              { className: "nav-item nav-link", href: "#" },
              "\u041B\u0435\u043D\u0442\u0430 \u0437\u0430\u0434\u0430\u043D\u0438\u0439 ",
              React.createElement(
                "span",
                { className: "sr-only" },
                "(current)"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "navbar-nav navbar-user-info" },
            React.createElement(
              "a",
              { className: "nav-item nav-link", href: "#" },
              "\u0416\u0434\u0430\u043D\u043E\u0432 \u0413\u0440\u0438\u0433\u043E\u0440\u0438\u0439"
            ),
            React.createElement(
              "a",
              { className: "nav-item nav-link", href: "/logout" },
              "\u0412\u044B\u0439\u0442\u0438"
            )
          )
        )
      );
    }
  }]);

  return DeskMain;
}(React.Component);

exports.DeskMain = DeskMain;

/***/ })
/******/ ]);