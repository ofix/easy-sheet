var EasySheet;
(function (EasySheet) {
    var CCell = (function () {
        function CCell(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 24; }
            if (height === void 0) { height = 10; }
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
    var CApplication = (function () {
        function CApplication(appId) {
            this.appId = appId;
            var $app = $('#' + appId);
            var width = $app.width();
            var height = $app.height();
        }
        CApplication.prototype.run = function () {
            console.log("runApp");
        };
        return CApplication;
    }());
    EasySheet.CApplication = CApplication;
})(EasySheet || (EasySheet = {}));
var theApp = new EasySheet.CApplication('#easy-sheet');
theApp.run();
//# sourceMappingURL=easy-sheet.js.map