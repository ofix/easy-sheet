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
        function CCell(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 24; }
            if (height === void 0) { height = 10; }
            this.CELL_NORMAL = 1;
            this.CELL_TOP = 2;
            this.CELL_LEFT = 3;
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
            this.content = '';
        }
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
            return this.content;
        };
        CCell.prototype.setContent = function (text) {
            this.content = text;
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
var EasySheet;
(function (EasySheet) {
    var CLeftCell = (function (_super) {
        __extends(CLeftCell, _super);
        function CLeftCell(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 24; }
            if (height === void 0) { height = 10; }
            var _this = _super.call(this, x, y, width, height) || this;
            _this.type = _this.CELL_LEFT;
            return _this;
        }
        return CLeftCell;
    }(EasySheet.CCell));
    EasySheet.CLeftCell = CLeftCell;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CSheet = (function () {
        function CSheet(appId) {
            this.appId = appId;
            var $app = $('#' + appId);
            var width = $app.width();
            var height = $app.height();
        }
        CSheet.prototype.draw = function () {
        };
        CSheet.prototype.drawTopBar = function () {
        };
        CSheet.prototype.drawLeftBar = function () {
        };
        return CSheet;
    }());
    EasySheet.CSheet = CSheet;
})(EasySheet || (EasySheet = {}));
var currentSheet = new EasySheet.CSheet('#easy-sheet');
currentSheet.draw();
var EasySheet;
(function (EasySheet) {
    var CTable = (function () {
        function CTable(nRow, nCol) {
            this.DEFAULT_ROWS = 1000;
            this.DEFAULT_COLS = 52;
            this.nRow = nRow;
            this.nCol = nCol;
        }
        return CTable;
    }());
    EasySheet.CTable = CTable;
})(EasySheet || (EasySheet = {}));
var EasySheet;
(function (EasySheet) {
    var CTopCell = (function (_super) {
        __extends(CTopCell, _super);
        function CTopCell(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 24; }
            if (height === void 0) { height = 10; }
            var _this = _super.call(this, x, y, width, height) || this;
            _this.type = _this.CELL_TOP;
            return _this;
        }
        return CTopCell;
    }(EasySheet.CCell));
    EasySheet.CTopCell = CTopCell;
})(EasySheet || (EasySheet = {}));
//# sourceMappingURL=easy-sheet.js.map