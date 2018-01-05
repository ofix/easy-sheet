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
namespace EasySheet {
    export class CColumnCtrl extends CWnd implements IDraggable{
        protected _nCols;
        protected _cols:number[];
        protected _inDrag:boolean;
        protected _bLeftMouseDown:boolean;
        protected _bRightMouseDown:boolean;
        protected _visibleRng:CCellRange;
        constructor(nCols:number){
            super("es-col-ctrl");
            let wWin = $(window).width();
            this.CreateWindow("1000",FIXED_CELL_WIDTH,0,wWin-18,CELL_HEIGHT,nCols*CELL_WIDTH,CELL_HEIGHT,true);
            this._nCols = nCols;
            this._cols = [];
            this._bLeftMouseDown = false;
            this._bRightMouseDown = false;
            for(let i=0; i<this._nCols; i++){
                this._cols.push(CELL_WIDTH);
            }
            this.SetVisibleCellRange();
        }
        get visibleRng():CCellRange{
            return this._visibleRng;
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
            this.OnHitTest(ptCursor);
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
        }
        OnRightMouseDown(ptMouse:CPoint):void{
            this._bRightMouseDown = true;
        }
        OnRightMouseUp(ptMouse:CPoint):void{
            this._bRightMouseDown = false;
        }
        OnHitTest(ptCursor:CPoint):void{
            if(!this._bLeftMouseDown) {
                if(ptCursor.y >=0 && ptCursor.y <= this._h){
                    let rng: CCellRange = this.visibleRng;
                    let x = app.view.rowOffset;
                    let bHorizontalResize = false;
                    for (let i = rng.colStartIndex; i < rng.colEndIndex; i++) {
                        x += this._cols[i];
                        if(x-2 <= ptCursor.x && x+2 >= ptCursor.x){
                            bHorizontalResize = true;
                            break;
                        }
                    }
                    if(bHorizontalResize){
                        this.ChangeCursor("w-resize");
                    }else{
                        this.ChangeCursor("default");
                    }
                }
            }else{
                if(ptCursor.y >=0 && ptCursor.y <= this._h) {
                    let rng:CCellRange = this.visibleRng;
                    let x:number = app.view.rowOffset;
                    for(let i = rng.colStartIndex; i<rng.colEndIndex;i++){
                        if(x+2 < ptCursor.x && (x+this._cols[i]-2) >ptCursor.x){
                            app.view.gridState = GDS_SELECT_COLUMN;
                            app.view.activeColumn = i;
                            app.view.activeRow = -1;
                            break;
                        }
                        x+=this._cols[i];
                    }
                }
            }
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
        Draw(){
            let wTotal:number=app.view.rowOffset;
            let rng = this.visibleRng;
            this._ctx.save();
            this._ctx.translate(0.5,0.5);
            this._ctx.fillStyle=CLR_BAR_FILL;
            this._ctx.fillRect(this._x,this._y,this.clientWidth,this.clientHeight);

            this._ctx.font = DEFAULT_FONT_SIZE + 'px '+"Arial";
            this._ctx.textBaseline = "middle";
            this._ctx.textAlign = 'center';
            this._ctx.strokeStyle=CLR_BAR_SEP;
            this._ctx.fillStyle=CLR_BAR_TEXT;
            let activeX:number=0;
            let activeCol:number= app.gridCtrl.activeColumn;
            for(let i= rng.colStartIndex;i<rng.colEndIndex;i++){
                let name:string = this.getColumnName(i);
                if(i!=activeCol) {
                    this._ctx.fillText(name, wTotal + this._cols[i]/ 2, CELL_HEIGHT / 2);
                }
                if(i==activeCol){
                    activeX = wTotal;
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
            this._ctx.fillStyle = CLR_ACTIVE_COL_FILL;
            this._ctx.strokeStyle = CLR_ACTIVE_COL_BORDER;
            this._ctx.fillRect(activeX,this._y,this._cols[activeCol],CELL_HEIGHT);
            this._ctx.moveTo(activeX,this._y);
            this._ctx.lineTo(activeX,this._y+CELL_HEIGHT);
            this._ctx.lineTo(activeX+this._cols[activeCol],this._y+CELL_HEIGHT);
            this._ctx.lineTo(activeX+this._cols[activeCol],this._y);
            let name:string= this.getColumnName(activeCol);
            this._ctx.fillStyle = CLR_BAR_TEXT;
            this._ctx.fillText(name,activeX+this._cols[activeCol]/2, CELL_HEIGHT/2);

            this._ctx.restore();
        }
    }
}