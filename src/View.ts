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
 * @Date      2017/12/29
 * @Time      16:57
 */
/// <reference path="Wnd.ts"/>
/// <reference path="RowCtrl.ts"/>
/// <reference path="GridCtrl.ts"/>
/// <reference path="ScrollBarCtrl.ts"/>
namespace EasySheet{
    export class CView extends CWnd{
        protected _nRows:number;
        protected _nCols:number;
        protected _rowCtrl:CRowCtrl;
        protected _gridCtrl:CGridCtrl;
        protected _scrollBarCtrl:CScrollBarCtrl;
        constructor(nRows:number,nCols:number){
            super("es-view");
            this.CreateWindow("100",0,0,nCols*CELL_WIDTH,nRows*CELL_HEIGHT);
            this._nRows = nRows;
            this._nCols = nCols;
            this._gridCtrl = new CGridCtrl(this,nRows,nCols);
            this._rowCtrl = new CRowCtrl(this,nRows);
            this._scrollBarCtrl = new CScrollBarCtrl(this,"scroll-bar",CScrollBarCtrl.SBC_HORZ,120,300,200);
            this._scrollBarCtrl.SetPageSize(1000);
            this._scrollBarCtrl.SetViewSize(500);
        }
        get gridCtrl():CGridCtrl{
            return this._gridCtrl;
        }
        get rowCtrl():CRowCtrl{
            return this._rowCtrl;
        }
        ScrollX(delta:number):void{
            this._rowCtrl.ScrollX(delta);
        }
        GetRowCount():number{
            return this._nRows;
        }
        GetColCount():number{
            return this._nCols;
        }
        Draw(){
            this._gridCtrl.Draw();
            this._rowCtrl.Draw();
            //this._scrollBarCtrl.Draw();
        }
    }
}