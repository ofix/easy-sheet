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