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
var EasySheet;
(function (EasySheet) {
    var CDraggable = (function () {
        function CDraggable() {
            this.inDrag = false;
        }
        return CDraggable;
    }());
    EasySheet.CDraggable = CDraggable;
})(EasySheet || (EasySheet = {}));
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
        function CWnd(name, zIndex, x, y, width, height, bFixed) {
            if (bFixed === void 0) { bFixed = false; }
            this.x = x;
            this.y = y;
            this.w = width;
            this.h = height;
            this._name = name;
            this.zIndex = zIndex;
            this.bFixed = bFixed;
            this.createCanvas();
        }
        Object.defineProperty(CWnd.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWnd.prototype, "visualHeight", {
            get: function () {
                return this.div.clientHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWnd.prototype, "contentHeight", {
            get: function () {
                return this.h;
            },
            enumerable: true,
            configurable: true
        });
        CWnd.prototype.createCanvas = function () {
            this.div = document.createElement('div');
            this.div.id = 'div-' + this.name;
            this.div.style.position = this.bFixed ? "fixed" : "absolute";
            this.div.style.left = this.x + "px";
            this.div.style.top = this.y + "px";
            this.div.style.zIndex = this.zIndex;
            this.canvas = document.createElement('canvas');
            this.canvas.id = this.name;
            this.canvas.style.position = "relative";
            this.canvas.style.left = "0px";
            this.canvas.style.top = "0px";
            this.canvas.width = this.w;
            this.canvas.height = this.h;
            this.div.appendChild(this.canvas);
            document.body.appendChild(this.div);
            EasySheet.CWndManager.instance().registerWnd(this);
            this.render2D = this.canvas.getContext("2d");
            this.render2D.translate(0.5, 0.5);
        };
        Object.defineProperty(CWnd.prototype, "context", {
            get: function () {
                return this.render2D;
            },
            enumerable: true,
            configurable: true
        });
        return CWnd;
    }());
    EasySheet.CWnd = CWnd;
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
var TOP_BAR_CELL_WIDTH = 72;
var LEFT_BAR_CELL_WIDTH = 34;
var BAR_CELL_HEIGHT = 20;
var MODE_NORMAL = 0;
var MODE_IN_EDIT = 1;
var MODE_IN_DRAG = 2;
var MODE_IN_SELECT = 3;
var INSERT_TEXT = 0;
var INSERT_IMAGE = 1;
var DEFAULT_CELL_PADDING = 2;
var EasySheet;
(function (EasySheet) {
    var CWndLeftBar = (function (_super) {
        __extends(CWndLeftBar, _super);
        function CWndLeftBar(maxRow) {
            if (maxRow === void 0) { maxRow = 100; }
            var _this = _super.call(this) || this;
            _this._x = 0;
            _this._y = 0;
            _this.nRows = maxRow;
            _this.rows = [];
            _this.wnd = new EasySheet.CWnd("wnd-left-bar", "990", 0, 0, LEFT_BAR_CELL_WIDTH, BAR_CELL_HEIGHT * _this.nRows, true);
            _this.ctx = _this.wnd.context;
            _this.yScrollDelta = 0;
            for (var i = 0; i < _this.nRows; i++) {
                _this.rows.push(BAR_CELL_HEIGHT);
            }
            return _this;
        }
        Object.defineProperty(CWndLeftBar.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CWndLeftBar.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        CWndLeftBar.prototype.onDragStart = function (ptCursor) {
            this.inDrag = true;
        };
        CWndLeftBar.prototype.onDragging = function (ptCursor) {
        };
        CWndLeftBar.prototype.onDragEnd = function (ptCursor) {
            this.inDrag = false;
        };
        CWndLeftBar.prototype.scrollY = function (delta) {
            this.yScrollDelta = delta * 53;
            this._y += this.yScrollDelta;
            if (this._y > 0) {
                this._y = 0;
                this.yScrollDelta = 0;
            }
            if (this._y < (this.wnd.visualHeight - this.wnd.contentHeight)) {
                this._y = this.wnd.visualHeight - this.wnd.contentHeight;
                this.yScrollDelta = 0;
            }
            this.draw();
        };
        CWndLeftBar.prototype.draw = function () {
            var _this = this;
            var hTotal = 0;
            this.ctx.translate(0, this.yScrollDelta);
            this.ctx.save();
            this.ctx.fillStyle = CLR_BAR_FILL;
            this.ctx.fillRect(0, 0, LEFT_BAR_CELL_WIDTH, BAR_CELL_HEIGHT * this.nRows);
            this.ctx.fillStyle = CLR_BAR_TEXT;
            this.ctx.strokeStyle = CLR_BAR_SEP;
            this.ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            this.rows.forEach(function (v, i) {
                if (i > 0) {
                    var name_1 = "" + i;
                    _this.ctx.fillText(name_1, LEFT_BAR_CELL_WIDTH / 2, hTotal + BAR_CELL_HEIGHT / 2);
                }
                hTotal += v;
                _this.ctx.beginPath();
                _this.ctx.moveTo(0, hTotal);
                _this.ctx.lineTo(LEFT_BAR_CELL_WIDTH, hTotal);
                _this.ctx.stroke();
            });
            this.ctx.restore();
        };
        CWndLeftBar.prototype.drawDragLine = function () {
        };
        return CWndLeftBar;
    }(EasySheet.CDraggable));
    EasySheet.CWndLeftBar = CWndLeftBar;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CWndTopBar = (function (_super) {
        __extends(CWndTopBar, _super);
        function CWndTopBar(nCols) {
            var _this = _super.call(this) || this;
            _this.nCols = nCols;
            _this.cols = [];
            _this.wnd = new EasySheet.CWnd("wnd-top-bar", "1000", 0, 0, TOP_BAR_CELL_WIDTH * _this.nCols, BAR_CELL_HEIGHT, true);
            _this.ctx = _this.wnd.context;
            for (var i = 0; i < _this.nCols; i++) {
                _this.cols.push(TOP_BAR_CELL_WIDTH);
            }
            return _this;
        }
        CWndTopBar.prototype.onDragStart = function (ptCursor) {
            this.inDrag = true;
        };
        CWndTopBar.prototype.onDragging = function (ptCursor) {
        };
        CWndTopBar.prototype.onDragEnd = function (ptCursor) {
            this.inDrag = false;
        };
        CWndTopBar.prototype.getColName = function (index) {
            var name = '';
            var i = Math.floor(index / 26);
            if (i > 0) {
                name += this.getColName(i - 1);
            }
            return name + String.fromCharCode(index % 26 + 65);
        };
        CWndTopBar.prototype.draw = function () {
            var _this = this;
            var wTotal = LEFT_BAR_CELL_WIDTH;
            this.cols.forEach(function (v, i) {
                _this.ctx.save();
                var name = _this.getColName(i);
                _this.ctx.fillStyle = CLR_BAR_FILL;
                _this.ctx.fillRect(wTotal, 0, v, BAR_CELL_HEIGHT);
                _this.ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                _this.ctx.textBaseline = "middle";
                _this.ctx.textAlign = 'center';
                _this.ctx.fillStyle = CLR_BAR_TEXT;
                _this.ctx.fillText(name, wTotal + v / 2, BAR_CELL_HEIGHT / 2);
                wTotal += v;
                _this.ctx.strokeStyle = CLR_BAR_SEP;
                _this.ctx.moveTo(wTotal, 0);
                _this.ctx.lineTo(wTotal, BAR_CELL_HEIGHT);
                _this.ctx.stroke();
                _this.ctx.restore();
            });
        };
        return CWndTopBar;
    }(EasySheet.CDraggable));
    EasySheet.CWndTopBar = CWndTopBar;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CWndCorner = (function () {
        function CWndCorner(width, height) {
            this.x = 0;
            this.y = 0;
            this.w = width;
            this.h = height;
            this.wnd = new EasySheet.CWnd("wnd-corner", "2999", 0, 0, LEFT_BAR_CELL_WIDTH, BAR_CELL_HEIGHT, true);
            this.ctx = this.wnd.context;
        }
        CWndCorner.prototype.draw = function () {
            var ctx = this.ctx;
            ;
            ctx.save();
            ctx.strokeStyle = CLR_BAR_SEP;
            ctx.moveTo(this.w, 0);
            ctx.lineTo(this.w, this.h);
            ctx.lineTo(0, this.h);
            ctx.stroke();
            ctx.restore();
        };
        return CWndCorner;
    }());
    EasySheet.CWndCorner = CWndCorner;
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
    var CWndData = (function (_super) {
        __extends(CWndData, _super);
        function CWndData(nRows, nCols) {
            var _this = _super.call(this) || this;
            _this.x = LEFT_BAR_CELL_WIDTH;
            _this.y = BAR_CELL_HEIGHT;
            _this.nRows = nRows;
            _this.nCols = nCols;
            _this.rows = [];
            _this.cols = [];
            _this.wnd = new EasySheet.CWnd("wnd-data", "100", LEFT_BAR_CELL_WIDTH, BAR_CELL_HEIGHT, 5000, 9000);
            _this.ctx = _this.wnd.context;
            return _this;
        }
        CWndData.prototype.onDragStart = function (ptCursor) {
            this.inDrag = true;
        };
        CWndData.prototype.onDragging = function (ptCursor) {
        };
        CWndData.prototype.onDragEnd = function (ptCursor) {
            this.inDrag = false;
        };
        CWndData.prototype.getItemXY = function (iRow, iCol) {
            var pt = new CPoint();
            pt.x = iCol * TOP_BAR_CELL_WIDTH;
            pt.y = iRow * BAR_CELL_HEIGHT;
            return pt;
        };
        CWndData.prototype.draw = function () {
            var ctx = this.ctx;
            for (var i = 0; i < this.nRows; i++) {
                for (var j = 0; j < this.nCols; j++) {
                    ctx.save();
                    var xy = this.getItemXY(i, j);
                    ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#000";
                    ctx.fillText("" + i + j, xy.x + TOP_BAR_CELL_WIDTH / 2, xy.y + BAR_CELL_HEIGHT / 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        };
        return CWndData;
    }(EasySheet.CDraggable));
    EasySheet.CWndData = CWndData;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CTable = (function () {
        function CTable(nRow, nCol) {
            this.nRow = nRow;
            this.nCol = nCol;
            this.leftBar = new EasySheet.CWndLeftBar(nRow);
            this.topBar = new EasySheet.CWndTopBar(nCol);
            this.corner = new EasySheet.CWndCorner(LEFT_BAR_CELL_WIDTH, BAR_CELL_HEIGHT);
            this.data = new EasySheet.CWndData(nRow, nCol);
        }
        Object.defineProperty(CTable.prototype, "wndLeftBar", {
            get: function () {
                return this.leftBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CTable.prototype, "wndCorner", {
            get: function () {
                return this.corner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CTable.prototype, "wndTopBar", {
            get: function () {
                return this.topBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CTable.prototype, "wndData", {
            get: function () {
                return this.data;
            },
            enumerable: true,
            configurable: true
        });
        CTable.prototype.draw = function () {
            this.leftBar.draw();
            this.topBar.draw();
            this.corner.draw();
            this.data.draw();
        };
        return CTable;
    }());
    EasySheet.CTable = CTable;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CApp = (function () {
        function CApp() {
            this.table = new EasySheet.CTable(1000, 52);
        }
        CApp.prototype.run = function () {
            this.table.draw();
            EasySheet.CWndManager.instance().print();
        };
        Object.defineProperty(CApp.prototype, "wndLeftBar", {
            get: function () {
                return this.table.wndLeftBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CApp.prototype, "wndTopBar", {
            get: function () {
                return this.table.wndTopBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CApp.prototype, "wndCorner", {
            get: function () {
                return this.table.wndCorner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CApp.prototype, "wndData", {
            get: function () {
                return this.table.wndData;
            },
            enumerable: true,
            configurable: true
        });
        return CApp;
    }());
    EasySheet.CApp = CApp;
})(EasySheet || (EasySheet = {}));
var ctx;
var app = new EasySheet.CApp();
app.run();
var EasySheet;
(function (EasySheet) {
    var CCanvas = (function () {
        function CCanvas(id, width, height) {
            this.id = id;
            this.width = width;
            this.height = height;
        }
        CCanvas.prototype.getRender2D = function () {
            return this.render2D;
        };
        CCanvas.prototype.createCanvas = function (width, height) {
            this.canvas = document.getElementById(this.id);
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
        };
        CCanvas.prototype.clear = function () {
            this.render2D.fillStyle = "#FFF";
            this.render2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
        CCanvas.prototype.bootstrap = function () {
            this.createCanvas(this.width, this.height);
            this.render2D = this.canvas.getContext("2d");
            this.clear();
            ctx = this.render2D;
        };
        return CCanvas;
    }());
    EasySheet.CCanvas = CCanvas;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CEdit = (function () {
        function CEdit() {
        }
        return CEdit;
    }());
    EasySheet.CEdit = CEdit;
})(EasySheet || (EasySheet = {}));
$(function () {
    $("#wnd-left-bar").bind("mousewheel DOMMouseScroll", function (event, delta, deltaX, deltaY) {
        app.wndLeftBar.scrollY(deltaY);
    });
    $(document).on("scroll", "#wnd-data", function () {
        console.log("我在滚动 wnd-data!");
    });
    $(document).on('click', '#wnd-left-bar', function () {
        console.log("wozai 单击");
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