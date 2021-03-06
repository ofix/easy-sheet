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
/// <reference path="Draggable.ts"/>
/// <reference path="CellRange.ts"/>
/// <reference path="Message.ts"/>
/// <reference path="EventNotifier.ts"/>
namespace EasySheet {
    import CEventNotifier = Core.CEventNotifier;
    import NM_GRID_SELECT_RANGE = Core.NM_GRID_SELECT_RANGE;
    import NM_GRID_SELECT_CELL = Core.NM_GRID_SELECT_CELL;
    import NM_COLUMN_DRAG_START = Core.NM_COLUMN_DRAG_START;
    import NM_COLUMN_DRAGGING = Core.NM_COLUMN_DRAGGING;
    import NM_COLUMN_DRAG_END = Core.NM_COLUMN_DRAG_END;
    export class CColumnCtrl extends CWnd implements IDraggable{
        protected _nCols;
        protected _cols:number[];
        protected _inDrag:boolean;
        protected _dragIndex:number;
        protected _dragStartX:number;
        protected _dragDashX:number;
        protected _bLeftMouseDown:boolean;
        protected _bRightMouseDown:boolean;
        protected _visibleRng:CCellRange;
        protected _activeRngList:CActiveCell[][];
        constructor(nCols:number){
            super("es-col-ctrl");
            let wWin = $(window).width();
            this.CreateWindow("1000",FIXED_CELL_WIDTH,0,wWin-18,CELL_HEIGHT,nCols*CELL_WIDTH,CELL_HEIGHT,true);
            this._nCols = nCols;
            this._cols = [];
            this._inDrag = false;
            this._dragIndex = -1;
            this._dragStartX = 0;
            this._dragDashX = 0;
            this._bLeftMouseDown = false;
            this._bRightMouseDown = false;
            for(let i=0; i<this._nCols; i++){
                this._cols.push(CELL_WIDTH);
            }
            this.SetVisibleCellRange();
            this._activeRngList = [];
            CEventNotifier.On(NM_GRID_SELECT_RANGE,this.OnGridSelectRange);
            CEventNotifier.On(NM_GRID_SELECT_CELL,this.OnGridSelectCell);
        }
        get visibleRng():CCellRange{
            return this._visibleRng;
        }
        OnGridSelectRange = (cellStart:CActiveCell,cellEnd:CActiveCell,bReplace:boolean):void =>{
            if(bReplace){
                this._activeRngList = [[cellStart,cellEnd]];
            }else{
                this._activeRngList.push([cellStart,cellEnd]);
            }
        };
        OnGridSelectCell = ():void =>{
            this._activeRngList = [];
        };
        OnDragStart(ptCursor:CPoint,dragIndex:number,dragStartPos:number):void{
            this._inDrag = true;
            this._dragIndex = dragIndex;
            this._dragStartX = dragStartPos;
            CEventNotifier.Trigger(NM_COLUMN_DRAG_START,this._dragDashX);
        }
        OnDragging(ptCursor:CPoint):void{
            if(ptCursor.x-2 <this._dragStartX){
                this._dragDashX = this._dragStartX+2;
            }else{
                this._dragDashX = ptCursor.x;
            }
            this._cols[this._dragIndex] = this._dragDashX - this._dragStartX;
            CEventNotifier.Trigger(NM_COLUMN_DRAGGING,this._dragDashX);
        }
        OnDragEnd(ptCursor:CPoint):void{
            if(ptCursor.x-2 <this._dragStartX){
                this._dragDashX = this._dragStartX+2;
            }else{
                this._dragDashX = ptCursor.x;
            }
            this._cols[this._dragIndex] = this._dragDashX - this._dragStartX;
            CEventNotifier.Trigger(NM_COLUMN_DRAG_END,this._dragIndex,this._cols[this._dragIndex]);
            this._inDrag = false;
            this._dragIndex = -1;
            this._dragDashX = 0;
            this.ChangeCursor("default");
        }
        OnMouseMove(ptCursor:CPoint):void{
            this.OnHitTest(ptCursor);
        }
        OnHitTest(ptCursor:CPoint):void{
            if(this._bLeftMouseDown) {
                if(this._inDrag){ //如果当前正在拖拽，需要更新拖拽的位置
                    this.OnDragging(ptCursor);
                }else {
                    if (ptCursor.y >= 0 && ptCursor.y <= this._h) {
                        let rng: CCellRange = this.visibleRng;
                        let x: number = app.view.rowOffset;
                        for (let i = rng.colStartIndex; i < rng.colEndIndex; i++) {
                            if (x+2  < ptCursor.x && (x + this._cols[i]-2) > ptCursor.x) {
                                app.view.gridState = GDS_SELECT_COLUMN;
                                app.view.activeColumn = i;
                                app.view.activeRow = -1;
                                this._activeRngList = [];
                                break;
                            }
                            if(ptCursor.x-2<x && ptCursor.x+2>x) {
                                if(!this._inDrag) {
                                    this.OnDragStart(ptCursor, i-1, x-this._cols[i-1]);
                                    break;
                                }
                            }
                            x += this._cols[i];
                        }
                    }
                }
            }else {
                if (this._inDrag) {
                    this.OnDragEnd(ptCursor);
                } else {
                    if (ptCursor.y >= 0 && ptCursor.y <= this._h) {
                        let rng: CCellRange = this.visibleRng;
                        let x = app.view.rowOffset;
                        let bHorizontalResize = false;
                        for (let i = rng.colStartIndex; i < rng.colEndIndex; i++) {
                            x += this._cols[i];
                            if(ptCursor.x-2<x && ptCursor.x+2>x) {
                                bHorizontalResize = true;
                                break;
                            }
                        }
                        if (bHorizontalResize) {
                            this.ChangeCursor("w-resize");
                        } else {
                            this.ChangeCursor("default");
                        }
                    }
                }
            }
        }
        SetVisibleCellRange():void{
            let scrollX:number = this._x-FIXED_CELL_WIDTH;
            let x:number = 0;
            let flag = true;
            let rng = new CCellRange(0,0,0,0,0,0);
            for(let i=0; i<this._nCols;i++){
                x+= this._cols[i];
                if(flag && x>= scrollX){
                    rng.colStartIndex = i;
                    if(scrollX>0) {
                        rng.xPad = scrollX - x;
                    }
                    flag = false;
                }
                if(x >= (scrollX+this.clientWidth)){
                    rng.colEndIndex = i;
                    break;
                }
            }
            this._visibleRng = rng;
        }
        OnLeftMouseDown(ptMouse:CPoint):void{
            this._bLeftMouseDown = true;
            this.OnHitTest(ptMouse);
        }
        OnLeftMouseUp(ptMouse:CPoint):void{
            this._bLeftMouseDown = false;
            if (this._inDrag) {
                this.OnDragEnd(ptMouse);
            }
        }
        OnRightMouseDown(ptMouse:CPoint):void{
            this._bRightMouseDown = true;
        }
        OnRightMouseUp(ptMouse:CPoint):void{
            this._bRightMouseDown = false;
        }
        ChangeCursor(cursor:string){
            this._canvas.style.cursor = cursor;
        }
        OnSize(wWin:number,hWin:number):void{
            this._clientW = wWin-18;
            this._clientH = CELL_HEIGHT;
            this.Draw();
        }
        getColumnName(index:number){
            let name = '';
            let i = Math.floor(index / 26);
            if ( i > 0) {
                name += this.getColumnName(i-1);
            }
            return name+String.fromCharCode(index % 26 + 65);
        }
        getColumnX(iColumn:number){
            let rng = this.visibleRng;
            let xTotal:number=app.view.rowOffset;
            if(iColumn>=rng.colStartIndex&&iColumn<=rng.colEndIndex){
                for(let i=rng.colStartIndex;i<rng.colEndIndex;i++){
                    if(i== iColumn){
                        return xTotal;
                    }
                    xTotal+=this._cols[i];
                }
            }
        }
        DrawActiveCell(iColumn:number){
            this._ctx.fillStyle = CLR_ACTIVE_COL_FILL;
            this._ctx.strokeStyle = CLR_ACTIVE_COL_BORDER;
            let x:number= this.getColumnX(iColumn);
            this._ctx.fillRect(x,this._y,this._cols[iColumn],CELL_HEIGHT);
            this._ctx.moveTo(x,this._y);
            this._ctx.lineTo(x,this._y+CELL_HEIGHT);
            this._ctx.lineTo(x+this._cols[iColumn],this._y+CELL_HEIGHT);
            this._ctx.lineTo(x+this._cols[iColumn],this._y);
            let name:string= this.getColumnName(iColumn);
            this._ctx.fillStyle = CLR_BAR_TEXT;
            this._ctx.fillText(name,x+this._cols[iColumn]/2, CELL_HEIGHT/2);
        }
        Draw(){
            let wTotal:number=app.view.rowOffset;
            let rng = this.visibleRng;
            this._ctx.save();
            this._ctx.translate(0.5,0.5);
            this._ctx.fillStyle=CLR_BAR_FILL;
            this._ctx.beginPath();
            this._ctx.fillRect(this._x,this._y,this.clientWidth,this.clientHeight);
            this._ctx.closePath();

            this._ctx.font = DEFAULT_FONT_SIZE + 'px '+"Arial";
            this._ctx.textBaseline = "middle";
            this._ctx.textAlign = 'center';
            this._ctx.strokeStyle=CLR_BAR_SEP;
            this._ctx.fillStyle=CLR_BAR_TEXT;
            let activeCol:number= app.gridCtrl.activeColumn;
            for(let i= rng.colStartIndex;i<rng.colEndIndex;i++){
                let name:string = this.getColumnName(i);
                if(i!=activeCol) {
                    this._ctx.fillText(name, wTotal + this._cols[i]/ 2, CELL_HEIGHT / 2);
                }
                wTotal+=this._cols[i];
                this._ctx.moveTo(wTotal,0);
                this._ctx.lineTo(wTotal,CELL_HEIGHT);
            }
            this._ctx.strokeStyle = CLR_BAR_SEP;
            this._ctx.moveTo(this._x,this._h-1);
            this._ctx.lineTo(this._x+this.clientWidth-18,this._h-1);
            this._ctx.stroke();

            // draw active column
            this.DrawActiveCell(activeCol);
            // draw active range list
            for(let i=0,len=this._activeRngList.length; i<len;i++){
                let rng:CActiveCell[] = this._activeRngList[i];
                let iColStart:number = Math.min(rng[0].iCol,rng[1].iCol);
                let iColEnd:number = Math.max(rng[0].iCol,rng[1].iCol);
                if(iColStart >=0 && iColEnd>=0) {
                    for (let j = iColStart; j <= iColEnd; j++) {
                        this.DrawActiveCell(j);
                    }
                }
            }
            this._ctx.restore();
        }
    }
}