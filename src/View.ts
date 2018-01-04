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
        protected _colOffset:number;
        protected _rowOffset:number;
        protected _nRows:number;
        protected _nCols:number;
        protected _gridCtrl:CGridCtrl;
        protected _rowCtrl:CRowCtrl;
        protected _colCtrl:CColumnCtrl;
        protected _cornerCtrl:CCornerCtrl;
        protected _xScrollBar:CScrollBarCtrl;
        protected _yScrollBar:CScrollBarCtrl;
        protected _scrollX:number;
        protected _scrollY:number;
        protected _bSelectedRow:boolean;
        protected _iSelectedRow:number;
        protected _bSelectedCol:boolean;
        protected _iSelectedCol:number;
        constructor(nRows:number,nCols:number){
            super("es-view");
            let wWin = $(window).width();
            let hWin = $(window).height();
            this.CreateWindow("100",0,0,wWin,hWin,nCols*CELL_WIDTH,nRows*CELL_HEIGHT);
            this._nRows = nRows;
            this._nCols = nCols;
            this._scrollX = 0;
            this._scrollY = 0;
            this._bSelectedRow = false;
            this._iSelectedRow = -1;
            this._bSelectedCol = false;
            this._iSelectedCol = -1;
            this._rowOffset = FIXED_CELL_WIDTH;
            this._colOffset = CELL_HEIGHT;
            this._gridCtrl = new CGridCtrl(this,nRows,nCols);
            this._rowCtrl = new CRowCtrl(this,nRows);
            this._colCtrl = new CColumnCtrl(52);
            this._cornerCtrl = new CCornerCtrl();
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
        get colCtrl():CColumnCtrl{
            return this._colCtrl;
        }
        get cornerCtrl():CCornerCtrl{
            return this._cornerCtrl;
        }
        get colOffset():number{
            return this._colOffset;
        }
        get rowOffset():number{
            return this._rowOffset;
        }
        set selectedRowIndex(iSelectedRow:number){
            this._iSelectedRow = iSelectedRow;
        }
        get selectedRowIndex():number{
            return this._iSelectedRow;
        }
        set isRowSelected(bSelected:boolean){
            this._bSelectedRow = bSelected;
        }
        get isRowSelected():boolean{
            return this._bSelectedRow;
        }
        set selectedColIndex(iSelectedCol:number){
            this._iSelectedCol = iSelectedCol;
        }
        get selectedColIndex():number{
            return this._iSelectedCol;
        }
        set isColSelected(bSelected:boolean){
            this._bSelectedCol = bSelected;
        }
        get isColSelected():boolean{
            return this._bSelectedCol;
        }
        OnSize(wWin:number,hWin:number):void{
            this._clientW = wWin;
            this._clientH = hWin;
            this._canvas.width = wWin;
            this._canvas.height = hWin;
            this._canvas.style.width = this._clientW+"px";
            this._canvas.style.height = this._clientH+"px";
            this._rowCtrl.OnSize(wWin,hWin);
            this._colCtrl.OnSize(wWin,hWin);
            this._xScrollBar.OnSize(wWin,hWin);
            this._yScrollBar.OnSize(wWin,hWin);
            this.Draw();
        }
        ChangeCursor(cursor:string):void{
            this._canvas.style.cursor = cursor;
        }
        OnKeyDirLeft():void{
            this._gridCtrl.OnKeyDirLeft();
            this.Draw();
        }
        OnKeyDirRight():void{
            this._gridCtrl.OnKeyDirRight();
            this.Draw();
        }
        OnKeyDirUp():void{
            this._gridCtrl.OnKeyDirUp();
            this.Draw();
        }
        OnKeyDirDown():void{
            this._gridCtrl.OnKeyDirDown();
            this.Draw();
        }
        OnMouseMove(ptCursor:CPoint):void{
            this._gridCtrl.OnMouseMove(ptCursor);
            this._rowCtrl.OnMouseMove(ptCursor);
            this._colCtrl.OnMouseMove(ptCursor);
        }
        OnLeftMouseDown(ptMouse:CPoint):void{
            this._gridCtrl.OnLeftMouseDown(ptMouse);
            this._rowCtrl.OnLeftMouseDown(ptMouse);
            this._colCtrl.OnLeftMouseDown(ptMouse);
            this.Draw();
        }
        OnLeftMouseUp(ptMouse:CPoint):void{
            this._gridCtrl.OnLeftMouseUp(ptMouse);
            this._rowCtrl.OnLeftMouseUp(ptMouse);
            this._colCtrl.OnLeftMouseUp(ptMouse);
            this.Draw();
        }
        OnRightMouseDown(ptMouse:CPoint):void{
            this._gridCtrl.OnRightMouseDown(ptMouse);
            this._rowCtrl.OnRightMouseDown(ptMouse);
            this._colCtrl.OnRightMouseDown(ptMouse);
            this.Draw();
        }
        OnRightMouseUp(ptMouse:CPoint):void{
            this._gridCtrl.OnRightMouseUp(ptMouse);
            this._rowCtrl.OnRightMouseUp(ptMouse);
            this._colCtrl.OnRightMouseUp(ptMouse);
            this.Draw();
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
            this._colCtrl.Draw();
            this._cornerCtrl.Draw();
        }
    }
}