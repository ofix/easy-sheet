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
        protected _xScrollBar:CScrollBarCtrl;
        protected _yScrollBar:CScrollBarCtrl;
        protected _scrollX:number;
        protected _scrollY:number;
        constructor(nRows:number,nCols:number){
            super("es-view");
            let clientW = $(window).width();
            let clientH = $(window).height();
            this.CreateWindow("100",0,0,clientW,clientH,nCols*CELL_WIDTH,nRows*CELL_HEIGHT);
            this._nRows = nRows;
            this._nCols = nCols;
            this._scrollX = 0;
            this._scrollY = 0;
            this._gridCtrl = new CGridCtrl(this,nRows,nCols);
            this._rowCtrl = new CRowCtrl(this,nRows);
            this._xScrollBar = new CScrollBarCtrl(this,"horizontal-scroll-bar",CScrollBarCtrl.SBC_HORZ);
            this._xScrollBar.SetPageSize(1000);
            this._xScrollBar.SetViewSize(500);
            this._yScrollBar = new CScrollBarCtrl(this,"vertical-scroll-bar",CScrollBarCtrl.SBC_VERT);
            this._yScrollBar.SetPageSize(1000);
            this._yScrollBar.SetViewSize(500);
        }
        get gridCtrl():CGridCtrl{
            return this._gridCtrl;
        }
        get rowCtrl():CRowCtrl{
            return this._rowCtrl;
        }
        ScrollWindow(scrollX:number,scrollY:number):void{
            this.ScrollX(scrollX);
            this.ScrollY(scrollY);
        }
        ScrollX(scrollX:number):void{
            if(this._scrollX != scrollX) {
                let delta:number = scrollX - this._scrollX;
                this._scrollX = scrollX;
                this._rowCtrl.ScrollX(scrollX);
                this._gridCtrl.ScrollWindow(delta,0);
            }
        }
        ScrollY(scrollY:number):void{
            if(this._scrollY != scrollY){
                this._scrollY = scrollY;
            }
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
            this._xScrollBar.Draw();
            this._yScrollBar.Draw();
        }
    }
}