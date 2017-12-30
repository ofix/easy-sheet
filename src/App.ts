/*
 * This file is part of EasySheet.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author    code lighter
 * @copyright https://github.com/ofix
 * @qq        981326632
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 * @Date      2017/12/22
 * @Time      10:43
 */
/// <reference path="lib/jquery.d.ts"/>
/// <reference path="View.ts"/>
/// <reference path="RowCtrl.ts"/>
/// <reference path="ColumnCtrl.ts"/>
/// <reference path="GridCtrl.ts"/>
/// <reference path="CornerCtrl.ts"/>
namespace EasySheet {
    export class CApp{
        protected _cornerCtrl:CCornerCtrl;
        protected _colCtrl:CColumnCtrl;
        protected _view:CView;
        constructor(){
            this._view = new CView(256,52);
            this._colCtrl = new CColumnCtrl(52);
            this._cornerCtrl = new CCornerCtrl();
        }
        run(){
            this._colCtrl.Draw();
            this._cornerCtrl.Draw();
            this._view.Draw();
        }
        get view():CView{
            return this._view;
        }
        get rowCtrl():CRowCtrl{
            return this._view.rowCtrl;
        }
        get gridCtrl():CGridCtrl{
            return this._view.gridCtrl;
        }
        get colCtrl():CColumnCtrl{
            return this._colCtrl;
        }
        get cornerCtrl():CCornerCtrl{
            return this._cornerCtrl;
        }
    }
}
let app:EasySheet.CApp = new EasySheet.CApp();
app.run();