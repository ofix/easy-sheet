var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EasySheet;
(function (EasySheet) {
    var CWndManager = (function () {
        function CWndManager() {
            this.wndList = [];
            this.topMostWndList = [];
        }
        CWndManager.instance = function () {
            if (CWndManager._instance === null) {
                CWndManager._instance = new CWndManager();
            }
            return CWndManager._instance;
        };
        CWndManager.prototype.registerWnd = function (wnd) {
            this.wndList.push(wnd);
        };
        CWndManager.prototype.print = function () {
        };
        CWndManager.prototype.setWndTopMost = function (wnd) {
            if (this.isWndExist(wnd)) {
            }
            else {
                this.topMostWndList.unshift(wnd);
            }
        };
        CWndManager.prototype.isWndExist = function (wnd) {
            var exist = false;
            for (var i = 0, len = this.wndList.length; i < len; i++) {
                if (this.wndList[i].name == wnd.name) {
                    exist = true;
                    break;
                }
            }
            return exist;
        };
        CWndManager._instance = null;
        return CWndManager;
    }());
    EasySheet.CWndManager = CWndManager;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CWnd = (function () {
        function CWnd(name) {
            this._name = name;
        }
        CWnd.prototype.CreateWindow = function (zIndex, x, y, width, height, bFixed) {
            if (bFixed === void 0) { bFixed = false; }
            this._x = x;
            this._y = y;
            this._w = width;
            this._h = height;
            this._zIndex = zIndex;
            this._bFixed = bFixed;
            this.CreateCanvas();
        };
        Object.defineProperty(CWnd.prototype, "zIndex", {
            get: function () {
                return this._zIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWnd.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWnd.prototype, "visualHeight", {
            get: function () {
                return this._div.clientHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWnd.prototype, "contentHeight", {
            get: function () {
                return this._h;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWnd.prototype, "context", {
            get: function () {
                return this._ctx;
            },
            enumerable: true,
            configurable: true
        });
        CWnd.prototype.CreateCanvas = function () {
            this._div = document.createElement('div');
            this._div.id = 'd-' + this.name;
            this._div.style.position = this._bFixed ? "fixed" : "absolute";
            this._div.style.left = this._x + "px";
            this._div.style.top = this._y + "px";
            this._div.style.zIndex = this._zIndex;
            this._canvas = document.createElement('canvas');
            this._canvas.id = this.name;
            this._canvas.style.position = "relative";
            this._canvas.style.left = "0px";
            this._canvas.style.top = "0px";
            this._canvas.width = this._w;
            this._canvas.height = this._h;
            this._div.appendChild(this._canvas);
            document.body.appendChild(this._div);
            EasySheet.CWndManager.instance().registerWnd(this);
            this._ctx = this._canvas.getContext("2d");
            this._ctx.translate(0.5, 0.5);
        };
        return CWnd;
    }());
    EasySheet.CWnd = CWnd;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CCell = (function () {
        function CCell(iRow, iCol, x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 24; }
            if (height === void 0) { height = 10; }
            this.CELL_NORMAL = 1;
            this.CELL_TOP = 2;
            this.CELL_LEFT = 3;
            this.iRow = iRow;
            this.iCol = iCol;
            this.type = this.CELL_NORMAL;
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this.col = 'A';
            this.row = 1;
            this.fClr = '#000';
            this.bClr = '#FFF';
            this.font_size = 12;
            this.font_bold = false;
            this.font_family = 'Arial';
            this.text = '';
            this.pTable = '';
            this.padding = DEFAULT_CELL_PADDING;
        }
        CCell.prototype.draw = function () {
        };
        CCell.prototype.setPos = function (iRow, iCol) {
            this.iRow = iRow;
            this.iCol = iCol;
        };
        CCell.prototype.getRow = function () {
            return this.row;
        };
        CCell.prototype.setRow = function (row) {
            this.row = row;
        };
        CCell.prototype.getCol = function () {
            return this.col;
        };
        CCell.prototype.setCol = function (col) {
            this.col = col;
        };
        CCell.prototype.getContent = function () {
            return this.text;
        };
        CCell.prototype.setContent = function (text) {
            this.text = text;
        };
        CCell.prototype.getX = function () {
            return this.x;
        };
        CCell.prototype.setX = function (x) {
            this.x = x;
        };
        CCell.prototype.getY = function () {
            return this.y;
        };
        CCell.prototype.setY = function (y) {
            this.y = y;
        };
        CCell.prototype.getWidth = function () {
            return this.w;
        };
        CCell.prototype.setWidth = function (width) {
            this.w = width;
        };
        CCell.prototype.getHeight = function () {
            return this.h;
        };
        CCell.prototype.setHeight = function (height) {
            this.h = height;
        };
        CCell.prototype.getBackgroundColor = function () {
            return this.bClr;
        };
        CCell.prototype.setBackgroundColor = function (color) {
            this.bClr = color;
        };
        CCell.prototype.getForegroundColor = function () {
            return this.fClr;
        };
        CCell.prototype.setForegroundColor = function (color) {
            this.fClr = color;
        };
        CCell.prototype.setFontSize = function (fontSize) {
            this.font_size = fontSize;
        };
        CCell.prototype.getFontSize = function () {
            return this.font_size;
        };
        CCell.prototype.setFontFamily = function (fontFamily) {
            this.font_family = fontFamily;
        };
        CCell.prototype.getFontFamily = function () {
            return this.font_family;
        };
        return CCell;
    }());
    EasySheet.CCell = CCell;
})(EasySheet || (EasySheet = {}));
var CLR_BAR_FILL = "#E4ECF7";
var CLR_BAR_SEP = "#9EB6CE";
var CLR_BAR_FILL_ACTIVE = "#FFD58D";
var CLR_BAR_TEXT = "#27413E";
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_ROWS = 1000;
var DEFAULT_COLS = 52;
var DEFAULT_BACK_COLOR = "#FFF";
var DEFAULT_FORE_COLOR = "#000";
var DEFAULT_SELECT_CELL_COLOR = "#FF0000";
var CELL_WIDTH = 72;
var FIXED_CELL_WIDTH = 34;
var CELL_HEIGHT = 20;
var MODE_NORMAL = 0;
var MODE_IN_EDIT = 1;
var MODE_IN_DRAG = 2;
var MODE_IN_SELECT = 3;
var INSERT_TEXT = 0;
var INSERT_IMAGE = 1;
var DEFAULT_CELL_PADDING = 2;
var EasySheet;
(function (EasySheet) {
    var CRowCtrl = (function (_super) {
        __extends(CRowCtrl, _super);
        function CRowCtrl(parentWnd, nRows) {
            var _this = _super.call(this, "es-row-ctrl") || this;
            _this._parent = parentWnd;
            _this._x = 0;
            _this._y = 0;
            _this._nRows = nRows;
            _this._rows = [];
            _this._yScrollDelta = 0;
            _this._ctx = _this._parent.context;
            for (var i = 0; i < _this._nRows; i++) {
                _this._rows.push(CELL_HEIGHT);
            }
            return _this;
        }
        Object.defineProperty(CRowCtrl.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRowCtrl.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        CRowCtrl.prototype.OnDragStart = function (ptCursor) {
            this._inDrag = true;
        };
        CRowCtrl.prototype.OnDragging = function (ptCursor) {
        };
        CRowCtrl.prototype.OnDragEnd = function (ptCursor) {
            this._inDrag = false;
        };
        CRowCtrl.prototype.scrollY = function (delta) {
        };
        CRowCtrl.prototype.Draw = function () {
            var _this = this;
            var hTotal = 0;
            this._ctx.translate(0, this._yScrollDelta);
            this._ctx.save();
            this._ctx.fillStyle = CLR_BAR_FILL;
            this._ctx.fillRect(0, 0, FIXED_CELL_WIDTH, CELL_HEIGHT * this._nRows);
            this._ctx.fillStyle = CLR_BAR_TEXT;
            this._ctx.strokeStyle = CLR_BAR_SEP;
            this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._ctx.textBaseline = "middle";
            this._ctx.textAlign = "center";
            this._rows.forEach(function (v, i) {
                if (i > 0) {
                    var name_1 = "" + i;
                    _this._ctx.fillText(name_1, FIXED_CELL_WIDTH / 2, hTotal + CELL_HEIGHT / 2);
                }
                hTotal += v;
                _this._ctx.beginPath();
                _this._ctx.moveTo(0, hTotal);
                _this._ctx.lineTo(FIXED_CELL_WIDTH, hTotal);
                _this._ctx.stroke();
            });
            this._ctx.restore();
        };
        CRowCtrl.prototype.drawDragLine = function () {
        };
        return CRowCtrl;
    }(EasySheet.CWnd));
    EasySheet.CRowCtrl = CRowCtrl;
})(EasySheet || (EasySheet = {}));
var CPoint = (function () {
    function CPoint(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return CPoint;
}());
var EasySheet;
(function (EasySheet) {
    var CGridCtrl = (function () {
        function CGridCtrl(parentWnd, nRows, nCols) {
            this._parent = parentWnd;
            this._nRows = nRows;
            this._nCols = nCols;
            this._x = FIXED_CELL_WIDTH;
            this._y = CELL_HEIGHT;
            this._w = nCols * CELL_WIDTH;
            this._h = nRows * CELL_HEIGHT;
            this._rows = [];
            this._cols = [];
            this._ctx = this._parent.context;
        }
        CGridCtrl.prototype.OnDragStart = function (ptCursor) {
            this._inDrag = true;
        };
        CGridCtrl.prototype.OnDragging = function (ptCursor) {
        };
        CGridCtrl.prototype.OnDragEnd = function (ptCursor) {
            this._inDrag = false;
        };
        CGridCtrl.prototype.GetItemXY = function (iRow, iCol) {
            var pt = new CPoint();
            pt.x = iCol * CELL_WIDTH + this._x;
            pt.y = iRow * CELL_HEIGHT;
            return pt;
        };
        CGridCtrl.prototype.Draw = function () {
            for (var i = 0; i < this._nRows; i++) {
                for (var j = 0; j < this._nCols; j++) {
                    this._ctx.save();
                    var xy = this.GetItemXY(i, j);
                    this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                    this._ctx.textBaseline = "middle";
                    this._ctx.textAlign = "center";
                    this._ctx.fillStyle = "#000";
                    this._ctx.fillText("" + i + j, xy.x + CELL_WIDTH / 2, xy.y + CELL_HEIGHT / 2);
                    this._ctx.stroke();
                    this._ctx.restore();
                }
            }
        };
        return CGridCtrl;
    }());
    EasySheet.CGridCtrl = CGridCtrl;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CScrollBarCtrl = (function () {
        function CScrollBarCtrl(parentWnd, name, barStyle, x, y, width, height) {
            if (name === void 0) { name = "scroll-bar"; }
            if (barStyle === void 0) { barStyle = CScrollBarCtrl.SBC_HORZ; }
            if (height === void 0) { height = 18; }
            this._parent = parentWnd;
            this._name = name;
            this._bar_style = barStyle;
            this._x = x;
            this._y = y;
            this._w = width;
            this._h = height;
            this._vw = this._w;
            this._ctx = parentWnd.context;
            this._barClr = "#C1C1C1";
            this._bkClr = "#F1F1F1";
            this._triClr = "#505050";
            this._pos = 0;
            this._page = 0;
            this._view = 0;
        }
        Object.defineProperty(CScrollBarCtrl.prototype, "barColor", {
            get: function () {
                return this._barClr;
            },
            set: function (color) {
                this._barClr = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CScrollBarCtrl.prototype, "bkColor", {
            get: function () {
                return this._bkClr;
            },
            set: function (color) {
                this._bkClr = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CScrollBarCtrl.prototype, "triangleColor", {
            get: function () {
                return this._triClr;
            },
            set: function (color) {
                this._triClr = color;
            },
            enumerable: true,
            configurable: true
        });
        CScrollBarCtrl.prototype.SetScrollPos = function (value) {
            this._pos = value;
        };
        CScrollBarCtrl.prototype.GetScrollPos = function () {
            return this._pos;
        };
        CScrollBarCtrl.prototype.SetPageSize = function (size) {
            this._page = size;
        };
        CScrollBarCtrl.prototype.GetPageSize = function () {
            return this._page;
        };
        CScrollBarCtrl.prototype.SetViewSize = function (size) {
            this._view = size;
        };
        CScrollBarCtrl.prototype.GetViewSize = function () {
            return this._view;
        };
        CScrollBarCtrl.prototype.Draw = function () {
            this._ctx.translate(0.5, 0.5);
            this.DrawBk();
            this.DrawLeftTriangle();
            this.DrawRightTriangle();
            this.DrawBar();
        };
        CScrollBarCtrl.prototype.DrawLeftTriangle = function () {
            this._ctx.save();
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x + 12, this._y + 6);
            this._ctx.lineTo(this._x + 12, this._y + this._h - 6);
            this._ctx.lineTo(this._x + 8, this._y + this._h / 2);
            this._ctx.closePath();
            this._ctx.fill();
            this._ctx.restore();
        };
        CScrollBarCtrl.prototype.DrawRightTriangle = function () {
            this._ctx.save();
            this._ctx.fillStyle = this._triClr;
            this._ctx.strokeStyle = this._triClr;
            this._ctx.beginPath();
            this._ctx.moveTo(this._x + this._w - 12, this._y + 6);
            this._ctx.lineTo(this._x + this._w - 12, this._y + this._h - 6);
            this._ctx.lineTo(this._x + this._w - 8, this._y + this._h / 2);
            this._ctx.closePath();
            this._ctx.fill();
            this._ctx.restore();
        };
        CScrollBarCtrl.prototype.DrawBk = function () {
            this._ctx.save();
            this._ctx.fillStyle = this._bkClr;
            this._ctx.fillRect(this._x, this._y, this._w, this._h);
            this._ctx.restore();
        };
        CScrollBarCtrl.prototype.DrawBar = function () {
            this._ctx.save();
            this._ctx.fillStyle = this._barClr;
            var w = Math.floor((this._w - 40) * (this._view / this._page));
            this._ctx.fillRect(this._x + 18, this._y + 2, w, this._h - 4);
            this._ctx.restore();
        };
        CScrollBarCtrl.SBC_HORZ = 0;
        CScrollBarCtrl.SBC_VERT = 1;
        return CScrollBarCtrl;
    }());
    EasySheet.CScrollBarCtrl = CScrollBarCtrl;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CView = (function (_super) {
        __extends(CView, _super);
        function CView(nRows, nCols) {
            var _this = _super.call(this, "es-view") || this;
            _this.CreateWindow("100", 0, 0, nCols * CELL_WIDTH, nRows * CELL_HEIGHT);
            _this._nRows = nRows;
            _this._nCols = nCols;
            _this._gridCtrl = new EasySheet.CGridCtrl(_this, nRows, nCols);
            _this._rowCtrl = new EasySheet.CRowCtrl(_this, nRows);
            _this._scrollBarCtrl = new EasySheet.CScrollBarCtrl(_this, "scroll-bar", EasySheet.CScrollBarCtrl.SBC_HORZ, 120, 300, 200);
            _this._scrollBarCtrl.SetPageSize(1000);
            _this._scrollBarCtrl.SetViewSize(500);
            return _this;
        }
        Object.defineProperty(CView.prototype, "gridCtrl", {
            get: function () {
                return this._gridCtrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CView.prototype, "rowCtrl", {
            get: function () {
                return this._rowCtrl;
            },
            enumerable: true,
            configurable: true
        });
        CView.prototype.GetRowCount = function () {
            return this._nRows;
        };
        CView.prototype.GetColCount = function () {
            return this._nCols;
        };
        CView.prototype.Draw = function () {
            this._gridCtrl.Draw();
            this._rowCtrl.Draw();
            this._scrollBarCtrl.Draw();
        };
        return CView;
    }(EasySheet.CWnd));
    EasySheet.CView = CView;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CColumnCtrl = (function (_super) {
        __extends(CColumnCtrl, _super);
        function CColumnCtrl(nCols) {
            var _this = _super.call(this, "es-col-ctrl") || this;
            _this.CreateWindow("1000", 0, 0, nCols * CELL_WIDTH, CELL_HEIGHT, true);
            _this._nCols = nCols;
            _this._cols = [];
            for (var i = 0; i < _this._nCols; i++) {
                _this._cols.push(CELL_WIDTH);
            }
            return _this;
        }
        CColumnCtrl.prototype.OnDragStart = function (ptCursor) {
            this._inDrag = true;
        };
        CColumnCtrl.prototype.OnDragging = function (ptCursor) {
        };
        CColumnCtrl.prototype.OnDragEnd = function (ptCursor) {
            this._inDrag = false;
        };
        CColumnCtrl.prototype.getColName = function (index) {
            var name = '';
            var i = Math.floor(index / 26);
            if (i > 0) {
                name += this.getColName(i - 1);
            }
            return name + String.fromCharCode(index % 26 + 65);
        };
        CColumnCtrl.prototype.Draw = function () {
            var _this = this;
            var wTotal = FIXED_CELL_WIDTH;
            this._cols.forEach(function (v, i) {
                _this._ctx.save();
                var name = _this.getColName(i);
                _this._ctx.fillStyle = CLR_BAR_FILL;
                _this._ctx.fillRect(wTotal, 0, v, CELL_HEIGHT);
                _this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                _this._ctx.textBaseline = "middle";
                _this._ctx.textAlign = 'center';
                _this._ctx.fillStyle = CLR_BAR_TEXT;
                _this._ctx.fillText(name, wTotal + v / 2, CELL_HEIGHT / 2);
                wTotal += v;
                _this._ctx.strokeStyle = CLR_BAR_SEP;
                _this._ctx.moveTo(wTotal, 0);
                _this._ctx.lineTo(wTotal, CELL_HEIGHT);
                _this._ctx.stroke();
                _this._ctx.restore();
            });
        };
        return CColumnCtrl;
    }(EasySheet.CWnd));
    EasySheet.CColumnCtrl = CColumnCtrl;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CApp = (function () {
        function CApp() {
            this._view = new EasySheet.CView(256, 52);
            this._colCtrl = new EasySheet.CColumnCtrl(52);
        }
        CApp.prototype.run = function () {
            this._colCtrl.Draw();
            this._view.Draw();
        };
        Object.defineProperty(CApp.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CApp.prototype, "rowCtrl", {
            get: function () {
                return this._view.rowCtrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CApp.prototype, "gridCtrl", {
            get: function () {
                return this._view.gridCtrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CApp.prototype, "colCtrl", {
            get: function () {
                return this._colCtrl;
            },
            enumerable: true,
            configurable: true
        });
        return CApp;
    }());
    EasySheet.CApp = CApp;
})(EasySheet || (EasySheet = {}));
var app = new EasySheet.CApp();
app.run();
var EasySheet;
(function (EasySheet) {
    var CEditCtrl = (function () {
        function CEditCtrl() {
        }
        return CEditCtrl;
    }());
    EasySheet.CEditCtrl = CEditCtrl;
})(EasySheet || (EasySheet = {}));
$(function () {
    $("#wnd-left-bar").bind("mousewheel DOMMouseScroll", function (event, delta, deltaX, deltaY) {
        app.rowCtrl.scrollY(deltaY);
        $("#wnd-data").css("top+=", deltaY * 53);
    });
});
var CRect = (function () {
    function CRect(x, y, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    CRect.prototype.setRect = function (ptLeftTop, ptRightBottom) {
        this.x = ptLeftTop.x;
        this.y = ptLeftTop.y;
        this.w = ptRightBottom.x - ptLeftTop.x;
        this.h = ptRightBottom.y - ptLeftTop.y;
        return this;
    };
    return CRect;
}());
function isPointInRect(pt, rect) {
    return (pt.x >= rect.x && pt.x <= rect.x
        && pt.y >= rect.y && pt.y <= rect.y);
}
function isRectEmpty(rect) {
    return (rect.w == 0 || rect.h == 0);
}
function makeRect(pt1, pt2) {
    var ptTopLeft;
    var ptRightBottom;
    if ((pt1.x >= pt2.x) && (pt1.y >= pt2.y)) {
        ptTopLeft = pt1;
        ptRightBottom = pt2;
    }
    else if ((pt1.x >= pt2.x) && (pt1.y <= pt2.y)) {
        ptTopLeft = new CPoint(pt2.x, pt1.y);
        ptRightBottom = new CPoint(pt1.x, pt2.y);
    }
    else if ((pt1.x <= pt2.x) && (pt1.y >= pt2.y)) {
        ptTopLeft = new CPoint(pt1.x, pt2.y);
        ptRightBottom = new CPoint(pt2.x, pt1.y);
    }
    else if ((pt1.x <= pt2.x) && (pt1.y <= pt2.y)) {
        ptTopLeft = pt2;
        ptRightBottom = pt1;
    }
    return (new CRect()).setRect(ptTopLeft, ptRightBottom);
}
function now() {
    var date = new Date();
    var hour = padZero(date.getHours());
    var minute = padZero(date.getMinutes());
    var second = padZero(date.getSeconds());
    var millSecond = padZero(date.getMilliseconds());
    return (hour + ":" + minute + ":" + second + ":" + millSecond);
}
function padZero(digit) {
    if (digit < 10) {
        return "0" + digit;
    }
    return digit + "";
}
function sameSign(x, y) {
    return ((x < 0 && y < 0) || (x > 0 && y > 0));
}
var EasySheet;
(function (EasySheet) {
    var Key;
    (function (Key) {
        Key[Key["BACKSPACE"] = 8] = "BACKSPACE";
        Key[Key["TAB"] = 9] = "TAB";
        Key[Key["ENTER"] = 13] = "ENTER";
        Key[Key["SHIFT"] = 16] = "SHIFT";
        Key[Key["CTRL"] = 17] = "CTRL";
        Key[Key["ALT"] = 18] = "ALT";
        Key[Key["SPACE"] = 32] = "SPACE";
        Key[Key["PAGE_UP"] = 33] = "PAGE_UP";
        Key[Key["PAGE_DOWN"] = 34] = "PAGE_DOWN";
        Key[Key["END"] = 35] = "END";
        Key[Key["HOME"] = 36] = "HOME";
        Key[Key["LEFT"] = 37] = "LEFT";
        Key[Key["UP"] = 38] = "UP";
        Key[Key["RIGHT"] = 39] = "RIGHT";
        Key[Key["DOWN"] = 40] = "DOWN";
        Key[Key["DEL"] = 46] = "DEL";
        Key[Key["NUM0"] = 48] = "NUM0";
        Key[Key["NUM1"] = 49] = "NUM1";
        Key[Key["NUM2"] = 50] = "NUM2";
        Key[Key["NUM3"] = 51] = "NUM3";
        Key[Key["NUM4"] = 52] = "NUM4";
        Key[Key["NUM5"] = 53] = "NUM5";
        Key[Key["NUM6"] = 54] = "NUM6";
        Key[Key["NUM7"] = 55] = "NUM7";
        Key[Key["NUM8"] = 56] = "NUM8";
        Key[Key["NUM9"] = 57] = "NUM9";
        Key[Key["A"] = 65] = "A";
        Key[Key["B"] = 66] = "B";
        Key[Key["C"] = 67] = "C";
        Key[Key["D"] = 68] = "D";
        Key[Key["E"] = 69] = "E";
        Key[Key["F"] = 70] = "F";
        Key[Key["G"] = 71] = "G";
        Key[Key["H"] = 72] = "H";
        Key[Key["I"] = 73] = "I";
        Key[Key["J"] = 74] = "J";
        Key[Key["K"] = 75] = "K";
        Key[Key["L"] = 76] = "L";
        Key[Key["M"] = 77] = "M";
        Key[Key["N"] = 78] = "N";
        Key[Key["O"] = 79] = "O";
        Key[Key["P"] = 80] = "P";
        Key[Key["Q"] = 81] = "Q";
        Key[Key["R"] = 82] = "R";
        Key[Key["S"] = 83] = "S";
        Key[Key["T"] = 84] = "T";
        Key[Key["U"] = 85] = "U";
        Key[Key["V"] = 86] = "V";
        Key[Key["W"] = 87] = "W";
        Key[Key["X"] = 88] = "X";
        Key[Key["Y"] = 89] = "Y";
        Key[Key["Z"] = 90] = "Z";
        Key[Key["D0"] = 96] = "D0";
        Key[Key["D1"] = 97] = "D1";
        Key[Key["D2"] = 98] = "D2";
        Key[Key["D3"] = 98] = "D3";
        Key[Key["D4"] = 100] = "D4";
        Key[Key["D5"] = 101] = "D5";
        Key[Key["D6"] = 102] = "D6";
        Key[Key["D7"] = 103] = "D7";
        Key[Key["D8"] = 104] = "D8";
        Key[Key["D9"] = 105] = "D9";
        Key[Key["MULTI"] = 106] = "MULTI";
        Key[Key["ADD"] = 107] = "ADD";
        Key[Key["SUB"] = 109] = "SUB";
        Key[Key["DIV"] = 111] = "DIV";
        Key[Key["DEC"] = 110] = "DEC";
        Key[Key["F1"] = 112] = "F1";
        Key[Key["F2"] = 113] = "F2";
        Key[Key["F3"] = 114] = "F3";
        Key[Key["F4"] = 115] = "F4";
        Key[Key["F5"] = 116] = "F5";
        Key[Key["F6"] = 117] = "F6";
        Key[Key["F7"] = 118] = "F7";
        Key[Key["F8"] = 119] = "F8";
        Key[Key["F9"] = 120] = "F9";
        Key[Key["F10"] = 121] = "F10";
        Key[Key["F11"] = 122] = "F11";
        Key[Key["F12"] = 123] = "F12";
    })(Key = EasySheet.Key || (EasySheet.Key = {}));
})(EasySheet || (EasySheet = {}));
//# sourceMappingURL=easy-sheet.js.map