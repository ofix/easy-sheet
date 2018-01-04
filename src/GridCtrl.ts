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
 * @Date      2017/12/28
 * @Time      09:20
 */
/// <reference path="Cell.ts"/>
/// <reference path="Draggable.ts"/>
/// <reference path="Wnd.ts"/>
/// <reference path="Const.ts"/>
/// <reference path="Point.ts"/>
/// <reference path="CellRange.ts"/>
namespace EasySheet{
    export class CGridCtrl implements IDraggable{
        protected _x:number;
        protected _y:number;
        protected _w:number;
        protected _h:number;
        protected _nRows:number;
        protected _nCols:number;
        protected _rows:any[];
        protected _cols:any[];
        protected _inDrag:boolean;
        protected _parent:CView;
        protected _scrollX:number;
        protected _scrollY:number;
        protected _cacheExist:boolean;
        protected _ctx:CanvasRenderingContext2D;
        protected _cacheCanvas:HTMLCanvasElement;
        protected _cacheCtx:CanvasRenderingContext2D;
        protected _canvasList:any[];
        protected _visibleCellRange:CCellRange;
        protected _activeRow;
        protected _activeCol;
        constructor(parentWnd:CView,nRows:number,nCols:number){
            this._parent = parentWnd;
            this._nRows = nRows;
            this._nCols = nCols;
            this._scrollX = 0;
            this._scrollY = 0;
            this._x = 0;
            this._y = 0;
            this._w = parentWnd.clientWidth;
            this._h = parentWnd.clientHeight;
            this._rows = [];
            this._cols = [];
            this._canvasList = [];
            this._cacheExist = false;
            for(let i=0; i<nRows;i++){
                this._rows.push(CELL_HEIGHT);
            }
            for(let j=0; j<nCols;j++){
                this._cols.push(CELL_WIDTH);
            }
            this._visibleCellRange = new CCellRange(0,nRows,0,nCols,0,0);
            this._activeRow = -1;
            this._activeCol = -1;
            this._ctx = this._parent.context;
            this.CreateCacheCtx();
            this.makeCanvasList();
        }
        get colOffset():number{
            return this._parent.colOffset;
        }
        get rowOffset():number{
            return this._parent.rowOffset;
        }
        get clientWidth():number{
            return this._parent.clientWidth;
        }
        get clientHeight():number{
            return this._parent.clientHeight;
        }
        makeCanvasList():void{
            // console.log("make-list 1 ",now());
            // for(let i=0; i<1000;i++) {
            //     let canvas: HTMLCanvasElement;
            //     let ctx: CanvasRenderingContext2D;
            //     canvas = document.createElement("canvas");
            //     canvas.width = this._w;
            //     canvas.height = this._h;
            //     ctx = canvas.getContext("2d");
            //     this._canvasList.push(canvas);
            //     this._canvasList.push(ctx);
            // }
            // console.log("canvas_list = ",this._canvasList.length);
            // console.log("make-list 2 ",now());
        }
        CreateCacheCtx():void{
            this._cacheCanvas = document.createElement("canvas");
            this._cacheCanvas.width = this._w;
            this._cacheCanvas.height = this._h;
            this._cacheCtx = this._cacheCanvas.getContext("2d");
        }
        OnDragStart(ptCursor:CPoint):void{
            this._inDrag = true;
        }
        OnDragging(ptCursor:CPoint):void{

        }
        OnDragEnd(ptCursor:CPoint):void{
            this._inDrag = false;
        }
        OnMouseMove(ptCursor:CPoint):void{

        }
        OnLeftMouseDown(ptMouse:CPoint):void{
            let pos:number[] = this.GetCellPos(ptMouse);
            this._activeRow = pos[0];
            this._activeCol = pos[1];
            this.Draw();
        }
        OnLeftMouseUp(ptMouse:CPoint):void{

        }
        OnRightMouseDown(ptMouse:CPoint):void{

        }
        OnRightMouseUp(ptMouse:CPoint):void{

        }
        GetRowWidth():number{
            return this._w;
        }
        GetColHeight():number{
            return this._h;
        }
        GetCellPos(ptCursor:CPoint):number[]{
            for(let i= this._visibleCellRange.rowStartIndex;i<this._visibleCellRange.rowEndIndex;i++){
                for(let j=this._visibleCellRange.colStartIndex;j<this._visibleCellRange.colEndIndex;j++){
                    let pt = this.GetItemXY(i,j);
                    let w = this._cols[j];
                    let h = this._rows[i];
                    if(IsPtInRect(ptCursor,pt.x,pt.y,w,h)){
                        return [i,j];
                    }
                }
            }
        }
        SetItemText(iRow:number,iCol:number,text:string):void{

        }
        GetItemXY(iRow:number,iCol:number):CPoint{
            let pt = new CPoint(this.rowOffset,this.colOffset);
            for(let i=0; i<iCol;i++){
                pt.x += this._cols[i];
            }
            for(let j=0; j<iRow; j++){
                pt.y += this._rows[j];
            }
            return pt;
        }
        //利用图片函数滚动窗口
        ScrollWindow(deltaX:number,deltaY:number):void{
            this._scrollX = this._scrollX+deltaX;
            this._scrollY = this._scrollY+deltaY;
            if((deltaX>0) || ((deltaY>0) && (deltaY<this.clientHeight))) {
                this.Draw();
            }
        }
        GetVisibleCellRange():CCellRange{
            let xOffset:number = this._scrollX;
            let yOffset:number = this._scrollY;
            let x:number =0;
            let y:number =0;
            let flagX = true;
            let flagY = true;
            let rng = new CCellRange(0,0,0,0,0,0);
            for(let i=0; i<this._nRows;i++){
                x+= this._rows[i];
                if(flagX && x>= xOffset){
                    rng.rowStartIndex = i;
                    if(xOffset >0) {
                        rng.xPad = xOffset - x;
                    }
                    flagX = false;
                }
                if(x >=(xOffset+this.clientHeight)){
                    rng.rowEndIndex = i;
                    break;
                }
            }

            for(let j=0; j<this._nCols;j++){
                y+=this._cols[j];
                if(flagY && y>=yOffset){
                    rng.colStartIndex = j;
                    if(yOffset>0) {
                        rng.yPad = yOffset - y;
                    }
                    flagY = false;
                }
                if(y>=(yOffset+this.clientWidth)){
                    rng.colEndIndex = j;
                    break;
                }
            }
            this._visibleCellRange = rng;
            return rng;
        }
        DrawVisibleCellRange(rng:CCellRange):void{
            let x:number = rng.xPad+this.rowOffset;
            let y:number = rng.yPad+this.colOffset;
            this._ctx.save();
            this._ctx.translate(rng.xPad+0.5,rng.yPad+0.5);
            // Fill Background
            this._ctx.fillStyle = "#FFF";
            this._ctx.fillRect(0,0,this.clientWidth,this.clientHeight);
            this._ctx.strokeStyle = "#C5C5C5";
            // Draw Row Lines
            this._ctx.beginPath();
            for(let i=rng.rowStartIndex; i<rng.rowEndIndex;i++){
                this._ctx.moveTo(x,y+this._rows[i]);
                this._ctx.lineTo(x+this.clientWidth,y+this._rows[i]);
                y += this._rows[i];
            }
            // Draw Column Lines
            for(let j=rng.colStartIndex;j<rng.colEndIndex;j++){
                this._ctx.moveTo(x+this._cols[j],0);
                this._ctx.lineTo(x+this._cols[j],this.clientHeight);
                x += this._cols[j];
            }
            this._ctx.stroke();
            // Draw Grid Cells
            this._ctx.font = DEFAULT_FONT_SIZE + 'px ' + "Arial";
            this._ctx.textBaseline="middle";
            this._ctx.textAlign = "center";
            this._ctx.fillStyle = "#000";
            for(let i=rng.rowStartIndex; i<rng.rowEndIndex; i++){
                for(let j=rng.colStartIndex; j<rng.colEndIndex; j++){
                    let pt = this.GetItemXY(i,j);
                    this._ctx.fillText(i + j+"", pt.x + CELL_WIDTH / 2, pt.y + CELL_HEIGHT / 2);
                }
            }
            // Draw Active Cell
            if(this._activeRow != -1 && this._activeCol != -1){
                let pt = this.GetItemXY(this._activeRow,this._activeCol);
                let w = this._cols[this._activeCol];
                let h = this._rows[this._activeRow];
                this._ctx.strokeStyle = CLR_ACTIVE_CELL;
                this._ctx.lineWidth = 3;
                this._ctx.strokeRect(pt.x,pt.y,w,h);
            }
            this._ctx.restore();
        }
        Draw():void{
            let rng:CCellRange = this.GetVisibleCellRange();
            this.DrawVisibleCellRange(rng);
        }
    }
}