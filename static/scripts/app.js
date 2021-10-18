function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

;

(function (window) {
  var getWindowWidth = function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
  };

  var getWindowHeight = function getWindowHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
  };

  var getScrollTop = function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  };

  var animateCSS = function animateCSS(node, animation) {
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'animate__';
    return new Promise(function (resolve, reject) {
      var animationName = "".concat(prefix).concat(animation);
      node.classList.add("".concat(prefix, "animated"), animationName);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove("".concat(prefix, "animated"), animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, {
        once: true
      });
    });
  };

  var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (cb) {
    window.setTimeout(cb, 1000 / 60);
  };

  var directions = {
    bottom: 'bottom',
    top: 'top'
  };
  var direction = directions.bottom;
  var mouseDirection = directions.bottom;
  var scrollTop = getScrollTop();
  var disabledScrollButton = false;

  var onScrollHandler = function onScrollHandler(e) {
    var newScrollTop = getScrollTop();
    direction = newScrollTop < scrollTop && mouseDirection === directions.top ? directions.top : directions.bottom;
    scrollTop = getScrollTop();

    if (direction === directions.top) {
      disabledScrollButton = false;
    }
  };

  document.addEventListener('scroll', function (e) {
    onScrollHandler(e);
  });

  var onMouseWheel = function onMouseWheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta < 0) {
      mouseDirection = directions.top;
    } else if (delta > 0) {
      mouseDirection = directions.bottom;
    }
  };

  if ('onwheel' in document) {
    // IE9+, FF17+, Ch31+
    document.addEventListener("wheel", function (e) {
      onMouseWheel(e);
    });
  } else if ('onmousewheel' in document) {
    // устаревший вариант события
    document.addEventListener("mousewheel", function (e) {
      onMouseWheel(e);
    });
  } else {
    // Firefox < 17
    document.addEventListener("MozMousePixelScroll", function (e) {
      onMouseWheel(e);
    });
  }

  var scrollToEl = function scrollToEl(el) {
    var header = document.querySelector('.header');
    var offset = header ? header.offsetHeight : 0;
    var rect = el.getBoundingClientRect();
    var win = el.ownerDocument.defaultView;
    window.scrollTo({
      top: Math.max(0, rect.top + win.pageYOffset - offset),
      behavior: "smooth"
    });
  };

  (function (window) {
    var LazyLoad = window.LazyLoad;

    if (LazyLoad) {
      new LazyLoad({
        callback_loading: function callback_loading(el) {
          if (el.parentNode && el.parentNode.classList.contains('picture')) {
            el.parentNode.classList.add('picture--loading');
          }
        },
        callback_loaded: function callback_loaded(el) {
          if (el.parentNode && el.parentNode.classList.contains('picture')) {
            el.parentNode.classList.remove('picture--loading');
          }
        },
        callback_error: function callback_error(el) {
          if (el.parentNode && el.parentNode.classList.contains('picture')) {
            el.parentNode.classList.remove('picture--loading');
          }
        }
      });
    }
  })(window);

  var headerIsWhite = false; // header

  (function () {
    var header = document.querySelector('.header');

    if (!header) {
      return;
    }

    headerIsWhite = header.classList.contains('header--white');

    if (!headerIsWhite) {
      var _onScrollHandler = function _onScrollHandler() {
        var scrollTop = getScrollTop();
        header.classList[scrollTop > 0 ? 'add' : 'remove']('header--white');
        headerIsWhite = scrollTop > 0;
        header.classList[headerIsWhite ? 'add' : 'remove']('header--hide-line');
      };

      document.addEventListener('scroll', function (e) {
        _onScrollHandler();
      });
      window.addEventListener('resize', function (e) {
        _onScrollHandler();
      });

      _onScrollHandler();
    }
  })(); //hamburger


  (function () {
    var hamburgers = document.querySelectorAll('.hamburger');

    if (!hamburgers.length) {
      return;
    }

    var _iterator = _createForOfIteratorHelper(hamburgers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var hamburger = _step.value;
        hamburger.addEventListener('click', function () {
          this.classList.toggle('hamburger--active');
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  })(); // mobile menu


  (function () {
    var buttons = document.querySelectorAll('.js-mobile-menu');

    if (!buttons.length) {
      return;
    }

    var mobileMenu = document.querySelector('.mobile-menu');
    var header = document.querySelector('.header');

    var _iterator2 = _createForOfIteratorHelper(buttons),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var button = _step2.value;
        button.addEventListener('click', function () {
          if (!mobileMenu) {
            return;
          }

          mobileMenu.classList.toggle('mobile-menu--open');

          if (headerIsWhite && header) {
            header.classList.toggle('header--white');
          }

          if (window.scrollbar) {
            var isOpen = mobileMenu.classList.contains('mobile-menu--open');
            window.scrollbar[isOpen ? 'add' : 'remove']();
          }
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var links = mobileMenu.querySelectorAll('.mobile-menu__item--parent .mobile-menu__item-link');
    var slideToggle = window.slideToggle;

    if (slideToggle) {
      var _iterator3 = _createForOfIteratorHelper(links),
          _step3;

      try {
        var _loop = function _loop() {
          var link = _step3.value;
          var childItemsBlock = link.nextElementSibling;
          link.addEventListener('click', function (e) {
            if (getWindowWidth() >= 768) {
              return;
            }

            e.preventDefault();
            slideToggle(childItemsBlock, {
              parent: this.parentNode,
              activeClass: "mobile-menu__item--open"
            });
          });
        };

        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  })(); // first screen


  (function () {
    var Swiper = window.Swiper;
    var block = document.querySelector('.first-screen');

    if (!block || !Swiper) {
      return;
    }

    var slider = block.querySelector('.first-screen__slider .swiper-container');

    if (!slider) {
      return;
    }

    new Swiper(slider, {
      effect: 'fade',
      autoplay: {
        delay: 8000
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      }
    });
  })(); // lines


  (function () {
    var lines = document.querySelectorAll('.lines');

    if (!lines.length) {
      return;
    }

    var Lines = /*#__PURE__*/function () {
      "use strict";

      function Lines(el) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          showPluses: false,
          plusesXCount: 15,
          plusesYCount: 17,
          fadingPercent: 30
        };

        _classCallCheck(this, Lines);

        this.$el = el;
        this.$bgCanvas = null;
        this.$plusesCanvas = null;
        this.$options = options;
        this.showPluses = this.$el.dataset.pluses === 'Y' || this.$options.showPluses;
        this.small = this.$el.dataset.small === "Y" || this.$options.small === "Y";
        this.screen = this._getScreen();
        this.linesCount = 0;
        this.interval = null;
        this.lines = [];
        this.started = false;
        this.init();
      }

      _createClass(Lines, [{
        key: "init",
        value: function init() {
          this.createGrid();

          if (this.showPluses) {
            this.createPluses();
          }

          this.startLines();
          this.initEvents();
        }
      }, {
        key: "createGrid",
        value: function createGrid() {
          if (!this.$bgCanvas) {
            this.$bgCanvas = this.createCanvas('bg');
          }

          this.renderGrid();
        }
      }, {
        key: "createPluses",
        value: function createPluses() {
          if (!this.$plusesCanvas) {
            this.$plusesCanvas = this.createCanvas('pluses');
          }

          this.renderPluses();
        }
      }, {
        key: "updatedLines",
        value: function updatedLines() {
          if (this.started) {
            this.stopLines();
            this.startLines();
          }
        }
      }, {
        key: "stopLines",
        value: function stopLines() {
          this.started = false;
          clearInterval(this.interval);

          for (var i = 0; i < this.lines.length; i++) {
            var line = this.lines[i];
            line.line = null;
            line.canvas.remove();
            clearInterval(line.interval);
          }

          this.lines = [];
          this.linesCount = 0;
        }
      }, {
        key: "startLines",
        value: function startLines() {
          var _this = this;

          var params = this._getLineParams();

          var _this$_getCanvasSize = this._getCanvasSize(),
              width = _this$_getCanvasSize.width,
              height = _this$_getCanvasSize.height;

          this.started = true;
          this.interval = setInterval(function () {
            if (_this.linesCount <= params.lines) {
              var x = _this.roundDirection(_this._random(0, _this.roundDirection(width, true))),
                  y = _this.roundDirection(_this._random(0, _this.roundDirection(height, true))),
                  d = _this._random(1, 8);

              _this.createLine(x, y, {
                x: _this.dispersion(d - 1),
                y: _this.dispersion(d + 1),
                "default": d
              });
            }
          }, 1000);
        }
      }, {
        key: "createLine",
        value: function createLine(x, y, direction) {
          var _this2 = this;

          var item = {};
          var line = {};
          var canvas = this.createCanvas('line');

          var _this$_getGridParams = this._getGridParams(),
              size = _this$_getGridParams.size;

          var params = this._getLineParams();

          line.x = x;
          line.y = y;
          line.boxes = this._random(params.min, params.max);
          line.length = size / params.step * line.boxes;
          line.sizeMove = size / params.step;
          line.fadinEls = Math.ceil(line.length / 100 * this.$options.fadingPercent);
          line.fadeFrom = line.length - line.fadinEls;
          line.fadePercent = 100 / line.fadinEls;
          line.dashes = [];
          line.move = 1;
          line.moves = [];
          line.opacityEls = 0;
          line.interval = null;
          item.canvas = canvas;
          item.line = line;
          this.linesCount++;
          this.lines.push(item);
          canvas.ctx.lineWidth = 2;

          for (var i = 0; i < line.length; i++) {
            var opacity = 1;

            if (i >= line.fadeFrom) {
              line.opacityEls++;
              opacity = (line.fadinEls - line.opacityEls) * line.fadePercent / 100;
            }

            line.dashes[i] = {
              xM: line.x,
              yM: line.y,
              xL: line.x,
              yL: line.y,
              opacity: opacity,
              coords: []
            };
          }

          line.draw = function (i) {
            canvas.ctx.beginPath();
            canvas.ctx.strokeStyle = '#fff';
            canvas.ctx.globalAlpha = line.dashes[i].opacity;
            canvas.ctx.moveTo(line.dashes[i].xM, line.dashes[i].yM);
            canvas.ctx.lineTo(line.dashes[i].xL, line.dashes[i].yL);
            canvas.ctx.stroke();
            canvas.ctx.closePath();
          };

          var draw = function draw() {
            item.interval = line.interval = setInterval(function () {
              canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

              for (var _i = 0; _i < line.move && _i < line.length; _i++) {
                var dash = line.dashes[_i],
                    prevDash = line.dashes[_i - 1];
                dash.coords[_i + 1] = {
                  xM: dash.xM,
                  yM: dash.yM,
                  xL: dash.xL,
                  yL: dash.yL
                };

                if (prevDash) {
                  dash.xM = prevDash.coords[_i]["xM"];
                  dash.yM = prevDash.coords[_i]["yM"];
                  dash.xL = prevDash.coords[_i]["xL"];
                  dash.yL = prevDash.coords[_i]["yL"];
                }

                line.draw(_i);

                if (_i === 0) {
                  var lastMove = line.moves[line.moves.length - 1];

                  if (line.move % line.sizeMove === 0) {
                    if (line.move < 4) {
                      line.moves.push(line.lastMove = _this2.move(dash, params.step, direction["default"]));
                    } else {
                      line.moves.push(line.lastMove = _this2.move(dash, params.step, direction.x, direction.y));
                    }
                  } else {
                    line.moves.push(line.lastMove = _this2.move(dash, params.step, lastMove));
                  }

                  line.draw(_i);
                }
              }

              line.move++;

              if (line.dashes[line.dashes.length - 1].xM <= 0 || line.dashes[line.dashes.length - 1].yM <= 0 || line.dashes[line.dashes.length - 1].xM >= _this2.$el.offsetWidth || line.dashes[line.dashes.length - 1].yM >= _this2.$el.offsetHeight) {
                canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(line.interval);
                canvas.remove();
                _this2.linesCount--;
                setTimeout(function () {
                  line = null;
                  canvas = null;
                }, 500);
              }
            }, 60);
          };

          requestAnimFrame(draw);
        }
      }, {
        key: "initEvents",
        value: function initEvents() {
          var _this3 = this;

          window.addEventListener('resize', function () {
            _this3.update();
          });
        }
      }, {
        key: "updateGrid",
        value: function updateGrid() {
          if (!this.$bgCanvas) {
            return;
          }

          this.updateCanvasSize(this.$bgCanvas);
          this.clear(this.$bgCanvas);
          this.renderGrid();
        }
      }, {
        key: "updatePluses",
        value: function updatePluses() {
          if (!this.$plusesCanvas) {
            return;
          }

          this.updateCanvasSize(this.$plusesCanvas);
          this.clear(this.$plusesCanvas);
          this.renderPluses();
        }
      }, {
        key: "renderGrid",
        value: function renderGrid() {
          var ctx = this.$bgCanvas.ctx;

          var _this$_getGridParams2 = this._getGridParams(),
              size = _this$_getGridParams2.size;

          for (var x = 0; x <= this.$bgCanvas.width; x += size) {
            for (var y = 0; y <= this.$bgCanvas.height - 0; y += size) {
              ctx.globalAlpha = 0.15;
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + size, y);
              ctx.stroke();
              ctx.closePath();
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + size - 1);
              ctx.stroke();
              ctx.closePath();
              ctx.globalAlpha = 0.05;
              ctx.beginPath();
              ctx.moveTo(x + 2, y + 2);
              ctx.lineTo(x + size - 2, y + size - 2);
              ctx.stroke();
              ctx.closePath();
              ctx.beginPath();
              ctx.moveTo(x + size - 2, y + 2);
              ctx.lineTo(x + 2, y + size - 2);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }, {
        key: "renderPluses",
        value: function renderPluses() {
          var ctx = this.$plusesCanvas.ctx;

          var _this$_getGridParams3 = this._getGridParams(),
              pluses = _this$_getGridParams3.pluses,
              size = _this$_getGridParams3.size;

          for (var x = 0; x <= this.$plusesCanvas.width; x += size) {
            for (var y = 0; y <= this.$plusesCanvas.height - 0; y += size) {
              if (x >= pluses.xStart && x <= pluses.xEnd && y >= pluses.yStart && y <= pluses.yEnd) {
                ctx.strokeStyle = '#fff';
                ctx.globalAlpha = pluses.opacity;
                ctx.beginPath();
                ctx.moveTo(x - 4, y);
                ctx.lineTo(x + 4, y);
                ctx.moveTo(x, y - 4);
                ctx.lineTo(x, y + 4);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }, {
        key: "createCanvas",
        value: function createCanvas(name) {
          var canvas = document.createElement('canvas');
          canvas.classList.add('lines__' + name);
          this.updateCanvasSize(canvas);

          if (this.$el) {
            this.$el.appendChild(canvas);
          }

          canvas.ctx = canvas.getContext('2d');
          return canvas;
        }
      }, {
        key: "animation",
        value: function animation(obj) {
          var clear = obj.clear,
              update = obj.update,
              render = obj.render;
          setInterval(tick, 1000);

          function tick() {
            update();
            clear();
            render();
          }
        }
      }, {
        key: "clear",
        value: function clear(canvas) {
          canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, {
        key: "update",
        value: function update() {
          this.updateScreen();
          this.updateGrid();

          if (this.showPluses) {
            this.updatePluses();
          }

          this.updatedLines();
        }
      }, {
        key: "updateCanvasSize",
        value: function updateCanvasSize(canvas) {
          var _this$_getCanvasSize2 = this._getCanvasSize(),
              width = _this$_getCanvasSize2.width,
              height = _this$_getCanvasSize2.height;

          canvas.width = width;
          canvas.height = height;
        }
      }, {
        key: "updateScreen",
        value: function updateScreen() {
          this.screen = this._getScreen();
        }
      }, {
        key: "move",
        value: function move(dash, step, to, end) {
          var value = to && end ? this._random(to, end) : to;

          switch (value) {
            case 1:
              dash.xL = dash.xM;
              dash.xM = dash.xM;
              dash.yL = dash.yM;
              dash.yM -= step;
              break;

            case 2:
              dash.xL = dash.xM;
              dash.xM += step;
              dash.yL = dash.yM;
              dash.yM -= step;
              break;

            case 3:
              dash.xL = dash.xM;
              dash.xM += step;
              dash.yL = dash.yM;
              dash.yM = dash.yM;
              break;

            case 4:
              dash.xL = dash.xM;
              dash.xM += step;
              dash.yL = dash.yM;
              dash.yM += step;
              break;

            case 5:
              dash.xL = dash.xM;
              dash.xM = dash.xM;
              dash.yL = dash.yM;
              dash.yM += step;
              break;

            case 6:
              dash.xL = dash.xM;
              dash.xM -= step;
              dash.yL = dash.yM;
              dash.yM += step;
              break;

            case 7:
              dash.xL = dash.xM;
              dash.xM -= step;
              dash.yL = dash.yM;
              dash.yM = dash.yM;
              break;

            case 8:
              dash.xL = dash.xM;
              dash.xM -= step;
              dash.yL = dash.yM;
              dash.yM -= step;
              break;
          }

          return value;
        }
      }, {
        key: "dispersion",
        value: function dispersion(value) {
          if (value > 8) {
            return 8;
          } else if (value < 0) {
            return 0;
          } else {
            return value;
          }
        }
      }, {
        key: "roundDirection",
        value: function roundDirection(value, plus) {
          var _this$_getGridParams4 = this._getGridParams(),
              size = _this$_getGridParams4.size;

          if (plus) {
            return value - value % size + size;
          } else {
            return value - value % size;
          }
        }
      }, {
        key: "_getScreen",
        value: function _getScreen() {
          var windowWidth = getWindowWidth();

          if (windowWidth >= 768 && windowWidth < 1024) {
            return 'md';
          } else if (windowWidth >= 1024 && windowWidth < 1366) {
            return 'lg';
          } else if (windowWidth >= 1366) {
            return 'xl';
          } else {
            return 'xs';
          }
        }
      }, {
        key: "_getGridParams",
        value: function _getGridParams() {
          var containerParams = this._getContainerParams();

          var params = {
            pluses: {
              width: this.$options.plusesXCount || 15,
              height: this.$options.plusesYCount || 17,
              xStart: 0,
              xEnd: 0,
              yStart: 0,
              yEnd: 0
            }
          };

          switch (this.screen) {
            case 'md':
              params.size = 28;
              params.pluses.yStart = 3 * params.size;
              params.pluses.opacity = 0.3;
              params.pluses.position = 'center';
              break;

            case 'lg':
              params.size = 38;
              params.pluses.yStart = 3 * params.size;
              params.pluses.opacity = 1;
              params.pluses.position = 'right';
              break;

            case 'xl':
              params.size = 40;
              params.pluses.yStart = 4 * params.size;
              params.pluses.opacity = 1;
              params.pluses.position = 'right';
              break;

            default:
              params.size = 20;
              params.pluses.yStart = 5 * params.size;
              params.pluses.opacity = 0.3;
              params.pluses.position = 'center';
              break;
          }

          params.pluses.yEnd = params.pluses.yStart + params.pluses.height * params.size;
          var startContainer = Math.floor(containerParams.start / params.size);
          var endContainer = Math.ceil(containerParams.end / params.size);
          var x = 0;

          switch (params.pluses.position) {
            case 'right':
              x = startContainer + (endContainer - startContainer - params.pluses.width);
              break;

            default:
              x = startContainer + (endContainer - startContainer - params.pluses.width) / 2;
          }

          params.pluses.xStart = x * params.size;
          params.pluses.xEnd = (x + params.pluses.width) * params.size;
          return params;
        }
      }, {
        key: "_getLineParams",
        value: function _getLineParams() {
          var defaultParams = {
            step: 5,
            min: 2,
            max: 5,
            lines: 2
          };

          if (this.small) {
            return defaultParams;
          }

          switch (this.screen) {
            case 'md':
              return {
                step: 5,
                min: 2,
                max: 5,
                lines: 3
              };

            case 'lg':
              return {
                step: 5,
                min: 2,
                max: 10,
                lines: 5
              };

            case 'xl':
              return {
                step: 5,
                min: 2,
                max: 10,
                lines: 5
              };

            default:
              return defaultParams;
          }
        }
      }, {
        key: "_getCanvasSize",
        value: function _getCanvasSize() {
          var _this$$el;

          var _ref = ((_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.parentNode) || window,
              offsetWidth = _ref.offsetWidth,
              offsetHeight = _ref.offsetHeight;

          return {
            width: offsetWidth,
            height: offsetHeight
          };
        }
      }, {
        key: "_getContainerParams",
        value: function _getContainerParams() {
          var windowWidth = getWindowWidth();
          var params = {};
          params.width = windowWidth > 1504 ? 1440 : windowWidth - 64;
          params.start = windowWidth > 1504 ? Math.ceil((windowWidth - params.width) / 2) : 32;
          params.end = windowWidth - params.start;
          return params;
        }
      }, {
        key: "_random",
        value: function _random() {
          var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      }]);

      return Lines;
    }();

    var _iterator4 = _createForOfIteratorHelper(lines),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var line = _step4.value;
        new Lines(line);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  })(); // animation title


  (function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCSS(entry.target, entry.target.dataset.animation).then(function () {});
        }
      });
    });
    var blocks = document.querySelectorAll('[data-animation]');

    var _iterator5 = _createForOfIteratorHelper(blocks),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var block = _step5.value;
        observer.observe(block);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  })(); // scroll button


  (function () {
    var buttons = document.querySelectorAll(".scroll-button");

    var scrollHandler = function scrollHandler(e, nextElement) {
      var isMouse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      e = e || window.event;

      if (isMouse) {
        var delta = e.deltaY || e.detail || e.wheelDelta;

        if (delta < 0) {
          return;
        }
      }

      if (disabledScrollButton) {
        return;
      }

      nextElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      disabledScrollButton = true;
    };

    var _iterator6 = _createForOfIteratorHelper(buttons),
        _step6;

    try {
      var _loop2 = function _loop2() {
        var button = _step6.value;
        var parent = button.dataset.parent;

        if (!parent) {
          return "continue";
        }

        var parentNode = button.closest('.' + parent);

        if (!parentNode.nextElementSibling) {
          return "continue";
        }

        if (parentNode.addEventListener) {
          if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            parentNode.addEventListener("wheel", function (e) {
              scrollHandler(e, parentNode.nextElementSibling, true);
            });
          } else if ('onmousewheel' in document) {
            // устаревший вариант события
            parentNode.addEventListener("mousewheel", function (e) {
              scrollHandler(e, parentNode.nextElementSibling, true);
            });
          } else {
            // Firefox < 17
            parentNode.addEventListener("MozMousePixelScroll", function (e) {
              scrollHandler(e, parentNode.nextElementSibling, true);
            });
          }
        } else {
          // IE8-
          parentNode.attachEvent("onmousewheel", function (e) {
            scrollHandler(e, parentNode.nextElementSibling, true);
          });
        }

        button.addEventListener('click', function (e) {
          scrollHandler(e, parentNode.nextElementSibling);
        });
      };

      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _ret = _loop2();

        if (_ret === "continue") continue;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  })(); // main-solutions


  (function () {
    var Swiper = window.Swiper;
    var block = document.querySelector('.main-solutions');

    if (!block || !Swiper) {
      return;
    }

    var pagination = block.querySelector('.main-solutions__pagination .swiper-container');
    var slider = block.querySelector('.main-solutions__slider .swiper-container');

    if (!slider || !pagination) {
      return;
    }

    var paginationSlider = new Swiper(pagination, {
      slidesPerView: 2,
      spaceBetween: 0,
      breakpoints: {
        576: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 6
        }
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      }
    });
    new Swiper(slider, {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      thumbs: {
        swiper: paginationSlider
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      }
    });
  })(); // certificates


  (function () {
    var Swiper = window.Swiper;
    var block = document.querySelector('.certificates');

    if (!block || !Swiper) {
      return;
    }

    var slider = block.querySelector('.swiper-container');

    if (!slider) {
      return;
    }

    var prevBtn = block.querySelector('.certificates__nav-btn--prev');
    var nextBtn = block.querySelector('.certificates__nav-btn--next');
    new Swiper(slider, {
      slidesPerView: 2,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4
        },
        1366: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      },
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true
      }
    });
  })(); // possibility


  (function () {
    var scrollbar = window.scrollbar;
    var blocks = document.querySelectorAll('.possibility');

    var mouseoverHandler = function mouseoverHandler(node) {
      var height = getWindowWidth() >= 1366 ? 96 : 76;
      node.parentNode.style.height = "".concat(Math.min(height, node.offsetHeight), "px");
    };

    var mouseoutHandler = function mouseoutHandler(node) {
      var text = node.querySelector('.possibility-item__text');
      var isActive = node.classList.contains('possibility-item--active');

      if (!text || isActive) {
        return;
      }

      text.parentNode.style.height = '0';
    };

    var clickHandler = function clickHandler(block, item) {
      var modal = block.querySelector('.possibility__modal');

      if (!modal) {
        return;
      }

      var name = "";
      var text = "";
      var nameEl = item.querySelector('.possibility-item__name');

      if (nameEl) {
        name = nameEl.innerHTML;
      }

      var textEl = item.querySelector('.possibility-item__modal-text');

      if (textEl) {
        text = textEl.innerHTML;
      }

      if (!name && !text) {
        return;
      }

      var activeEl = block.querySelector('.possibility-item--active');
      var isOpenModal = modal.classList.contains('possibility__modal--open');

      if (!isOpenModal) {
        modal.classList.add('possibility__modal--open');

        if (scrollbar) {
          scrollbar.add();
        }
      } else if (activeEl === item) {
        modal.classList.remove('possibility__modal--open');

        if (scrollbar) {
          scrollbar.remove();
        }
      }

      var modalTitleEl = modal.querySelector(".possibility-modal__title");
      var modalTextEl = modal.querySelector(".possibility-modal__text");

      if (modalTitleEl && name) {
        modalTitleEl.innerHTML = name;
      }

      if (modalTextEl && text) {
        modalTextEl.innerHTML = text;
      }

      if (activeEl && activeEl !== item) {
        activeEl.classList.remove('possibility-item--active');
        mouseoutHandler(activeEl);
      }

      item.classList.toggle('possibility-item--active');
    };

    var _iterator7 = _createForOfIteratorHelper(blocks),
        _step7;

    try {
      var _loop3 = function _loop3() {
        var block = _step7.value;
        var modal = block.querySelector('.possibility__modal');
        var modalCloseButton = modal.querySelector('.possibility-modal__close-button .button');
        var items = block.querySelectorAll('.possibility-item');

        if (modalCloseButton) {
          modalCloseButton.addEventListener('click', function () {
            modal.classList.remove('possibility__modal--open');

            if (scrollbar) {
              scrollbar.remove();
            }

            var _iterator8 = _createForOfIteratorHelper(items),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var item = _step8.value;

                if (item.classList.contains('possibility-item--active')) {
                  item.classList.remove('possibility-item--active');
                  mouseoutHandler(item);
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          });
        }

        var _iterator9 = _createForOfIteratorHelper(items),
            _step9;

        try {
          var _loop4 = function _loop4() {
            var item = _step9.value;
            var text = item.querySelector('.possibility-item__text');

            if (text) {
              item.addEventListener('mouseover', function (e) {
                mouseoverHandler(text);
              });
              item.addEventListener('mouseout', function (e) {
                mouseoutHandler(item);
              });
            }

            item.addEventListener('click', function (e) {
              clickHandler(block, item);
            });
          };

          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            _loop4();
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      };

      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        _loop3();
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  })(); //main history


  (function () {
    var blocks = document.querySelectorAll('.main-history');

    var Timeline = /*#__PURE__*/function () {
      "use strict";

      function Timeline(block) {
        _classCallCheck(this, Timeline);

        this.$block = block;
        this.items = this.getItems();
        this.pictures = this.getPictures();
        this.texts = this.getTexts();
        this.date = this.getDate();
        this.timeline = this.getTimeline();
        this.currents = {};
        this.value = {
          current: 0,
          length: this.getItems().length
        };
        this.init();
      }

      _createClass(Timeline, [{
        key: "getItems",
        value: function getItems() {
          var _this$items;

          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (!((_this$items = this.items) !== null && _this$items !== void 0 && _this$items.length) || fetch) {
            this.items = this.$block.querySelectorAll('.main-history__timeline-item');
          }

          return index !== false ? this.items[index] || null : this.items;
        }
      }, {
        key: "getPictures",
        value: function getPictures() {
          var _this$pictures;

          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (!((_this$pictures = this.pictures) !== null && _this$pictures !== void 0 && _this$pictures.length) || fetch) {
            this.pictures = this.$block.querySelectorAll('.main-history__picture');
          }

          return index !== false ? this.pictures[index] || null : this.pictures;
        }
      }, {
        key: "getTexts",
        value: function getTexts() {
          var _this$texts;

          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (!((_this$texts = this.texts) !== null && _this$texts !== void 0 && _this$texts.length) || fetch) {
            this.texts = this.$block.querySelectorAll('.main-history__text');
          }

          return index !== false ? this.texts[index] || null : this.texts;
        }
      }, {
        key: "getDate",
        value: function getDate() {
          var _this$date;

          var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var fetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          if (!((_this$date = this.date) !== null && _this$date !== void 0 && _this$date.length) || fetch) {
            this.date = document.querySelectorAll('.main-history__year .main-history__year-container');
          }

          return index !== false ? this.date[index] || null : this.date;
        }
      }, {
        key: "getTimeline",
        value: function getTimeline() {
          var fetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (!this.timeline || fetch) {
            this.timeline = document.querySelector('.main-history__timeline');
          }

          return this.timeline;
        }
      }, {
        key: "init",
        value: function init() {
          this.setElementsForItems();
          this.createDefaultYear();
          this.setCurrent(this.getItems(0));
          this.setDefaultTransformNumbers();
          this.setDefaultTransformTimeline();
          this.initEvents();
        }
      }, {
        key: "initEvents",
        value: function initEvents() {
          var _this4 = this;

          var _iterator10 = _createForOfIteratorHelper(this.getItems()),
              _step10;

          try {
            var _loop5 = function _loop5() {
              var item = _step10.value;
              item.addEventListener('click', function () {
                if (!item.classList.contains('active')) {
                  _this4.changeItem(item);
                }
              });
            };

            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              _loop5();
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }

          var onResize = this.onResize.bind(this);
          window.addEventListener('resize', onResize);
          var onMouseWheel = this.onMouseWheel.bind(this);

          if (this.$block.addEventListener) {
            if ('onwheel' in document) {
              // IE9+, FF17+, Ch31+
              this.$block.addEventListener("wheel", function (e) {
                onMouseWheel(e);
              });
            } else if ('onmousewheel' in document) {
              // устаревший вариант события
              this.$block.addEventListener("mousewheel", function (e) {
                onMouseWheel(e);
              });
            } else {
              // Firefox < 17
              this.$block.addEventListener("MozMousePixelScroll", function (e) {
                onMouseWheel(e);
              });
            }
          } else {
            // IE8-
            this.$block.attachEvent("onmousewheel", function (e) {
              onMouseWheel(e);
            });
          }
        }
      }, {
        key: "onResize",
        value: function onResize(e) {
          this.changeItem(this.getItems(this.value.current));
        }
      }, {
        key: "getBlockRect",
        value: function getBlockRect() {
          return this.$block.getBoundingClientRect();
        }
      }, {
        key: "isTopBlock",
        value: function isTopBlock() {
          var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var rect = this.getBlockRect();
          return rect.top - delta * 2 >= 0;
        }
      }, {
        key: "isBottomBlock",
        value: function isBottomBlock() {
          var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var rect = this.getBlockRect();
          var wh = window.innerHeight || document.documentElement.clientHeight;
          var st = window.pageYOffset || document.documentElement.scrollTop;
          return st + wh >= rect.top + st + rect.height - delta * 2;
        }
      }, {
        key: "onMouseWheel",
        value: function onMouseWheel(e) {
          e = e || window.event;
          var delta = e.deltaY || e.detail || e.wheelDelta;
          var isTopBlock = this.isTopBlock(delta);
          var isBottomBlock = this.isBottomBlock(delta);

          if (isTopBlock && this.value.current === 0 && delta < 0) {
            // this.movePrev()
            return;
          } else if (isBottomBlock && this.value.current === this.value.length - 1 && delta > 0) {
            // this.moveNext()
            return;
          }

          if (isTopBlock && delta < 0 || isBottomBlock && delta > 0) {
            e.preventDefault();
            e.stopPropagation();
            var el = null;

            if (delta < 0) {
              el = this.getItems(this.value.current - 1);
            } else if (delta > 0) {
              el = this.getItems(this.value.current + 1);
            }

            if (el) {
              this.changeItem(el);
            }

            if (isTopBlock && delta < 0) {
              this.$block.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } else if (isBottomBlock && delta > 0) {
              this.$block.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
              });
            }
          }
        }
      }, {
        key: "movePrev",
        value: function movePrev() {
          var prevElement = this.$block.previousElementSibling;
          prevElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, {
        key: "moveNext",
        value: function moveNext() {
          var nextElement = this.$block.nextElementSibling;
          nextElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, {
        key: "setElementsForItems",
        value: function setElementsForItems() {
          var i = 0;
          var indexes = [0, 0, 0, 0];

          var _iterator11 = _createForOfIteratorHelper(this.getItems()),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var item = _step11.value;
              item.index = i;
              item.date = item.innerText;
              item.picture = this.getPictures(i);
              item.text = this.getTexts(i);
              item.compare = [];

              if (i > 0) {
                var prevEl = this.getItems(i - 1);
                this.compareYears(item, prevEl, indexes);
              }

              i++;
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }
      }, {
        key: "compareYears",
        value: function compareYears(current, prev, indexes) {
          for (var i = 0; i < 4; i++) {
            if (current.date[i] !== prev.date[i]) {
              indexes[i]++;
              this.getDate(i).append(this.createYear(current.date[i], current));
            }

            current.compare[i] = indexes[i];
          }
        }
      }, {
        key: "createYear",
        value: function createYear(value, el) {
          var year = document.createElement('div');
          year.className = 'main-history__year-number';
          year.innerText = value;
          year.el = el;
          return year;
        }
      }, {
        key: "createDefaultYear",
        value: function createDefaultYear() {
          this.getItems(0).compare = [0, 0, 0, 0];

          for (var i = 0; i < 4; i++) {
            this.getDate(i).prepend(this.createYear(this.getItems(0).date[i], this.getItems(0).date[i]));
          }
        }
      }, {
        key: "setCurrent",
        value: function setCurrent(item) {
          this.currents.item = item;
          this.currents.picture = item.picture;
          this.currents.text = item.text;
          item.classList.add('active');
          item.picture.classList.add('active');
          item.text.classList.add('active');
          this.value.current = this.currents.item.index;
        }
      }, {
        key: "removeCurrent",
        value: function removeCurrent() {
          this.currents.item.classList.remove('active');
          this.currents.picture.classList.remove('active');
          this.currents.text.classList.remove('active');
        }
      }, {
        key: "setDefaultTransformNumbers",
        value: function setDefaultTransformNumbers() {
          var _iterator12 = _createForOfIteratorHelper(this.getDate()),
              _step12;

          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
              var number = _step12.value;
              number.years = number.querySelectorAll('.main-history__year-number');
              var i = 0;

              var _iterator13 = _createForOfIteratorHelper(number.years),
                  _step13;

              try {
                for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                  var year = _step13.value;

                  if (year.el === this.currents.item) {
                    var transformValue = year.offsetHeight * i;
                    number.style.transform = 'translateY(-' + transformValue + 'px)';
                  }

                  i++;
                }
              } catch (err) {
                _iterator13.e(err);
              } finally {
                _iterator13.f();
              }
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
        }
      }, {
        key: "setDefaultTransformTimeline",
        value: function setDefaultTransformTimeline() {
          var transformValue = this.currents.item.offsetWidth * this.currents.item.index;
          this.getTimeline().style.transform = "translateX(-".concat(transformValue, "px)");
        }
      }, {
        key: "changeItem",
        value: function changeItem(el) {
          this.transformYear(el);
          this.removeCurrent();
          this.setCurrent(el);
          this.setDefaultTransformTimeline();
        }
      }, {
        key: "transformYear",
        value: function transformYear(el) {
          for (var i = 0; i < 4; i++) {
            if (el.compare[i] !== this.currents.item.compare[i]) {
              var transformValue = this.getDate(0).years[0].offsetHeight * el.compare[i];
              this.getDate(i).style.transform = "translateY(-".concat(transformValue, "px)");
            }
          }
        }
      }]);

      return Timeline;
    }();

    var _iterator14 = _createForOfIteratorHelper(blocks),
        _step14;

    try {
      var _loop6 = function _loop6() {
        var block = _step14.value;
        var skipBtn = block.querySelector('.main-history__skip-button .button');

        if (skipBtn) {
          skipBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var nextNode = null;

            if (direction === directions.top) {
              nextNode = block.previousElementSibling;
            } else if (direction === directions.bottom) {
              nextNode = block.nextElementSibling;
            }

            if (nextNode) {
              nextNode.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        }

        new Timeline(block);
      };

      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        _loop6();
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
    }
  })(); // article


  (function () {
    var blocks = document.querySelectorAll('.article');

    var _iterator15 = _createForOfIteratorHelper(blocks),
        _step15;

    try {
      var _loop7 = function _loop7() {
        var block = _step15.value;
        var button = block.querySelector('.article__button .button');

        if (!button) {
          return "continue";
        }

        var buttonTextEl = button.querySelector('.button__text');
        var buttonText = buttonTextEl.innerHTML;
        var buttonHideText = buttonTextEl.dataset['hide-text'] || "Кратко";

        if (button) {
          button.addEventListener('click', function () {
            var isOpen = block.classList.contains('article--show-detail');
            block.classList[isOpen ? 'remove' : 'add']('article--show-detail');
            buttonTextEl.innerHTML = isOpen ? buttonText : buttonHideText;
          });
        }
      };

      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
        var _ret2 = _loop7();

        if (_ret2 === "continue") continue;
      }
    } catch (err) {
      _iterator15.e(err);
    } finally {
      _iterator15.f();
    }
  })(); // sidebar-block


  (function () {
    var StickySidebar = window.StickySidebar;

    if (!StickySidebar) {
      return;
    }

    var blocks = document.querySelectorAll('.sidebar-block');

    var _iterator16 = _createForOfIteratorHelper(blocks),
        _step16;

    try {
      for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
        var block = _step16.value;
        var sidebar = block.querySelector('.sidebar');

        if (sidebar) {
          new StickySidebar(sidebar, {
            offsetBottom: 32,
            offsetTop: 112
          });
        }
      }
    } catch (err) {
      _iterator16.e(err);
    } finally {
      _iterator16.f();
    }
  })(); // left-menu


  (function () {
    var blocks = document.querySelectorAll('.left-menu');

    var _iterator17 = _createForOfIteratorHelper(blocks),
        _step17;

    try {
      var _loop8 = function _loop8() {
        var block = _step17.value;
        var links = block.querySelectorAll('.left-menu__link');
        var scrollBlocks = [];

        var _iterator18 = _createForOfIteratorHelper(links),
            _step18;

        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var link = _step18.value;
            var href = link.getAttribute('href');

            if (href && href[0] === '#') {
              (function () {
                var scrollEl = document.querySelector(href);

                if (scrollEl) {
                  scrollBlocks.push(scrollEl);
                }

                link.addEventListener('click', function (e) {
                  e.preventDefault();

                  if (!scrollEl) {
                    return;
                  }

                  scrollToEl(scrollEl);
                });
              })();
            }
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }

        if (scrollBlocks.length) {
          var currentArticleIndex = null;

          var setCurrent = function setCurrent() {
            scrollBlocks.some(function (el, index) {
              var _el$getBoundingClient = el.getBoundingClientRect(),
                  height = _el$getBoundingClient.height,
                  top = _el$getBoundingClient.top;

              var offset = window.innerHeight / 2;
              var isCurrentArticle = height + (top - offset) > 0;

              if (!(!isCurrentArticle || currentArticleIndex !== index)) {
                return true;
              } else {
                if (isCurrentArticle) {
                  currentArticleIndex = index;
                  var id = el.getAttribute('id');

                  var _iterator19 = _createForOfIteratorHelper(links),
                      _step19;

                  try {
                    for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
                      var link = _step19.value;
                      var className = 'left-menu__link--active';

                      if (link.getAttribute('href') === "#".concat(id)) {
                        link.classList.add(className);
                      } else if (link.classList.contains(className)) {
                        link.classList.remove(className);
                      }
                    }
                  } catch (err) {
                    _iterator19.e(err);
                  } finally {
                    _iterator19.f();
                  }

                  return true;
                }

                return false;
              }
            });
          };

          setCurrent();

          var _onScrollHandler2 = function _onScrollHandler2() {
            setCurrent();
          };

          document.addEventListener('scroll', _onScrollHandler2);
          window.addEventListener('resize', _onScrollHandler2);
        }
      };

      for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
        _loop8();
      }
    } catch (err) {
      _iterator17.e(err);
    } finally {
      _iterator17.f();
    }
  })(); // reviews


  (function () {
    var Swiper = window.Swiper;
    var block = document.querySelector('.reviews');

    if (!block || !Swiper) {
      return;
    }

    var slider = block.querySelector('.swiper-container');

    if (!slider) {
      return;
    }

    var prevBtn = block.querySelector('.reviews__nav-btn--prev');
    var nextBtn = block.querySelector('.reviews__nav-btn--next');
    new Swiper(slider, {
      slidesPerView: 1,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn
      }
    });
  })(); // accordion


  (function () {
    var slideToggle = window.slideToggle;

    if (!slideToggle) {
      return;
    }

    var blocks = document.querySelectorAll('.accordion');

    var _iterator20 = _createForOfIteratorHelper(blocks),
        _step20;

    try {
      var _loop9 = function _loop9() {
        var block = _step20.value;
        var header = block.querySelector('.accordion__header');
        var content = block.querySelector(".accordion__content-container");
        header.addEventListener('click', function (e) {
          e.preventDefault();
          slideToggle(content, {
            parent: block,
            activeClass: "accordion--open"
          });
        });
      };

      for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
        _loop9();
      }
    } catch (err) {
      _iterator20.e(err);
    } finally {
      _iterator20.f();
    }
  })();
})(typeof global === "undefined" ? window : global);